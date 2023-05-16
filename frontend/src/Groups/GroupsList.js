import React from 'react';
import { List } from 'antd';
import GroupItem from './GroupItem';

const GroupsList = ({ groups, onEdit, onDelete }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={groups}
      renderItem={(group) => (
        <GroupItem
          key={group.id}
          group={group}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
};

export default GroupsList;
