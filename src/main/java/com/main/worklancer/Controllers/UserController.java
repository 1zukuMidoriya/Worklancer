package com.main.worklancer.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.worklancer.Models.User;
import com.main.worklancer.Repositories.UserRepository;

@RestController
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserRepository userRepo;

    @GetMapping("/Users")
    ResponseEntity<List<User>> GetAllUsers() {
    return new ResponseEntity<>(userRepo.findAll(), HttpStatus.OK);

    };
    
    @GetMapping("/Users/{id}")
    ResponseEntity<User> GetUserById(@PathVariable("id") int id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/Users")
    ResponseEntity<User> postUser(@RequestBody User user) {
        User savedUser = userRepo.save(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

}
