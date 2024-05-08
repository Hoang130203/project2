'use client'
import UserApi from "@/app/api/UserApi";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import { SendIcon } from "@/icons/icon";
import { Input, User } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

function Watch({ params }) {
    const id = params.id;
    const [comment, setComment] = useState('')
    const [episode, setEpisode] = useState(0)
    const [list, setList] = useState([])
    const [name, setName] = useState('')
    const [saved, setSaved] = useState(false)
    const [listComment, setListComment] = useState([

    ])
    const [loading, setLoading] = useState(true)
    const fetchData = useCallback(() => {

        UserApi.GetEpisode(id).then(res => {
            setListComment(res.data.comments)
            setEpisode(res.data)
            setList(JSON.parse(localStorage.getItem('currentFilm')))
            setName(localStorage.getItem('currentName'))
            setLoading(false)
            setListComment(res.data.comments?.reverse())
        })

    }, []);

    useEffect(() => {

        let trueCurrent = true
        if (localStorage.getItem('currentFilm') == null) {
            trueCurrent = false
        }
        if (trueCurrent) {
            let hasepisode = false
            for (let i = 0; i < JSON.parse(localStorage.getItem('currentFilm')).length; i++) {
                if (JSON.parse(localStorage.getItem('currentFilm'))[i].id == id) {
                    hasepisode = true
                    break
                }
            }
            if (!hasepisode) {
                UserApi.GetFilmByEpisode(id).then(res => {
                    localStorage.setItem('currentFilm', JSON.stringify(res.data.episodes))
                    localStorage.setItem('currentName', res.data.name)
                }
                );
            }
        } else {
            UserApi.GetFilmByEpisode(id).then(res => {
                localStorage.setItem('currentFilm', JSON.stringify(res.data.episodes))
                localStorage.setItem('currentName', res.data.name)
            }
            );
        }
        fetchData();
    }, [fetchData])
    // const list = [
    //     { id: 1, episode: 'https://www.youtube.com/embed/-SBBef-OEiE?si=sq43zy1sqdqJKyhi' },
    //     { id: 2, episode: 'https://vip.opstream17.com/share/d736bb10d83a904aefc1d6ce93dc54b8' },
    //     { id: 3, episode: 'https://vip.opstream17.com/share/82b8a3434904411a9fdc43ca87cee70c' },
    //     { id: 4, episode: 'https://1080.opstream4.com/share/eaf72c29ea749db9d115947ff9caa86f' },
    //     { id: 5, episode: 'https://1080.opstream4.com/share/ef8ff3bb5f926198d139c3e9750a3739' },
    //     { id: 6, episode: 'https://1080.opstream4.com/share/e4e13c3ff0c5a77ff11d6cb979ba7187' },
    //     { id: 7, episode: 'https://1080.opstream4.com/share/491fdb54cfd7bf75bc55e23a31dfbf2b' },
    //     { id: 8, episode: 'https://1080.opstream4.com/share/e75a95d82865db19dd4917794e8ffed1' }
    // ]
    const listFilm = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const handleSend = () => {
        UserApi.PostComment(id, comment).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
        if (comment != '') {
            setListComment((prev) => [{ id: 0, user: { name: nameUser, avatar: avatar }, content: comment, time: 'vừa xong' }, ...prev])
            setComment('')
        }

    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSend()
        }
    };
    let userInfo
    const getSavedFromLocalStorage = () => {
        try {
            // avatar2 = localStorage.getItem('film_avatar');
            userInfo = JSON.parse(localStorage.getItem('listSaved'))
            console.log(userInfo)
            return userInfo
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    let userInfo2
    const getUserFromLocalStorage = () => {
        try {
            // avatar2 = localStorage.getItem('film_avatar');
            userInfo2 = JSON.parse(localStorage.getItem('filmInfo'))
            return userInfo2
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    const [avatar, setAvatar] = useState('')
    const [nameUser, setNameUser] = useState('')
    useEffect(() => {
        setAvatar(getUserFromLocalStorage()?.avatar)
        setNameUser(getUserFromLocalStorage()?.name)
    }, [])
    const handleSaved = () => {
        if (saved) {
            setSaved(false)
            let list = getSavedFromLocalStorage()
            for (let i = 0; i < list.length; i++) {
                if (list[i].id == episode.id) {
                    list.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('listSaved', JSON.stringify(list))
            UserApi.DeleteSaved(episode.id).then(res => {
                localStorage.setItem('listSaved', JSON.stringify(res.data))
            })
        } else {
            setSaved(true)
            let list = getSavedFromLocalStorage()
            UserApi.PostSaved(episode.id).then(res => {
                localStorage.setItem('listSaved', JSON.stringify(res.data))
            })
        }
    }
    useEffect(() => {
        let save = false
        if (getSavedFromLocalStorage()) {
            for (let i = 0; i < getSavedFromLocalStorage().length; i++) {
                if (getSavedFromLocalStorage()[i].id == id) {
                    save = true
                    break
                }
            }
        } else {
            UserApi.GetSaved().then(res => {
                localStorage.setItem('listSaved', JSON.stringify(res.data))
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == id) {
                        save = true
                        break
                    }
                }
            })
        }
        setSaved(save)
    }, [])
    const handleFilter = (e) => {
        if (e.target.value == '' || e.target.value.length == 0) {
            setList(JSON.parse(localStorage.getItem('currentFilm')))
            return
        }
        setList(
            JSON.parse(localStorage.getItem('currentFilm')).filter(item => {
                // Chuyển đổi e.target.value thành một số bằng cách sử dụng parseInt
                const giaTriNhapVao = parseInt(e.target.value);
                // Chuyển đổi item.serial thành chuỗi trước khi so sánh
                const serialChuoi = item.serial.toString();
                // Kiểm tra xem serialChuoi có chứa giá trị nhập vào không
                // và xem serialChuoi có phải là một số không
                return serialChuoi.includes(giaTriNhapVao.toString()) && /^\d+$/.test(serialChuoi);
            })
        );
    }
    return (
        <div className="py-20 md:px-10 px-3 flex justify-between text-white no_select">
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://gcs.tripi.vn/public-tripi/tripi-feed/img/474077MhZ/anh-nen-4k-cho-desktop_105907396.jpg')`, backgroundPosition: 'center', opacity: 0.13, backgroundRepeat: 'no-repeat' }}></div>
            <div className="xl:w-[75%] w-full z-10">
                <div className="relative h-0 rounded-md" style={{ paddingTop: '56.25%' }}>
                    {!loading &&
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-md"
                            src={`${episode.url}`}
                            frameBorder="0"
                            allowTransparency="true"
                            allowFullScreen="true"
                            scrolling="no"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                    }
                </div>
                <div className="grid grid-cols-8">
                    <div style={{ fontFamily: 'west' }} className="px-2 py-1 mt-2 md:col-span-7 col-span-8">
                        <p className="md:text-4xl text-2xl" >{name}</p>
                        <p className="md:text-2xl text-xl text-slate-400">Tập {episode.serial}</p>
                    </div>
                    <div className="col-span-1 px-2 py-1 mt-2">
                        <div onClick={() => { handleSaved() }} className={["md:ml-1 rounded-full px-3 py-1 md:px-4 md:pr-5 bg-gray-700 w-max cursor-pointer flex items-center hover:ring-1 hover:ring-blue-400 hover:text-blue-300 hover:bg-gray-600", saved ? "ring-blue-400 text-blue-300 ring-1" : ""].join(' ')}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-6 md:h-6 w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                            </svg>
                            {saved ? <div className="h-full items-center md:text-[20px] text-[15px]">Đã Lưu</div> : <div className="h-full items-center md:text-[20px] text-[15px]">Lưu</div>}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6 py-5 sm:grid-cols-9 md:grid-cols-12 px-2 gap-y-3 md:gap-y-5 md:px-3 xl:hidden md:pr-10 2xl:max-w-[80%]">
                    {
                        list?.map((item, index) => (
                            <Link key={index} href={`/page/watch/${item.id}`} style={{ fontFamily: 'west' }}>
                                <div className="md:w-14 md:h-14 w-12 h-12  p-1 pt-2 bg-slate-600 hover:text-yellow-300 rounded-full flex justify-center items-center cursor-pointer hover:bg-slate-500 hover:ring-2 hover:ring-slate-400 hover:text-xl hover:scale-105 duration-300 transition-transform">
                                    {item.serial}
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
                                <img src={avatar ?? 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-3.jpg'} className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12  object-cover hover:scale-110'></img>
                            </div>
                            <p className="md:hidden text-xl text-blue-200" style={{ fontFamily: 'Instagram' }}>{nameUser}</p>
                        </div>
                        <div className="flex items-center pt-2 md:w-[90%] md:pl-5">
                            <input type="text" placeholder="Nhập bình luận" onKeyDown={handleKeyDown} value={comment} onChange={(e) => setComment(e.target.value)} className="bg-slate-900 w-full h-10 md:h-11 px-2 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-blue-500"></input>
                            <div className="cursor-pointer flex  w-[28px]  ml-4 hover:scale-110 hover" >
                                <button onClick={handleSend} className="px-5 py-1 bg-blue-500 flex items-center justify-center text-white rounded-md">
                                    Gửi
                                </button>
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
                                                <Image width={100} height={100} src={item?.user?.avatar ?? ""} alt="avatar" className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 object-cover'></Image>
                                                <div className="pl-3">
                                                    <p className="text-lg text-gray-200 " style={{ fontFamily: 'west' }}>{item?.user?.name}</p>
                                                    <p className="text-sm text-gray-400">{item?.time?.length > 10 ? item?.time?.slice(0, 10) : item?.time}</p>
                                                </div>
                                            </div>
                                            <div className="pl-14 pt-2 ">{item.content}</div>
                                        </div>
                                    </MotionDiv>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <div className="w-[22%] min-w-[300px] hidden xl:block z-10">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>
                    <Input variant="underlined" placeholder="Nhập tập phim " onChange={handleFilter}></Input>
                </div>
                <div className="bg-gray-950  pt-5 px-2 rounded-lg flex justify-center max-h-[800px] overflow-auto">
                    <div className="grid grid-cols-3 py-5 sm:grid-cols-3 gap-x-3 md:grid-cols-4 gap-y-3 ">
                        {
                            list?.map((item, index) => (
                                <Link key={index} href={`/page/watch/${item.id}`} style={{ fontFamily: 'Hazu' }}>
                                    <div className="md:w-[62px] md:h-10 w-12 h-9 col-span-1 p-1 pt-2 text-[20px] bg-slate-600 hover:text-yellow-300 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-slate-500 hover:ring-2 hover:ring-slate-400 hover:text-xl hover:scale-105 duration-300 transition-transform">
                                        Tập {item.serial}
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Watch;