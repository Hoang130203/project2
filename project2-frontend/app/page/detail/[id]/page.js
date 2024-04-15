'use client'
import Link from "next/link";
import NavBottom from "../NavBottom";
import Image from "next/image";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import { SendIcon } from "@/icons/icon";
import { useEffect, useState } from "react";
import UserApi from "@/app/api/UserApi";

function Detail({ params }) {
    const bg = 'https://images3.alphacoders.com/132/1328396.png'
    const img = 'https://cdn.oneesports.vn/cdn-data/sites/4/2023/10/Anime-Naruto-avt.jpg'
    const epdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    const [film, setFilm] = useState({})
    const [listReview, setListReview] = useState([
        { id: 1, name: 'Uzumaki Naruto', comment: 'Phim này hay quá', date: '20-3-2024', avatar: 'https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg' },
        { id: 2, name: 'Uchiha Sasuke', comment: 'Phim cảm động ghê', date: '19-3-2024', avatar: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/6/photo-1-15940093634781712523938.png' },
        { id: 3, name: 'Haruno Sakura', comment: 'Ok', date: '18-3-2024', avatar: 'https://kilala.vn/data/upload/article/4589/cac%20nang%20sakura%20(4).jpg' },
        { id: 4, name: 'Hatake Kakashi', comment: 'Hmm', date: '17-3-2024', avatar: 'https://cdn.oneesports.vn/cdn-data/sites/4/2023/02/Naruto-Kakashi-1-63ed2500d4625.jpg' },
        { id: 5, name: 'Uzumaki Boruto', comment: 'Hehe', date: '16-3-2024', avatar: 'https://cdn.popsww.com/blog/sites/2/2023/02/cac-nhan-vat-trong-boruto-2.jpg' },
        { id: 6, name: 'Uzumaki Himawari', comment: 'Hay quá đi', date: '15-3-2024', avatar: 'https://cdn.popsww.com/blog/sites/2/2023/07/himawari.jpg' },

    ])
    const [review, setReview] = useState('')
    useEffect(() => {
        const id = params.id
        UserApi.GetFilmDetail(id).then(res => {
            setListReview(res.data.reviews);
            setFilm(res.data)
            localStorage.setItem('currentFilm', JSON.stringify(res.data.episodes))
            localStorage.setItem('currentName', res.data.name)
        })
    }, [])
    const sendReview = () => {
        if (review != '') {
            setListReview((prev) => [{ id: 0, name: 'Mai Minh Hoàng', comment: review, date: 'vừa xong', avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-3.jpg' }, ...prev])
            setReview('')
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendReview()
        }
    };
    return (
        <div className="w-full min-h-[800px] no_select">
            <div className="h-[500px]">
                <div className="h-[350px] relative text-white">
                    <div className="w-full " style={{ backgroundImage: `url(${film.background})`, backgroundPosition: 'center center', backgroundSize: 'cover', height: '100%' }}>
                    </div>
                    <div className="video"></div>
                    <div className="absolute bottom-[-35%] flex flex-col sm:flex-row sm:left-[4%] z-10 gap-4 sm:gap-6 items-center w-full sm:w-[90%]">

                        <div className="sm:w-[180px] sm:h-[260px] w-[165px] h-[240px] rounded-md" style={{ backgroundImage: `url(${film.image})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                        </div>
                        <div className="max-w-[90%] flex flex-col justify-center no_select text-center sm:text-start ">
                            <MotionDiv
                                initial={{ y: 15, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-2xl md:text-3xl text-nowrap text-ellipsis whitespace-nowrap overflow-hidden" style={{ fontFamily: 'west' }}>{film.name}</div>
                                <div className="text-xl md:text-2xl text-slate-300 text-nowrap text-ellipsis whitespace-nowrap overflow-hidden" style={{ fontFamily: 'Instagram' }}>{film.author}</div>
                                <div className="flex items-center justify-center sm:justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400 ml-1 hover:scale-110 cursor-pointer transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                    9.6 | <span className="text-slate-400">&nbsp;Finished</span>
                                </div>
                                <div className="flex sm:justify-start justify-center pt-2">
                                    <div className="ml-1 rounded-full px-2 py-1 md:px-4 md:pr-5   bg-gray-700 w-max cursor-pointer flex items-center hover:ring-1 hover:ring-blue-400 hover:text-blue-300 hover:bg-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 md:w-5 md:h-5 md:mr-2" viewBox="0 0 48 48"><defs><mask id="ipSPlay0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"></path><path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPlay0)"></path>
                                        </svg>
                                        {film?.episodes && film.episodes.length > 0 ? (
                                            <Link href={`/page/watch/${film.episodes[0].id}`}>
                                                <div className="h-full items-center text-[15px]">Xem ngay</div>
                                            </Link>
                                        ) : (
                                            <div className="h-full items-center text-[15px]">Không có tập phim</div>
                                        )}
                                    </div>
                                    <div className="ml-1 rounded-full px-2 py-1 md:px-4 md:pr-5   bg-gray-700 w-max cursor-pointer flex items-center hover:ring-1 hover:ring-pink-400 hover:text-pink-300 hover:bg-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1 md:w-5 md:h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        <div className="h-full items-center text-[15px] ">Yêu thích</div>
                                    </div>
                                </div>
                            </MotionDiv>

                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-[400px] pb-3">
                <MotionDiv
                    initial={{ y: 15, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <NavBottom data={film} />
                </MotionDiv>
            </div>
            <div className="text-white text-2xl sm:text-3xl px-4 sm:px-20 pb-7" style={{ fontFamily: 'west' }}>Tập phim</div>
            <div className="grid text-white grid-cols-2 px-4 sm:px-20  sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-3 lg:gap-4 !max-h-[28.2rem] md:max-h-[32rem] lg:max-h-[35rem] xl:!max-h-[34.8rem] max-2xl:max-h-[40rem] overflow-y-auto ">
                {film.episodes?.map((episode, index) => {
                    return (
                        <Link
                            href={`/page/watch/${episode?.id}`}
                            key={index}
                            className={`relative group`}
                        >
                            <MotionDiv
                                initial={{ y: 15, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className={`relative w-full flex-1 rounded-lg overflow-hidden bg-[#18181b] aspect-video`}>
                                    <Image src={episode?.image || film?.background || film?.image || 'https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg'} width={200} height={200} alt={episode?.title} className="bg-[#18181b] h-full w-full object-cover aspect-w-16 aspect-h-9 rounded-lg transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-60" quality={100} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="hidden group-hover:flex items-center justify-center opacity-0 bg-white bg-opacity-40 hover:bg-[#4d148c] rounded-full shadow group-hover:opacity-90 w-12 h-12">
                                            <svg xmlns="http://www.w3.org/2000/svg" className='play-buttonicon w-5 h-5' viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" /></svg>
                                        </div>
                                    </div>
                                </div>
                                <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-[6px] py-[3px] text-xs rounded-md">{"Tập " + (index + 1)}</span>
                                {episode?.isFiller === true &&
                                    <span className="absolute bottom-2 right-2 bg-[#4D148C] px-[6px] py-[3px] text-xs rounded-md">F</span>
                                }
                            </MotionDiv>
                        </Link>
                    );
                })}
            </div>
            <div className="min-h-[300px]  rounded-xl w-full p-4 mt-9 px-4 sm:px-20 pb-7 text-white">
                <div className=" text-2xl sm:text-3xl py-4 pt-6 " style={{ fontFamily: 'west' }}>Review</div>
                <div className="pt-2 md:pt-3 md:flex md:items-center">
                    <div className="flex items-end gap-x-3 ">
                        <div className="hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 overflow-hidden">
                            <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-3.jpg' className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12  object-cover hover:scale-110'></img>
                        </div>
                        <p className="md:hidden text-xl text-blue-200" style={{ fontFamily: 'Instagram' }}>Mai Minh Hoàng</p>
                    </div>
                    <div className="flex items-center pt-2 md:w-[90%] md:pl-5">
                        <input type="text" placeholder="Nhập review" onKeyDown={handleKeyDown} value={review} onChange={(e) => setReview(e.target.value)} className="bg-slate-900 w-full h-10 md:h-11 px-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"></input>
                        <div className="cursor-pointer flex  w-[28px]  ml-4 hover:scale-110 hover" onClick={sendReview}>
                            <SendIcon />
                        </div>
                    </div>
                </div>
                <div className="w-full h-1 py-3" style={{ borderBottom: '1px solid #a6a6a6' }}></div>
                <div>
                    {
                        listReview?.map((item, index) => {
                            return (
                                <MotionDiv key={index}
                                    initial={{ y: 15, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div >
                                        <div className="flex items-center mt-4">
                                            <Image width={100} height={100} src={item.avatar} className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 object-cover'></Image>
                                            <div className="pl-3">
                                                <p className="text-lg text-gray-200 " style={{ fontFamily: 'west' }}>{item.name}</p>
                                                <p className="text-sm text-gray-400">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="pl-14 pt-2 ">{item.comment}</div>
                                    </div>
                                </MotionDiv>
                            )
                        })
                    }

                </div>
            </div>
            <div className="min-h-6"></div>
        </div>
    );
}

export default Detail; 