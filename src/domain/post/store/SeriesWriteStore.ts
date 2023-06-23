import {makeAutoObservable} from "mobx";

export class SeriesWriteStore {

    constructor(
        public id: string | null = null,
        public title: string = '',
        public body: string = '',
        public postIds: string[] = []
    ) {
        makeAutoObservable(this)
    }



}