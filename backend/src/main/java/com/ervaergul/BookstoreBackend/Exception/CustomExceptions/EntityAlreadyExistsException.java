package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class EntityAlreadyExistsException extends RuntimeException {

    public EntityAlreadyExistsException(String message) {
        super(message);
    }

}