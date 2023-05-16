package com.food_app.foodapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food_app.foodapp.model.Comment;
import com.food_app.foodapp.repositaries.CommentRepository;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment getCommentById(String commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }

    public Comment updateComment(String commentId, Comment comment) {
        comment.setCommentId(commentId);
        return commentRepository.save(comment);
    }

    public void deleteComment(String commentId) {
        commentRepository.deleteById(commentId);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

   


}
