import postRepository from "@/domain/post/repositories";
import {notFound} from "next/navigation";
import PostViewerObserver from "@/observer/post/post-viewer";
import MenuObserver from "@/observer/menu";

type Props = {
    params: {
        postId: string
    }
}

export default async function PostViewerPage(props: Props) {
    console.log(props.params.postId)
    console.log("보자고...??",props.params.postId)
    const postRes = await postRepository.loadPost(props.params.postId)
    if (!postRes) notFound()

    console.log("보자고...??",postRes?.post)
    return (
        <>
            <MenuObserver />

            <div className={"flex pt-8"}>
                <div className={"w-[64rem] ml-auto mr-auto"}>
                    <PostViewerObserver post={postRes?.post!!}/>
                </div>
            </div>

        </>

    )
}