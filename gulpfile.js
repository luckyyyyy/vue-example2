/*
* @Author: William Chan
* @Date:	 2017-02-26 13:20:04
* @Last Modified by:   William Chan
* @Last Modified time: 2017-02-26 14:11:08
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
				CacheControl: 'max-age=7200,s-maxage=3600',
			}
		}))
);
