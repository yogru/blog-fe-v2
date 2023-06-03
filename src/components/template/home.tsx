"use client"
import {useEffect} from "react";

import MenuObserver from "@/components/observing/menu"
import PostHomeList from "@/components/observing/post/post-home-list";
import {PostDto} from "@/domain/post/repositories";
import {useLoginStore} from "@/domain/user/hooks";
import Footer from "@/components/base/footer";
import {usePostListStore} from "@/domain/post/hooks";
import PostListFooterObserver from "@/components/observing/footer/post-list-footer";


type Props = {
    postList: PostDto[]
}

export default function HomeTemplate(props: Props) {
    const {loginStore} = useLoginStore()
    const {postListStore} = usePostListStore({posts: props.postList, forceLoad: false})


    return (
        <>
            <div>
                <MenuObserver loginStore={loginStore}/>
            </div>

            <div className={"pt-12 pl-48 pr-32 min-h-[90rem]"}>
                <PostHomeList postListStore={postListStore}/>
            </div>

            <div>
                <PostListFooterObserver postListStore={postListStore}/>
            </div>
        </>
    )
}
