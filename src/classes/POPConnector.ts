import {POPConfiguration} from "../interfaces/POPConfiguration"
import {StatsResult} from "../interfaces/StatsResult"
import {FetchResult} from "../interfaces/FetchResult"

const Pop3Command = require('node-pop3')
const {simpleParser} = require('mailparser')


export class POPConnector {
    private readonly configs: POPConfiguration
    private readonly client: any

    constructor(configs: POPConfiguration) {
        this.configs = configs

        const {username, hostname, port, password, security} = this.configs
        this.client = new Pop3Command({
            host: hostname,
            port,
            tls: security === 'ssl_tls',
            user: username,
            password: password
        })
    }

    public async test(): Promise<boolean> {
        await this.client.STAT()
        console.log('connected!')

        return true
    }

    public async stats(): Promise<StatsResult> {
        const stat = await this.client.STAT()
        if (!stat) {
            throw new Error('Something went wrong!')
        }

        const [count_messages, size_messages] = stat.split(' ')

        return {
            count_messages: count_messages ? parseInt(count_messages, 10) : null,
            size_messages: size_messages ? parseInt(size_messages, 10) : null
        }
    }

    public async list(): Promise<Array<any>> {
        const list = await this.client.LIST()
        console.log('list:', list)

        return []
    }

    public async fetchOne(seq: number): Promise<FetchResult> {
        const str = await this.client.RETR(seq)
        const {messageId, date, subject} = await simpleParser(str)

        return {
            raw_data: str,
            message_id: messageId,
            subject,
            date,
            seq
        }
    }

    public async quit(): Promise<void> {
        await this.client.QUIT()
        console.log('Bye!')
    }
}

