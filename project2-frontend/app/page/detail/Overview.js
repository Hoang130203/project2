'use client'
import { useEffect, useState } from "react";

function Overview({ data }) {
    const [showMore, setShowMore] = useState(false);
    useEffect(() => {
    }, [data])
    const text = `${data?.description}`
    try {
        var maxLength = window.innerWidth > 800 ? 1000 : 300;

    } catch (error) {

    }


    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <div className="px-2 pt-6 text-white">
            <div className="flex flex-col-reverse md:flex-row w-full md:gap-x-11 bg-slate-900 min-h-[200px] rounded-lg p-6">
                <div className="md:max-w-[300px] md:min-w-[280px]">
                    <div className="text-xl md:text-2xl" style={{ fontFamily: 'west' }}>Chi tiết</div>
                    <div className="grid grid-cols-2 gap-2 text-[15px]">
                        <div>Thể loại</div>
                        <div className="">
                            {data?.types?.map((item, index) => (
                                <div key={index}>{item.name} &nbsp;</div>
                            ))}
                        </div>
                        <div>Quốc gia</div>
                        <div>{data?.country}</div>
                        <div>Số tập</div>
                        <div>{data?.episodes?.length}</div>
                        <div>Lượt xem</div>
                        <div>{data?.views}</div>
                    </div>
                </div>
                <div>
                    <div className="text-xl md:text-2xl" style={{ fontFamily: 'west' }}>Mô tả</div>
                    <div>
                        {showMore ? (
                            <div className="transition duration-500 ease-linear">{text}</div>
                        ) : (
                            <div>
                                {text.length > maxLength ? `${text.slice(0, maxLength)}` : text}
                                {text.length > maxLength && <button onClick={toggleShowMore} className="text-blue-400">...Xem thêm</button>}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;