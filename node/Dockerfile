FROM node:10-alpine

COPY ./ /home/node/app
WORKDIR /home/node/app

RUN rm -rf node_modules

RUN npm install --prefix /home/node/app

RUN touch /entrypoint.sh
RUN echo "#!/bin/sh" > /entrypoint.sh
RUN echo "npm run start --prefix /home/node/app" >> /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/sh", "-c", "/entrypoint.sh"]
