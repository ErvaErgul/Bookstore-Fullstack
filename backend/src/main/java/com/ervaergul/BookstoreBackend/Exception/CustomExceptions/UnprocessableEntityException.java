package com.ervaergul.BookstoreBackend.Exception.CustomExceptions;

public class UnprocessableEntityException extends RuntimeException {

    public UnprocessableEntityException(String message) {
        super(message);
    }

}