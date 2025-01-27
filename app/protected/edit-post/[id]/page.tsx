import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditPost({ params }: Props) {
  const { id } = params;
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
      {/* There should be a Form component*/}
      {/* Pass the post as props to the Form component */}
      {/* Prefill the form with the post data */}
    </div>
  );
}
