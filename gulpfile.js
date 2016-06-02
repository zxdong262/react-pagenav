
const
gulp = require('gulp')
,path = require('path')
,util = require('util')
,gutil = require('gulp-util')
,pkg = require('./package.json')
,fs = require('fs')
,rename = require('gulp-rename')
,plumber = require('gulp-plumber')
,concat = require('gulp-concat-util')
,karma = require('karma').server
,runSequence = require('run-sequence')
,watch = require('gulp-watch')

// CONFIG
//

var src = {
	cwd: 'src'
	,dist: 'dist'
}

var banner = gutil.template('/**\n' +
	' * <%= pkg.name %>\n' +
	' * @version v<%= pkg.version %> - <%= today %>\n' +
	' * @link <%= pkg.homepage %>\n' +
	' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
	' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
	' */\n\n', { file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10) })


// SCRIPTS
gulp.task('dist', function() {

	console.log('build', pkg.name, pkg.version)
	runSequence('babel-dist', 'add-header')

})

gulp.task('add-header', function() {

	var src1 = './dist/react-pagenav.js'
	var src2 = './dist/react-pagenav.min.js'
	var rep = function(src, filePath) { 
    return src.replace('global.react', 'global.React')
    					.replace('global.reactPagenav', 'global.ReactPagenav')
    
  }
	gulp.src(src1)
	.pipe( concat('react-pagenav.js', { process: rep }) )
	.pipe(concat.header(banner))
	.pipe(gulp.dest(src.dist))

	gulp.src(src2)
	.pipe( concat('react-pagenav.min.js', { process: rep }) )
	.pipe(concat.header(banner))
	.pipe(gulp.dest(src.dist))

})

var exec = require('child_process').exec
 
gulp.task('babel-dist', function (cb) {
  exec('babel src/react-pagenav.jsx -o dist/react-pagenav.min.js -s --minified && babel src/react-pagenav.jsx -o dist/react-pagenav.js', function (err, stdout, stderr) {
    console.log(stdout)
    console.log(stderr)
    cb(err)
  })
})

//webpack
gulp.task('webpack-dev',  function (cb) {

  exec('webpack-dev-server --inline --hot --content-base static/ --history-api-fallback --open --port 8082', function (err, stdout, stderr) {
    cb(stdout)
    cb(stderr)
    cb(err)
  })

})


//watch
gulp.task('watch-file',  function () {

	watch([src.cwd + '/react-pagenav.jsx', __dirname + '/package.json'], function() {
		runSequence('dist')
	})

})


// TEST
gulp.task('karma:unit', function() {
	karma.start({
		configFile: path.join(__dirname, 'test/karma.conf.js'),
		browsers: ['PhantomJS'],
		reporters: ['progress'],
		singleRun: true
	}, function(code) {
		gutil.log('Karma has exited with ' + code)
		process.exit(code)
	})
})

// DEFAULT
gulp.task('watch', function() {
	runSequence(['watch-file', 'webpack-dev'])
})
gulp.task('default', ['watch'])
gulp.task('build', ['dist'])
gulp.task('test', ['karma:unit'])
gulp.task('dt', function() {
	runSequence('dist', 'test')
})

