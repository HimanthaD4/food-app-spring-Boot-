package com.food_app.foodapp.repositaries;

import com.food_app.foodapp.model.Like;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface LikeRepository extends MongoRepository<Like, String> {
    @Query("{ 'likedBy': ?0, 'id' :?0 }")
    Like findByLikedByAndLikedTo(String likedBy,String id);

    @Query("{ 'likedTo': ?0")
    List<Like> findLikesByPostId(String likedTo);
}
