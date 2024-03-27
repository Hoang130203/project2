"use client";
import React from "react";
import dynamic from "next/dynamic";

import { CardTransactions } from "./component/CardTransaction";
import { Link } from "@nextui-org/react";
import NextLink from "next/link";
import CardDoanhThu from "./component/CardDoanhThu";
import CardFilm from "./component/CardFilm";
import { CardTop } from "./component/CardTop";
const Chart = dynamic(
    () => import("./component/Chart").then((mod) => mod.Steam),
    {
        ssr: false,
    }
);

function PageAdmin() {
    return (
        <div className="h-full lg:px-6 no_select">
            <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
                <div className="mt-6 gap-6 flex flex-col w-full">
                    {/* Card Section Top */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">Thống kê</h3>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-5  justify-center w-full">
                            <CardDoanhThu />
                            <CardFilm />
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="h-full flex flex-col gap-2">
                        <h3 className="text-xl font-semibold">Biểu đồ doanh thu</h3>
                        <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                            <Chart />
                        </div>
                    </div>
                </div>

                {/* Left Section */}
                <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
                    <h3 className="text-xl font-semibold">Phim nổi bật</h3>
                    <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col">
                        <CardTop />
                        <CardTransactions />
                    </div>
                </div>
            </div>


        </div>
    );
}

export default PageAdmin;