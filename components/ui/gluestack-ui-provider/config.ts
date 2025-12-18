'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    /* Primary (Neutral UI actions) */
    '--color-primary-0': '179 179 179',
    '--color-primary-50': '153 153 153',
    '--color-primary-100': '128 128 128',
    '--color-primary-200': '115 115 115',
    '--color-primary-300': '102 102 102',
    '--color-primary-400': '82 82 82',
    '--color-primary-500': '51 51 51',
    '--color-primary-600': '41 41 41',
    '--color-primary-700': '31 31 31',
    '--color-primary-800': '13 13 13',
    '--color-primary-900': '10 10 10',
    '--color-primary-950': '8 8 8',

    /* Secondary (Cards / Surface) */
    '--color-secondary-0': '255 255 255',
    '--color-secondary-50': '250 251 252',
    '--color-secondary-100': '245 246 247',
    '--color-secondary-200': '240 241 242',
    '--color-secondary-300': '235 236 237',
    '--color-secondary-400': '230 231 232',
    '--color-secondary-500': '225 226 227',
    '--color-secondary-600': '210 211 212',
    '--color-secondary-700': '195 196 197',
    '--color-secondary-800': '180 181 182',
    '--color-secondary-900': '165 166 167',
    '--color-secondary-950': '150 151 152',

    /* Tertiary (Accent / Prayer Highlights) */
    '--color-tertiary-0': '232 245 233', // light green
    '--color-tertiary-50': '200 230 200',
    '--color-tertiary-100': '170 215 170',
    '--color-tertiary-200': '140 200 140',
    '--color-tertiary-300': '110 185 110',
    '--color-tertiary-400': '80 170 80',
    '--color-tertiary-500': '40 155 40', // primary green accent
    '--color-tertiary-600': '35 140 35',
    '--color-tertiary-700': '30 125 30',
    '--color-tertiary-800': '25 110 25',
    '--color-tertiary-900': '20 95 20',
    '--color-tertiary-950': '15 80 15',

    /* Error / Warning / Success / Info */
    '--color-error-500': '220 38 38',
    '--color-warning-500': '245 158 11',
    '--color-success-500': '16 185 129',
    '--color-info-500': '14 165 233',

    /* Typography */
    '--color-typography-950': '15 23 42',
    '--color-typography-700': '55 65 81',
    '--color-typography-500': '100 116 139',

    /* Outline / Divider */
    '--color-outline-200': '226 232 240',
    '--color-outline-300': '203 213 225',

    /* Background */
    '--color-background-0': '255 255 255', // main background
    '--color-background-50': '248 250 252', // card background
    '--color-background-100': '241 245 249',
    '--color-background-200': '226 232 240',

    /* Focus Ring / Indicator */
    '--color-indicator-primary': '40 155 40',
    '--color-indicator-info': '14 165 233',
    '--color-indicator-error': '220 38 38',
  }),

  dark: vars({
    /* Primary (Neutral UI actions) */
    '--color-primary-0': '200 200 200',
    '--color-primary-50': '180 180 180',
    '--color-primary-100': '160 160 160',
    '--color-primary-200': '140 140 140',
    '--color-primary-300': '120 120 120',
    '--color-primary-400': '100 100 100',
    '--color-primary-500': '80 80 80',

    /* Secondary (Cards / Surface) */
    '--color-secondary-0': '20 28 32',
    '--color-secondary-50': '30 40 50',
    '--color-secondary-100': '40 50 65',
    '--color-secondary-200': '50 60 80',

    /* Tertiary (Accent / Prayer Highlights) */
    '--color-tertiary-0': '15 50 15',
    '--color-tertiary-50': '20 70 20',
    '--color-tertiary-100': '25 90 25',
    '--color-tertiary-200': '30 110 30',
    '--color-tertiary-300': '40 140 40',
    '--color-tertiary-400': '60 170 60',
    '--color-tertiary-500': '80 200 80', // main green accent

    /* Error / Warning / Success / Info */
    '--color-error-500': '239 68 68',
    '--color-warning-500': '245 158 11',
    '--color-success-500': '16 185 129',
    '--color-info-500': '14 165 233',

    /* Typography */
    '--color-typography-950': '245 245 245',
    '--color-typography-700': '203 213 225',
    '--color-typography-500': '148 163 184',

    /* Outline / Divider */
    '--color-outline-200': '51 65 85',
    '--color-outline-300': '71 85 105',

    /* Background */
    '--color-background-0': '10 15 25',
    '--color-background-50': '20 28 40',
    '--color-background-100': '30 38 55',

    /* Focus Ring / Indicator */
    '--color-indicator-primary': '80 200 80',
    '--color-indicator-info': '14 165 233',
    '--color-indicator-error': '239 68 68',
  }),
};
