addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


/**
 * Validate dynamic update request and update API if passed
 */
async function handleRequest(request) {
const clientIP = request.headers.get("CF-Connecting-IP")

var url = "https://api.cloudflare.com/client/v4/zones/{fill in zone-ID}/dns_records/{fill in DNS_record-ID}"
var Body = {
  "zone_name": "example.com", //your zone name goes here
  "name": "apple", //the DNS record to be updated
  "type": "A", // the type of record
  "content": clientIP,
  "proxied": false,
  "ttl": 60 // changing to more optimum value without taxing AuthDNS
}
var myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json;charset=UTF-8')
      myHeaders.append('X-Auth-Key', API_KEY) //using predefined Environment variable
      myHeaders.append('X-Auth-Email', EMAIL) //using predefined Environment variable
var init = {
    body: JSON.stringify(Body),
    method: "PUT",
    headers: myHeaders
  }
//if (decode == test) {
const response = await fetch(url, init)
console.log(response)
return new Response(response.body)
 // }
}
