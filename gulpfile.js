
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

function banner() {
	var pkg = JSON.parse(fs.readFileSync('package.json').toString())
	return gutil.template('/**\n' +
	' * <%= pkg.name %>\n' +
	' * @version v<%= pkg.version %> - <%= today %>\n' +
	' * @link <%= pkg.homepage %>\n' +
	' * @author <%= pkg.author.name %> (<%= pkg.author.email %>)\n' +
	' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
	' */\n\n', { file: '', pkg: pkg, today: new Date().toISOString().substr(0, 10) })

}


// SCRIPTS

var rep = function(src, filePath) { 
	console.log(filePath)
	return src.replace('global.react', 'global.React')
						.replace('global.reactPagenav', 'global.ReactPagenav')
						.replace('global.app', 'global.App')
	
}

gulp.task('add-header', function() {

	var src1 = './dist/react-pagenav.js'
	var src2 = './dist/react-pagenav.min.js'

	gulp.src(src1)
	.pipe( concat('react-pagenav.js', { process: rep }) )
	.pipe(concat.header(banner()))
	.pipe(gulp.dest(src.dist))

	gulp.src(src2)
	.pipe( concat('react-pagenav.min.js', { process: rep }) )
	.pipe(concat.header(banner()))
	.pipe(gulp.dest(src.dist))

})

gulp.task('add-header-app', function() {

	gulp.src('./dist/app.js')
	.pipe( concat('app.js', { process: rep }) )
	.pipe(concat.header(banner()))
	.pipe(gulp.dest('public'))

	gulp.src('./dist/app.min.js')
	.pipe( concat('app.min.js', { process: rep }) )
	.pipe(concat.header(banner()))
	.pipe(gulp.dest('public'))
})

var exec = require('child_process').exec

//watch
gulp.task('watch-rp',  function () {

	watch([src.dist + '/react-pagenav.jsx', __dirname + '/package.json'], function() {
		runSequence('dist')
	})

})

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
gulp.task('dist1', function() {

	runSequence('babel-dist', 'add-header')

})
gulp.task('dist2', function() {

	runSequence('babel-dist-app', 'add-header-app')

})

gulp.task('dist', function() {

	console.log('build', pkg.name, pkg.version)
	runSequence('dist1', 'dist2')

})
gulp.task('default', ['watch'])
gulp.task('build', ['dist'])
gulp.task('test', ['karma:unit'])

