import "antd/es/config-provider/style";
import _ConfigProvider from "antd/es/config-provider";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { useContext } from 'react';
import { createIntl, createIntlCache } from 'react-intl';
import zh_CN from "antd/es/locale/zh_CN";
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';
var cache = createIntlCache();
var zhCNIntl = createIntl({
  locale: 'zh_CN',
  messages: zhCN
}, cache);
var enUSIntl = createIntl({
  locale: 'en_US',
  messages: enUS
}, cache);
var intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl
};
var intlMapKeys = Object.keys(intlMap);
export { enUSIntl, zhCNIntl, intlMap, intlMapKeys };
var ConfigContext = /*#__PURE__*/React.createContext({
  intl: _objectSpread(_objectSpread({}, zhCNIntl), {}, {
    locale: 'default'
  }),
  valueTypeMap: {}
});
var ConfigConsumer = ConfigContext.Consumer,
    ConfigProvider = ConfigContext.Provider;
/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */

var findIntlKeyByAntdLocaleKey = function findIntlKeyByAntdLocaleKey(localeKey) {
  if (!localeKey) {
    return 'zh-CN';
  }

  var localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find(function (intlKey) {
    var LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  });
};
/**
 * 如果没有配置 locale，这里组件会根据 antd 的 key 来自动选择
 *
 * @param param0
 */


var ConfigProviderWrap = function ConfigProviderWrap(_ref) {
  var children = _ref.children;

  var _useContext = useContext(_ConfigProvider.ConfigContext),
      locale = _useContext.locale; // 如果 locale 不存在自动注入的 AntdConfigProvider


  var Provider = locale === undefined ? _ConfigProvider : React.Fragment;
  return /*#__PURE__*/React.createElement(ConfigConsumer, null, function (value) {
    var _value$intl;

    var localeName = locale === null || locale === void 0 ? void 0 : locale.locale;
    var key = findIntlKeyByAntdLocaleKey(localeName); // antd 的 key 存在的时候以 antd 的为主

    var intl = localeName && ((_value$intl = value.intl) === null || _value$intl === void 0 ? void 0 : _value$intl.locale) === 'default' ? intlMap[key] : value.intl || intlMap[key]; // 自动注入 antd 的配置

    var configProvider = locale === undefined ? {
      locale: zh_CN
    } : {};
    return /*#__PURE__*/React.createElement(Provider, _objectSpread({}, configProvider), /*#__PURE__*/React.createElement(ConfigProvider, {
      value: _objectSpread(_objectSpread({}, value), {}, {
        intl: intl || zhCNIntl
      })
    }, children));
  });
};

export { ConfigConsumer, ConfigProvider, ConfigProviderWrap, createIntl };
export function useIntl() {
  var context = useContext(ConfigContext);
  return context.intl || zhCNIntl;
}
export default ConfigContext;