module.exports.config = {
    framework: 'custom',
    frameworkPath: 'node_modules/protractor-cucumber-framework',
    cucumberOpts: {
        require: ['steps/*.steps.js'],
        strict: true
    },
    specs: ['features/*.feature'],
	directConnect: true,
    capabilities: {
        browserName: 'chrome',
		chromeOptions: {
      args: ['--no-sandbox']
    },
    }
};