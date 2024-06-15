'use client'
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Header from "./component/header";
import { QueryClient, QueryClientProvider } from "react-query";
import { SocketProvider } from "./admin/notifi/NotificationContext";
const queryClient = new QueryClient();

function Wrap({ children }) {
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        setAdmin(window.location.pathname.includes("admin"))
    }
        , [])

    return (
        <QueryClientProvider client={queryClient}>
            <SocketProvider>
                <Fragment>
                    {admin ? <Fragment>{children}</Fragment> : <Fragment>
                        <Header />
                        {children}
                    </Fragment>}
                </Fragment>
            </SocketProvider>
        </QueryClientProvider>
    );
}

export default Wrap;