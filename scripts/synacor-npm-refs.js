// Verify that no references to synacor npm server are present in pacakge-lock.json files

(new (require('file-matcher')).FileMatcher())
	.find({
		path: './',
		recursiveSearch: true,
		fileFilter: {
			fileNamePattern: 'package-lock.json',
			content: /synacor.com/ }
	})
	.then(r => {
		if (r.length) {
			//eslint-disable-next-line no-console
			console.log('Found synacor registry in following package-lock.json files:\n', r);
		}
		process.exit(r.length);
	});
