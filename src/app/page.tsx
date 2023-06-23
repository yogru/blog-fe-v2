import HomeTemplate from "@/components/template/home";
import postRepository from "@/domain/post/repository/post-repository";

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
