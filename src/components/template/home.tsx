"use client"
import {useEffect} from "react";

import MenuObserver from "@/components/observing/menu"
import PostHomeList from "@/components/observing/post/post-home-list";
import {PostDto} from "@/domain/post/repositories";
import {UserStore} from "@/domain/user/stores";


const userStore = new UserStore()

type Props = {
    postList: PostDto[]
}

export default function HomeTemplate(props: Props) {

    useEffect(() => {
        userStore.initialize().then()
    }, [])

    return (
        <>
            <MenuObserver userStore={userStore}/>
            <div className={"pt-12 pl-48 pr-32"}>
                <PostHomeList list={props.postList}/>
            </div>
        </>
    )
}
