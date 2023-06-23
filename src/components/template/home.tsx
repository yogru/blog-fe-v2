"use client"


import MenuObserver from "@/components/observing/menu"
import PostCardListObserver from "@/components/observing/post/post-card-list";
import {useLoginStore} from "@/domain/user/hook/hooks";
import {PostListStoreInitContext} from "@/domain/post/store/PostListStore";
import {usePostListStoreWithScroll} from "@/domain/post/hook/usePostListStoreWithScroll";
import Footer from "../observing/footer";


type Props = {
    initCtx: PostListStoreInitContext
}

export default function HomeTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    const {postListStore} = usePostListStoreWithScroll(props.initCtx)

    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"pt-12 pl-28 min-h-[90rem]"}>
                <PostCardListObserver postListStore={postListStore}/>
            </div>

            <div>
                <Footer isEnd={postListStore.loadEnd}/>
            </div>
        </>
    )
}
