import { defineConfig } from '@vue/cli-service';

export default defineConfig({
    // eslint-disable-next-line no-undef
    publicPath: process.env.NODE_ENV === 'production' ? '/sakai-vue-master/' : './'
});
