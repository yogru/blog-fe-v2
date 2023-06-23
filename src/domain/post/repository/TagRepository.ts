import Repository from "@/infra/repository";
import restCall from "@/infra/rest-call";
import {CustomError} from "@/infra/errors";
import TagStatisticsResponse from "@/domain/post/repository/response/TagStatisticsResponse";

export class TagRepository extends Repository {
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

    async getTagStatistics() {
        const url = this.getBaseUrl() + "/post/tag/statistics"
        const res = await restCall.get<TagStatisticsResponse>(url)
        if (res.ok) return res.data!!
        return {
            tags: []
        }
    }
}

const tagRepository = new TagRepository()
export default tagRepository

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
