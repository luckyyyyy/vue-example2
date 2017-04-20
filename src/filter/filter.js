/*
* @Author: chuxiao
* @Date:   2017-04-18 10:28:42
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-20 11:06:15
*/

'use strict';

export const limit = (value) => {
  if(value >= 10000){
    return (Math.round((value / 10000) * 100)/100 + 'W');
  }else{
    return value;
  }

}
