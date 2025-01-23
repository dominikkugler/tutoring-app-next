import React from "react";
import Post from "@/components/Post";
import PostList from "@/components/PostList";
import { createClient } from "@/utils/supabase/server";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Image,
	CheckboxGroup,
	Checkbox,
	HeroUIProvider,
} from "@heroui/react";

export default async function Home() {
	const supabase = await createClient();
	// Pobierz dane z tabeli `categories`
	const { data: categories, error: categoriesError } = await supabase
		.from("categories")
		.select("*");

	// Pobierz dane z tabeli `posts` z relacjami do `users` i `categories`
	const { data: posts, error: postsError } = await supabase.from("posts")
		.select(`
    *,
    profiles (
      name
    ),
	categories (
      name
    )
	  
  `);

	// Obsługa błędów
	if (postsError || categoriesError) {
		console.error(
			"Error fetching posts or categories:",
			postsError?.message || categoriesError?.message
		);
		return <div>Error loading posts or categories</div>;
	}

	// Przekształcamy dane, aby użytkownicy i kategorie były obiektami, a nie tablicami

	return (
		<>
			<main>
				<HeroUIProvider>
					<div className="flex">
						{/* Kolumna 1 - 20% szerokości */}
						<div className="w-[20%] p-12">
							<CheckboxGroup
								defaultValue={["buenos-aires", "london"]}
								label="Select cities">
								<Checkbox value="buenos-aires">Buenos Aires</Checkbox>
								<Checkbox value="sydney">Sydney</Checkbox>
								<Checkbox value="san-francisco">San Francisco</Checkbox>
								<Checkbox value="london">London</Checkbox>
								<Checkbox value="tokyo">Tokyo</Checkbox>
							</CheckboxGroup>
						</div>

						{/* Kolumna 2 - 60% szerokości */}
						<div className="flex flex-col w-[60%] gap-6 p-12">
							{/* PostList generuje dynamicznie listę postów */}
							{posts ? <PostList posts={posts} /> : <div>Loading posts...</div>}
						</div>
						{/* Kolumna 1 - 20% szerokości */}
						<div className="w-[20%] p-4"></div>
					</div>
				</HeroUIProvider>
			</main>
		</>
	);
}
