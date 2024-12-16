import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Manga Anime Hub",
	description: "Experience anime with a stylish manga-inspired design",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-white text-black`}>
				<div className="min-h-screen flex flex-col manga-background">
					<Navigation />
					<main className="flex-grow">{children}</main>
					<footer className="bg-white text-black p-4 text-center border-t-2 border-black">
						<p className="manga-text">
							© 2024 AnimeVault. All rights reserved.
						</p>
					</footer>
				</div>
				<Analytics />
			</body>
		</html>
	);
}
