'use client'
import { useEffect, useState } from "react";
import CardScroll from "./OtherComponent/CardScroll";
import { MotionDiv } from "./OtherComponent/MotionDiv";
import UserApi from "../api/UserApi";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

function NewEposide() {
    // const [data, setData] = useState([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }, { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }])
    const { data: data = [], isLoading, isError } = useQuery(
        'newEpisode',
        async () => {
            toast.loading('Đang tải dữ liệu...');
            try {
                const res = await UserApi.GetTopEpisodeNew();
                return res.data;
            } catch (err) {
                console.log(err);
            } finally {
                toast.dismiss();
            }
        },
        {
            cacheTime: 60000,
            refetchOnWindowFocus: false,
            staleTime: 100000,
        }
    );
    // useEffect(() => {
    //     UserApi.GetTopEpisodeNew().then(res => {
    //         setData(res.data);
    //     }
    //     );
    // }
    //     , []);
    return (
        <div id="controls-carousel" class="relative w-full" data-carousel="static">
            <MotionDiv
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <CardScroll data={data} cardid="Tập mới" />
            </MotionDiv>
        </div>
    );
}

export default NewEposide;