FROM node:16.13.0

WORKDIR .

ADD . .

# RUN rm -rf package-lock.json node_modules
RUN npm install npm
RUN npm install jquery
RUN npm install
# RUN npm install vue-template-compiler
# RUN npm install vue-router vuex vuex-persistedstate vue-cookies
# RUN npm install firebase
RUN npm run build

# コンテナ実行コマンドは $ docker run -d --name se-no_cont -p 8080:8080 -t se-no
CMD ["npm", "run", "serve"]
