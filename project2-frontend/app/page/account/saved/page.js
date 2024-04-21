'use client'
import UserApi from "@/app/api/UserApi";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function Saved() {
    const [saveds, setSaveds] = useState([])
    const [isVip, setIsVip] = useState(false)
    let userInfo
    const getUserFromLocalStorage = () => {
        try {
            // avatar2 = localStorage.getItem('film_avatar');
            userInfo = JSON.parse(localStorage.getItem('filmInfo'))
            console.log(userInfo)
            return userInfo
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    useEffect(() => {
        let newData = localStorage.getItem('listSaved')
        if (newData) {
            setSaveds(JSON.parse(newData))
        } else {
            UserApi.GetSaved().then(res => {
                setSaveds(res.data)
                localStorage.setItem('listSaved', JSON.stringify(res.data))
            }).catch(err => {
                console.log(err)
            })
        }
        for (let i = 0; i < getUserFromLocalStorage()?.roles?.length; i++) {
            if (getUserFromLocalStorage()?.roles[i].role.name == 'ROLE_VIP') {
                setIsVip(true)
                break
            }
        }
    }
        , [])
    return (
        <div className="text-white pt-28 px-6 pb-4 no_select" >
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://w.forfun.com/fetch/49/4910c4acb7f6dce3dc2fd3be1bf78d8c.jpeg')`, backgroundPosition: 'center', opacity: 0.15 }}></div>
            <div className="mx-2 text-2xl md:text-3xl" style={{ fontFamily: 'west', zIndex: 1, position: 'relative' }}>Đã lưu </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 pt-8 z-[1] relative z-[2]">
                {saveds.map((episode, index) => (
                    <Link
                        href={(episode.vipRequire && !isVip) ? '#' : `/page/watch/${episode?.id}`}
                        key={index}
                        className={`relative group`}
                    >
                        <MotionDiv
                            initial={{ y: 15, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="relative">
                                <div className={` w-full flex-1 rounded-lg overflow-hidden bg-[#18181b] aspect-video`}>
                                    <Image src={episode?.image || episode?.film?.image || 'https://cdn.popsww.com/blog/sites/2/2022/02/naruto-co-bao-nhieu-tap.jpg'} width={200} height={200} alt={episode?.title} className="bg-[#18181b] h-full w-full object-cover aspect-w-16 aspect-h-9 rounded-lg transition-all duration-300 transform group-hover:scale-105 group-hover:opacity-60" quality={100} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {(episode.vipRequire && !isVip) ?
                                            <div onClick={(e) => { alert("vip require") }} className="hidden group-hover:flex items-center justify-center opacity-0 bg-white bg-opacity-40 hover:bg-[#4d148c] rounded-full shadow group-hover:opacity-90 w-12 h-12">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                                </svg>

                                            </div>
                                            :
                                            <div className="hidden group-hover:flex items-center justify-center opacity-0 bg-white bg-opacity-40 hover:bg-[#4d148c] rounded-full shadow group-hover:opacity-90 w-12 h-12">
                                                <svg xmlns="http://www.w3.org/2000/svg" className='play-buttonicon w-5 h-5' viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" /></svg>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-[6px] py-[3px] text-xs rounded-md">{"Tập " + (episode?.serial)}</span>
                                {episode?.isFiller === true &&
                                    <span className="absolute bottom-2 right-2 bg-[#4D148C] px-[6px] py-[3px] text-xs rounded-md">F</span>
                                }
                            </div>
                            <div className="h-10 pt-2 px-2 text-center">
                                <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xs md:text-xl" >
                                    {episode?.film?.name}
                                </div>
                            </div>
                        </MotionDiv>
                    </Link>
                )
                )}
            </div></div>
    );
}

export default Saved;