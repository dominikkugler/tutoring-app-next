'use client';
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/submit-button";
import { completeProfileAction } from '@/app/actions';

export default function CompleteProfilePage() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    return (
        <div className="flex-1 w-full flex flex-col gap-12">
            <div className="flex flex-col gap-2 items-start">
                <h2 className="font-bold text-2xl mb-4">Complete your profile</h2>
                <p className="text-sm text-foreground/60">
                    Please complete your profile to continue using the app.
                </p>
            </div>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <Label htmlFor="name" className="font-bold">Name</Label>
                    <Input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor="phone" className="font-bold">Phone</Label>
                    <Input
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <Label htmlFor="role" className="font-bold">Role</Label>
                    <select
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className='border border-gray-300 rounded-md p-2'
                    >
                        <option value="">Select Role</option>
                        <option value="tutor">Tutor</option>
                        <option value="student">Student</option>
                    </select>
                </div>
                <div className="flex flex-col w-full">
                    <SubmitButton  
                        formAction={completeProfileAction}
                        pendingText="Completing profile..."
                        disabled={!name || !phone || !role}
                        className="w-full"
                    >
                        Complete Profile
                    </SubmitButton>
                </div>
            </form>
        </div>
    );
}
