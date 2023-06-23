import {PostListStoreInitContext} from "@/domain/post/store/PostListStore";
import useMyScroll from "@/infra/hooks/useMyScroll";
import {useEffect} from "react";
import {usePostListStore} from "@/domain/post/hook/usePostListStore";


export function usePostListStoreWithScroll(ctx: PostListStoreInitContext) {
    const {postListStore} = usePostListStore(ctx)
    const {isReached} = useMyScroll()
    useEffect(() => {
        postListStore.nextLoad().then()
    }, [isReached, postListStore])

    return {postListStore}
}