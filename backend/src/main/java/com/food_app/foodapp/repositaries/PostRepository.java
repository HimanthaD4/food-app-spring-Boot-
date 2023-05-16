package com.food_app.foodapp.repositaries;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.food_app.foodapp.model.Post;

public interface PostRepository extends MongoRepository<Post, String> {
}