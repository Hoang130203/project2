"use client"
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import styles from '../component/component.module.css'
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MotionDiv } from "../component/OtherComponent/MotionDiv";
import { signOut, useSession } from "next-auth/react";
function LayoutAdmin({ children }) {
    const router = useRouter();
    const [active, setActive] = useState(0)
    const [click, setClick] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [avatar, setAvatar] = useState('')
    const { data: session } = useSession();

    const nav = () => {
        window.location.href = '/page/login'
    }

    let avatar2 = ''
    const getAvatarFromLocalStorage = () => {
        try {
            avatar2 = JSON.parse(localStorage.getItem('filmInfo'))?.avatar;
            return avatar2.length > 0 ? avatar2 : '';
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    const handleLogout = async () => {
        localStorage.removeItem('filmInfo')
        if (session && session.user) {
            localStorage.removeItem('film_user')
            localStorage.removeItem('film_avatar')
            await signOut({ redirect: false })
            await nav()
        } else {
            nav()
        }

    }
    useEffect(() => {
        setAvatar(getAvatarFromLocalStorage());
        // alert(avatar)
        setActive(() => {
            console.log(window.location.href)
            if (window.location.href.endsWith('/admin')) return 0
            if (window.location.href.endsWith('/admin/film')) return 1
            if (window.location.href.endsWith('/admin/user')) return 2
            if (window.location.href.endsWith('/admin/notifi')) return 3
            if (window.location.href.endsWith('/admin/settings')) return 4
        })
    }, [])
    // useEffect(() => {
    //     const pathname = router.pathname;
    //     if (pathname === '/admin') setActive(0)
    //     if (pathname === '/admin/film') setActive(1)
    //     if (pathname === '/admin/user') setActive(2)
    //     if (pathname === '/admin/notifi') setActive(3)
    //     if (pathname === '/admin/settings') setActive(4)
    // }, [router.pathname, click])
    const handleChange = () => {
        setClick(!click)
    }
    const menu = [
        {
            name: "Thống kê", link: "/", icon:
                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M19 5v2h-4V5h4M9 5v6H5V5h4m10 8v6h-4v-6h4M9 17v2H5v-2h4M21 3h-8v6h8V3zM11 3H3v10h8V3zm10 8h-8v10h8V11zm-10 4H3v6h8v-6z"></path></svg>
        },
        {
            name: "Phim", link: "film", icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                </svg>
        },
        {
            name: "Người dùng", link: "user", icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
        },
        {
            name: "Thông báo", link: "notifi", icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
        },
        {
            name: "Cài đặt", link: "settings", icon:
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
        },
    ]
    return (
        <div className="flex max-w-[100%] pt-7 md:pt-0" admin={true}>
            <div className=" right-1 absolute p-3 pt-0 md:hidden" onClick={() => { setShowMenu(true) }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-300 ring-1 ring-blue-300 rounded-full p-1 hover:scale-105">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>
            <div onClick={() => { setShowMenu(false) }} className="fixed w-full h-full  top-0 left-0 z-10" style={{ backgroundColor: '#4343439e', display: `${showMenu ? 'block' : 'none'}` }}></div>

            <div className={`fixed duration-400 text-white bg-slate-950 h-[55%] w-56 top-[20%] left-2 rounded-lg pt-4 flex flex-col justify-between no_select ${showMenu ? 'opacity-100 translate-y-0 z-20' : 'opacity-0 translate-y-[-30px] z-0'}`}>
                <div>
                    <ul>
                        {menu.map((item, index) => (
                            <div key={index} className="relative" onClick={() => { setActive(index), router.push(`/admin/${item.link}`), setShowMenu(false) }}>
                                <div className={`card_bar_2 absolute left-0 h-full top-2 duration-500 ${active == index ? 'transform translate-x-0' : 'transform -translate-x-[20px]'}`}></div>

                                <li className={`p-4 pl-7 group hover:bg-slate-900 hover:text-green-400 cursor-pointer flex text-[16px] ${active == index ? 'text-green-400 bg-slate-900' : ''}`} style={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
                                    <div className="flex group-hover:pl-1 duration-250">
                                        {item.icon}&nbsp;&nbsp;
                                        {item.name}
                                    </div>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-row-reverse group hover:bg-slate-900 cursor-pointer hover:text-green-400 justify-between items-center" style={{ padding: '10px', paddingLeft: '30px' }}>
                    <img src={avatar.length > 0 ? avatar : 'https://genk.mediacdn.vn/2019/12/11/photo-4-15760338752791880880837.jpg'} className='cursor-pointer rounded-full w-8 h-8 sm:w-12 sm:h-12 hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 object-cover'></img>
                    <div className="flex text-xl cursor-pointer items-center group" style={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
                        <div className="group-hover:p-1 duration-250 flex items-center text-[16px]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" transform="rotate(90)" className="w-7 h-7">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                            </svg>
                            &nbsp;&nbsp;Đăng xuất
                        </div>

                    </div>
                </div>
            </div>
            <div className=" hidden md:block flex-none w-72 no_select">
                <a href='/' className="flex justify-center pr-5 fixed top-10 left-6 ">
                    <div className={styles.logo} style={{ WebkitUserSelect: 'none', userSelect: 'none', MozUserSelect: 'none', color: '#4ade80', fontFamily: 'hazu' }}>
                        <span style={{ fontSize: '3.5rem' }}>P</span>
                        <span style={{ fontSize: '3.3rem' }}>R</span>
                        <span style={{ fontSize: '3.1rem' }}>J</span>
                        <span style={{ fontSize: '2.9rem' }}>2</span>
                        <span style={{ fontSize: '2.9rem' }}>F</span>
                        <span style={{ fontSize: '3.1rem' }}>L</span>
                        <span style={{ fontSize: '3.3rem' }}>I</span>
                        <span style={{ fontSize: '3.5rem' }}>X</span>
                    </div>
                </a>
                <div className="fixed text-white bg-slate-950 h-[55%] w-72 top-[20%] left-2 rounded-lg pt-4 flex flex-col justify-between">
                    <div>
                        <ul>
                            {menu.map((item, index) => (
                                <div key={index} className="relative" onClick={() => { setActive(index), router.push(`/admin/${item.link}`) }}>
                                    <div className={`card_bar_2 absolute left-0 h-full top-2 duration-500 ${active == index ? 'transform translate-x-0' : 'transform -translate-x-[20px]'}`}></div>

                                    <li className={`p-4 pl-10 group hover:bg-slate-900 hover:text-green-400 cursor-pointer flex text-lg ${active == index ? 'text-green-400 bg-slate-900' : ''}`} style={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
                                        <div className="flex group-hover:pl-1 duration-250">
                                            {item.icon}&nbsp;&nbsp;
                                            {item.name}
                                        </div>
                                    </li>
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-row-reverse group hover:bg-slate-900 cursor-pointer hover:text-green-400 justify-between items-center" style={{ padding: '10px', paddingLeft: '40px' }}>
                        <img src={avatar.length > 0 ? avatar : 'https://genk.mediacdn.vn/2019/12/11/photo-4-15760338752791880880837.jpg'} className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 object-cover'></img>
                        <div className="flex text-xl cursor-pointer items-center group" style={{ fontFamily: 'sans-serif', fontWeight: '600' }}>
                            <div className="group-hover:p-1 duration-250 flex items-center" onClick={() => { handleLogout() }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" transform="rotate(90)" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                                </svg>
                                &nbsp;&nbsp;Đăng xuất
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 max-w-[100%] text-white md:pl-10 md:pt-7 pt-3">
                {children}
            </div>
        </div>
    );
}

export default LayoutAdmin;