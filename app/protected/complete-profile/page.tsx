import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from 'react';


export default async function CompleteProfilePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }

    // Divide this into a separate component
    // Logic needs to be in app/actions.ts
    // Here should be the form to complete the profile

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2 items-start">
                <h1 className="text-2xl font-medium">Hello {user.email}</h1>
                <h2 className="font-bold text-2xl mb-4">Complete your profile</h2>
                <p className="text-sm text-foreground/60">
                    Please complete your profile to continue using the app.
                </p>
            </div>
            
        </div>
    );
}
