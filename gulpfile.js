/*
* @Author: William Chan
* @Date:	 2017-02-26 13:20:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-02-27 23:49:01
*/

'use strict';

var gulp = require('gulp');
var publish = require('gulp-oss-publish');

gulp.task('publish', () =>
	gulp
	.src('dist/**/*', {
		base: 'dist',
		buffer: true
	})
	.pipe(publish({
		prefix: 'public',
		genShortId: false,
		oss: {
			accessKeyId: 'LTAIucdfDsTvyjjx',
			secretAccessKey: 'emSGttqwegQcOMxsmEoutPDUVAePfE',
			endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
			bucket: 'rainbow-static'
		},
		headers: {
			CacheControl: 'max-age=604800',
			ContentEncoding: '',
		}
	}))
);
