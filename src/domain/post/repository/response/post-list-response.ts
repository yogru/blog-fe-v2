import {PostModel} from "@/domain/post/model/post-model";

export default interface PostListResponse {
    posts: PostModel[]
}