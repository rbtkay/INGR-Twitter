#!/bin/sh

(cd /var/www/; bin/console update:keyword)

echo "The Cron is executed at " $(date) >> /var/www/test-result/result.txt

