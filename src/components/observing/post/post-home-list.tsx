'use client'

import Card from "@/components/base/card/card";
import {PostListStore} from "@/domain/post/store/post-list-store";
import {useEffect, useState} from "react";
import {PostDto} from "@/domain/post/repositories";
import useMyScroll from "@/infra/hooks/useMyScroll";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";
import {observer} from "mobx-react-lite";

export type Props = {
    postListStore: PostListStore
}

const PostHomeCardListObserver = observer((props:Props)=>{
    const {gotoPost} = useBlogRouter()
    const {isReached} = useMyScroll()
    const {postListStore} = props

    useEffect(() => {
        postListStore.nextLoad().then()
    }, [isReached])

    async function onClick(id: string) {
        await gotoPost(id)
    }

    return (
        <div className={"flex w-full flex-wrap"}>
            {
                postListStore.posts.map(c =>
                    <div key={c.id} className={"mr-16 mb-16"}>
                        <Card key={c.id}
                              imgSrc={PostListStore.makeImgSrc(c)}
                              title={c.title}
                              cardId={c.id}
                              content={c.body}
                              createdAt={c.createdAt}
                              onClick={onClick}
                        />
                    </div>
                )
            }
        </div>
    )
})

export default PostHomeCardListObserver