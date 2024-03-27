import { Card, CardBody } from "@nextui-org/react";
import React from "react";


function CardDoanhThu() {
    return (
        <Card className="xl:max-w-sm bg-blue-800 rounded-xl shadow-md px-3 w-full">
            <CardBody className="py-5">
                <div className="flex gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>

                    <div className="flex flex-col">
                        <span className="text-white">Doanh thu</span>
                        <span className="text-white text-xs">1311 Người dùng</span>
                    </div>
                </div>
                <div className="flex gap-2.5 py-2 items-center">
                    <span className="text-white text-xl font-semibold">45,910,000đ</span>
                    <span className="text-green-300 text-xs">+ 4.5%</span>
                </div>
                <div className="flex items-center gap-6">
                    <div>
                        <div>
                            <span className="font-semibold text-success text-xs">{"↓"}</span>
                            <span className="text-xs text-white">100,930</span>
                        </div>
                        <span className="text-white text-xs">vnd</span>
                    </div>

                    <div>
                        <div>
                            <span className="font-semibold text-danger text-xs">{"↑"}</span>
                            <span className="text-xs text-white">54,120,000</span>
                        </div>
                        <span className="text-white text-xs">vnd</span>
                    </div>

                    <div>
                        <div>
                            <span className="font-semibold text-danger text-xs">{"⭐"}</span>
                            <span className="text-xs text-white">125</span>
                        </div>
                        <span className="text-white text-xs">Thành viên VIP</span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default CardDoanhThu;