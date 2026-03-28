import NavBar from "@/components/navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavBar/>
            {children}
            <Toaster position="top-right" />
          </ThemeProvider>
        </AppProvider>
        
      </body>
    </html>
  );
}
