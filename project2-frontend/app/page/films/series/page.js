'use client'
import UserApi from "@/app/api/UserApi";
import CardScroll from "@/app/component/OtherComponent/CardScroll";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import Link from "next/link";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
function Series() {
    const [films, setFilms] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm state để lưu tổng số trang
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]); // Sử dụng useEffect để gọi API khi trang thay đổi

    const fetchData = (page) => {
        UserApi.GetSeries(page - 1).then(res => {
            setFilms(res.data?.content);
            setTotalPages(res.data?.totalPages); // Cập nhật tổng số trang từ API
        });
    }
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const newData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }]
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center p-7 no_select">
                <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
                <div className="mx-2 text-2xl md:text-4xl " style={{ fontFamily: 'Hazu' }}>Phim bộ </div>
                <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
            </div>
            <div className="space-y-2 w-full h-max justify-start " style={{ fontFamily: 'Hazu' }}>
                <div id="controls-carousel" classNames="relative w-full " data-carousel="static">
                    <MotionDiv
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <CardScroll data={data} cardid="Nổi bật" type={2} />
                    </MotionDiv>
                </div>
            </div>
            <div className="w-full items-center p-3 no_select">
                <div className="mx-1 md:mx-2 text-xl md:text-3xl font-serif" style={{ fontFamily: 'Hazu' }}>Tập phim  mới cập nhật</div>
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
                    onChange={(page) => { setCurrentPage(page) }}
                    className="float-right"
                />
            </div>
        </div>
    );
}

export default Series;
