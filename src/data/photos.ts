export type Photo = {
  id?: string;
  year: number;
  month: number;
  title?: string;
  url: string;
  caption: string;
  monthNote?: string;
  location?: string;
  createdAt?: string;
};

export const photos: Photo[] = [
  {
    id: "seed-evening-walk",
    year: 2026,
    month: 7,
    title: "Evening Walk",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    caption: "A small evening worth keeping.",
    monthNote: "Tiny scraps from warm days.",
  },
  {
    id: "seed-rain-notes",
    year: 2026,
    month: 7,
    title: "Rain Notes",
    url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    caption: "Rainy light and soft plans.",
    monthNote: "Tiny scraps from warm days.",
  },
  {
    id: "seed-window-light",
    year: 2026,
    month: 5,
    title: "Window Light",
    url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    caption: "A quiet corner of the month.",
    monthNote: "Slow days, saved gently.",
  },
];

export function photosByYear() {
  return photos.reduce<Record<number, Photo[]>>((years, photo) => {
    years[photo.year] = [...(years[photo.year] ?? []), photo];
    return years;
  }, {});
}
