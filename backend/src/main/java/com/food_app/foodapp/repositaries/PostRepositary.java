package com.food_app.foodapp.repositaries;

 import org.springframework.data.mongodb.repository.MongoRepository;

import com.food_app.foodapp.model.PostComment;

public interface PostRepositary extends MongoRepository<PostComment, String> {

 
    
}
