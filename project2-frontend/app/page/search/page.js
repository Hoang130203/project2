'use client'
import UserApi from '@/app/api/UserApi';
import { MotionDiv } from '@/app/component/OtherComponent/MotionDiv';
import { SearchIcon } from '@/app/component/Search/SearchIcon';
import { Pagination } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Autocomplete, AutocompleteItem, Avatar, Button } from "@nextui-org/react";

function Searchs() {
    const [value, setValue] = useState("");
    const [data, setData] = useState([])
    const router = useRouter()
    useEffect(() => {
        if (value.length > 1) {
            UserApi.GetByKeyWord(value).then(res => {
                setData(res.data?.content)
            })
        }
    }, [value])
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const keyword = searchParams.get('keyword');
        // const search = window.location.href.split('keyword=')[1];
        setKeyword(keyword);
    }, []);


    const [films, setFilms] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm state để lưu tổng số trang
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, keyword]); // Sử dụng useEffect để gọi API khi trang thay đổi

    const fetchData = (page) => {
        if (keyword.length >= 2)
            UserApi.GetByKeyWord(keyword, page - 1, 30).then(res => {
                setFilms(res.data?.content);
                setTotalPages(res.data?.totalPages); // Cập nhật tổng số trang từ API
            });
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    if (!keyword) {
        return <div className="w-full pt-20 md:px-2">Nhập từ khóa để tìm kiếm</div>;
    }
    return (

        <div className="w-full pt-20 md:px-2">
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://i.pinimg.com/originals/cb/bb/2f/cbbb2f79e94fe48b30427b1cc41cb771.jpg')`, backgroundPosition: 'center', opacity: 0.1 }}></div>
            <div className="w-full items-center p-3 no_select ">
                <Autocomplete
                    style={{ fontFamily: 'sans-serif' }}
                    classNames={{
                        base: "max-w-xs ml-7",
                        listboxWrapper: "max-h-[320px]",
                        selectorButton: "text-default-500"
                    }}
                    defaultItems={data}
                    inputProps={{
                        classNames: {
                            input: "ml-1",
                            inputWrapper: "h-[48px]",
                        },
                        value: value,
                        onChange: (e) => { setValue(e.target.value) },
                        onKeyDown: (e) => { if (e.key === 'Enter' && value.length > 1) { setKeyword(value), setValue(''), router.push(`/page/search?keyword=${value}`) } }
                    }}
                    listboxProps={{
                        hideSelectedIcon: true,
                        itemClasses: {
                            base: [
                                "rounded-medium",
                                "text-default-500",
                                "transition-opacity",
                                "data-[hover=true]:text-foreground",
                                "dark:data-[hover=true]:bg-default-50",
                                "data-[pressed=true]:opacity-70",
                                "data-[hover=true]:bg-default-200",
                                "data-[selectable=true]:focus:bg-default-100",
                                "data-[focus-visible=true]:ring-default-500",
                            ],
                        },
                    }}
                    aria-label="Select a film"
                    placeholder="Nhập tên phim"
                    popoverProps={{
                        offset: 10,
                        classNames: {
                            base: "rounded-large",
                            content: "p-1 border-small border-default-100 bg-background",
                        },
                    }}
                    startContent={<SearchIcon className="text-default-400" strokeWidth={2.5} size={20} />}
                    radius="full"
                    variant="bordered"
                >
                    {(item) => (
                        <AutocompleteItem key={item.id} textValue={item.name}>
                            <Link href={`/page/detail/${item.id}`}>
                                <div className="flex justify-between items-center ">
                                    <div className="flex gap-2 items-center max-w-[70%]  overflow-hidden">
                                        <Avatar alt={item.name} className="flex-shrink-0" size="sm" src={item.image} />
                                        <div className="flex flex-col">
                                            <span className="text-small text-nowrap whitespace-nowrap overflow-ellipsis">{item.name}</span>
                                            <span className="text-tiny text-default-400">{item.movie ? 'Phim lẻ' : 'Phim bộ'}</span>
                                        </div>
                                    </div>
                                    <Button
                                        className="border-small mr-0.5 font-medium shadow-small "
                                        radius="full"
                                        size="sm"
                                        variant="bordered"
                                    >
                                        Chi tiết
                                    </Button>
                                </div>
                            </Link>
                        </AutocompleteItem>
                    )}
                </Autocomplete>
                <div className="mx-1 md:mx-2 text-2xl md:text-3xl font-serif pt-5 text-center" style={{ fontFamily: 'Hazu' }}>Từ khóa :  <span style={{ color: 'green' }}>{keyword}</span></div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 pt-8 xl:grid-cols-7 2xl:grid-cols-8">
                    {films.map((item, index) => (
                        <MotionDiv key={index}
                            initial={{ y: 15, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/page/detail/${item.id}`} className="cursor-pointer">
                                <div className="min-h-16  group cursor-pointer " >
                                    <div className="h-40 md:h-52 w-full">
                                        <div className="h-full w-full flex bg-slate-300 overflow-hidden rounded-md relative" >
                                            <img
                                                src={`${item.image.length > 10 ? item.image : "https://i.pinimg.com/236x/7e/d4/83/7ed483e065ea9cd5de8d00886f607ccf.jpg"}`}
                                                className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-500"
                                            />                                            <div className="film_img_hover hidden group-hover:block"></div>
                                        </div>
                                    </div>
                                    <div className="h-10 pt-2 px-2 text-center">
                                        <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xs md:text-xl" >
                                            {item.name}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </MotionDiv>
                    )
                    )}
                </div>
            </div>
            <div>
                <Pagination
                    loop
                    showControls
                    color="success"
                    page={currentPage}
                    total={totalPages}
                    initialPage={1}
                    onChange={(page) => { setCurrentPage(page), scrollToTop() }}
                    className="float-right"
                />
            </div>
        </div>
    );
}

export default Searchs;
