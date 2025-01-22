import React from "react";
import { Button, ButtonGroup } from "@heroui/button";
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
	authorName: string;
	subject: string;
	avatarUrl: string;
	content: string;
	linkUrl: string;
	linkText?: string;
}

const Post: React.FC<PostProps> = ({
	authorName,
	subject,
	avatarUrl,
	content,
	linkUrl,
	linkText = "Zobacz ogłoszenie",
}) => {
	return (
		<Card className="max-w-[full]">
			<CardHeader className="flex gap-3">
				<div className="flex flex-row items-center justify-between w-full">
					<div className="flex flex-row gap-3">
						<Image
							alt="avatar"
							height={48}
							radius="sm"
							src={avatarUrl}
							width={48}
						/>
						<div className="flex flex-col">
							<p className="text-md">{authorName}</p>
							<p className="text-small text-default-500">{subject}</p>
						</div>
					</div>
					<Chip
						classNames={{
							base: "bg-gradient-to-br p-2 from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
							content: "drop-shadow shadow-black text-white",
						}}
						variant="shadow">
						160 zł / 60 minut
					</Chip>
				</div>
			</CardHeader>
			<Divider />
			<CardBody>
				<p>{content}</p>
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
						href={linkUrl}>
						{linkText}
					</Link>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Post;
