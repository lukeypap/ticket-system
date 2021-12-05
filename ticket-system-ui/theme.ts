import { extendTheme, ThemeConfig, theme as base, withDefaultVariant } from "@chakra-ui/react";

const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

export const theme = extendTheme(
    {
        config,
        colors: {
            "gray.dark": "#1C1C1C",
            "gray.light": "#646464",
            "brand.red": "#90CDF4",
        },
        fonts: {
            heading: "Ubuntu",
            body: "Ubuntu",
        },
    },
    withDefaultVariant({
        variant: "ghost",
        components: ["IconButton"],
    })
);
