package com.ervaergul.BookstoreBackend.User.DTOs;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class RegisterDTO {

    @NotBlank(message = "Username must be specified")
    private String username;

    @NotBlank(message = "Password must be specified")
    @Size(min = 4, message = "Password must be atleast 4 characters")
    private String password;

    @NotBlank(message = "Email must be specified")
    @Email(message = "Please enter a valid email")
    private String email;

}