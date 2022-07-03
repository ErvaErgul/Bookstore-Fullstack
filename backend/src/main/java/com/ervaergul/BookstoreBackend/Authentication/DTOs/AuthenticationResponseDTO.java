package com.ervaergul.BookstoreBackend.Authentication.DTOs;

import com.ervaergul.BookstoreBackend.Cart.CartItem;
import lombok.Data;

import java.util.List;

@Data
public class AuthenticationResponseDTO {

    private String jwt;
    private String username;
    private String authority;
    private List<CartItem> cartItems;

}