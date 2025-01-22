import { signInAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login(props: { searchParams: Promise<Message> }) {
	const searchParams = await props.searchParams;
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
			<form className="flex flex-col gap-6 w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
				<h1 className="text-2xl font-medium text-center">Sign in</h1>
				<p className="text-sm text-foreground text-center">
					Don't have an account?{" "}
					<Link
						className="text-foreground font-medium underline"
						href="/sign-up">
						Sign up
					</Link>
				</p>
				<div className="flex flex-col gap-4 mt-6">
					<Label htmlFor="email">Email</Label>
					<Input name="email" placeholder="you@example.com" required />

					<div className="flex justify-between items-center">
						<Label htmlFor="password">Password</Label>
						<Link
							className="text-xs text-foreground underline"
							href="/forgot-password">
							Forgot Password?
						</Link>
					</div>
					<Input
						type="password"
						name="password"
						placeholder="Your password"
						required
					/>

					<SubmitButton pendingText="Signing In..." formAction={signInAction}>
						Sign in
					</SubmitButton>

					<FormMessage message={searchParams} />
				</div>
			</form>
		</div>
	);
}
