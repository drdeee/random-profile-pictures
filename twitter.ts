import TwitterApi from 'twitter-api-v2';
import { Auth, Config } from './types';
import { readFileSync } from 'fs';

const config: Config = JSON.parse(readFileSync('client.json', 'utf8'));
const auth: Auth = JSON.parse(readFileSync('twitter.auth.json', 'utf8'));

const client = new TwitterApi({
    appKey: config.apiKey,
    appSecret: config.apiSecret,
    accessToken: auth.accessToken,
    accessSecret: auth.accessSecret,
})

async function run(){
    await client.v1.updateAccountProfileImage('./logo.png')
}

run()