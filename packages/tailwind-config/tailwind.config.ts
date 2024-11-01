import type { Config } from "tailwindcss";
import { PluginUtils } from "tailwindcss/types/config";
const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Omit<Config, "content"> = {
    darkMode: "selector",
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                md: "1.5rem",
            },
        },
        extend: {
            colors: {
                "schiphol-blue": "#141251",
                "afternoon-blue": "#1b60db",
                "seebuyfly-yellow": "#f9c900",

                "morning-pink": "#aa3191",
                "lightmorning-pink": "#ff8fb2",
                "lightmorning-blue": "#94b0ea",
                "dusk-green": "#027e9b",
                "dusk-blue": "#25d7f4",
                "evening-pink": "#6552a8",
                "evening-lilac": "#d285d6",

                "grey-storm": "#706a8a",
                "grey-overcast": "#9491aa",
                "grey-broken": "#bfbdcc",
                "grey-scattered": "#eae9ee",
                "grey-few": "#f2f1f4",

                "dark-red": "#d0021b",
                green: "#128a0b",
                "light-blue": "#eef6ff",
                "light-green": "#d0e8cf",
                "light-yellow": "#fdfbda",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            backgroundImage: ({ theme }: PluginUtils) => ({
                "gradient-pink": `linear-gradient(135deg, ${theme("colors.schiphol-blue")}, ${theme("colors.morning-pink")} 50%, ${theme("colors.lightmorning-pink")})`,
                "gradient-purple": `linear-gradient(135deg, ${theme("colors.afternoon-blue")}, ${theme("colors.lightmorning-pink")})`,
            }),
        },
    },
    plugins: [addVariablesForColors],
};
export default config;

function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
