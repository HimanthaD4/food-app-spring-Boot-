package com.food_app.foodapp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.food_app.foodapp.model.Group;
import com.food_app.foodapp.services.GroupService;

import java.util.List;
import java.util.Optional;



@RestController
@RequestMapping("/api/groups")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Group> getGroupById(@PathVariable String id) {
        return groupService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Group createGroup(@RequestBody Group group) {
        return groupService.save(group);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Group> updateGroup(@PathVariable String id, @RequestBody Group updatedGroup) {
        return groupService.findById(id).map(group -> {
            group.setName(updatedGroup.getName());
            group.setMembers(updatedGroup.getMembers());
            return ResponseEntity.ok(groupService.save(group));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable String id) {
    
            groupService.deleteById(id);
            return ResponseEntity.ok().build();
       
    }
}