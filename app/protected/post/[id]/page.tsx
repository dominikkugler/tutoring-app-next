import { createClient } from "@/utils/supabase/server";
import { JSX } from "react";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	HeroUIProvider,
	User,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Button,
} from "@heroui/react";
type Props = {
	params: {
		id: string;
	};
};

export default async function PostPage({ params }: Props): Promise<JSX.Element> {
	console.log("Post ID:", params.id);

	const supabase = await createClient();

	const { data: post, error } = await supabase
		.from("posts")
		.select("*")
		.eq("id", params.id)
		.single();

	if (error || !post) {
		return <div>Nie znaleziono posta.</div>;
	}

	const { data: profile, error: profileError } = await supabase
		.from("profiles")
		.select("name, phone")
		.eq("id", post.user_id)
		.single();

	const {data: category} = await supabase
		.from("categories")
		.select("name")
		.eq("id", post.category_id)
		.single();

	if (profileError || !profile) {
		return <div>Nie znaleziono profilu autora.</div>;
	}

	

	return (
		<HeroUIProvider>
			<main className="flex justify-center items-center p-12">
				<Card className="max-w-4xl w-full shadow-lg rounded-lg">
					<CardHeader className="flex flex-col gap-2 text-left items-start">
						<User
							avatarProps={{
								src: "https://i.pravatar.cc/",
							}}
							description={category?.name ?? "Unknown Category"}
							name={profile.name}
						/>
						<h1 className="text-lg text-gray-800">{post.title}</h1>
						<p className="text-sm text-gray-400">
							{new Date(post.created_at).toLocaleDateString("pl-PL")}
						</p>
					</CardHeader>
					<Divider />
					<CardBody>
						<p className="whitespace-pre-line text-small text-default-700">
							{post.content}
						</p>
					</CardBody>
					<Divider />
					<CardFooter className="flex justify-between items-center">
						<div className="text-small text-default-500">
							Stawka: {post.hourlyrate} zł / 60 min
						</div>
						<Popover placement="right">
							<PopoverTrigger>
								<Button>Wyświetl numer telefonu</Button>
							</PopoverTrigger>
							<PopoverContent>
								<div className="px-1 py-2">
									<div className="text-small font-semibold">
										Numer Telefonu:
									</div>
									{/* Zmienic na numer telefonu -> user_id -> profiles -> profiles.phone */}
									<div className="text-tiny">{profile.phone}</div>
								</div>
							</PopoverContent>
						</Popover>
					</CardFooter>
				</Card>
			</main>
		</HeroUIProvider>
	);
}
