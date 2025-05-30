import "../styles/globals.css";
import { Poppins, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-inter",
  display: "swap",
});

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${poppins.variable} ${inter.variable} font-sans`}>
      <Component {...pageProps} />
      <Analytics />
    </div>
  );
}

export default MyApp;
