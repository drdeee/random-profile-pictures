import { IgApiClient } from 'instagram-private-api';
import axios from 'axios';

import {config} from 'dotenv'
config()

const ig = new IgApiClient();

const username = process.env.IG_USERNAME  || '';
const password = process.env.IG_PASSWORD || '';

ig.state.generateDevice(username);

(async () => {
    const pbData = (await axios.get('https://this-person-does-not-exist.com/?new')).data
  await ig.account.login(username, password);
  console.log((await ig.account.changeProfilePicture((await axios.get('https://this-person-does-not-exist.com' + pbData.src, {responseType: 'arraybuffer'})).data)).status)
})();