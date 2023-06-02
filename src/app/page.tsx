import MenuObserver from "../components/observing/menu";

import PostHomeList from "@/components/observing/post/post-home-list";
import postRepository from "@/domain/post/repositories";
import {UserStore} from "@/domain/user/stores";

const userStore = new UserStore()
export default async function Home() {


    const postList = await postRepository.searchPostList({curPage: 1, perPage: 10})
    return (
        <>
            <MenuObserver userStore={userStore}/>
            <div className={"pt-12 pl-48 pr-32"}>
                <PostHomeList list={postList.posts}/>
            </div>
        </>
    )
}
