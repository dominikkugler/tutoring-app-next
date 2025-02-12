import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import PostList from "@/components/PostList";
import { HeroUIProvider } from "@heroui/react";
import { Pagination } from "@heroui/react";
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
				<div className="flex">
					{/* Lewa kolumna (20%) */}
					<div className="w-[20%] p-12"></div>

					{/* Środkowa kolumna (60%) */}
					<div className="flex flex-col w-[60%] gap-6 p-12">
						<Link href="/protected/create-post">
							<Button color="primary">Dodaj ogłoszenie</Button>
						</Link>
						{posts ? (
							<PostList posts={posts} />
						) : (
							<div>Ładowanie postów...</div>
						)}
						<Pagination initialPage={1} total={10} />
					</div>

					{/* Prawa kolumna (20%) */}
					<div className="w-[20%] p-4"></div>
				</div>
			</main>
		</HeroUIProvider>
	);
}
