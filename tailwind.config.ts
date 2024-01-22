import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary_gray:"#757B8D",
        secondary_gray:"#878C9F",
        darkBlue:"#144273"
      },
    },
  },
  plugins: [],
};
export default config;
