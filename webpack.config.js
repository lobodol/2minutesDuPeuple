const Encore = require('@symfony/webpack-encore');
const path              = require('path')
const SpritesmithPlugin = require('webpack-spritesmith');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/js/app.js')
    //.addEntry('page1', './assets/page1.js')
    //.addEntry('page2', './assets/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()
    .enablePostCssLoader()
    .addPlugin(new SpritesmithPlugin({
        src: {
            cwd: path.resolve(__dirname, 'assets/sprites'),
            glob: "*.png"
        },
        target: {
            image: path.resolve(__dirname, 'assets/images/spritesheet.png'),
            css: path.resolve(__dirname, 'assets/scss/_sprites.scss')
        },
        apiOptions: {
            cssImageRef: "../images/spritesheet.png"
        }
    }))

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

    .enableIntegrityHashes(Encore.isProduction())

    .autoProvidejQuery()
    .copyFiles({
        from: './assets/images',
        // optional target path, relative to the output dir
        //to: 'images/[path][name].[ext]',
        // if versioning is enabled, add the file hash too
        to: 'images/[path][name].[hash:8].[ext]',
        // only copy files matching this pattern
        pattern: /\.(png|jpg|jpeg|svg)$/
    })

// uncomment if you use API Platform Admin (composer require api-admin)
//.enableReactPreset()
//.addEntry('admin', './assets/admin.js')
;

module.exports = Encore.getWebpackConfig();