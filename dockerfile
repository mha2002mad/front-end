FROM nginx:alpine
WORKDIR /usr/share/nginx/
COPY dist/ html/


WORKDIR /etc/nginx/conf.d/
RUN rm -fr default.conf
COPY nginx.conf .

RUN mkdir /etc/certs

EXPOSE 443
WORKDIR /usr/scripts/
COPY ENTRYPOINT.sh .
RUN chmod +x ENTRYPOINT.sh
ENTRYPOINT [ "/usr/scripts/ENTRYPOINT.sh" ]