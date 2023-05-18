export interface RestResponse {
    ok: boolean
    message?: string
    data?: any
    code?: number
}

class FailRequestServer extends Error {
    constructor() {
        super("서버 연결 실패");
    }
}

export class RestCall {
    private buildHeader(opt: any): HeadersInit {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }
        if (opt && opt.accessKey) {
            headers['Authorization'] = 'Bearer ' + opt.accessKey
        }
        return headers
    }

    private async buildResponse(res: Response): Promise<RestResponse> {
        const res_data = await res.json()
        return {
            ok: res.ok,
            data: res_data,
            message: res_data?.detail
        }
    }

    public async post(url: string, data: any, opt?: any): Promise<RestResponse> {
        try {
            const res = await fetch(url, {
                method: "POST",
                headers: this.buildHeader(opt),
                body: JSON.stringify(data),
            })
            return this.buildResponse(res)
        } catch (e) {
            throw new FailRequestServer()
        }
    }

    public async get(url: string, opt?: any): Promise<RestResponse> {
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: this.buildHeader(opt),
            })
            return this.buildResponse(res)
        } catch (e) {
            throw new FailRequestServer()
        }
    }

    public async put(url: string, data: any, opt?: any): Promise<RestResponse> {
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: this.buildHeader(opt),
                body: JSON.stringify(data),
            })
            return this.buildResponse(res)
        } catch (e) {
            throw new FailRequestServer()
        }
    }

    public async delete(url: string, opt?: any): Promise<RestResponse> {
        try {
            const res = await fetch(url, {
                method: "DELETE",
                headers: this.buildHeader(opt),
            })
            return this.buildResponse(res)
        } catch (e) {
            throw new FailRequestServer()
        }
    }
}

const defaultRestApi = new RestCall()

export default defaultRestApi