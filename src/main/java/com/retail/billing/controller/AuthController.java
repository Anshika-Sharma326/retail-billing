package com.retail.billing.controller;


import com.retail.billing.dto.LoginRequest;
import com.retail.billing.dto.LoginResponse;
import com.retail.billing.entity.AppUser;
import com.retail.billing.security.JwtUtil;
import com.retail.billing.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/auth")
public class AuthController {


    private final JwtUtil jwtUtil;


    @Autowired
    private AuthService authService;



    public AuthController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }



    @PostMapping("/login")
    public LoginResponse login(
            @Valid @RequestBody LoginRequest request) {


        LoginResponse response =
                authService.login(request);



        // Token only on successful login

        if(response.getMessage()
                .equals("Login Successful")) {


            String token =
                    jwtUtil.generateToken(
                            request.getUsername()
                    );


            response.setToken(token);

        }


        return response;

    }




    @PostMapping("/register")
    public AppUser register(
            @Valid @RequestBody AppUser user) {


        return authService.register(user);

    }

}