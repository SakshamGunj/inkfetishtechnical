import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem',
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					yellow: 'hsl(var(--accent-yellow))',
					'yellow-foreground': 'hsl(var(--accent-yellow-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Dark Academia Palette
				ink: {
					black: '#0a0a0a',
					charcoal: '#121212',
					900: '#0f0f0f'
				},
				parchment: {
					DEFAULT: '#f5f0e1',
					dark: '#e6dfcc',
					light: '#fdfbf7'
				},
				gold: {
					DEFAULT: '#c5a059',
					dim: '#a38446',
					glow: '#ebd298'
				},
				'gold-main': '#D88A06',
				'gold-light': '#FFCC66',
				'gold-dark': '#8F4D00',
				obsidian: '#0B0B0C',
				ivory: '#F5F2EE',
				leather: {
					DEFAULT: '#3e2723',
					light: '#5d4037'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
				display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-50px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(100%)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
						transform: 'scale(1)'
					},
					'50%': {
						boxShadow: '0 0 60px rgba(59, 130, 246, 0.6)',
						transform: 'scale(1.02)'
					}
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
					'33%': { transform: 'translateY(-20px) rotate(2deg)' },
					'66%': { transform: 'translateY(-10px) rotate(-1deg)' }
				},
				'gradient-x': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'bounce-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.3)'
					},
					'50%': {
						opacity: '1',
						transform: 'scale(1.1)'
					},
					'70%': {
						transform: 'scale(0.9)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)'
					}
				},
				'wiggle': {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' }
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(2px)' }
				},
				'underline-expand': {
					'0%': { transform: 'scaleX(0)' },
					'100%': { transform: 'scaleX(1)' }
				},
				'sparkle-1': {
					'0%': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'2.5s': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'3s': { opacity: '1', transform: 'translateY(-20px) scale(1)' },
					'4s': { opacity: '0', transform: 'translateY(-40px) scale(0)' },
					'100%': { opacity: '0', transform: 'translateY(-40px) scale(0)' }
				},
				'sparkle-2': {
					'0%': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'2.8s': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'3.3s': { opacity: '1', transform: 'translateY(-25px) scale(1)' },
					'4.3s': { opacity: '0', transform: 'translateY(-50px) scale(0)' },
					'100%': { opacity: '0', transform: 'translateY(-50px) scale(0)' }
				},
				'sparkle-3': {
					'0%': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'3.1s': { opacity: '0', transform: 'translateY(0) scale(0)' },
					'3.6s': { opacity: '1', transform: 'translateY(-30px) scale(1)' },
					'4.6s': { opacity: '0', transform: 'translateY(-60px) scale(0)' },
					'100%': { opacity: '0', transform: 'translateY(-60px) scale(0)' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				'marquee-reverse': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(100%)' },
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.8s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'gradient-x': 'gradient-x 3s ease infinite',
				'bounce-in': 'bounce-in 0.8s ease-out',
				'wiggle': 'wiggle 1s ease-in-out infinite',
				'shake': 'shake 0.5s ease-in-out infinite',
				'underline-expand': 'underline-expand 2s ease-out 1s forwards',
				'sparkle-1': 'sparkle-1 6s infinite',
				'sparkle-2': 'sparkle-2 6s infinite',
				'sparkle-3': 'sparkle-3 6s infinite',
				'marquee': 'marquee 25s linear infinite',
				'marquee-reverse': 'marquee-reverse 25s linear infinite',
				'spin-slow': 'spin 15s linear infinite'
			},
			backgroundImage: {
				'hero-gradient': 'var(--hero-gradient)',
				'accent-gradient': 'var(--accent-gradient)',
				'cta-gradient': 'var(--cta-gradient)',
				'trust-gradient': 'var(--trust-gradient)'
			},
			boxShadow: {
				'card': 'var(--card-shadow)',
				'card-hover': 'var(--card-shadow-hover)',
				'glow': 'var(--glow-shadow)',
				'conversion': 'var(--conversion-shadow)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
