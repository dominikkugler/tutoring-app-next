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

  const { data: posts } = await supabase
    .from('posts')
    .select(`
			*,
			categories (name)
	`);

	return (
		<>
			<main>
				<HeroUIProvider>
					<div className="flex">
						{/* Kolumna 1 - 20% szerokości */}
						<div className="w-[20%] p-12">
							
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
