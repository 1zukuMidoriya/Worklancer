package com.main.worklancer.Controllers;

import java.util.List;
import java.util.Optional;

import com.main.worklancer.Repositories.ProjectRepository;
import com.main.worklancer.Repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.worklancer.Models.Project;
import com.main.worklancer.Models.User;

import org.springframework.beans.factory.annotation.Autowired;



@RestController
public class ProjectController {
    @Autowired
    ProjectRepository projectRepo;

    @Autowired
    UserRepository userRepo;



    @GetMapping("/Projects/{userId}")
    public ResponseEntity<List<Project>> getProjectsByUserId(@PathVariable int userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.getProject(), HttpStatus.OK);
    }

    @PostMapping("/Projects/{userId}")
    public ResponseEntity<User> addProject(@PathVariable int userId, @RequestBody Project project) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        project.setUser(user);
        projectRepo.save(project);
        user.getProject().add(project);
        userRepo.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    

}
