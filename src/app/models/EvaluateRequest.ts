
export interface Context {
    isAdmin: string;
    email_address: string;
    environment: string;
}

export interface EvaluateRequest {
    flagKey: string;
    entityId: string;
    context: Context;
}

