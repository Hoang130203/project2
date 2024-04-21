"use client"
import React, { useEffect, useRef, useState } from 'react';
import styles from './Animecard.module.css';
import { useDraggable } from 'react-use-draggable-scroll';
import Link from 'next/link';
import ItemContent from './ItemContent';
import ItemContent2 from './ItemContent2';

function CardScroll({ data, cardid, show = true, type }) {
    const containerRef = useRef();
    const { events } = useDraggable(containerRef);
    const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
    const [isRightArrowActive, setIsRightArrowActive] = useState(false);
    let userInfo
    const [isVip, setIsVip] = useState(false);
    const getUserFromLocalStorage = () => {
        try {
            // avatar2 = localStorage.getItem('film_avatar');
            userInfo = JSON.parse(localStorage.getItem('filmInfo'))
            console.log(userInfo)
            return userInfo
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    useEffect(() => {
        for (let i = 0; i < getUserFromLocalStorage()?.roles?.length; i++) {
            if (getUserFromLocalStorage()?.roles[i].role.name == 'ROLE_VIP') {
                setIsVip(true)
                break
            }
        }
    }, [])
    function handleScroll() {
        const container = containerRef.current;
        const scrollPosition = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        setIsLeftArrowActive(scrollPosition > 30);
        setIsRightArrowActive(scrollPosition < maxScroll - 30);
    }

    const smoothScroll = (amount) => {
        const container = containerRef.current;
        const cont = document.getElementById(cardid);

        if (cont && container) {
            cont.classList.add('scroll-smooth');
            container.scrollLeft += amount;

            setTimeout(() => {
                cont.classList.remove('scroll-smooth');
            }, 300);
        }
    };


    function scrollLeft() {
        smoothScroll(-500);
    }

    function scrollRight() {
        smoothScroll(+500);
    }

    return (
        <div className={styles.animecard}>
            {show && (
                <div className={styles.cardhead}>

                    {type ? '' : <h1 className={styles.headtitle}>{cardid}</h1>}
                </div>
            )}
            <div className={styles.animeitems}>
                <span className={`${styles.leftarrow} ${isLeftArrowActive ? styles.active : styles.notactive}`}>
                    <svg onClick={scrollLeft} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="m15 18-6-6 6-6"></path></svg>
                </span>
                <span className={`${styles.rightarrow} ${isRightArrowActive ? styles.active : styles.notactive}`}>
                    <svg onClick={scrollRight} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="m9 18 6-6-6-6"></path></svg>
                </span>
                <div className={styles.cardcontainer} id={cardid} {...events} ref={containerRef} onScroll={handleScroll}>
                    {cardid === 'Recent Episodes' ? (
                        data?.map((item) => {
                            const anime = {
                                id: item.id || '1',
                                coverImage: item?.coverImage || 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-m1gX3iwfIsLu.png',
                                title: item.title || 'film',
                                status: item.status || '',
                                format: item.format || '',
                                episodes: item?.episodes || '',
                                totalEpisodes: item?.totalEpisodes || '',
                                currentEpisode: item?.currentEpisode || ''
                            };
                            const gogoEpisodes = item?.episodes?.data?.find(
                                (x) => x.providerId === "gogoanime"
                            );
                            const currentEpisode = gogoEpisodes?.episodes?.find(
                                (x) => x.number === item.currentEpisode
                            );
                            return (
                                <Link href={`/page/detail/1`} key={anime.id}>
                                    <ItemContent anime={anime} cardid={cardid} />
                                </Link>
                            );
                        })
                    ) : (
                        cardid === 'Recommendations' ? (
                            data?.map((item) => {
                                const anime = {
                                    id: item?.mediaRecommendation?.id || '',
                                    coverImage: item?.mediaRecommendation?.coverImage?.extraLarge || '',
                                    title: item?.mediaRecommendation?.title || '',
                                    status: item?.mediaRecommendation?.status || '',
                                    format: item?.mediaRecommendation?.format || '',
                                    episodes: item?.mediaRecommendation?.episodes || '',
                                    nextAiringEpisode: item?.mediaRecommendation?.nextAiringEpisode || ''
                                };
                                return (
                                    <Link href={`/anime/info/${anime.id}`} key={anime.id}>
                                        <ItemContent anime={anime} cardid={cardid} />
                                    </Link>
                                );
                            })
                        ) : (
                            cardid === 'Tập mới' ? (
                                data?.map((item) => {
                                    const anime = {
                                        id: item?.id || '',
                                        coverImage: item?.image || item?.film?.image || 'https://i.pinimg.com/736x/4f/73/c4/4f73c41542e1de0305b84261bd7de2dd.jpg',
                                        title: item?.film?.name || '',
                                        status: item?.node?.status || '',
                                        serial: item?.serial || '',
                                        episodes: item?.node?.episodes || '2',
                                        nextAiringEpisode: item?.node?.nextAiringEpisode || 'd',
                                        relationType: item?.relationType || '5',
                                        movie: item?.film?.movie || '',
                                        vipRequire: item?.vipRequire || false,
                                    };
                                    return (
                                        <Link href={(item.vipRequire && !isVip) ? '#' : `/page/watch/${item?.id}`} key={anime.id}>
                                            {type ? <ItemContent2 anime={anime} cardid={cardid}></ItemContent2> : <ItemContent anime={anime} cardid={cardid} />}
                                        </Link>
                                    );
                                })
                            ) : (
                                data?.map((item) => {
                                    const anime = {
                                        id: item.id || '',
                                        coverImage: item?.background || item?.image || 'https://i.pinimg.com/736x/4f/73/c4/4f73c41542e1de0305b84261bd7de2dd.jpg',
                                        title: item.name || '',
                                        status: item.status || '',
                                        format: item.format || '',
                                        episodes: item?.episodes || '',
                                        movie: item?.movie || '',
                                        views: item?.views || '',
                                    };

                                    return (
                                        <Link href={`/page/detail/${item.id}`} key={anime.id}>
                                            {type ? <ItemContent2 anime={anime} cardid={cardid}></ItemContent2> : <ItemContent anime={anime} cardid={cardid} />}
                                        </Link>
                                    );
                                })
                            )
                        )
                    )}
                    {!data?.length && (
                        Array.from({ length: 15 }, (_, index) => (
                            <div key={index} className={`${styles.carditem} ${styles.loading}`}>
                                <div
                                    className={`${styles.cardimgcontainer} ${styles.pulse}`}
                                    style={{ animationDelay: `${(index + 2) * 0.3}s` }}
                                ></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default CardScroll;