FROM nginx:1.21.0-alpine
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/
EXPOSE 80
EXPOSE 443

ARG CERTBOT_EMAIL=ghettohustlers256@gmail.com
ARG DOMAIN_LIST=ghettohustler.com

RUN  apt-get update \
      && apt-get install -y cron certbot python-certbot-nginx bash wget \
      && certbot certonly --standalone --agree-tos -m "${CERTBOT_EMAIL}" -n -d ${DOMAIN_LIST} \
      && rm -rf /var/lib/apt/lists/* \
      && echo "PATH=$PATH" > /etc/cron.d/certbot-renew  \
      && echo "@monthly certbot renew --nginx >> /var/log/cron.log 2>&1" >>/etc/cron.d/certbot-renew \
      && crontab /etc/cron.d/certbot-renew

VOLUME /etc/letsencrypt


CMD [ "sh", "-c", "cron && nginx -g 'daemon off;'" ]