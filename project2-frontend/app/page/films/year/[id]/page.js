'use client'

import { useContext, useEffect, useState } from "react";
import { FilmContext } from "../../context";
import UserApi from "@/app/api/UserApi";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";

function FilmYear({ params }) {
    const [year, setYear] = useState(params.id)
    const [films, setFilms] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm state để lưu tổng số trang
    const [currentPage, setCurrentPage] = useState(1);
    const { yearActive, setYearActive } = useContext(FilmContext)
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]); // Sử dụng useEffect để gọi API khi trang thay đổi

    const fetchData = (page) => {
        UserApi.GetByYear(year, page - 1).then(res => {
            setFilms(res.data?.content);
            setTotalPages(res.data?.totalPages); // Cập nhật tổng số trang từ API
        });
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    useEffect(() => {
        setYearActive(params.id)
    }, [])

    return (
        <div className="w-full">
            <div className="w-full items-center p-3 no_select">
                <div className="mx-1 md:mx-2 text-xl md:text-3xl font-serif" style={{ fontFamily: 'Hazu' }}>{year == 0 ? `Tất cả` : year == 2010 ? `Năm ${year} về trước` : `Năm ${year}`}</div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pt-8 2xl:grid-cols-6">
                    {films.map((item, index) => (
                        <MotionDiv key={index}
                            initial={{ y: 15, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/page/detail/${item.id}`} className="cursor-pointer">
                                <div className="min-h-16  group cursor-pointer " >
                                    <div className="h-40 md:h-52 w-full">
                                        <div className="h-full w-full flex bg-slate-300 overflow-hidden rounded-md relative" >
                                            <img
                                                src={`${item.image.length > 10 ? item.image : "https://i.pinimg.com/236x/7e/d4/83/7ed483e065ea9cd5de8d00886f607ccf.jpg"}`}
                                                className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-500"
                                            />                                            <div className="film_img_hover hidden group-hover:block"></div>
                                        </div>
                                    </div>
                                    <div className="h-10 pt-2 px-2 text-center">
                                        <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xs md:text-xl" >
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </MotionDiv>
                    )
                    )}
                </div>
            </div>
            <div>
                <Pagination
                    loop
                    showControls
                    color="success"
                    page={currentPage}
                    total={totalPages}
                    initialPage={1}
                    onChange={(page) => { setCurrentPage(page), scrollToTop() }}
                    className="float-right"
                />
            </div>
        </div>
    );
}

export default FilmYear;