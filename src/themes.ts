import { extendTheme } from '@chakra-ui/react';

const slateBlueTheme = extendTheme({
  colors: {
    brand: {
      // A cool slate blue palette, ideal for a soft, professional look.
      50: '#f7f9fc',
      100: '#e1e7f0',
      200: '#c3cfdf',
      300: '#a4b7ce',
      400: '#869fbd',
      500: '#6887ac',
      600: '#54709a',
      700: '#405a87',
      800: '#2c4575',
      900: '#182f62',
    },
    accent: {
      // A warm orange palette that nicely contrasts with slate blue.
      50: '#fff7f0',
      100: '#fdebdc',
      200: '#fbd7b9',
      300: '#f8c495',
      400: '#f5b272',
      500: '#f2a04f',
      600: '#d9883d',
      700: '#b0702c',
      800: '#8e5820',
      900: '#6b4214',
    },
    background: {
      // Light background colors to keep the overall vibe soft.
      primary: '#f4f7fc',
      secondary: '#dce3f3',
    },
    delete: {
      // A clear, alerting red for delete actions.
      500: '#e63946',
      600: '#cc2936',
      700: '#b22222',
    },
    text: {
      primary: '#1a1a1a', // Dark text for readability.
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'brand.500',
            _hover: { borderColor: 'brand.600' },
            _focus: {
              borderColor: 'brand.600',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-600)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
        focusBorderColor: 'brand.600',
      },
    },
    Table: {
      // Set the table divider borders to use the brand color.
      variants: {
        simple: {
          th: { borderColor: 'brand.500' },
          td: { borderColor: 'brand.500' },
        },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'background.primary',
        color: 'text.primary',
        lineHeight: '1.6',
      },
      thead: {
        backgroundColor: 'background.secondary',
      },
    },
  },
});

const darkTheme = extendTheme({
  colors: {
    brand: {
      // A neutral gray palette for a dark, modern feel.
      50: '#e4e4e4',
      100: '#b8b8b8',
      200: '#8c8c8c',
      300: '#707070',
      400: '#595959',
      500: '#444444',
      600: '#363636',
      700: '#2b2b2b',
      800: '#1f1f1f',
      900: '#121212',
    },
    accent: {
      // A cooler blue palette to add contrast and highlight interactions.
      50: '#eaf2ff',
      100: '#cbdcff',
      200: '#adc6ff',
      300: '#8fb0ff',
      400: '#709aff',
      500: '#527aff',
      600: '#4162e6',
      700: '#324dcc',
      800: '#2439b3',
      900: '#182799',
    },
    background: {
      // Deep dark backgrounds for the overall dark look.
      primary: '#1a1a1a',
      secondary: '#2b2b2b',
    },
    delete: {
      // A bright red that pops against dark backgrounds.
      500: '#ff4444',
      600: '#dd3333',
      700: '#bb2222',
    },
    text: {
      primary: '#f0f0f0', // Light text for clear contrast.
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'accent.500',
            _hover: { borderColor: 'accent.600' },
            _focus: {
              borderColor: 'accent.600',
              boxShadow: '0 0 0 1px var(--chakra-colors-accent-600)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
        focusBorderColor: 'accent.600',
      },
    },
    Table: {
      // Using the accent color for table dividers to tie into the overall blue hints.
      variants: {
        simple: {
          th: { borderColor: 'accent.500' },
          td: { borderColor: 'accent.500' },
        },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'background.primary',
        color: 'text.primary',
        lineHeight: '1.6',
      },
      thead: {
        backgroundColor: 'background.secondary',
      },
    },
  },
});

const cyberpunkTheme = extendTheme({
  colors: {
    brand: {
      // Bold neon purples and blues for a futuristic, cyberpunk vibe.
      50: '#ff00ff',
      100: '#d400ff',
      200: '#aa00ff',
      300: '#7f00ff',
      400: '#5500ff',
      500: '#0022ff',
      600: '#0020cc',
      700: '#001d99',
      800: '#001b66',
      900: '#001833',
    },
    accent: {
      // Deep cyans that support the neon look.
      50: '#00ffff',
      100: '#00d4d4',
      200: '#00aaaa',
      300: '#007f7f',
      400: '#005555',
      500: '#003333',
      600: '#002222',
      700: '#001111',
      800: '#000808',
      900: '#000404',
    },
    background: {
      // True black with a slightly lighter secondary background.
      primary: '#000000',
      secondary: '#111111',
    },
    delete: {
      // A bright magenta‐red to signal delete actions.
      500: '#ff00aa',
      600: '#cc0088',
      700: '#990066',
    },
    text: {
      primary: '#D4FF00', // Light text for legibility against dark backgrounds.
    },
    // Additional token for neon accents.
    neonGreen: '#39FF14',
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            // Using neonGreen to give inputs that futuristic glow.
            borderColor: 'neonGreen',
            _hover: { borderColor: 'neonGreen' },
            _focus: {
              borderColor: 'neonGreen',
              boxShadow: '0 0 0 1px var(--chakra-colors-neonGreen)',
            },
          },
        },
      },
      defaultProps: {
        variant: 'outline',
        focusBorderColor: 'neonGreen',
      },
    },
    Table: {
      // The table dividers also use neonGreen so that they stand out.
      variants: {
        simple: {
          th: { borderColor: 'neonGreen' },
          td: { borderColor: 'neonGreen' },
        },
      },
    },
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'background.primary',
        color: 'text.primary',
        lineHeight: '1.6',
        fontFamily: "'VT323', monospace",
      },
      thead: {
        backgroundColor: 'background.secondary',
      },
      th: {
        fontFamily: 'VT323, monospace !important',
        fontSize: 'lg !important',
      },
    },
  },
});

export { slateBlueTheme, darkTheme, cyberpunkTheme };
