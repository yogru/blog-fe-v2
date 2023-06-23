import Repository from "@/infra/repository";
import restCall, {RestResponse} from "@/infra/rest-call";
import {CustomError} from "@/infra/errors";
import CreatePostRequest from "@/domain/post/repository/request/CreatePostRequest";
import CreatePostResponse from "@/domain/post/repository/response/CreatePostResponse";
import DeletePostRequest from "@/domain/post/repository/request/DeletePostRequest";
import SearchPostRequest from "@/domain/post/repository/request/SearchPostRequest";
import PostListResponse from "@/domain/post/repository/response/PostListResponse";
import PostResponse from "@/domain/post/repository/response/PostResponse";


class FailCreatePost extends CustomError {
    constructor() {
        super("FailCreatePost", "포스팅 실패 했습니다.");
    }
}

class FailSetDeletePost extends CustomError {
    constructor() {
        super("FailCreatePost", "포스팅 삭제 실패했습니다.");
    }
}

export class PostRepository extends Repository {

    async createPost(post: CreatePostRequest, accessKey: string) {
        const url = this.getBaseUrl() + "/post"
        const ret: RestResponse<CreatePostResponse> = await restCall.post(url, post, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailCreatePost()
    }

    async setDeletedPost(req: DeletePostRequest, accessKey: string) {
        const url = this.getBaseUrl() + "/post/set-delete"
        const res = await restCall.put<DeletePostRequest, null>(url, req,
            {bearerToken: accessKey})
        if (!res.ok) throw new FailSetDeletePost()
    }

    async searchPostList(searchList: SearchPostRequest): Promise<PostListResponse> {
        let {tags, curPage, perPage, title} = searchList
        let url = this.getBaseUrl() + `/post/list?page=${curPage}&perPage=${perPage}`
        if (Array.isArray(tags) && tags.length >= 1) {
            tags.forEach((tag) => {
                url += "&tags=" + tag
            })
        }
        if (title && title?.length >= 2) {
            url += "&title=" + title
        }
        const res: RestResponse<PostListResponse> = await restCall.get(url, {revalidate: 60})
        return res.data!!
    }

    async loadPost(id: string) {
        const url = this.getBaseUrl() + "/post/" + id
        const res = await restCall.get<PostResponse>(url)
        if (res.ok) return res.data
    }
}


const postRepository = new PostRepository()
export default postRepository

