'use client'
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import { useEffect, useState } from "react";

function Favorite() {
    const [showPay, setShowPay] = useState(false)
    const getAvatarFromLocalStorage = () => {
        try {
            avatar2 = localStorage.getItem('film_avatar');
            return avatar2.length > 0 ? avatar2 : '';
        } catch (error) {
            console.error('Error retrieving avatar from localStorage:', error);
            return '';
        }
    };
    var avatar2 = ''
    try {
        var avatar2 = localStorage.getItem('film_avatar');
    } catch (error) {
        console.error('Error retrieving avatar from localStorage:', error);
    }
    const [avatar, setAvatar] = useState(() => {
        // Initialize the state
        try {
            const value = window.localStorage.getItem('film_avatar')
            // Check if the local storage already has any values,
            // otherwise initialize it with the passed initialValue
            return value ? value : ''
        } catch (error) {
            console.log(error)
            // return ''
        }
    })
    const [file, setFile] = useState()
    const handleFileChange = (event) => {
        // setIsposting(false)
        const selectedFile = event.target.files[0]
        setFile(event.target.files[0])
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result); // Lưu URL vào state để hiển thị ảnh
        };
        reader.readAsDataURL(selectedFile);
    }
    useEffect(() => {

    }, [file])
    return (
        <div className="px-4 md:px-10 py-20 min-h-[900px] md:pt-28">
            <div style={{ zIndex: 0, position: 'fixed', top: '0px', left: '0px', height: '100%', width: '100%', backgroundImage: `url('https://wallpapercave.com/wp/wp11337851.png')`, backgroundPosition: 'center', opacity: 0.2, backgroundRepeat: 'no-repeat' }}></div>
            <div className="flex sm:flex-row flex-col-reverse justify-start sm:justify- pb-12 mt-10 gap-y-2">
                <div className="sm:w-[60%] md:w-[70%] md:pr-3 no_select relative group">
                    <div className="p-3 min-h-64 bg-opacity-65 bg-slate-950 rounded-xl text-white gap-4">
                        <MotionDiv
                            initial={{ y: 10, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex-col flex  justify-center items-center">
                                <div className="flex md:flex-row flex-col gap-4 w-full justify-center">
                                    <div className="flex flex-col gap-2 md:w-[45%]">
                                        <p style={{ fontFamily: '-moz-initial' }}>Tài khoản</p>
                                        <input disabled value={"k58a01mmh"} type="text" placeholder="Tài khoản" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                                    </div>
                                    <div className="flex flex-col gap-2 md:w-[45%]">
                                        <p style={{ fontFamily: '-moz-initial' }}>Mật khẩu</p>
                                        <input type="password" placeholder="Mật khẩu" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col gap-4 w-full justify-center">
                                    <div className="flex flex-col gap-2 md:w-[45%]">
                                        <p style={{ fontFamily: '-moz-initial' }}>Email</p>
                                        <input type="Email" placeholder="Email" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                                    </div>
                                    <div className="flex flex-col gap-2 md:w-[45%]">
                                        <p style={{ fontFamily: '-moz-initial' }}>Họ tên</p>
                                        <input type="text" placeholder="Họ tên" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                                    </div>
                                </div>
                                <div className="flex md:flex-row flex-col gap-4 w-full justify-center">
                                    <div className="flex flex-col gap-2 md:w-[45%]">
                                        <p style={{ fontFamily: '-moz-initial' }}>Tuổi</p>
                                        <input type="text" placeholder="Tuổi" className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-800 focus:border-transparent"></input>
                                    </div>
                                    <div className="flex flex-col gap-2 md:w-[45%]">
                                        <p style={{ fontFamily: '-moz-initial' }}>&nbsp;</p>
                                        <div className="flex justify-center md:justify-normal">
                                            <button className="bg-orange-400 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-opacity-50 rounded-md px-4 py-2">Cập nhật</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
                <div className="sm:w-[40%] md:w-[30%] md:pl-1">
                    <div className="group bg-slate-950 bg-opacity-85 relative min-h-56 rounded-xl cursor-pointer">
                        <MotionDiv
                            initial={{ y: 10, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-400 to-white  blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                            <div className="absolute  transform -translate-y-1/2 left-1/2 -translate-x-1/2 ">
                                <label htmlFor="inputField" className="cursor-pointer">
                                    <img src={avatar.length > 0 ? avatar : 'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/08/hinh-nen-dien-thoai-anime-3.jpg'} className='cursor-pointer rounded-full w-36 h-36 md:w-40 md:h-40 hover:ring-2 hover:ring-blue-300 ring-1 ring-gray-300 object-cover hover:scale-105 transition-transform duration-500'></img>
                                </label>
                                <input onChange={handleFileChange} type="file" id="inputField" name="inputField" className="hidden"></input>
                            </div>
                            <div className="text-white no_select top-24 relative flex flex-col items-center justify-center" style={{ fontFamily: 'Instagram' }}>
                                <div className="text-xl md:text-3xl">Mai Minh Hoàng, 21</div>
                                <div>k58a01.mmh@gmail.com</div>
                                <div>
                                    <div className=" px-16 text-2xl my-3 text-yellow-200 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <span className="text-orange-400">Vip</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                    </div>

                                </div>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </div>
            <MotionDiv
                initial={{ y: 10, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <div className="antialiased font-sans font-normal no_select text-sm text-white leading-6 relative items-center w-full rounded-md whitespace-pre-wrap flex justify-between px-4 rounded border border-solid bg-gray-800 border-orange-400 box-border flex-col md:flex-row min-h-[40px] mb-6">
                    <div className="flex py-4 md:pr-10"><div className="flex items-center mr-4"><svg width="24" height="24" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.25107 3.34184C7.88662 3.79979 7.47772 4.50308 6.89105 5.51641L3.84439 10.7788C3.25563 11.7958 2.84775 12.5033 2.63131 13.0493C2.41671 13.5906 2.45384 13.8189 2.54002 13.9684C2.6262 14.1178 2.80514 14.2643 3.38114 14.3499C3.96212 14.4361 4.77877 14.4376 5.95387 14.4376H12.0472C13.2223 14.4376 14.0389 14.4361 14.6199 14.3499C15.1959 14.2643 15.3749 14.1178 15.461 13.9684C15.5472 13.8189 15.5844 13.5906 15.3698 13.0493C15.1533 12.5033 14.7454 11.7958 14.1567 10.7788L11.11 5.51642C10.5233 4.50308 10.1144 3.7998 9.74998 3.34184C9.38879 2.88798 9.17293 2.8064 9.00053 2.8064C8.82813 2.8064 8.61227 2.88798 8.25107 3.34184ZM7.37081 2.6413C7.80297 2.09826 8.3081 1.6814 9.00053 1.6814C9.69296 1.6814 10.1981 2.09826 10.6303 2.6413C11.053 3.17245 11.5028 3.94945 12.0591 4.91036L12.0836 4.95275L15.1303 10.2152L15.1548 10.2576L15.1548 10.2576L15.1548 10.2576C15.7132 11.2221 16.1647 12.0018 16.4156 12.6347C16.672 13.2816 16.7823 13.929 16.4357 14.5303C16.089 15.1316 15.4734 15.3605 14.7851 15.4627C14.1116 15.5626 13.2107 15.5626 12.0962 15.5626H12.0472H5.95387H5.90488C4.79039 15.5626 3.88944 15.5626 3.21594 15.4627C2.52763 15.3605 1.91209 15.1316 1.56541 14.5303C1.21872 13.929 1.32905 13.2816 1.58548 12.6347C1.8364 12.0018 2.28783 11.2221 2.84624 10.2576L2.87079 10.2152L5.91745 4.95275L5.94198 4.91037L5.94199 4.91035C6.49828 3.94945 6.94811 3.17245 7.37081 2.6413ZM9.00053 6.1876C9.31119 6.1876 9.56303 6.43944 9.56303 6.7501V9.7501C9.56303 10.0608 9.31119 10.3126 9.00053 10.3126C8.68987 10.3126 8.43803 10.0608 8.43803 9.7501V6.7501C8.43803 6.43944 8.68987 6.1876 9.00053 6.1876ZM9.00053 12.7501C9.41474 12.7501 9.75053 12.4143 9.75053 12.0001C9.75053 11.5859 9.41474 11.2501 9.00053 11.2501C8.58632 11.2501 8.25053 11.5859 8.25053 12.0001C8.25053 12.4143 8.58632 12.7501 9.00053 12.7501Z" className="fill-orange-400"></path></svg></div>
                        <div className="flex-col">
                            <div className="antialiased font-sans font-medium text-sm text-gray-400 leading-6">
                                Bạn đang dùng tài khoản miễn phí
                            </div>
                            <span className=''>Nâng cấp để xem nhiều phim hơn</span>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end space-x-4 w-full md:w-auto md:my-4 mr-0 mb-4 ml-auto">
                        <button onClick={() => setShowPay(!showPay)} className="text-gray-600   antialiased flex bg-orange-300 hover:bg-orange-500 font-sans font-medium text-sm  leading-6  py-1 px-4 border border-solid rounded whitespace-nowrap cursor-pointer border-orange-600 hover:bg-orange-25 justify-center min-w-[80px]" type="button">
                            <span className="antialiased font-sans font-medium text-sm  leading-6 ">
                                Nâng cấp
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                            </svg>


                        </button>
                    </div>

                </div>
            </MotionDiv>
            <div className={`mt-12  no_select  grid grid-cols-1 md:grid-cols-3 gap-3 ${showPay ? "" : "hidden "} transition-none ease-in-out delay-350 duration-300`}>
                <MotionDiv
                    initial={{ y: -10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div href="#" className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white  blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                        <div className="relative">
                            <div className="flex items-center">
                                <div className="border border-green-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-green-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.98em" height="1em" viewBox="0 0 256 263"><defs><linearGradient id="logosSupabaseIcon0" x1="20.862%" x2="63.426%" y1="20.687%" y2="44.071%"><stop offset="0%" stop-color="#249361"></stop><stop offset="100%" stop-color="#3ecf8e"></stop></linearGradient><linearGradient id="logosSupabaseIcon1" x1="1.991%" x2="21.403%" y1="-13.158%" y2="34.708%"><stop offset="0%"></stop><stop offset="100%" stop-opacity="0"></stop></linearGradient></defs><path fill="url(#logosSupabaseIcon0)" d="M149.602 258.579c-6.718 8.46-20.338 3.824-20.5-6.977l-2.367-157.984h106.229c19.24 0 29.971 22.223 18.007 37.292z"></path><path fill="url(#logosSupabaseIcon1)" fill-opacity="0.2" d="M149.602 258.579c-6.718 8.46-20.338 3.824-20.5-6.977l-2.367-157.984h106.229c19.24 0 29.971 22.223 18.007 37.292z"></path><path fill="#3ecf8e" d="M106.399 4.37c6.717-8.461 20.338-3.826 20.5 6.976l1.037 157.984H23.037c-19.241 0-29.973-22.223-18.008-37.292z"></path></svg>

                                </div>
                                <div className="text-white text-2xl pl-5 text-pink-100" style={{ fontFamily: 'flame' }}>Vip 1 tháng</div>
                            </div>
                            <div className="mt-6  rounded-b-[--card-border-radius] flex justify-between">
                                <div className="text-gray-700 dark:text-gray-300 text-xl" style={{ fontFamily: 'sans-serif' }}>
                                    <i> Giá:</i> <span className="text-2xl md:text-3xl text-red-300" style={{ fontFamily: 'flame' }}>&nbsp;100.000</span>
                                </div>
                                <div className="group rounded-xl   text-gray-950 bg-gray-100 hover:bg-gray-200/75   dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-9 px-6 justify-center py-3 cursor-pointer text-yellow-50 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <span className="text-xl">Mua</span>
                                </div>
                            </div>


                        </div>
                    </div>
                </MotionDiv>
                <MotionDiv
                    initial={{ y: -10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white  blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                        <div className="relative">
                            <div className="flex items-center">
                                <div className="border border-blue-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-blue-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                                    <svg className="text-[#000014] dark:text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 128 128">
                                        <defs>
                                            <linearGradient id="deviconAstro0" x1="882.997" x2="638.955" y1="27.113" y2="866.902" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stop-color="currentColor"></stop>
                                                <stop offset="1" stop-color="currentColor"></stop>
                                            </linearGradient>
                                            <linearGradient id="deviconAstro1" x1="1001.68" x2="790.326" y1="652.45" y2="1094.91" gradientTransform="scale(.1)" gradientUnits="userSpaceOnUse">
                                                <stop offset="0" stop-color="#ff1639"></stop>
                                                <stop offset="1" stop-color="#ff1639" stop-opacity="0"></stop>
                                            </linearGradient>
                                        </defs>
                                        <path fill="url(#deviconAstro0)" d="M81.504 9.465c.973 1.207 1.469 2.836 2.457 6.09l21.656 71.136a90.079 90.079 0 0 0-25.89-8.765L65.629 30.28a1.833 1.833 0 0 0-3.52.004L48.18 77.902a90.104 90.104 0 0 0-26.003 8.778l21.758-71.14c.996-3.25 1.492-4.876 2.464-6.083a8.023 8.023 0 0 1 3.243-2.398c1.433-.575 3.136-.575 6.535-.575H71.72c3.402 0 5.105 0 6.543.579a7.988 7.988 0 0 1 3.242 2.402Zm0 0"></path>
                                        <path fill="#ff5d01" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137c-10.07 0-18.515-3.137-20.754-7.356c-.8 2.418-.98 5.184-.98 6.954c0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938c2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 0 0 1.875-7.41a15.55 15.55 0 0 0-.734-4.735m0 0"></path>
                                        <path fill="url(#deviconAstro1)" d="M84.094 90.074c-3.57 3.055-10.696 5.137-18.903 5.137c-10.07 0-18.515-3.137-20.754-7.356c-.8 2.418-.98 5.184-.98 6.954c0 0-.527 8.675 5.508 14.71a5.671 5.671 0 0 1 5.672-5.671c5.37 0 5.367 4.683 5.363 8.488v.336c0 5.773 3.527 10.719 8.543 12.805a11.62 11.62 0 0 1-1.172-5.098c0-5.508 3.23-7.555 6.988-9.938c2.989-1.894 6.309-4 8.594-8.222a15.513 15.513 0 0 0 1.875-7.41a15.55 15.55 0 0 0-.734-4.735m0 0"></path>
                                    </svg>
                                </div>
                                <div className="text-white text-2xl md:text-3xl pl-5 text-pink-300" style={{ fontFamily: 'flame' }}>Vip 3 tháng </div>
                            </div>


                            <div className="mt-6 flex justify-between rounded-b-[--card-border-radius] ">
                                <div className="text-gray-700 dark:text-gray-300 text-xl" style={{ fontFamily: 'sans-serif' }}>
                                    <i> Giá: </i> <span className="text-2xl md:text-3xl text-red-300" style={{ fontFamily: 'flame' }}>&nbsp;250.000</span>
                                </div>
                                <div className="group rounded-xl   text-gray-950 bg-gray-100 hover:bg-gray-200/75   dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-9 px-6 justify-center py-3 cursor-pointer text-yellow-50 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <span className="text-xl">Mua</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
                <MotionDiv
                    initial={{ y: -10, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-gray-800 dark:bg-gray-900">
                        <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white  blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                        <div className="relative">
                            <div className="flex items-center">
                                <div className="border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg dark:bg-gray-900 dark:border-white/15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100 dark:before:border-white/20 before:bg-gradient-to-b dark:before:from-white/10 dark:before:to-transparent before:shadow dark:before:shadow-gray-950">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.73em" height="1em" viewBox="0 0 256 351"><defs><filter id="logosFirebase0" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="17.5"></feGaussianBlur><feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset><feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite><feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"></feColorMatrix></filter><filter id="logosFirebase1" width="200%" height="200%" x="-50%" y="-50%" filterUnits="objectBoundingBox"><feGaussianBlur in="SourceAlpha" result="shadowBlurInner1" stdDeviation="3.5"></feGaussianBlur><feOffset dx="1" dy="-9" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset><feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1" operator="arithmetic" result="shadowInnerInner1"></feComposite><feColorMatrix in="shadowInnerInner1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"></feColorMatrix></filter><path id="logosFirebase2" d="m1.253 280.732l1.605-3.131l99.353-188.518l-44.15-83.475C54.392-1.283 45.074.474 43.87 8.188z"></path><path id="logosFirebase3" d="m134.417 148.974l32.039-32.812l-32.039-61.007c-3.042-5.791-10.433-6.398-13.443-.59l-17.705 34.109l-.53 1.744z"></path></defs><path fill="#ffc24a" d="m0 282.998l2.123-2.972L102.527 89.512l.212-2.017L58.48 4.358C54.77-2.606 44.33-.845 43.114 6.951z"></path><use fill="#ffa712" fill-rule="evenodd" href="#logosFirebase2"></use><use filter="url(#logosFirebase0)" href="#logosFirebase2"></use><path fill="#f4bd62" d="m135.005 150.38l32.955-33.75l-32.965-62.93c-3.129-5.957-11.866-5.975-14.962 0L102.42 87.287v2.86z"></path><use fill="#ffa50e" fill-rule="evenodd" href="#logosFirebase3"></use><use filter="url(#logosFirebase1)" href="#logosFirebase3"></use><path fill="#f6820c" d="m0 282.998l.962-.968l3.496-1.42l128.477-128l1.628-4.431l-32.05-61.074z"></path><path fill="#fde068" d="m139.121 347.551l116.275-64.847l-33.204-204.495c-1.039-6.398-8.888-8.927-13.468-4.34L0 282.998l115.608 64.548a24.126 24.126 0 0 0 23.513.005"></path><path fill="#fcca3f" d="M254.354 282.16L221.402 79.218c-1.03-6.35-7.558-8.977-12.103-4.424L1.29 282.6l114.339 63.908a23.943 23.943 0 0 0 23.334.006z"></path><path fill="#eeab37" d="M139.12 345.64a24.126 24.126 0 0 1-23.512-.005L.931 282.015l-.93.983l115.607 64.548a24.126 24.126 0 0 0 23.513.005l116.275-64.847l-.285-1.752z"></path></svg>
                                </div>
                                <div className="text-white text-2xl pl-5 text-pink-600" style={{ fontFamily: 'flame' }}>Vip 6 tháng</div>
                            </div>
                            <div className="mt-6 flex justify-between rounded-b-[--card-border-radius] ">
                                <div className="text-gray-700 dark:text-gray-300 text-xl" style={{ fontFamily: 'sans-serif' }}>
                                    <i> Giá:</i> <span className="text-2xl md:text-3xl text-red-300" style={{ fontFamily: 'flame' }}>&nbsp;400.000</span>
                                </div>
                                <div className="group rounded-xl   text-gray-950 bg-gray-100 hover:bg-gray-200/75   dark:bg-gray-500/10 dark:hover:bg-gray-500/15 dark:active:bg-gray-500/10 flex gap-1.5 items-center text-sm h-9 px-6 justify-center py-3 cursor-pointer text-yellow-50 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    <span className="text-xl">Mua</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </MotionDiv>
            </div>
        </div>
    );
}

export default Favorite;