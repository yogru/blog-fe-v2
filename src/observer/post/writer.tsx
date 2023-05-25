import {observer} from "mobx-react-lite";
import {PostService} from "@/domain/post/services";
import PostWriter from "@/components/post/writer";


type Props = {
    postService: PostService
}

const PostWriterObserver = observer((props: Props) => {
    return (<PostWriter postService={props.postService}/>)
})


export default PostWriterObserver