import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; 
import autoprefixer from 'gulp-autoprefixer'; 

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass( {
            outputStyle: 'expanded',
            silenceDeprecations: ['legacy-js-api'],
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({ 
                grid: true,
                overrideBrowserslist: ["last 3 versions"],
                cascade: true
                })
            )
        )
        // Расскоментировать если нужен не сжатый дубль файла стилей
        // .pipe(app.gulp.dest(app.path.build.css))
        
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )

        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browserSync.stream())
}