import {SeriesDto} from "@/domain/post/repositories";
import {makeAutoObservable} from "mobx";

export class SeriesListStore {

    seriesList: SeriesDto []
    page: number
    perPage: number
    isEnd: Boolean

    constructor(seriesList: SeriesDto []) {
        this.seriesList = seriesList
        this.page = 1
        this.perPage = 10
        this.isEnd = false

        makeAutoObservable(this)
    }

    async nextSeries() {

    }


}