import React, { useState } from 'react';
import RatingForm from './RatingForm';
import RatingsList from './RatingsList';

const RatingsContainer = ({ postId, ratings }) => {
  const [editingRating, setEditingRating] = useState(null);

  const handleCreate = (postId, rating) => {
    // Call API to create a new rating
    console.log('Creating rating:', postId, rating);
  };

  const handleUpdate = (ratingId, rating) => {
    // Call API to update the rating
    console.log('Updating rating:', ratingId, rating);
  };

  const handleDelete = (ratingId) => {
    // Call API to delete the rating
    console.log('Deleting rating:', ratingId);
  };

  const handleEdit = (rating) => {
    setEditingRating(rating);
  };

  const handleCancel = () => {
    setEditingRating(null);
  };

  return (
    <div>
      {editingRating ? (
        <RatingForm
          postId={postId}
          rating={editingRating.ratings}
          onSubmit={handleUpdate}
          onCancel={handleCancel}
        />
      ) : (
        <RatingForm postId={postId} rating={0} onSubmit={handleCreate} />
      )}
      <RatingsList
        ratings={ratings}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default RatingsContainer;
