import { createTheme } from '@mui/material/styles';

interface CustomPaletteOptions  {
	light?: string;
	main?: string;
	dark?: string;
	contrastText?: string;

	primary?: string;
	secondary?: string;
	tertiary?: string;
	invertPrimary?: string;

	brandPrimary?: string;
	brandSecondary?: string;

	attention?: string;	
	success?: string;
	disabled?: string;

	outlined?: string;
}

declare module '@mui/material/styles' {
	interface Palette {
		icon: CustomPaletteOptions;
		surface: CustomPaletteOptions;
		typography: CustomPaletteOptions;
		snackbar: CustomPaletteOptions;
	}

	interface PaletteOptions {
		icon?: CustomPaletteOptions;
		surface?: CustomPaletteOptions;
		typography?: CustomPaletteOptions;
		snackbar?: CustomPaletteOptions;
	}
}

// Create a theme instance.
const theme = createTheme({
	palette: {
		surface: {
			main: '#FFFFFF',
			secondary: '#F6F6F9',
			tertiary: '#F0F0F3',
		},
		icon: {
			primary: '#000A29',
			secondary: '#6C7284',
			tertiary: '#B4BACE',
			brandPrimary: '#FFD92E',
			brandSecondary: '#EF6C00',
			attention: '#E53935',
			invertPrimary: '#FFFFFF',
			success: '#2E7D32',
		},
		typography: {
			primary: '#000A29',
			secondary: '#6C7284',
			disabled: '#B4BACE',
			invertPrimary: '#FFFFFF',
			attention: '#E53935',
			brandPrimary: '#EF6C00',
			success: '#2E7D32',
		},
		primary: {
			main: '#FFD92E',
			dark: '#FFD100',
			light: '#464B53',
		},
		secondary: {
			main: '#DADDE2',
			dark: '#C8CDC4',
			light: '#464B53',
		},
		warning: {
			main: '#EF6C00',
			dark: '#EF6C00',
			light: '#464B53',
		},
		divider: '#464B53',
		snackbar: {
			outlined: '#464646',
		},
	},
	typography: {
		fontFamily: '"Noto Sans", sans-serif',
		h1: {
			fontWeight: 600,
		},
		h2: {
			fontWeight: 600,
		},
		h3: {
			fontWeight: 600,
		},
		h4: {
			fontWeight: 600,
		},
		h5: {
			fontWeight: 600,
		},
		body1: {
			fontWeight: 400,
			fontSize: "16px",
			lineHeight: "24px",
			letterSpacing: "0px"
		},
		body2: {
			fontSize: "14px",
			lineHeight: "20px",
			letterSpacing: "0.17px"
		}
	},
	components: {
		MuiTypography: {
			defaultProps: {
				color: "typography.primary",
			}
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: 'none',
					color: "inherit"
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					color: "#6C7284",
				}
			}
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					backgroundColor: "surface.secondary",
					borderRadius: 12,
				},
			}
		},
		MuiFilledInput: {
			defaultProps: {
				disableUnderline: true,

			},
			styleOverrides: {
				root: {
					backgroundColor: "surface.secondary",
					borderRadius: 12,
				},
			}
		},
		MuiMenu: {
			styleOverrides: {
				paper: {
					marginTop: 12,
					borderRadius: 12,
					boxShadow: 'none',
				},
				list: {
					paddingTop: 0,
					paddingBottom: 0,
				},

			}
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: 360,
					padding: "12px 16px 12px 16px",
				}
			}
		},
	},
});

export default theme;
