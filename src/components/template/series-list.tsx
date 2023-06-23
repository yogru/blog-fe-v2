"use client"


import MenuObserver from "@/components/observing/menu";
import {useLoginStore} from "@/domain/user/hook/hooks";
import SeriesListObserver from "@/components/observing/series/series-list";
import {InitContext, useSeriesListStore} from "@/domain/post/hook/useSeriesListStore"
import Footer from "../observing/footer";

export type Props = {
    seriesListInitContext: InitContext
}


export default function SeriesListTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    const {seriesListStore} = useSeriesListStore(props.seriesListInitContext)
    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"flex mt-12 text-5xl justify-center"}>
                시리즈 목록
            </div>

            <div className={"min-h-screen"}>
                <SeriesListObserver seriesListStore={seriesListStore}/>
            </div>

            <div>
                <Footer isEnd={seriesListStore.isEnd}/>
            </div>
        </>
    )
}