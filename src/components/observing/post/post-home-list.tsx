'use client'

import Card from "@/components/base/card/card";
import {PostListStore} from "@/domain/post/store/post-list-store";
import {useEffect, useState} from "react";
import {PostModel} from "@/domain/post/repositories";
import useMyScroll from "@/infra/hooks/useMyScroll";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";

export type Props = {
    list: PostModel []
}


export default function PostHomeCardListObserver(props: Props) {
    const {gotoPost} = useBlogRouter()
    // ssr warring 때문에 따로 데이터 뺴놓음.
    const [list, setList] = useState<PostModel[]>(props.list)
    const [store, setStore] = useState<PostListStore | null>(null)
    const {isReached} = useMyScroll()
    useEffect(() => {
        if (store === null) {
            setStore(new PostListStore(list))
        }
    }, [list, store])

    useEffect(() => {
        store?.nextLoad().then(() => {
            setList(store!!.cards)
        })
    }, [isReached])

    async function onClick(id: string) {
        await gotoPost(id)
    }

    return (
        <div className={"flex w-full flex-wrap"}>
            {
                list.map(c =>
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
}