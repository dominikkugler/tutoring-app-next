import { signUpAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

export default async function Signup(props: {
	searchParams: Promise<Message>;
}) {
	const searchParams = await props.searchParams;

	if ("message" in searchParams) {
		return (
			<div className="w-full flex items-center justify-center h-screen bg-gray-50 p-4">
				<FormMessage message={searchParams} />
			</div>
		);
	}

	return (
		<>
			<div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
				<form className="flex flex-col gap-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
					<h1 className="text-2xl font-medium text-center">Załóż konto</h1>
					<p className="text-sm text-foreground text-center">
						Masz już konto?{" "}
						<Link
							className="text-primary font-medium underline"
							href="/sign-in">
							Zaloguj się
						</Link>
					</p>
					<div className="flex flex-col gap-4 mt-6">
						<Label htmlFor="email">Email</Label>
						<Input name="email" placeholder="you@example.com" required />
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							name="password"
							placeholder="Your password"
							minLength={6}
							required
						/>
						<SubmitButton formAction={signUpAction} pendingText="Signing up...">
							Sign up
						</SubmitButton>
						<FormMessage message={searchParams} />
					</div>
				</form>
			</div>
			<SmtpMessage />
		</>
	);
}
