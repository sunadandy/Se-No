import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
// import store from './store'

import { initializeApp } from 'firebase/app'

// createApp(App).use(store).use(router).mount('#app')
createApp(App).use(router).use(VueCookies).mount('#app')

// firebaseの設定ファイルは秘匿性の高い情報を含むので外部ファイルで定義
const firebaseConfig = require('./firebase');

// Initialize Firebase
initializeApp(firebaseConfig);