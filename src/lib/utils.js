// eslint-disable-next-line import/prefer-default-export
export const isValidHttpUrl = (str) => {
  let url;
  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
};

// 给定一个 url search (string), 替换查询参数后返回新的 search (string)
export const replaceSearchParams = (search, params) => {
  const hasPrefix = search.charAt(0) === '?';
  const searchParams = new URLSearchParams(hasPrefix ? search.substring(1) : search);
  Object.keys(params).forEach((key) => {
    searchParams.set(key, params[key]);
  });
  return `${hasPrefix ? '?' : ''}${searchParams.toString()}`;
};

export const getPlaygroundSettings = () => {
  const settings = {
    endpoint: 'https://beta.abtnetwork.io/api/',
    title: '',
    persistentQuery: true,
    enableHistory: true,
    enableQueryComposer: true,
    enableCodeExporter: true,
    defaultQuery: '',
  };
  const url = new URL(window.location.href);
  url.searchParams.forEach((value, key) => {
    if (key === 'endpoint' && isValidHttpUrl(value)) {
      settings.endpoint = value;
    } else if (key in settings) {
      settings[key] = value;
    }
  });
  return settings;
};
