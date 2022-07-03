package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }

}