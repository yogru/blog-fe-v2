import {makeAutoObservable} from "mobx";
import postRepository from "@/domain/post/repositories";

export type PostCardData = {
    id: string,
    title: string,
    content: string,
    createdAt: string
}

export class PostList {
    constructor(public cards: PostCardData[] = [],
                public page: number = 1,
                public perPage: number = 10,
                public loadEnd: boolean = false
    ) {
        makeAutoObservable(this)
    }


    private async loadHomeList() {
        const list = await postRepository.searchPostList({
            curPage: this.page,
            perPage: this.perPage
        })

    }
}

const postListStore = new PostList()


export default postListStore