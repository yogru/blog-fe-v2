"use client"

import {useLoginStore} from "@/domain/user/hook/hooks";
import useMyTimer from "@/infra/hooks/useMyTimer";
import MenuObserver from "@/components/observing/menu";
import LoadingBox from "@/components/base/loading-box";
import NoAuthorized from "@/components/base/no-authorized";
import useSeriesWriteStore from "@/domain/post/hook/useSeriesWriteStore";
import SeriesWriterObserver from "@/components/observing/series/series-writer";
import {usePostListStore} from "@/domain/post/hook/usePostListStore";

export default function SeriesWriteTemplate() {
    const {loginStore} = useLoginStore()
    const {isEndTimer} = useMyTimer({second: 2})
    const {seriesWriteStore} = useSeriesWriteStore()
    const {postListStore} = usePostListStore()

    return (
        <>
            <MenuObserver loginStore={loginStore}/>
            <div className={"flex pt-8 pl-36 pr-36"}>
                <LoadingBox isLoaded={isEndTimer && loginStore.isInit} minHeight={"90rem"}>
                    <NoAuthorized isAuthorized={loginStore.isLogin}>
                        <SeriesWriterObserver postListStore={postListStore} seriesWriteStore={seriesWriteStore}/>
                    </NoAuthorized>
                </LoadingBox>
            </div>
        </>
    )
}