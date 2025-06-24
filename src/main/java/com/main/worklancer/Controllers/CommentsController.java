package com.main.worklancer.Controllers;

import com.main.worklancer.Models.Comments;
import com.main.worklancer.Models.Project;
import com.main.worklancer.Models.User;
import com.main.worklancer.Repositories.CommentRepository;
import com.main.worklancer.Repositories.ProjectRepository;
import com.main.worklancer.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")

public class CommentsController {

    @Autowired
    UserRepository userRepo;

    @Autowired
    CommentRepository commentRepo;

    @Autowired
    ProjectRepository projectRepo;

    @GetMapping("/Comments/{project_id}")
    ResponseEntity<List<Comments>> GetAllComments(@PathVariable int project_id) {
        Project project = projectRepo.findById(project_id).orElse(null);
        if(project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(project.getComments(), HttpStatus.OK);
    }

    @PostMapping("/Comments/{project_id}")
    ResponseEntity<Project> addComment(@PathVariable int project_id, @RequestBody Comments comment) {
        Project project = projectRepo.findById(project_id).orElse(null);
        if(project == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        comment.setProject(project);
        commentRepo.save(comment);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }

}
