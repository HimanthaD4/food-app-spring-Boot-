package com.food_app.foodapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.food_app.foodapp.model.Rating;
import com.food_app.foodapp.services.RatingService;

import java.util.List;

@RestController
@RequestMapping("api/rating")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @GetMapping
    public List<Rating> getAllRatings() {
        return ratingService.findAll();
    }

    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestBody Rating rating) {
        ratingService.save(rating);
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Rating> getRatingById(@PathVariable("id") String id) {
        return ratingService.findById(id)
                .map(rating -> new ResponseEntity<>(rating, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Rating> updateRating(@PathVariable("id") String id, @RequestBody Rating updatedRating) {
        return ratingService.findById(id)
                .map(rating -> {
                    rating.setRatedBy(updatedRating.getRatedBy());
                    rating.setRatedTo(updatedRating.getRatedTo());
                    rating.setRatings(updatedRating.getRatings());
                    ratingService.save(rating);
                    return new ResponseEntity<>(rating, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRating(@PathVariable("id") String id) {
        if (ratingService.existsById(id)) {
            ratingService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byRatedTo/{ratedTo}")
    public ResponseEntity<List<Rating>> findByRatedTo(@PathVariable("ratedTo") String ratedTo) {
        List<Rating> ratings = ratingService.findByRatedTo(ratedTo);
        if (!ratings.isEmpty()) {
            return new ResponseEntity<>(ratings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}