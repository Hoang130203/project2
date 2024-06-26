'use client'
import UserApi from "@/app/api/UserApi";
import CardScroll from "@/app/component/OtherComponent/CardScroll";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import SlideFilm from "@/app/component/SlideFilm";
import { Pagination } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
//<iframe className="disable-hover-click no_select" width="560" height="315" src="https://www.youtube.com/embed/c_hnKogqvEs?si=xofpzzaDHSrBTt32&amp;list=PL3h_l0eg0zdgFPHA0WofJacPC54_yBtLU&autoplay=1&mute=1&controls=0&loop=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

function Movie() {
    // const [films, setFilms] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm state để lưu tổng số trang
    const [currentPage, setCurrentPage] = useState(1);
    // const [data, setData] = useState([])

    // useEffect(() => {
    //     UserApi.GetMoviesTop().then(res => {
    //         setData(res.data);
    //     });
    // }, []);
    const { data: data, isLoading, isError } = useQuery(
        'movies',
        async () => {
            // toast.loading('Đang tải top movie...');
            try {
                const res = await UserApi.GetMoviesTop();
                return res.data;
            } catch (err) {
                console.log(err);
            } finally {
                // toast.dismiss();
            }
        },
        {
            cacheTime: 120000,
            refetchOnWindowFocus: false,
            staleTime: 120000,
        }
    );
    // useEffect(() => {
    //     setFilms([]);
    //     fetchData(currentPage);
    // }, [currentPage]); // Sử dụng useEffect để gọi API khi trang thay đổi

    // const fetchData = (page) => {
    //     toast.loading('Đang tải dữ liệu...');
    //     UserApi.GetMovies(page - 1).then(res => {
    //         setFilms(res.data?.content);
    //         setTotalPages(res.data?.totalPages); // Cập nhật tổng số trang từ API
    //     }).then(() => {
    //         toast.dismiss();
    //     });
    // }
    const { data: data1 } = useQuery(
        ['filmsMovies', currentPage],
        async () => {
            toast.loading('Đang tải dữ liệu...');
            const res = await UserApi.GetMovies(currentPage - 1).finally(() => {
                toast.dismiss();
            });
            return res.data;
        },
        {
            cacheTime: 600000,
            refetchOnWindowFocus: false,
            staleTime: 1000000,
        }
    );

    useEffect(() => {
        if (data1) {
            setTotalPages(data1.totalPages); // Cập nhật tổng số trang từ API
        }
    }
        , [data1, currentPage]);
    const films = data1?.content || [];
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const newData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }]
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center p-7 no_select">
                <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
                <div className="mx-2 text-2xl md:text-4xl " style={{ fontFamily: 'Hazu' }}>Phim lẻ nổi bật</div>
                <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
            </div>
            <div className="space-y-2 w-full h-max justify-start " style={{ fontFamily: 'flame' }}>
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
                <div className="mx-1 md:mx-2 text-xl md:text-3xl font-serif" style={{ fontFamily: 'Hazu' }}>Danh sách phim lẻ</div>
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
                                            <img src={`${item.image}??"https://i.pinimg.com/236x/7e/d4/83/7ed483e065ea9cd5de8d00886f607ccf.jpg"`} className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-500" ></img>
                                            <div className="film_img_hover hidden group-hover:block"></div>
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

export default Movie;