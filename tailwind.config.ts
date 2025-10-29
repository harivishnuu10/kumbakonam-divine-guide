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
			padding: '2rem',
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
					foreground: 'hsl(var(--accent-foreground))'
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
				temple: {
					saffron: 'hsl(var(--temple-saffron))',
					gold: 'hsl(var(--temple-gold))',
					red: 'hsl(var(--temple-deep-red))',
					stone: 'hsl(var(--temple-stone))'
				}
			},
			backgroundImage: {
				'gradient-temple': 'var(--gradient-temple)',
				'gradient-sunset': 'var(--gradient-sunset)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-radial': 'var(--gradient-radial)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-mesh': 'var(--gradient-mesh)'
			},
			boxShadow: {
				'temple': 'var(--shadow-temple)',
				'gold': 'var(--shadow-gold)',
				'soft': 'var(--shadow-soft)',
				'glow-intense': 'var(--shadow-glow-intense)',
				'3d': 'var(--shadow-3d)'
			},
			transitionTimingFunction: {
				'temple': 'var(--transition-temple)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
					'50%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-1000px 0' },
					'100%': { backgroundPosition: '1000px 0' }
				},
				'reveal': {
					from: { opacity: '0', transform: 'translateY(30px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { opacity: '0', transform: 'scale(0.9)' },
					to: { opacity: '1', transform: 'scale(1)' }
				},
				'rotate-3d': {
					from: { transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)' },
					to: { transform: 'perspective(1000px) rotateY(360deg) rotateX(360deg)' }
				},
				'gradient-shift': {
					'0%, 100%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' }
				},
				'bounce-glow': {
					'0%, 100%': { 
						transform: 'translateY(0)',
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': { 
						transform: 'translateY(-20px)',
						boxShadow: '0 20px 40px hsl(var(--primary) / 0.6)'
					}
				},
				'float-alt': {
					'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
					'25%': { transform: 'translateY(-15px) translateX(10px)' },
					'75%': { transform: 'translateY(-5px) translateX(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'shimmer': 'shimmer 2s infinite',
				'reveal': 'reveal 0.6s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'rotate-3d': 'rotate-3d 20s linear infinite',
				'gradient-shift': 'gradient-shift 5s ease infinite',
				'bounce-glow': 'bounce-glow 3s ease-in-out infinite',
				'float-alt': 'float-alt 4s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
