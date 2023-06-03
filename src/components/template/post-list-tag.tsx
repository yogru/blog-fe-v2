"use client"

import {useLoginStore} from "@/domain/user/hooks";
import MenuObserver from "@/components/observing/menu";
import {usePostListStore} from "@/domain/post/hooks";
import TagViewerObserver from "@/components/observing/post/tag-viewer";
import {PostDto} from "@/domain/post/repositories";
import PostListFooterObserver from "@/components/observing/footer/post-list-footer";

export type Props = {
    posts: PostDto[]
}

export default function PostTagListTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    const {postListStore} = usePostListStore({posts: props.posts, forceLoad: false})

    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"pt-8 pl-32 pr-32 pb-8 min-h-[90rem]"}>
                <TagViewerObserver postListStore={postListStore}/>
            </div>

            <div>
                <PostListFooterObserver postListStore={postListStore}/>
            </div>
        </>
    )
}


