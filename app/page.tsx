import {createClient} from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select(`
			*,
			categories (name)
	`);

	return (
		<div className="flex-1 w-full flex flex-col gap-12">
		  <div className="flex flex-col gap-4">
			
			<ul className="flex flex-col gap-4">
			  {posts && posts.map((post) => (
				<div key={post.id}>
				  <h1 className="text-2xl font-bold">Posts</h1>
				  <li key={post.id} className="flex flex-col gap-2">
					<h3 className="text-lg font-bold">{post.title}</h3>
					<h5 className="text-gray-500">{post.categories.name}</h5>
					<p className="text-gray-500">{post.content}</p>
					<p className="text-gray-500">{post.hourlyrate}</p>
				  </li>
				</div>
			  ))}
			</ul>
		  </div>
		  <div className="flex flex-col gap-4 text-center">
		  </div>
		</div>
	  );
}
