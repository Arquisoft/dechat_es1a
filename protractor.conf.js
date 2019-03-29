module.exports.config = {
    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',
    cucumberOpts: {
        require: ['test/acceptance/steps/*.steps.js'],
        strict: true
    },
    specs: ['test/acceptance/features/*.feature'],
	directConnect: true,
    capabilities: {
        browserName: 'chrome',
		chromeOptions: {
      args: ['--no-sandbox']
    },
    }
};
