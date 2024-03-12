'use client'

import { useEffect, useState } from "react";

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
                    <ItemRank key={index} index={index}></ItemRank>
                )
            }
            )}
        </div>
    );
}

export default Rank;