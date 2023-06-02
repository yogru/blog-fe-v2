import {makeAutoObservable, runInAction} from "mobx";
import postRepository, {PostDto} from "@/domain/post/repositories";


export class PostListStore {
    constructor(public cards: PostDto[] = [],
                public page: number = 1,
                public perPage: number = 10,
                public loadEnd: boolean = false
    ) {
        makeAutoObservable(this)
    }

    public async nextLoad() {
        if (this.loadEnd) return
        const list = await postRepository.searchPostList({
            curPage: this.page + 1,
            perPage: this.perPage
        })

        runInAction(() => {
            this.page += 1
            this.cards = [...this.cards, ...list.posts]
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