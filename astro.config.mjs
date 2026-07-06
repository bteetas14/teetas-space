import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://teetas-space.netlify.app",
  vite: {
    plugins: [tailwindcss()],
  },
});
