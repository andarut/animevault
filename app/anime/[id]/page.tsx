"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Download, ChevronLeft } from "lucide-react";
import { animeList } from "../../../data";

export default function AnimeViewer({ params }: { params: { id: string } }) {
	const anime =
		animeList.find((a) => a.id === parseInt(params.id)) || animeList[0];
	const [currentEpisode, setCurrentEpisode] = useState(1);

	const handleDownload = () => {
		alert(`Downloading episode ${currentEpisode} of ${anime.title}`);
	};

	return (
		<div className="container mx-auto px-4 py-8 manga-container">
			<Link
				href="/"
				className="text-black hover:text-gray-700 mb-4 transition-colors duration-300 flex items-center manga-link"
			>
				<ChevronLeft className="mr-2" />
				Назад
			</Link>
			<div className="bg-white border-2 border-black p-6 mt-4 manga-card">
				<h1 className="text-4xl font-bold mb-6 text-black manga-title">
					{anime.title}
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="md:col-span-2">
						<div className="aspect-video bg-gray-100 mb-4 flex items-center justify-center relative overflow-hidden manga-screen">
							{/* <Image
								src={anime.image}
								alt={anime.title}
								layout="fill"
								objectFit="cover"
								className="absolute inset-0 manga-image"
							/> */}
							{/* <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
								<svg
									className="w-24 h-24 text-white opacity-75"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div> */}
							<video
								className="w-full aspect-video"
								src={`${anime.episode}${String(currentEpisode).padStart(2, "0")}.mp4`}
								controls
							/>
						</div>
						<div className="flex  space-x-4">
							{/* <Select
								value={currentEpisode.toString()}
								onValueChange={(value) => setCurrentEpisode(parseInt(value))}
							>
								<SelectTrigger className="w-[180px] bg-white text-black border-black manga-select">
									<SelectValue placeholder="Select episode" />
								</SelectTrigger>
								<SelectContent>
									{[...Array(anime.episodes)].map((_, i) => (
										<SelectItem key={i} value={(i + 1).toString()}>
											Episode {i + 1}
										</SelectItem>
									))}
								</SelectContent>
							</Select> */}
							{/* <Button
								onClick={handleDownload}
								className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 flex items-center manga-button"
							>
								<Download className="mr-2 h-4 w-4" />
								Download Episode
							</Button> */}
						</div>
					</div>
					<div>
						<h2 className="text-xl font-bold mb-4 text-black">Список серий</h2>
						<div className="space-y-2 max-h-[303px] overflow-y-auto manga-scrollbar">
							{[...Array(anime.episodes)].map((_, i) => (
								<Button
									key={i}
									onClick={() => setCurrentEpisode(i + 1)}
									className={`w-full justify-start ${
										currentEpisode === i + 1
											? "bg-black text-white"
											: "bg-white text-black border border-black"
									} hover:bg-gray-200 hover:text-black transition-colors duration-300 manga-button`}
								>
									{i + 1} серия
								</Button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
