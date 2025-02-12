"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
	Input,
	Select,
	SelectItem,
	Textarea,
	Card,
	CardHeader,
	CardBody,
	Divider,
} from "@heroui/react";
import { SubmitButton } from "@/components/submit-button";

interface Category {
	id: number;
	name: string;
}

interface Post {
	id: number;
	title: string;
	content: string;
	hourlyRate: number;
	category?: Category;
}

interface EditFormProps {
	post: Post;
}

const EditForm: React.FC<EditFormProps> = ({ post }) => {
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	const [hourlyRate, setHourlyRate] = useState<number | "">(post.hourlyRate);
	const [category, setCategory] = useState<number | null>(
		post.category?.id || null
	);
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		async function fetchCategories() {
			const { data, error } = await supabase
				.from("categories")
				.select("id, name");

			if (error) {
				console.error("Error fetching categories:", error);
			} else {
				setCategories(data || []);
			}
		}

		fetchCategories();
	}, []);

	const updatePost = async () => {
		const { error } = await supabase
			.from("posts")
			.update({
				title,
				content,
				hourlyRate,
				category_id: category,
			})
			.eq("id", post.id);

		if (error) {
			console.error("Error updating post:", error);
		} else {
			console.log("Post updated successfully");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await updatePost();
	};

	return (
		<div className="flex justify-center items-center min-h-[90vh] py-12">
			<Card className="w-full max-w-2xl p-6 shadow-lg">
				<CardHeader>
					<h2 className="text-xl">Edytuj ogłoszenie</h2>
				</CardHeader>
				<Divider />
				<CardBody>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						{/* Kategoria */}
						<Select
							className="w-full"
							label="Kategoria"
							placeholder="Wybierz kategorię"
							selectionMode="single"
							selectedKeys={category ? [category.toString()] : []}
							onSelectionChange={(selected) =>
								setCategory(parseInt(Array.from(selected)[0] as string))
							}>
							{categories.map((cat) => (
								<SelectItem key={cat.id} value={cat.id.toString()}>
									{cat.name}
								</SelectItem>
							))}
						</Select>

						{/* Tytuł */}
						<Input
							className="w-full"
							label="Tytuł"
							placeholder="Wpisz tytuł ogłoszenia"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>

						{/* Treść */}
						<Textarea
							className="w-full"
							label="Treść ogłoszenia"
							labelPlacement="outside"
							placeholder="Opisz swoje ogłoszenie..."
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>

						{/* Stawka godzinowa */}
						<Input
							id="hourlyRate"
							type="number"
							startContent={
								<div className="pointer-events-none flex items-center">
									<span className="text-default-400 text-small">zł</span>
								</div>
							}
							value={
								hourlyRate !== undefined && hourlyRate !== null
									? hourlyRate.toString()
									: ""
							}
							onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
						/>

						{/* Przycisk zapisu */}
						<SubmitButton
							className="mt-2"
							type="submit"
							disabled={!title || !content || !hourlyRate || category === null}>
							Zapisz zmiany
						</SubmitButton>
					</form>
				</CardBody>
			</Card>
		</div>
	);
};

export default EditForm;
