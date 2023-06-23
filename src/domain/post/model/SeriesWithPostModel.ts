import {PostUserValue} from "@/domain/post/model/PostUserValue";
import {PostModel} from "@/domain/post/model/PostModel";

export default interface SeriesWithPostModel {
    id: string
    title: string
    writer: PostUserValue
    body: string | null
    updateAt: string
    posts: PostModel[]
}