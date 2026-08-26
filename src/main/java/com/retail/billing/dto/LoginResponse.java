package com.retail.billing.dto;

import lombok.Data;

@Data
public class LoginResponse {

    private String message;
    private String role;
    private String fullName;
    private String token;

    public LoginResponse() {
    }

    public LoginResponse(String message, String role, String fullName, String token) {
        this.message = message;
        this.role = role;
        this.fullName = fullName;
        this.token = token;
    }
}