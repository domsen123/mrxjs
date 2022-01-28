import type { Context } from 'vite-ssr/vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';

export const install = ({ app }: Context) => {
  const vuetify = createVuetify({
    components,
  });
  app.use(vuetify);
};
