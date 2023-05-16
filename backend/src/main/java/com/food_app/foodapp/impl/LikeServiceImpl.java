package com.food_app.foodapp.impl;

import com.food_app.foodapp.model.Like;
import com.food_app.foodapp.repositaries.LikeRepository;
import com.food_app.foodapp.services.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository likeRepository;

    @Override
    public List<Like> findAll() {
        return likeRepository.findAll();
    }

    @Override
    public Optional<Like> findById(String id) {
        return likeRepository.findById(id);
    }

    @Override
    public Like save(Like like) {
        return likeRepository.save(like);
    }

    @Override
    public void deleteById(String id) {
        likeRepository.deleteById(id);
    }

    @Override
    public boolean existsById(String id) {
        return likeRepository.existsById(id);
    }

    @Override
    public Like findByLikedByAndLikedTo(String likedBy, String likedTo) {
        return likeRepository.findByLikedByAndLikedTo(likedBy, likedTo);
    }

    @Override
    public List<Like> findLikesByPostId(String likedTo){
        return likeRepository.findLikesByPostId(likedTo);
    }
}
