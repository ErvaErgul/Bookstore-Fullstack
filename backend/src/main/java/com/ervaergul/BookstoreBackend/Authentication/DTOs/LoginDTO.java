package com.ervaergul.BookstoreBackend.Authentication.DTOs;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginDTO {

    @NotBlank(message = "Username must be specified")
    private String username;

    @NotBlank(message = "Password must be specified")
    private String password;

}