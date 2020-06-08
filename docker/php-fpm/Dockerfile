FROM php:fpm-alpine

COPY wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

COPY entrypoint.sh /entrypoint 
RUN chmod +x /entrypoint

RUN mkdir /etc/periodic/10min/
COPY cron-update.sh /etc/periodic/10min/cron-update
RUN chmod +x /etc/periodic/10min/cron-update
RUN echo -e "*/10\t*\t*\t*\t*\trun-parts /etc/periodic/10min" >> /etc/crontabs/root

RUN apk --update --no-cache add git

RUN docker-php-ext-install pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

CMD /usr/bin/wait-for-it database:3306 -- ./bin/console make:migration; ./bin/console doctrine:migrations:migrate; /entrypoint;

EXPOSE 9000
