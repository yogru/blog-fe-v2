import Repository from "@/infra/repository";
import SearchSeriesRequest from "@/domain/post/repository/request/SearchSeriesRequest";
import restCall from "@/infra/rest-call";
import SearchSeriesResponse from "@/domain/post/repository/response/SearchSeriesResponse";
import CreateSeriesRequest from "@/domain/post/repository/request/CreateSeriesRequest";
import CreateSeriesResponse from "@/domain/post/repository/response/CreateSeriesResponse";


export class SeriesRepository extends Repository {

    async searchSeries(search: SearchSeriesRequest): Promise<SearchSeriesResponse> {
        const curPage = search.page || 1
        const perPage = search.perPage || 10
        const url = this.getBaseUrl() + `/post/series/list?page=${curPage}&perPage=${perPage}`
        const res = await restCall.get<SearchSeriesResponse>(url,{revalidate:60})
        return res.data!!
    }

    async createSeries(req: CreateSeriesRequest, accessKey: string) {
        const url = this.getBaseUrl() + "/post/series"
        const res = await restCall.post<CreateSeriesRequest, CreateSeriesResponse>(url, req, {bearerToken: accessKey})
        if (res.ok) return
    }
}

const seriesRepository = new SeriesRepository()


export default seriesRepository