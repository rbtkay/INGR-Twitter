FROM php:fpm-alpine

COPY wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

COPY entrypoint.sh /entrypoint 
RUN chmod +x /entrypoint

RUN mkdir /etc/periodic/1min/
COPY Great-test.sh /etc/periodic/1min/Great-test
RUN chmod +x /etc/periodic/1min/Great-test
# COPY test2.sh /usr/bin/test2.sh
RUN echo -e "*\t*\t*\t*\t*\trun-parts /etc/periodic/1min" >> /etc/crontabs/root

# RUN chmod 777 /usr/bin/test2.sh

RUN apk --update --no-cache add git

RUN docker-php-ext-install pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD /usr/bin/wait-for-it database:3306 -- ./bin/console doctrine:migrations:migrate; /entrypoint;

EXPOSE 9000
