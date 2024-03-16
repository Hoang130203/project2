'use client'

import { useEffect, useState } from "react";
import { MotionDiv } from "./MotionDiv";

const { default: ItemRank } = require("./ItemRank");

function Rank({ type }) {
    const [rank, setRank] = useState([]);
    useEffect(() => {
        if (type == 1) {
            setRank([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
        } else if (type == 2) {
            setRank([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
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
                        <ItemRank index={index}></ItemRank>
                    </MotionDiv>
                )
            }
            )}
        </div>
    );
}

export default Rank;