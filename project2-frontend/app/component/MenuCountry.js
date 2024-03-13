'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
function MenuCountry({ isVisible }) {
    const [show, setShow] = useState(isVisible);
    const types = [1, 2, 3, 4, 5, 6]
    const countries = [{ id: 1, name: 'Việt Nam' }, { id: 2, name: 'Nhật Bản' }, { id: 3, name: 'Hàn Quốc' }, { id: 4, name: 'Trung Quốc' }, { id: 5, name: 'Thái Lan' }, { id: 6, name: 'Mỹ' }]

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    return (
        <div className={styles.list_item} style={{ display: `${show ? '' : 'none'}` }}>
            {countries.map((item, index) => (
                <Link key={index} href={`/page/films/country/${item.id}`} >
                    <div className={styles.item}>
                        {item.name}
                    </div>
                </Link>

            ))}
        </div>
    );
}

export default MenuCountry;