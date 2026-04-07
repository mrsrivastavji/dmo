package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {

    @Autowired
    private ProductRepository repo;

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("products", repo.findAll());
        return "index";
    }

    // Add product (for testing)
    @PostMapping("/add")
    public String addProduct() {
        repo.save(new Product("Laptop", 50000));
        return "redirect:/";
    }
}