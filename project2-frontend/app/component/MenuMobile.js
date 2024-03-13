'use client'
import { MoreIcon } from "@/icons/icon";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from './component.module.css'
function MenuMobile({ isVisible }) {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    return (
        <div className={styles.menu_mobile} style={{ display: `${show ? '' : 'none'}` }}>
            <div className="flex-col justify-between">
                <div className="flex-col gap-2">
                    <div className={styles.item_menu}>
                        <Link href='/page/films/movie'>
                            Phim lẻ
                        </Link>
                    </div>
                    <div className={styles.item_menu}>
                        <Link href='/page/films/series' >
                            Phim bộ
                        </Link>
                    </div>
                    <div className={styles.item_menu} onMouseEnter={() => { setShow1(true) }} onMouseLeave={() => { setShow1(false) }}>
                        <Link href='#' >
                            Thể loại
                        </Link>

                    </div>
                    <div className={styles.item_menu} onMouseEnter={() => { setShow2(true) }} onMouseLeave={() => { setShow2(false) }}>
                        <Link href='#' >
                            Quốc gia
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MenuMobile;