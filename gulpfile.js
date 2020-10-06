var gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const markdownPdf = require('gulp-markdown-pdf');
const path = require('path');
const fs = require('fs');
const git = require('git-rev-sync');
const moment = require('moment');
const { execSync } = require('child_process');

const info = require('./package.json');
const index = require('./docs/src/index.json');
const files = index.sources;

gulp.task('pdf', function(done) {
    const sources = files.map(f => './docs/src/' + f);

    gulp.src(sources)
        .pipe(concat(info.name + '.md'))
        .pipe(gulp.dest('dist'))
        .pipe(markdownPdf())
        .pipe(gulp.dest('dist'));
    done();
});
gulp.task('clean', function(done){
    gulp.src('./dist', {read: false})
        .pipe(clean());
    done();
});
//gulp.task('default', ['pdf']);
gulp.task('default', gulp.series('pdf'));