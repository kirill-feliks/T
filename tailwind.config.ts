import type { Config } from "tailwindcss";
const config: Config = { darkMode: ["class"], content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme: { extend: { colors: { graphite: "#09090f", orchid: "#cc7cff", roseglow: "#ff6fae", champagne: "#f7d7b4" }, fontFamily: { sans: ["var(--font-geist-sans)", "Inter", "sans-serif"] }, boxShadow: { glow: "0 0 80px rgba(204,124,255,.25)" } } }, plugins: [require("tailwindcss-animate")] };
export default config;
