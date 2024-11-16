
export const images = () => {
    return app.gulp.src(app.path.src.images, { encoding: false })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "IMAGES",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.rename ({
                dirname: ''
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )

        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images, { encoding: false })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        )
        .pipe(app.plugins.rename ( {
            dirname: ''
        }))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browserSync.stream())
    }