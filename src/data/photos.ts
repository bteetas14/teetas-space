export type Photo = {
  year: number;
  title: string;
  url: string;
  caption: string;
  location?: string;
};

export const photos: Photo[] = [
  {
    year: 2026,
    title: "Evening Walk",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    caption: "A placeholder memory. Replace this with a public Google Drive image link.",
    location: "Somewhere outside",
  },
  {
    year: 2026,
    title: "Rain Notes",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    caption: "A quiet frame for the yearly archive.",
    location: "Home",
  },
  {
    year: 2025,
    title: "Window Light",
    url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    caption: "Older years can sit beside newer ones without changing the page code.",
  },
];

export function photosByYear() {
  return photos.reduce<Record<number, Photo[]>>((years, photo) => {
    years[photo.year] = [...(years[photo.year] ?? []), photo];
    return years;
  }, {});
}
