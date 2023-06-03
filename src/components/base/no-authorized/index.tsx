import React from "react";


export type Props = {
    isAuthorized: boolean
    children: React.ReactNode
}


function NoAuthorizedBox() {

    return (
        <div>no authorized...</div>
    )
}


export default function NoAuthorized(props: Props) {
    return props.isAuthorized ? <>{props.children}</> : <NoAuthorizedBox/>
}