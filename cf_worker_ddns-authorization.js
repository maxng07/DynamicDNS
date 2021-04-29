addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


/**
 * Validate dynamic update request and update API if passed
 */
async function handleRequest(request) {
const clientIP = request.headers.get("CF-Connecting-IP")
const namepwd = request.headers.get("Authorization")
/*
* For error handling, if the Worker Script receive a request with missing Authorization hdr will not panic
*/
var str = ""
if (namepwd === null ) {
  str = ""
} else {
  str = namepwd.substr(6) //Strip the value to have only username + password
}

var decode = atob(str) // base64 decode 
var test = USERNAME + ":" + PASSWORD // the username and password set on the ddns client

var url = "https://api.cloudflare.com/client/v4/zones/{fill in zone-ID}/dns_records/{fill in DNS_record-ID}"

var Body = {
  "zone_name": "example.com", //name of your zone
  "name": "apple.example.com", //DNS record to update
  "type": "A",
  "content": clientIP,
  "proxied": false,
  "ttl": 180
}

var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json;charset=UTF-8')
      myHeaders.append('X-Auth-Key',API_KEY) //the API token is predefined in Envuronment variable
      myHeaders.append('X-Auth-Email',EMAIL) //the email is predefined in Environemnt variable

var init = {
    body: JSON.stringify(Body),
    method: "PUT",
    headers: myHeaders
  }

result = decode.localeCompare(test, {sensitivity: "case"})

if (result === 0) {
const response = await fetch(url, init)
return new Response(response.body)
  }
return new Response("authentication missing", {status: 403})
}
