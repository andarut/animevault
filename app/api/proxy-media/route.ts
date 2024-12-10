import { NextRequest, NextResponse } from "next/server";
import http from "http";
import https from "https";
import { Readable } from "stream";

export async function GET(request: NextRequest) {
	const url = request.nextUrl.searchParams.get("url");

	if (!url) {
		return NextResponse.json(
			{ error: "Missing URL parameter" },
			{ status: 400 },
		);
	}

	const range = request.headers.get("range");

	try {
		const protocol = url.startsWith("https") ? https : http;
		const mediaResponse = await new Promise<http.IncomingMessage>(
			(resolve, reject) => {
				const options: http.RequestOptions = {
					headers: range ? { Range: range } : undefined,
					timeout: 10000, // 10 seconds timeout
				};

				const req = protocol.get(url, options, (response) => {
					if (response.statusCode !== 200 && response.statusCode !== 206) {
						reject(
							new Error(`Request Failed. Status Code: ${response.statusCode}`),
						);
					}
					resolve(response);
				});

				req.on("error", (e) => {
					reject(new Error(`Request error: ${e.message}`));
				});

				req.on("timeout", () => {
					req.destroy();
					reject(new Error("Request timed out"));
				});
			},
		);

		const headers = new Headers();
		Object.entries(mediaResponse.headers).forEach(([key, value]) => {
			if (value) headers.set(key, value.toString());
		});

		// Ensure CORS headers are set
		headers.set("Access-Control-Allow-Origin", "*");
		headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
		headers.set("Access-Control-Allow-Headers", "Range");

		// Create a ReadableStream from the response
		const stream = new ReadableStream({
			start(controller) {
				mediaResponse.on("data", (chunk) => controller.enqueue(chunk));
				mediaResponse.on("end", () => controller.close());
				mediaResponse.on("error", (err) => controller.error(err));
			},
		});

		return new NextResponse(stream, {
			status: mediaResponse.statusCode ?? 200,
			headers: headers,
		});
	} catch (error) {
		console.error("Error proxying media:", error);
		return NextResponse.json(
			{ error: "Error proxying media: " + (error as Error).message },
			{ status: 502 },
		);
	}
}
