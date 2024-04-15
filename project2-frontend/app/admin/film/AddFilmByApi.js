'use client'
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import NavBottom from "@/app/page/detail/NavBottom";
import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react";
import * as XLSX from 'xlsx';
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import UserApi from "@/app/api/UserApi";
import axios from "axios";


function AddFilmByApi() {
    const [api, setApi] = useState('')
    const [api2, setApi2] = useState('')
    const [film, setFilm] = useState({})
    const [films, setFilms] = useState([{}])
    const [number, setNumber] = useState(0)
    const tabs = [
        {
            name: "1 phim",
            label: "Thêm 1 phim",
        },
        {
            name: "Hàng loạt",
            label: "Thêm hàng loạt",
        }
    ];

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const handleClick = (e, tab) => {
        e.preventDefault();

        setActiveTab(tab);
    };

    const isSelected = (tab) => activeTab.name === tab.name;

    const mapCategoryToType = (categoryName, type) => {
        switch (categoryName) {
            case 'Hành Động':
            case 'hanh-dong':
                return 'ACTION';
            case 'Phiêu Lưu':
            case 'phieu-luu':
                return 'ADVENTURE';
            case 'Hài Hước':
            case 'hai-huoc':
                return 'COMEDY';
            case 'Lãng Mạn':
            case 'lang-man':
                return 'DRAMA';
            case 'Viễn Tưởng':
            case 'vien-tuong':
                return 'FANTASY';
            case 'Kinh Dị':
            case 'kinh-di':
                return 'HORROR';
            case 'Tình Cảm':
            case 'tinh-cam':
                return 'ROMATIC';
            case 'Cổ Trang':
            case 'co-trang':
                return 'COSTUME';
            case 'hoathinh':
            case 'hoat-hinh':
                return 'ANIME';
            case 'Chiến Tranh':
            case 'chien-tranh':
                return 'WAR';
            default:
                return type == 'hoathinh' ? 'ANIME' : 'ACTION';
        }
    };
    async function fetchDataFromExternalAPI() {
        if (api.length < 10) return null
        try {
            const response = await axios.get(api);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi gọi API bên ngoài:', error);
            return null;
        }
    }
    const countryMapping = {
        "han-quoc": "KOREA",
        "trung-quoc": "CHINA",
        "viet-nam": "VIETNAM",
        "thai-lan": "THAILAND",
        "nhat-ban": "JAPAN"
        // Các quốc gia khác sẽ được gán giá trị USA
    };
    function formatData(dataFromExternalAPI) {
        // Format các trường dữ liệu
        const formattedData = {
            name: dataFromExternalAPI.movie.name,
            trailer: dataFromExternalAPI.movie.trailer_url,
            country: countryMapping[dataFromExternalAPI.movie.country[0].slug] ? countryMapping[dataFromExternalAPI.movie.country[0].slug] : 'USA',
            description: dataFromExternalAPI.movie.content.replace(/<\/?p>/g, ""),
            movie: (dataFromExternalAPI.movie.type === 'series' || dataFromExternalAPI.episodes[0].server_data.length > 1) ? false : true,
            image: dataFromExternalAPI.movie.thumb_url || '',
            background: dataFromExternalAPI.movie.poster_url || '',
            author: dataFromExternalAPI.movie.director[0],
            year: dataFromExternalAPI.movie.year,
            status: dataFromExternalAPI.movie.status,
            ageRequire: dataFromExternalAPI.movie.age_require || null, // Giả sử không có trường tuổi yêu cầu
            types: dataFromExternalAPI.movie.category.map(category => ({ name: mapCategoryToType(category.slug, dataFromExternalAPI.movie.type) })),
            episodes: dataFromExternalAPI.episodes[0].server_data.map(episode => ({
                description: episode.filename,
                serial: parseInt(episode.slug.replace(/\D/g, '')), // Chuyển slug thành số
                image: '', // Không có ảnh mặc định
                isVipRequire: 0, // Không yêu cầu VIP mặc định
                url: episode.link_embed,
            })),
            characters: dataFromExternalAPI.movie.actor.map(actor => ({ name: actor, role: 'Nhân vật phụ', image: 'https://freesvg.org/img/abstract-user-flat-4.png' })), // Giả sử tất cả là nhân vật phụ và không có ảnh
        };

        return formattedData;
    }
    useEffect(() => {
        fetchDataFromExternalAPI().then(data => {
            if (data) {
                const formattedData = formatData(data);
                setFilm(formattedData);
            }
            console.log(film.background)
        });
    }, [api]);
    useEffect(() => {
        if (api2.length < 10) return
        var response
        try {
            response = axios.get(api);
            axios.get(api2).then(async (data) => {
                if (data) {
                    setNumber(data?.data?.items?.length)
                    setFilms(data?.data?.items)
                }
            });
        } catch (error) {
            console.error('Lỗi khi gọi API bên ngoài:', error);
            return null;
        }

    }, [api2]);
    const handleUpfilm = async () => {
        if (!film.name) return alert('Vui lòng nhập api đúng')

        await UserApi.PostFilm(film).then(res => {
            if (res.status == 200) {
                alert('Thêm phim thành công')
            }
        })


    }
    const handleUpfilm2 = async () => {
        if (films?.length == 0) return alert('Vui lòng nhập api đúng')
        var count = 0
        const regex = /(https?:\/\/.*?\.com)/;
        const match = api2.match(regex)[1];
        try {
            for (const film of films) {
                const url = `${match}/phim/${film.slug}`;
                console.log(url);
                const response = await axios.get(url);
                const data = response.data;
                if (data) {
                    const formattedData = formatData(data);
                    const res = await UserApi.PostFilm(formattedData);
                    if (res.status === 200) {
                        count++;
                    }
                }
            }
            alert('Thành công: ' + count + ' phim đã được thêm.');
        } catch (error) {
            console.error('Lỗi khi thêm phim:', error);
            alert('Đã có lỗi xảy ra khi thêm phim. Vui lòng thử lại sau.');
        }
        await alert('thêm thành công ' + count + ' phim')
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className="w-[700px] max-w-[90%] h-[90%] z-40 bg-slate-900 rounded-lg overflow-y-auto">
            <div className='flex mb-[10px] justify-center pt-1 gap-2'>
                {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={[
                            'transition-all duration-300 cursor-pointer relative ',
                            isSelected(tab) ? 'text-green-300 opacity-1' : "",
                        ].join(" ")}
                    >
                        <div className="text-lg  pr-2 pl-2" key={tab.name} onClick={(e) => handleClick(e, tab)}>
                            {tab.label}
                        </div>
                        {isSelected(tab) && (
                            <motion.div layoutId="indicator" className={['absolute bottom-0 left-0 right-0 h-[2px] ', isSelected(tab) ? 'bg-green-300' : "bg-white"].join(" ")} />
                        )}
                    </div>
                ))}
            </div>
            <AnimatePresence mode="wait" >
                <motion.div
                    key={activeTab.name || "empty"}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    transition={{
                        duration: 0.3,
                    }}
                >

                    {activeTab && activeTab.name === "1 phim" &&
                        <Fragment>
                            <div><Input value={api} onChange={(e) => { setApi(e.target.value) }} placeholder="Nhập api ophim1 hoặc phimkk" variant="underlined" className="col-span-2 w-full text-green-300"></Input></div>
                            <div className="h-[450px] md:h-[350px] relative text-white">

                                <div className="w-full absolute top-0 left-0 right-0 bottom-0 cursor-pointer" style={{ backgroundImage: `url(${film.background})`, backgroundPosition: 'center center', backgroundSize: 'cover', height: '100%' }}>
                                </div>

                                <div className="video"></div>
                                <div className="absolute bottom-[-35%] flex flex-col sm:flex-row sm:left-[4%] z-10 gap-4 sm:gap-6 items-center w-full sm:w-[90%]">
                                    <div className="sm:w-[180px] sm:h-[260px] w-[165px] h-[240px] rounded-md" style={{ backgroundImage: `url(${film.image})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>

                                    </div>
                                    <div className="max-w-[90%] flex flex-col justify-center no_select text-center sm:text-start ">
                                        <MotionDiv
                                            initial={{ y: 15, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="flex flex-col gap-3">
                                                <Input value={film.name} variant="bordered" label="Tên" size="lg" className="text-green-400" style={{ fontSize: '20px', paddingTop: '10px' }} />
                                                <Input value={film.author} disabled variant="bordered" label="Tác giả/ Studio" type="text" size="lg" className="text-green-400" style={{ fontSize: '20px', paddingTop: '10px' }} />
                                                <div className="flex items-center justify-center sm:justify-start">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400 ml-1 hover:scale-110 cursor-pointer transition-transform">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                    </svg>
                                                    x.x | &nbsp;<span className="text-white"><Input variant="bordered" label="trạng thái" type="text" className="text-green-400" value={film.status} /></span>
                                                </div>
                                            </div>
                                        </MotionDiv>

                                    </div>
                                </div>
                            </div>
                            <div className="min-h-[300px] pb-3 mt-40 md:px-16 px-5">
                                <MotionDiv
                                    initial={{ y: 15, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="grid grid-cols-3 gap-3 text-[15px]">
                                        <div>Thể loại</div>
                                        <div className="col-span-2 ">
                                            {film.types?.map((type, index) => (
                                                <Fragment key={index}>
                                                    <input type="checkbox"
                                                        id={`check${index}`}
                                                        label={type.name}
                                                        checked
                                                    />
                                                    <label className="text-green-300" htmlFor={`check${index}`}>{type.name}</label>
                                                    &nbsp;&nbsp;
                                                </Fragment>
                                            ))
                                            }
                                        </div>
                                        <div>Quốc gia</div>
                                        <div className="col-span-2">
                                            <Input value={film.country} variant="bordered" className="col-span-2 w-24 text-green-300"></Input>
                                        </div>
                                        <div>Năm</div>
                                        <Input value={film.year} variant="bordered" className="col-span-2 w-24 text-green-300"></Input>
                                        <div>Tuổi yêu cầu</div>
                                        <div className="col-span-2"><Input value={film.ageRequire} variant="bordered" className="col-span-2 w-24 text-green-300"></Input>
                                        </div>
                                        <div>Trailer</div>
                                        <div className="col-span-2"><Input value={film.trailer} variant="bordered" className="col-span-2 w-48 text-green-300"></Input></div>
                                    </div>
                                </MotionDiv>
                            </div>
                            <div className="pb-3 pt-10 md:px-16 px-5">
                                <div className="py-2">Tóm tắt phim</div>
                                <Textarea
                                    value={film.description}

                                    placeholder="Nhập tóm tắt phim.."
                                    className="max-w-full text-green-300"
                                    minRows={5}
                                    variant="bordered"
                                />
                                <div className="py-2">
                                    Danh sách nhân vật
                                </div>
                                {film.characters?.map((character, index) => (
                                    <div key={index} className=" items-center gap-4 py-1 text-green-300">
                                        {character.name}


                                    </div>
                                ))}

                                <div className="pt-7">
                                    Loại phim &nbsp;&nbsp;
                                    <span className="text-green-300">{`${film.movie ? 'Phim lẻ' : 'Phim bộ'}`}</span>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {film.episodes?.map((episode, index) => (
                                        <div key={index} className="relative grid grid-cols-6 items-center gap-4 py-1 min-h-[250px]">
                                            <Input className="col-span-1" disabled value={`Tập ${episode?.serial}`}></Input>
                                            <Textarea className="col-span-3" disabled value={` ${episode?.description}`}></Textarea>
                                            <div className="col-span-2 h-full rounded-md" disabled value={` ${episode?.time}`} style={{ backgroundImage: `url(${episode.image ? episode.image : film.image ? film.image : ''})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}></div>
                                            <div className="absolute top-8  text-blue-400 text-xl" style={{ fontFamily: 'Hazu' }}>{episode.vipRequire ? 'Vip' : 'Free'}</div>
                                            <div className="col-span-6">{episode.url}</div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                            <div className="flex justify-center py-2">
                                <Button onClick={handleUpfilm} className=" text-white text-xl" color="primary">Thêm phim</Button>
                            </div>
                        </Fragment>
                    }
                    {activeTab.name === "Hàng loạt" && (
                        <div className="px-2">
                            <Input value={api2} onChange={(e) => { setApi2(e.target.value) }} placeholder="Nhập api ophim1 hoặc phimkk" variant="underlined" className="col-span-2 w-full text-green-300"></Input>
                            <div>Có tổng cộng {number} phim</div>
                            {films?.map((film, index) => (
                                <div key={index} className="grid grid-cols-2 gap-4 py-1">
                                    <div>{film.name}</div>
                                    <div>{film.slug}</div>
                                </div>
                            ))
                            }
                            <div className="flex justify-center py-2">
                                <Button onClick={handleUpfilm2} className=" text-white text-xl" color="primary">Thêm phim</Button>
                            </div>
                        </div>

                    )}
                </motion.div>
            </AnimatePresence>

        </div>
    );
}

export default AddFilmByApi;