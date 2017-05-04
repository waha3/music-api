const express = require('express');
const request = require('request');
const crypto = require('crypto');
const Encrypt = require('./crypto.js');
const { http_request, https_request } = require('./request.js');

const app = express();
const port = 3300;
const path = '/api/';

app.get('/', (req, res) => {
  res.end('music api');
})

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

// 手机登录
app.get(`${path}login`, (req, res) => {
  const path = '/weapi/login/cellphone';
  const data = {
    phone: req.query.phone,
    password: md5(req.query.password),
    rememberLogin: true
  };
  https_request(path, 'POST', Encrypt(data), res);
})

// 每日推荐歌单
// app.get(`${path}recommend`, (req, res) => {
//   const action = 'http://music.163.com/weapi/v1/discovery/recommend/songs?csrf_token=';
//   const data = {
//     offset: 0,
//     total: true,
//     limit: 20,
//     csrf_token: ''
//   };
//
//   _request(action, 'POST', data);
//
//   res.end('here');
// });

app.listen(port, function() {
  console.log(`express server listening in ${port}`);
});
