import React, { useState } from 'react';
import { List, Rate, Button, Popconfirm } from 'antd';

const RatingItem = ({ rating, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newRating, setNewRating] = useState(rating.ratings);

  const handleUpdate = () => {
    onUpdate(rating.id, newRating);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(rating.id);
  };

  return (
    <List.Item>
      {isEditing ? (
        <Rate value={newRating} onChange={value => setNewRating(value)} />
      ) : (
        <Rate value={rating.ratings} disabled />
      )}
      {isEditing ? (
        <Button onClick={handleUpdate}>Save</Button>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      )}
      <Popconfirm title="Are you sure?" onConfirm={handleDelete}>
        <Button danger>Delete</Button>
</Popconfirm>
</List.Item>
);
};

export default RatingItem;