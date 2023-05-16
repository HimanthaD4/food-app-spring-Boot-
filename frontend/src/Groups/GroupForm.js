import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';

const { Option } = Select;

const GroupForm = ({ onSubmit, onCancel, group, users }) => {
    const [name, setName] = useState(group ? group.name : '');
    const [members, setMembers] = useState(group ? group.members : []);

    const handleSubmit = () => {
        onSubmit({ id: group ? group.id : null, name, members });
        setName('');
        setMembers([]);
    };

    return (
        <Form layout="vertical">
            <Form.Item label="Group Name">
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter group name"
                />
            </Form.Item>
            <Form.Item label="Members">
                <Select
                    mode="multiple"
                    placeholder="Select group members"
                    value={members}
                    onChange={(value) => setMembers(value)}
                >
                    {users.map((user) => (
                        <Option key={user.id} value={user.id}>
                            {user.username}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                    {group ? 'Update' : 'Create'}
                </Button>
                {onCancel && (
                    <Button type="dashed" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default GroupForm;
