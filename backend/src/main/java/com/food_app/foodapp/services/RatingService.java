package com.food_app.foodapp.services;

import java.util.List;
import java.util.Optional;

import com.food_app.foodapp.model.Rating;

public interface RatingService {
    List<Rating> findAll();

    Optional<Rating> findById(String id);

    Rating save(Rating rating);

    void deleteById(String id);

    boolean existsById(String id);

    List<Rating> findByRatedTo(String ratedTo);
}
