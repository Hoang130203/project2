import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";

function Favorite() {
    const newData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }]

    return (
        <div className="text-white pt-20 px-6">
            <div className="mx-2 text-2xl md:text-3xl" style={{ fontFamily: 'west' }}>Phim đã lưu </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pt-8">
                {newData.map((item, index) => (
                    <MotionDiv key={index}
                        initial={{ y: 15, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <div className="min-h-16  group cursor-pointer " >
                            <div className="h-40 md:h-52 w-full">
                                <div className="h-full w-full flex bg-slate-300 overflow-hidden rounded-md relative" >
                                    <img src="https://i.pinimg.com/236x/7e/d4/83/7ed483e065ea9cd5de8d00886f607ccf.jpg" className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-500" ></img>
                                    <div className="film_img_hover hidden group-hover:block"></div>
                                </div>
                            </div>
                            <div className="h-10 pt-2 px-2 text-center">
                                <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xs md:text-xl" >
                                    Advenger
                                </div>
                            </div>
                        </div>
                    </MotionDiv>
                )
                )}
            </div>
        </div>
    );
}

export default Favorite;