import Link from "next/link";

export default function Navigation() {
	return (
		<nav className="bg-white border-b-2 border-black">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center py-4">
					<Link href="/" className="text-3xl font-bold text-black manga-title">
						AnimeVault
					</Link>
					{/* <ul className="flex space-x-4">
						<li>
							<Link
								href="/"
								className="text-black hover:text-gray-700 transition-colors duration-300 manga-link"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="text-black hover:text-gray-700 transition-colors duration-300 manga-link"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="#"
								className="text-black hover:text-gray-700 transition-colors duration-300 manga-link"
							>
								Contact
							</Link>
						</li>
					</ul> */}
				</div>
			</div>
		</nav>
	);
}
