import Repository from "@/domain/infra/repository";
import restCall, {buildRestCallOption, RestCallOption, RestResponse} from "@/infra/rest-call";
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

export interface SearchPostList {
    curPage: number
    perPage: number
    tags?: string[]
    title?: string
}

export interface PostUserDto {
    writerName: string
    writerEmail: string
}

export interface PostDto {
    id: string
    title: string
    body: string
    writer: PostUserDto
    username: string
    createdAt: string
    updatedAt: string
    tags: string []
    deleted: boolean
}


export interface PostListRes {
    posts: PostDto[]
}

export interface PostRes {
    post: PostDto
}

export interface SetDeletedPostReq {
    deleted: boolean
    id: string
}

export class PostRepository extends Repository {

    async addTag(tag: string, accessKey: string) {
        const url = this.getBaseUrl() + "/post/tag";
        const ret = await restCall.post<{ tag: string }, null>(url, {tag: tag}, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailAddTag()
    }

    async deleteTag(tag: string, accessKey: string) {
        const url = this.getBaseUrl() + "/post/tag/" + tag;
        const ret = await restCall.delete<null>(url, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailDeleteTag()
    }

    async createPost(post: PostCreateReq, accessKey: string) {
        const url = this.getBaseUrl() + "/post"
        const ret: RestResponse<PostCreateRes> = await restCall.post(url, post, {bearerToken: accessKey})
        if (ret.ok) return ret
        throw new FailCreatePost()
    }

    async setDeletedPost(req: SetDeletedPostReq, accessKey: string) {
        const url = this.getBaseUrl() + "/post/set-delete"
        const res = await restCall.put<SetDeletedPostReq, null>(url, req,
            {bearerToken: accessKey})

        if (!res.ok) throw new FailSetDeletePost()
    }

    async searchPostList(searchList: SearchPostList): Promise<PostListRes> {
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
        const res: RestResponse<PostListRes> = await restCall.get(url, {revalidate: 60})
        return res.data!!
    }

    async loadPost(id: string) {
        const url = this.getBaseUrl() + "/post/" + id
        const res = await restCall.get<PostRes>(url)
        if (res.ok) return res.data
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

class FailSetDeletePost extends CustomError {
    constructor() {
        super("FailCreatePost", "포스팅 삭제 실패했습니다.");
    }
}