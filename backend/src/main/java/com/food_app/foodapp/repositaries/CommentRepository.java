package com.food_app.foodapp.repositaries;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.food_app.foodapp.model.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
}
