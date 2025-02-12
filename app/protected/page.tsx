import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteButton from "@/app/protected/DeleteButton";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from('posts')
    .select(`
			  *,
        profiles (name),
			  categories (name)
	  `);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }


  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();


  if (!profile) {
    return redirect("/protected/complete-profile");
  }

  const { data: userPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', profile.id);

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome, {profile.name}!</h1>
        <p className="text-lg text-gray-500">You are signed in as {user.email}</p>
      </div>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4 bg-white p-4 rounded shadow-md">
          <h1 className="text-2xl font-bold border-b pb-2 mb-4">Your Posts</h1>
            {userPosts && userPosts.map((post) => (
            <li key={post.id} className="flex flex-col gap-2 p-4 border rounded hover:bg-gray-100 transition relative">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-500">{post.content}</p>
              <p className="text-gray-500">{post.hourlyrate}</p>
              <div className="absolute bottom-2 right-2 flex gap-2">
                
                <Link className="text-blue-600 hover:underline" href={`/protected/edit-post/${post.id}`}>Edit</Link>
                
                <DeleteButton postId={post.id}>Delete</DeleteButton>
            
              </div>
            </li>
            ))}
        </ul>
        <ul className="flex flex-col gap-4 bg-white p-4 rounded shadow-md">
          <h1 className="text-2xl font-bold border-b pb-2 mb-4">Posts</h1>
          {posts && posts.map((post) => (
            <li key={post.id} className="flex flex-col gap-2 p-4 border rounded hover:bg-gray-100 transition">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-500">{post.profiles.name}</p>
              <p className="text-gray-500">{post.content}</p>
              <p className="text-gray-500">{post.hourlyrate}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Link className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition" href="/protected/create-post">
          Create Post
        </Link>
      </div>
    </div>
  );
}
