package com.ervaergul.BookstoreBackend.Authentication;

import com.ervaergul.BookstoreBackend.Authentication.DTOs.AuthenticationResponseDTO;
import com.ervaergul.BookstoreBackend.Cart.CartItemRepository;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.UnauthorizedException;
import com.ervaergul.BookstoreBackend.User.User;
import com.ervaergul.BookstoreBackend.User.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class AuthenticationService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    CartItemRepository cartItemRepository;
    @Value("${bookstore.app.secret}")
    private String appSecret;

    @Override
    public Principal loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCase(username);

        if (user == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        return new Principal(user);
    }

    public String generateRefreshToken(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username);
        user.setRefreshToken(UUID.randomUUID().toString());
        user.setRefreshTokenExpirationDate(Date.from(Instant.now().plusSeconds(31536000)));
        userRepository.save(user);
        return user.getRefreshToken();
    }

    public String validateRefreshToken(String refreshToken) {
        User user = userRepository.findByRefreshToken(refreshToken);

        if (user != null && !user.getRefreshTokenExpirationDate().before(new Date())) {
            return user.getUsername();
        }

        throw new UnauthorizedException("Invalid refresh token");
    }

    public String generateJwt(Principal principal) {
        return Jwts.builder().setSubject(principal.getUsername()).setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plusSeconds(3600)))
                .signWith(SignatureAlgorithm.HS256, appSecret).compact();
    }

    public Principal validateJwt(String jwt) {
        try {
            Claims jwtClaims = Jwts.parser().setSigningKey(appSecret).parseClaimsJws(jwt).getBody();
            String jwtSubject = jwtClaims.getSubject();
            Date jwtExpiration = jwtClaims.getExpiration();
            Principal principal = loadUserByUsername(jwtSubject);

            if (principal != null && !jwtExpiration.before(new Date())) {
                return principal;
            }

        } catch (Exception exception) {
            throw new UnauthorizedException("Invalid jwt");
        }

        return null;
    }

    /* Generates jwt for the given user */
    public AuthenticationResponseDTO authorizeUser(String username) {
        Principal principal = loadUserByUsername(username);
        AuthenticationResponseDTO response = new AuthenticationResponseDTO();

        response.setJwt(generateJwt(principal));
        response.setUsername(principal.getUsername());
        response.setAuthority(principal.getAuthorities().toString().substring(1, principal.getAuthorities().toString().length() - 1));
        response.setCartItems(cartItemRepository.findByUser(principal.user()));
        return response;
    }

}