import {observer} from "mobx-react-lite";


import {PostListStore} from "@/domain/post/store/post-list-store";
import HorizonCard from "@/components/base/card/horizon-card";

export type Props = {
    postListStore: PostListStore
}


const PostHorizonCardList = observer((props: Props) => {
    const {postListStore} = props
    return (
        <div className={"flex flex-col"}>
            {postListStore.posts.map(p => {
                return (
                    <div key={p.id} className={"mb-4"}>
                        <HorizonCard href={"#"}
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