package com.food_app.foodapp.repositaries;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.food_app.foodapp.model.Rating;

import java.util.List;

public interface RatingRepository extends MongoRepository<Rating, String> {
    @Query("{ 'ratedTo': ?0 }")
    List<Rating> findByRatedTo(String ratedTo);
}
