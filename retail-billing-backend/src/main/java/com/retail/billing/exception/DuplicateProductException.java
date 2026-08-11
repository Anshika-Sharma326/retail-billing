package com.retail.billing.exception;


public class DuplicateProductException extends RuntimeException {


    public DuplicateProductException(String message) {
        super(message);
    }

}