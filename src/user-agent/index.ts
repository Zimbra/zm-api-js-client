export let userAgentValues = {
	geckoDate: 0,
	mozVersion: -1,
	webKitVersion: -1,
	tridentVersion: -1,
	browser: '',
	browserVersion: -1,
	isMac: false,
	isWindows: false,
	isWindows64: false,
	isLinux: false,
	isNav: false,
	isIE: false,
	isNav4: false,
	trueNs: true,
	isNav6: false,
	isNav6up: false,
	isNav7: false,
	isIE3: false,
	isIE4: false,
	isIE4up: false,
	isIE5: false,
	isIE5_5: false,
	isIE5up: false,
	isIE5_5up: false,
	isIE6: false,
	isIE6up: false,
	isIE7: false,
	isIE7up: false,
	isIE8: false,
	isIE8up: false,
	isIE9: false,
	isIE9up: false,
	isIE10: false,
	isIE12: false,
	isModernIE: false,
	isMSEdge: false,
	isNormalResolution: false,
	ieScaleFactor: 1,
	isFirefox: false,
	isFirefox1up: false,
	isFirefox1_5up: false,
	isFirefox2_0up: false,
	isFirefox3up: false,
	isFirefox3_5up: false,
	isFirefox3_6up: false,
	isFirefox4up: false,
	isMozilla: false,
	isMozilla1_4up: false,
	isSafari: false,
	isSafari2: false,
	isSafari3: false,
	isSafari4: false,
	isSafari3up: false,
	isSafari4up: false,
	isSafari5up: false,
	isSafari5_1up: false,
	isSafari6up: false,
	isCamino: false,
	isChrome: false,
	isChrome2up: false,
	isChrome7: false,
	isChrome10up: false,
	isChrome19up: false,
	isGeckoBased: false,
	isWebKitBased: false,
	isTrident: false,
	isOpera: false,
	useTransparentPNGs: false,
	isDesktop: false,
	isDesktop2up: false,
	isPrism: false,
	platform: '',
	_inited: false,
	isSafariNightly: false,

	//HTML5
	supportsHTML5File: false,
	supportsPlaceholder: false,
	supportsCSS3RemUnits: false,

	// screen resolution - ADD MORE RESOLUTION CHECKS AS NEEDED HERE:
	is800x600orLower: screen && (screen.width <= 800 && screen.height <= 600),
	is1024x768orLower: screen && (screen.width <= 1024 && screen.height <= 768)
};

export function userAgentData() {
	const userAgent = {
		name:
			'ZimbraWebClient - ' +
			userAgentValues.browser +
			'(' +
			userAgentValues.platform +
			')',
		version: '8.8.11_GA_3780'
	};
	return userAgent;
}

