import { GoogleIcon, TwitterIcon } from "@/icons/icon";
import Link from "next/link";

function Login() {
    return (
        <div className="flex flex-col md:flex-row pt-16 text-white justify-between items-center space-x-2 animate-slide-up">
            <div className="p-8 w-full space-y-6 md:ring-2 md:ring-gray-500 md:ml-16 rounded-2xl md:mb-20 flex-shrink-0" style={{ maxWidth: '480px' }}>
                <div style={{ fontFamily: 'flame' }}>
                    <p className="text-orange-400 text-2xl md:text-3xl">Đăng nhập</p>
                </div>
                <div className="flex-col space-y-2 justify-center">
                    <div className="flex items-center justify-center space-x-3 text-gray-300 w-full ring-gray-500 hover:ring-orange-400 ring-2 rounded-lg py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                        <GoogleIcon /><div> Đăng nhập với Google</div>
                    </div>
                    <div className="flex items-center justify-center space-x-3 text-gray-300 w-full ring-gray-500 hover:ring-orange-400 ring-2 rounded-lg py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                        <TwitterIcon /><div> Đăng nhập với Twitter</div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #ccc' }}></div>
                    <div className="mx-2">Hoặc</div>
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #ccc' }}></div>
                </div>
                <div >
                    <form className="flex flex-col space-y-6 w-full">
                        <input type="text" placeholder="Tài khoản" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <input type="password" placeholder="Mật khẩu" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div class="ml-2 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                            <a href="#" class="text-sm font-medium text-primary-600 hover:underline text-blue-400">Quên mật khẩu?</a>
                        </div>
                        <button className="bg-orange-400 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 rounded-md px-4 py-2">Đăng nhập</button>
                    </form>
                </div>
                <div>
                    <p>Bạn chưa có tài khoản? <Link href="/page/register" className="text-blue-400 hover:underline">Đăng ký</Link></p>
                </div>
            </div>
            <div className="hidden md:block relative" style={{ maxWidth: '60%' }}>
                <div className="image_login"></div>
                <img src="https://wibutime-seven.vercel.app/_next/image?url=%2Fimages%2Fauth.webp&w=1920&q=75"></img>
            </div>
        </div>
    );
}

export default Login;