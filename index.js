const merge = require('lodash.merge');

const WHITELIST = [
  'aborted',
  'baseUrl',
  'body',
  'complete',
  ['headers', [
    'host',
    'origin',
    'referer',
    'user-agent',
    'x-request-id'
  ]],
  'httpVersion',
  'method',
  'originalUrl',
  'params',
  'protocol',
  'query',
  'secure',
  'statusCode',
  'statusMessage',
  'url'
];

/**
 * A whitelisted key (string) or an array with a key and an array of further
 * whitelisted items.
 * @typedef {string|[string, WhitelistItem[]]} WhitelistItem
 */

/**
 * Copy whitelisted items from the source object.
 *
 * The whitelist is an array of either keys or arrays containing a key and
 * further fields within that keyed object to be whitelisted.
 *
 * @param {object} object
 * @param {WhitelistItem[]} whitelist
 * @return {object}
 */
function toJSON (object, whitelist) {
  const output = {};
  for (const item of whitelist) {
    const [key, sublist] = Array.isArray(item) ? item : [item];
    if (!object[key]) continue;
    output[key] = sublist ? toJSON(object[key], sublist) : object[key];
  }
  return output;
}

/**
 * Convert a whitelist into a map { key: true|submap, ... }.
 */
function toMap (list) {
  const map = {};
  for (const item of list) {
    const [key, sublist] = Array.isArray(item) ? item : [item];
    map[key] = sublist ? toMap(sublist) : true;
  }
  return map;
}

/**
 * Convert a map back to a whitelist [key|[key, sublist], ...]
 */
function toList (map) {
  return Object.entries(map).map(([key, submap]) =>
    typeof submap === 'object' ? [key, toList(submap)] : key);
}

/**
 * Merge whitelists
 */
function mergeLists (...lists) {
  return toList(merge({}, ...lists.map(toMap)));
}

/**
 * Return the basic express request information with any extra keys we might
 * also want.
 *
 * @param {http.IncomingRequest} request The request to filter.
 * @param {WhitelistItem[]} extra
 * @returns {object}
 */
module.exports = function (request, extra = []) {
  return toJSON(request, mergeLists(WHITELIST, extra));
};
