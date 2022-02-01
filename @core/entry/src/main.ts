import './assets/styles/app.css';
import viteSsr from 'vite-ssr/vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';

const routes = [{ path: '/', component: () => import('./pages/Page.vue') }];

export default viteSsr(App, { routes }, async (ctx) => {
  Object.values(import.meta.globEager('./modules/*.ts')).forEach((i) =>
    i.install?.(ctx),
  );
  const { app } = ctx;

  const head = createHead();
  app.use(head);
  return { head };
});
