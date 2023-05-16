package com.food_app.foodapp.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.food_app.foodapp.model.Comment;
import com.food_app.foodapp.model.Post;
import com.food_app.foodapp.repositaries.PostRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {
    private final PostRepository postRepository;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(String id) {
        return postRepository.findById(id);
    }

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public Post updatePost(String id, Post post) {
        Optional<Post> existingPost = postRepository.findById(id);
        if (existingPost.isPresent()) {
            Post updatedPost = existingPost.get();
            updatedPost.setPostedBy(post.getPostedBy());
            updatedPost.setImageUrls(post.getImageUrls());
            updatedPost.setCaption(post.getCaption());
            return postRepository.save(updatedPost);
        }
        return null;
    }

    public boolean deletePost(String id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public Post likePost(String id, String userId) {
        Optional<Post> existingPost = postRepository.findById(id);
        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            List<String> likes = post.getLikes();
            if (!likes.contains(userId)) {
                likes.add(userId);
                post.setLikes(likes);
                return postRepository.save(post);
            }
        }
        return null;
    }

    public Post addComment(String id, Comment comment) {
        Optional<Post> existingPost = postRepository.findById(id);
        if (existingPost.isPresent()) {
            Post post = existingPost.get();
            List<Comment> comments = post.getComments();
            comments.add(comment);
            post.setComments(comments);
            return postRepository.save(post);
        }
        return null;
    }
}