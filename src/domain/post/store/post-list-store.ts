import {makeAutoObservable, runInAction} from "mobx";
import postRepository, {PostDto} from "@/domain/post/repositories";


export class PostListStore {
    constructor(public posts: PostDto[] = [],
                public page: number = 1,
                public perPage: number = 10,
                public loadEnd: boolean = false,
                public isInit: boolean = false
    ) {
        makeAutoObservable(this)
    }

    async initialize(posts: PostDto[], page: number = 1, perPage: number = 10) {
        if (this.isInit) return
        runInAction(() => {
            this.posts = posts
            this.perPage = 10
            this.page = 1
        })
        const list = await postRepository.searchPostList({
            curPage: page,
            perPage: perPage
        })
        runInAction(() => {
            this.posts = [...list.posts]
        })
    }

    localInitialize(posts: PostDto[], page: number = 1, perPage: number = 10){
        this.posts = posts
        this.perPage = 10
        this.page = 1
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


    static makeImgSrc(model: PostDto): string {
        const imageUrl = model.body.match(/!\[[^\]]*\]\((.*?)\)/)
        if (imageUrl === null) return "/images/login-bg.jpg"
        return imageUrl[1]
    }
}

const postListStore = new PostListStore()


export default postListStore