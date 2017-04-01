/*
* @Author: William Chan
* @Date:	 2017-02-26 13:20:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-02 01:06:19
*/

'use strict';

var gulp = require('gulp');
var publish = require('gulp-oss-publish');

gulp.task('publish', () =>
	gulp.src('dist/**/*', {
		base: 'dist',
		buffer: true
	}).pipe(publish({
		prefix: 'b/',
		genShortId: false,
		oss: {
			accessKeyId: 'LTAIucdfDsTvyjjx',
			secretAccessKey: 'emSGttqwegQcOMxsmEoutPDUVAePfE',
			endpoint: 'http://oss-cn-hangzhou.aliyuncs.com',
			bucket: 'rainbow-global'
		},
		headers: {
			CacheControl: 'max-age=604800',
			ContentEncoding: '',
		}
	}))
);
