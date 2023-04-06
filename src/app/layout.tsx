import { Roboto } from "next/font/google";

import "../styles/reset.scss";
import "../styles/globals.scss";

export const metadata = {
    title: "Fettan | Twitter",
    icons: {
        icon: "../assets/favicon.png",
    },
};

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={roboto.className}>{children}</body>
        </html>
    );
}