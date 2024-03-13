'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
function MenuType({ isVisible }) {
    const [show, setShow] = useState(isVisible);
    const listTypes = [{ id: 1, name: 'Hành động' }, { id: 2, name: 'Phiêu lưu' }, { id: 3, name: 'Kinh dị' }, { id: 4, name: 'Hài hước' }, { id: 5, name: 'Lãng mạn' }, { id: 6, name: 'Chiến tranh' }, { id: 7, name: 'Tâm lý' }, { id: 8, name: 'Anime' }, { id: 9, name: 'Cổ trang' }, { id: 10, name: 'Viễn tưởng' }]

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    return (
        <div className={styles.list_item} style={{ display: `${show ? '' : 'none'}` }}>
            {listTypes.map((item, index) => (
                <Link key={index} href={`/page/films/type/${index + 1}`} >
                    <div className={styles.item}>
                        {item.name}
                    </div>
                </Link>

            ))}
        </div>
    );
}

export default MenuType;