/*
* @Author: chuxiao
* @Date:   2017-04-18 10:28:42
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-04-18 10:39:40
*/

'use strict';

export const limit = (value) => {
  if(value >= 10000){
    return (value / 10000 + 'W');
  }else{
    return value;
  }

}
