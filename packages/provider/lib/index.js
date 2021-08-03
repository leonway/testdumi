'use strict';

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.useIntl = useIntl;
Object.defineProperty(exports, 'createIntl', {
  enumerable: true,
  get: function get() {
    return _reactIntl.createIntl;
  },
});
exports.default =
  exports.ConfigProviderWrap =
  exports.ConfigProvider =
  exports.ConfigConsumer =
  exports.intlMapKeys =
  exports.intlMap =
  exports.zhCNIntl =
  exports.enUSIntl =
    void 0;

var _react = _interopRequireWildcard(require('react'));

var _antd = require('antd');

var _reactIntl = require('react-intl');

var _zh_CN = _interopRequireDefault(require('antd/lib/locale/zh_CN'));

var _zhCN = _interopRequireDefault(require('./locale/zh-CN'));

var _enUS = _interopRequireDefault(require('./locale/en-US'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop,
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key),
        );
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var cache = (0, _reactIntl.createIntlCache)();
var zhCNIntl = (0, _reactIntl.createIntl)(
  {
    locale: 'zh_CN',
    messages: _zhCN.default,
  },
  cache,
);
exports.zhCNIntl = zhCNIntl;
var enUSIntl = (0, _reactIntl.createIntl)(
  {
    locale: 'en_US',
    messages: _enUS.default,
  },
  cache,
);
exports.enUSIntl = enUSIntl;
var intlMap = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
};
exports.intlMap = intlMap;
var intlMapKeys = Object.keys(intlMap);
exports.intlMapKeys = intlMapKeys;

var ConfigContext = /*#__PURE__*/ _react.default.createContext({
  intl: _objectSpread(
    _objectSpread({}, zhCNIntl),
    {},
    {
      locale: 'default',
    },
  ),
  valueTypeMap: {},
});

var ConfigConsumer = ConfigContext.Consumer,
  ConfigProvider = ConfigContext.Provider;
/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */

exports.ConfigProvider = ConfigProvider;
exports.ConfigConsumer = ConfigConsumer;

var findIntlKeyByAntdLocaleKey = function findIntlKeyByAntdLocaleKey(
  localeKey,
) {
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

  var _useContext = (0, _react.useContext)(_antd.ConfigProvider.ConfigContext),
    locale = _useContext.locale; // 如果 locale 不存在自动注入的 AntdConfigProvider

  var Provider =
    locale === undefined ? _antd.ConfigProvider : _react.default.Fragment;
  return /*#__PURE__*/ _react.default.createElement(
    ConfigConsumer,
    null,
    function (value) {
      var _value$intl;

      var localeName =
        locale === null || locale === void 0 ? void 0 : locale.locale;
      var key = findIntlKeyByAntdLocaleKey(localeName); // antd 的 key 存在的时候以 antd 的为主

      var intl =
        localeName &&
        ((_value$intl = value.intl) === null || _value$intl === void 0
          ? void 0
          : _value$intl.locale) === 'default'
          ? intlMap[key]
          : value.intl || intlMap[key]; // 自动注入 antd 的配置

      var configProvider =
        locale === undefined
          ? {
              locale: _zh_CN.default,
            }
          : {};
      return /*#__PURE__*/ _react.default.createElement(
        Provider,
        _objectSpread({}, configProvider),
        /*#__PURE__*/ _react.default.createElement(
          ConfigProvider,
          {
            value: _objectSpread(
              _objectSpread({}, value),
              {},
              {
                intl: intl || zhCNIntl,
              },
            ),
          },
          children,
        ),
      );
    },
  );
};

exports.ConfigProviderWrap = ConfigProviderWrap;

function useIntl() {
  var context = (0, _react.useContext)(ConfigContext);
  return context.intl || zhCNIntl;
}

var _default = ConfigContext;
exports.default = _default;
