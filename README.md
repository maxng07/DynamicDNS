# Dynamic DNS
A Dynamic DNS Service built using Cloudflare AuthDNS and Workers. Allows a hostname to be updated whenever the dynamic IP address changes (assigned by DHCP). For hosting application behind a home broadband. A home router ddns client can be configured to send update to Cloudflare Workers whenever the IP lease changes. Worker will then parse the incoming Client-IP and update the DNS record on Cloudflare DNS using Cloudflare API.

Testing has been done with 2Wire Home Router with no-ip and dyndns config and configured to send to Cloudflare Workers webhook URL. The author would welcome feedback of other Home Routers that integrate well with the Worker's code.

Using Cloudflare AuthDNS as Dynamic DNS has multiple configuration possibilities, one of the commonly found on the internet is have a script running behind the Home Gateway and updates Cloudflare AuthDNS whenever the IP changes (new DHCP lease) using cloudflare API. This method uses a Cloudflare Workers (which comes with a free tier for Free Plan). Either the ddns client on the Home Gateway can send update to Cloudflare Workers whenever the IP changes or a device behind the network can perform a GET request to the Worker. The Workers will then update the DNS record using Cloudflare API.

2 supplied Workers script is available here
1. cf_worker_dynupdate-without-authorization.js - performs update on the DNS Record using the visiting ClientIP address without performing any checks.
2. cf_worker_ddns-authorization.js - perform checks on the Authorization header set by the ddns client, if the username and password matches, perform an update on DNS record using API. Comparison of username and password is case sensitive.

Depending on setup, you can use either of the Worker script.

To start, you need to have a Cloudflare Account, configure the DNS Record with a fictitious IP address and set to DNS (non proxied mode or Grey color).
1. Create API token and email address used for API consumption on your account
2. Obtain your DNS Zone-ID and DNS-Record ID by using (1) to list your DNS records on your zone. For more details, refer <a href="https://api.cloudflare.com/#dns-records-for-a-zone-list-dns-records"> here </a>  
3. Either use the Environment variable to store API token and email address or have it hardcoded into the script as "" string value. If you choose the later, ensure you have "" string code. I personally prefer not to have sensitive information hardcode on script and facilitate future change. To set environment variable, go to Worker, generate a new worker in the dashboard console, you will see a unique Webhook URL. Under Setting, you can defined the environment variable for this worker. Copy and paste either worker script found here in the edit mode. Fill in the details of the DNS API URL with DNS-zone-ID and DNS-record-ID obtain in (2).
4. You can also use Environment variable to store your ddns username and password you configure in your Home Gateway, or have it hardcoded into the Worker script.
5. Copy the Webhook URL and you can use this in your ddns setting in your Home Gateway. Most Home Gateway ddns client only support HTTP/80.
6. Either unplug and plug back the Internet cable or reset your Home Gateway. It should send a HTTP GET request to the Cloudflare Worker webhook URL. 
7. To verify, perform a dig or nslookup to the DNS record, it should now be updated to the external Public IP address of the Home Gateway.

Contributors welcome to test and add other Home Gateway that may be different in the way HTTP/S request is send for IP updates.

## Reference
1. no-ip <a href="https://www.noip.com/integrate/request"> ddns protocol </a>
2. Dyndns <a href="https://help.dyn.com/remote-access-api/perform-update/"> protocol </a> spec
3. <a href="https://tools.ietf.org/html/rfc2617"> RFC2617 </a> Section 2 


