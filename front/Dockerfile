FROM node:16.13.0

WORKDIR .

ADD . .

RUN rm -rf package-lock.json node_modules
RUN npm install npm
RUN npm install @vue/cli
RUN npm install @vue/cli-service
RUN npm install @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-plugin-eslint
RUN npm install vue-template-compiler
RUN npm install vue-router vuex vuex-persistedstate vue-cookies
RUN npm install firebase

# コンテナ実行コマンドは $ docker run -d --name se-no_cont -p 8080:8080 -t se-no
CMD ["npm", "run", "serve"]
