import * as fs from "fs"

import {loadAccessCredentials} from "./conf"

//Fetches activities from strava and saves them to data/activities.json

const access = loadAccessCredentials();

async function loadPage(page: number, limit: number) {
    const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?per_page=${limit}&page=${page}`, {
        headers: [
            [`Authorization`, `Bearer ${access.access_token}`]
        ]
    });
    if(!response.ok) {
        console.dir(response, {depth: Infinity});
        throw new Error("Invalid response");
    }
    const activities = await response.json();
    return activities as any[];
}

;(async ()=>{
    let allActivities = [] as any[];
    let lastCount = 0;
    let page = 1;
    do{
        const activities = await loadPage(page, 200);
        console.log(`Loaded ${activities.length} activities for page ${page}`)
        page++;
        allActivities.push(...activities);
        lastCount = activities.length;
    }while(lastCount);

    fs.writeFileSync(`./data/activities.json`, JSON.stringify(allActivities))
    console.log(`Saved ${allActivities.length} activities`)
})()
    .catch(console.log)

// const payload = await strava.athlete.get({})
// console.log(payload)
