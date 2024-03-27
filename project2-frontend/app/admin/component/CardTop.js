import { Avatar, AvatarGroup, Card, CardBody, Tooltip } from "@nextui-org/react";
import React from "react";

const pictureUsers = [
    "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    "https://i.pravatar.cc/150?u=a04258114e29026702d",
    "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
];

export const CardTop = () => {
    return (
        <Card className=" bg-default-50 rounded-xl shadow-md px-4 py-6 w-full">
            <CardBody className="py-5 gap-6">
                <div className="flex gap-2.5 justify-center">
                    <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
                        <span className="text-default-900 text-xl font-semibold">
                            {" "}
                            {"⭐"}Top doanh thu
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6 flex-col">
                    <span className="text-xs">
                        Top doanh thu tháng này
                    </span>
                    <AvatarGroup isBordered>
                        <Tooltip content="Naruto" placement="bottom" color="primary" style={{ whiteSpace: 'nowrap' }}>
                            <Avatar src="https://upload.wikimedia.org/wikipedia/vi/c/c7/Naruto_Volume_1_manga_cover.jpg" />
                        </Tooltip>
                        <Tooltip content="Solo leveling" placement="bottom" color="primary" style={{ whiteSpace: 'nowrap' }}>
                            <Avatar src="https://i.rada.vn/data/image/2024/03/23/Solo-Leveling-ARISE-Beginners-Guide-700.jpg" />
                        </Tooltip>
                        <Tooltip content="One piece" placement="bottom" color="primary" style={{ whiteSpace: 'nowrap' }}>
                            <Avatar src="https://toquoc.mediacdn.vn/280518851207290880/2023/2/6/photo-1675671769968-1675671771441379074333.jpg" />
                        </Tooltip>
                        <Tooltip content="Doraemon" placement="bottom" color="primary" style={{ whiteSpace: 'nowrap' }}>
                            <Avatar src="https://mcdn.coolmate.me/image/October2023/nhan-vat-doraemon-3012_329.jpg" />
                        </Tooltip>
                        <Tooltip content="Advenger" placement="bottom" color="primary" style={{ whiteSpace: 'nowrap' }}>
                            <Avatar src="https://i.pinimg.com/550x/c8/e3/84/c8e384124683a738c61d50c2115562fa.jpg" />
                        </Tooltip>
                        <Avatar src="https://thanhnien.mediacdn.vn/Uploaded/congthang/2021_10_27/fef0768eb38986ee07f45ab8e1777961-1064.jpeg" />
                    </AvatarGroup>
                </div>
            </CardBody>
        </Card>
    );
};