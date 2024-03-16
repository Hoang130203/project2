'use client'
// import { Menu, Button, MenuItems, MenuItem } from "@headlessui/react";

import Image from "next/image";
import SlideFilm from "./component/SlideFilm";
import { PlayIcon } from "@/icons/icon";
import NewEposide from "./component/NewEposide";
import Rank from "./component/OtherComponent/Rank";

export default function Home() {

  // <video muted loop className="max-w-full relative bottom-0" src="https://pipedproxy-bom.kavin.rocks/videoplayback?c=ANDROID&clen=14594388&cpn=dny-ke2fgPS7vpzI&dur=93.124&ei=XXfuZZXMCPO6rtoPucOwuAk&expire=1710148541&fexp=24007246&fvip=2&gir=yes&host=rr5---sn-npoe7nsr.googlevideo.com&id=o-AHdMPdkEG7e2URzIUjfkbQLHPEIEtNqlqSK9KVTPuYvX&initcwndbps=812500&ip=23.26.221.24&itag=248&keepalive=yes&lmt=1702679622466113&lsig=APTiJQcwRQIgQYOATftiyBubwytP-q2zNTlTufLV8IUZ_ZayRyKIemYCIQDWDR1SblQcvLF0Y5uV4mj9KoxU_Bu01hkRP25cWByMlg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=HJ&mime=video%2Fwebm&mm=31%2C29&mn=sn-npoe7nsr%2Csn-npoldne7&ms=au%2Crdu&mt=1710126784&mv=m&mvi=5&pl=24&qhash=8f8cc146&requiressl=yes&sig=AJfQdSswRgIhAOC2MRSm49Zu1hDm4GAWIdmujvC1qInRcXkP5ikRQ0B9AiEA2xo9xanGDJFhTrzlLTrVQ9O7q0ViSHDARtdfGzs48kE%3D&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&spc=UWF9f4KOyBpTAW7CjYNFPffX7_tu8Iad53P7gg5aJBjGWCRJnQ&svpuc=1&txp=5535434&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D" preload="auto" autoplay="" className="Herosection_herovideo__xZ6cW"></video>
  const array = ['https://res.cloudinary.com/dxmczmcpn/video/upload/v1710345342/dk2aktsqvbrefnc0inwc.webm',
    'https://res.cloudinary.com/dxmczmcpn/video/upload/v1710345388/tifb2wr1wic4gzo47jcc.webm',
    'https://res.cloudinary.com/dqwouu351/video/upload/v1710129165/sliaxwq6k0olhwdeut4c.mp4']
  // Chọn một chỉ số ngẫu nhiên trong khoảng từ 0 đến chiều dài của mảng
  const randomIndex = Math.floor(Math.random() * array.length);

  // Truy cập phần tử tương ứng trong mảng
  const randomElement = array[randomIndex];
  return (
    <main className="text-white flex min-h-screen flex-col items-center justify-start " >
      <div className="w-max max-w-full overflow-hidden justify-center items-center flex relative" style={{ maxHeight: '90vh' }}>
        <div className="video"></div>
        <video muted loop className="max-w-full relative bottom-0" src={`${"https://res.cloudinary.com/dxmczmcpn/video/upload/v1710345388/tifb2wr1wic4gzo47jcc.webm?c=ANDROID&clen=14594388&cpn=dny-ke2fgPS7vpzI&dur=93.124&ei=XXfuZZXMCPO6rtoPucOwuAk&expire=1710148541&fexp=24007246&fvip=2&gir=yes&host=rr5---sn-npoe7nsr.googlevideo.com&id=o-AHdMPdkEG7e2URzIUjfkbQLHPEIEtNqlqSK9KVTPuYvX&initcwndbps=812500&ip=23.26.221.24&itag=248&keepalive=yes&lmt=1702679622466113&lsig=APTiJQcwRQIgQYOATftiyBubwytP-q2zNTlTufLV8IUZ_ZayRyKIemYCIQDWDR1SblQcvLF0Y5uV4mj9KoxU_Bu01hkRP25cWByMlg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=HJ&mime=video%2Fwebm&mm=31%2C29&mn=sn-npoe7nsr%2Csn-npoldne7&ms=au%2Crdu&mt=1710126784&mv=m&mvi=5&pl=24&qhash=8f8cc146&requiressl=yes&sig=AJfQdSswRgIhAOC2MRSm49Zu1hDm4GAWIdmujvC1qInRcXkP5ikRQ0B9AiEA2xo9xanGDJFhTrzlLTrVQ9O7q0ViSHDARtdfGzs48kE%3D&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&spc=UWF9f4KOyBpTAW7CjYNFPffX7_tu8Iad53P7gg5aJBjGWCRJnQ&svpuc=1&txp=5535434&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D"}`} preload="auto" autoPlay ></video>
        <div className="absolute z-10 left-0 bottom-1 md:bottom-16 px-5 md:px-20 flex-col md:space-y-2 no_select">
          <div className="text-lg md:text-3xl text-green-400" style={{ fontFamily: 'bleeding' }}>#1 Trending</div>
          <div className="text-xl md:text-5xl flex items-center md:my-3 pl-1">
            <span style={{ fontFamily: 'flame' }}> Honkai Impact 3</span>
          </div>
          <div className="ml-1 rounded-full px-3 py-1 md:px-5 md:pr-8 md:py-2  bg-gray-700 w-max cursor-pointer flex items-center hover:ring-1 hover:ring-green-400 hover:text-green-300 hover:bg-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 md:w-7 md:h-7 md:mr-2" viewBox="0 0 48 48"><defs><mask id="ipSPlay0"><g fill="none" stroke-linejoin="round" stroke-width="4"><path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"></path><path fill="#000" stroke="#000" d="M20 24v-6.928l6 3.464L32 24l-6 3.464l-6 3.464z"></path></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSPlay0)"></path>
            </svg>
            <div className="h-full items-center text-xs md:text-2xl">Xem ngay</div>
          </div>
        </div>
      </div>
      <div className="block px-5 py-4 md:px-20 w-full no_select">
        <div className="space-y-2 w-full h-max justify-start" style={{ fontFamily: 'flame' }}>
          <SlideFilm />
        </div>
        <div className="space-y-2 w-full h-max justify-start" style={{ fontFamily: 'flame' }}>
          <NewEposide />
        </div>
        <div className="flex flex-col md:flex-row w-full md:space-x-28 space-y-5 md:space-y-0">
          <div className="flex-1 text-lg md:text-2xl flex-col md:max-w-[45%]" style={{ fontFamily: '-moz-initial' }}>
            <div className=" flex"><div className="card_bar"></div>TOP ĐÁNH GIÁ</div>
            <div className="max-w-full mt-7">
              <Rank type={1} />
            </div>
          </div>
          <div className="flex-1 text-lg md:text-2xl md:max-w-[45%]" style={{ fontFamily: '-moz-initial' }}>
            <div className=" flex"><div className="card_bar"></div>TOP XEM NHIỀU</div>
            <div className="max-w-full mt-7">
              <Rank type={2} />
            </div>
          </div>
        </div>
      </div>


    </main>
  );
}
