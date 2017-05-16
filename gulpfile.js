/*
* @Author: William Chan
* @Date:	 2017-02-26 13:20:04
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-16 14:25:41
*/

const gulp = require('gulp');
const ossSync = require('gulp-oss-sync');

const ossConf = {
  connect: {
    "region": "oss-cn-hangzhou",
    "accessKeyId": "LTAIucdfDsTvyjjx",
    "accessKeySecret": "emSGttqwegQcOMxsmEoutPDUVAePfE",
    "bucket": "rainbow-global"
  },
  // controls: {
  //   "headers": {
  //     "Cache-Control": "no-cache"
  //   }
  // },
  setting: {
    dir: "b", // root directory name
    noClean: false, // compare with the last cache file to decide if the file deletion is need
    force: false, // ignore cache file and force re-upload all the files
    quiet: true // quiet option for oss deleteMulti operation
  }
};
const cacheConf = {
  cacheFileName: '.oss-cache-test' // the filename for the cache file
};

gulp.task('publish', function () {
  return gulp.src('dist/**/*').pipe(ossSync(ossConf, cacheConf));
})

