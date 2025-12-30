/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],

	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "#FF3B30",
				secondary: "#7a0f1d"
			},
		},
	},
	plugins: [],
};
