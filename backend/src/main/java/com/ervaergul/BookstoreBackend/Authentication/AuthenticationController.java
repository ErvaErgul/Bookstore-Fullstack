package com.ervaergul.BookstoreBackend.Authentication;

import com.ervaergul.BookstoreBackend.Authentication.Requests.LoginDTO;
import com.ervaergul.BookstoreBackend.Authentication.Responses.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

@RestController
@RequestMapping("/authentication")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@Valid @RequestBody LoginDTO loginDTO, HttpServletResponse response){
        try {
            /* We try to authenticate the user by using the username&password */
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(),loginDTO.getPassword()));
        } catch (AuthenticationException authenticationException) {
            return new ResponseEntity<>("Invalid username or password", HttpStatus.UNAUTHORIZED);
        }

        /* At this point, the username&password authentication was successful, so we authorize the user */
        AuthenticationResponse authenticationResponse = authenticationService.authorizeUser(loginDTO.getUsername());

        /* Add the refreshToken as a Http-Only cookie so that the user can request new Jwts with it */
        Cookie newCookie = new Cookie("refreshToken", authenticationService.generateRefreshToken(loginDTO.getUsername()));
        newCookie.setMaxAge(31536000);
        newCookie.setHttpOnly(true);
        response.addCookie(newCookie);

        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }

    @PutMapping("/refreshTokens")
    public ResponseEntity<Object> refreshTokens(HttpServletRequest request, HttpServletResponse response){
        Cookie refreshTokenCookie = WebUtils.getCookie(request,"refreshToken");
        String refreshToken;
        try {
            refreshToken = refreshTokenCookie.getValue();
        } catch (NullPointerException exception) {
            return new ResponseEntity<>("There is no refreshToken in the cookie", HttpStatus.UNAUTHORIZED);
        }

        Principal principal = authenticationService.validateRefreshToken(refreshToken);

        AuthenticationResponse authenticationResponse = authenticationService.authorizeUser(principal.getUsername());

        Cookie newCookie = new Cookie("refreshToken", authenticationService.generateRefreshToken(principal.getUsername()));
        newCookie.setMaxAge(31536000);
        newCookie.setHttpOnly(true);
        response.addCookie(newCookie);


        return new ResponseEntity<>(authenticationResponse, HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletResponse response){
        Cookie emptyRefreshTokenCookie = new Cookie("refreshToken","");
        emptyRefreshTokenCookie.setMaxAge(0);
        emptyRefreshTokenCookie.setHttpOnly(true);
        response.addCookie(emptyRefreshTokenCookie);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}