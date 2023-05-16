package com.food_app.foodapp.services;

import com.food_app.foodapp.model.Like;

import java.util.List;
import java.util.Optional;

public interface LikeService {
    List<Like> findAll();

    Optional<Like> findById(String id);

    Like save(Like like);

    void deleteById(String id);

    boolean existsById(String id);

    Like findByLikedByAndLikedTo(String likedBy, String likedTo);

    List<Like> findLikesByPostId(String likedTo);
}

