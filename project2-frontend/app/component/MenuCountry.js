'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
function MenuCountry({ isVisible }) {
    const [show, setShow] = useState(isVisible);
    const types = [1, 2, 3, 4, 5, 6]
    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    return (
        <div className={styles.list_item} style={{ display: `${show ? '' : 'none'}` }}>
            {types.map((item, index) => (
                <div key={index} className={styles.item}>
                    <Link href='#' >
                        Quốc gia {item}
                    </Link>
                </div>

            ))}
        </div>
    );
}

export default MenuCountry;