import { inject, provide, reactive } from "vue";

export type ThemeName = "pastel" | "forest" | "ocean" | "berry";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

interface ThemeContext {
  currentTheme: ThemeName;
  themeColors: ThemeColors;
  setTheme: (theme: ThemeName) => void;
}

const themeMap: Record<ThemeName, ThemeColors> = {
  pastel: {
    primary: "#FFA5A5",
    secondary: "#FFC3A0",
    accent: "#FFEDA3",
    background: "#FFF7F7",
    text: "#796A79",
  },
  forest: {
    primary: "#8DB596",
    secondary: "#A7D7C5",
    accent: "#74B49B",
    background: "#F3F9F3",
    text: "#5C6D63",
  },
  ocean: {
    primary: "#7EB6FF",
    secondary: "#B5D8FF",
    accent: "#5F9DF7",
    background: "#F0F8FF",
    text: "#4A6FA5",
  },
  berry: {
    primary: "#D46A92",
    secondary: "#E799B0",
    accent: "#9E4770",
    background: "#FFF0F5",
    text: "#6D394E",
  },
};

const ThemeSymbol = Symbol("ThemeContext");

export function provideTheme() {
  const state = reactive({
    currentTheme: "pastel" as ThemeName,
    themeColors: themeMap["pastel"],
  });

  const setTheme = (theme: ThemeName) => {
    state.currentTheme = theme.toLowerCase() as ThemeName;
    state.themeColors = themeMap[theme.toLowerCase() as ThemeName];
  };

  provide(ThemeSymbol, {
    get currentTheme() {
      return state.currentTheme;
    },
    get themeColors() {
      return state.themeColors;
    },
    setTheme,
  });
}

export function useTheme(): ThemeContext {
  const context = inject<ThemeContext>(ThemeSymbol);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
