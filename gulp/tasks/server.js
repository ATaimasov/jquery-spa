export const server = (done) => {
    app.plugins.browserSync.init({
        server: {
            baseDir: `${app.path.build.html}`,
            index: 'about-us.html',
        },
        notify: false,
        port: 5000,
    });

    done();
}