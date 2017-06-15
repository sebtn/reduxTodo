let webpackConfig = require('./webpack.config.js')

'use strict'
module.exports = (config) => {
	config.set({
		browsers: ['ChromeNoSandboxHeadless'],
		customLaunchers: {
		  ChromeNoSandboxHeadless: {
		    base: 'Chrome',
		    flags: [
		      '--no-sandbox',
		      // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
		      '--headless',
		      '--disable-gpu',
		      // Without a remote debugging port, Google Chrome exits immediately.
		      ' --remote-debugging-port=9222',
		      '--disable-web-security',
		    ],
		  },
		},
		singleRun: false,
		autoWatch: true,
		frameworks: ['mocha'],
		files: ['app/tests/components/test_index.js'],
		preprocessors: {
			'app/tests/components/test_index.js': ['webpack', 'sourcemap']
		},
		reporters: ['mocha'],
		client: {
			mocha: {
				timeout: ''
			}
		},
		webpack: webpackConfig,
		webpackServer:{
			noInfo: true
		}
	})
}