package com.example.demo.controller;

import com.example.demo.model.Product;
import com.example.demo.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // ✅ Add Product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return service.save(product);
    }

    // ✅ Get All Products
    @GetMapping
    public List<Product> getProducts() {
        return service.getAll();
    }

    // ✅ Delete Product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        service.delete(id);
        return "Product deleted successfully";
    }
}