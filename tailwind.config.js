module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  screens: {
    sm: '640px',   
    md: '768px',    
    lg: '1024px',   
    xl: '1280px',
    '2xl': '1536px'
  },
  theme: {
    extend: {
      colors: {
        /* Primary Colors */
        primary: {
          background: "var(--bg-primary)",
          text: "var(--text-primary)"
        },
        
        /* Secondary Colors */
        secondary: {
          background: "var(--bg-white)",
          text: "var(--text-white)"
        },
        
        /* Text Colors */
        text: {
          primary: "var(--text-primary)",
          white: "var(--text-white)"
        },
        
        /* Background Colors */
        background: {
          primary: "var(--bg-primary)",
          overlay: {
            light: "var(--bg-overlay-light)",
            medium: "var(--bg-overlay-medium)"
          },
          teal: {
            light: "var(--bg-teal-light)",
            lighter: "var(--bg-teal-lighter)"
          },
          gray: {
            light: "var(--bg-gray-light)"
          },
          white: "var(--bg-white)",
          transparent: "var(--bg-white-transparent)"
        },
        
        /* Component-specific Colors */
        header: {
          text: "var(--header-text)"
        },
        button: {
          primary: {
            background: "var(--button-primary-bg)",
            text: "var(--button-primary-text)"
          },
          secondary: {
            background: "var(--button-secondary-bg)",
            text: "var(--button-secondary-text)"
          }
        },
        link: {
          text: "var(--link-text)",
          background: "var(--link-bg)"
        },
        line: {
          background: "var(--line-bg)"
        }
      },
      
      /* Typography */
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'md': 'var(--font-size-md)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)'
      },
      fontWeight: {
        'normal': 'var(--font-weight-normal)',
        'medium': 'var(--font-weight-medium)',
        'semibold': 'var(--font-weight-semibold)',
        'bold': 'var(--font-weight-bold)'
      },
      lineHeight: {
        'xs': 'var(--line-height-xs)',
        'sm': 'var(--line-height-sm)',
        'md': 'var(--line-height-md)',
        'lg': 'var(--line-height-lg)',
        'xl': 'var(--line-height-xl)',
        '2xl': 'var(--line-height-2xl)',
        '3xl': 'var(--line-height-3xl)',
        '4xl': 'var(--line-height-4xl)',
        '5xl': 'var(--line-height-5xl)',
        '6xl': 'var(--line-height-6xl)',
        '7xl': 'var(--line-height-7xl)',
        '8xl': 'var(--line-height-8xl)'
      },
      
      /* Spacing */
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
        '2xl': 'var(--spacing-2xl)',
        '3xl': 'var(--spacing-3xl)',
        '4xl': 'var(--spacing-4xl)'
      },
      
      /* Border Radius */
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)'
      },
      
      /* Font Family */
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif']
      }
    }
  },
  plugins: []
};