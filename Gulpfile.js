"use strict";

var gulp = require("gulp"),
		browserSync = require("browser-sync"),
		htmlmin = require("gulp-htmlmin"),
		sass = require("gulp-sass"),
		bourbon = require("node-bourbon").includePaths,
		neat = require("node-neat").includePaths;

var paths = {
	dist: ["dist/"],
	html: ["src/**/*.html"],
	scss: ["src/scss/**/*.scss"]
};

// Compiles all gulp tasks
gulp.task("default", ["sass", "minify-html"]);

// Run anytime a file changes
gulp.task("watch", ["browserSync", "sass"], function() {
	gulp.watch(paths.scss, ["sass"]);
	gulp.watch("src/*.html").on("change", browserSync.reload);
});

// Spin up a server
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "dist"
		}
	})
});

// Compile SASS files
gulp.task("sass", function() {
	gulp.src("src/scss/**/*.scss")
			.pipe(sass({
				includePaths: bourbon,
				includePaths: neat
			}))
			.pipe(gulp.dest("dist/css"))
			.pipe(browserSync.reload({
				stream: true
			}))
});

// Compress HTML
gulp.task("minify-html", function() {
	return gulp.src(paths.html)
			.pipe(htmlmin({collapseWhitespace: true}))
			.pipe(gulp.dest("./dist/"));
});