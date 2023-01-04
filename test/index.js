require('dotenv').config({
    path: require('path').join(__dirname, '.env')
})

const {POPConnector} = require('../dist')

setImmediate(async () => {
    try {
        const popConnector = new POPConnector({
            hostname: 'pop.mail.yahoo.com',
            port: 995,
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            security: 'ssl_tls'
        })
        // await imap.test()

        const result = await popConnector.fetchOne(4)
        console.log('result:', result)

        await popConnector.quit()
    } catch (error) {
        console.error('ERROR', error)
    }
})

