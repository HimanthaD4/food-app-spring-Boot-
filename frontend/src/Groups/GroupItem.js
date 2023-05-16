import React from 'react';
import { List, Button } from 'antd';

const GroupItem = ({ group, onEdit, onDelete }) => {
  return (
    <List.Item>
      <List.Item.Meta title={group.name} />
      <Button onClick={() => onEdit(group)}>Edit</Button>
      <Button danger onClick={() => onDelete(group.id)}>
        Delete
      </Button>
    </List.Item>
  );
};

export default GroupItem;