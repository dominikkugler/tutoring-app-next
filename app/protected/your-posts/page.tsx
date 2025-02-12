import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import DeleteButton from '@/app/protected/DeleteButton';

export default async function YourPosts() {
    const supabase = await createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user?.id)
    .single();

  const { data: userPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', profile.id);
    // dodać redirect do /protected 
    return (
        <div>
            {userPosts && userPosts.map((post) => (
            <li key={post.id} className="flex flex-col gap-2 p-4 border rounded hover:bg-gray-100 transition relative">
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-500">{post.content}</p>
              <p className="text-gray-500">{post.hourlyrate}</p>
              <div className="absolute bottom-2 right-2 flex gap-2">
                
                <Link className="text-blue-600 hover:underline" href={`/protected/edit-post/${post.id}`}>Edit</Link>
                
                <DeleteButton postId={post.id}>Delete</DeleteButton>

                <Link
							href={`/protected/post/${post.id}`}>
							Zobacz ogłoszenie
						</Link>
            
              </div>
            </li>
            ))}
        </div>
    );
}