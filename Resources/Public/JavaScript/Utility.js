/**
 * @fileOverview Some Utility functions for Annotate
 * @name Utility.js
 * @author Johannes Goslar
 */
define('TYPO3/CMS/Annotate/Utility', [
    'TYPO3/CMS/Annotate/react',
], function (React) {
    return {
        /**
         * Is the span an annotation
         * @param {Element} span
         * @returns {boolean}
         */
        isAnnotation: function (span) {
            return span.hasAttribute !== undefined && span.hasAttribute('vocab');
        },
        /**
         * Is the span an property
         * @param {Element} span
         * @returns {boolean}
         */
        isProperty: function(span) {
            return span.hasAttribute !== undefined && span.hasAttribute('property');
        },
        /**
         * Iterate over a NodeList
         * @param {NodeList} nodelist
         * @param {function} cb
         * @param {Object} context
         */
        nodeListForEach: function(nodelist, cb, context) {
            for (var i = 0; i < nodelist.length; ++i) {
                var item = nodelist[i];
                if (context !== undefined)
                    cb.bind(context)(item);
                else
                    cb(item);
            }
        },
        /**
         * Return range of numbers, upperBound is not included
         * @param {number} upperBound
         * @returns {number[]}
         */
        range: function (upperBound) {
            var list = [];
            for (var i = 0; i < upperBound; i++)
                list.push(i);
            return list;
        },
        /**
         * Replace range in string with given string
         * @param {String} string
         * @param {number} begin
         * @param {number} end
         * @param {String} replacement
         * @returns {String}
         */
        replaceRange: function (string, begin,  end,  replacement) {
            return string.substring(0, begin) + replacement + string.substring(end, string.length);
        }
    };
});
