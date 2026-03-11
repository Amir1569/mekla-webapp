import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Navbar from "@/components/Navbar";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
    weight: ["600", "700"],
});

const dmSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Mekla – Halal wereldgerechten, zo op tafel",
    description: "Bestel wekelijks verse halal maaltijdboxen met wereldgerechten. Eenvoudig thuis bezorgd.",
    manifest: "/manifest.json", // voor PWA later
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="nl">
        <body className={`${playfair.variable} ${dmSans.variable}`}
              style={{ margin: 0, padding: 0, background: "#FDFAF4", fontFamily: "var(--font-dm-sans)" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}