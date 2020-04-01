import Vue from 'vue'
Vue.filter('formatDate', function (value, fmt) {
  if( typeof value != 'number') return value;
  let getDate = new Date(value);
  let o = {
    'M+': getDate.getMonth() + 1,
    'd+': getDate.getDate(),
    'h+': getDate.getHours(),
    'm+': getDate.getMinutes(),
    's+': getDate.getSeconds(),
    'q+': Math.floor((getDate.getMonth() + 3) / 3),
    'S': getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt;
})

Vue.filter('fromNow', function (value) {
  if( typeof value != 'number') return value;
  let map = [ 
    {key:'刚刚',val:0},
    {key:'秒前',val:1000},
    {key:'分前',val:60000},
    {key:'个小时前',val:60*60000},
    {key:'天前',val:24*60*60000}
 ] 
let time = new Date().getTime()-value;//获取相差的时间戳
let item=  map.filter(item=>{
   return  time > item.val;
 }).pop();
 
return item.key=== '天前' && time/item.val> 7?value:parseInt(time/item.val)+item.key;
})

