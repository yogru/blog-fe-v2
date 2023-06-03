import postRepository from "@/domain/post/repositories";
import HomeTemplate from "@/components/template/home";

export default async function Home() {
    const postList = await postRepository.searchPostList({curPage: 1, perPage: 10})
    return (
        <HomeTemplate postList={postList.posts}/>
    )
}
