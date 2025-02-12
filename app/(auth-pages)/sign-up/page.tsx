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
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<FormMessage message={searchParams} />
			</div>
		);
	}

	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
					<form className="flex flex-col">
						<h1 className="text-2xl font-medium mb-4">Załóż konto</h1>
						<p className="text-sm text-foreground mb-6">
							Masz już konto?{" "}
							<Link
								className="text-foreground font-medium underline"
								href="/sign-in">
								Zaloguj się
							</Link>
						</p>
						<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
							<Label htmlFor="email">Adres e-mail</Label>
							<Input name="email" placeholder="twoj@email.com" required />
							<Label htmlFor="password">Hasło</Label>
							<Input
								type="password"
								name="password"
								placeholder="Twoje hasło"
								minLength={6}
								required
							/>
							<SubmitButton
								formAction={signUpAction}
								pendingText="Tworzenie konta...">
								Zarejestruj się
							</SubmitButton>
							<FormMessage message={searchParams} />
						</div>
					</form>
				</div>
			</div>
			<SmtpMessage />
		</>
	);
}
