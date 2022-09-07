FROM node:16.13.0

WORKDIR /se-no

COPY . /se-no/

RUN npm install
RUN npm run build

CMD ["npm", "run", "serve"]
