export const userAgentData = {
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
			userAgentData.browserVersion = parseFloat(
				agentArray[0].substring(index + 8)
			);
			userAgentData.isNav = true;
		}

		let token;
		for (let i = 0; i < agentArray.length; ++i) {
			token = agentArray[i];
			if (token.indexOf('compatible') != -1) {
				isCompatible = true;
				userAgentData.isNav = false;
			} else if (token.indexOf('opera') != -1) {
				userAgentData.isOpera = true;
				userAgentData.isNav = false;
				browserVersion = parseFloat(agentArray[i + 1]);
			} else if (token.indexOf('spoofer') != -1) {
				isSpoofer = true;
				userAgentData.isNav = false;
			} else if (token.indexOf('webtv') != -1) {
				isWebTv = true;
				userAgentData.isNav = false;
			} else if (token.indexOf('hotjava') != -1) {
				isHotJava = true;
				userAgentData.isNav = false;
			} else if ((index = token.indexOf('msie')) != -1) {
				userAgentData.isIE = true;
				browserVersion = parseFloat(agentArray[i + 1]);
			} else if ((index = token.indexOf('trident/')) != -1) {
				userAgentData.isTrident = true;
				userAgentData.tridentVersion = parseFloat(token.substr(index + 8));
			} else if ((index = token.indexOf('edge/')) != -1) {
				userAgentData.isMSEdge = true;
				browserVersion = parseFloat(token.substr(index + 5));
				userAgentData.isSafari = false;
				userAgentData.isChrome = false;
				userAgentData.isWebKitBased = false;
			} else if ((index = token.indexOf('gecko/')) != -1) {
				userAgentData.isGeckoBased = true;
				userAgentData.geckoDate = parseFloat(token.substr(index + 6));
			} else if ((index = token.indexOf('applewebkit/')) != -1) {
				userAgentData.isWebKitBased = true;
				userAgentData.webKitVersion = parseFloat(token.substr(index + 12));
			} else if ((index = token.indexOf('rv:')) != -1) {
				userAgentData.mozVersion = parseFloat(token.substr(index + 3));
				browserVersion = userAgentData.mozVersion;
			} else if ((index = token.indexOf('firefox/')) != -1) {
				userAgentData.isFirefox = true;
				browserVersion = parseFloat(token.substr(index + 8));
			} else if ((index = token.indexOf('prism')) != -1) {
				userAgentData.isPrism = true;
			} else if ((index = token.indexOf('camino/')) != -1) {
				userAgentData.isCamino = true;
				browserVersion = parseFloat(token.substr(index + 7));
			} else if ((index = token.indexOf('netscape6/')) != -1) {
				userAgentData.trueNs = true;
				browserVersion = parseFloat(token.substr(index + 10));
			} else if ((index = token.indexOf('netscape/')) != -1) {
				userAgentData.trueNs = true;
				browserVersion = parseFloat(token.substr(index + 9));
			} else if ((index = token.indexOf('safari/')) != -1) {
				userAgentData.isSafari = true;
			} else if ((index = token.indexOf('chrome/')) != -1) {
				userAgentData.isChrome = true;
				browserVersion = parseFloat(token.substr(index + 7));
			} else if ((index = token.indexOf('version/')) != -1) {
				// this is how safari sets browser version
				browserVersion = parseFloat(token.substr(index + 7));
			} else if (token.indexOf('windows') != -1) {
				userAgentData.isWindows = true;
			} else if (token.indexOf('win64') != -1) {
				userAgentData.isWindows64 = true;
			} else if (
				token.indexOf('macintosh') != -1 ||
				token.indexOf('mac_') != -1
			) {
				userAgentData.isMac = true;
			} else if (token.indexOf('linux') != -1) {
				userAgentData.isLinux = true;
			} else if ((index = token.indexOf('zdesktop/')) != -1) {
				userAgentData.isDesktop = true;
				browserVersion = parseFloat(token.substr(index + 9));
			}
		}
		userAgentData.browserVersion = browserVersion;

		// Note: Opera and WebTV spoof Navigator. We do strict client detection.
		userAgentData.isNav =
			beginsWithMozilla &&
			!isSpoofer &&
			!isCompatible &&
			!userAgentData.isOpera &&
			!isWebTv &&
			!isHotJava &&
			!userAgentData.isSafari;
		userAgentData.isIE = userAgentData.isIE && !userAgentData.isOpera;
		userAgentData.isNav4 =
			userAgentData.isNav && browserVersion == 4 && !userAgentData.isIE;
		userAgentData.isNav6 =
			userAgentData.isNav &&
			userAgentData.trueNs &&
			(browserVersion >= 6.0 && browserVersion < 7.0);
		userAgentData.isNav6up =
			userAgentData.isNav && userAgentData.trueNs && browserVersion >= 6.0;
		userAgentData.isNav7 =
			userAgentData.isNav &&
			userAgentData.trueNs &&
			(browserVersion >= 7.0 && browserVersion < 8.0);
		userAgentData.isIE3 = userAgentData.isIE && browserVersion < 4.0;
		userAgentData.isIE4 =
			userAgentData.isIE && browserVersion >= 4.0 && browserVersion < 5.0;
		userAgentData.isIE4up = userAgentData.isIE && browserVersion >= 4.0;
		userAgentData.isIE5 =
			userAgentData.isIE && browserVersion >= 5.0 && browserVersion < 6.0;
		userAgentData.isIE5_5 = userAgentData.isIE && browserVersion == 5.5;
		userAgentData.isIE5up = userAgentData.isIE && browserVersion >= 5.0;
		userAgentData.isIE5_5up = userAgentData.isIE && browserVersion >= 5.5;
		userAgentData.isIE6 =
			userAgentData.isIE && browserVersion >= 6.0 && browserVersion < 7.0;
		userAgentData.isIE6up = userAgentData.isIE && browserVersion >= 6.0;
		userAgentData.isIE7 =
			userAgentData.isIE && browserVersion >= 7.0 && browserVersion < 8.0;
		userAgentData.isIE7up = userAgentData.isIE && browserVersion >= 7.0;
		userAgentData.isIE8 =
			userAgentData.isIE && browserVersion >= 8.0 && browserVersion < 9.0;
		userAgentData.isIE8up = userAgentData.isIE && browserVersion >= 8.0;
		userAgentData.isIE9 =
			userAgentData.isIE && browserVersion >= 9.0 && browserVersion < 10.0;
		userAgentData.isIE9up = userAgentData.isIE && browserVersion >= 9.0;
		userAgentData.isIE10 =
			userAgentData.isIE && browserVersion >= 10.0 && browserVersion < 11.0;
		// IE11
		userAgentData.isModernIE =
			!userAgentData.isIE &&
			userAgentData.mozVersion >= 11.0 &&
			userAgentData.tridentVersion >= 7.0;
		// IE12
		userAgentData.isModernIE =
			userAgentData.isModernIE ||
			(!userAgentData.isIE && userAgentData.isMSEdge && browserVersion >= 12.0);
		if (userAgentData.isModernIE) {
			userAgentData.isSafari = false;
			userAgentData.isChrome = false;
			userAgentData.isIE12 = browserVersion >= 12.0;
		}

		userAgentData.isMozilla =
			userAgentData.isNav &&
			userAgentData.mozVersion != -1 &&
			userAgentData.isGeckoBased &&
			userAgentData.geckoDate != -1;
		userAgentData.isMozilla1_4up =
			userAgentData.isMozilla && userAgentData.mozVersion >= 1.4;
		userAgentData.isFirefox =
			userAgentData.isMozilla && userAgentData.isFirefox;
		userAgentData.isFirefox1up =
			userAgentData.isFirefox && browserVersion >= 1.0;
		userAgentData.isFirefox1_5up =
			userAgentData.isFirefox && browserVersion >= 1.5;
		userAgentData.isFirefox2_0up =
			userAgentData.isFirefox && browserVersion >= 2.0;
		userAgentData.isFirefox3up =
			userAgentData.isFirefox && browserVersion >= 3.0;
		userAgentData.isFirefox3_5up =
			userAgentData.isFirefox && browserVersion >= 3.5;
		userAgentData.isFirefox3_6up =
			userAgentData.isFirefox && browserVersion >= 3.6;
		userAgentData.isFirefox4up =
			userAgentData.isFirefox && browserVersion >= 4.0;
		userAgentData.isSafari2 =
			userAgentData.isSafari && browserVersion >= 2.0 && browserVersion < 3.0;
		userAgentData.isSafari3 =
			(userAgentData.isSafari &&
				browserVersion >= 3.0 &&
				browserVersion < 4.0) ||
			userAgentData.isChrome;
		userAgentData.isSafari4 = userAgentData.isSafari && browserVersion >= 4.0;
		userAgentData.isSafari3up =
			(userAgentData.isSafari && browserVersion >= 3.0) ||
			userAgentData.isChrome;
		userAgentData.isSafari4up =
			(userAgentData.isSafari && browserVersion >= 4.0) ||
			userAgentData.isChrome;
		userAgentData.isSafari5up =
			(userAgentData.isSafari && browserVersion >= 5.0) ||
			userAgentData.isChrome;
		userAgentData.isSafari5_1up =
			(userAgentData.isSafari && browserVersion >= 5.1) ||
			userAgentData.isChrome;
		userAgentData.isSafari6up = userAgentData.isSafari && browserVersion >= 6.0;
		userAgentData.isDesktop2up =
			userAgentData.isDesktop && browserVersion >= 2.0;
		userAgentData.isChrome2up = userAgentData.isChrome && browserVersion >= 2.0;
		userAgentData.isChrome7 = userAgentData.isChrome && browserVersion >= 7.0;
		userAgentData.isChrome10up =
			userAgentData.isChrome && browserVersion >= 10.0;
		userAgentData.isChrome19up =
			userAgentData.isChrome && browserVersion >= 19.0;

		userAgentData.browser = '[unknown]';
		if (userAgentData.isOpera) {
			userAgentData.browser = 'OPERA';
		} else if (userAgentData.isChrome) {
			userAgentData.browser = 'GC' + browserVersion;
		} else if (userAgentData.isSafari) {
			userAgentData.browser = 'SAF' + browserVersion;
		} else if (userAgentData.isCamino) {
			userAgentData.browser = 'CAM';
		} else if (isWebTv) {
			userAgentData.browser = 'WEBTV';
		} else if (isHotJava) {
			userAgentData.browser = 'HOTJAVA';
		} else if (userAgentData.isFirefox) {
			userAgentData.browser = 'FF' + browserVersion;
		} else if (userAgentData.isPrism) {
			userAgentData.browser = 'PRISM';
		} else if (userAgentData.isNav7) {
			userAgentData.browser = 'NAV7';
		} else if (userAgentData.isNav6) {
			userAgentData.browser = 'NAV6';
		} else if (userAgentData.isNav4) {
			userAgentData.browser = 'NAV4';
		} else if (userAgentData.isIE) {
			userAgentData.browser = 'IE' + browserVersion;
		} else if (userAgentData.isModernIE) {
			userAgentData.browser = 'IE' + browserVersion;
		} else if (userAgentData.isDesktop) {
			userAgentData.browser = 'ZD' + browserVersion;
		}

		userAgentData.platform = '[unknown]';
		if (userAgentData.isWindows) {
			userAgentData.platform = 'Win';
		} else if (userAgentData.isMac) {
			userAgentData.platform = 'Mac';
		} else if (userAgentData.isLinux) {
			userAgentData.platform = 'Linux';
		}
	}

	// setup some global setting we can check for high resolution
	if (userAgentData.isIE) {
		userAgentData.isNormalResolution = true;
		userAgentData.ieScaleFactor = screen.deviceXDPI / screen.logicalXDPI;
		if (userAgentData.ieScaleFactor > 1) {
			userAgentData.isNormalResolution = false;
		}
	}

	userAgentData._inited = !userAgentData.isIE;

	// test for safari nightly
	if (userAgentData.isSafari) {
		let webkit = getWebkitVersion();
		userAgentData.isSafariNightly = webkit && (webkit['is_nightly'] || false);
		// if not safari v3 or the nightly, assume we're dealing with v2  :/
		userAgentData.isSafari2 =
			!userAgentData.isSafari3 && !userAgentData.isSafariNightly;
	}

	//HTML5
	userAgentData.supportsHTML5File = !!// window.FileReader ||
	(userAgentData.isChrome || userAgentData.isSafari6up);
	userAgentData.supportsPlaceholder =
		'placeholder' in document.createElement('INPUT');

	try {
		// IE8 doesn't support REM units
		let div = document.createElement('div');
		div.style.fontSize = '1rem';
		userAgentData.supportsCSS3RemUnits = div.style.fontSize == '1rem';
	} catch (e) {
		userAgentData.supportsCSS3RemUnits = false;
	}
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
