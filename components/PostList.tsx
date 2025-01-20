import React from "react";
import Post from "./Post"; // Importuj wcześniej przygotowany komponent Post

interface PostData {
	id: string; // Unikalny identyfikator każdego posta
	authorName: string;
	subject: string;
	avatarUrl: string;
	content: string;
	linkUrl: string;
}

interface PostListProps {
	posts: PostData[]; // Tablica danych ogłoszeń
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
	return (
		<div className="flex flex-col gap-6">
			{" "}
			{/* Styl do odstępów między postami */}
			{posts.map((post) => (
				<Post
					key={post.id} // Ważne: unikalny klucz
					authorName={post.authorName}
					subject={post.subject}
					avatarUrl={post.avatarUrl}
					content={post.content}
					linkUrl={post.linkUrl}
				/>
			))}
		</div>
	);
};

export default PostList;
