import { defineConfig } from "eslint/config";
import next from "eslint-config-next";

export default defineConfig([
    {
        ignores: [".next/**", ".open-next/**", "node_modules/**"],
    },
    {
        extends: [...next],
        rules: {
            "@next/next/no-img-element": "off",
            "@next/next/no-page-custom-font": "off",
        },
    },
]);
