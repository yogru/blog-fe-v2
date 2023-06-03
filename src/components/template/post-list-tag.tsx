"use client"

import {useLoginStore} from "@/domain/user/hooks";
import MenuObserver from "@/components/observing/menu";
import {usePostListStore, usePostListStoreWithScroll} from "@/domain/post/hooks";
import TagViewerObserver from "@/components/observing/post/tag-viewer";
import PostListFooterObserver from "@/components/observing/footer/post-list-footer";
import {PostListStoreInitContext} from "@/domain/post/store/post-list-store";
import PostHorizonCardList from "@/components/observing/post/post-horizon-card-list";

export type Props = {
    initCtx: PostListStoreInitContext
}

export default function PostTagListTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    const {postListStore} = usePostListStoreWithScroll(props.initCtx)

    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"flex mt-8 mb-4 justify-center"}>
                <TagViewerObserver postListStore={postListStore}/>
            </div>

            <div className={"flex mt-8 mb-4 justify-center"}>
                <PostHorizonCardList postListStore={postListStore}/>
            </div>

            <div>
                <PostListFooterObserver postListStore={postListStore}/>
            </div>
        </>
    )
}


