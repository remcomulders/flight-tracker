import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';
import sharedConfig from '@repo/tailwind-config/tailwind.config';

const config: Pick<Config, 'prefix' | 'presets' | 'content' | 'plugins'> = {
  content: ['./src/**/*.tsx'],
  prefix: 'ui-',
  presets: [sharedConfig],
  plugins: [tailwindcssAnimate],
};

export default config;
