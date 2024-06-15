'use client'
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import Link from "next/link";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import UserApi from "@/app/api/UserApi";
import { toast } from "react-toastify";
function Country({ params }) {
    const id = params.id;
    const [country, setCountry] = useState(null)
    const [films, setFilms] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm state để lưu tổng số trang
    const [currentPage, setCurrentPage] = useState(1);
    const countries = [{ id: 'VIETNAM', name: 'Việt Nam' }, { id: 'JAPAN', name: 'Nhật Bản' }, { id: 'KOREA', name: 'Hàn Quốc' }, { id: 'CHINA', name: 'Trung Quốc' }, { id: 'THAILAND', name: 'Thái Lan' }, { id: 'USA', name: 'Mỹ' }]
    const newData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }]
    useEffect(() => {
        setCountry(countries.find(type => type.id === id))
    }, [])
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]); // Sử dụng useEffect để gọi API khi trang thay đổi

    const fetchData = (page) => {
        setFilms([]);
        toast.loading('Đang tải dữ liệu...');
        UserApi.GetByCountry(id, page - 1).then(res => {
            setFilms(res.data?.content);
            setTotalPages(res.data?.totalPages); // Cập nhật tổng số trang từ API
        }).finally(() => {
            toast.dismiss();
        })
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    const images = ['https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-2.jpg',
        'https://pic3.iqiyipic.com/image/20231124/b6/b2/a_100548003_m_601_en_m3_260_360.webp',
        'https://cinema.momocdn.net/img/30196263872528348-thumb.jpg',
        'https://ik.imagekit.io/tvlk/blog/2022/07/phim-hay-tren-netflix-1-1024x576.jpeg?tr=dpr-2,w-675',
        'https://image.tmdb.org/t/p/w500/u62XtaV8Iski2CgAUM8Yp0ZgKxD.jpg',
        'https://ss-images.saostar.vn/w800/pc/1652264475382/saostar-2h0c8kr8mj35hqln.png',
        'https://cdn.animevietsub.io/data/big_banner/2022/11/04/animevsub-Gbh6hmFyfB.jpg',
        'https://gamek.mediacdn.vn/thumb_w/690/133514250583805952/2022/11/18/one-piece-ra-doi-nam-nao-16687567263391598626439-0-7-363-588-crop-16687567316921921661176.jpg',
        'https://cdn1.tuoitre.vn/zoom/600_315/471584752817336320/2024/3/11/doraemon-movie-43-1708149673921687326816-11-87-580-1174-crop-17101604874831668803448.jpg',
        'https://cms.esports24h.vn//Uploads/Bao/7Cbpe8JbsPYc3ZfhzrP5ae.jpg'

    ]
    return (
        <div>
            <div className="text-white">
                <div className=" md:hidden grid grid-cols-3 gap-2 px-2 py-3 text-gray-400">
                    {countries.map((item, index) => {
                        return (
                            <Link key={index} href={`/page/films/country/${item.id}`}>
                                <div style={{ border: `${item.id == id ? '1px solid #5b9ae9' : ''}`, color: `${item.id == id ? '#5b9ae9' : ''}` }} className="cursor-pointer text-xs rounded-[4px] ring-1 py-1 ring-gray-400 flex justify-center items-center  hover:bg-slate-800 ">
                                    {item.name}
                                </div>
                            </Link>
                        )
                    }
                    )}
                </div>
                <div className="w-full flex justify-center items-center p-9 no_select hidden md:flex">
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
                    <div className="mx-2 text-2xl md:text-4xl " style={{ fontFamily: 'Hazu' }}>Phim {country?.name} </div>
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pt-8 px-3 md:px-7 2xl:grid-cols-6">
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

export default Country;