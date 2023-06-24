import {makeAutoObservable, runInAction} from "mobx";

import {ViewItem} from "@/infra/generic-type";
import PostModel from "@/domain/post/model/PostModel";
import TagStatisticsModel from "@/domain/post/model/TagStatisticsModel";
import postRepository from "@/domain/post/repository/PostRepository";


export type PostListStoreInitContext = {
    posts: PostModel[],
    tagStatisticsList: TagStatisticsModel[],
    page: number,
    perPage: number,
    forceClientLoad: boolean
}

export class PostListStore {
    constructor(public posts: PostModel[] = [],
                public page: number = 1,
                public perPage: number = 10,
                public loadEnd: boolean = false,
                public isInit: boolean = false,
                public tagStatisticsList: TagStatisticsModel[] = [], // 이거 독립 시켜야할 듯.
                public selectedTag: string[] = [],
                public searchTitle: string | null = null
    ) {
        makeAutoObservable(this)
    }

    async initialize(ctx: PostListStoreInitContext) {
        if (this.isInit) return
        const {posts, page, perPage, tagStatisticsList} = ctx

        runInAction(() => {
            this.posts = posts
            this.perPage = 10
            this.page = 1
            this.tagStatisticsList = tagStatisticsList
        })

        if (!ctx.forceClientLoad) return

        const list = await postRepository.searchPostList({
            curPage: page,
            perPage: perPage
        })
        runInAction(() => {
            this.posts = [...list.posts]
        })
    }

    public async nextLoad() {
        if (this.loadEnd) return
        const list = await postRepository.searchPostList({
            curPage: this.page + 1,
            perPage: this.perPage,
            tags: this.selectedTag
        })

        runInAction(() => {
            this.page += 1
            this.posts = [...this.posts, ...list.posts]
            if (list.posts.length < this.perPage) this.loadEnd = true
        })
    }

    public async searchTitleList(title: string) {
        if (title == this.searchTitle) return

        this.page = 1
        this.perPage = 10
        this.searchTitle = title

        const list = await postRepository.searchPostList({
            curPage: this.page,
            perPage: this.perPage,
            tags: this.selectedTag,
            title: this.searchTitle
        })
        runInAction(() => {
            this.posts = [...list.posts]
        })
    }


    public async onSelectTag(tag: string) {
        const found = this.selectedTag.find((t) => t === tag)
        runInAction(() => {
            if (found) {
                this.selectedTag = this.selectedTag.filter((t) => t !== tag)
                return
            }
            this.selectedTag = [...this.selectedTag, tag]
        })
        const list = await postRepository.searchPostList({
            curPage: 1,
            perPage: 10,
            tags: this.selectedTag
        })

        runInAction(() => {
            this.page = 1
            this.perPage = 10
            this.loadEnd = false
            this.posts = [...list.posts]
            if (list.posts.length < this.perPage) {
                this.loadEnd = true
            }
        })
    }

    static makeImgSrc(model: PostModel): string {
        const imageUrl = model.body.match(/!\[[^\]]*\]\((.*?)\)/)
        if (imageUrl === null) return "/images/login-bg.jpg"
        return imageUrl[1]
    }

    get statisticsTagChipList() {
        const selectedDict: any = this.selectedTag.reduce((acc, t) => {
            acc[t] = true
            return acc
        }, {} as any)

        return this.tagStatisticsList.map((t) => {
            const isSelected = selectedDict[t.tag]
            return new ViewItem(t.tag, `${t.tag} (${t.count})`, isSelected)
        })
    }
}

const postListStore = new PostListStore()


export default postListStore