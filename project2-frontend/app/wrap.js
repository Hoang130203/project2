'use client'
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Header from "./component/header";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function Wrap({ children }) {
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        setAdmin(window.location.pathname.includes("admin"))
    }
        , [])

    return (
        <QueryClientProvider client={queryClient}>
            <Fragment>
                {admin ? <Fragment>{children}</Fragment> : <Fragment>
                    <Header />
                    {children}
                </Fragment>}
            </Fragment>
        </QueryClientProvider>
    );
}

export default Wrap;