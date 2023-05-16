package com.food_app.foodapp.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food_app.foodapp.model.Rating;
import com.food_app.foodapp.repositaries.RatingRepository;
import com.food_app.foodapp.services.RatingService;

import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    @Override
    public List<Rating> findAll() {
        return ratingRepository.findAll();
    }

    @Override
    public Optional<Rating> findById(String id) {
        return ratingRepository.findById(id);
    }

    @Override
    public Rating save(Rating rating) {
        return ratingRepository.save(rating);
    }

    @Override
    public void deleteById(String id) {
        ratingRepository.deleteById(id);
    }

    @Override
    public boolean existsById(String id) {
        return ratingRepository.existsById(id);
    }

    @Override
    public List<Rating> findByRatedTo(String ratedTo) {
        return ratingRepository.findByRatedTo(ratedTo);
    }
}
