import './assets/main.css';
import 'material-icons/iconfont/material-icons.css';
import 'highlight.js/styles/github.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { getModelList } from './api';
import { useModelsStore } from './stores/models';
import { useChatStore } from './stores/chat';

const app = createApp(App);

app.use(createPinia()).use(router).mount('#app');

const modelsStore = useModelsStore();
const chatStore = useChatStore();

chatStore.init();
modelsStore.init();
