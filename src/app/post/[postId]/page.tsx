import {notFound} from "next/navigation";


import PostViewerObserver from "@/components/template/post-viewer";
import postRepository from "@/domain/post/repository/PostRepository";

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