"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { animeList } from "../data";

export default function Home() {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredAnime = animeList.filter((anime) =>
		anime.title.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className="container mx-auto px-4 py-8 manga-container">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredAnime.map((anime) => (
					<Link href={`/anime/${anime.id}`} key={anime.id} className="group">
						<div className="bg-white border-2 border-black transition-all duration-300 overflow-hidden manga-card flex flex-col h-full">
							<div className="relative aspect-[3/4] flex-shrink-0">
								<Image
									src={`/api/proxy-media?url=${encodeURIComponent(anime.image)}`}
									alt={anime.title}
									layout="fill"
									objectFit="cover"
									className="group-hover:scale-105 transition-transform duration-300 manga-image"
								/>
							</div>
							<div className="p-3 flex-grow flex items-center">
								{" "}
								{/* Flexible height container for title */}
								<h2 className="text-l font-bold text-black group-hover:text-gray-700 transition-colors duration-300 break-words hyphens-auto">
									{anime.title}
								</h2>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
