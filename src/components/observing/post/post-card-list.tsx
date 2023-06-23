'use client'
import {observer} from "mobx-react-lite";

import Card from "@/components/base/card/card";
import {PostListStore} from "@/domain/post/store/PostListStore";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";


export type Props = {
    postListStore: PostListStore
}

const PostCardListObserver = observer((props: Props) => {
    const {gotoPost} = useBlogRouter()
    const {postListStore} = props

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

export default PostCardListObserver