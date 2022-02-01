import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.min.css';
import type { VueSsrContext } from '@mrx/entry';

export * from './layouts';

export { default as MrxApp } from './MrxApp.vue';

export default ({ app }: VueSsrContext) => {
  app.use(Antd);
};
