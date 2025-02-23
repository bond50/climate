import { Roboto, Nunito, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/header";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import AOSComponent from "@/components/aos";
import { Footer } from "@/components/footer";

const defaultFont = Roboto({
    weight: ["100", "300", "400", "500", "700", "900"],
    variable: "--default-font",
    subsets: ["latin"],
});

const headingFont = Nunito({
    weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--heading-font",
    subsets: ["latin"],
});

const navFont = Inter({
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
    variable: "--nav-font",
    subsets: ["latin"],
});

export const metadata = {
    title: "Vihiga County Climate Change",
    description:
        "County Government of Vihiga – Department of Environment, Water, Energy, Natural Resources & Climate Change. View ongoing CCCF and FLLoCA CCRI projects, submit grievances, and learn more about local climate change initiatives.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className={`${defaultFont.variable} ${headingFont.variable} ${navFont.variable}`}
        >
        <Header />
        <AOSComponent>{children}</AOSComponent>
        <Footer />
        </body>
        </html>
    );
}
