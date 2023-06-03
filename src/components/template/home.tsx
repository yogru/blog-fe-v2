"use client"


import MenuObserver from "@/components/observing/menu"
import PostCardListObserver from "@/components/observing/post/post-card-list";
import {useLoginStore} from "@/domain/user/hooks";
import {usePostListStore} from "@/domain/post/hooks";
import PostListFooterObserver from "@/components/observing/footer/post-list-footer";
import {PostListStoreInitContext} from "@/domain/post/store/post-list-store";


type Props = {
    initCtx: PostListStoreInitContext
}

export default function HomeTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    const {postListStore} = usePostListStore(props.initCtx)

    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"pt-12 pl-48 pr-32 min-h-[90rem]"}>
                <PostCardListObserver postListStore={postListStore}/>
            </div>

            <div>
                <PostListFooterObserver postListStore={postListStore}/>
            </div>
        </>
    )
}
