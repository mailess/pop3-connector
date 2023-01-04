require('dotenv').config({
    path: require('path').join(__dirname, '.env')
})

const {POPConnector} = require('../dist')

setImmediate(async () => {
    try {
        const imap = new POPConnector({
            hostname: 'pop.mail.yahoo.com',
            port: 995,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            security: 'ssl_tls'
        })
        const {count_messages} = await imap.stats()

        const result = await imap.fetchOne(count_messages)
        console.log('result:', result.message_id)

    } catch (error) {
        console.error('ERROR', error)
    }
})

