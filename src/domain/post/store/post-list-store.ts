import {makeAutoObservable, runInAction} from "mobx";
import postRepository, {PostDto, TagStatisticsDto} from "@/domain/post/repositories";
import {ViewItem} from "@/infra/generic-type";


export type PostListStoreInitContext = {
    posts: PostDto[],
    tagStatisticsList: TagStatisticsDto[],
    page: number,
    perPage: number,
    forceClientLoad: boolean
}

export class PostListStore {
    constructor(public posts: PostDto[] = [],
                public page: number = 1,
                public perPage: number = 10,
                public loadEnd: boolean = false,
                public isInit: boolean = false,
                public tagStatisticsList: TagStatisticsDto[] = [],
                public selectedTag: string[] = []
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
            perPage: this.perPage
        })

        runInAction(() => {
            this.page += 1
            this.posts = [...this.posts, ...list.posts]
            if (list.posts.length < this.perPage) this.loadEnd = true
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
        // 새롭게 로딩 해줘야한다..
    }

    static makeImgSrc(model: PostDto): string {
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