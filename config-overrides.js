const path = require('path')
const { addWebpackPlugin } = require('customize-cra')
const { ProvidePlugin } = require('webpack')
const resolve = dir => path.resolve(process.cwd(), dir)
const { addLessLoader, addWebpackAlias, override, fixBabelImports } = require('customize-cra')
process.env.GENERATE_SOURCEMAP = 'false'
module.exports = override(
  // 在 react 项目中，使用 antd 作为组件库, 需要单独引入 antd 的 css 样式文件.
  // 需要安装 babel-plugin-import
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // 'css' 或者 true, true代表运用less
  }),
  // 添加 less-loader
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      // 全局 less 变量，会覆盖项目内同名变量，可用于主题定制
      modifyVars: {},
    }
  }),
  // 注册全局对象
  addWebpackPlugin(new ProvidePlugin({
    // request: [resolve('src/utils/request.ts'), 'default'],
  })),
  addWebpackAlias({
    '@': path.resolve(__dirname, './src')
  }),
)
