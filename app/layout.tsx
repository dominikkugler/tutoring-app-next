
import { Geist } from "next/font/google";
import "./globals.css";
import { Button, ButtonGroup } from "@heroui/button";
import { Link } from "@heroui/link";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Korepetycje Elbląg",
	description: "Znajdź swojego idealnego nauczyciela",
};

const geistSans = Geist({
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={geistSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<main>
					<nav className="flex items-center justify-between p-4 bg-primary text-white">
						{/* Logo po lewej */}
						<div className="logo">
							<Link color="secondary" href="/">
								Logo
							</Link>
						</div>

						{/* Przyciski i link po prawej */}
						<div className="flex items-center space-x-5">
							<Link size="sm" color="secondary" href="#">
								Ogłoszenia
							</Link>
							<Button as={Link} color="secondary" href="" variant="solid">
								Zaloguj się
							</Button>
							<Button as={Link} color="secondary" href="" variant="ghost">
								Zarejestruj się
							</Button>
						</div>
					</nav>

					<div>{children}</div>
				</main>
			</body>
		</html>
	);
}
