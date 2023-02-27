import TwitterApi from 'twitter-api-v2'
import { Config } from './types'
import { readFileSync, writeFileSync } from 'fs'
import prompt from 'prompt'
const config: Config = JSON.parse(readFileSync('client.json', 'utf8'))

async function run() {
    const initialClient = new TwitterApi({
        appKey: config.apiKey,
        appSecret: config.apiSecret,
    })

    const authLink = await initialClient.generateAuthLink()
    console.log('Please visit the following link to authorize the app:')
    console.log(authLink.url)
    prompt.start()
    prompt.get<{pin: string}>(['pin'], async function (err, result) {
        const client = new TwitterApi({
            appKey: config.apiKey,
            appSecret: config.apiSecret,
            accessToken: authLink.oauth_token,
            accessSecret: authLink.oauth_token_secret
        })
        const { client: loggedClient, accessToken, accessSecret } = await client.login(result.pin)
        writeFileSync('twitter.auth.json', JSON.stringify({
            accessToken,
            accessSecret,
        }, null, 2))
        console.log('Logged in as:', (await loggedClient.currentUserV2()).data.name)
        console.log('Access token:', accessToken)
        console.log('Access secret:', accessSecret)
    })
}

run()