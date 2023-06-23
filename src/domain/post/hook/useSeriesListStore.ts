import SeriesModel from "@/domain/post/model/SeriesModel";
import {SeriesListStore} from "@/domain/post/store/SeriesListStore";
import {useEffect} from "react";
import useMyScroll from "@/infra/hooks/useMyScroll";

export type InitContext = {
    seriesList: SeriesModel[]
    page: number
    perPage: number
}

export const seriesListStore = new SeriesListStore()

export function useSeriesListStore(initCtx: InitContext) {
    const {isReached} = useMyScroll()

    useEffect(() => {
        seriesListStore.hydration(initCtx.seriesList, initCtx.page, initCtx.perPage)
    }, [initCtx])

    useEffect(() => {
        seriesListStore.nextSeries().then()
    }, [isReached, seriesListStore])

    return {
        seriesListStore
    }
}