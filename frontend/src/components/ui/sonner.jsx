// import { useTheme } from "next-themes"
// import { Toaster as Sonner } from "sonner";

// const Toaster = ({
//   ...props
// }) => {
//   const { theme = "system" } = useTheme()

//   return (
//     (<Sonner
//       theme={theme}
//       className="toaster group"
//       style={
//         {
//           "--normal-bg": "var(--popover)",
//           "--normal-text": "var(--popover-foreground)",
//           "--normal-border": "var(--border)"
//         }
//       }
//       {...props} />)
//   );
// }

// export { Toaster }

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  const resolvedTheme =
    theme === "system"
      ? (typeof window !== "undefined" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light")
      : theme;

  return (
    <Sonner
      theme={resolvedTheme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      }}
      {...props}
    />
  );
};

export { Toaster };

