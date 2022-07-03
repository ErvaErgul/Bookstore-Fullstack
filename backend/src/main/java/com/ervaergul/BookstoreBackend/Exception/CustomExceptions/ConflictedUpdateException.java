package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class ConflictedUpdateException extends RuntimeException {

    public ConflictedUpdateException(String message) {
        super(message);
    }

}