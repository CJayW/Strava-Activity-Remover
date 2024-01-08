import fs from "fs"
import LoadActivities from "./loadActivities"

import { loadAccessCredentials } from "./conf"

//Loads the bad activities
const badActivityIds = fs.readFileSync("./data/badActivityIds").toString()
    .split("\n")
    .map(e=>Number(e))
    .filter(e=>!isNaN(e))

const activities = LoadActivities();

const badActivities = activities.filter(e=>badActivityIds.includes(e.id));

const access = loadAccessCredentials();

//Update activity name
async function UpdateActivityName(id : number, name : string) {
    console.log("Updating ", id)
    const res = await fetch(`https://www.strava.com/api/v3/activities/${id}?name=${name}`, {
        method: "PUT",
        headers: [
            [`Authorization`, `Bearer ${access.access_token}`]
        ],
    })
    if(res.ok)
        console.log("Updated activity");
    else
        console.log("Failed to update activity with id", id)

    const data = await res.json() as any;
    if(data.device_name !== 'Garmin Edge 520')
        console.error("Possible mistake with", id);

    return res.ok;
}

console.log(`Displaying ${badActivities.length} bad activities`);
//List all bad activities for basic manual checking
console.table([
    ...badActivities.map(e=>[
        e.id, e.external_id, e.start_date, e.start_latlng[0]
    ]) as any[]
])

//Set to true to updata all bad activities names to "Not Me"
if (false) {
    ;(async ()=>{
        for(let i = 0; i < badActivities.length; i++) {
            const id = badActivities[i].id;
            if(!await UpdateActivityName(id, "Not Me")) {
                console.error("Failed, exiting");
                return;
            }
            fs.appendFileSync("./data/done", `${id}\n`);
        }
    })()
}
