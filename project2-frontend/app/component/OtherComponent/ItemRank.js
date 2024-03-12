// import pikachu from '../../../public/pikachu.gif'
function ItemRank({ index }) {
    const color = ['#FFD700', '#C0C0C0', '#CD7F32']
    const color2 = ['red', '#333']
    const icons = ['/pikachu.gif', '/canhcut.gif', '/meo.gif']
    return (
        <div className="max-w-full  rounded-2xl h-24 px-5 relative flex " style={{ backgroundColor: '#18181b' }}>
            {icons[index] && <div className="badge_div " style={{ backgroundColor: 'transparent', color: color2[index] }}>
                <img src={icons[index]}></img>
            </div>
            }

            <div className="badge_div left-2" style={{ backgroundColor: color[index], color: color2[index] }}>{index + 1}</div>
            <img src="https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/171197/Originals/hinh%20nen%20anime%20nam%20(45).jpg" className="h-full max-w-20 object-cover rounded-md cursor-pointer "></img>
            <div className="flex-1 h-full max-w-[90%]">
                <div className="px-3 md:px-5 flex flex-col h-full justify-between py-2 max-w-full text-gray-400" style={{ maxWidth: '90%' }}>
                    <div className=" text-nowrap max-w-full overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer hover:text-yellow-300" style={{ fontFamily: 'impact' }}>
                        Kimesu no Yaiba - Demon Slayer
                    </div>
                    <div className="text-lg flex items-center relative" style={{ fontFamily: 'flame' }}>
                        10<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400 ml-1 hover:scale-110 cursor-pointer transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                        <div className="right-1 absolute text-blue-400 hover:scale-105 transition-transform cursor-pointer" >
                            Phim lẻ
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}

export default ItemRank;