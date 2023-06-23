import PostTagListTemplate from "@/components/template/post-list-tag";
import postRepository from "@/domain/post/repository/post-repository";
import tagRepository from "@/domain/post/repository/tag-repository";


export default async function PostListTag() {
    const postList = await postRepository.searchPostList({curPage: 1, perPage: 10})
    const tagStatistics = await tagRepository.getTagStatistics()
    return (
        <PostTagListTemplate initCtx={{
            posts: postList.posts,
            page: 1,
            perPage: 10,
            tagStatisticsList: tagStatistics.tags,
            forceClientLoad: false
        }}/>
    )
}