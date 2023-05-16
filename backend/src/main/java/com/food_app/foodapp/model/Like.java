package com.food_app.foodapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "likes")
public class Like {
    @Id
    private String id;
    private String likedBy;
    private String likedTo;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLikedBy() {
        return likedBy;
    }

    public void setLikedBy(String likedBy) {
        this.likedBy = likedBy;
    }

    public String getLikedTo() {
        return likedTo;
    }

    public void setLikedTo(String likedTo) {
        this.likedTo = likedTo;
    }
}
