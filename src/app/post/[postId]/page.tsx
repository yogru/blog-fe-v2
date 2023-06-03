import {notFound} from "next/navigation";

import postRepository from "@/domain/post/repositories";
import PostViewerObserver from "@/components/template/post-viewer";

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