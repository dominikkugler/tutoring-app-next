import { createClient } from "@/utils/supabase/server";
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
import { MdAccountCircle } from "react-icons/md";
type Props = {
	params: {
		id: string;
	};
};

export default async function PostPage({ params }: Props) {
	console.log("Post ID:", params.id);

	const supabase = await createClient();

	const { data: post, error } = await supabase
		.from("posts")
		.select("*")
		.eq("id", params.id)
		.single();

	console.log("Post data:", post, "Error:", error);

	if (error || !post) {
		return <div>Nie znaleziono posta.</div>;
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
							description="Brak kategorii"
							name="Nieznany autor"
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
									<div className="text-tiny">515 476 148</div>
								</div>
							</PopoverContent>
						</Popover>
					</CardFooter>
				</Card>
			</main>
		</HeroUIProvider>
	);
}
