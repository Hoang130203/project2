'use client'

import { Fragment, useState } from "react";
import UserApi from "@/app/api/UserApi";
import { signIn, signOut, useSession } from 'next-auth/react'
import { GithubIcon, GoogleIcon, TwitterIcon } from "@/icons/icon";

function SocialButton() {
    const { data: session } = useSession();
    const [login, setLogin] = useState(false)
    // useEffect(() => {
    if (session && session.user) {
        //       localStorage.setItem('user', session.user.name)
        localStorage.setItem('film_avatar', session.user.image)
        localStorage.setItem('film_id', session.user.id)
        localStorage.setItem('film_name', session.user.name)
        UserApi.AuthProvider(session.user.id, session.user.name, session.user.email, session.user.image).then(res => {
            if (res.status === 200) {
                localStorage.setItem('filmInfo', JSON.stringify(res.data))
                console.log(res.data)
                let roles = res.data.roles
                for (let index = 0; index < roles.length; index++) {
                    if (roles[index].role.name == 'ROLE_ADMIN') {
                        window.location.href = '/admin'
                        break
                    }
                }
                window.location.href = '/page/account/info'
            }

        })
    }
    return (
        <div className="flex-col space-y-2 justify-center">
            <div onClick={() => signIn('google')} className="flex items-center justify-center space-x-3 text-gray-300 w-full ring-gray-500 hover:ring-orange-400 ring-2 rounded-lg py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                <GoogleIcon /><div> Đăng nhập với Google</div>
            </div>
            <div onClick={() => signIn('github')} className="flex items-center justify-center space-x-3 text-gray-300 w-full ring-gray-500 hover:ring-orange-400 ring-2 rounded-lg py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                <GithubIcon /><div> Đăng nhập với Github</div>
            </div>
        </div>
    );
}

export default SocialButton;