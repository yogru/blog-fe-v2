import Repository from "@/domain/infra/repository";
import restCall, {RestResponse} from "@/infra/rest-call";
import {CustomError} from "@/infra/errors";


export interface PostCreateReq {
    title: string
    body: string
    tags: string[]
    deleted?: boolean
}

export interface PostCreateRes {
    id: string
}


export class PostRepository extends Repository {

    public async addTag(tag: string, accessKey: string) {
        const url = this.getBaseUrl() + "/post/tag";
        const ret = await restCall.post<{ tag: string }, null>(url, {tag: tag}, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailAddTag()
    }

    public async deleteTag(tag: string, accessKey: string) {
        const url = this.getBaseUrl() + "/post/tag/" + tag;
        const ret = await restCall.delete<null>(url, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailDeleteTag()
    }

    public async createPost(post: PostCreateReq, accessKey: string) {
        const url = this.getBaseUrl() + "/post"
        const ret: RestResponse<PostCreateRes> = await restCall.post(url, post, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailCreatePost()
    }

}

const postRepository = new PostRepository()
export default postRepository


// errors

class FailAddTag extends CustomError {
    constructor() {
        super("FailAddTag", "태그 추가 실패 했습니다.");
    }
}

class FailDeleteTag extends CustomError {
    constructor() {
        super("FailDeleteTag", "태그 삭제 실패 했습니다.");
    }
}

class FailCreatePost extends CustomError {
    constructor() {
        super("FailCreatePost", "포스팅 실패 했습니다.");
    }
}