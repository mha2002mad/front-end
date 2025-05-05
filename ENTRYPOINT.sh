#!/bin/sh

echo "$pk" > /etc/certs/privkey.pem
echo "$fc" > /etc/certs/fullchain.pem

sudo chmod 600 /etc/certs/*.pem

sleep 4
exec nginx -g 'daemon off;'