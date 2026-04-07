package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
public class UserController {

    private final UserRepository repo;

    public UserController(UserRepository repo) {
        this.repo = repo;
    }

    @SuppressWarnings("null")
    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        return repo.save(user);
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return repo.findAll();
    }
}