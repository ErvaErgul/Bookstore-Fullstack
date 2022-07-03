package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class InvalidTokenException extends RuntimeException {

    public InvalidTokenException(String message) {
        super(message);
    }

}