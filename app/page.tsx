import {createClient} from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {data: categories} = await supabase.from("categories").select("*");

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-lg font-bold">Welcome to the Supabase connected App</p>
        <p>Here's the data from Supabase:</p>
        <ul className="list-disc list-inside mt-4">
          {categories?.map((category) => (
            <li key={category.id} className="text-base text-gray-700">
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
