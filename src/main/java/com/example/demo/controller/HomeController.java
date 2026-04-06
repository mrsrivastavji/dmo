package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Hello Shivam!";
    }

    @PostMapping("/add")
    public String addData(@RequestBody String data) {
        return "Received: " + data;
    }
}