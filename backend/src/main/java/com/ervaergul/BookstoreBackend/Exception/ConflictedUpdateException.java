package com.ervaergul.BookstoreBackend.Exception;

public class ConflictedUpdateException extends RuntimeException {

    public ConflictedUpdateException(String message) {
        super(message);
    }

}