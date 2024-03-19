'use client'
import { useEffect, useState } from "react";

function Overview() {
    const [showMore, setShowMore] = useState(false);

    const text = ` Truyện lấy bối cảnh bắt nguồn từ sự việc xảy ra vào mười hai năm trước, con Hồ Ly Chín Đuôi (Kyuubi-Kurama[2]) đã tấn công Làng Lá (木ノ葉隠れ (Mộc Diệp Ẩn Lý) Konohagakure / Konohagakure no Sato?). Với lượng sức mạnh khổng lồ, nó có thể dễ dàng khiến sóng thần nổi dậy và san bằng núi non chỉ với một trong số chín cái đuôi, nó đã gây ra sự hỗn loạn tột cùng và giết chết nhiều người, cho tới khi người lãnh đạo của làng Lá – ngài Hokage Đệ Tứ (Namikaze Minato) đã hi sinh để phong ấn con quái thú vào cơ thể con trai mình - Naruto khi cậu chỉ vừa mới được sinh ra, bằng cấm thuật: Kin Jutsu Ogi "Shiki Fuin" (Thi Quỷ Phong Tận - một thuật cấm phải đánh đổi bằng tính mạng). Hokage Đệ Tứ, người được vinh danh vì đã phong ấn con yêu hồ, khi nhắm mắt xuôi tay đã mong muốn Naruto được người dân tôn trọng khi có thân xác là nơi chứa đựng con quái vật.
    Thứ bậc của các nguyên tố chakra (Hỏa, Phong, Lôi, Thổ, Thủy ).
    Dù vậy, Naruto trải qua thời thơ ấu không mấy êm đềm khi người dân làng Lá không ngừng xa lánh và bộc lộ sự sợ hãi cũng như tức giận dành cho cậu, đối xử với Naruto như thể cậu chính là con yêu hồ, là mối đe dọa tiềm tàng dành cho làng Lá. Một quy định đã được đặt ra bởi Hokage Đệ Tam nhằm ngăn cấm mọi người không được bàn luận hay đề cập đến vụ tấn công của con yêu hồ với bất kì ai, thậm chí là với con cái của mình. Dù vậy, điều này cũng không thể ngăn cản họ khỏi việc coi cậu như một kẻ ngoài lề. Cậu đã lớn lên mồ côi mà không có gia đình, bạn bè, hay bất kì sự thừa nhận nào. Vì không thể ép buộc mọi người làm bạn và quan tâm đến cậu, vậy nên cậu mới phải tìm cách gây sự chú ý và mong muốn được công nhận bằng các trò phá phách và nghịch ngợm.`
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
                        <div>Anime, Hành động, Viễn tưởng, Tình cảm</div>
                        <div>Quốc gia</div>
                        <div>Nhật Bản</div>
                        <div>Số tập</div>
                        <div>1020</div>
                        <div>Lượt xem</div>
                        <div>1.952.115.154</div>
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