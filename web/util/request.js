import { message } from 'antd';
import { fetch } from '@maoyan/tangdao';
import * as $$ from './index';

function requestGlobalConfig(url, options = {}) {
  // 这里可以做一些全局的ajax请求配置
  const newUrl = $$.addUrlQuery(url, {});

  // 全局ajax添加头
  const newOptions = options;
  let contentType = {};
  if (!options.noContent) {
    contentType = {
      'Content-Type': 'application/json',
    };
  } else {
    contentType = {};
  }
  newOptions.headers = {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
    'X-CSRFToken': $$.getCookie('csrftoken'),
    ...contentType,
    ...options.headers,
  };
  // 为了保证ajax中的Set-Cookie可以正常工作
  newOptions.credentials = 'same-origin';

  return {
    url: newUrl,
    options: newOptions,
  };
}

// 判断是否是formData格式的数据
function jugeFormdata(data) {
  let tem = data;
  if (Object.prototype.toString.call(data) !== '[object FormData]') {
    tem = JSON.stringify(data);
  }
  return tem;
}

function createBodyString(data) {
  // 以formData（querystring）形式提交
  // const bodyString = querystring.stringify(data);
  // 以JSON形式提交
  // return (typeof data === 'string' ? data : querystring.stringify(data));
  return (typeof data === 'string' ? data : jugeFormdata(data));
}

function parseJSON(response) {
  if (!response.redirected) {
    return response.json();
  }
  return response;
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
function request(url, options) {
  const globalConfig = requestGlobalConfig(url, options);
  return fetch(globalConfig.url, globalConfig.options)
    .then(checkStatus)
    .then(parseJSON)
    .then(d => {
      if (!d.success) {
        const msg = d.msg || (d.error ? d.error.message : '服务器错误');
        message.error(msg);
      }
      return {
        d,
      };
    })
    .catch(err => {
      let shouldToastErrorMessage = true;
      if (err.response && err.response.status === 404) {
        // 404不再弹出错误提示
        shouldToastErrorMessage = false;
      }
      if (shouldToastErrorMessage) {
        message.error(err.message || '服务器错误');
      }
      return { err };
    });
}

async function GET(url, query = {}, options) {
  let urlWithQuery = $$.addUrlQuery(url, query);

  urlWithQuery = await request(urlWithQuery, {
    method: 'GET',
    ...options,
  });
  return urlWithQuery;
}

async function DELETE(url, query = {}, options) {
  let urlWithQuery = $$.addUrlQuery(url, query);

  urlWithQuery = await request(urlWithQuery, {
    method: 'DELETE',
    ...options,
  });
  return urlWithQuery;
}

async function POST(url, data = {}, options) {
  const urlWithQuery = await request(url, {
    method: 'POST',
    body: createBodyString(data),
    ...options,
  });

  return urlWithQuery;
}

async function PATCH(url, data = {}, options) {
  const urlWithQuery = await request(url, {
    method: 'PATCH',
    body: createBodyString(data),
    ...options,
  });

  return urlWithQuery;
}

async function PUT(url, data = {}, options) {
  const urlWithQuery = await request(url, {
    method: 'PUT',
    body: createBodyString(data),
    ...options,
  });

  return urlWithQuery;
}

const METHOD = {
  GET,
  POST,
  DELETE,
  PATCH,
  PUT
};

/**
 * 统一处理ajax
 * @param {*} key
 * @param {*} url
 * @param {*} returnAllFlag
 */
function service(key, url, returnAllFlag = false) {
  return async function effectService({ ...data }) {
    const { d: res } = await METHOD[key](url, data);
    if (returnAllFlag) {
      return res;
    }
    if (res && res.success) {
      return res;
    }
    return null;
  };
}

export {
  request,
  GET,
  POST,
  DELETE,
  PATCH,
  PUT,
  service
};
