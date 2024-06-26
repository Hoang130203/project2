
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/app/component/header";
import { SessionProvider } from "next-auth/react";
import Provider from "./Providers";
import { Fragment } from "react";
import Wrap from "./wrap";
import { FilmContextProvider } from "./page/films/context";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PRJ2FLIX",
  description: "Xem phim miễn phí",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
        <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>"></link>
      </head>
      <body className=" dark:bg-black bg-white">
        <FilmContextProvider>

          <Provider>
            <Wrap>{children}
              <ToastContainer position='bottom-right' autoClose={3000} hideProgressBar style={{ zIndex: '1000' }} theme="light" />
            </Wrap>

          </Provider>
        </FilmContextProvider>
      </body>
    </html>
  );
}
