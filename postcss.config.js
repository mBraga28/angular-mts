module.exports = {
  plugins: {
    tailwindcss: {
      config: './tailwind.config.js',
      exposeConfig: false,
    },
    autoprefixer: {
      grid: true,
    },
  },
}
