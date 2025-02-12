"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";

interface Category {
    id: number;
    name: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    hourlyRate: number;
    category?: Category; // Make category optional, since it might not be loaded
}

interface EditFormProps {
    post: Post;
}

const EditForm: React.FC<EditFormProps> = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [hourlyRate, setHourlyRate] = useState(post.hourlyRate);
    const [category, setCategory] = useState(post.category?.id.toString() || ""); // Initialize with post.category?.id or empty string
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase
                .from('categories')
                .select('id, name');

            if (error) {
                console.error("Error fetching categories:", error);
            } else {
                setCategories(data || []); // Ensure data is an array
            }
        }

        fetchCategories();
    }, []);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handleHourlyRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHourlyRate(parseFloat(e.target.value));
    }

    // Update the post
    const updatePost = async () => {
        const { error } = await supabase
            .from('posts')
            .update({
                title,
                content,
                hourlyRate,
                category_id: category
            })
            .eq('id', post.id);

        if (error) {
            console.error("Error updating post:", error);
        } else {
            console.log("Post updated successfully");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updatePost(); // Wait for the updatePost to finish before proceeding
    };


    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white">
            <label htmlFor="title" className="font-medium text-gray-700">
                Title:
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                />
            </label>

            <label htmlFor="content" className="font-medium text-gray-700">
                Content:
                <textarea
                    id="content"
                    value={content}
                    onChange={handleContentChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                />
            </label>

            <label htmlFor="category" className="font-medium text-gray-700">
                Category:
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </label>

            <label htmlFor="hourlyRate" className="font-medium text-gray-700">
                Hourly Rate:
                <input
                    id="hourlyRate"
                    type="number"
                    value={hourlyRate}
                    onChange={handleHourlyRateChange}
                    className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
                />
            </label>

            <button
                type="submit"
                className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
                Save
            </button>
        </form>
    );
};

export default EditForm;
