'use client'

import { useEffect, useState } from "react";
import { MotionDiv } from "./MotionDiv";
import UserApi from "@/app/api/UserApi";

const { default: ItemRank } = require("./ItemRank");

function Rank({ type }) {
    const [rank, setRank] = useState([]);
    useEffect(() => {
        if (type == 1) {
            UserApi.GetTopNew().then(res => {
                setRank(res.data);
            })
        } else if (type == 2) {
            UserApi.GetTopView().then(res => {
                setRank(res.data);
            })
        }
    }, [type])
    return (
        <div className="max-w-full flex flex-col space-y-4">
            {rank.map((item, index) => {
                return (
                    <MotionDiv key={index}
                        initial={{ y: 15, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <ItemRank index={index} type={type} data={item}></ItemRank>
                    </MotionDiv>
                )
            }
            )}
        </div>
    );
}

export default Rank;