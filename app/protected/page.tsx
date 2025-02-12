import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PostList from "@/components/PostList";
import { HeroUIProvider } from "@heroui/react";
import {
	Pagination,
	PaginationItem,
	PaginationCursor,
} from "@heroui/pagination";
import { Button, Link } from "@heroui/react";
export default async function ProtectedPage() {
	const supabase = await createClient();

	const { data: posts } = await supabase.from("posts").select(`
    *,
    profiles (name),
    categories (name)
  `);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("user_id", user.id)
		.single();

	if (!profile) {
		return redirect("/protected/complete-profile");
	}

	return (
		<HeroUIProvider>
			<main>
				<div className="flex flex-col md:flex-row">
					{/* Lewa kolumna (20%) */}
					<div className="w-full md:w-[20%] p-4 sm:p-6 md:p-12"></div>

					{/* Środkowa kolumna (60%) */}
					<div className="flex flex-col w-full md:w-[60%] gap-4 p-4 sm:p-6 md:p-12">
						{posts ? (
							<PostList posts={posts} />
						) : (
							<div>Ładowanie postów...</div>
						)}
					</div>

					{/* Prawa kolumna (20%) */}
					<div className="w-full md:w-[20%] p-4 sm:p-6 md:p-12"></div>
				</div>
			</main>
		</HeroUIProvider>
	);
}
