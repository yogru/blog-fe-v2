import {observer} from "mobx-react-lite";
import {PostListStore} from "@/domain/post/store/post-list-store";
import Footer from "@/components/base/footer";

const PostListFooterObserver = observer(({postListStore}: {
    postListStore: PostListStore
}) => {
    if (!postListStore.loadEnd) return null
    return <Footer/>
})


export default PostListFooterObserver