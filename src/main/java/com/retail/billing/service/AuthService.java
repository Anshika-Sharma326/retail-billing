package com.retail.billing.service;

import com.retail.billing.dto.LoginRequest;
import com.retail.billing.dto.LoginResponse;
import com.retail.billing.entity.AppUser;
import com.retail.billing.enums.Role;
import com.retail.billing.exception.UserNotFoundException;
import com.retail.billing.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.retail.billing.enums.Status;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {

        AppUser user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found with username: "
                                        + request.getUsername()));

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            return new LoginResponse(
                    "Invalid Password",
                    null,
                    null,
                    null
            );
        }
        // ==========================
// Check Account Status
// ==========================

        if (user.getStatus() == Status.PENDING) {

            return new LoginResponse(
                    "Your account is waiting for Admin approval.",
                    null,
                    null,
                    null
            );
        }

        if (user.getStatus() == Status.REJECTED) {

            return new LoginResponse(
                    "Your registration has been rejected.",
                    null,
                    null,
                    null
            );
        }

        if (user.getStatus() == Status.DISABLED) {

            return new LoginResponse(
                    "Your account has been disabled by Admin.",
                    null,
                    null,
                    null
            );
        }
        return new LoginResponse(

                "Login Successful",

                user.getRole().name(),

                user.getFullName(),

                null
        );
    }

    public AppUser register(AppUser user) {

        if (userRepository.findByUsername(user.getUsername()).isPresent()) {

            throw new RuntimeException("Username already exists");
        }

        // Default Role
        if (user.getRole() == null) {
            user.setRole(Role.STAFF);
        }

        // ==========================
        // Account Status
        // ==========================

        if (user.getRole() == Role.ADMIN) {

            user.setStatus(Status.ACTIVE);

        } else {

            user.setStatus(Status.PENDING);

        }

        // ==========================
        // Encode Password
        // ==========================

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

}