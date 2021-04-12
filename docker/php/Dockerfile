FROM php:8.0-fpm

RUN apt-get update -y && apt-get install -y git

RUN docker-php-ext-install pdo_mysql

COPY --from=composer /usr/bin/composer /usr/bin/composer

# Install XDebug
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Configure xdebug
RUN echo '\
xdebug.mode=debug\n\
xdebug.discover_client_host=true\n\
xdebug.client_host=host.docker.internal\n\
' >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# Increase memory limit
RUN echo 'memory_limit = 4G' >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini;

WORKDIR /var/www/2mdp