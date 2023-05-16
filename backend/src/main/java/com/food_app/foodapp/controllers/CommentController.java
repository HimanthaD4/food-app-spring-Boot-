package com.food_app.foodapp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.food_app.foodapp.model.Comment;
import com.food_app.foodapp.services.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public Comment createComment(@RequestBody Comment comment) {
        return commentService.createComment(comment);
    }

    @GetMapping("/{id}")
    public Comment getCommentById(@PathVariable("id") String commentId) {
        return commentService.getCommentById(commentId);
    }

    @PutMapping("/{id}")
    public Comment updateComment(@PathVariable("id") String commentId, @RequestBody Comment comment) {
        return commentService.updateComment(commentId, comment);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable("id") String commentId) {
        commentService.deleteComment(commentId);
    }

    @GetMapping("")
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }
}
