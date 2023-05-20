import ToastViewer from "@/components/toast/viewer";
import postRepository from "@/domain/post/repositories";

type Props = {
    params: {
        postId: string
    }
}

export default async function PostViewerPage(props: Props) {
    const post = await postRepository.loadPost(props.params.postId)
    return (
        <ToastViewer content={post.body}/>
    )
}