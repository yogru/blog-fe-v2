import {PostModel} from "@/domain/post/model/PostModel";

export default interface PostListResponse {
    posts: PostModel[]
}