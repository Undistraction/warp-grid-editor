/// @type {import('tailwindcss').Config}

import aspectRatioPlugin from '@tailwindcss/aspect-ratio'
import typographyPlugin from '@tailwindcss/typography'

// -----------------------------------------------------------------------------
// Exports
// -----------------------------------------------------------------------------

export default {
  content: [`./**/*.{ts,tsx,js,jsx,html}`, `!./node_modules/`],
  theme: {
    extend: {
      fontFamily: {
        sans: [`Nunito`, `ui-sans-serif`, `system-ui`, `sans-serif`],
        serif: [`ui-serif`, `Georgia`, `serif`],
        mono: [`ui-monospace`, `SFMono-Regular`, `monospace`],
      },
    },
  },
  plugins: [typographyPlugin, aspectRatioPlugin],
}
