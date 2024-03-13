import CardScroll from "@/app/component/OtherComponent/CardScroll";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import SlideFilm from "@/app/component/SlideFilm";

function Movie() {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
    const newData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }]
    return (
        <div className="w-full">
            <div className="w-full flex justify-center items-center p-7 no_select">
                <div className="flex-1 h-0" style={{ borderTop: '1px solid #ccc' }}></div>
                <div className="mx-2 text-2xl md:text-4xl " style={{ fontFamily: 'bleeding' }}>Phim lẻ </div>
                <div className="flex-1 h-0" style={{ borderTop: '1px solid #ccc' }}></div>
            </div>
            <div className="space-y-2 w-full h-max justify-start " style={{ fontFamily: 'flame' }}>
                <div id="controls-carousel" classNames="relative w-full " data-carousel="static">
                    <MotionDiv
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <CardScroll data={data} cardid="Nổi bật" type={2} />
                    </MotionDiv>
                </div>
            </div>
            <div className="w-full items-center p-3 no_select">
                <div className="mx-1 md:mx-2 text-xl md:text-3xl font-serif" style={{ fontFamily: 'bleeding' }}>Phim lẻ mới cập nhật</div>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 pt-8">
                    {newData.map((item, index) => (
                        <div key={index} className="min-h-16  group cursor-pointer " >
                            <div className="h-40 md:h-52 w-full">
                                <div className="h-full w-full flex bg-slate-300 overflow-hidden rounded-md relative" >
                                    <img src="https://i.pinimg.com/236x/7e/d4/83/7ed483e065ea9cd5de8d00886f607ccf.jpg" className="w-full h-full object-cover group-hover:scale-110 rounded-md transition-transform duration-500" ></img>
                                    <div className="film_img_hover hidden group-hover:block"></div>
                                </div>
                            </div>
                            <div className="h-10 pt-2 px-2 text-center">
                                <div className="text text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer group-hover:text-yellow-300 text-xl" >
                                    Advenger
                                </div>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Movie;