var 
	// deps
	fs 			 = require('fs'),
	ks 			 = require('kouto-swiss'),
	path 		 = require('path'),
	gulp 		 = require('gulp'),
	merge 		 = require('merge-stream'),
	stylus 		 = require('gulp-stylus'),
	concat 		 = require('gulp-concat'),
	autoprefixer = require('gulp-autoprefixer'),
	gutil 		 = require('gulp-util'),
	sort         = require('gulp-sort'),

	// paths
	projectPath = './',
	designPaths = [
		'css'
	],

	getFiles = function (dirs) {
		return filesToImport = dirs.map(function (dir) {
			return fs.readdirSync(dir).filter(function (file) {
				return !fs.statSync(path.join(dir, file)).isDirectory();
			}).join();
		}).join().split(',');
	}

// remove stylus compiled files task
gulp.task('cleanCompiled', function () {
	designPaths.forEach(function (_path) {
		fs.readdirSync(path.join(projectPath, _path)).forEach(function (file) {
			if (/-stylus-compiled.css/g.test(file) || /-stylus.css/g.test(file)) {
				fs.unlinkSync(path.join(projectPath, _path, file));
			}
		});
	});
});

// watch .styl files change task (stylusWatch)
gulp.task('sw', function () {
	gulp.watch(path.join(projectPath, '**', '*.styl'), ['sc']);
});

// compile stylus files task (stylusCompile)
gulp.task('sc', function() {
	var 
		tasks = designPaths.map(function(_path) {

			var
				src = path.join(projectPath, _path, 'stylus', '**', '*.styl'),
				dest = path.join(projectPath, _path);

			return gulp.src(src)
				.pipe(stylus({
					compress: false,
					use: [ks()],
					linenos: false
				}))
				.pipe(sort({
					comparator: function(file1, file2) {
						if (file1.path.indexOf('icomoon') == -1) {
							return 1;
						}
						if (file2.path.indexOf('icomoon') == -1) {
							return -1;
						}
						return 0;
					}
				}))
				.pipe(concat('style.css'))
				.pipe(autoprefixer('last 4 versions'))
				.pipe(gulp.dest(dest))
		});



	return merge(tasks);
});

// default task
gulp.task('default', ['sc']);

