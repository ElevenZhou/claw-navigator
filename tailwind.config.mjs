/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#0A0A0F',
          card: '#16161F',
          'card-hover': '#1E1E2A',
        },
        text: {
          primary: '#E8E8ED',
          secondary: '#9898A6',
          muted: '#5A5A6E',
        },
        accent: {
          DEFAULT: '#FF6B35',
          secondary: '#4ECDC4',
        },
        border: {
          DEFAULT: '#2A2A3A',
          hover: '#3A3A4A',
        },
        vendor: {
          opensource: '#636E72',
          tencent: '#07C160',
          alibaba: '#FF6A00',
          baidu: '#2932E1',
          bytedance: '#3370FF',
          minimax: '#E84393',
          zhipu: '#6C5CE7',
          moonshot: '#00B894',
          xiaomi: '#FF6900',
          huawei: '#CF0A2C',
          wind: '#FDCB6E',
          qiniu: '#2D9CDB',
          stepfun: '#A29BFE',
          cm: '#00CEC9',
          community: '#B2BEC3',
          oppo: '#1D8348',
        },
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
