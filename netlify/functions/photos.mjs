import { getStore } from "@netlify/blobs";

const store = getStore("photobook");
const indexKey = "photos-index";

async function getPhotos() {
  const photos = await store.get(indexKey, { type: "json" });
  return Array.isArray(photos) ? photos : [];
}

async function savePhotos(photos) {
  await store.setJSON(indexKey, photos);
}

function parseDataUrl(dataUrl) {
  const match = String(dataUrl).match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return null;
  return {
    contentType: match[1],
    bytes: Buffer.from(match[2], "base64"),
  };
}

function validateBase(input) {
  const year = Number(input.year);
  const month = Number(input.month);

  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    throw new Error("A valid year is required.");
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("A valid month is required.");
  }

  return { year, month };
}

export default async (request) => {
  if (request.method === "GET") {
    const photos = await getPhotos();
    return new Response(JSON.stringify({ photos }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    });
  }

  if (request.method !== "POST" && request.method !== "DELETE") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json" },
    });
  }

  const expected = process.env.PHOTOBOOK_ADMIN_PIN;
  const received = request.headers.get("x-admin-pin");

  if (!expected) {
    return new Response(JSON.stringify({ error: "PHOTOBOOK_ADMIN_PIN is not configured." }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  if (!received || received !== expected) {
    return new Response(JSON.stringify({ error: "Invalid PIN." }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    if (request.method === "DELETE") {
      const url = new URL(request.url);
      const id = url.searchParams.get("id");
      if (!id) throw new Error("Photo id is required.");

      const photos = await getPhotos();
      const photo = photos.find((item) => item.id === id);
      if (!photo) throw new Error("Photo not found.");

      const nextPhotos = photos.filter((item) => item.id !== id);
      await savePhotos(nextPhotos);

      if (photo.source === "upload") {
        await store.delete("images/" + id);
      }

      return new Response(JSON.stringify({ deletedId: id, photos: nextPhotos }), {
        status: 200,
        headers: {
          "content-type": "application/json",
          "cache-control": "no-store",
        },
      });
    }

    const payload = await request.json();
    const { year, month } = validateBase(payload);
    const id = crypto.randomUUID();
    const source = payload.source === "upload" ? "upload" : "link";
    let url = String(payload.url ?? "").trim();

    if (source === "upload") {
      const image = parseDataUrl(url);
      if (!image) throw new Error("Uploaded image data is invalid.");
      if (image.bytes.byteLength > 4500000) {
        throw new Error("Image is too large after compression. Try a smaller file.");
      }
      await store.set("images/" + id, image.bytes, { metadata: { contentType: image.contentType } });
      url = "/.netlify/functions/photo-image?id=" + id;
    }

    if (!url) throw new Error("A photo URL or uploaded image is required.");

    const nextPhoto = {
      id,
      year,
      month,
      url,
      caption: String(payload.caption ?? "").slice(0, 220),
      monthNote: String(payload.monthNote ?? "").slice(0, 280),
      source,
      createdAt: new Date().toISOString(),
    };

    const photos = await getPhotos();
    const nextPhotos = [nextPhoto, ...photos];
    await savePhotos(nextPhotos);

    return new Response(JSON.stringify({ photo: nextPhoto, photos: nextPhotos }), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Invalid request." }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
};
