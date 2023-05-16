package com.food_app.foodapp.repositaries;

import com.food_app.foodapp.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CommentRepositary extends MongoRepository<Comment, String> {
    List<Comment> getCommentsByPostId(String userId);
    

}
