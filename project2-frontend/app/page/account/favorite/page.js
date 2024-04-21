'use client'
import UserApi from "@/app/api/UserApi";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import Link from "next/link";
import { useEffect, useState } from "react";

function Favorite() {
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        let newData = localStorage.getItem('listLiked')
        if (newData) {
            setFavorites(JSON.parse(newData))
        } else {
            UserApi.GetFavorites().then(res => {
                setFavorites(res.data)
                localStorage.setItem('listLiked', JSON.stringify(res.data))
            }).catch(err => {
                console.log(err)
            })
        }
    }
        , [])

    return (
        <div className="text-white pt-28 px-6 pb-4 min-h-[700px] no_select" >
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://bizweb.dktcdn.net/100/330/208/files/1217368.jpg?v=1640828889682')`, opacity: 0.2 }}></div>
            <div className="mx-2 text-2xl md:text-3xl" style={{ fontFamily: 'west', zIndex: 1, position: 'relative' }}>Phim Yêu thích </div>
            <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 pt-8 z-[1] relative">
                {favorites.map((item, index) => (
                    <Link
                        href={`/page/detail/${item.id}`}
                        key={index}
                        className={`relative group`}
                    >
                        <MotionDiv
                            initial={{ y: 15, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="min-h-16  group cursor-pointer " >
                                <div className="h-40 md:h-52 w-full">
                                    <div className="h-full w-full flex bg-slate-300 overflow-hidden rounded-md relative" >
                                        <img src={item.image ?? "https://cdn.sforum.vn/sforum/wp-content/uploads/2024/01/hinh-nen-anime-17.jpg"} className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-500" ></img>
                                        <div className="film_img_hover hidden group-hover:block"></div>
                                    </div>
                                </div>
                                <div className="h-10 pt-2 px-2 text-center">
                                    <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xs md:text-xl" >
                                        {item.name}
                                    </div>
                                </div>
                            </div>
                        </MotionDiv>
                    </Link>
                )
                )}
            </div>
        </div>
    );
}

export default Favorite;