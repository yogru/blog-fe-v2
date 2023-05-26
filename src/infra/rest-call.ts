import {CustomError} from "@/infra/errors";

export class RestApiConnectionError extends CustomError {
    constructor() {
        super("RestApiConnectionError", "서버와 연결 되지 않는다.");
    }
}

export interface RestResponse<T> {
    ok: boolean
    status: number
    errorMessage?: string
    data?: T
}

export class RestCallOption {
    bearerToken?: string
}

export class RestCall {
    private buildHeader(opt?: RestCallOption): HeadersInit {
        const headers: HeadersInit = {
            "Content-Type": "application/json",
            'Accept': 'application/json'
        }
        if (opt && opt.bearerToken) {
            headers['Authorization'] = 'Bearer ' + opt.bearerToken
        }
        return headers
    }

    private async buildResponse<T>(res: Response): Promise<RestResponse<T>> {
        const ret: RestResponse<T> = {
            ok: res.ok,
            status: res.status
        }
        if (res.ok) {
            ret['data'] = await res.json() as T
        }
        return ret
    }

    private async call<T, U>(method: "GET" | "POST" | "DELETE" | "PUT", url: string, data?: T, opt?: RestCallOption): Promise<RestResponse<U>> {
        const headers = this.buildHeader(opt)
        let res: Response | null = null
        try {
            switch (method) {
                case "POST":
                case "PUT":
                    const body = JSON.stringify(data!!)
                    res = await fetch(url, {method, headers, body})
                    break
                case "GET":
                case "DELETE":
                    res = await fetch(url, {method, headers})
                    break
            }
            return this.buildResponse(res!!)
        } catch (e) {
            if (e instanceof CustomError) throw e
            throw new RestApiConnectionError()
        }
    }

    async post<T, U>(url: string, data: T, opt?: RestCallOption): Promise<RestResponse<U>> {
        return await this.call("POST", url, data, opt)
    }

    async put<T, U>(url: string, data: T, opt?: RestCallOption): Promise<RestResponse<U>> {
        return await this.call("PUT", url, data, opt)
    }

    async delete<U>(url: string, opt?: RestCallOption): Promise<RestResponse<U>> {
        return await this.call("DELETE", url, null, opt)
    }

    async get<U>(url: string, opt?: RestCallOption): Promise<RestResponse<U>> {
        return await this.call("GET", url, null, opt)
    }
}

const defaultRestApi = new RestCall()

export default defaultRestApi