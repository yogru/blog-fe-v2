import postRepository from "@/domain/post/repositories";
import {notFound} from "next/navigation";
import PostViewerBody from "@/observer/post/post-viewer";
import MenuObserver from "@/observer/menu";
import Footer from "@/components/footer";
import PostViewerObserver from "@/observer/post/post-viewer";

type Props = {
    params: {
        postId: string
    }
}

export default async function PostViewerPage(props: Props) {
    const postRes = await postRepository.loadPost(props.params.postId)
    if (!postRes) notFound()

    return (
        <PostViewerObserver post={postRes.post!!}/>
    )
}