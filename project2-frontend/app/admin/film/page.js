'use client'
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    User,
    Pagination,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import { MotionDiv } from "@/app/component/OtherComponent/MotionDiv";
import AddFilm from "./AddFilm";
import AdminApi from "@/app/api/AdminApi";
import AddFilmByApi from "./AddFilmByApi";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const statusColorMap = {
    active: "success",
    paused: "danger",
    end: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "watch", "status", "actions"];
function Page() {
    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [listRemove, setListRemove] = useState([]);
    // const [users, setUsers] = useState(user);
    const [showAddFilm, setShowAddFilm] = useState(false);
    const [showAddFilmByApi, setShowAddFilmByApi] = useState(false);
    // const [users, setUsers] = useState([]);

    const { data: users = [], isLoading, isError } = useQuery(
        'films',
        async () => {
            toast.loading('Đang tải danh sách phim');
            try {
                const res = await AdminApi.GetALlFilm();
                return res.data;
            } catch (err) {
                console.log(err);
            } finally {
                toast.dismiss();
            }
        },
        {
            cacheTime: 60000,
            refetchOnWindowFocus: false,
            staleTime: 100000,
        }
    );
    const setUsers = (data) => {
        console.log(data);
    }
    // useEffect(() => {
    //     // toast.loading('Đang tải danh sách phim');
    //     // const res = AdminApi.GetALlFilm().then((res) => {
    //     //     setUsers(res.data);
    //     // }).catch((err) => {
    //     //     console.log(err);
    //     // }).finally(() => {
    //     //     toast.dismiss();
    //     // });
    // }, [users]);
    const [sortDescriptor, setSortDescriptor] = useState({
        column: "id",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const [isShowEpisodes, setIsShowEpisodes] = useState(false);
    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users || []].filter((user) => !listRemove.includes(user.id));

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }

        return filteredUsers;
    }, [users, filterValue, statusFilter, listRemove]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);
    const [currentFilm, setCurrenFilm] = useState(null);
    const [listEpisodes, setListEpisodes] = useState([]);
    useEffect(() => {
        if (currentFilm == null) {
            return;
        }
        toast.loading('Đang tải danh sách tập phim');
        AdminApi.GetEpisodesByFilmId(currentFilm).then((res) => {
            console.log(res.data);
            setListEpisodes(res.data);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            toast.dismiss();
        });
    }
        , [currentFilm]);
    useEffect(() => {
        console.log(listEpisodes);
    }
        , [listEpisodes]);
    const renderCell = useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.avatar, size: "lg" }}
                        description={user.type}
                        name={cellValue}
                    >
                    </User>
                );
            case "watch":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue?.toLocaleString()}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue == 'active' ? 'Đang ra' : cellValue == 'paused' ? 'Tạm dừng' : 'Kết thúc'}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem onClick={() => { setListEpisodes([]); setCurrenFilm(user.id); setIsShowEpisodes(true); }}>Chi tiết</DropdownItem>
                                <DropdownItem>Chỉnh sửa</DropdownItem>
                                <DropdownItem onClick={() => handleDelete(user)}>Xóa</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const handleDelete = (userToDelete) => {

        setListRemove(prevListRemove => {
            const updatedListRemove = [...prevListRemove, userToDelete.id];
            console.log(updatedListRemove);
            return updatedListRemove;
        });
    };
    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="block md:flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%] md:pb-0 pb-4"
                        placeholder="Tìm theo tên..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Trạng thái
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Cột
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button color="primary" endContent={<PlusIcon />} onClick={() => { setShowAddFilm(true) }}>
                            Thêm phim
                        </Button>
                    </div>
                </div>
                <div className="w-full float-right"><Button onClick={() => { setShowAddFilmByApi(true) }} className="float-right text-white" color="warning" endContent={<PlusIcon />}>Thêm bằng API</Button></div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Tổng {users?.length || 0} phim</span>
                    <label className="flex items-center text-default-400 text-small">
                        Số hàng mỗi trang:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="6">6</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        users?.length || 0,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "Đã chọn tất cả"
                        : `${selectedKeys.size} / ${filteredItems.length} đã chọn`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Trước
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Sau
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);
    const changVipStatus = (id) => {
        AdminApi.ChangeEpisodeStatus(id).then((res) => {
            console.log(res.data);
            setListEpisodes(prevListEpisodes => {
                const updatedListEpisodes = prevListEpisodes.map((episode) => {
                    if (episode.id === id) {
                        episode.vipRequire = res.data.vipRequire;
                    }
                    return episode;
                });
                return updatedListEpisodes;
            });
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="p-3 pt-8 md:p-9 text-white">
            <div onClick={() => { setShowAddFilm(false) }} className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[30] w-full h-full max-w-[100%]" style={{ backgroundColor: '#4343439e', display: `${showAddFilm ? '' : 'none'}` }}>
                <AddFilm />
            </div>
            <div onClick={() => { setShowAddFilmByApi(false) }} className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[30] w-full h-full max-w-[100%]" style={{ backgroundColor: '#4343439e', display: `${showAddFilmByApi ? '' : 'none'}` }}>
                <AddFilmByApi listFilms={users} setListFilms={setUsers}></AddFilmByApi>
            </div>
            <div onClick={() => { setIsShowEpisodes(false) }} className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-[30] w-full h-full max-w-[100%]" style={{ backgroundColor: '#4343439e', display: `${isShowEpisodes ? '' : 'none'}` }}>
                <div onClick={(e) => e.stopPropagation()} className="w-[700px] max-w-[90%] h-[90%] z-40 bg-slate-900 rounded-lg overflow-y-auton p-2 overflow-auto">
                    <h1 className="text-xl text-white">Danh sách tập phim</h1>
                    <div className="flex justify-between items-center">
                        <Button color="success" onClick={() => { setIsShowEpisodes(false) }}>Thêm tập</Button>
                        <Button color="warning" onClick={() => { setIsShowEpisodes(false) }}>Tự động cập nhật</Button>
                    </div>
                    {
                        listEpisodes.map((episode) => {
                            return (
                                <div key={episode.id} className="flex justify-between items-center p-2 border-b border-slate-800">
                                    <div className="w-full">
                                        <p className="text-white">{episode.serial}</p>
                                        <p className="text-default-400">{episode.url}</p>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button variant="shadow" onClick={() => { changVipStatus(episode.id) }}>{episode.vipRequire ? 'Vip' : 'Thường'}</Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
            <MotionDiv
                initial={{ y: 15, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                <Table
                    aria-label="Example table with custom cells, pagination and sorting"
                    isHeaderSticky
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[682px]",
                    }}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align={column.uid === "actions" ? "center" : "start"}
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"No users found"} items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </MotionDiv>
        </div>
    );
}

export default Page;