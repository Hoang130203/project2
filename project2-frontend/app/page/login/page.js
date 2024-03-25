'use client'
import { GoogleIcon, TwitterIcon } from "@/icons/icon";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { signIn, signOut, useSession } from 'next-auth/react'

function Login() {
    const { data: session } = useSession();

    if (session && session.user) {
        //       localStorage.setItem('user', session.user.name)
        localStorage.setItem('film_avatar', session.user.image)
        localStorage.setItem('film_id', session.user.id)
        localStorage.setItem('film_name', session.user.name)
        window.location.href = "/page/account/info"
        // Api.login(session.user.id, session.user.name, session.user.image).then(res => {
        //     if (res.status === 200) {
        //         console.log("Login success")
        //         console.log(res.data)
        //         localStorage.setItem('film_user', res.data.name)
        //         localStorage.setItem('film_info', res.data.id)
        //         localStorage.setItem('account', res.data.account)
        //         localStorage.setItem('password', res.data.password)
        //         window.location.href = "/"
        //     }
        // })

    }
    // useEffect(() => {
    //     axios.post('http://localhost:8080/api/auth/login', { account: 'k58a23', password: '130203' }, { withCredentials: true })
    //         .then(response => {
    //             console.log(response)
    //         }).catch(console.error)
    //     // axios.get('http://localhost:8080/auth/logout', { withCredentials: true }).then(response => console.log(response)).catch(console.error)

    //     axios.get('http://localhost:8080/api/auth/details', { withCredentials: true }).then(response => console.log(response)).catch(console.error)
    // }
    //     , []);
    // useEffect(() => {
    // }, []);
    // const handleLogout = () => {
    //     // axios.post('http://localhost:8080/auth/logout').then(response => console.log(response)).catch(console.error)
    // }
    return (
        <div className="flex flex-col md:flex-row pt-16 text-white justify-between items-center space-x-2 animate-slide-up">
            <div className="p-8 w-full space-y-6 md:ring-2 md:ring-gray-500 md:ml-16 rounded-2xl md:mb-20 flex-shrink-0" style={{ maxWidth: '480px' }}>
                <div style={{ fontFamily: 'flame' }}>
                    <p className="text-orange-400 text-2xl md:text-3xl">Đăng nhập</p>
                </div>
                <div className="flex-col space-y-2 justify-center">
                    <div onClick={() => signIn('google')} className="flex items-center justify-center space-x-3 text-gray-300 w-full ring-gray-500 hover:ring-orange-400 ring-2 rounded-lg py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                        <GoogleIcon /><div> Đăng nhập với Google</div>
                    </div>
                    <div onClick={() => signIn('twitter')} className="flex items-center justify-center space-x-3 text-gray-300 w-full ring-gray-500 hover:ring-orange-400 ring-2 rounded-lg py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                        <TwitterIcon /><div> Đăng nhập với Twitter</div>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #ccc' }}></div>
                    <div className="mx-2">Hoặc</div>
                    <div className="flex-1 h-0" style={{ borderTop: '1px solid #ccc' }}></div>
                </div>
                <div >
                    <div className="flex flex-col space-y-6 w-full">
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
                    </div>
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