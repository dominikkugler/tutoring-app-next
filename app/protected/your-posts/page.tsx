import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import DeleteButton from "@/app/protected/DeleteButton";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Button,
	HeroUIProvider,
} from "@heroui/react";
import { UserIcon } from "lucide-react";

export default async function YourPosts() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: profile } = await supabase
		.from("profiles")
		.select("*")
		.eq("user_id", user?.id)
		.single();

	const { data: userPosts } = await supabase
		.from("posts")
		.select("*")
		.eq("user_id", profile.id);

	return (
		<HeroUIProvider>
			<main className="flex justify-center p-6 min-h-screen">
				<div className="max-w-3xl w-full">
					<div className="flex flex-col gap-3 mb-10 text-center">
						<h1 className="text-2xl ">Twoje ogłoszenia</h1>
						<Link href="/protected/create-post">
							<Button color="primary">Dodaj ogłoszenie</Button>
						</Link>
					</div>

					<div className="flex flex-col gap-6">
						{userPosts &&
							userPosts.map((post) => (
								<Card key={post.id} className="shadow-lg">
									<CardHeader
										className="text-left"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "flex-start",
											textAlign: "left",
											alignItems: "flex-start",
										}}>
										<h3 className="text-lg font-semibold">{post.title}</h3>
										<p className="text-gray-500 mt-1">
											Stawka: {post.hourlyrate} zł / 60 min
										</p>
									</CardHeader>

									<Divider />
									<CardBody>
										<p className="text-default-700 whitespace-pre-line">
											{post.content.split(" ").slice(0, 20).join(" ")}
											{post.content.split(" ").length > 20 ? " ..." : ""}
										</p>
									</CardBody>
									<Divider />
									<CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
										<div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
											
											<DeleteButton postId={post.id}>Usuń</DeleteButton>
										</div>
										<Link
											href={`/protected/post/${post.id}`}
											className="w-full sm:w-auto">
											<Button color="secondary" className="w-full sm:w-auto">
												Zobacz ogłoszenie
											</Button>
										</Link>
									</CardFooter>
								</Card>
							))}
					</div>
				</div>
			</main>
		</HeroUIProvider>
	);
}
