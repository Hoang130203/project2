'use client'
import Search from "@/app/component/Search/Search";
import { users } from './data'
function PageFilmLayout({ children }) {
    const year = [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010]
    const listFilm = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className="flex flex-col md:flex-row justify-between text-white min-h-[800px] w-full pt-16  md:px-6" >
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://i.pinimg.com/originals/cb/bb/2f/cbbb2f79e94fe48b30427b1cc41cb771.jpg')`, backgroundPosition: 'center', opacity: 0.1 }}></div>
            <div className="flex-1 md:max-w-[calc(100%-360px)]  z-[2]">
                {children}
            </div>
            <div className="min-h-24 md:w-96 shrink-0 no_select max-w-full z-[2]">
                <div className="min-h-[200px] pt-10 pl-3 md:pl-5 text-xl md:text-2xl " >
                    <div style={{ fontFamily: 'Hazu' }}>
                        Tìm kiếm
                        <Search data={users}></Search>
                    </div>
                    <div className="text-3xl pt-4" style={{ fontFamily: 'Hazu' }}>Năm phát hành</div>
                    <div className="grid grid-cols-3 gap-2 pr-2 py-3 text-gray-400">
                        {year.map((item, index) => {
                            return (
                                <div key={index} className=" cursor-pointer text-xl rounded-[4px] ring-1 ring-gray-400 flex justify-center items-center hover:ring-blue-400 hover:text-blue-400 hover:bg-slate-800 ">
                                    {item}
                                </div>
                            )
                        }
                        )}

                    </div>
                    <div className="py-4 mr-2">
                        {listFilm.map((item, index) => {
                            return (
                                <div key={index} className="relative flex my-2 group bg-gray-900 hover:bg-gray-800 h-24 cursor-pointer rounded-md">
                                    <div className="film_img_2"></div>
                                    <div className="h-full w-16 flex bg-slate-300 overflow-hidden rounded-md relative" >
                                        <div className="film_img"></div>
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_m8cav_i37AVLD6fGhHS78IZ0fbhmC6VIHg&usqp=CAU" className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-300" ></img>
                                    </div>
                                    <div className="px-3 md:px-5 flex flex-col h-full justify-between py-2 max-w-full text-gray-400" style={{ width: '75%' }}>
                                        <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xl" style={{ fontFamily: 'impact' }}>
                                            Solo leveling
                                        </div>
                                        <div className="text-lg flex items-center relative" >
                                            {Array.from({ length: 5 }).map((item, index) => {

                                                return (
                                                    <svg key={index} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400 ml-1 hover:scale-110 cursor-pointer transition-transform">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                                    </svg>
                                                )
                                            }
                                            )}
                                            <div className="right-1 absolute text-blue-400 hover:scale-105 transition-transform cursor-pointer" style={{ fontFamily: 'flame' }}>
                                                Phim bộ
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PageFilmLayout;