package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class UnauthorizedException extends RuntimeException {

    public UnauthorizedException(String message) {
        super(message);
    }

}