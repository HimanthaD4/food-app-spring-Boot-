package com.food_app.foodapp.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.food_app.foodapp.model.PostComment;
import com.food_app.foodapp.services.PostCommentService;

import java.util.List;

@RestController
@RequestMapping("/api/post-comments")
public class PostCommentController {

    @Autowired
    private PostCommentService postCommentService;

    @GetMapping
    public List<PostComment> getAllComments() {
        return postCommentService.findAll();
    }

    @PostMapping
    public ResponseEntity<PostComment> addComment(@RequestBody PostComment postComment) {
        PostComment savedComment = postCommentService.save(postComment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostComment> getCommentById(@PathVariable String id) {
        PostComment postComment = postCommentService.findById(id);
        if (postComment != null) {
            return new ResponseEntity<>(postComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommentById(@PathVariable String id) {
        PostComment postComment = postCommentService.findById(id);
        if (postComment != null) {
            postCommentService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
