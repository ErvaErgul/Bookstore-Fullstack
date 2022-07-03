package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class ConflictException extends RuntimeException {

    public ConflictException(String message) {
        super(message);
    }

}