"use client";

import { useState } from "react";
import { ChevronLeft, Book, Film } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { animeList, mangaList } from "../../../data";

export default function ContentViewer({ params }: { params: { id: string } }) {
	const anime = animeList.find((a) => a.id === parseInt(params.id));
	const manga = mangaList.find((m) => m.id === parseInt(params.id));
	const content = anime || manga;

	const [currentEpisode, setCurrentEpisode] = useState(0);
	const [viewMode, setViewMode] = useState<"anime" | "manga">(
		anime ? "anime" : "manga",
	);

	if (!content) {
		return <div>Content not found</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8 content-container">
			<Link
				href="/"
				className="text-black hover:text-gray-700 mb-4 transition-colors duration-300 flex items-center content-link"
			>
				<ChevronLeft className="mr-2" />
				Назад
			</Link>
			<div className="bg-white border-2 border-black p-6 mt-4 content-card">
				<h1 className="text-4xl font-bold mb-6 text-black content-title">
					{content.title}
				</h1>
				{anime && manga && (
					<div className="mb-4">
						<Button
							onClick={() => setViewMode("anime")}
							variant={viewMode === "anime" ? "default" : "outline"}
							className="mr-2"
						>
							<Film className="mr-2" />
							Аниме
						</Button>
						<Button
							onClick={() => setViewMode("manga")}
							variant={viewMode === "manga" ? "default" : "outline"}
						>
							<Book className="mr-2" />
							Манга
						</Button>
					</div>
				)}
				{viewMode === "anime" ? (
					<div>
						<h2 className="text-xl font-bold mb-4 text-black">Список серий</h2>
						<div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto content-scrollbar">
							{Object.entries(anime!.links).map(([text, link], i) => (
								<a
									key={i}
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="block w-full text-left px-4 py-2 bg-white text-black border border-black hover:bg-gray-200 hover:text-black transition-colors duration-300 content-button"
								>
									{text}
								</a>
							))}
						</div>
					</div>
				) : (
					<div className="h-[calc(100vh-200px)]">
						<h2 className="text-xl font-bold mb-4 text-black">Список глав</h2>
						<div className="space-y-2 overflow-y-auto content-scrollbar h-full">
							{Object.entries(manga!.links).map(([text, link], i) => (
								<a
									key={i}
									href={link}
									target="_blank"
									rel="noopener noreferrer"
									className="block w-full text-left px-4 py-2 bg-white text-black border border-black hover:bg-gray-200 hover:text-black transition-colors duration-300 content-button"
								>
									{text}
								</a>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
