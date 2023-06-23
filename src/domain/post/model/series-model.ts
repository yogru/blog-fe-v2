import {PostUserValue} from "@/domain/post/model/post-user-value";

export default interface SeriesModel {
    id: string
    title: string
    writer: PostUserValue,
    body: string | null
    postIds: string[]
}