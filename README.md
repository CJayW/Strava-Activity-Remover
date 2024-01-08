# Removing strava activities
This is a repo of code I used to rename all strava activities that were added by mistake. 

This was quickly put together with little intent to use again.

The scripts described in the Workflow section will eventually produce a list of bad activities, then change there names to "Not Me".  They can then quickly be deleted manually as described in the `Actually Deleting` section

## Selecting mistaken activities
I accidently uploaded the activities by connecting a second hand garmin device that had previous activities saved, that were then transfered.  I used the following check
 - External ID begain with Garmin
 - Southern Himisphere
 - Not the previous 2

These could be easily changed in the `getBadActivities` file

# OAuth
First, configure a app in the strava settings using `strava.com/settings/api`, the callback can be localhost

For the required permissions, navigate to the following in the browser then copy the code out of the redirect link once authorize is clicked with the permissions `http://www.strava.com/oauth/authorize?client_id=[ID GOES HERE]&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all,activity:write`
*/

# .env
Only used for the `getAccessCode` script

Make a file called .env like the following.

~~~env
STRAVA_CLIENT_ID="CLIENT_ID"
STRAVA_CLIENT_SECRET="CLIENT_SECRET"
STRAVA_AUTH_CODE="AUTH_CODE(See OAuth)"
~~~

# Workflow
Most files in `src` can be ran with ts-node for different functions.

Intended to be ran in the following order using ts-node

## getAccessCode
Fill in the .env file and run this script to save the access credentials for further scripts

## fetchActivities
Fetches all activities for an athlete using the access credentails, saves them as a json file in `data/activities.json`

This will load all activities over multiple fetches, one per page with 200 items per page.

## getBadActivites
This is the script that filters the saved activities and makes a list of ids that should be removed, saves them to badActivityIds

## putActivityUpdates
By default, lists details for all bad activities for manual checks, and updates there name using the API to "Not Me" immediatly

It should not do the name update by default, there is a `if(false)` statement blocking it to prevent accidents

Completed activities will have their ids saved to a `./data/done`

# Actually Deleting
Once the names have been updated, they can be deleted on the website quickly.

Navigate to `https://www.strava.com/athlete/training` and search for "Not Me"

Open the console and run the following one liner
~~~js
Array.from(document.querySelectorAll("a[data-field-name=name]")).filter(e=>e.innerHTML === "Not Me").map(e=>e.parentElement.parentElement.querySelector(".delete")) // .map(e=>e.click())
~~~

This will find all the rows with the name "Not Me" and click the delte button.  Only un-comment the final map and click once you are sure its selecting the correct thing. This cannot be undone.
