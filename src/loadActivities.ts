import * as fs from "fs"

// Used to cache activities locally instead of fetching
// them from strava every time

type Activity = {
    "name": string,
    "distance": number,
    "moving_time": number,
    "elapsed_time": number,
    "total_elevation_gain": number,
    "type": "Ride" | string,
    "sport_type": "Ride" | string,
    "id": 10489934452,
    "start_date": string, //"2024-01-03T04:22:34Z"
    "start_date_local": string, //"2024-01-03T15:22:34Z"
    "timezone": string, //"(GMT+10:00) Australia/Melbourne",
    "utc_offset": number, //39600
    "private": boolean,
    "visibility": string, //"everyone",
    "start_latlng": [number, number],
    "end_latlng": [number, number],
    "average_speed": string,
    "max_speed": string,
    "upload_id": string,
    "upload_id_str": string,
    "external_id": string,
}

function LoadActivities() {
    const activities = JSON.parse(
        fs.readFileSync(`./data/activities.json`, {encoding: "utf8"})
    ) as Activity[];
    return activities;
}

export default LoadActivities;
export type {
    Activity
}
