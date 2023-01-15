export interface RequestContext {
    email_address: string;
    environment: string;
    isAdmin: string;
}

export class EvaluateResponse {
    requestId: string;
    entityId: string;
    requestContext: RequestContext;
    match: boolean;
    flagKey: string;
    segmentKey: string;
    timestamp: string;
    value: string;
    requestDurationMillis: number;
    attachment: string;
    reason: string;
}

