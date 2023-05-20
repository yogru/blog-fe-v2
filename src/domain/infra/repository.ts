import env from "@/infra/env";

export default class Repository {
    getBaseUrl(): string {
        if (typeof window !== 'undefined') {
            return env.backUrl
        }
        return env.ssrBackUrl
    }
}