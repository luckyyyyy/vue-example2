/*
* @Author: chuxiao
* @Date:   2017-05-09 09:54:15
* @Last Modified by:   chuxiao
* @Last Modified time: 2017-05-09 09:59:44
*/

'use strict';
import { http } from './'

//  GET /api/v1/wallet/query/{user_id}
export const wallet_query = (user_id) => {
  return http.get(`wallet/query/${user_id}`);
}
