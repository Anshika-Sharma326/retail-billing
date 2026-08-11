package com.retail.billing.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {


    // Product Not Found Exception
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<?> handleProductNotFound(
            ProductNotFoundException exception) {


        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", 404);
        response.put("message", exception.getMessage());


        return new ResponseEntity<>(
                response,
                HttpStatus.NOT_FOUND
        );
    }



    // Duplicate Product Exception
    @ExceptionHandler(DuplicateProductException.class)
    public ResponseEntity<?> handleDuplicateProduct(
            DuplicateProductException exception) {


        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", 400);
        response.put("message", exception.getMessage());


        return new ResponseEntity<>(
                response,
                HttpStatus.BAD_REQUEST
        );
    }




    // Handle Other Exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneralException(
            Exception exception) {


        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", LocalDateTime.now());
        response.put("status", 500);
        response.put("message", exception.getMessage());


        return new ResponseEntity<>(
                response,
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

}