import LoadActivities from "./loadActivities";
import fs from "fs";

//Filters activities from `./data/activities` and saves the ids of the bad ones to `./data/badActivityIds`

const activities = LoadActivities();

//These are my quick filters, but it would be easy to filter
// using distances to a start position or time
const badActivities = activities
    .filter(e=>e.external_id?.startsWith("garmin_ping"))
    .filter(e=>e.start_latlng[0] < 0)
    // Remove the most recent 2 since I know they are good
    .splice(2);

//Write the activities to `./data/badActivityIds`
const badActivityIds = badActivities.map(e => e.id);
fs.writeFile("data/badActivityIds", badActivityIds.join("\n"), (err) => {
    if (err) {
        console.error("Error writing to file:", err);
    } else {
        console.log(badActivities.length + " bad activity ids written to file successfully.");
    }
});

// const resources = activities.map(e=>{
//     if(!e.external_id)
//         return "";

//     let i = e.external_id.lastIndexOf("_");
//     return e.external_id.substring(0, i);
// })

// const types = Array.from(new Set(resources))

// let tally : any = {};
// types.forEach(e=>{
//     tally[e] = resources.filter(r=>r===e).length;
// })

// console.log(tally);
