package com.ervaergul.BookstoreBackend.Authentication.Responses;

import lombok.Data;

@Data
public class AuthenticationResponse {

    private String jwt;
    private String username;
    private String authority;

}