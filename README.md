# DynamicDNS
A Dynamic DNS Service built using Cloudflare AuthDNS and Workers. Allows a hostname to be updated whenever the dynamic IP address changes (assigned by DHCP). For hosting application behind a home broadband. A home router ddns client can be configured to send update to Cloudflare Worker whenever the IP lease changes. Worker will then parse the incoming Client-IP and update the hostname on Cloudflare DNS using Cloudflare API.

Tested on 2Wire Router with no-ip and dyndns config but configured with Cloudflare Worker unique FQDN.

# This is no longer working, seems like support to update DNS record via API is removed, at least for my free plans.
