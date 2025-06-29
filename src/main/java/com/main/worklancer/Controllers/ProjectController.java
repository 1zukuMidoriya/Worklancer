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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.main.worklancer.Models.Project;
import com.main.worklancer.Models.User;
import com.main.worklancer.Repositories.ProjectRepository;
import com.main.worklancer.Repositories.UserRepository;



@RestController
@CrossOrigin("*")

public class ProjectController {
    @Autowired
    ProjectRepository projectRepo;

    @Autowired
    UserRepository userRepo;



    @GetMapping("/Projects")
    public ResponseEntity<List<Project>> getAllProjects() {
        List<Project> projects = projectRepo.findAll();
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/Projects/{userId}")
    public ResponseEntity<List<Project>> getProjectsByUserId(@PathVariable int userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.getProject(), HttpStatus.OK);
    }

    @GetMapping("/Projects/project/{projectId}")
    public ResponseEntity<Project> getProjectById(@PathVariable int projectId) {
        Optional<Project> project = projectRepo.findById(projectId);
        if (project.isPresent()) {
            return new ResponseEntity<>(project.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/Projects/{userId}")
    public ResponseEntity<User> addProject(@PathVariable int userId, @RequestBody Project project) {
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        project.setUser(user);
        project.setCreationDate(java.time.LocalDate.now()); // Yahan manually set kar diya
        projectRepo.save(project);
        user.getProject().add(project);
        userRepo.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/Projects/{projectId}/status/{status}")
    public ResponseEntity<Project> updateProjectStatus(@PathVariable int projectId, @PathVariable String status) {
        Optional<Project> projectOpt = projectRepo.findById(projectId);
        if (projectOpt.isPresent()) {
            Project project = projectOpt.get();
            project.setStatus(status);
            projectRepo.save(project);
            return new ResponseEntity<>(project, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    

}
