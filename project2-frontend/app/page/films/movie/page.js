import CardScroll from "@/app/component/OtherComponent/CardScroll";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import SlideFilm from "@/app/component/SlideFilm";

function Movie() {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]

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
                <div className="mx-1 md:mx-2 text-xl md:text-3xl font-serif" style={{ fontFamily: 'bleeding' }}>Phim lẻ mới ra</div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Movie;