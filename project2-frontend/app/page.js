'use client'
// import { Menu, Button, MenuItems, MenuItem } from "@headlessui/react";

import Image from "next/image";
import SlideFilm from "./component/SlideFilm";

export default function Home() {
  // <video muted loop className="max-w-full relative bottom-0" src="https://pipedproxy-bom.kavin.rocks/videoplayback?c=ANDROID&clen=14594388&cpn=dny-ke2fgPS7vpzI&dur=93.124&ei=XXfuZZXMCPO6rtoPucOwuAk&expire=1710148541&fexp=24007246&fvip=2&gir=yes&host=rr5---sn-npoe7nsr.googlevideo.com&id=o-AHdMPdkEG7e2URzIUjfkbQLHPEIEtNqlqSK9KVTPuYvX&initcwndbps=812500&ip=23.26.221.24&itag=248&keepalive=yes&lmt=1702679622466113&lsig=APTiJQcwRQIgQYOATftiyBubwytP-q2zNTlTufLV8IUZ_ZayRyKIemYCIQDWDR1SblQcvLF0Y5uV4mj9KoxU_Bu01hkRP25cWByMlg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=HJ&mime=video%2Fwebm&mm=31%2C29&mn=sn-npoe7nsr%2Csn-npoldne7&ms=au%2Crdu&mt=1710126784&mv=m&mvi=5&pl=24&qhash=8f8cc146&requiressl=yes&sig=AJfQdSswRgIhAOC2MRSm49Zu1hDm4GAWIdmujvC1qInRcXkP5ikRQ0B9AiEA2xo9xanGDJFhTrzlLTrVQ9O7q0ViSHDARtdfGzs48kE%3D&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&spc=UWF9f4KOyBpTAW7CjYNFPffX7_tu8Iad53P7gg5aJBjGWCRJnQ&svpuc=1&txp=5535434&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D" preload="auto" autoplay="" className="Herosection_herovideo__xZ6cW"></video>
  const array = ['https://res.cloudinary.com/dqwouu351/video/upload/v1710128065/wtiitankbavsaczfw8dw.webm',
    'https://res.cloudinary.com/dqwouu351/video/upload/v1710127733/o4qvbavkrdtdz5go4333.webm',
    'https://res.cloudinary.com/dqwouu351/video/upload/v1710129165/sliaxwq6k0olhwdeut4c.mp4']
  // Chọn một chỉ số ngẫu nhiên trong khoảng từ 0 đến chiều dài của mảng
  const randomIndex = Math.floor(Math.random() * array.length);

  // Truy cập phần tử tương ứng trong mảng
  const randomElement = array[randomIndex];
  return (
    <main className="text-white flex min-h-screen flex-col items-center justify-start " >
      <div className="w-max max-w-full overflow-hidden justify-center items-center flex relative" style={{ maxHeight: '90vh' }}>
        <div className="video"></div>
        <video muted loop className="max-w-full relative bottom-0" src={`${randomElement + "?c=ANDROID&clen=14594388&cpn=dny-ke2fgPS7vpzI&dur=93.124&ei=XXfuZZXMCPO6rtoPucOwuAk&expire=1710148541&fexp=24007246&fvip=2&gir=yes&host=rr5---sn-npoe7nsr.googlevideo.com&id=o-AHdMPdkEG7e2URzIUjfkbQLHPEIEtNqlqSK9KVTPuYvX&initcwndbps=812500&ip=23.26.221.24&itag=248&keepalive=yes&lmt=1702679622466113&lsig=APTiJQcwRQIgQYOATftiyBubwytP-q2zNTlTufLV8IUZ_ZayRyKIemYCIQDWDR1SblQcvLF0Y5uV4mj9KoxU_Bu01hkRP25cWByMlg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=HJ&mime=video%2Fwebm&mm=31%2C29&mn=sn-npoe7nsr%2Csn-npoldne7&ms=au%2Crdu&mt=1710126784&mv=m&mvi=5&pl=24&qhash=8f8cc146&requiressl=yes&sig=AJfQdSswRgIhAOC2MRSm49Zu1hDm4GAWIdmujvC1qInRcXkP5ikRQ0B9AiEA2xo9xanGDJFhTrzlLTrVQ9O7q0ViSHDARtdfGzs48kE%3D&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&spc=UWF9f4KOyBpTAW7CjYNFPffX7_tu8Iad53P7gg5aJBjGWCRJnQ&svpuc=1&txp=5535434&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D"}`} preload="auto" autoPlay ></video>
      </div>
      <div className="block px-5 py-4 md:px-20 w-full">
        <div className="space-y-2 w-full h-max justify-start" style={{ fontFamily: 'flame' }}>
          <div className="w-full ">
            <SlideFilm />
          </div>
        </div>
      </div>
    </main>
  );
}
