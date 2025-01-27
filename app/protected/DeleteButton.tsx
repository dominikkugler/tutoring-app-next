"use client";

import React from 'react';
import { deletePostAction } from '../actions';

type DeleteButtonProps = {
    postId: string;
    children: React.ReactNode;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ postId }) => {
    const handleDelete = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?');
        if (confirmDelete) {
            deletePostAction(postId);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} className="text-red-600 hover:underline">
                Delete
            </button>
        </div>
    );
};

export default DeleteButton;