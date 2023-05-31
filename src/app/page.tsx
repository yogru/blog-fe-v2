import MenuObserver from "@/observer/menu";
import menuStore from "@/domain/menu/stores";

import postListStore from "@/domain/post/store/post-list-store";
import PostHomeList from "@/observer/post/post-home-list";
import postRepository from "@/domain/post/repositories";

export default async function Home() {
    // await postListStore.loadHomeList()
    const postList = await postRepository.searchPostList({curPage: 1, perPage: 10})
    return (
        <>
            <MenuObserver />
            <div className={"pt-12 pl-48 pr-32"}>
                <PostHomeList list={postList.posts}/>
            </div>
        </>
    )
}
