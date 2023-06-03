"use client"
import {useEffect} from "react";

import MenuObserver from "@/components/observing/menu"
import PostHomeList from "@/components/observing/post/post-home-list";
import {PostDto} from "@/domain/post/repositories";
import {useLoginStore} from "@/domain/user/hooks";




type Props = {
    postList: PostDto[]
}

export default function HomeTemplate(props: Props) {
    const { loginStore } = useLoginStore()


    return (
        <>
            <MenuObserver loginStore={loginStore}/>
            <div className={"pt-12 pl-48 pr-32"}>
                <PostHomeList list={props.postList}/>
            </div>
        </>
    )
}
