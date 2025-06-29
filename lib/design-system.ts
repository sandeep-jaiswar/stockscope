// Design System Configuration
export const designSystem = {
  // Color Palette
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
      950: '#052e16',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
      950: '#450a0a',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
  },

  // Typography Scale
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Spacing Scale
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem',
  },

  // Border Radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Component Variants
  components: {
    button: {
      variants: {
        primary: 'bg-primary-600 hover:bg-primary-700 text-white',
        secondary: 'bg-secondary-100 hover:bg-secondary-200 text-secondary-900',
        success: 'bg-success-600 hover:bg-success-700 text-white',
        warning: 'bg-warning-600 hover:bg-warning-700 text-white',
        error: 'bg-error-600 hover:bg-error-700 text-white',
        ghost: 'hover:bg-secondary-100 text-secondary-700',
        outline: 'border border-secondary-300 hover:bg-secondary-50 text-secondary-700',
      },
      sizes: {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
      },
    },
    card: {
      variants: {
        default: 'bg-white border border-secondary-200 shadow-base',
        elevated: 'bg-white border border-secondary-200 shadow-lg',
        outlined: 'bg-white border-2 border-secondary-300',
        ghost: 'bg-secondary-50 border border-secondary-100',
      },
    },
    input: {
      variants: {
        default: 'border-secondary-300 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-error-300 focus:border-error-500 focus:ring-error-500',
        success: 'border-success-300 focus:border-success-500 focus:ring-success-500',
      },
    },
  },

  // Animation & Transitions
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
} as const;

// Theme Context Types
export type Theme = 'light' | 'dark' | 'system';
export type ColorVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type Size = 'sm' | 'md' | 'lg' | 'xl';

// Utility functions for design system
export const getColorClass = (variant: ColorVariant, shade: number = 600) => {
  return `${variant}-${shade}`;
};

export const getSpacing = (size: keyof typeof designSystem.spacing) => {
  return designSystem.spacing[size];
};

export const getButtonClasses = (variant: keyof typeof designSystem.components.button.variants, size: keyof typeof designSystem.components.button.sizes = 'md') => {
  return `${designSystem.components.button.variants[variant]} ${designSystem.components.button.sizes[size]} font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2`;
};

export const getCardClasses = (variant: keyof typeof designSystem.components.card.variants = 'default') => {
  return `${designSystem.components.card.variants[variant]} rounded-2xl`;
};

export const getInputClasses = (variant: keyof typeof designSystem.components.input.variants = 'default') => {
  return `${designSystem.components.input.variants[variant]} block w-full rounded-lg px-3 py-2 text-sm placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-offset-2`;
};