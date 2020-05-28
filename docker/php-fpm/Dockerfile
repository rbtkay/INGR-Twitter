FROM php:fpm-alpine

COPY wait-for-it.sh /usr/bin/wait-for-it
# COPY test.sh /usr/bin/test.sh
# COPY test2.sh /usr/bin/test2.sh

RUN chmod +x /usr/bin/wait-for-it
# RUN chmod 777 /usr/bin/test.sh
# RUN chmod 777 /usr/bin/test2.sh

RUN apk --update --no-cache add git

RUN docker-php-ext-install pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# CMD composer install ; wait-for-it database:3306 -- bin/console doctrine:migrations:migrate ;  php-fpm

CMD composer install ; wait-for-it database:3306 -- bin/console doctrine:migrations:migrate ; php-fpm
#wait-for-it.sh database:3306 -- doctrine:migrations:migrate ; 
# openssl genrsa -aes256 -passout pass:"LeMeilleurGroupeCestINGR!" -out config/jwt/private.pem 4096 ; openssl rsa -in config/jwt/private.pem -passin pass:"LeMeilleurGroupeCestINGR!" -pubout -out config/jwt/public.pem
# openssl rsa -in privkey.pem -passin pass:foobar -pubout -out privkey.pub
# openssl genrsa -out config/jwt/private.pem -aes256 -passout pass:LeMeilleurGroupeCestINGR! 4096 ; openssl rsa -passin pass:LeMeilleurGroupeCestINGR! -pubout -in config/jwt/private.pem -out config/jwt/public.pem -R; chmod 644 config/jwt/private.pem ;  
# ; composer install ; test.sh ; test2.sh ; bin/console make:migration ;
#wait-for-it database:3306 -- bin/console make:migration ; bin/console doctrine:migrations:migrate ;  php-fpm

EXPOSE 9000
