import type { Config } from "tailwindcss";
import defaultTheme from 'tailwindcss/defaultTheme'


export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        melon: {
					'50': '#fef4f2',
					'100': '#ffe5e1',
					'200': '#ffc3ba',
					'300': '#feafa3',
					'400': '#fb806e',
					'500': '#f25841',
					'600': '#e03b22',
					'700': '#bc2e19',
					'800': '#9b2a19',
					'900': '#81281b',
					'950': '#461109',
        },
        secondary: '#1a1a1a'
      },
			fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      }
    },
  },
};
