import PostTagListTemplate from "@/components/template/post-list-tag";
import postRepository from "@/domain/post/repositories";

export type Props = {}


export default async function PostListTag(props: Props) {
    const postList = await postRepository.searchPostList({curPage: 1, perPage: 10})
    const tagStatistics = await postRepository.getTagStatistics()
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