import { signInAction } from "@/app/actions";
import { FormMessage } from "@/components/form-message";
import { Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

export default async function Login(props: { searchParams: Promise<Message> }) {
	const searchParams = await props.searchParams;

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<form className="flex flex-col">
					<h1 className="text-2xl font-medium mb-4">Zaloguj się</h1>
					<p className="text-sm text-foreground mb-6">
						Nie masz konta?{" "}
						<Link
							className="text-foreground font-medium underline"
							href="/sign-up">
							Zarejestruj się
						</Link>
					</p>
					<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
						<ErrorMessage />
						<Label htmlFor="email">Adres e-mail</Label>
						<Input name="email" placeholder="twoj@email.com" required />
						<div className="flex justify-between items-center">
							<Label htmlFor="password">Hasło</Label>
							<Link
								className="text-xs text-foreground underline"
								href="/forgot-password">
								Nie pamiętasz hasła?
							</Link>
						</div>
						<Input
							type="password"
							name="password"
							placeholder="Twoje hasło"
							required
						/>
						<SubmitButton pendingText="Logowanie..." formAction={signInAction}>
							Zaloguj się
						</SubmitButton>
						<FormMessage message={searchParams} />
					</div>
				</form>
			</div>
		</div>
	);
}
