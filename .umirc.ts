import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';
const path = require('path');
const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);
const tailPkgList = pkgList
  .map((path) => [
    join('packages', path, 'src'),
    join('packages', path, 'src', 'components'),
  ])
  .reduce((acc, val) => acc.concat(val), []);
console.log('tailPkgList', tailPkgList);

export default defineConfig({
  title: 'testdumi',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve: {
    includes: [...tailPkgList, 'docs'],
  },
  menus: {
    '/components': [
      {
        title: '组件',
        children: [
          'foo.md',
          'media-preview.md',
          'provider.md',
          'sort-media-upload.md',
        ],
      },
    ],
  },
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // 输出所有定义的 rule 配置
    // console.log(memo.toString(memo.module.toConfig().rules));
    // 新增一套规则
    try {
      memo.module
        .rule('svg')
        .test(/\.svg(\?v=\d+\.\d+\.\d+)?$/)
        // .exclude.add(/\/svg\/.*\.svg(\?v=\d+\.\d+\.\d+)?$/)
        // .end()
        .uses.delete('file-loader')
        .end()
        .use('babel')
        .loader('babel-loader')
        .options({
          presets: ['@babel/preset-react'],
          // plugins: ['@babel/plugin-syntax-jsx'],
        })
        .end()
        .use('@svgr/webpack')
        .loader('@svgr/webpack')
        .options({
          babel: false,
          icon: true,
        });
      console.log('+++++++++++++++++++++');

      // console.log(memo.toString(memo.module.toConfig().rules));
    } catch (error) {
      console.log('xxxx', error);
    }
    // // 删除 umi 内置插件
    // memo.plugins.delete('progress');
    // memo.plugins.delete('friendly-error');
    // memo.plugins.delete('copy');
  },
  webpack5: {},
  // mfsu: !isDeploy ? {} : undefined,
  fastRefresh: {},
  // more config: https://d.umijs.org/config
});
