import { extendTheme } from '@chakra-ui/react';

const slateBlueTheme = extendTheme({
  colors: {
    brand: {
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
      50: '#f6f8fa',
      100: '#ebeff4',
      200: '#d1d8e1',
      300: '#b7c2ce',
      400: '#9da9bb',
      500: '#8490a8',
      600: '#6a7695',
      700: '#515e81',
      800: '#38466d',
      900: '#1f2e59',
    },
    background: {
      primary: '#f4f7fc',
      secondary: '#dce3f3',
    },
    delete: {
      500: '#e63946',
      600: '#cc2936',
      700: '#b22222',
    },
    text: {
      primary: '#1a1a1a',
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            minWidth: '15vw',
            width: 'auto',
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
      variants: {
        simple: {
          th: { borderColor: 'brand.900' },
          td: { borderColor: 'brand.900' },
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
        borderColor: 'brand.900',
      },
    },
  },
});

const darkTheme = extendTheme({
  colors: {
    brand: {
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
      primary: '#1a1a1a',
      secondary: '#2b2b2b',
    },
    delete: {
      500: '#ff4444',
      600: '#dd3333',
      700: '#bb2222',
    },
    text: {
      primary: '#f0f0f0',
    },
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            minWidth: '15vw',
            width: 'auto',
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
      primary: '#000000',
      secondary: '#111111',
    },
    delete: {
      500: '#ff00aa',
      600: '#cc0088',
      700: '#990066',
    },
    text: {
      primary: '#D4FF00',
    },
    neonGreen: '#39FF14',
  },
  components: {
    Input: {
      variants: {
        outline: {
          field: {
            minWidth: '15vw',
            width: 'auto',
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
