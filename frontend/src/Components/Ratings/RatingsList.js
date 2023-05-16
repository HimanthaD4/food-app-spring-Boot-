import React from 'react';
import { List } from 'antd';
import RatingItem from './RatingItem';

const RatingsList = ({ ratings, onUpdate, onDelete }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={ratings}
      renderItem={rating => (
        <RatingItem
          key={rating.id}
          rating={rating}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )}
    />
  );
};

export default RatingsList;