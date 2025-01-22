import React from "react";
import Post from "@/components/Post";
import PostList from "@/components/PostList";
import {createClient} from "@/utils/supabase/server";
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

const posts = [
	{
		id: "1",
		authorName: "Kacper Kobyłecki",
		subject: "Matematyka",
		avatarUrl: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
		content:
			"Chcę, aby nasze lekcje były nie tylko efektywne, ale również pełne radości i zaangażowania. Aby lepiej poznać moje metody nauczania i dowiedzieć się, jak mogę pomóc Ci w nauce języka niemieckiego, zapraszam do udziału w krótkim quizie!",
		linkUrl: "https://github.com/heroui-inc/heroui",
	},
	{
		id: "2",
		authorName: "Anna Nowak",
		subject: "Fizyka",
		avatarUrl: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
		content:
			"Zapraszam do odkrywania tajemnic fizyki i nauki w przyjaznej atmosferze.",
		linkUrl: "https://example.com",
	},
	{
		id: "3",
		authorName: "Jan Kowalski",
		subject: "Chemia",
		avatarUrl: "https://avatars.githubusercontent.com/u/86160567?s=200&v=4",
		content:
			"Zainspiruj się chemią i odkryj jej praktyczne zastosowania w życiu codziennym.",
		linkUrl: "https://example.com",
	},
];

export default async function Home() {
    const supabase = await createClient();
    const {data: categories} = await supabase.from("categories").select("*");
	return (
		<>
			<main>
				<HeroUIProvider>
					<div className="flex">
						{/* Kolumna 1 - 20% szerokości */}
						<div className="w-[20%] p-12">
							<CheckboxGroup
								defaultValue={["buenos-aires", "london"]}
								label="Select cities">
								<Checkbox value="buenos-aires">Buenos Aires</Checkbox>
								<Checkbox value="sydney">Sydney</Checkbox>
								<Checkbox value="san-francisco">San Francisco</Checkbox>
								<Checkbox value="london">London</Checkbox>
								<Checkbox value="tokyo">Tokyo</Checkbox>
							</CheckboxGroup>
						</div>

						{/* Kolumna 2 - 60% szerokości */}
						<div className="flex flex-col w-[60%] gap-6 p-12">
							{/* PostList generuje dynamicznie listę postów */}
							<PostList posts={posts} />
						</div>
						{/* Kolumna 1 - 20% szerokości */}
						<div className="w-[20%] p-4"></div>
					</div>
				</HeroUIProvider>
			</main>
		</>
	);

}
