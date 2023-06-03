import {observer} from "mobx-react-lite";
import {PostListStore} from "@/domain/post/store/post-list-store";

export type Props = {
    postListStore: PostListStore
}


const TagViewerObserver = observer((props: Props) => {

    return (
        <div>tag..</div>
    )
})


export default TagViewerObserver