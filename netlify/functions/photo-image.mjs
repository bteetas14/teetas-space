import { getStore } from "@netlify/blobs";

const store = getStore("photobook");

export default async (request) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("Missing image id", { status: 400 });
  }

  const key = "images/" + id;
  const metadata = await store.getMetadata(key);
  const image = await store.get(key, { type: "arrayBuffer" });

  if (!image) {
    return new Response("Image not found", { status: 404 });
  }

  return new Response(image, {
    status: 200,
    headers: {
      "content-type": metadata?.contentType ?? "image/jpeg",
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
};
