import {observer} from "mobx-react-lite";


import {PostListStore} from "@/domain/post/store/post-list-store";
import HorizonCard from "@/components/base/card/horizon-card";
import {useBlogRouter} from "@/infra/hooks/useBlogRouter";

export type Props = {
    postListStore: PostListStore
}


const PostHorizonCardList = observer((props: Props) => {
    const {postListStore} = props
    const {gotoPost} = useBlogRouter()

    async function onClick(postId: string) {
        await gotoPost(postId)
    }

    return (
        <div className={"flex flex-col"}>
            {postListStore.posts.map(p => {
                return (
                    <div key={p.id} className={"mb-8"}>
                        <HorizonCard
                            onClick={() => onClick(p.id)}
                            imgSrc={PostListStore.makeImgSrc(p)}
                            title={p.title}
                            body={p.body} createdAt={p.createdAt}
                            updatedAt={p.updatedAt}
                            tags={p.tags}
                        />
                    </div>
                )
            })}
        </div>
    )
})

export default PostHorizonCardList