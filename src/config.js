// 域名
var domain = 'https://wxopen.gzsjht.com';
var host = domain + '/wxpap/minipro';
var roadhost = domain + '/wxpro/road/';

export const service = {
  // 登录接口
  login: `${host}/login`,
  certification: `${host}/certification`,
  firstaddcars: `${host}/firstaddcars`,
  addcars: `${host}/addcars`,
  carlist: `${host}/carlist`,
  delcars: `${host}/delcars`,
  userinfo: `${host}/userinfo`,
  opennosense: `${host}/opennosense`,
  closefreepay: `${host}/closefreepay`,
  upload: `${host}/file/plateImg`,
  getfreepay: `${host}/getfreepay`,
  freepaynot: `${host}/freepaynot`,
  downTollstation: `${roadhost}/downTollstation`,
  stationDetail: `${roadhost}/stationDetail`,
  // 主域
  host
};

export default {
  service
};
