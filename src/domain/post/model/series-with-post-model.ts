import {PostUserValue} from "@/domain/post/model/post-user-value";
import {PostModel} from "@/domain/post/model/post-model";

export default interface SeriesWithPostModel {
    id: string
    title: string
    writer: PostUserValue
    body: string | null
    updateAt: string
    posts: PostModel[]
}