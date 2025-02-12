import React from "react";
import Post from "./Post"; // Importuj wcześniej przygotowany komponent Post

interface PostData {
	id: string;
	title: string;
	user_id: string;
	category_id: string;
	content: string;
	hourlyrate: number;
	created_at: string;
	profiles: {
		name: string;
	};
	categories: {
		name: string;
	};
}

interface PostListProps {
	posts: PostData[]; // Tablica danych postów
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
	return (

		<div className="flex flex-col gap-6">
			{posts.map((post) => (
				<Post
					key={post.id}
					id={parseInt(post.id, 10)}
					title={post.title}
					content={post.content}
					authorName={post.profiles?.name ?? "Nieznany autor"}
					categoryName={post.categories?.name ?? "Brak kategorii"}
					hourlyRate={post.hourlyrate}
					createdAt={post.created_at}
				/>
			))}
		</div>

	);
};

export default PostList;
