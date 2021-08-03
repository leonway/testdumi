import React, { useContext } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import { createIntl, createIntlCache } from 'react-intl';
import { IntlShape } from 'react-intl/lib/src/types';
import zh_CN from 'antd/lib/locale/zh_CN';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';

export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: React.ReactNode;

  /** @name 预定的颜色 */
  status: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

export type ProSchemaValueEnumObj = Record<
  string,
  ProSchemaValueEnumType | React.ReactNode
>;

export type BaseSkyFieldFC = {
  /** 值的类型 */
  text: React.ReactNode;
  /** 放置到组件上 props */
  fieldProps?: any;
  /** 模式类型 */
  mode: SkyFieldFCMode;
  /** 简约模式 */
  plain?: boolean;
  /** 轻量模式 */
  light?: boolean;
  /** Label */
  label?: React.ReactNode;
  /** 映射值的类型 */
  valueEnum?: ProSchemaValueEnumObj;
  /** 唯一的key，用于网络请求 */
  proFieldKey?: React.Key;
};

export type SkyFieldFCMode = 'read' | 'edit' | 'update';

/** Render 第二个参数，里面包含了一些常用的参数 */
export type SkyFieldFCRenderProps = {
  mode?: SkyFieldFCMode;
  placeholder?: string | string[];
  value?: any;
  onChange?: (...rest: any[]) => void;
} & BaseSkyFieldFC;

export type SkyRenderFieldPropsType = {
  render?:
    | ((
        text: any,
        props: Omit<SkyFieldFCRenderProps, 'value' | 'onChange'>,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
  renderFormItem?:
    | ((
        text: any,
        props: SkyFieldFCRenderProps,
        dom: JSX.Element,
      ) => JSX.Element)
    | undefined;
};

const cache = createIntlCache();
const zhCNIntl = createIntl({ locale: 'zh_CN', messages: zhCN }, cache);
const enUSIntl = createIntl({ locale: 'en_US', messages: enUS }, cache);

const intlMap: Record<string, any> = {
  'zh-CN': zhCNIntl,
  'en-US': enUSIntl,
};

const intlMapKeys = Object.keys(intlMap);

export type ParamsType = Record<string, any>;

export { enUSIntl, zhCNIntl, intlMap, intlMapKeys };

export type ConfigContextPropsType = {
  intl: IntlShape;
  valueTypeMap: Record<string, SkyRenderFieldPropsType>;
};

const ConfigContext = React.createContext<ConfigContextPropsType>({
  intl: {
    ...zhCNIntl,
    locale: 'default',
  },
  valueTypeMap: {},
});

const { Consumer: ConfigConsumer, Provider: ConfigProvider } = ConfigContext;

/**
 * 根据 antd 的 key 来找到的 locale 插件的 key
 *
 * @param localeKey
 */
const findIntlKeyByAntdLocaleKey = (localeKey: string | undefined) => {
  if (!localeKey) {
    return 'zh-CN';
  }
  const localeName = localeKey.toLocaleLowerCase();
  return intlMapKeys.find((intlKey) => {
    const LowerCaseKey = intlKey.toLocaleLowerCase();
    return LowerCaseKey.includes(localeName);
  });
};

/**
 * 如果没有配置 locale，这里组件会根据 antd 的 key 来自动选择
 *
 * @param param0
 */
const ConfigProviderWrap: React.FC<Record<string, unknown>> = ({
  children,
}) => {
  const { locale } = useContext(AntdConfigProvider.ConfigContext);
  // 如果 locale 不存在自动注入的 AntdConfigProvider
  const Provider = locale === undefined ? AntdConfigProvider : React.Fragment;
  return (
    <ConfigConsumer>
      {(value) => {
        const localeName = locale?.locale;

        const key = findIntlKeyByAntdLocaleKey(localeName);
        // antd 的 key 存在的时候以 antd 的为主
        const intl =
          localeName && value.intl?.locale === 'default'
            ? intlMap[key!]
            : value.intl || intlMap[key!];

        // 自动注入 antd 的配置
        const configProvider =
          locale === undefined
            ? {
                locale: zh_CN,
              }
            : {};

        return (
          <Provider {...configProvider}>
            <ConfigProvider
              value={{
                ...value,
                intl: intl || zhCNIntl,
              }}
            >
              {children}
            </ConfigProvider>
          </Provider>
        );
      }}
    </ConfigConsumer>
  );
};

export { ConfigConsumer, ConfigProvider, ConfigProviderWrap, createIntl };

export function useIntl(): IntlShape {
  const context = useContext(ConfigContext);
  return context.intl || zhCNIntl;
}

export default ConfigContext;
