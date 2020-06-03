#!/bin/sh

if ! test -f "config/jwt/private.pem" || ! test -f "config/jwt/public.pem"; then
    openssl genrsa -out config/jwt/private.pem -aes256 -passout pass:$JWT_PASSPHRASE 4096
    openssl rsa -passin pass:$JWT_PASSPHRASE -pubout -in config/jwt/private.pem -out config/jwt/public.pem
    chmod 644 config/jwt/private.pem
fi

composer install
crond
php-fpm
