// import { Menu, Button, MenuItems, MenuItem } from "@headlessui/react";
import Image from "next/image";

export default function Home() {
  // <video muted loop className="max-w-full relative bottom-0" src="https://pipedproxy-bom.kavin.rocks/videoplayback?c=ANDROID&clen=14594388&cpn=dny-ke2fgPS7vpzI&dur=93.124&ei=XXfuZZXMCPO6rtoPucOwuAk&expire=1710148541&fexp=24007246&fvip=2&gir=yes&host=rr5---sn-npoe7nsr.googlevideo.com&id=o-AHdMPdkEG7e2URzIUjfkbQLHPEIEtNqlqSK9KVTPuYvX&initcwndbps=812500&ip=23.26.221.24&itag=248&keepalive=yes&lmt=1702679622466113&lsig=APTiJQcwRQIgQYOATftiyBubwytP-q2zNTlTufLV8IUZ_ZayRyKIemYCIQDWDR1SblQcvLF0Y5uV4mj9KoxU_Bu01hkRP25cWByMlg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=HJ&mime=video%2Fwebm&mm=31%2C29&mn=sn-npoe7nsr%2Csn-npoldne7&ms=au%2Crdu&mt=1710126784&mv=m&mvi=5&pl=24&qhash=8f8cc146&requiressl=yes&sig=AJfQdSswRgIhAOC2MRSm49Zu1hDm4GAWIdmujvC1qInRcXkP5ikRQ0B9AiEA2xo9xanGDJFhTrzlLTrVQ9O7q0ViSHDARtdfGzs48kE%3D&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&spc=UWF9f4KOyBpTAW7CjYNFPffX7_tu8Iad53P7gg5aJBjGWCRJnQ&svpuc=1&txp=5535434&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D" preload="auto" autoplay="" class="Herosection_herovideo__xZ6cW"></video>
  const array = ['https://res.cloudinary.com/dqwouu351/video/upload/v1710128065/wtiitankbavsaczfw8dw.webm',
    'https://res.cloudinary.com/dqwouu351/video/upload/v1710127733/o4qvbavkrdtdz5go4333.webm',
    'https://res.cloudinary.com/dqwouu351/video/upload/v1710129165/sliaxwq6k0olhwdeut4c.mp4']
  // Chọn một chỉ số ngẫu nhiên trong khoảng từ 0 đến chiều dài của mảng
  const randomIndex = Math.floor(Math.random() * array.length);

  // Truy cập phần tử tương ứng trong mảng
  const randomElement = array[randomIndex];
  return (
    <main className="text-white flex min-h-screen flex-col items-center justify-between " >
      <div className="w-max max-w-full overflow-hidden justify-center items-center flex relative" style={{ maxHeight: '90vh' }}>
        <div className="video"></div>
        <video muted loop className="max-w-full relative bottom-0" src={`${randomElement + "?c=ANDROID&clen=14594388&cpn=dny-ke2fgPS7vpzI&dur=93.124&ei=XXfuZZXMCPO6rtoPucOwuAk&expire=1710148541&fexp=24007246&fvip=2&gir=yes&host=rr5---sn-npoe7nsr.googlevideo.com&id=o-AHdMPdkEG7e2URzIUjfkbQLHPEIEtNqlqSK9KVTPuYvX&initcwndbps=812500&ip=23.26.221.24&itag=248&keepalive=yes&lmt=1702679622466113&lsig=APTiJQcwRQIgQYOATftiyBubwytP-q2zNTlTufLV8IUZ_ZayRyKIemYCIQDWDR1SblQcvLF0Y5uV4mj9KoxU_Bu01hkRP25cWByMlg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&mh=HJ&mime=video%2Fwebm&mm=31%2C29&mn=sn-npoe7nsr%2Csn-npoldne7&ms=au%2Crdu&mt=1710126784&mv=m&mvi=5&pl=24&qhash=8f8cc146&requiressl=yes&sig=AJfQdSswRgIhAOC2MRSm49Zu1hDm4GAWIdmujvC1qInRcXkP5ikRQ0B9AiEA2xo9xanGDJFhTrzlLTrVQ9O7q0ViSHDARtdfGzs48kE%3D&source=youtube&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&spc=UWF9f4KOyBpTAW7CjYNFPffX7_tu8Iad53P7gg5aJBjGWCRJnQ&svpuc=1&txp=5535434&ump=1&vprv=1&xpc=EgVo2aDSNQ%3D%3D"}`} preload="auto" autoplay="" class="Herosection_herovideo__xZ6cW"></video>
      </div>
      <div className="my-auto space-y-2">

        <div className="p-6 max-w-sm mx-auto min-w-36 bg-white rounded-xl shadow-md flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img className="h-12 w-12 " src="https://static.vecteezy.com/system/resources/thumbnails/005/337/802/small/icon-symbol-chat-outline-illustration-free-vector.jpg"></img>
          </div>
          <div>
            <div className="text-xl font-medium text-black">Chit Chat</div>
            <p className="text-gray-500">Bạn có một tin nhắn mới!</p>
          </div>
        </div>
        <div className="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
          <img className="block mx-auto h-24 rounded-full sm:mx-0 sm:flex-shrink-0 hover:bg-yellow-500 hover:ring-2 hover:ring-yellow-500 hover:ring-offset-2 hover:border-transparent" src="https://www.shutterstock.com/image-vector/chat-icon-people-group-260nw-437341633.jpg" alt="Woman's Face" />
          <div className="text-center space-y-2 sm:text-left">
            <div className="space-y-0.5">
              <p className="text-lg text-black font-semibold">
                Erin Lindford
              </p>
              <p className="text-gray-500 font-medium">
                Product Engineer
              </p>
            </div>
            <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
          </div>
        </div>
        <div className="space-x-2 flex justify-center">
          <button class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
            Click me
          </button>
          <button class="btn btn-green">
            Button
          </button>
        </div>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div class="md:flex">
            <div class="md:flex-shrink-0">
              <img class="h-48 w-full object-cover md:h-full md:w-48 hover:scale-105  hover:duration-500  duration-500 cursor-pointer" src="https://haycafe.vn/wp-content/uploads/2022/10/Hinh-anh-avatar-nu-dep.jpg" alt="Man looking at item at a store" />
            </div>
            <div class="p-8">
              <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Case study</div>
              <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Finding customers for your new business</a>
              <p class="mt-2 text-gray-500">Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.</p>
            </div>
          </div>
        </div>
        <form>
          <input className="border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-black rounded-md p-2 mx-1" placeholder="email" />
          <button className="disabled:opacity-50 duration-500 transform motion-safe:hover:scale-110 bg-emerald-400 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-md px-4 py-2 mx-1">
            Đăng ký
          </button>
          <input type="checkbox" class=" form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"></input>
          <span class="text-gray-900 font-medium">lựa chọn 1</span>
        </form>
        <select className="text-gray-700">
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>
    </main>
  );
}
