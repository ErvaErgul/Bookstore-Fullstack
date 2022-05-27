package com.ervaergul.BookstoreBackend.Authentication;

import com.ervaergul.BookstoreBackend.Authentication.Responses.AuthenticationResponse;
import com.ervaergul.BookstoreBackend.Exception.CustomExceptions.InvalidTokenException;
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
    @Value("${bookstore.app.secret}")
    private String appSecret;

    @Override
    public Principal loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameIgnoreCase(username);

        if(user == null) {
            throw new UsernameNotFoundException(username + " not found");
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

    public Principal validateRefreshToken(String refreshToken) {
        User user = userRepository.findByRefreshToken(refreshToken);

        if(user != null && !user.getRefreshTokenExpirationDate().before(new Date())){
            return new Principal(user);
        } else {
            throw new InvalidTokenException("Invalid refresh token");
        }

    }

    public String generateJwt(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username);
        return Jwts.builder().setSubject(user.getUsername()).setIssuedAt(Date.from(Instant.now()))
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
            throw new InvalidTokenException("Invalid jwt");
        }

        return null;
    }

    /* Generates jwt for the given user */
    public AuthenticationResponse authorizeUser(String username) {
        AuthenticationResponse authenticationResponse = new AuthenticationResponse();

        Principal userToAuthenticate = loadUserByUsername(username);

        authenticationResponse.setJwt(generateJwt(userToAuthenticate.getUsername()));
        authenticationResponse.setUsername(userToAuthenticate.getUsername());
        authenticationResponse.setAuthority(userToAuthenticate.getAuthorities().toString());
        return authenticationResponse;
    }

}