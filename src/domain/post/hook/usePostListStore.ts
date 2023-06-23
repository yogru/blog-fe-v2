import {PostListStore, PostListStoreInitContext} from "@/domain/post/store/PostListStore";
import {useEffect} from "react";
export const postListStore = new PostListStore([])

export function usePostListStore(ctx: PostListStoreInitContext) {
    useEffect(() => {
        postListStore.initialize(ctx).then()
    }, [ctx])
    return {
        postListStore
    }
}