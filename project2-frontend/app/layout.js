import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/component/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PRJ2FLIX",
  description: "Xem phim miễn phí",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className=" dark:bg-black bg-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
