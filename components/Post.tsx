import React from "react";
import { MdAccountCircle } from "react-icons/md";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Divider,
	Link,
	Chip,
	HeroUIProvider,
} from "@heroui/react";

interface PostProps {
	id: number; // ID posta do generowania dynamicznego linku
	title: string;
	content: string;
	authorName: string;
	categoryName: string;
	hourlyRate: number;
	createdAt: string;
}

const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(dateString).toLocaleDateString("pl-PL", options);
};

const Post: React.FC<PostProps> = ({
	id,
	title,
	content,
	authorName,
	categoryName,
	hourlyRate,
	createdAt,
}) => {
	return (
		<HeroUIProvider>
			<Card className="max-w-full">
				<CardHeader className="flex gap-3">
					<div className="flex flex-row items-center justify-between w-full">
						<div className="flex flex-row gap-3">
							<MdAccountCircle size={48} className="text-gray-500" />
							<div className="flex flex-col">
								<p className="text-md">{title}</p>
								<p className="text-small text-default-500">
									{authorName} • {categoryName}
								</p>
							</div>
						</div>
						<Chip
							classNames={{
								base: "bg-gradient-to-br p-2 px-3 from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
								content: "drop-shadow shadow-black text-white",
							}}
							variant="shadow">
							{hourlyRate} zł / 60 min
						</Chip>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<p className="whitespace-pre-line text-small text-default-700">
						{content.split(" ").slice(0, 20).join(" ")}
						{content.split(" ").length > 20 ? "..." : ""}
					</p>
				</CardBody>
				<Divider />
				<CardFooter>
					<div className="flex flex-row items-center justify-between w-full">
						<p className="text-small text-default-500">
							{formatDate(createdAt)}
						</p>

						<Link
							className="block text-sm text-primary hover:bg-[#171717] hover:text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded-md"
							href={`/protected/post/${id}`}>
							Zobacz ogłoszenie
						</Link>
					</div>
				</CardFooter>
			</Card>
		</HeroUIProvider>
	);
};

export default Post;
