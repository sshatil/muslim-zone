'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    /* Background */
    '--color-background-0': '251 249 245', // #FBF9F5
    '--color-background-50': '251 249 245',
    '--color-background-100': '245 243 240',
    '--color-background-200': '254 214 91',

    /* Primary (Dark green base) */
    '--color-primary-500': '0 53 39', // #003527
    '--color-primary-600': '0 45 33',
    '--color-primary-700': '0 35 28',

    /* Secondary (Cards / Surface) */
    '--color-secondary-0': '0 53 39', // card bg
    '--color-secondary-50': '10 65 50',
    '--color-secondary-100': '20 75 60',

    /* Accent / Highlight */
    '--color-tertiary-500': '254 214 91', // #FED65B
    '--color-tertiary-400': '255 220 120',
    '--color-tertiary-600': '230 190 70',

    /* Typography */
    '--color-typography-950': '0 53 39', // main text
    '--color-typography-700': '40 70 60',
    '--color-typography-500': '90 110 100',

    /* Outline */
    '--color-outline-200': '220 220 220',
    '--color-outline-300': '200 200 200',

    /* Status */
    '--color-success-500': '16 185 129',
    '--color-error-500': '220 38 38',
    '--color-warning-500': '245 158 11',
    '--color-info-500': '14 165 233',

    /* Indicator */
    '--color-indicator-primary': '254 214 91',
  }),

  dark: vars({
    /* Background */
    '--color-background-0': '0 26 20', // #001A14
    '--color-background-50': '5 35 28',
    '--color-background-100': '10 45 35',

    /* Primary */
    '--color-primary-500': '254 214 91', // gold accent
    '--color-primary-600': '230 190 70',

    /* Secondary (Card background) */
    '--color-secondary-0': '6 78 59', // #064E3B
    '--color-secondary-50': '10 90 70',
    '--color-secondary-100': '15 100 80',

    /* Accent */
    '--color-tertiary-500': '254 214 91',
    '--color-tertiary-400': '255 220 120',

    /* Typography */
    '--color-typography-950': '254 214 91', // gold text
    '--color-typography-700': '220 200 140',
    '--color-typography-500': '180 170 120',

    /* Outline */
    '--color-outline-200': '50 80 70',
    '--color-outline-300': '70 100 90',

    /* Status */
    '--color-success-500': '16 185 129',
    '--color-error-500': '239 68 68',
    '--color-warning-500': '245 158 11',
    '--color-info-500': '14 165 233',

    /* Indicator */
    '--color-indicator-primary': '254 214 91',
  }),
};
