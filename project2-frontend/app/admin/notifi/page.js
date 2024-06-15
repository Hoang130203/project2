'use client'
import { useContext } from "react";
import { SocketContext } from "./NotificationContext";

function Notification() {

    const { notifications, setNotifications } = useContext(SocketContext);
    return (
        <div className="">
            <h1 className="text-cyan-300 ">Thông báo nhận được</h1>
            {
                notifications.map((noti, index) => (
                    <div key={index}>
                        <p>{index + 1} &nbsp;  {noti.content}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Notification;