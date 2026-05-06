export const CHRYSANTHEMUM_THEME = {
  colors: {
    purple: "#702963",
    purpleLight: "#E0B0FF",
    yellow: "#FFD700",
    cream: "#FFFDD0",
    pink: "#FFB7C5",
    earth: "#8B5A2B",
    white: "#FFFFFF",
    black: "#1A1A1A"
  }
} as const;

export type ThemeColors = keyof typeof CHRYSANTHEMUM_THEME.colors;