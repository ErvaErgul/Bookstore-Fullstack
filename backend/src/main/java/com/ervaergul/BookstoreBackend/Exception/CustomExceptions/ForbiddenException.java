package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class ForbiddenException extends RuntimeException {

    public ForbiddenException(String message) {
        super(message);
    }

}