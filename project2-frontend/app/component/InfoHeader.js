'use client'
import Link from 'next/link';
import styles from './component.module.css'
import { Fragment, useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function InfoHeader({ isVisible }) {
    const [show, setShow] = useState(isVisible);
    const { data: session } = useSession();

    const nav = () => {
        window.location.href = '/page/login'
    }

    const handleLogout = async () => {
        localStorage.removeItem('filmInfo')
        localStorage.removeItem('listSaved')
        localStorage.removeItem('listLiked')
        if (session && session.user) {
            localStorage.removeItem('film_user')
            localStorage.removeItem('film_avatar')
            await signOut({ redirect: false })
            await nav()
        } else {
            nav()
        }

    }
    const [isAdmin, setIsAdmin] = useState(false)
    let userInfo
    const getUserFromLocalStorage = () => {
        try {
            // avatar2 = localStorage.getItem('film_avatar');
            userInfo = JSON.parse(localStorage.getItem('filmInfo'))
            return userInfo
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    useEffect(() => {
        for (let i = 0; i < getUserFromLocalStorage()?.roles.length; i++) {
            if (getUserFromLocalStorage()?.roles[i].role.name == 'ROLE_ADMIN') {
                setIsAdmin(true)
                break
            }
        }
    }, [])
    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    return (
        <div className={styles.info_header} style={{ display: `${show ? '' : 'none'}` }}>
            {isAdmin ? <Link href='/admin'>
                <div className={styles.info_item}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                        </svg>

                    </div>
                    &nbsp;Trang admin
                </div>
            </Link> : ''
            }
            <Link href='/page/account/info'>
                <div className={styles.info_item}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                    </div>
                    &nbsp;Thông tin tài khoản
                </div>
            </Link>
            <Link href='/page/account/saved'>
                <div className={styles.info_item}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </div>
                    &nbsp;Phim đã lưu
                </div>
            </Link>
            <Link href='/page/account/favorite'>
                <div className={styles.info_item}>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    </div>
                    &nbsp;Yêu thích
                </div>
            </Link>
            <div className={styles.divider}></div>

            <div className={styles.info_item} onClick={() => handleLogout()}>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" transform="rotate(90)" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
                    </svg>
                </div>
                &nbsp;&nbsp;Đăng xuất
            </div>

        </div>
    );
}

export default InfoHeader;