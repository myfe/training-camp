import urlUtil from 'url';
import querystring from 'querystring';

function addUrlQuery(url, query) {
  const urlObject = urlUtil.parse(url, true);
  let newQuery = query;
  if (typeof newQuery === 'string') {
    if (newQuery.indexOf('?') === 0) {
      newQuery = newQuery.slice(1);
    }
    newQuery = querystring.parse(newQuery);
  }
  urlObject.query = { ...urlObject.query, ...newQuery };
  urlObject.search = null; // 必须将search设置为空，format才会处理query
  return urlUtil.format(urlObject);
}

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = String.prototype.trim.apply(cookies[i]);
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function setCookie(name, value, expireDays = 0, cookiePath = '/') {
  const date = new Date();
  date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toGMTString()}; path=${cookiePath}`;
}

function clearCookie(name, cookiePath = '/') {
  setCookie(name, '', -1, cookiePath);
}

export {
  addUrlQuery,
  getCookie, setCookie, clearCookie
};
