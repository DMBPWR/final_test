/**
 * Tailwind CSS configuration file
 *
 * docs: https://tailwindcss.com/docs/configuration
 * default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const path = require('path');

module.exports = {
    theme: {
        screens: {
            'sm': '568px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1440px',
        },
        container: {
            center: true,
        },
        important: true,
        fontFamily: {
            'gt-super-light': ['GTSuperLight', 'sans-serif'],
            'gt-super-light-italic': ['GTSuperLightItalic', 'sans-serif'],
            'gt-super-medium': ['GTSuperMedium', 'sans-serif'],
            'gt-super-medium-italic': ['GTSuperMediumItalic', 'sans-serif'],
            'gt-super-book': ['GTSuperTextBook', 'sans-serif'],
            'gt-super-book-italic': ['GTSuperTextBookItalic', 'sans-serif'],
            'platform-regular': ['PlatformRegular', 'sans-serif'],
            'platform-medium': ['PlatformMedium', 'sans-serif']
        },
        colors: {
            inherit: 'inherit',
            transparent: 'transparent',
            white: '#ffffff',
            black: '#000000',
            beige: '#F4EDE5',
            paleblue: '#85ABBD'
        },
    },
    plugins: [
        function ({addComponents}) {
            addComponents({
                '.container': {
                    maxWidth: '100%',

                    '@screen sm': {
                        maxWidth: '568px',
                    },
                    '@screen md': {
                        maxWidth: '768px',
                    },
                    '@screen lg': {
                        maxWidth: '1240px',
                    },
                    '@screen xl': {
                        maxWidth: '1360px',
                    },
                }
            })
        }
    ],
    content: [
        path.resolve(__dirname, '**/*.{js,vue}'),
        path.resolve(__dirname, '../shopify/**/*.liquid')
    ]
}