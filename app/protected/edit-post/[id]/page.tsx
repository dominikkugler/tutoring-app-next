import { createClient } from "@/utils/supabase/server";
import EditForm from "@/app/protected/edit-post/EditForm";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPost({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  return (
    <div>
      <h1>Edit Post</h1>
      <p>Editing post with ID: {id}</p>
      <EditForm post={post} />

    </div>
  );
}
