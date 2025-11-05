import { createTheme, type Theme } from '@mui/material';

const getHoverBg = (theme: Theme, lightColor: string, darkColor: string) =>
  theme.palette.mode === 'light' ? lightColor : darkColor;

export const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          main: '#635ac3',
          light: '#483ab6',
          dark: '#483ab6',
          contrastText: '#FDFCFA',
        },
        secondary: {
          main: '#d4c9a7',
          light: '#f3eedd',
          dark: '#b4ab8e',
          contrastText: '#403C31',
        },
        background: { default: '#FDFCFA', paper: '#FAF8F1' },
        text: { primary: '#403C31', secondary: '#66614F', disabled: '#EBDFBC' },
        divider: '#EBDFBC',
        error: { main: '#d32f2f', light: '#d32f2f', dark: '#b71c1c' },
      },
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          main: '#635ac3',
          light: '#7d74d6',
          dark: '#4d469b',
          contrastText: '#FDFCFA',
        },
        secondary: {
          main: '#d4c9a7',
          light: '#e6dfc8',
          dark: '#b4ab8e',
          contrastText: '#121212',
        },
        background: { default: '#121212', paper: '#1E1E1E' },
        text: { primary: '#F5F3E7', secondary: '#BDB6A3', disabled: '#EBDFBC' },
        divider: '#3A3529',
      },
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          'button, input, .MuiButton-root, .MuiOutlinedInput-root, .MuiIconButton-root, .MuiCheckbox-root, .MuiRadio-root, .MuiSelect-root, .MuiMenuItem-root':
            {
              transition: 'all 0.3s ease-in-out',
            },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          textTransform: 'none',
          fontSize: '1rem',
          lineHeight: '160%',
          transition: 'all 0.3s ease-in-out',
        },
      },
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: ({ theme }) => ({
            borderColor: theme.palette.secondary.main,
            backgroundColor: 'transparent',
            color: theme.palette.text.primary,
            '&:hover, &:active': {
              borderColor: theme.palette.secondary.dark,
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.contrastText,
            },
            '&.Mui-disabled': {
              borderColor: theme.palette.secondary.main,
              color: theme.palette.text.primary,
              backgroundColor: 'transparent',
              opacity: 0.5,
            },
          }),
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: ({ theme }) => ({
            '&.Mui-disabled': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.text.disabled,
              opacity: 0.5,
            },
          }),
        },
        {
          props: { variant: 'sirserg' },
          style: ({ theme }) => ({
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: '0 2px 3px #000',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
              boxShadow: 'none',
            },
            '&.Mui-disabled': {
              color: theme.palette.text.disabled,
              opacity: 0.5,
            },
          }),
        },
      ],
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&:hover': {
            backgroundColor: getHoverBg(theme, theme.palette.secondary.light, '#2C2A22'),
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.dark,
          },
          '&.Mui-focused': {
            backgroundColor: 'transparent',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.background.default} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            caretColor: theme.palette.text.primary,
            transition: 'background-color 5000s ease-in-out 0s',
          },
        }),
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&:hover': { color: theme.palette.text.primary },
          '&.Mui-focused': { color: theme.palette.text.primary },
        }),
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: getHoverBg(theme, theme.palette.secondary.light, '#2C2A22'),
          },
          '&.Mui-selected': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': { backgroundColor: theme.palette.secondary.dark },
          },
        }),
      },
    },
  },

  typography: {
    fontFamily: `"Helvetica Neue", "Arial", sans-serif`,
    h1: { fontSize: '2.5rem' },
    h2: { fontSize: '2rem' },
    h3: { fontSize: '1.75rem' },
    h4: { fontSize: '1.5rem' },
    h5: { fontSize: '1.25rem' },
    h6: { fontSize: '1rem' },
  },
});
