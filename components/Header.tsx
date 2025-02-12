// components/Header.tsx
"use client";
import { signOutAction } from "@/app/actions";
import { goToYourPosts } from "@/app/actions";
import React from "react";
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	Button,
} from "@heroui/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { Link } from "@heroui/link";
import {
	Avatar,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@heroui/react";

// Zmieniamy Header na komponent, który przyjmuje propsy
const Header = ({ user }: { user: any }) => {
	const handleAction = (key: React.Key) => {
		if (key === "logout") {
			signOutAction(); // Wywołanie akcji signOut
		}
		if (key === "your-posts") {
			// Przekierowanie na stronę z ogłoszeniami użytkownika
			goToYourPosts();
		}
	};

	return (
		<Navbar className="bg-black text-white" shouldHideOnScroll>
			<NavbarBrand className="flex">
				<AcademicCapIcon className="h-6 w-6 text-white" />
				<Link isBlock className="text-white font-normal" size="sm" href="/">
					Ekorepetycje
				</Link>
			</NavbarBrand>
			<NavbarContent className="hidden sm:flex gap-4" justify="center">
				<NavbarItem isActive>
					<Link className="text-white font-normal" size="sm" href="/">
						Ogłoszenia
					</Link>
				</NavbarItem>
			</NavbarContent>
			<NavbarContent justify="end">
				{user ? (
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name={user.email || "User"}
								size="sm"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Profile Actions"
							onAction={handleAction}
							variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-semibold">Jesteś zalogowany jako</p>
								<p className="font-semibold">{user.email}</p>
							</DropdownItem>
							<DropdownItem 
								key="your-posts"

							>
								Twoje ogłoszenia
							</DropdownItem>
							<DropdownItem
								key="logout"
								color="danger"
								className="font-semibold">
								Wyloguj się
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<NavbarItem className="flex">
							<Link className="text-white" size="sm" href="/sign-in">
								Zaloguj się
							</Link>
							</NavbarItem>
							<NavbarItem>
							<Button
								as={Link}
								color="secondary"
								href="/sign-up"
								variant="solid"
							>
								Zarejestruj się
							</Button>
							</NavbarItem>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
};

export default Header;
