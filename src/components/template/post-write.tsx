"use client"


import MenuObserver from "@/components/observing/menu";
import {useLoginStore} from "@/domain/user/hook/hooks";
import PostWriterObserver from "@/components/observing/post/writer";
import NoAuthorized from "@/components/base/no-authorized";
import LoadingBox from "@/components/base/loading-box";
import useMyTimer from "@/infra/hooks/useMyTimer";
import {usePostWriteStore} from "@/domain/post/hook/usePostWriteStore";

export default function PostWriteTemplate() {
    const {loginStore} = useLoginStore()
    const {postWriteStore} = usePostWriteStore()
    const {isEndTimer} = useMyTimer({second: 2})

    return (
        <>
            <MenuObserver loginStore={loginStore}/>
            <div className={"flex pt-8 pl-36 pr-36"}>
                <LoadingBox isLoaded={isEndTimer && loginStore.isInit} minHeight={"90rem"}>
                    <NoAuthorized isAuthorized={loginStore.isLogin}>
                        <PostWriterObserver postStore={postWriteStore}/>
                    </NoAuthorized>
                </LoadingBox>
            </div>
        </>
    )
}