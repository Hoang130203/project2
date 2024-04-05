'use client'
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import NavBottom from "@/app/page/detail/NavBottom";
import { Button, Checkbox, CheckboxGroup, Input, Radio, RadioGroup, Select, SelectItem, Textarea } from "@nextui-org/react";
import * as XLSX from 'xlsx';
import { Fragment, useEffect, useState } from "react";

function AddFilm() {
    const [selected, setSelected] = useState([]);
    const [selected2, setSelected2] = useState()
    const [selected3, setSelected3] = useState('movie')

    const [bg, setBg] = useState('https://images3.alphacoders.com/132/1328396.png')
    const [img, setImg] = useState('https://cdn.oneesports.vn/cdn-data/sites/4/2023/10/Anime-Naruto-avt.jpg')
    const [characterList, setCharacterList] = useState([{ name: "", image: "", role: "" }]);
    const [data, setData] = useState([]);
    const [nameMovie, setNameMovie] = useState('')
    const [imageMovie, setImageMovie] = useState('')
    const [dataEpisode, setDataEpisode] = useState([])
    const [listEpisode, setListEpisode] = useState([{ serial: 1, description: '', image: '' }])
    const handleChangeMovieImg = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setImageMovie(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const handleFileCharChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            setData(XLSX.utils.sheet_to_json(ws, { header: 1 }))

        }

        reader.readAsBinaryString(file);
    };
    const handleFileEpisodeChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            setDataEpisode(XLSX.utils.sheet_to_json(ws, { header: 1 }))

        }

        reader.readAsBinaryString(file);
    };
    useEffect(() => {
        var chars = []
        for (let i = 1; i < data.length; i++) {
            let role_ = data[i][2] == 'main' ? 'main' : 'supporting'
            let question = { name: data[i][0], image: data[i][1], role: role_ }
            chars.push(question)
        }
        setCharacterList(chars)
    }, [data])
    useEffect(() => {
        var episodes = []
        for (let i = 1; i < dataEpisode.length; i++) {
            let question = { serial: dataEpisode[i][0], description: dataEpisode[i][1], image: dataEpisode[i][2] }
            episodes.push(question)
        }
        setListEpisode(episodes)
    }, [dataEpisode])

    const types = [
        { type: 'ACTION', name: 'Hành động' },
        { type: 'ADVENTURE', name: 'Phiêu lưu' },
        { type: 'COMEDY', name: 'Hài hước' },
        { type: 'DRAMA', name: 'Lãng mạn' },
        { type: 'FANTASY', name: 'Viễn tưởng' },
        { type: 'HORROR', name: 'Kinh dị' },
        { type: 'ROMATIC', name: 'Tình cảm' },
        { type: 'COSTUME', name: 'Cổ trang' },
        { type: 'ANIME', name: 'Anime' },
        { type: 'WAR', name: 'Chiến tranh' }
    ]
    const countries = [
        { type: 'JP', name: 'Nhật Bản' },
        { type: 'KR', name: 'Hàn Quốc' },
        { type: 'US', name: 'Mỹ' },
        { type: 'CN', name: 'Trung Quốc' },
        { type: 'VN', name: 'Việt Nam' },
        { type: 'TH', name: 'Thái Lan' },
    ]

    const handleChangBG = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setBg(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const handleChangIMG = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            setImg(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const roles = [
        { value: 'main', label: 'Nhân vật chính' },
        { value: 'supporting', label: 'Nhân vật phụ' },
        // Thêm các vai trò khác tại đây nếu cần
    ];

    const handleCharacterChange = (value, property, index) => {
        const updatedList = [...characterList];
        updatedList[index][property] = value;
        setCharacterList(updatedList);
    };
    const handleCharacterChangeRole = (value, index) => {
        if (value && typeof value === 'object' && (value.anchorKey || value.currentKey)) {
            const roleValue = value.anchorKey || value.currentKey;
            const updatedList = [...characterList];
            updatedList[index]['role'] = roleValue;
            setCharacterList(updatedList);
        } else {
            // If the value is not coming from the selection change event,
            // it means it's the selectedKeys, so we directly use it
            const roleValue = value;
            const updatedList = [...characterList];
            updatedList[index]['role'] = roleValue;
            setCharacterList(updatedList);
        }
    };
    const handleCharacterChangeImg = (value, index) => {
        const updatedList = [...characterList];
        const file = value.target.files[0]
        const reader = new FileReader()
        reader.onload = () => {
            var img_ = reader.result
            updatedList[index]['image'] = img_;
            setCharacterList(updatedList);
        }
        reader.readAsDataURL(file)

    };

    const handleAddCharacter = () => {
        setCharacterList([...characterList, { name: "", image: "", role: "" }]);
    };


    const handleRemoveCharacter = (index) => {
        if (index === characterList.length - 1) {
            // Xóa dòng cuối cùng 'use client'
            setCharacterList(characterList.slice(0, -1));
        } else {
            const updatedList = [...characterList];
            updatedList.splice(index, 1);
            setCharacterList(updatedList);
        }
    };
    return (
        <div onClick={(e) => e.stopPropagation()} className="w-[700px] max-w-[90%] h-[90%] z-40 bg-slate-900 rounded-lg overflow-y-auto">
            <div className="h-[450px] md:h-[350px] relative text-white">
                <label htmlFor="fileInput" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer">
                    <div className="w-full " style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center center', backgroundSize: 'cover', height: '100%' }}>
                    </div>
                    <input type="file" id="fileInput" className="hidden" onChange={handleChangBG}></input>
                    <div className="video"></div>
                </label>
                <div className="absolute bottom-[-35%] flex flex-col sm:flex-row sm:left-[4%] z-10 gap-4 sm:gap-6 items-center w-full sm:w-[90%]">
                    <div className="sm:w-[180px] sm:h-[260px] w-[165px] h-[240px] rounded-md" style={{ backgroundImage: `url(${img})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                        <label htmlFor="fileInput2" className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer">
                            <input type="file" id="fileInput2" className="hidden" onChange={handleChangIMG}></input>
                        </label>
                    </div>
                    <div className="max-w-[90%] flex flex-col justify-center no_select text-center sm:text-start ">
                        <MotionDiv
                            initial={{ y: 15, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col gap-3">
                                <Input variant="bordered" label="Tên" size="lg" className="text-green-400" style={{ fontSize: '20px', paddingTop: '10px' }} />
                                <Input variant="bordered" label="Tác giả/ Studio" type="text" size="lg" className="text-green-400" style={{ fontSize: '20px', paddingTop: '10px' }} />
                                <div className="flex items-center justify-center sm:justify-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-yellow-400 ml-1 hover:scale-110 cursor-pointer transition-transform">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                    </svg>
                                    x.x | &nbsp;<span className="text-white"><Input variant="bordered" label="trạng thái" type="text" className="text-green-400" /></span>
                                </div>
                            </div>
                        </MotionDiv>

                    </div>
                </div>
            </div>
            <div className="min-h-[300px] pb-3 mt-40 md:px-16 px-5">
                <MotionDiv
                    initial={{ y: 15, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-3 gap-3 text-[15px]">
                        <div>Thể loại</div>
                        <div className="col-span-2 ">
                            <CheckboxGroup
                                color="primary"
                                orientation="horizontal"
                                value={selected}
                                onValueChange={setSelected}
                            >
                                {types.map((type, index) => (
                                    <Checkbox key={index} value={type.type} className="mr-2">{type.name}</Checkbox>
                                ))}
                            </CheckboxGroup>
                        </div>
                        <div>Quốc gia</div>
                        <div className="col-span-2">
                            <RadioGroup
                                color="primary"
                                orientation="horizontal"
                                value={selected2}
                                onValueChange={setSelected2}
                            >
                                {countries.map((country, index) => (
                                    <Radio key={index} value={country.type} className="mr-2">
                                        {country.name}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>Năm</div>
                        <Input variant="bordered" className="col-span-2 w-24"></Input>
                        <div>Tuổi yêu cầu</div>
                        <div className="col-span-2"><Input variant="bordered" className="col-span-2 w-24"></Input>
                        </div>
                        <div>Lượt xem</div>
                        <div className="col-span-2">x.xxx.xxx.xxx</div>
                    </div>
                </MotionDiv>
            </div>
            <div className="pb-3  md:px-16 px-5">
                <div className="py-2">Tóm tắt phim</div>
                <Textarea
                    placeholder="Nhập tóm tắt phim.."
                    className="max-w-full"
                    minRows={5}
                    variant="bordered"
                />
                <div className="py-2">
                    Danh sách nhân vật
                    <div className="text-slate-400">Nhập file excel chứa nhân vật</div>
                    <input type="file" accept=".xlsx" onChange={handleFileCharChange}></input>
                </div>
                {characterList.map((character, index) => (
                    <div key={index} className="grid grid-cols-6 items-center gap-4 py-1">
                        {/* Tên */}
                        <Input
                            variant="bordered"
                            placeholder="Nhập tên nhân vật"
                            value={character.name}
                            onChange={(e) => handleCharacterChange(e.target.value, "name", index)}
                            className=" col-span-2"
                        />
                        {/* Vai trò */}
                        <Select
                            variant="bordered"
                            selectedKeys={[character.role.length > 0 ? character.role : 'supporting']}
                            onSelectionChange={(value) => handleCharacterChangeRole(value, index)}
                            className="col-span-2 "
                        >
                            {roles.map((roleOption, index) => (
                                <SelectItem key={roleOption.value} value={roleOption.value}>{roleOption.label}</SelectItem>
                            ))}
                        </Select>
                        {/* Ảnh */}
                        <div className="relative  h-[120px] rounded-md ">
                            <label htmlFor={`fileInput_${index}`} className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer">
                                <div
                                    className="w-full h-full rounded-md"
                                    style={{ backgroundImage: `url(${character.image || img})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}
                                ></div>
                                <input
                                    type="file"
                                    id={`fileInput_${index}`}
                                    className="hidden"
                                    onChange={(e) => handleCharacterChangeImg(e, index)}
                                />
                            </label>
                        </div>

                        {/* Nút xóa */}
                        <button className="text-red-400 flex justify-center items-center hover:scale-105 duration-300 transition-transform" onClick={() => handleRemoveCharacter(index)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                            Xóa</button>
                    </div>
                ))}
                <button className="text-blue-400 flex justify-center items-center hover:scale-105 duration-300 transition-transform" onClick={handleAddCharacter}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Thêm nhân vật
                </button>
                <div className="pt-7">
                    Chọn loại phim
                    <RadioGroup
                        color="primary"
                        orientation="horizontal"
                        value={selected3}
                        onValueChange={setSelected3}
                    >
                        <Radio value={'movie'} className="mr-2">
                            {'Phim lẻ'}
                        </Radio>
                        <Radio value={'series'} className="mr-2">
                            {'Phim bộ'}
                        </Radio>
                    </RadioGroup>
                </div>
                <div className="py-2">
                    {selected3 == 'series' ? <Fragment> Danh sách tập phim
                        <div className="text-slate-400">Nhập file excel chứa các tập phim</div>
                        <input type="file" accept=".xlsx" onChange={handleFileEpisodeChange}></input>
                        {listEpisode.map((episode, index) => (

                            <div key={index} className="grid grid-cols-6 items-center gap-4 py-1">
                                <Input className="col-span-1" disabled value={`Tập ${episode?.serial}`}></Input>
                                <Textarea className="col-span-3" disabled value={` ${episode?.description}`}></Textarea>
                                <div className="col-span-2 h-full rounded-md" disabled value={` ${episode?.time}`} style={{ backgroundImage: `url(${episode.image || img})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}></div>
                            </div>
                        )
                        )
                        }
                    </Fragment>

                        :
                        <div className="flex flex-col gap-4">
                            <Input
                                variant="bordered"
                                placeholder="Nhập tên tập phim"
                                value={nameMovie}
                                onChange={(e) => setNameMovie(e.target.value)}
                            />
                            <div >Ảnh tập phim</div>
                            <div className=" w-full relative  h-[200px] rounded-md ">
                                <label htmlFor='imgMovie' className=" cursor-pointer">
                                    <div
                                        className="w-full h-30 rounded-md absolute top-0 left-0 right-0 bottom-0 "
                                        style={{ backgroundImage: `url(${imageMovie || img})`, backgroundPosition: 'center center', backgroundSize: 'cover' }}
                                    ></div>
                                    <input
                                        type="file"
                                        id='imgMovie'
                                        className="hidden"
                                        onChange={(e) => handleChangeMovieImg(e)}
                                    />
                                </label>
                            </div>
                        </div>
                    }

                </div>
            </div>
            <div className="flex justify-center py-2">
                <Button className=" text-white text-xl" color="primary">Thêm phim</Button>
            </div>
        </div>
    );
}

export default AddFilm;