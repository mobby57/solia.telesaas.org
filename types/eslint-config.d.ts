declare module 'eslint/config' {
  const config: any;
  export { config as defineConfig };
}

declare module '@eslint/js' {
  const js: any;
  export default js;
}
