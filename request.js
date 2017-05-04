const http = require('http');
const https = require('https');
const querystring = require('querystring');

const requestHeader = {
  'Host': 'music.163.com',
  'Connection': 'keep-alive',
  'Pragma': 'no-cache',
  'Cache-Control': 'no-cache',
  'Origin': 'http://music.163.com',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Accept': '*/*',
  'Referer': 'http://music.163.com/',
  'Accept-Encoding': 'gzip, deflate',
  'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,ja;q=0.4,fr;q=0.2,zh-TW;q=0.2'
};

exports.http_request = function(path, method, data) {
  const postData = querystring.stringify(data);
  const options = {
    host: 'music.163.com',
    path: path,
    headers: Object.assign(requestHeader, {
      'Content-Length': Buffer.byteLength(postData)
    }),
    method: method,
    timeout: 10
  };

  const req = http.request(options, res => {
    res.on('data', data => {
      console.log(data);
    });
  });

  req.on('error', err => {
    // console.log(err);
    res
  });

  req.write(postData);
  req.end();
}


exports.https_request = function(path, method, data, response) {
  const postData = querystring.stringify({
    params: data.params,
    encSecKey: data.encSecKey
  });

  const options = {
    host: 'music.163.com',
    path: path,
    headers: Object.assign(requestHeader, {
      'Content-Length': Buffer.byteLength(postData)
    }),
    method: method,
    timeout: 10
  };

  // const options = {
  //   host: 'www.baidu.com',
  //   path: '/',
  //   headers: Object.assign(requestHeader, {
  //     'Content-Length': Buffer.byteLength(postData)
  //   }),
  //   method: method,
  //   timeout: 10
  // };

  const req = https.request(options, res => {
    if (res.statusCode == 200) {
      res.on('data', (data) => {
        // console.log(data);

      });

      res.on('end', () => {
        console.log('no more data');
      })
    } else {
      // https_request(path, method, data, response);
    }

  });

  req.on('error', err => {
    response.status(502).send('获取异常');
  });

  req.write(postData);
  req.end();

  response.end();
}
