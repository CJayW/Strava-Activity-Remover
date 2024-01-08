
import fs from "fs"

//Used for saving and loading access credentials

export type AccessCredentials = {
    access_token: string,
    refresh_token: string,
    expires_at: number,
}

const accessCredsPath = "./data/access.json"
export function loadAccessCredentials() : AccessCredentials{
    try{
        //We could double check the exp here
        // but it may lead to more issues with device time
        return JSON.parse(fs.readFileSync(accessCredsPath).toString());
    }catch(e) {
        console.error("Error reading access credentials", e);
        throw new Error("Failed to read access credentials");
    }
}
export function SaveAccessCredentials(
    access : AccessCredentials,
) {
    fs.writeFileSync(accessCredsPath, JSON.stringify(access))
}