export function parseUserAgent() {
	let agent = navigator.userAgent.toLowerCase();
	let agentArray = agent.split(' ');
	let isSpoofer = false;
	let isWebTv = false;
	let isHotJava = false;
	let beginsWithMozilla = false;
	let isCompatible = false;

	if (agentArray != null) {
		let browserVersion = -1;
		let index = -1;

		if ((index = agentArray[0].search(/^\s*mozilla\//)) != -1) {
			beginsWithMozilla = true;
			userAgentValues.browserVersion = parseFloat(
				agentArray[0].substring(index + 8)
			);
			userAgentValues.isNav = true;
		}

		let token;
		for (let i = 0; i < agentArray.length; ++i) {
			token = agentArray[i];
			if (token.indexOf('compatible') != -1) {
				isCompatible = true;
				userAgentValues.isNav = false;
			} else if (token.indexOf('opera') != -1) {
				userAgentValues.isOpera = true;
				userAgentValues.isNav = false;
				browserVersion = parseFloat(agentArray[i + 1]);
			} else if (token.indexOf('spoofer') != -1) {
				isSpoofer = true;
				userAgentValues.isNav = false;
			} else if (token.indexOf('webtv') != -1) {
				isWebTv = true;
				userAgentValues.isNav = false;
			} else if (token.indexOf('hotjava') != -1) {
				isHotJava = true;
				userAgentValues.isNav = false;
			} else if ((index = token.indexOf('msie')) != -1) {
				userAgentValues.isIE = true;
				browserVersion = parseFloat(agentArray[i + 1]);
			} else if ((index = token.indexOf('trident/')) != -1) {
				userAgentValues.isTrident = true;
				userAgentValues.tridentVersion = parseFloat(token.substr(index + 8));
			} else if ((index = token.indexOf('edge/')) != -1) {
				userAgentValues.isMSEdge = true;
				browserVersion = parseFloat(token.substr(index + 5));
				userAgentValues.isSafari = false;
				userAgentValues.isChrome = false;
				userAgentValues.isWebKitBased = false;
			} else if ((index = token.indexOf('gecko/')) != -1) {
				userAgentValues.isGeckoBased = true;
				userAgentValues.geckoDate = parseFloat(token.substr(index + 6));
			} else if ((index = token.indexOf('applewebkit/')) != -1) {
				userAgentValues.isWebKitBased = true;
				userAgentValues.webKitVersion = parseFloat(token.substr(index + 12));
			} else if ((index = token.indexOf('rv:')) != -1) {
				userAgentValues.mozVersion = parseFloat(token.substr(index + 3));
				browserVersion = userAgentValues.mozVersion;
			} else if ((index = token.indexOf('firefox/')) != -1) {
				userAgentValues.isFirefox = true;
				browserVersion = parseFloat(token.substr(index + 8));
			} else if ((index = token.indexOf('prism')) != -1) {
				userAgentValues.isPrism = true;
			} else if ((index = token.indexOf('camino/')) != -1) {
				userAgentValues.isCamino = true;
				browserVersion = parseFloat(token.substr(index + 7));
			} else if ((index = token.indexOf('netscape6/')) != -1) {
				userAgentValues.trueNs = true;
				browserVersion = parseFloat(token.substr(index + 10));
			} else if ((index = token.indexOf('netscape/')) != -1) {
				userAgentValues.trueNs = true;
				browserVersion = parseFloat(token.substr(index + 9));
			} else if ((index = token.indexOf('safari/')) != -1) {
				userAgentValues.isSafari = true;
			} else if ((index = token.indexOf('chrome/')) != -1) {
				userAgentValues.isChrome = true;
				browserVersion = parseFloat(token.substr(index + 7));
			} else if ((index = token.indexOf('version/')) != -1) {
				// this is how safari sets browser version
				browserVersion = parseFloat(token.substr(index + 7));
			} else if (token.indexOf('windows') != -1) {
				userAgentValues.isWindows = true;
			} else if (token.indexOf('win64') != -1) {
				userAgentValues.isWindows64 = true;
			} else if (
				token.indexOf('macintosh') != -1 ||
				token.indexOf('mac_') != -1
			) {
				userAgentValues.isMac = true;
			} else if (token.indexOf('linux') != -1) {
				userAgentValues.isLinux = true;
			} else if ((index = token.indexOf('zdesktop/')) != -1) {
				userAgentValues.isDesktop = true;
				browserVersion = parseFloat(token.substr(index + 9));
			}
		}
		userAgentValues.browserVersion = browserVersion;

		// Note: Opera and WebTV spoof Navigator. We do strict client detection.
		userAgentValues.isNav =
			beginsWithMozilla &&
			!isSpoofer &&
			!isCompatible &&
			!userAgentValues.isOpera &&
			!isWebTv &&
			!isHotJava &&
			!userAgentValues.isSafari;
		userAgentValues.isIE = userAgentValues.isIE && !userAgentValues.isOpera;
		userAgentValues.isNav4 =
			userAgentValues.isNav && browserVersion == 4 && !userAgentValues.isIE;
		userAgentValues.isNav6 =
			userAgentValues.isNav &&
			userAgentValues.trueNs &&
			(browserVersion >= 6.0 && browserVersion < 7.0);
		userAgentValues.isNav6up =
			userAgentValues.isNav && userAgentValues.trueNs && browserVersion >= 6.0;
		userAgentValues.isNav7 =
			userAgentValues.isNav &&
			userAgentValues.trueNs &&
			(browserVersion >= 7.0 && browserVersion < 8.0);
		userAgentValues.isIE3 = userAgentValues.isIE && browserVersion < 4.0;
		userAgentValues.isIE4 =
			userAgentValues.isIE && browserVersion >= 4.0 && browserVersion < 5.0;
		userAgentValues.isIE4up = userAgentValues.isIE && browserVersion >= 4.0;
		userAgentValues.isIE5 =
			userAgentValues.isIE && browserVersion >= 5.0 && browserVersion < 6.0;
		userAgentValues.isIE5_5 = userAgentValues.isIE && browserVersion == 5.5;
		userAgentValues.isIE5up = userAgentValues.isIE && browserVersion >= 5.0;
		userAgentValues.isIE5_5up = userAgentValues.isIE && browserVersion >= 5.5;
		userAgentValues.isIE6 =
			userAgentValues.isIE && browserVersion >= 6.0 && browserVersion < 7.0;
		userAgentValues.isIE6up = userAgentValues.isIE && browserVersion >= 6.0;
		userAgentValues.isIE7 =
			userAgentValues.isIE && browserVersion >= 7.0 && browserVersion < 8.0;
		userAgentValues.isIE7up = userAgentValues.isIE && browserVersion >= 7.0;
		userAgentValues.isIE8 =
			userAgentValues.isIE && browserVersion >= 8.0 && browserVersion < 9.0;
		userAgentValues.isIE8up = userAgentValues.isIE && browserVersion >= 8.0;
		userAgentValues.isIE9 =
			userAgentValues.isIE && browserVersion >= 9.0 && browserVersion < 10.0;
		userAgentValues.isIE9up = userAgentValues.isIE && browserVersion >= 9.0;
		userAgentValues.isIE10 =
			userAgentValues.isIE && browserVersion >= 10.0 && browserVersion < 11.0;
		// IE11
		userAgentValues.isModernIE =
			!userAgentValues.isIE &&
			userAgentValues.mozVersion >= 11.0 &&
			userAgentValues.tridentVersion >= 7.0;
		// IE12
		userAgentValues.isModernIE =
			userAgentValues.isModernIE ||
			(!userAgentValues.isIE &&
				userAgentValues.isMSEdge &&
				browserVersion >= 12.0);
		if (userAgentValues.isModernIE) {
			userAgentValues.isSafari = false;
			userAgentValues.isChrome = false;
			userAgentValues.isIE12 = browserVersion >= 12.0;
		}

		userAgentValues.isMozilla =
			userAgentValues.isNav &&
			userAgentValues.mozVersion != -1 &&
			userAgentValues.isGeckoBased &&
			userAgentValues.geckoDate != -1;
		userAgentValues.isMozilla1_4up =
			userAgentValues.isMozilla && userAgentValues.mozVersion >= 1.4;
		userAgentValues.isFirefox =
			userAgentValues.isMozilla && userAgentValues.isFirefox;
		userAgentValues.isFirefox1up =
			userAgentValues.isFirefox && browserVersion >= 1.0;
		userAgentValues.isFirefox1_5up =
			userAgentValues.isFirefox && browserVersion >= 1.5;
		userAgentValues.isFirefox2_0up =
			userAgentValues.isFirefox && browserVersion >= 2.0;
		userAgentValues.isFirefox3up =
			userAgentValues.isFirefox && browserVersion >= 3.0;
		userAgentValues.isFirefox3_5up =
			userAgentValues.isFirefox && browserVersion >= 3.5;
		userAgentValues.isFirefox3_6up =
			userAgentValues.isFirefox && browserVersion >= 3.6;
		userAgentValues.isFirefox4up =
			userAgentValues.isFirefox && browserVersion >= 4.0;
		userAgentValues.isSafari2 =
			userAgentValues.isSafari && browserVersion >= 2.0 && browserVersion < 3.0;
		userAgentValues.isSafari3 =
			(userAgentValues.isSafari &&
				browserVersion >= 3.0 &&
				browserVersion < 4.0) ||
			userAgentValues.isChrome;
		userAgentValues.isSafari4 =
			userAgentValues.isSafari && browserVersion >= 4.0;
		userAgentValues.isSafari3up =
			(userAgentValues.isSafari && browserVersion >= 3.0) ||
			userAgentValues.isChrome;
		userAgentValues.isSafari4up =
			(userAgentValues.isSafari && browserVersion >= 4.0) ||
			userAgentValues.isChrome;
		userAgentValues.isSafari5up =
			(userAgentValues.isSafari && browserVersion >= 5.0) ||
			userAgentValues.isChrome;
		userAgentValues.isSafari5_1up =
			(userAgentValues.isSafari && browserVersion >= 5.1) ||
			userAgentValues.isChrome;
		userAgentValues.isSafari6up =
			userAgentValues.isSafari && browserVersion >= 6.0;
		userAgentValues.isDesktop2up =
			userAgentValues.isDesktop && browserVersion >= 2.0;
		userAgentValues.isChrome2up =
			userAgentValues.isChrome && browserVersion >= 2.0;
		userAgentValues.isChrome7 =
			userAgentValues.isChrome && browserVersion >= 7.0;
		userAgentValues.isChrome10up =
			userAgentValues.isChrome && browserVersion >= 10.0;
		userAgentValues.isChrome19up =
			userAgentValues.isChrome && browserVersion >= 19.0;

		userAgentValues.browser = '[unknown]';
		if (userAgentValues.isOpera) {
			userAgentValues.browser = 'OPERA';
		} else if (userAgentValues.isChrome) {
			userAgentValues.browser = 'GC' + browserVersion;
		} else if (userAgentValues.isSafari) {
			userAgentValues.browser = 'SAF' + browserVersion;
		} else if (userAgentValues.isCamino) {
			userAgentValues.browser = 'CAM';
		} else if (isWebTv) {
			userAgentValues.browser = 'WEBTV';
		} else if (isHotJava) {
			userAgentValues.browser = 'HOTJAVA';
		} else if (userAgentValues.isFirefox) {
			userAgentValues.browser = 'FF' + browserVersion;
		} else if (userAgentValues.isPrism) {
			userAgentValues.browser = 'PRISM';
		} else if (userAgentValues.isNav7) {
			userAgentValues.browser = 'NAV7';
		} else if (userAgentValues.isNav6) {
			userAgentValues.browser = 'NAV6';
		} else if (userAgentValues.isNav4) {
			userAgentValues.browser = 'NAV4';
		} else if (userAgentValues.isIE) {
			userAgentValues.browser = 'IE' + browserVersion;
		} else if (userAgentValues.isModernIE) {
			userAgentValues.browser = 'IE' + browserVersion;
		} else if (userAgentValues.isDesktop) {
			userAgentValues.browser = 'ZD' + browserVersion;
		}

		userAgentValues.platform = '[unknown]';
		if (userAgentValues.isWindows) {
			userAgentValues.platform = 'Win';
		} else if (userAgentValues.isMac) {
			userAgentValues.platform = 'Mac';
		} else if (userAgentValues.isLinux) {
			userAgentValues.platform = 'Linux';
		}
	}

	// setup some global setting we can check for high resolution
	if (userAgentValues.isIE) {
		userAgentValues.isNormalResolution = true;
		userAgentValues.ieScaleFactor = screen.deviceXDPI / screen.logicalXDPI;
		if (userAgentValues.ieScaleFactor > 1) {
			userAgentValues.isNormalResolution = false;
		}
	}

	userAgentValues._inited = !userAgentValues.isIE;

	// test for safari nightly
	if (userAgentValues.isSafari) {
		let webkit = getWebkitVersion();
		userAgentValues.isSafariNightly = webkit && (webkit['is_nightly'] || false);
		// if not safari v3 or the nightly, assume we're dealing with v2  :/
		userAgentValues.isSafari2 =
			!userAgentValues.isSafari3 && !userAgentValues.isSafariNightly;
	}

	//HTML5
	userAgentValues.supportsHTML5File = !!// window.FileReader ||
	(userAgentValues.isChrome || userAgentValues.isSafari6up);
	userAgentValues.supportsPlaceholder =
		'placeholder' in document.createElement('INPUT');

	try {
		// IE8 doesn't support REM units
		let div = document.createElement('div');
		div.style.fontSize = '1rem';
		userAgentValues.supportsCSS3RemUnits = div.style.fontSize == '1rem';
	} catch (e) {
		userAgentValues.supportsCSS3RemUnits = false;
	}

	console.log(userAgentValues, 'parseUserAgent');
}

// code provided by webkit authors to determine if nightly browser
function getWebkitVersion() {
	let webkit_version;
	let regex = new RegExp('\\(.*\\) AppleWebKit/(.*) \\((.*)');
	let matches = regex.exec(navigator.userAgent);
	if (matches) {
		let version = matches[1];
		let bits = version.split('.');
		let is_nightly = version[version.length - 1] == '+';
		let minor = is_nightly ? '+' : parseInt(bits[1]);
		// If minor is Not a Number (NaN) return an empty string
		// if (isNaN(minor)) minor = '';

		webkit_version = {
			major: parseInt(bits[0]),
			minor: minor,
			is_nightly: is_nightly
		};
	}
	return webkit_version || {};
}
