'use client'
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import { SendIcon } from "@/icons/icon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Watch({ params }) {
    const id = params.id;
    const [comment, setComment] = useState('')
    const list = [
        { id: 1, episode: 'https://1080.opstream4.com/share/1ca626c2c91dad03c61ca216b535145b' },
        { id: 2, episode: 'https://1080.opstream4.com/share/9145f5ea393c6f6a4a7eff618814f91e' },
        { id: 3, episode: 'https://1080.opstream4.com/share/ccacb872e833031d124beb4e0a5be380' },
        { id: 4, episode: 'https://1080.opstream4.com/share/eaf72c29ea749db9d115947ff9caa86f' },
        { id: 5, episode: 'https://1080.opstream4.com/share/ef8ff3bb5f926198d139c3e9750a3739' },
        { id: 6, episode: 'https://1080.opstream4.com/share/e4e13c3ff0c5a77ff11d6cb979ba7187' },
        { id: 7, episode: 'https://1080.opstream4.com/share/491fdb54cfd7bf75bc55e23a31dfbf2b' },
        { id: 8, episode: 'https://1080.opstream4.com/share/e75a95d82865db19dd4917794e8ffed1' }
    ]
    const listFilm = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [listComment, setListComment] = useState([
        { id: 1, name: 'Uzumaki Naruto', comment: 'Phim này hay quá', date: '20-3-2024', avatar: 'https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg' },
        { id: 2, name: 'Uchiha Sasuke', comment: 'Phim cảm động ghê', date: '19-3-2024', avatar: 'https://gamek.mediacdn.vn/133514250583805952/2020/7/6/photo-1-15940093634781712523938.png' },
        { id: 3, name: 'Haruno Sakura', comment: 'Ok', date: '18-3-2024', avatar: 'https://kilala.vn/data/upload/article/4589/cac%20nang%20sakura%20(4).jpg' },
        { id: 4, name: 'Hatake Kakashi', comment: 'Hmm', date: '17-3-2024', avatar: 'https://cdn.oneesports.vn/cdn-data/sites/4/2023/02/Naruto-Kakashi-1-63ed2500d4625.jpg' },
        { id: 5, name: 'Uzumaki Boruto', comment: 'Hehe', date: '16-3-2024', avatar: 'https://cdn.popsww.com/blog/sites/2/2023/02/cac-nhan-vat-trong-boruto-2.jpg' },
        { id: 6, name: 'Uzumaki Himawari', comment: 'Hay quá đi', date: '15-3-2024', avatar: 'https://cdn.popsww.com/blog/sites/2/2023/07/himawari.jpg' },

    ])
    const handleSend = () => {
        if (comment != '') {
            setListComment((prev) => [{ id: 0, name: 'Mai Minh Hoàng', comment: comment, date: 'vừa xong', avatar: 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-3.jpg' }, ...prev])
            setComment('')
        }
    }
    return (
        <div className="py-20 md:px-10 px-3 flex justify-between text-white no_select">
            <div className="xl:w-[75%] w-full ">
                <div className="relative h-0 rounded-md" style={{ paddingTop: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-md"
                        src={list[id - 1].episode}
                        frameBorder="0"
                        allowTransparency="true"
                        allowFullScreen="true"
                        scrolling="no"
                    ></iframe>
                </div>
                <div>
                    <div style={{ fontFamily: 'west' }} className="px-2 py-1 mt-2">
                        <p className="md:text-4xl text-2xl" >Sweet home</p>
                        <p className="md:text-2xl text-xl text-slate-400">Tập {id}</p>
                    </div>
                </div>
                <div className="grid grid-cols-6 py-5 sm:grid-cols-9 md:grid-cols-12 px-2 gap-y-3 md:gap-y-5 md:px-3 md:pr-10 2xl:max-w-[80%]">
                    {
                        list.map((item, index) => (
                            <Link key={index} href={`/page/watch/${item.id}`} style={{ fontFamily: 'west' }}>
                                <div className="md:w-14 md:h-14 w-12 h-12  p-1 pt-2 bg-slate-600 hover:text-yellow-300 rounded-full flex justify-center items-center cursor-pointer hover:bg-slate-500 hover:ring-2 hover:ring-slate-400 hover:text-xl hover:scale-105 duration-300 transition-transform">
                                    {item.id}
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className="min-h-[300px] bg-slate-950 rounded-xl w-full p-4 mt-9">
                    <div className="text-xl md:text-3xl" style={{ fontFamily: 'west' }}>Bình luận</div>
                    <div className="pt-2 md:pt-3 md:flex md:items-center">
                        <div className="flex items-end gap-x-3 ">
                            <div className="hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 rounded-full w-10 h-10 sm:w-12 sm:h-12 overflow-hidden">
                                <img src='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-3.jpg' className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12  object-cover hover:scale-110'></img>
                            </div>
                            <p className="md:hidden text-xl text-blue-200" style={{ fontFamily: 'Instagram' }}>Mai Minh Hoàng</p>
                        </div>
                        <div className="flex items-center pt-2 md:w-[90%] md:pl-5">
                            <input type="text" placeholder="Nhập bình luận" value={comment} onChange={(e) => setComment(e.target.value)} className="bg-slate-900 w-full h-10 md:h-11 px-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"></input>
                            <div className="cursor-pointer flex  w-[28px]  ml-4 hover:scale-110 hover" onClick={handleSend}>
                                <SendIcon />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-1 py-3" style={{ borderBottom: '1px solid #a6a6a6' }}></div>
                    <div>
                        {
                            listComment.map((item, index) => {
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
                                                <div className="pl-3 md:pl-5">
                                                    <p className="text-lg text-gray-200 " style={{ fontFamily: 'west' }}>{item.name}</p>
                                                    <p className="text-sm text-gray-400">{item.date}</p>
                                                </div>
                                            </div>
                                            <div className="pl-14 pt-2  md:pl-16 ">{item.comment}</div>
                                        </div>
                                    </MotionDiv>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <div className="w-[22%] min-w-[300px] hidden xl:block">
                <div className="bg-gray-950  pt-5 px-2 rounded-lg">
                    <div className="flex text-2xl md:text-3xl" >
                        <div className="card_bar"></div>
                        <div style={{ fontFamily: 'west' }}>
                            Đề cử
                        </div>
                    </div>
                    <div>
                        {listFilm.map((item, index) => {
                            return (
                                <MotionDiv key={index}
                                    initial={{ y: 15, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative flex my-3 group bg-gray-900 hover:bg-gray-800 h-24 cursor-pointer rounded-md">
                                        <div className="h-full w-[72px] flex bg-slate-300 overflow-hidden rounded-md relative" >
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_m8cav_i37AVLD6fGhHS78IZ0fbhmC6VIHg&usqp=CAU" className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-300" ></img>
                                        </div>
                                        <div className="px-3 md:px-5 flex flex-col h-full justify-between py-2 max-w-full text-gray-400" style={{ width: '75%' }}>
                                            <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xl" style={{ fontFamily: 'impact' }}>
                                                Solo leveling
                                            </div>
                                            <div className="text-lg flex items-center relative" >
                                                {Array.from({ length: 5 }).map((item, index) => {

                                                    return (
                                                        <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400 ml-1 hover:scale-110 cursor-pointer transition-transform">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                        </svg>
                                                    )
                                                }
                                                )}
                                                <div className="right-1 absolute text-blue-400 hover:scale-105 transition-transform cursor-pointer" style={{ fontFamily: 'flame' }}>
                                                    Phim bộ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </MotionDiv>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;