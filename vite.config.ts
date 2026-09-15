import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// base = назва репо: сайт живе на spodarenko.github.io/grizzly-brief/
export default defineConfig({
  base: "/grizzly-brief/",
  plugins: [react()],
});
