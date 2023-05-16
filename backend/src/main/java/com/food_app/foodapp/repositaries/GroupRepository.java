package com.food_app.foodapp.repositaries;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.food_app.foodapp.model.Group;

public interface GroupRepository extends MongoRepository<Group, String> {
}