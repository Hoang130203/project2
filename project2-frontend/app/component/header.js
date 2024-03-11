'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
function Header() {
    const [scroll, setScroll] = useState(0);
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
                <div className={styles.logo}>
                    <span style={{ fontSize: '2.5rem' }}>P</span>
                    <span style={{ fontSize: '2.3rem' }}>R</span>
                    <span style={{ fontSize: '2.1rem' }}>J</span>
                    <span style={{ fontSize: '1.9rem' }}>2</span>
                    <span style={{ fontSize: '1.9rem' }}>F</span>
                    <span style={{ fontSize: '2.1rem' }}>L</span>
                    <span style={{ fontSize: '2.3rem' }}>I</span>
                    <span style={{ fontSize: '2.5rem' }}>X</span>
                </div>
                <div className='hidden sm:flex gap-2'>
                    <div className={styles.item_header}>
                        <Link href='#' >
                            Trang chủ
                        </Link>
                    </div>
                    <div className={styles.item_header}>
                        <Link href='#' >
                            Thể loại
                        </Link>
                    </div>
                    <div className={styles.item_header}>
                        <Link href='#'>
                            Nổi bật
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex space-x-8 justify-center items-center pr-4 sm:pr-10'>
                <div>
                    <img src='https://www.tnmt.edu.vn/wp-content/uploads/2023/11/hinh-nen-dai-dien-1.jpg' className='cursor-pointer rounded-full w-10 h-10 sm:w-12 sm:h-12 hover:ring-2 hover:ring-blue-300'></img>
                </div>
            </div>
        </div>
    );
}

export default Header;