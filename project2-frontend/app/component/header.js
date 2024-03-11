'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
import { MenuIcon, MoreIcon } from '@/icons/icon';
import MenuType from './MenuType';
import MenuCountry from './MenuCountry';
import MenuMobile from './MenuMobile';
import InfoHeader from './InfoHeader';

function Header() {
    const [scroll, setScroll] = useState(0);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [showMenuMobile, setShowMenuMobile] = useState(false);
    const [showInfoHeader, setShowInfoHeader] = useState(false);
    useEffect(() => {
        function handleScroll() {
            const scrollableElement = document.documentElement;
            const scrollTop = scrollableElement.scrollTop;

            if (scrollTop > 60) {
                setScroll(true);
                console.log('Vị trí thanh cuộn lớn hơn 10px.');
            } else {
                setScroll(false);
                console.log('Vị trí thanh cuộn không lớn hơn 10px.');
            }
        }

        window.addEventListener('scroll', handleScroll);

        // Clean up để tránh memory leak
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div className='flex justify-between z-20' style={{ height: '68px', position: 'fixed', width: '100%', backgroundColor: `${scroll ? '#3d3c3c3d' : '#ccc0'}`, backdropFilter: `${scroll ? 'blur(6px)' : 'blur(1px)'}`, display: 'flex', transition: '-moz-initial 1s' }}>
            <div className='flex  space-x-8'>
                <Link href='/'>
                    <div className={styles.logo} style={{ WebkitUserSelect: 'none', userSelect: 'none', MozUserSelect: 'none' }}>
                        <span style={{ fontSize: '2.5rem' }}>P</span>
                        <span style={{ fontSize: '2.3rem' }}>R</span>
                        <span style={{ fontSize: '2.1rem' }}>J</span>
                        <span style={{ fontSize: '1.9rem' }}>2</span>
                        <span style={{ fontSize: '1.9rem' }}>F</span>
                        <span style={{ fontSize: '2.1rem' }}>L</span>
                        <span style={{ fontSize: '2.3rem' }}>I</span>
                        <span style={{ fontSize: '2.5rem' }}>X</span>
                    </div>
                </Link>
                <div className='hidden sm:flex gap-2'>
                    <div className={styles.item_header}>
                        <Link href='#' >
                            Phim lẻ
                        </Link>
                    </div>
                    <div className={styles.item_header}>
                        <Link href='#' >
                            Phim bộ
                        </Link>
                    </div>
                    <div className={styles.item_header} onMouseEnter={() => { setShow1(true) }} onMouseLeave={() => { setShow1(false) }}>
                        <Link href='#'>
                            Thể loại

                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                        <div className={styles.menu_1}>
                            <MenuType isVisible={show1} />
                        </div>
                    </div>
                    <div className={styles.item_header} onMouseEnter={() => { setShow2(true) }} onMouseLeave={() => { setShow2(false) }}>
                        <Link href='#'>
                            Quốc gia
                        </Link>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                        </svg>
                        <div className={styles.menu_1}>
                            <MenuCountry isVisible={show2} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex space-x-2 justify-center items-center pr-2 sm:pr-10'>
                <div className='relative' onMouseEnter={() => { setShowInfoHeader(true) }} onMouseLeave={() => { setShowInfoHeader(false) }}>
                    <img src='https://www.tnmt.edu.vn/wp-content/uploads/2023/11/hinh-nen-dai-dien-1.jpg' className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300'></img>
                    <div className='absolute h-max w-max top-11 sm:top-12 right-0 sm:right-8 '>
                        <InfoHeader isVisible={showInfoHeader} />
                    </div>
                </div>
                <div className='block md:hidden ring-1 ring-gray-300 rounded-full p-1 relative focus:ring-yellow-300' onMouseEnter={() => { setShowMenuMobile(true) }} onMouseLeave={() => { setShowMenuMobile(false) }}>
                    <div >
                        <MenuIcon color='#fff' />
                    </div>
                    <div className='absolute h-max w-max top-12 md right-0'>
                        <MenuMobile isVisible={showMenuMobile} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;