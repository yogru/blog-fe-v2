import {PostWriteStore} from "@/domain/post/store/post-write";
import {useEffect} from "react";
import {PostListStore, PostListStoreInitContext} from "@/domain/post/store/post-list-store";
import useMyScroll from "@/infra/hooks/useMyScroll";

export const postWriteStore = new PostWriteStore()

export const postListStore = new PostListStore([])

export function usePostWriteStore() {

    return {
        postWriteStore
    }
}


export function usePostListStore(ctx: PostListStoreInitContext) {
    useEffect(() => {
        postListStore.initialize(ctx).then()
    }, [ctx])
    return {
        postListStore
    }
}


export function usePostListStoreWithScroll(ctx: PostListStoreInitContext) {
    const {postListStore} = usePostListStore(ctx)

    const {isReached} = useMyScroll()
    useEffect(() => {
        postListStore.nextLoad().then()
    }, [isReached, postListStore])

    return {postListStore}
}