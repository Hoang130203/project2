import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";

const items = [
    {
        name: "Raiden Shogun",
        picture: "https://i2.wp.com/genshinbuilds.aipurrjects.com/genshin/characters/raiden_shogun/image.png?strip=all&quality=100",
        amount: "4.500.000",
        date: "9/20/2023",
    },
    {
        name: "Uzumaki Naruto",
        picture: "https://naruto-official.com/index/char_naruto.webp",
        amount: "360.000",
        date: "9/20/2023",
    },
    {
        name: "Songoku",
        picture: "https://anhdepfree.com/wp-content/uploads/2020/11/hinh-nen-dep-dragon-ball-songoku-toc-trang.jpg",
        amount: "360.000",
        date: "9/20/2021",
    },
    {
        name: "Uchiha Sasuke",
        picture: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c02bdb38-a8de-43aa-bbbd-53918b21d78d/dflz9pf-9242ac7d-469a-495e-b843-7947f5768df3.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MwMmJkYjM4LWE4ZGUtNDNhYS1iYmJkLTUzOTE4YjIxZDc4ZFwvZGZsejlwZi05MjQyYWM3ZC00NjlhLTQ5NWUtYjg0My03OTQ3ZjU3NjhkZjMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bWwB6Zhwon48yq685qXOjqtbQVQYxSDGHJGqyQHge30",
        amount: "150.000",
        date: "9/20/2021",
    },
    {
        name: "Asuna Yuuki",
        picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ0rqBGojzLQGn3R-rOPt5g9kqvV-Czs8wVQ&usqp=CAU",
        amount: "190.000",
        date: "9/20/2021",
    },
];

export const CardTransactions = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-3">
            <CardBody className="py-5 gap-4">
                <div className="flex gap-2.5 justify-center">
                    <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
                        <span className="text-default-900 text-xl font-semibold">
                            Giao dịch gần nhất
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-6 ">
                    {items.map((item) => (
                        <div key={item.name} className="grid grid-cols-5 w-full">
                            <div className="w-full">
                                <Avatar
                                    isBordered
                                    src={item.picture}
                                />
                            </div>

                            <span className="text-default-900  font-semibold" style={{ gridColumn: "span 2" }}>
                                {item.name}
                            </span>
                            <div>
                                <span className="text-success text-xs">{item.amount}</span>
                            </div>
                            <div>
                                <span className="text-default-500 text-xs">{item.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
};