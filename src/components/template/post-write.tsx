"use client"


import MenuObserver from "@/components/observing/menu";

import {useEffect} from "react";
import {useUserStore} from "@/domain/user/hooks";
import PostWriterObserver from "@/components/observing/post/writer";
import {usePostWriteStore} from "@/domain/post/hooks";
import NoAuthorized from "@/components/base/no-authorized";
import LoadingBox from "@/components/base/loading-box";
import useMyTimer from "@/infra/hooks/useMyTimer";

export type Props = {}

export default function PostWriteTemplate(props: Props) {
    const {userStore} = useUserStore()
    const {postWriteStore} = usePostWriteStore()
    const {isEndTimer} = useMyTimer({second: 2})

    return (
        <>
            <MenuObserver userStore={userStore}/>
            <div className={"flex pt-8 pl-36 pr-36"}>
                <LoadingBox isLoaded={isEndTimer && userStore.isInit} minHeight={"90rem"}>
                    <NoAuthorized isAuthorized={userStore.isLogin}>
                        <PostWriterObserver postStore={postWriteStore}/>
                    </NoAuthorized>
                </LoadingBox>
            </div>
        </>
    )
}