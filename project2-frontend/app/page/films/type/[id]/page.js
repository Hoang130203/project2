'use client'
import UserApi from "@/app/api/UserApi";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { Pagination } from "@nextui-org/react";
import { FilmContext } from "../../context";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
function TypeFilm({ params }) {
    const id = params.id
    const [type, setType] = useState(null)
    // const [films, setFilms] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm state để lưu tổng số trang
    const [currentPage, setCurrentPage] = useState(1);
    const { yearActive, setYearActive } = useContext(FilmContext);
    const { data, isLoading } = useQuery(
        ['films', id, currentPage],
        async () => {
            toast.loading('Đang tải dữ liệu...');
            const res = await UserApi.GetByType(id, currentPage - 1).finally(() => {
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
        if (data) {
            setTotalPages(data.totalPages);
        }
    }, [data, id]);

    const films = data?.content || [];
    // useEffect(() => {
    //     fetchData(currentPage);

    // }, [currentPage]); // Sử dụng useEffect để gọi API khi trang thay đổi

    // const fetchData = (page) => {
    //     UserApi.GetByType(id, page - 1).then(res => {
    //         setFilms(res.data?.content);
    //         setTotalPages(res.data?.totalPages); // Cập nhật tổng số trang từ API
    //     });
    // }
    const listTypes = [{ id: 'ACTION', name: 'Hành động' }, { id: 'ADVENTURE', name: 'Phiêu lưu' }, { id: 'HORROR', name: 'Kinh dị' }, { id: 'COMEDY', name: 'Hài hước' }, { id: 'ROMATIC', name: 'Lãng mạn' }, { id: 'WAR', name: 'Chiến tranh' }, { id: 'DRAMA', name: 'Tâm lý' }, { id: 'ANIME', name: 'Anime' }, { id: 'COSTUME', name: 'Cổ trang' }, { id: 'FANTASY', name: 'Viễn tưởng' }]
    for (let i = 0; i < listTypes.length; i++) {
        if (listTypes[i].id == id) {
            listTypes[i].active = true
        }
    }
    useEffect(() => {
        setType(listTypes.find(type => type.id === id))

    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    return (
        <div>
            <div className="text-white">
                <div className=" md:hidden grid grid-cols-3 gap-2 px-2 py-3 text-gray-400">
                    {listTypes.map((item, index) => {
                        return (
                            <Link key={index} href={`/page/films/type/${item.id}`}>
                                <div style={{ border: `${item.active == true ? '1px solid #5b9ae9' : ''}`, color: `${item.active == true ? '#5b9ae9' : ''}` }} className="cursor-pointer text-xs rounded-[4px] ring-1 py-1 ring-gray-400 flex justify-center items-center  hover:bg-slate-800 ">
                                    {item.name}
                                </div>
                            </Link>
                        )
                    }
                    )}
                </div>
                <div className="w-full flex justify-center items-center p-9 no_select hidden md:flex">
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #333' }}></div>
                    <div className="mx-2 text-2xl md:text-4xl " style={{ fontFamily: 'Hazu' }}>Phim {type?.name} </div>
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

export default TypeFilm;