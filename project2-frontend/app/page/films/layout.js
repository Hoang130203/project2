'use client'
import Search from "@/app/component/Search/Search";
import { users } from './data'
import { createContext, useContext, useEffect, useState } from "react";
import { FilmContextProvider, FilmContext } from "./context";
import { usePathname, useRouter } from "next/navigation";

function PageFilmLayout({ children }) {
    const year = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
    const listFilm = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const context = useContext(FilmContext);
    const router = useRouter()
    const pathname = usePathname()

    const { yearActive, setYearActive } = context || {};
    useEffect(() => {
        if (!window.location.href.includes('year')) {
            setYearActive(null)
        }
    }, [pathname])
    return (
        <div className="flex flex-col lg:flex-row justify-between text-white min-h-[800px] w-full pt-16  md:px-6" >
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://i.pinimg.com/originals/cb/bb/2f/cbbb2f79e94fe48b30427b1cc41cb771.jpg')`, backgroundPosition: 'center', opacity: 0.1 }}></div>
            <div className="flex-1 lg:max-w-[calc(100%-360px)]  z-[2]">
                {children}
            </div>
            <div className="min-h-24 md:w-96 shrink-0 no_select max-w-full z-[2]">
                <div className="min-h-[200px] pt-10 pl-3 md:pl-5 text-xl md:text-2xl " >
                    <div style={{ fontFamily: 'Hazu' }}>
                        <div>Tìm kiếm</div>
                        <Search data={users}></Search>
                    </div>
                    <div className="text-3xl pt-4" style={{ fontFamily: 'Hazu' }}>Năm phát hành</div>
                    <div className="grid grid-cols-3 gap-2 pr-2 py-3 text-gray-400">
                        {year.map((item, index) => {
                            return (
                                <div key={index} className={[" cursor-pointer text-xl rounded-[4px] ring-1 ring-gray-400 flex justify-center items-center hover:ring-blue-400 hover:text-blue-400 hover:bg-slate-800 ", `${item == yearActive ? 'text-blue-400 ring-1 ring-blue-400 bg-slate-800' : ''}`].join(' ')} onClick={(e) => { setYearActive(item), router.push(`/page/films/year/${item}`) }}>
                                    {item == 2010 ? `< ${item}` : item}
                                </div>
                            )
                        }
                        )}
                        <div className={[" cursor-pointer text-xl rounded-[4px] ring-1 ring-gray-400 flex justify-center items-center hover:ring-blue-400 hover:text-blue-400 hover:bg-slate-800 ", `${yearActive == 0 ? 'text-blue-400 ring-1 ring-blue-400 bg-slate-800' : ''}`].join(' ')} onClick={(e) => { setYearActive(0), router.push(`/page/films/year/${0}`) }}>
                            Tất cả
                        </div>
                    </div>
                    <div className="py-4 mr-2">

                    </div>
                </div>
            </div>
        </div>

    );
}

export default PageFilmLayout;