import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = "./dist";
const srcFolder   = "./src";

export const path = {
    build: {
        js       : `${buildFolder}/js/`,
        templates: `${buildFolder}/js/`,
        css      : `${buildFolder}/css/`,
        html     : `${buildFolder}/`,
        images   : `${buildFolder}/img/`,
        fonts    : `${buildFolder}/fonts/`,
        favicons : `${buildFolder}/img/favicons/`,
          // videos  : `${buildFolder}/videos/`,
          // svg     : `${buildFolder}/img/svg/`,
    },
    src: {
        js       : `${srcFolder}/js/app.js`,
        html     : `${srcFolder}/*.html`,
        templates: `${srcFolder}/blocks/main/pages/**/*.html`,
        scss     : `${srcFolder}/scss/**/*.scss`,
        images   : `${srcFolder}/blocks/**/*.{jpg,jpeg,png,gif,webp,avif}`,
        fonts    : `${srcFolder}/fonts/**/*.{woff2,woff,ttf,svg,eot}`,
        favicons : `${srcFolder}/favicons/*.*`,
          // videos  : `${srcFolder}/blocks/**/*.{mp4,webm}`,
          // svg     : `${srcFolder}/blocks/**/*.svg`,
    },
    watch: {
        js       : `${srcFolder}/**/*.js`,
        html     : `${srcFolder}/**/*.html`,
        templates: `${srcFolder}/blocks/main/pages/**/*.html`,
        scss     : `${srcFolder}/**/*.scss`,
        images   : `${srcFolder}/blocks/**/*.{jpg,jpeg,png,gif,webp,avif}`,
        fonts    : `${srcFolder}/fonts/**/*.{woff2,woff,ttf,svg,eot}`,
        favicons : `${srcFolder}/img/favicons/*.*`,
          // videos  : `${srcFolder}/blocks/**/*.{mp4,webm}`,
          // svg     : `${srcFolder}/blocks/**/*.svg`,
    },
    clean      : buildFolder,
    buildFolder: buildFolder,
    srcFolder  : srcFolder,
    rootFolder : rootFolder,
    ftp        : "www",
    domain     : `PASTE YOUR DOMAIN`
}