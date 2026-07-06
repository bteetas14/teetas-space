export function toGoogleDriveImageUrl(input: string) {
  const trimmed = input.trim();

  if (!trimmed.includes("drive.google.com")) {
    return trimmed;
  }

  const fileId =
    trimmed.match(/\/file\/d\/([^/]+)/)?.[1] ??
    trimmed.match(/[?&]id=([^&]+)/)?.[1];

  if (!fileId) {
    return trimmed;
  }

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
}
