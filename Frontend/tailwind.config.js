/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./*.{js,ts,jsx,tsx}",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./contexts/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'], // Added for rural warmth
            },
            colors: {
                'forest-green': '#2E5E3E',
                'earth-brown': '#6B4F2A',
                'parchment-beige': '#F9F6F1',
                'soft-olive': '#8DA68E',
                'deep-charcoal': '#1F1F1F',
            },
            backgroundImage: {
                'wood-pattern': "url('/assets/wood-pattern.png')",
            }
        },
    },
    plugins: [],
}
