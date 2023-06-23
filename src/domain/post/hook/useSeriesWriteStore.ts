import {SeriesWriteStore} from "@/domain/post/store/SeriesWriteStore";


const seriesWriteStore = new SeriesWriteStore()

export default function useSeriesWriteStore() {

    return {
        seriesWriteStore
    }
}