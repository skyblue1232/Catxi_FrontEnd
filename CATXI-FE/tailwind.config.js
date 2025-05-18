module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkest: "#7424F5",
          dark: "#8C46F6",
          light: "#C9AFF8",
          lightest: "#E6D8FF",
        },
        secondary: {
          darkest: "#222222",
          dark: "#424242",
          medium: "#757575",
          light: "#9E9E9E",
          lightest: "#E0E0E0",
        },
        background: "#FEFEFE",
        info: {
          dark: "#3574FF",
          light: "#F3F7FF",
        },
        warning: {
          dark: "#FF5252",
          light: "#FFE5E5",
        },
        hostFont: {
          dark: "#FF8114",
          light: "#FFF4EA",
        },
      },
      fontSize: {
        small: "0.75rem",
        medium: "1rem",
        large: "1.25rem",
      },
      fontFamily: {
        regular: ["Pretendard-Regular", "sans-serif"],
        medium: ["Pretendard-Medium", "sans-serif"],
        semiBold: ["Pretendard-SemiBold", "sans-serif"],
        bold: ["Pretendard-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
