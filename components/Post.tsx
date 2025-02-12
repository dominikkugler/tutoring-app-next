import React from "react";
import { Button, ButtonGroup } from "@heroui/button";
import { MdAccountCircle } from "react-icons/md";
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
	Chip,
} from "@heroui/react";

interface PostProps {
	title: string; // Tytuł posta
	authorName: string; // Imię autora
	categoryName: string; // Nazwa kategorii
	hourlyRate: number; // Stawka godzinowa
	createdAt: string; // Data utworzenia
}

const Post: React.FC<PostProps> = ({
	title,
	authorName,
	categoryName,
	hourlyRate,
	createdAt,
}) => {
	return (
		<HeroUIProvider>
			<Card className="max-w-[full]">
				<CardHeader className="flex gap-3">
					<div className="flex flex-row items-center justify-between w-full">
						<div className="flex flex-row gap-3">
							<MdAccountCircle size={48} className="text-gray-500" />{" "}
							{/* Ikona zamiast obrazka */}
							<div className="flex flex-col">
								<p className="text-md">{authorName}</p>
								<p className="text-small text-default-500">{categoryName}</p>
							</div>
						</div>
						<Chip
							classNames={{
								base: "bg-gradient-to-br p-2 px-3 from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
								content: "drop-shadow shadow-black text-white ",
							}}
							variant="shadow">
							{hourlyRate} zł / 60 min
						</Chip>
					</div>
				</CardHeader>
				<Divider />
				<CardBody>
					<p>{title}</p>
				</CardBody>
				<Divider />
				<CardFooter>
					<div className="flex flex-row items-center justify-between w-full">
						<div className="flex flex-row items-center gap-3">
							<p className="text-small text-default-500">104 Opinie</p>
							<p className="text-small text-default-500">
								Online, Warszawa i 4 inne
							</p>
						</div>

						<Link
							className="block text-sm text-primary hover:bg-[#171717] hover:text-white transition-colors duration-300 ease-in-out px-3 py-2 rounded-md"
							href={"https://github.com/heroui-inc/heroui"}>
							{"Zobacz ogłoszenie"}
						</Link>
					</div>
				</CardFooter>
			</Card>
		</HeroUIProvider>
	);
};

export default Post;
