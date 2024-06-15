'use client'
import { GithubIcon, GoogleIcon, TwitterIcon } from "@/icons/icon";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import UserApi from "@/app/api/UserApi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
function Register() {
    const { data: session } = useSession();
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
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
    const router = useRouter()
    const handleRegister = () => {
        if (userName.length == 0 || password.length < 6 || name.length == 0) {
            toast.warn('Nhập đủ thông tin')
            return
        }
        if (password !== rePassword) {
            toast.warn('Nhập lại mật khẩu k đúng')
            return
        }
        toast.loading('Đang đăng ký...')
        UserApi.Register(userName, password, email, name).then(
            res => {
                if (res.status == 201) {
                    toast.success('Đăng ký thành công')
                    router.push('/page/login')
                }
            }
        ).finally(() => {
            toast.dismiss()
        })
    }
    return (
        <div className="flex flex-col md:flex-row pt-36 text-white justify-between items-center space-x-2 animate-slide-up">
            <div className="p-8 w-full space-y-6 md:ring-2 md:ring-gray-500 md:ml-16 rounded-2xl md:mb-20 flex-shrink-0" style={{ maxWidth: '480px' }}>
                <div style={{ fontFamily: 'flame' }}>
                    <p className="text-orange-400 text-2xl md:text-3xl">Đăng ký tài khoản </p>
                </div>

                <div >
                    <div className="flex flex-col space-y-6 w-full">
                        <input value={userName} onChange={(e) => { setUserName(e.target.value) }} type="text" placeholder="Tài khoản" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder="Mật khẩu" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <input value={rePassword} onChange={(e) => { setRePassword(e.target.value) }} type="password" placeholder="Nhập lại mật khẩu" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <input value={name} onChange={(e) => { setName(e.target.value) }} type="text" placeholder="Họ tên" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <input value={email} onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder="Email(không bắt buộc)" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                        <button onClick={handleRegister} className="bg-orange-400 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 rounded-md px-4 py-2">Đăng ký</button>
                    </div>
                </div>
                <div>
                    <p>Bạn đã có tài khoản? <Link href="/page/login" className="text-blue-400 hover:underline">Đăng nhập</Link></p>
                </div>
            </div>
            <div className="hidden md:block relative" style={{ maxWidth: '60%' }}>
                <div className="image_login"></div>
                <img src="https://i.pinimg.com/originals/d0/e3/05/d0e30570ca9da96da2911219687acccc.jpg"></img>
            </div>
        </div>
    );
}

export default Register;