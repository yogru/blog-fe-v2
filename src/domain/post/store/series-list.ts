import {makeAutoObservable} from "mobx";
import SeriesModel from "@/domain/post/model/series-model";

export class SeriesListStore {

    seriesList: SeriesModel []
    page: number
    perPage: number
    isEnd: Boolean

    constructor(seriesList: SeriesModel []) {
        this.seriesList = seriesList
        this.page = 1
        this.perPage = 10
        this.isEnd = false
        makeAutoObservable(this)
    }

    async nextSeries() {

    }


}