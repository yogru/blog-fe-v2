import {PostWriteStore} from "@/domain/post/store/post-write";
import {useEffect} from "react";
import {PostListStore} from "@/domain/post/store/post-list-store";
import {PostDto} from "@/domain/post/repositories";

export const postWriteStore = new PostWriteStore()

export const postListStore = new PostListStore([])

export function usePostWriteStore() {

    return {
        postWriteStore
    }
}


export function usePostListStore({posts = [], forceLoad = false}: {
    posts: PostDto[],
    forceLoad: boolean
}) {
    useEffect(() => {
        forceLoad && postListStore.initialize(posts).then()
        !forceLoad && postListStore.localInitialize(posts)
    }, [])
    return {
        postListStore
    }
}