/*
* @Author: William Chan
* @Date:	 2017-02-26 13:20:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-04-01 18:04:55
*/

'use strict';

var gulp = require('gulp');
var publish = require('gulp-oss-publish');
var moment = require('moment');

var getPublicVersion = function () {
  return moment().format('YYYYMMDD')
}
gulp.task('publish', () =>
	gulp.src('dist/**/*', {
		base: 'dist',
		buffer: true
	}).pipe(publish({
		prefix: 'b/' + getPublicVersion(),
		genShortId: false,
		oss: {
			accessKeyId: 'LTAIucdfDsTvyjjx',
			secretAccessKey: 'emSGttqwegQcOMxsmEoutPDUVAePfE',
			endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
			bucket: '<rainbow-global></rainbow-global>'
		},
		headers: {
			CacheControl: 'max-age=604800',
			ContentEncoding: '',
		}
	}))
);
