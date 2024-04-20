'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
function MenuCountry({ isVisible }) {
    const [show, setShow] = useState(isVisible);
    const types = [1, 2, 3, 4, 5, 6]
    const countries = [{ id: 'VIETNAM', name: 'Việt Nam' }, { id: 'JAPAN', name: 'Nhật Bản' }, { id: 'KOREA', name: 'Hàn Quốc' }, { id: 'CHINA', name: 'Trung Quốc' }, { id: 'THAILAND', name: 'Thái Lan' }, { id: 'USA', name: 'Mỹ' }]

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