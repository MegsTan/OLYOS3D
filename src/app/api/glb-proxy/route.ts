import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ALLOWED_HOSTS = new Set(["p.olyofiles.site"]);

export async function GET(request: NextRequest) {
	const sourceUrl = request.nextUrl.searchParams.get("url");

	if (!sourceUrl) {
		return NextResponse.json({ error: "Missing url query parameter." }, { status: 400 });
	}

	let url: URL;

	try {
		url = new URL(sourceUrl);
	} catch {
		return NextResponse.json({ error: "Invalid url query parameter." }, { status: 400 });
	}

	if (url.protocol !== "https:" && url.protocol !== "http:") {
		return NextResponse.json({ error: "Only http and https URLs are supported." }, { status: 400 });
	}

	if (!ALLOWED_HOSTS.has(url.hostname)) {
		return NextResponse.json({ error: `Host is not allowed: ${url.hostname}` }, { status: 403 });
	}

	const upstreamHeaders = new Headers();
	const range = request.headers.get("range");

	if (range) {
		upstreamHeaders.set("range", range);
	}

	const upstream = await fetch(url, {
		headers: upstreamHeaders,
		cache: "no-store",
	});

	if (!upstream.ok && upstream.status !== 206) {
		return NextResponse.json(
			{ error: `Remote file request failed with status ${upstream.status}.` },
			{ status: upstream.status || 502 }
		);
	}

	const responseHeaders = new Headers();
	const contentType = upstream.headers.get("content-type") ?? "model/gltf-binary";
	const contentLength = upstream.headers.get("content-length");
	const contentRange = upstream.headers.get("content-range");
	const acceptRanges = upstream.headers.get("accept-ranges");

	responseHeaders.set("content-type", contentType);
	responseHeaders.set("cache-control", "no-store");

	if (contentLength) {
		responseHeaders.set("content-length", contentLength);
	}

	if (contentRange) {
		responseHeaders.set("content-range", contentRange);
	}

	if (acceptRanges) {
		responseHeaders.set("accept-ranges", acceptRanges);
	}

	return new Response(upstream.body, {
		status: upstream.status,
		headers: responseHeaders,
	});
}
