package com.retail.billing.entity;

import com.retail.billing.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import com.retail.billing.enums.Status;
@Entity
@Table(name = "users")
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Full name is required")
    @Column(nullable = false)
    private String fullName;

    @NotBlank(message = "Username is required")
    @Column(nullable = false, unique = true)
    private String username;

    @NotBlank(message = "Password is required")
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
    public AppUser() {
    }

    public AppUser(Long id, String fullName, String username, String password, Role role,Status status) {
        this.id = id;
        this.fullName = fullName;
        this.username = username;
        this.password = password;
        this.role = role;
        this.status = status;
    }

    // ---------------- Getters & Setters ----------------

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}