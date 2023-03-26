# TELUS - Pizza

A dockerized version of the application is running at https://telus.lefan.me

A mongoexpress interface for mongodb is running at https://mongoexpress.lefan.me

**Note:**
Due to my docker container having a different default timezone that can't be changed with a regular environment variable, orders for pizzas a few hours into the future will
be rejected :(

## Assumptions
- Orders can't be placed in the past (from point of view of container)
- Same names with different phone numbers are different individuals

## Reflections
- Really wanted a cleaner way to deal with toppings that isn't just 3 booleans :( Due to my unfamiliarity with html, I was unable to get the form inputs to work in the way I wanted...
- Wasn't sure if I should check the length of phone numbers as there are certain numbers outside of the normal range
- Could not for the life of me align the Name and Phone Number input boxes :(
- Could have include extra considerations such as: Pizza size, payment type, etc.

## Technology Stack

**MongoDB:**
- Mongoose is the chosen ORM for interaction with the database
- NOsql was chosen for overall compatibility with json
- Hosted on same server as web-app container
- Users and Orders are different collections associated by \_id

**Next.js**
- Chosen because I've never used typescript before and wanted to learn it

**Docker:**
- Core tool towards connecting multiple different backend servers together
- Docker network connects everything

**SWAGGER:**
- Reverse proxies web-app through my domain (lefan.me)
- Runs in docker container and shares a network with MongoDB and web-app

Below is my swagger proxy-conf:
```yaml
# telus.subdomain.conf
server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name telus.*;

    include /config/nginx/ssl.conf;

    client_max_body_size 0;
    proxy_redirect off;
    proxy_buffering off;

    # enable for ldap auth, fill in ldap details in ldap.conf
    #include /config/nginx/ldap.conf;

    # enable for Authelia
    # include /config/nginx/authelia-server.conf;
    location / {
        # enable the next two lines for http auth
        # auth_basic "Restricted";
        # auth_basic_user_file /config/nginx/.htpasswd;

        # enable the next two lines for ldap auth
        #auth_request /auth;
        #error_page 401 =200 /ldaplogin;

        # enable for Authelia
        # include /config/nginx/authelia-location.conf;

        include /config/nginx/proxy.conf;
        include /config/nginx/resolver.conf;
        set $upstream_app telus;
        set $upstream_port 3000;
        set $upstream_proto http;
        proxy_pass $upstream_proto://$upstream_app:$upstream_port;
    }
}
```


## Scenario Description

We’re setting up a new pizza ordering system.
 
We want users to go to our website and enter:
·         Their name and phone number
·         When they want their pizza (date and time)
·         If they want “Delivery” or “Pickup”
o   If it’s delivery they need to enter their address
·         What toppings they want (users can select upto 3 toppings):
o   Pepperoni
o   Mushrooms
o   Black Olives
o   Pineapple
 
Our employees would also need a web page that lists the user's name/phone number and when they want their food, sorted by when they want it, and selecting one of the items in the list would show a page with all the details.

## Requirements

1. Users are able to order pizza with restrictions
- No more than 3 toppings
2. Dashboard for information on orders and details of pizza. Some required information.
- time of order, scheduled delivery time, date, order type, order status (ready/preparing), (delivery or pickup), delivery status (delivered/on the way), name, phone number, delivery address

## Resources
- [mongodb integration example repo](https://github.com/mongodb-developer/mongodb-typescript-example)
- [next.js form examples](https://github.com/vercel/next.js/tree/canary/examples/next-forms)
- [next.js with mongoose](https://github.com/vercel/next.js/tree/canary/examples/with-mongodb-mongoose)
- [next.js documentation/guides](https://nextjs.org/docs/guides/building-forms)
- [buiding forms with next.js](https://nextjs.org/docs/guides/building-forms)
- [mongoose schema definition format](https://mongoosejs.com/docs/schematypes.html#)
- [mongodb add users](https://www.mongodb.com/docs/v4.4/tutorial/create-users/)
- [Datetime comparisons](https://stackabuse.com/compare-two-dates-in-javascript/)
