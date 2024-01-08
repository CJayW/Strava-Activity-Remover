import { SaveAccessCredentials } from "./conf"

//Uses the credentials in the .env file to get a temp
// access code for a user

//See README.md #OAuth and #.env for more info

require('dotenv').config();

const conf = {
    auth_code: process.env.STRAVA_AUTH_CODE as string,
    client_id: process.env.STRAVA_CLIENT_ID as string,
    client_secret: process.env.STRAVA_CLIENT_SECRET as string,
};

;(async ()=>{
    const params = new URLSearchParams({
        client_id: `${conf.client_id}`,
        client_secret: `${conf.client_secret}`,
        code: `${conf.auth_code}`,
        grant_type: `authorization_code`,
    })

    const response = await fetch(`https://www.strava.com/api/v3/oauth/token?${params.toString()}`, {
        method: "POST",
    });
    const access = await response.json() as any;
    console.log(access);
    SaveAccessCredentials({
        access_token: access.access_token,
        refresh_token: access.refresh_token,
        expires_at: access.expires_at,
    });
    console.log("Saved access credentails with exp", access.expires_at)
})()
    .catch(console.log)
