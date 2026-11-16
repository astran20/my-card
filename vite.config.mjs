import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/my-card/",
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, "index.html"),
        cardPage: resolve(import.meta.dirname, "cardPage.html"),
        chat: resolve(import.meta.dirname, "helperPages/HELP_Chat.html"),
        faq: resolve(import.meta.dirname, "helperPages/HELP_FAQ.html"),
      },
    },
  },
});
