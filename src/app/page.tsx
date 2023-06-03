import postRepository from "@/domain/post/repositories";
import HomeTemplate from "@/components/template/home";

export default async function Home() {
    const postList = await postRepository.searchPostList({curPage: 1, perPage: 10})
    return (
        <HomeTemplate
            initCtx={{
                posts: postList.posts,
                page: 1,
                perPage: 10,
                tagStatisticsList: [], // 홈에서는 태그를 이용 안함.
                forceClientLoad: false
            }}
        />
    )
}
