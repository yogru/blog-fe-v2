import {makeAutoObservable, runInAction} from "mobx";
import SeriesModel from "@/domain/post/model/SeriesModel";
import seriesRepository from "@/domain/post/repository/SeriesRepository";


export class SeriesListStore {

    seriesList: SeriesModel []
    page: number
    perPage: number
    isEnd: boolean

    constructor() {
        this.seriesList = []
        this.page = 1
        this.perPage = 10
        this.isEnd = false
        makeAutoObservable(this)
    }

    hydration(seriesList: SeriesModel[], page: number, perPage: number) {
        this.seriesList = seriesList
        this.perPage = perPage
        this.page = page
        if (this.perPage > this.seriesList.length) {
            this.isEnd = true
        }
    }

    async nextSeries() {
        if (this.isEnd) return

        const res = await seriesRepository.searchSeries(
            {page: this.page + 1, perPage: this.perPage}
        )
        runInAction(() => {
            this.page += 1
            if (res) {
                this.seriesList = [...this.seriesList, ...res.seriesList]
                if (this.perPage > res.seriesList.length) {
                    this.isEnd = true
                }
            }
        })
    }


}