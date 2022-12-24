function withOpacityValue(variable) {
  return ({opacityValue}) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'),
        contrast: withOpacityValue('--color-contrast'),
        success: withOpacityValue('--color-success'),
        danger: withOpacityValue('--color-danger'),
        warning: withOpacityValue('--color-warning'),
      },
      fontSize: {
        heading: ['var(--font-size-heading)', '1.25'],
        subheading: ['var(--font-size-subheading)', '1.25'],
        label: ['var(--font-size-label)', '1.1'],
        lead: ['var(--font-size-lead)', '1.333'],
        copy: ['var(--font-size-copy)', '1.5'],
        fine: ['var(--font-size-fine)', '1.333'],
      },
    },
  },
  plugins: [],
}
