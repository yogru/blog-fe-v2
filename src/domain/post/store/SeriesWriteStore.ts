import {makeAutoObservable} from "mobx";
import {Result, ViewItem} from "@/infra/generic-type";
import seriesRepository from "@/domain/post/repository/SeriesRepository";
import userRepository from "@/domain/user/repositories";
import {CustomError} from "@/infra/errors";

export class SeriesWriteStore {

    constructor(
        public id: string | null = null,
        public title: string = '',
        public body: string = '',
        public postViewItems: ViewItem[] = []
    ) {
        makeAutoObservable(this)
    }


    onSelectPostViewItem(viewItem: ViewItem) {
        const ret = this.postViewItems.find(v => v.id == viewItem.id)
        if (ret) return
        this.postViewItems = [...this.postViewItems, viewItem]
    }

    onChangeTitle(title: string) {
        this.title = title
    }

    onReorderPostViewItem(sourceIdx: number, destinationIdx: number) {
        function reorder(list: any [],
                         startIndex: number,
                         endIndex: number): any [] {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        }

        this.postViewItems = reorder(this.postViewItems, sourceIdx, destinationIdx)

        console.log(this.postViewItems.map(p => p.viewValue))
    }

    onDeletePostViewItem(viewItem: ViewItem) {
        this.postViewItems = this.postViewItems.filter(v => v.id != viewItem.id)
    }


    private async createSeries() {
        if (this.title.length < 2) return
        if (this.postViewItems.length < 1) return
        const accessKey = userRepository.getAccessKey()
        try {
            await seriesRepository.createSeries({
                title: this.title,
                postIdList: this.postViewItems.map(v => v.id),
                body: this.body
            }, accessKey)
        } catch (e) {
            return CustomError.catchAndReturnFail(e)
        }
    }

    async submit() {
        !this.id && await this.createSeries()
    }

}