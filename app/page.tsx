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

	const { data: posts } = await supabase.from("posts").select(`
    *,
    profiles (name),
    categories (name)
  `);

	return (
		<>
			<main>
				<HeroUIProvider>
					<div className="flex flex-wrap md:flex-nowrap">
					{/* Lewa kolumna - 100% szerokości na mobile, 7.5% na większych ekranach */}
					<div className="w-full md:w-[7.5%] p-4 sm:p-6 md:p-12"></div>

					{/* Środkowa kolumna - 100% szerokości na mobile, 85% na większych ekranach */}
					<div className="w-full md:w-[85%] p-4 sm:p-6 md:p-12">
						{posts ? <PostList posts={posts} /> : <div>Loading posts...</div>}
					</div>

					{/* Prawa kolumna - 100% szerokości na mobile, 7.5% na większych ekranach */}
					<div className="w-full md:w-[7.5%] p-4 sm:p-6 md:p-12"></div>
					</div>
				</HeroUIProvider>
			</main>

		</>
	);
}
