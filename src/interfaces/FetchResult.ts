export interface FetchResult extends Record<string, any> {
    raw_data: string,
    message_id: string,

    subject: string,
    date: Date,
    seq: number,
}

