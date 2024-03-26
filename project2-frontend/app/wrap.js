'use client'
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Header from "./component/header";

function Wrap({ children }) {
    const [admin, setAdmin] = useState(false)
    useEffect(() => {
        setAdmin(window.location.pathname.includes("admin"))
    }
        , [])

    return (
        <Fragment>
            {admin ? <Fragment>{children}</Fragment> : <Fragment>
                <Header />
                {children}
            </Fragment>}
        </Fragment>
    );
}

export default Wrap;