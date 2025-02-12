"use client";
import React, { useState, useEffect } from "react";
import { SubmitButton } from "@/components/submit-button";
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
import { createPostAction } from "@/app/actions";
import { supabase } from "@/lib/supabase";

interface Category {
	id: number;
	name: string;
}

export default function CreatePostPage() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [hourlyRate, setHourlyRate] = useState<number | "">("");
	const [category, setCategory] = useState<number | null>(null);
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !content || !hourlyRate || category === null) {
			console.error("Nie wszystkie pola są uzupełnione!");
			return;
		}

		const formData = new FormData();
		formData.append("title", title);
		formData.append("content", content);
		formData.append("hourlyRate", hourlyRate.toString());
		formData.append("category", category.toString());

		await createPostAction(formData);
	};

	return (
		<div className="flex justify-center items-center min-h-[90vh] py-12">
			<Card className="w-full max-w-2xl p-6 shadow-lg">
				<CardHeader>
					<h2 className="text-xl">Stwórz ogłoszenie</h2>
				</CardHeader>
				<Divider />
				<CardBody>
					<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
						{/* Kategoria */}
						<div>
							<Select
								className="w-full"
								label="Kategoria"
								placeholder="Wybierz kategorię"
								selectionMode="single"
								onSelectionChange={(selected) =>
									setCategory(parseInt(Array.from(selected)[0] as string))
								}>
								{categories.map((cat) => (
									<SelectItem key={cat.id} value={cat.id.toString()}>
										{cat.name}
									</SelectItem>
								))}
							</Select>
						</div>

						{/* Tytuł */}
						<div>
							<Input
								className="w-full"
								label="Tytuł"
								placeholder="Wpisz tytuł ogłoszenia"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>

						{/* Treść */}
						<div>
							<Textarea
								className="w-full"
								label="Treść ogłoszenia"
								labelPlacement="outside"
								placeholder="Opisz swoje ogłoszenie..."
								value={content}
								onChange={(e) => setContent(e.target.value)}
							/>
						</div>

						{/* Stawka godzinowa */}
						<div>
							<Input
								className="w-full"
								label="Stawka godzinowa"
								labelPlacement="outside"
								placeholder="0.00"
								startContent={
									<div className="pointer-events-none flex items-center">
										<span className="text-default-400 text-small">zł</span>
									</div>
								}
								type="number"
								value={hourlyRate.toString()}
								onChange={(e) =>
									setHourlyRate(
										e.target.value ? parseFloat(e.target.value) : ""
									)
								}
							/>
						</div>

						{/* Przycisk wysyłania */}
						<SubmitButton
							className="mt-2"
							type="submit"
							disabled={!title || !content || !hourlyRate || category === null}>
							Utwórz Ogłoszenie
						</SubmitButton>
					</form>
				</CardBody>
			</Card>
		</div>
	);
}
