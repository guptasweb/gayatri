# MantraSlip - Your Guiding Mantra for 2025

A ritual-based React application for choosing your guiding mantra for the year, inspired by the Gayatri Mantra.

## Features

- **Homepage**: Displays the Gayatri Mantra with background audio
- **Slip Selection**: Interactive bowl with floating slips that can be mixed by shaking or swiping
- **Slip Opening**: Beautiful animation when a slip is selected
- **Meaning Page**: Deep interpretation of the chosen word with:
  - Word's essence
  - Connection to Gayatri Mantra themes
  - What it invites for 2025
  - What it asks you to release
  - What it strengthens

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Technologies

- React 18
- Vite
- CSS3 Animations
- Device Motion API (for shake detection)

## Color Palette

- Deep Reds: #8B0000, #B22222, #CD5C5C
- Oranges: #FF6347, #FF8C00
- Gold: #D4AF37
- Cream: #FFF9E6, #F5DEB3

## Fonts

- Noto Serif Devanagari (for Sanskrit text)
- Crimson Text (for English text)

## Audio Setup

To add the Gayatri Mantra audio:

1. Place your audio file in the `public` folder
2. Name it `gayatri-mantra.mp3` (or update the path in `src/components/Homepage.jsx`)
3. Supported formats: MP3, OGG, WAV

The audio will automatically play in the background on the homepage.

