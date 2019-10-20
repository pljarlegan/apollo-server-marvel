FROM node:10-slim

COPY ./ /home/node/app
WORKDIR /home/node/app

RUN rm -rf node_modules

RUN usermod -u 1000 node

RUN npm install --prefix /home/node/app

RUN touch /entrypoint.sh
RUN echo "#!/bin/bash" > /entrypoint.sh
RUN echo "npm run start --prefix /home/node/app" >> /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "-c", "/entrypoint.sh"]
