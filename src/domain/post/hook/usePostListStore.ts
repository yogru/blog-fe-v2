import {PostListStore, PostListStoreInitContext} from "@/domain/post/store/PostListStore";
import {useEffect} from "react";

export const postListStore = new PostListStore([])

export function usePostListStore(ctx?: PostListStoreInitContext) {
    useEffect(() => {

        if (ctx) {
            postListStore.initialize(ctx).then()
            return
        }
        postListStore.initialize({posts: [], perPage: 10, page: 1, tagStatisticsList: [],
            forceClientLoad: true}).then()

    }, [ctx])
    return {
        postListStore
    }
}