export default {
  content: [`./**/*.{js,jsx,html}`, `!./node_modules/`],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Nunito`, `ui-sans-serif`, `system-ui`, `sans-serif`],
        serif: [`ui-serif`, `Georgia`, `serif`],
        mono: [`ui-monospace`, `SFMono-Regular`, `monospace`],
      },
    },
  },
  plugins: [
    require(`@tailwindcss/typography`),
    require(`@tailwindcss/aspect-ratio`),
  ],
}
