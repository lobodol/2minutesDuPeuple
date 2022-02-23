FROM newdeveloper/apache-php

COPY vhost.conf /etc/apache2/sites-available/2mdp.conf

RUN apt-get update -y &&  apt-get upgrade -y
RUN echo "127.0.0.1 dev.les2minutesdupeuple.xyz" >> /etc/hosts

RUN a2dismod php7.4 mpm_prefork
RUN a2enmod proxy proxy_fcgi mpm_worker proxy_http2 headers expires ssl
RUN a2dissite 000-default
RUN a2ensite 2mdp

RUN openssl req -new -newkey rsa:4096 -days 3650 -nodes -x509 -subj \
    "/C=FR/ST=Bretagne/L=Auray/O=NA/CN=dev.les2minutesdupeuple.xyz" \
    -keyout /etc/ssl/certs/2mdp.key -out /etc/ssl/certs/2mdp.crt
