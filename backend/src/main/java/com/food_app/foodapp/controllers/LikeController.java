package com.food_app.foodapp.controllers;

import com.food_app.foodapp.model.Like;
import com.food_app.foodapp.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/like")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @GetMapping
    public List<Like> getAllLikes() {
        return likeService.findAll();
    }

    @PostMapping
    public ResponseEntity<Like> createLike(@RequestBody Like like) {
        likeService.save(like);
        return new ResponseEntity<>(like, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Like> getLikeById(@PathVariable("id") String id) {
        return likeService.findById(id)
                .map(like -> new ResponseEntity<>(like, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Like> updateLike(@PathVariable("id") String id, @RequestBody Like updatedLike) {
        return likeService.findById(id)
                .map(like -> {
                    like.setLikedBy(updatedLike.getLikedBy());
                    like.setLikedTo(updatedLike.getLikedTo());
                    likeService.save(like);
                    return new ResponseEntity<>(like, HttpStatus.OK);
                })
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable("id") String id) {
        if (likeService.existsById(id)) {
            likeService.deleteById(id);
            return new ResponseEntity<>(
                    HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byLikedByAndLikedTo/{likedBy}/{likedTo}")
    public ResponseEntity<Like> findByLikedByAndLikedTo(@PathVariable("likedBy") String likedBy,
            @PathVariable("likedTo") String likedTo) {
        Like like = likeService.findByLikedByAndLikedTo(likedBy, likedTo);
        if (like != null) {
            return new ResponseEntity<>(like, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/findLikesByPostId/{likedTo}")
    public ResponseEntity<List<Like>> findLikesByPostId(
            @PathVariable("likedTo") String likedTo) {
        List<Like> likes = likeService.findLikesByPostId(likedTo);
        if (!likes.isEmpty()) {
            return new ResponseEntity<>(likes, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}