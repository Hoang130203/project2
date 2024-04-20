'use client'
import { useEffect, useState } from 'react';
import styles from './component.module.css'
import Link from 'next/link';
function MenuType({ isVisible }) {
    const [show, setShow] = useState(isVisible);
    const listTypes = [{ id: 'ACTION', name: 'Hành động' }, { id: 'ADVENTURE', name: 'Phiêu lưu' }, { id: 'HORROR', name: 'Kinh dị' }, { id: 'COMEDY', name: 'Hài hước' }, { id: 'ROMATIC', name: 'Lãng mạn' }, { id: 'WAR', name: 'Chiến tranh' }, { id: 'DRAMA', name: 'Tâm lý' }, { id: 'ANIME', name: 'Anime' }, { id: 'COSTUME', name: 'Cổ trang' }, { id: 'FANTASY', name: 'Viễn tưởng' }]

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);
    return (
        <div className={styles.list_item} style={{ display: `${show ? '' : 'none'}` }}>
            {listTypes.map((item, index) => (
                <Link key={index} href={`/page/films/type/${item.id}`} >
                    <div className={styles.item}>
                        {item.name}
                    </div>
                </Link>

            ))}
        </div>
    );
}

export default MenuType;