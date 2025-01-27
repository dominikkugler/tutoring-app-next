import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Welcome, {profile.name}!</h1>
        <p className="text-lg text-gray-500">You are signed in as {user.email}</p>
      </div>
      <div className="flex flex-col gap-4">
        
        <ul className="flex flex-col gap-4">
          {posts && posts.map((post) => (
            <div key={post.id}>
              <h1 className="text-2xl font-bold">Posts</h1>
              <li key={post.id} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-500">{post.profiles.name}</p>
                <p className="text-gray-500">{post.content}</p>
                <p className="text-gray-500">{post.hourlyrate}</p>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 text-center">
        <Link className="text-white-600 bg-black-200 py-2 px-4 rounded" href="/protected/create-post">Create Post</Link>
      </div>
    </div>
  );
}
