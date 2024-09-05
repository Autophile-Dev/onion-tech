import { Platform, Alert, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AppInstallDate from 'react-native-app-install-date';
import moment from 'moment';
import { SKU_LIST, DATE_FORMAT } from './constants';

export const rateNow = () => new Promise(async (resolve, reject) => {
    try {
        const result = await AppInstallDate.getDateTime("dd/MM/YYYY");
        if (result && typeof result === 'string') {
            const FORMAT = 'DD/MM/YYYY'
            const showPopup = moment(moment().format(FORMAT), FORMAT).isSameOrAfter(moment(result, FORMAT).add(15, 'days'))
            resolve({ showPopup: showPopup })
        }
    } catch (error) {
        reject(error)
    }
})

export const getEndsAtDate = (date, duration = 1, counter = 1) => {
    if (moment(moment().format(DATE_FORMAT), DATE_FORMAT).isSameOrBefore(moment(date, DATE_FORMAT))) {
        console.log('returning', date, counter)
        return date
    } else {
        const ends_at = moment(date, DATE_FORMAT).add(duration * counter, 'months').format(DATE_FORMAT)
        return getEndsAtDate(ends_at, duration, counter + 1)
    }
}

export const getSelectedSubscription = (productId) => {
    if (SKU_LIST.monthly.sku == productId) return SKU_LIST.monthly
    else if (SKU_LIST.quarterly.sku == productId) return SKU_LIST.quarterly
    else if (SKU_LIST.yearly.sku == productId) return SKU_LIST.yearly
}

export const checkVersion = async () => {
    let details = null

    try {
        if (Platform.OS === 'ios') {
            details = await getAppStoreVersion()
        } else {
            details = await getPlayStoreVersion()
        }
        const options = {
            lexicographical: true,
            zeroExtend: true
        }
        console.log('AppUtil-Version', DeviceInfo.getVersion(), details.version)
        const result = versionCompare(details.version, DeviceInfo.getVersion(), options)
        if (result == 1) {
            console.log('AppUtil-versionCompare', 'you are using old version')
            Alert.alert(
                'New version available',
                `Please update Onion Crypto Signals app to the latest version (${details.version}) for better performance and new features.`,
                [
                    {
                        text: 'UPDATE',
                        onPress: () => {
                            let uriScheme = ''
                            if (Platform.OS === 'ios') {
                                uriScheme = 'itms-apps://itunes.apple.com/app/id1591283506'
                            } else {
                                uriScheme = 'market://details?id=com.onion.android'
                            }

                            Linking.canOpenURL(uriScheme).then(result => {
                                if (result) {
                                    Linking.openURL(uriScheme)
                                } else {
                                    alert(`unable to open ${Platform.OS === 'ios' ? 'App' : 'Play'} Store.`)
                                }
                            })
                        }
                    },
                ],
                { cancelable: false },
            );
        } else if (result == -1) {
            console.log('AppUtil-versionCompare', 'you are using latest version')
        } else {
            console.log('AppUtil-versionCompare', 'you are using upToDate version')
        }


        console.log('AppUtil-result', JSON.stringify(details))
    } catch (ex) {
        console.log('AppUtil-error', ex)
    }
}

export const getAppStoreVersion = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('http://itunes.apple.com/lookup?bundleId=com.onion.ios', {
            method: 'GET',
            cache: 'no-cache'
        })
        if (response.status == 200) {
            const responseJson = await response.json()

            if (responseJson.resultCount > 0) {
                const data = responseJson.results[0]
                resolve({
                    version: data.version,
                    releaseDate: data.currentVersionReleaseDate,
                    releaseNotes: data.releaseNotes,
                })
            }
        }
        reject({
            error: 'Error - Response is not 200',
        })
    } catch (ex) {
        reject(ex)
    }
})

export const getPlayStoreVersion = () => new Promise(async (resolve, reject) => {
    try {
        const response = await fetch('https://play.google.com/store/apps/details?id=com.onion.android', {
            method: 'GET',
            cache: 'no-cache'
        }).then((r) => {
            if (r.status === 200) {
                return r.text();
            }

            throw new Error('androidStoreURL is invalid.');
        });

        const matches = response.match(/<span class="htlgb"><div class="IQ1z0d"><span class="htlgb">([0-9]+\.?[0-9]*\.?[0-9]*)<\/span><\/div><\/span>/);

        if (!matches) {
            reject({
                error: 'Error - Response is not 200',
            })
        }
        console.log('matches', matches);
        resolve({
            version: matches[1]
        })
    } catch (ex) {
        reject(ex)
    }
})

/**
 * Compares two software version numbers (e.g. "1.7.1" or "1.2b").
 *
 * This function was born in http://stackoverflow.com/a/6832721.
 *
 * @param {string} v1 The first version to be compared.
 * @param {string} v2 The second version to be compared.
 * @param {object} [options] Optional flags that affect comparison behavior:
 * <ul>
 *     <li>
 *         <tt>lexicographical: true</tt> compares each part of the version strings lexicographically instead of
 *         naturally; this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than
 *         "1.2".
 *     </li>
 *     <li>
 *         <tt>zeroExtend: true</tt> changes the result if one version string has less parts than the other. In
 *         this case the shorter string will be padded with "zero" parts instead of being considered smaller.
 *     </li>
 * </ul>
 * @returns {number|NaN}
 * <ul>
 *    <li>0 if the versions are equal</li>
 *    <li>a negative integer iff v1 < v2</li>
 *    <li>a positive integer iff v1 > v2</li>
 *    <li>NaN if either version string is in the wrong format</li>
 * </ul>
 *
 * @copyright by Jon Papaioannou (["john", "papaioannou"].join(".") + "@gmail.com")
 * @license This function is in the public domain. Do what you want with it, no strings attached.
 */
function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}