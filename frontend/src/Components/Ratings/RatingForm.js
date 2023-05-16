import React,{useState} from 'react';
import { Rate, Button } from 'antd';

const RatingForm = ({ postId, rating, onSubmit, onCancel }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleSubmit = () => {
    onSubmit(postId, currentRating);
    setCurrentRating(0);
  };

  return (
    <div>
      <Rate
        value={currentRating}
        onChange={value => setCurrentRating(value)}
      />
      <Button onClick={handleSubmit} disabled={currentRating === 0}>
        Submit
      </Button>
      {onCancel && (
        <Button onClick={onCancel} type="dashed">
          Cancel
        </Button>
      )}
    </div>
  );
};

export default RatingForm;
