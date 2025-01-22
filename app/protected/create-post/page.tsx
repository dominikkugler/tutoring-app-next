'use client';
import React, { useState, useEffect } from "react";   
import { SubmitButton } from "@/components/submit-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createPostAction } from "@/app/actions";
import { supabase } from  "@/lib/supabase";

interface Category {
    id: number;  // Adjust based on your actual database column type (string or number)
    name: string;
}

export default function CreatePostPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await supabase
                .from('categories') // Assuming 'categories' is the table name
                .select('id, name'); // Assuming categories have 'id' and 'name' columns

            if (error) {
                console.error("Error fetching categories:", error);
            } else {
                setCategories(data || []); // Ensure data is an array
            }
        }

        fetchCategories();
    }, []); // Empty array ensures this runs only once on mount

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <h1>Create Post</h1>
            <form>
                <div>
                    <Label htmlFor="category" className="font-bold">Category</Label>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mt-2"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category, index) => (
                            <option key={`${category.id}-${index}`} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <div>
                    <Label htmlFor="title" className="font-bold">Title</Label>
                    <Input
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex flex-col">
                        <Label htmlFor="content" className="font-bold mt-2">Content</Label>
                        <textarea
                            className="border border-gray-300 rounded-md p-2 mt-2"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="hourlyRate" className="font-bold">Hourly Rate</Label>
                    <Input
                        name="hourlyRate"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                    />
                </div>
                <div>
                    <SubmitButton 
                        className="mt-2" 
                        type="submit"
                        formAction={createPostAction}
                    >
                        Create Post
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}