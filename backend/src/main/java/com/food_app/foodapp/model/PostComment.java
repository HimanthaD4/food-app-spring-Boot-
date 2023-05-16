package com.food_app.foodapp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class PostComment {
    @Id
    private String id;

    private String commentedBy;

    private String commentedTo;

    private String comment;

    public PostComment() {}

    public PostComment(String commentedBy, String commentedTo, String comment) {
        this.commentedBy = commentedBy;
        this.commentedTo = commentedTo;
        this.comment = comment;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCommentedBy() {
        return commentedBy;
    }

    public void setCommentedBy(String commentedBy) {
        this.commentedBy = commentedBy;
    }

    public String getCommentedTo() {
        return commentedTo;
    }

    public void setCommentedTo(String commentedTo) {
        this.commentedTo = commentedTo;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
