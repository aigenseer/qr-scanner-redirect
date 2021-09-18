/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../qr-scanner-js-src/node_modules/jsqr/dist/jsQR.js":
/*!***********************************************************!*\
  !*** ../qr-scanner-js-src/node_modules/jsqr/dist/jsQR.js ***!
  \***********************************************************/
/***/ (function(module) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __nested_webpack_require_568__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_568__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__nested_webpack_require_568__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__nested_webpack_require_568__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__nested_webpack_require_568__.d = function(exports, name, getter) {
/******/ 		if(!__nested_webpack_require_568__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nested_webpack_require_568__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__nested_webpack_require_568__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__nested_webpack_require_568__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__nested_webpack_require_568__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __nested_webpack_require_568__(__nested_webpack_require_568__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix = /** @class */ (function () {
    function BitMatrix(data, width) {
        this.width = width;
        this.height = data.length / width;
        this.data = data;
    }
    BitMatrix.createEmpty = function (width, height) {
        return new BitMatrix(new Uint8ClampedArray(width * height), width);
    };
    BitMatrix.prototype.get = function (x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }
        return !!this.data[y * this.width + x];
    };
    BitMatrix.prototype.set = function (x, y, v) {
        this.data[y * this.width + x] = v ? 1 : 0;
    };
    BitMatrix.prototype.setRegion = function (left, top, width, height, v) {
        for (var y = top; y < top + height; y++) {
            for (var x = left; x < left + width; x++) {
                this.set(x, y, !!v);
            }
        }
    };
    return BitMatrix;
}());
exports.BitMatrix = BitMatrix;


/***/ }),
/* 1 */
/***/ (function(module, exports, __nested_webpack_require_3952__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGFPoly_1 = __nested_webpack_require_3952__(2);
function addOrSubtractGF(a, b) {
    return a ^ b; // tslint:disable-line:no-bitwise
}
exports.addOrSubtractGF = addOrSubtractGF;
var GenericGF = /** @class */ (function () {
    function GenericGF(primitive, size, genBase) {
        this.primitive = primitive;
        this.size = size;
        this.generatorBase = genBase;
        this.expTable = new Array(this.size);
        this.logTable = new Array(this.size);
        var x = 1;
        for (var i = 0; i < this.size; i++) {
            this.expTable[i] = x;
            x = x * 2;
            if (x >= this.size) {
                x = (x ^ this.primitive) & (this.size - 1); // tslint:disable-line:no-bitwise
            }
        }
        for (var i = 0; i < this.size - 1; i++) {
            this.logTable[this.expTable[i]] = i;
        }
        this.zero = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([0]));
        this.one = new GenericGFPoly_1.default(this, Uint8ClampedArray.from([1]));
    }
    GenericGF.prototype.multiply = function (a, b) {
        if (a === 0 || b === 0) {
            return 0;
        }
        return this.expTable[(this.logTable[a] + this.logTable[b]) % (this.size - 1)];
    };
    GenericGF.prototype.inverse = function (a) {
        if (a === 0) {
            throw new Error("Can't invert 0");
        }
        return this.expTable[this.size - this.logTable[a] - 1];
    };
    GenericGF.prototype.buildMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid monomial degree less than 0");
        }
        if (coefficient === 0) {
            return this.zero;
        }
        var coefficients = new Uint8ClampedArray(degree + 1);
        coefficients[0] = coefficient;
        return new GenericGFPoly_1.default(this, coefficients);
    };
    GenericGF.prototype.log = function (a) {
        if (a === 0) {
            throw new Error("Can't take log(0)");
        }
        return this.logTable[a];
    };
    GenericGF.prototype.exp = function (a) {
        return this.expTable[a];
    };
    return GenericGF;
}());
exports.default = GenericGF;


/***/ }),
/* 2 */
/***/ (function(module, exports, __nested_webpack_require_6272__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGF_1 = __nested_webpack_require_6272__(1);
var GenericGFPoly = /** @class */ (function () {
    function GenericGFPoly(field, coefficients) {
        if (coefficients.length === 0) {
            throw new Error("No coefficients.");
        }
        this.field = field;
        var coefficientsLength = coefficients.length;
        if (coefficientsLength > 1 && coefficients[0] === 0) {
            // Leading term must be non-zero for anything except the constant polynomial "0"
            var firstNonZero = 1;
            while (firstNonZero < coefficientsLength && coefficients[firstNonZero] === 0) {
                firstNonZero++;
            }
            if (firstNonZero === coefficientsLength) {
                this.coefficients = field.zero.coefficients;
            }
            else {
                this.coefficients = new Uint8ClampedArray(coefficientsLength - firstNonZero);
                for (var i = 0; i < this.coefficients.length; i++) {
                    this.coefficients[i] = coefficients[firstNonZero + i];
                }
            }
        }
        else {
            this.coefficients = coefficients;
        }
    }
    GenericGFPoly.prototype.degree = function () {
        return this.coefficients.length - 1;
    };
    GenericGFPoly.prototype.isZero = function () {
        return this.coefficients[0] === 0;
    };
    GenericGFPoly.prototype.getCoefficient = function (degree) {
        return this.coefficients[this.coefficients.length - 1 - degree];
    };
    GenericGFPoly.prototype.addOrSubtract = function (other) {
        var _a;
        if (this.isZero()) {
            return other;
        }
        if (other.isZero()) {
            return this;
        }
        var smallerCoefficients = this.coefficients;
        var largerCoefficients = other.coefficients;
        if (smallerCoefficients.length > largerCoefficients.length) {
            _a = [largerCoefficients, smallerCoefficients], smallerCoefficients = _a[0], largerCoefficients = _a[1];
        }
        var sumDiff = new Uint8ClampedArray(largerCoefficients.length);
        var lengthDiff = largerCoefficients.length - smallerCoefficients.length;
        for (var i = 0; i < lengthDiff; i++) {
            sumDiff[i] = largerCoefficients[i];
        }
        for (var i = lengthDiff; i < largerCoefficients.length; i++) {
            sumDiff[i] = GenericGF_1.addOrSubtractGF(smallerCoefficients[i - lengthDiff], largerCoefficients[i]);
        }
        return new GenericGFPoly(this.field, sumDiff);
    };
    GenericGFPoly.prototype.multiply = function (scalar) {
        if (scalar === 0) {
            return this.field.zero;
        }
        if (scalar === 1) {
            return this;
        }
        var size = this.coefficients.length;
        var product = new Uint8ClampedArray(size);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], scalar);
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.multiplyPoly = function (other) {
        if (this.isZero() || other.isZero()) {
            return this.field.zero;
        }
        var aCoefficients = this.coefficients;
        var aLength = aCoefficients.length;
        var bCoefficients = other.coefficients;
        var bLength = bCoefficients.length;
        var product = new Uint8ClampedArray(aLength + bLength - 1);
        for (var i = 0; i < aLength; i++) {
            var aCoeff = aCoefficients[i];
            for (var j = 0; j < bLength; j++) {
                product[i + j] = GenericGF_1.addOrSubtractGF(product[i + j], this.field.multiply(aCoeff, bCoefficients[j]));
            }
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.multiplyByMonomial = function (degree, coefficient) {
        if (degree < 0) {
            throw new Error("Invalid degree less than 0");
        }
        if (coefficient === 0) {
            return this.field.zero;
        }
        var size = this.coefficients.length;
        var product = new Uint8ClampedArray(size + degree);
        for (var i = 0; i < size; i++) {
            product[i] = this.field.multiply(this.coefficients[i], coefficient);
        }
        return new GenericGFPoly(this.field, product);
    };
    GenericGFPoly.prototype.evaluateAt = function (a) {
        var result = 0;
        if (a === 0) {
            // Just return the x^0 coefficient
            return this.getCoefficient(0);
        }
        var size = this.coefficients.length;
        if (a === 1) {
            // Just the sum of the coefficients
            this.coefficients.forEach(function (coefficient) {
                result = GenericGF_1.addOrSubtractGF(result, coefficient);
            });
            return result;
        }
        result = this.coefficients[0];
        for (var i = 1; i < size; i++) {
            result = GenericGF_1.addOrSubtractGF(this.field.multiply(a, result), this.coefficients[i]);
        }
        return result;
    };
    return GenericGFPoly;
}());
exports.default = GenericGFPoly;


/***/ }),
/* 3 */
/***/ (function(module, exports, __nested_webpack_require_11547__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var binarizer_1 = __nested_webpack_require_11547__(4);
var decoder_1 = __nested_webpack_require_11547__(5);
var extractor_1 = __nested_webpack_require_11547__(11);
var locator_1 = __nested_webpack_require_11547__(12);
function scan(matrix) {
    var locations = locator_1.locate(matrix);
    if (!locations) {
        return null;
    }
    for (var _i = 0, locations_1 = locations; _i < locations_1.length; _i++) {
        var location_1 = locations_1[_i];
        var extracted = extractor_1.extract(matrix, location_1);
        var decoded = decoder_1.decode(extracted.matrix);
        if (decoded) {
            return {
                binaryData: decoded.bytes,
                data: decoded.text,
                chunks: decoded.chunks,
                version: decoded.version,
                location: {
                    topRightCorner: extracted.mappingFunction(location_1.dimension, 0),
                    topLeftCorner: extracted.mappingFunction(0, 0),
                    bottomRightCorner: extracted.mappingFunction(location_1.dimension, location_1.dimension),
                    bottomLeftCorner: extracted.mappingFunction(0, location_1.dimension),
                    topRightFinderPattern: location_1.topRight,
                    topLeftFinderPattern: location_1.topLeft,
                    bottomLeftFinderPattern: location_1.bottomLeft,
                    bottomRightAlignmentPattern: location_1.alignmentPattern,
                },
            };
        }
    }
    return null;
}
var defaultOptions = {
    inversionAttempts: "attemptBoth",
};
function jsQR(data, width, height, providedOptions) {
    if (providedOptions === void 0) { providedOptions = {}; }
    var options = defaultOptions;
    Object.keys(options || {}).forEach(function (opt) {
        options[opt] = providedOptions[opt] || options[opt];
    });
    var shouldInvert = options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst";
    var tryInvertedFirst = options.inversionAttempts === "onlyInvert" || options.inversionAttempts === "invertFirst";
    var _a = binarizer_1.binarize(data, width, height, shouldInvert), binarized = _a.binarized, inverted = _a.inverted;
    var result = scan(tryInvertedFirst ? inverted : binarized);
    if (!result && (options.inversionAttempts === "attemptBoth" || options.inversionAttempts === "invertFirst")) {
        result = scan(tryInvertedFirst ? binarized : inverted);
    }
    return result;
}
jsQR.default = jsQR;
exports.default = jsQR;


/***/ }),
/* 4 */
/***/ (function(module, exports, __nested_webpack_require_14168__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __nested_webpack_require_14168__(0);
var REGION_SIZE = 8;
var MIN_DYNAMIC_RANGE = 24;
function numBetween(value, min, max) {
    return value < min ? min : value > max ? max : value;
}
// Like BitMatrix but accepts arbitry Uint8 values
var Matrix = /** @class */ (function () {
    function Matrix(width, height) {
        this.width = width;
        this.data = new Uint8ClampedArray(width * height);
    }
    Matrix.prototype.get = function (x, y) {
        return this.data[y * this.width + x];
    };
    Matrix.prototype.set = function (x, y, value) {
        this.data[y * this.width + x] = value;
    };
    return Matrix;
}());
function binarize(data, width, height, returnInverted) {
    if (data.length !== width * height * 4) {
        throw new Error("Malformed data passed to binarizer.");
    }
    // Convert image to greyscale
    var greyscalePixels = new Matrix(width, height);
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var r = data[((y * width + x) * 4) + 0];
            var g = data[((y * width + x) * 4) + 1];
            var b = data[((y * width + x) * 4) + 2];
            greyscalePixels.set(x, y, 0.2126 * r + 0.7152 * g + 0.0722 * b);
        }
    }
    var horizontalRegionCount = Math.ceil(width / REGION_SIZE);
    var verticalRegionCount = Math.ceil(height / REGION_SIZE);
    var blackPoints = new Matrix(horizontalRegionCount, verticalRegionCount);
    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var sum = 0;
            var min = Infinity;
            var max = 0;
            for (var y = 0; y < REGION_SIZE; y++) {
                for (var x = 0; x < REGION_SIZE; x++) {
                    var pixelLumosity = greyscalePixels.get(hortizontalRegion * REGION_SIZE + x, verticalRegion * REGION_SIZE + y);
                    sum += pixelLumosity;
                    min = Math.min(min, pixelLumosity);
                    max = Math.max(max, pixelLumosity);
                }
            }
            var average = sum / (Math.pow(REGION_SIZE, 2));
            if (max - min <= MIN_DYNAMIC_RANGE) {
                // If variation within the block is low, assume this is a block with only light or only
                // dark pixels. In that case we do not want to use the average, as it would divide this
                // low contrast area into black and white pixels, essentially creating data out of noise.
                //
                // Default the blackpoint for these blocks to be half the min - effectively white them out
                average = min / 2;
                if (verticalRegion > 0 && hortizontalRegion > 0) {
                    // Correct the "white background" assumption for blocks that have neighbors by comparing
                    // the pixels in this block to the previously calculated black points. This is based on
                    // the fact that dark barcode symbology is always surrounded by some amount of light
                    // background for which reasonable black point estimates were made. The bp estimated at
                    // the boundaries is used for the interior.
                    // The (min < bp) is arbitrary but works better than other heuristics that were tried.
                    var averageNeighborBlackPoint = (blackPoints.get(hortizontalRegion, verticalRegion - 1) +
                        (2 * blackPoints.get(hortizontalRegion - 1, verticalRegion)) +
                        blackPoints.get(hortizontalRegion - 1, verticalRegion - 1)) / 4;
                    if (min < averageNeighborBlackPoint) {
                        average = averageNeighborBlackPoint;
                    }
                }
            }
            blackPoints.set(hortizontalRegion, verticalRegion, average);
        }
    }
    var binarized = BitMatrix_1.BitMatrix.createEmpty(width, height);
    var inverted = null;
    if (returnInverted) {
        inverted = BitMatrix_1.BitMatrix.createEmpty(width, height);
    }
    for (var verticalRegion = 0; verticalRegion < verticalRegionCount; verticalRegion++) {
        for (var hortizontalRegion = 0; hortizontalRegion < horizontalRegionCount; hortizontalRegion++) {
            var left = numBetween(hortizontalRegion, 2, horizontalRegionCount - 3);
            var top_1 = numBetween(verticalRegion, 2, verticalRegionCount - 3);
            var sum = 0;
            for (var xRegion = -2; xRegion <= 2; xRegion++) {
                for (var yRegion = -2; yRegion <= 2; yRegion++) {
                    sum += blackPoints.get(left + xRegion, top_1 + yRegion);
                }
            }
            var threshold = sum / 25;
            for (var xRegion = 0; xRegion < REGION_SIZE; xRegion++) {
                for (var yRegion = 0; yRegion < REGION_SIZE; yRegion++) {
                    var x = hortizontalRegion * REGION_SIZE + xRegion;
                    var y = verticalRegion * REGION_SIZE + yRegion;
                    var lum = greyscalePixels.get(x, y);
                    binarized.set(x, y, lum <= threshold);
                    if (returnInverted) {
                        inverted.set(x, y, !(lum <= threshold));
                    }
                }
            }
        }
    }
    if (returnInverted) {
        return { binarized: binarized, inverted: inverted };
    }
    return { binarized: binarized };
}
exports.binarize = binarize;


/***/ }),
/* 5 */
/***/ (function(module, exports, __nested_webpack_require_19864__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __nested_webpack_require_19864__(0);
var decodeData_1 = __nested_webpack_require_19864__(6);
var reedsolomon_1 = __nested_webpack_require_19864__(9);
var version_1 = __nested_webpack_require_19864__(10);
// tslint:disable:no-bitwise
function numBitsDiffering(x, y) {
    var z = x ^ y;
    var bitCount = 0;
    while (z) {
        bitCount++;
        z &= z - 1;
    }
    return bitCount;
}
function pushBit(bit, byte) {
    return (byte << 1) | bit;
}
// tslint:enable:no-bitwise
var FORMAT_INFO_TABLE = [
    { bits: 0x5412, formatInfo: { errorCorrectionLevel: 1, dataMask: 0 } },
    { bits: 0x5125, formatInfo: { errorCorrectionLevel: 1, dataMask: 1 } },
    { bits: 0x5E7C, formatInfo: { errorCorrectionLevel: 1, dataMask: 2 } },
    { bits: 0x5B4B, formatInfo: { errorCorrectionLevel: 1, dataMask: 3 } },
    { bits: 0x45F9, formatInfo: { errorCorrectionLevel: 1, dataMask: 4 } },
    { bits: 0x40CE, formatInfo: { errorCorrectionLevel: 1, dataMask: 5 } },
    { bits: 0x4F97, formatInfo: { errorCorrectionLevel: 1, dataMask: 6 } },
    { bits: 0x4AA0, formatInfo: { errorCorrectionLevel: 1, dataMask: 7 } },
    { bits: 0x77C4, formatInfo: { errorCorrectionLevel: 0, dataMask: 0 } },
    { bits: 0x72F3, formatInfo: { errorCorrectionLevel: 0, dataMask: 1 } },
    { bits: 0x7DAA, formatInfo: { errorCorrectionLevel: 0, dataMask: 2 } },
    { bits: 0x789D, formatInfo: { errorCorrectionLevel: 0, dataMask: 3 } },
    { bits: 0x662F, formatInfo: { errorCorrectionLevel: 0, dataMask: 4 } },
    { bits: 0x6318, formatInfo: { errorCorrectionLevel: 0, dataMask: 5 } },
    { bits: 0x6C41, formatInfo: { errorCorrectionLevel: 0, dataMask: 6 } },
    { bits: 0x6976, formatInfo: { errorCorrectionLevel: 0, dataMask: 7 } },
    { bits: 0x1689, formatInfo: { errorCorrectionLevel: 3, dataMask: 0 } },
    { bits: 0x13BE, formatInfo: { errorCorrectionLevel: 3, dataMask: 1 } },
    { bits: 0x1CE7, formatInfo: { errorCorrectionLevel: 3, dataMask: 2 } },
    { bits: 0x19D0, formatInfo: { errorCorrectionLevel: 3, dataMask: 3 } },
    { bits: 0x0762, formatInfo: { errorCorrectionLevel: 3, dataMask: 4 } },
    { bits: 0x0255, formatInfo: { errorCorrectionLevel: 3, dataMask: 5 } },
    { bits: 0x0D0C, formatInfo: { errorCorrectionLevel: 3, dataMask: 6 } },
    { bits: 0x083B, formatInfo: { errorCorrectionLevel: 3, dataMask: 7 } },
    { bits: 0x355F, formatInfo: { errorCorrectionLevel: 2, dataMask: 0 } },
    { bits: 0x3068, formatInfo: { errorCorrectionLevel: 2, dataMask: 1 } },
    { bits: 0x3F31, formatInfo: { errorCorrectionLevel: 2, dataMask: 2 } },
    { bits: 0x3A06, formatInfo: { errorCorrectionLevel: 2, dataMask: 3 } },
    { bits: 0x24B4, formatInfo: { errorCorrectionLevel: 2, dataMask: 4 } },
    { bits: 0x2183, formatInfo: { errorCorrectionLevel: 2, dataMask: 5 } },
    { bits: 0x2EDA, formatInfo: { errorCorrectionLevel: 2, dataMask: 6 } },
    { bits: 0x2BED, formatInfo: { errorCorrectionLevel: 2, dataMask: 7 } },
];
var DATA_MASKS = [
    function (p) { return ((p.y + p.x) % 2) === 0; },
    function (p) { return (p.y % 2) === 0; },
    function (p) { return p.x % 3 === 0; },
    function (p) { return (p.y + p.x) % 3 === 0; },
    function (p) { return (Math.floor(p.y / 2) + Math.floor(p.x / 3)) % 2 === 0; },
    function (p) { return ((p.x * p.y) % 2) + ((p.x * p.y) % 3) === 0; },
    function (p) { return ((((p.y * p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
    function (p) { return ((((p.y + p.x) % 2) + (p.y * p.x) % 3) % 2) === 0; },
];
function buildFunctionPatternMask(version) {
    var dimension = 17 + 4 * version.versionNumber;
    var matrix = BitMatrix_1.BitMatrix.createEmpty(dimension, dimension);
    matrix.setRegion(0, 0, 9, 9, true); // Top left finder pattern + separator + format
    matrix.setRegion(dimension - 8, 0, 8, 9, true); // Top right finder pattern + separator + format
    matrix.setRegion(0, dimension - 8, 9, 8, true); // Bottom left finder pattern + separator + format
    // Alignment patterns
    for (var _i = 0, _a = version.alignmentPatternCenters; _i < _a.length; _i++) {
        var x = _a[_i];
        for (var _b = 0, _c = version.alignmentPatternCenters; _b < _c.length; _b++) {
            var y = _c[_b];
            if (!(x === 6 && y === 6 || x === 6 && y === dimension - 7 || x === dimension - 7 && y === 6)) {
                matrix.setRegion(x - 2, y - 2, 5, 5, true);
            }
        }
    }
    matrix.setRegion(6, 9, 1, dimension - 17, true); // Vertical timing pattern
    matrix.setRegion(9, 6, dimension - 17, 1, true); // Horizontal timing pattern
    if (version.versionNumber > 6) {
        matrix.setRegion(dimension - 11, 0, 3, 6, true); // Version info, top right
        matrix.setRegion(0, dimension - 11, 6, 3, true); // Version info, bottom left
    }
    return matrix;
}
function readCodewords(matrix, version, formatInfo) {
    var dataMask = DATA_MASKS[formatInfo.dataMask];
    var dimension = matrix.height;
    var functionPatternMask = buildFunctionPatternMask(version);
    var codewords = [];
    var currentByte = 0;
    var bitsRead = 0;
    // Read columns in pairs, from right to left
    var readingUp = true;
    for (var columnIndex = dimension - 1; columnIndex > 0; columnIndex -= 2) {
        if (columnIndex === 6) { // Skip whole column with vertical alignment pattern;
            columnIndex--;
        }
        for (var i = 0; i < dimension; i++) {
            var y = readingUp ? dimension - 1 - i : i;
            for (var columnOffset = 0; columnOffset < 2; columnOffset++) {
                var x = columnIndex - columnOffset;
                if (!functionPatternMask.get(x, y)) {
                    bitsRead++;
                    var bit = matrix.get(x, y);
                    if (dataMask({ y: y, x: x })) {
                        bit = !bit;
                    }
                    currentByte = pushBit(bit, currentByte);
                    if (bitsRead === 8) { // Whole bytes
                        codewords.push(currentByte);
                        bitsRead = 0;
                        currentByte = 0;
                    }
                }
            }
        }
        readingUp = !readingUp;
    }
    return codewords;
}
function readVersion(matrix) {
    var dimension = matrix.height;
    var provisionalVersion = Math.floor((dimension - 17) / 4);
    if (provisionalVersion <= 6) { // 6 and under dont have version info in the QR code
        return version_1.VERSIONS[provisionalVersion - 1];
    }
    var topRightVersionBits = 0;
    for (var y = 5; y >= 0; y--) {
        for (var x = dimension - 9; x >= dimension - 11; x--) {
            topRightVersionBits = pushBit(matrix.get(x, y), topRightVersionBits);
        }
    }
    var bottomLeftVersionBits = 0;
    for (var x = 5; x >= 0; x--) {
        for (var y = dimension - 9; y >= dimension - 11; y--) {
            bottomLeftVersionBits = pushBit(matrix.get(x, y), bottomLeftVersionBits);
        }
    }
    var bestDifference = Infinity;
    var bestVersion;
    for (var _i = 0, VERSIONS_1 = version_1.VERSIONS; _i < VERSIONS_1.length; _i++) {
        var version = VERSIONS_1[_i];
        if (version.infoBits === topRightVersionBits || version.infoBits === bottomLeftVersionBits) {
            return version;
        }
        var difference = numBitsDiffering(topRightVersionBits, version.infoBits);
        if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
        }
        difference = numBitsDiffering(bottomLeftVersionBits, version.infoBits);
        if (difference < bestDifference) {
            bestVersion = version;
            bestDifference = difference;
        }
    }
    // We can tolerate up to 3 bits of error since no two version info codewords will
    // differ in less than 8 bits.
    if (bestDifference <= 3) {
        return bestVersion;
    }
}
function readFormatInformation(matrix) {
    var topLeftFormatInfoBits = 0;
    for (var x = 0; x <= 8; x++) {
        if (x !== 6) { // Skip timing pattern bit
            topLeftFormatInfoBits = pushBit(matrix.get(x, 8), topLeftFormatInfoBits);
        }
    }
    for (var y = 7; y >= 0; y--) {
        if (y !== 6) { // Skip timing pattern bit
            topLeftFormatInfoBits = pushBit(matrix.get(8, y), topLeftFormatInfoBits);
        }
    }
    var dimension = matrix.height;
    var topRightBottomRightFormatInfoBits = 0;
    for (var y = dimension - 1; y >= dimension - 7; y--) { // bottom left
        topRightBottomRightFormatInfoBits = pushBit(matrix.get(8, y), topRightBottomRightFormatInfoBits);
    }
    for (var x = dimension - 8; x < dimension; x++) { // top right
        topRightBottomRightFormatInfoBits = pushBit(matrix.get(x, 8), topRightBottomRightFormatInfoBits);
    }
    var bestDifference = Infinity;
    var bestFormatInfo = null;
    for (var _i = 0, FORMAT_INFO_TABLE_1 = FORMAT_INFO_TABLE; _i < FORMAT_INFO_TABLE_1.length; _i++) {
        var _a = FORMAT_INFO_TABLE_1[_i], bits = _a.bits, formatInfo = _a.formatInfo;
        if (bits === topLeftFormatInfoBits || bits === topRightBottomRightFormatInfoBits) {
            return formatInfo;
        }
        var difference = numBitsDiffering(topLeftFormatInfoBits, bits);
        if (difference < bestDifference) {
            bestFormatInfo = formatInfo;
            bestDifference = difference;
        }
        if (topLeftFormatInfoBits !== topRightBottomRightFormatInfoBits) { // also try the other option
            difference = numBitsDiffering(topRightBottomRightFormatInfoBits, bits);
            if (difference < bestDifference) {
                bestFormatInfo = formatInfo;
                bestDifference = difference;
            }
        }
    }
    // Hamming distance of the 32 masked codes is 7, by construction, so <= 3 bits differing means we found a match
    if (bestDifference <= 3) {
        return bestFormatInfo;
    }
    return null;
}
function getDataBlocks(codewords, version, ecLevel) {
    var ecInfo = version.errorCorrectionLevels[ecLevel];
    var dataBlocks = [];
    var totalCodewords = 0;
    ecInfo.ecBlocks.forEach(function (block) {
        for (var i = 0; i < block.numBlocks; i++) {
            dataBlocks.push({ numDataCodewords: block.dataCodewordsPerBlock, codewords: [] });
            totalCodewords += block.dataCodewordsPerBlock + ecInfo.ecCodewordsPerBlock;
        }
    });
    // In some cases the QR code will be malformed enough that we pull off more or less than we should.
    // If we pull off less there's nothing we can do.
    // If we pull off more we can safely truncate
    if (codewords.length < totalCodewords) {
        return null;
    }
    codewords = codewords.slice(0, totalCodewords);
    var shortBlockSize = ecInfo.ecBlocks[0].dataCodewordsPerBlock;
    // Pull codewords to fill the blocks up to the minimum size
    for (var i = 0; i < shortBlockSize; i++) {
        for (var _i = 0, dataBlocks_1 = dataBlocks; _i < dataBlocks_1.length; _i++) {
            var dataBlock = dataBlocks_1[_i];
            dataBlock.codewords.push(codewords.shift());
        }
    }
    // If there are any large blocks, pull codewords to fill the last element of those
    if (ecInfo.ecBlocks.length > 1) {
        var smallBlockCount = ecInfo.ecBlocks[0].numBlocks;
        var largeBlockCount = ecInfo.ecBlocks[1].numBlocks;
        for (var i = 0; i < largeBlockCount; i++) {
            dataBlocks[smallBlockCount + i].codewords.push(codewords.shift());
        }
    }
    // Add the rest of the codewords to the blocks. These are the error correction codewords.
    while (codewords.length > 0) {
        for (var _a = 0, dataBlocks_2 = dataBlocks; _a < dataBlocks_2.length; _a++) {
            var dataBlock = dataBlocks_2[_a];
            dataBlock.codewords.push(codewords.shift());
        }
    }
    return dataBlocks;
}
function decodeMatrix(matrix) {
    var version = readVersion(matrix);
    if (!version) {
        return null;
    }
    var formatInfo = readFormatInformation(matrix);
    if (!formatInfo) {
        return null;
    }
    var codewords = readCodewords(matrix, version, formatInfo);
    var dataBlocks = getDataBlocks(codewords, version, formatInfo.errorCorrectionLevel);
    if (!dataBlocks) {
        return null;
    }
    // Count total number of data bytes
    var totalBytes = dataBlocks.reduce(function (a, b) { return a + b.numDataCodewords; }, 0);
    var resultBytes = new Uint8ClampedArray(totalBytes);
    var resultIndex = 0;
    for (var _i = 0, dataBlocks_3 = dataBlocks; _i < dataBlocks_3.length; _i++) {
        var dataBlock = dataBlocks_3[_i];
        var correctedBytes = reedsolomon_1.decode(dataBlock.codewords, dataBlock.codewords.length - dataBlock.numDataCodewords);
        if (!correctedBytes) {
            return null;
        }
        for (var i = 0; i < dataBlock.numDataCodewords; i++) {
            resultBytes[resultIndex++] = correctedBytes[i];
        }
    }
    try {
        return decodeData_1.decode(resultBytes, version.versionNumber);
    }
    catch (_a) {
        return null;
    }
}
function decode(matrix) {
    if (matrix == null) {
        return null;
    }
    var result = decodeMatrix(matrix);
    if (result) {
        return result;
    }
    // Decoding didn't work, try mirroring the QR across the topLeft -> bottomRight line.
    for (var x = 0; x < matrix.width; x++) {
        for (var y = x + 1; y < matrix.height; y++) {
            if (matrix.get(x, y) !== matrix.get(y, x)) {
                matrix.set(x, y, !matrix.get(x, y));
                matrix.set(y, x, !matrix.get(y, x));
            }
        }
    }
    return decodeMatrix(matrix);
}
exports.decode = decode;


/***/ }),
/* 6 */
/***/ (function(module, exports, __nested_webpack_require_33675__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-bitwise
var BitStream_1 = __nested_webpack_require_33675__(7);
var shiftJISTable_1 = __nested_webpack_require_33675__(8);
var Mode;
(function (Mode) {
    Mode["Numeric"] = "numeric";
    Mode["Alphanumeric"] = "alphanumeric";
    Mode["Byte"] = "byte";
    Mode["Kanji"] = "kanji";
    Mode["ECI"] = "eci";
})(Mode = exports.Mode || (exports.Mode = {}));
var ModeByte;
(function (ModeByte) {
    ModeByte[ModeByte["Terminator"] = 0] = "Terminator";
    ModeByte[ModeByte["Numeric"] = 1] = "Numeric";
    ModeByte[ModeByte["Alphanumeric"] = 2] = "Alphanumeric";
    ModeByte[ModeByte["Byte"] = 4] = "Byte";
    ModeByte[ModeByte["Kanji"] = 8] = "Kanji";
    ModeByte[ModeByte["ECI"] = 7] = "ECI";
    // StructuredAppend = 0x3,
    // FNC1FirstPosition = 0x5,
    // FNC1SecondPosition = 0x9,
})(ModeByte || (ModeByte = {}));
function decodeNumeric(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [10, 12, 14][size];
    var length = stream.readBits(characterCountSize);
    // Read digits in groups of 3
    while (length >= 3) {
        var num = stream.readBits(10);
        if (num >= 1000) {
            throw new Error("Invalid numeric value above 999");
        }
        var a = Math.floor(num / 100);
        var b = Math.floor(num / 10) % 10;
        var c = num % 10;
        bytes.push(48 + a, 48 + b, 48 + c);
        text += a.toString() + b.toString() + c.toString();
        length -= 3;
    }
    // If the number of digits aren't a multiple of 3, the remaining digits are special cased.
    if (length === 2) {
        var num = stream.readBits(7);
        if (num >= 100) {
            throw new Error("Invalid numeric value above 99");
        }
        var a = Math.floor(num / 10);
        var b = num % 10;
        bytes.push(48 + a, 48 + b);
        text += a.toString() + b.toString();
    }
    else if (length === 1) {
        var num = stream.readBits(4);
        if (num >= 10) {
            throw new Error("Invalid numeric value above 9");
        }
        bytes.push(48 + num);
        text += num.toString();
    }
    return { bytes: bytes, text: text };
}
var AlphanumericCharacterCodes = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8",
    "9", "A", "B", "C", "D", "E", "F", "G", "H",
    "I", "J", "K", "L", "M", "N", "O", "P", "Q",
    "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
    " ", "$", "%", "*", "+", "-", ".", "/", ":",
];
function decodeAlphanumeric(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [9, 11, 13][size];
    var length = stream.readBits(characterCountSize);
    while (length >= 2) {
        var v = stream.readBits(11);
        var a = Math.floor(v / 45);
        var b = v % 45;
        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0), AlphanumericCharacterCodes[b].charCodeAt(0));
        text += AlphanumericCharacterCodes[a] + AlphanumericCharacterCodes[b];
        length -= 2;
    }
    if (length === 1) {
        var a = stream.readBits(6);
        bytes.push(AlphanumericCharacterCodes[a].charCodeAt(0));
        text += AlphanumericCharacterCodes[a];
    }
    return { bytes: bytes, text: text };
}
function decodeByte(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [8, 16, 16][size];
    var length = stream.readBits(characterCountSize);
    for (var i = 0; i < length; i++) {
        var b = stream.readBits(8);
        bytes.push(b);
    }
    try {
        text += decodeURIComponent(bytes.map(function (b) { return "%" + ("0" + b.toString(16)).substr(-2); }).join(""));
    }
    catch (_a) {
        // failed to decode
    }
    return { bytes: bytes, text: text };
}
function decodeKanji(stream, size) {
    var bytes = [];
    var text = "";
    var characterCountSize = [8, 10, 12][size];
    var length = stream.readBits(characterCountSize);
    for (var i = 0; i < length; i++) {
        var k = stream.readBits(13);
        var c = (Math.floor(k / 0xC0) << 8) | (k % 0xC0);
        if (c < 0x1F00) {
            c += 0x8140;
        }
        else {
            c += 0xC140;
        }
        bytes.push(c >> 8, c & 0xFF);
        text += String.fromCharCode(shiftJISTable_1.shiftJISTable[c]);
    }
    return { bytes: bytes, text: text };
}
function decode(data, version) {
    var _a, _b, _c, _d;
    var stream = new BitStream_1.BitStream(data);
    // There are 3 'sizes' based on the version. 1-9 is small (0), 10-26 is medium (1) and 27-40 is large (2).
    var size = version <= 9 ? 0 : version <= 26 ? 1 : 2;
    var result = {
        text: "",
        bytes: [],
        chunks: [],
        version: version,
    };
    while (stream.available() >= 4) {
        var mode = stream.readBits(4);
        if (mode === ModeByte.Terminator) {
            return result;
        }
        else if (mode === ModeByte.ECI) {
            if (stream.readBits(1) === 0) {
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: stream.readBits(7),
                });
            }
            else if (stream.readBits(1) === 0) {
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: stream.readBits(14),
                });
            }
            else if (stream.readBits(1) === 0) {
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: stream.readBits(21),
                });
            }
            else {
                // ECI data seems corrupted
                result.chunks.push({
                    type: Mode.ECI,
                    assignmentNumber: -1,
                });
            }
        }
        else if (mode === ModeByte.Numeric) {
            var numericResult = decodeNumeric(stream, size);
            result.text += numericResult.text;
            (_a = result.bytes).push.apply(_a, numericResult.bytes);
            result.chunks.push({
                type: Mode.Numeric,
                text: numericResult.text,
            });
        }
        else if (mode === ModeByte.Alphanumeric) {
            var alphanumericResult = decodeAlphanumeric(stream, size);
            result.text += alphanumericResult.text;
            (_b = result.bytes).push.apply(_b, alphanumericResult.bytes);
            result.chunks.push({
                type: Mode.Alphanumeric,
                text: alphanumericResult.text,
            });
        }
        else if (mode === ModeByte.Byte) {
            var byteResult = decodeByte(stream, size);
            result.text += byteResult.text;
            (_c = result.bytes).push.apply(_c, byteResult.bytes);
            result.chunks.push({
                type: Mode.Byte,
                bytes: byteResult.bytes,
                text: byteResult.text,
            });
        }
        else if (mode === ModeByte.Kanji) {
            var kanjiResult = decodeKanji(stream, size);
            result.text += kanjiResult.text;
            (_d = result.bytes).push.apply(_d, kanjiResult.bytes);
            result.chunks.push({
                type: Mode.Kanji,
                bytes: kanjiResult.bytes,
                text: kanjiResult.text,
            });
        }
    }
    // If there is no data left, or the remaining bits are all 0, then that counts as a termination marker
    if (stream.available() === 0 || stream.readBits(stream.available()) === 0) {
        return result;
    }
}
exports.decode = decode;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// tslint:disable:no-bitwise
Object.defineProperty(exports, "__esModule", { value: true });
var BitStream = /** @class */ (function () {
    function BitStream(bytes) {
        this.byteOffset = 0;
        this.bitOffset = 0;
        this.bytes = bytes;
    }
    BitStream.prototype.readBits = function (numBits) {
        if (numBits < 1 || numBits > 32 || numBits > this.available()) {
            throw new Error("Cannot read " + numBits.toString() + " bits");
        }
        var result = 0;
        // First, read remainder from current byte
        if (this.bitOffset > 0) {
            var bitsLeft = 8 - this.bitOffset;
            var toRead = numBits < bitsLeft ? numBits : bitsLeft;
            var bitsToNotRead = bitsLeft - toRead;
            var mask = (0xFF >> (8 - toRead)) << bitsToNotRead;
            result = (this.bytes[this.byteOffset] & mask) >> bitsToNotRead;
            numBits -= toRead;
            this.bitOffset += toRead;
            if (this.bitOffset === 8) {
                this.bitOffset = 0;
                this.byteOffset++;
            }
        }
        // Next read whole bytes
        if (numBits > 0) {
            while (numBits >= 8) {
                result = (result << 8) | (this.bytes[this.byteOffset] & 0xFF);
                this.byteOffset++;
                numBits -= 8;
            }
            // Finally read a partial byte
            if (numBits > 0) {
                var bitsToNotRead = 8 - numBits;
                var mask = (0xFF >> bitsToNotRead) << bitsToNotRead;
                result = (result << numBits) | ((this.bytes[this.byteOffset] & mask) >> bitsToNotRead);
                this.bitOffset += numBits;
            }
        }
        return result;
    };
    BitStream.prototype.available = function () {
        return 8 * (this.bytes.length - this.byteOffset) - this.bitOffset;
    };
    return BitStream;
}());
exports.BitStream = BitStream;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.shiftJISTable = {
    0x20: 0x0020,
    0x21: 0x0021,
    0x22: 0x0022,
    0x23: 0x0023,
    0x24: 0x0024,
    0x25: 0x0025,
    0x26: 0x0026,
    0x27: 0x0027,
    0x28: 0x0028,
    0x29: 0x0029,
    0x2A: 0x002A,
    0x2B: 0x002B,
    0x2C: 0x002C,
    0x2D: 0x002D,
    0x2E: 0x002E,
    0x2F: 0x002F,
    0x30: 0x0030,
    0x31: 0x0031,
    0x32: 0x0032,
    0x33: 0x0033,
    0x34: 0x0034,
    0x35: 0x0035,
    0x36: 0x0036,
    0x37: 0x0037,
    0x38: 0x0038,
    0x39: 0x0039,
    0x3A: 0x003A,
    0x3B: 0x003B,
    0x3C: 0x003C,
    0x3D: 0x003D,
    0x3E: 0x003E,
    0x3F: 0x003F,
    0x40: 0x0040,
    0x41: 0x0041,
    0x42: 0x0042,
    0x43: 0x0043,
    0x44: 0x0044,
    0x45: 0x0045,
    0x46: 0x0046,
    0x47: 0x0047,
    0x48: 0x0048,
    0x49: 0x0049,
    0x4A: 0x004A,
    0x4B: 0x004B,
    0x4C: 0x004C,
    0x4D: 0x004D,
    0x4E: 0x004E,
    0x4F: 0x004F,
    0x50: 0x0050,
    0x51: 0x0051,
    0x52: 0x0052,
    0x53: 0x0053,
    0x54: 0x0054,
    0x55: 0x0055,
    0x56: 0x0056,
    0x57: 0x0057,
    0x58: 0x0058,
    0x59: 0x0059,
    0x5A: 0x005A,
    0x5B: 0x005B,
    0x5C: 0x00A5,
    0x5D: 0x005D,
    0x5E: 0x005E,
    0x5F: 0x005F,
    0x60: 0x0060,
    0x61: 0x0061,
    0x62: 0x0062,
    0x63: 0x0063,
    0x64: 0x0064,
    0x65: 0x0065,
    0x66: 0x0066,
    0x67: 0x0067,
    0x68: 0x0068,
    0x69: 0x0069,
    0x6A: 0x006A,
    0x6B: 0x006B,
    0x6C: 0x006C,
    0x6D: 0x006D,
    0x6E: 0x006E,
    0x6F: 0x006F,
    0x70: 0x0070,
    0x71: 0x0071,
    0x72: 0x0072,
    0x73: 0x0073,
    0x74: 0x0074,
    0x75: 0x0075,
    0x76: 0x0076,
    0x77: 0x0077,
    0x78: 0x0078,
    0x79: 0x0079,
    0x7A: 0x007A,
    0x7B: 0x007B,
    0x7C: 0x007C,
    0x7D: 0x007D,
    0x7E: 0x203E,
    0x8140: 0x3000,
    0x8141: 0x3001,
    0x8142: 0x3002,
    0x8143: 0xFF0C,
    0x8144: 0xFF0E,
    0x8145: 0x30FB,
    0x8146: 0xFF1A,
    0x8147: 0xFF1B,
    0x8148: 0xFF1F,
    0x8149: 0xFF01,
    0x814A: 0x309B,
    0x814B: 0x309C,
    0x814C: 0x00B4,
    0x814D: 0xFF40,
    0x814E: 0x00A8,
    0x814F: 0xFF3E,
    0x8150: 0xFFE3,
    0x8151: 0xFF3F,
    0x8152: 0x30FD,
    0x8153: 0x30FE,
    0x8154: 0x309D,
    0x8155: 0x309E,
    0x8156: 0x3003,
    0x8157: 0x4EDD,
    0x8158: 0x3005,
    0x8159: 0x3006,
    0x815A: 0x3007,
    0x815B: 0x30FC,
    0x815C: 0x2015,
    0x815D: 0x2010,
    0x815E: 0xFF0F,
    0x815F: 0x005C,
    0x8160: 0x301C,
    0x8161: 0x2016,
    0x8162: 0xFF5C,
    0x8163: 0x2026,
    0x8164: 0x2025,
    0x8165: 0x2018,
    0x8166: 0x2019,
    0x8167: 0x201C,
    0x8168: 0x201D,
    0x8169: 0xFF08,
    0x816A: 0xFF09,
    0x816B: 0x3014,
    0x816C: 0x3015,
    0x816D: 0xFF3B,
    0x816E: 0xFF3D,
    0x816F: 0xFF5B,
    0x8170: 0xFF5D,
    0x8171: 0x3008,
    0x8172: 0x3009,
    0x8173: 0x300A,
    0x8174: 0x300B,
    0x8175: 0x300C,
    0x8176: 0x300D,
    0x8177: 0x300E,
    0x8178: 0x300F,
    0x8179: 0x3010,
    0x817A: 0x3011,
    0x817B: 0xFF0B,
    0x817C: 0x2212,
    0x817D: 0x00B1,
    0x817E: 0x00D7,
    0x8180: 0x00F7,
    0x8181: 0xFF1D,
    0x8182: 0x2260,
    0x8183: 0xFF1C,
    0x8184: 0xFF1E,
    0x8185: 0x2266,
    0x8186: 0x2267,
    0x8187: 0x221E,
    0x8188: 0x2234,
    0x8189: 0x2642,
    0x818A: 0x2640,
    0x818B: 0x00B0,
    0x818C: 0x2032,
    0x818D: 0x2033,
    0x818E: 0x2103,
    0x818F: 0xFFE5,
    0x8190: 0xFF04,
    0x8191: 0x00A2,
    0x8192: 0x00A3,
    0x8193: 0xFF05,
    0x8194: 0xFF03,
    0x8195: 0xFF06,
    0x8196: 0xFF0A,
    0x8197: 0xFF20,
    0x8198: 0x00A7,
    0x8199: 0x2606,
    0x819A: 0x2605,
    0x819B: 0x25CB,
    0x819C: 0x25CF,
    0x819D: 0x25CE,
    0x819E: 0x25C7,
    0x819F: 0x25C6,
    0x81A0: 0x25A1,
    0x81A1: 0x25A0,
    0x81A2: 0x25B3,
    0x81A3: 0x25B2,
    0x81A4: 0x25BD,
    0x81A5: 0x25BC,
    0x81A6: 0x203B,
    0x81A7: 0x3012,
    0x81A8: 0x2192,
    0x81A9: 0x2190,
    0x81AA: 0x2191,
    0x81AB: 0x2193,
    0x81AC: 0x3013,
    0x81B8: 0x2208,
    0x81B9: 0x220B,
    0x81BA: 0x2286,
    0x81BB: 0x2287,
    0x81BC: 0x2282,
    0x81BD: 0x2283,
    0x81BE: 0x222A,
    0x81BF: 0x2229,
    0x81C8: 0x2227,
    0x81C9: 0x2228,
    0x81CA: 0x00AC,
    0x81CB: 0x21D2,
    0x81CC: 0x21D4,
    0x81CD: 0x2200,
    0x81CE: 0x2203,
    0x81DA: 0x2220,
    0x81DB: 0x22A5,
    0x81DC: 0x2312,
    0x81DD: 0x2202,
    0x81DE: 0x2207,
    0x81DF: 0x2261,
    0x81E0: 0x2252,
    0x81E1: 0x226A,
    0x81E2: 0x226B,
    0x81E3: 0x221A,
    0x81E4: 0x223D,
    0x81E5: 0x221D,
    0x81E6: 0x2235,
    0x81E7: 0x222B,
    0x81E8: 0x222C,
    0x81F0: 0x212B,
    0x81F1: 0x2030,
    0x81F2: 0x266F,
    0x81F3: 0x266D,
    0x81F4: 0x266A,
    0x81F5: 0x2020,
    0x81F6: 0x2021,
    0x81F7: 0x00B6,
    0x81FC: 0x25EF,
    0x824F: 0xFF10,
    0x8250: 0xFF11,
    0x8251: 0xFF12,
    0x8252: 0xFF13,
    0x8253: 0xFF14,
    0x8254: 0xFF15,
    0x8255: 0xFF16,
    0x8256: 0xFF17,
    0x8257: 0xFF18,
    0x8258: 0xFF19,
    0x8260: 0xFF21,
    0x8261: 0xFF22,
    0x8262: 0xFF23,
    0x8263: 0xFF24,
    0x8264: 0xFF25,
    0x8265: 0xFF26,
    0x8266: 0xFF27,
    0x8267: 0xFF28,
    0x8268: 0xFF29,
    0x8269: 0xFF2A,
    0x826A: 0xFF2B,
    0x826B: 0xFF2C,
    0x826C: 0xFF2D,
    0x826D: 0xFF2E,
    0x826E: 0xFF2F,
    0x826F: 0xFF30,
    0x8270: 0xFF31,
    0x8271: 0xFF32,
    0x8272: 0xFF33,
    0x8273: 0xFF34,
    0x8274: 0xFF35,
    0x8275: 0xFF36,
    0x8276: 0xFF37,
    0x8277: 0xFF38,
    0x8278: 0xFF39,
    0x8279: 0xFF3A,
    0x8281: 0xFF41,
    0x8282: 0xFF42,
    0x8283: 0xFF43,
    0x8284: 0xFF44,
    0x8285: 0xFF45,
    0x8286: 0xFF46,
    0x8287: 0xFF47,
    0x8288: 0xFF48,
    0x8289: 0xFF49,
    0x828A: 0xFF4A,
    0x828B: 0xFF4B,
    0x828C: 0xFF4C,
    0x828D: 0xFF4D,
    0x828E: 0xFF4E,
    0x828F: 0xFF4F,
    0x8290: 0xFF50,
    0x8291: 0xFF51,
    0x8292: 0xFF52,
    0x8293: 0xFF53,
    0x8294: 0xFF54,
    0x8295: 0xFF55,
    0x8296: 0xFF56,
    0x8297: 0xFF57,
    0x8298: 0xFF58,
    0x8299: 0xFF59,
    0x829A: 0xFF5A,
    0x829F: 0x3041,
    0x82A0: 0x3042,
    0x82A1: 0x3043,
    0x82A2: 0x3044,
    0x82A3: 0x3045,
    0x82A4: 0x3046,
    0x82A5: 0x3047,
    0x82A6: 0x3048,
    0x82A7: 0x3049,
    0x82A8: 0x304A,
    0x82A9: 0x304B,
    0x82AA: 0x304C,
    0x82AB: 0x304D,
    0x82AC: 0x304E,
    0x82AD: 0x304F,
    0x82AE: 0x3050,
    0x82AF: 0x3051,
    0x82B0: 0x3052,
    0x82B1: 0x3053,
    0x82B2: 0x3054,
    0x82B3: 0x3055,
    0x82B4: 0x3056,
    0x82B5: 0x3057,
    0x82B6: 0x3058,
    0x82B7: 0x3059,
    0x82B8: 0x305A,
    0x82B9: 0x305B,
    0x82BA: 0x305C,
    0x82BB: 0x305D,
    0x82BC: 0x305E,
    0x82BD: 0x305F,
    0x82BE: 0x3060,
    0x82BF: 0x3061,
    0x82C0: 0x3062,
    0x82C1: 0x3063,
    0x82C2: 0x3064,
    0x82C3: 0x3065,
    0x82C4: 0x3066,
    0x82C5: 0x3067,
    0x82C6: 0x3068,
    0x82C7: 0x3069,
    0x82C8: 0x306A,
    0x82C9: 0x306B,
    0x82CA: 0x306C,
    0x82CB: 0x306D,
    0x82CC: 0x306E,
    0x82CD: 0x306F,
    0x82CE: 0x3070,
    0x82CF: 0x3071,
    0x82D0: 0x3072,
    0x82D1: 0x3073,
    0x82D2: 0x3074,
    0x82D3: 0x3075,
    0x82D4: 0x3076,
    0x82D5: 0x3077,
    0x82D6: 0x3078,
    0x82D7: 0x3079,
    0x82D8: 0x307A,
    0x82D9: 0x307B,
    0x82DA: 0x307C,
    0x82DB: 0x307D,
    0x82DC: 0x307E,
    0x82DD: 0x307F,
    0x82DE: 0x3080,
    0x82DF: 0x3081,
    0x82E0: 0x3082,
    0x82E1: 0x3083,
    0x82E2: 0x3084,
    0x82E3: 0x3085,
    0x82E4: 0x3086,
    0x82E5: 0x3087,
    0x82E6: 0x3088,
    0x82E7: 0x3089,
    0x82E8: 0x308A,
    0x82E9: 0x308B,
    0x82EA: 0x308C,
    0x82EB: 0x308D,
    0x82EC: 0x308E,
    0x82ED: 0x308F,
    0x82EE: 0x3090,
    0x82EF: 0x3091,
    0x82F0: 0x3092,
    0x82F1: 0x3093,
    0x8340: 0x30A1,
    0x8341: 0x30A2,
    0x8342: 0x30A3,
    0x8343: 0x30A4,
    0x8344: 0x30A5,
    0x8345: 0x30A6,
    0x8346: 0x30A7,
    0x8347: 0x30A8,
    0x8348: 0x30A9,
    0x8349: 0x30AA,
    0x834A: 0x30AB,
    0x834B: 0x30AC,
    0x834C: 0x30AD,
    0x834D: 0x30AE,
    0x834E: 0x30AF,
    0x834F: 0x30B0,
    0x8350: 0x30B1,
    0x8351: 0x30B2,
    0x8352: 0x30B3,
    0x8353: 0x30B4,
    0x8354: 0x30B5,
    0x8355: 0x30B6,
    0x8356: 0x30B7,
    0x8357: 0x30B8,
    0x8358: 0x30B9,
    0x8359: 0x30BA,
    0x835A: 0x30BB,
    0x835B: 0x30BC,
    0x835C: 0x30BD,
    0x835D: 0x30BE,
    0x835E: 0x30BF,
    0x835F: 0x30C0,
    0x8360: 0x30C1,
    0x8361: 0x30C2,
    0x8362: 0x30C3,
    0x8363: 0x30C4,
    0x8364: 0x30C5,
    0x8365: 0x30C6,
    0x8366: 0x30C7,
    0x8367: 0x30C8,
    0x8368: 0x30C9,
    0x8369: 0x30CA,
    0x836A: 0x30CB,
    0x836B: 0x30CC,
    0x836C: 0x30CD,
    0x836D: 0x30CE,
    0x836E: 0x30CF,
    0x836F: 0x30D0,
    0x8370: 0x30D1,
    0x8371: 0x30D2,
    0x8372: 0x30D3,
    0x8373: 0x30D4,
    0x8374: 0x30D5,
    0x8375: 0x30D6,
    0x8376: 0x30D7,
    0x8377: 0x30D8,
    0x8378: 0x30D9,
    0x8379: 0x30DA,
    0x837A: 0x30DB,
    0x837B: 0x30DC,
    0x837C: 0x30DD,
    0x837D: 0x30DE,
    0x837E: 0x30DF,
    0x8380: 0x30E0,
    0x8381: 0x30E1,
    0x8382: 0x30E2,
    0x8383: 0x30E3,
    0x8384: 0x30E4,
    0x8385: 0x30E5,
    0x8386: 0x30E6,
    0x8387: 0x30E7,
    0x8388: 0x30E8,
    0x8389: 0x30E9,
    0x838A: 0x30EA,
    0x838B: 0x30EB,
    0x838C: 0x30EC,
    0x838D: 0x30ED,
    0x838E: 0x30EE,
    0x838F: 0x30EF,
    0x8390: 0x30F0,
    0x8391: 0x30F1,
    0x8392: 0x30F2,
    0x8393: 0x30F3,
    0x8394: 0x30F4,
    0x8395: 0x30F5,
    0x8396: 0x30F6,
    0x839F: 0x0391,
    0x83A0: 0x0392,
    0x83A1: 0x0393,
    0x83A2: 0x0394,
    0x83A3: 0x0395,
    0x83A4: 0x0396,
    0x83A5: 0x0397,
    0x83A6: 0x0398,
    0x83A7: 0x0399,
    0x83A8: 0x039A,
    0x83A9: 0x039B,
    0x83AA: 0x039C,
    0x83AB: 0x039D,
    0x83AC: 0x039E,
    0x83AD: 0x039F,
    0x83AE: 0x03A0,
    0x83AF: 0x03A1,
    0x83B0: 0x03A3,
    0x83B1: 0x03A4,
    0x83B2: 0x03A5,
    0x83B3: 0x03A6,
    0x83B4: 0x03A7,
    0x83B5: 0x03A8,
    0x83B6: 0x03A9,
    0x83BF: 0x03B1,
    0x83C0: 0x03B2,
    0x83C1: 0x03B3,
    0x83C2: 0x03B4,
    0x83C3: 0x03B5,
    0x83C4: 0x03B6,
    0x83C5: 0x03B7,
    0x83C6: 0x03B8,
    0x83C7: 0x03B9,
    0x83C8: 0x03BA,
    0x83C9: 0x03BB,
    0x83CA: 0x03BC,
    0x83CB: 0x03BD,
    0x83CC: 0x03BE,
    0x83CD: 0x03BF,
    0x83CE: 0x03C0,
    0x83CF: 0x03C1,
    0x83D0: 0x03C3,
    0x83D1: 0x03C4,
    0x83D2: 0x03C5,
    0x83D3: 0x03C6,
    0x83D4: 0x03C7,
    0x83D5: 0x03C8,
    0x83D6: 0x03C9,
    0x8440: 0x0410,
    0x8441: 0x0411,
    0x8442: 0x0412,
    0x8443: 0x0413,
    0x8444: 0x0414,
    0x8445: 0x0415,
    0x8446: 0x0401,
    0x8447: 0x0416,
    0x8448: 0x0417,
    0x8449: 0x0418,
    0x844A: 0x0419,
    0x844B: 0x041A,
    0x844C: 0x041B,
    0x844D: 0x041C,
    0x844E: 0x041D,
    0x844F: 0x041E,
    0x8450: 0x041F,
    0x8451: 0x0420,
    0x8452: 0x0421,
    0x8453: 0x0422,
    0x8454: 0x0423,
    0x8455: 0x0424,
    0x8456: 0x0425,
    0x8457: 0x0426,
    0x8458: 0x0427,
    0x8459: 0x0428,
    0x845A: 0x0429,
    0x845B: 0x042A,
    0x845C: 0x042B,
    0x845D: 0x042C,
    0x845E: 0x042D,
    0x845F: 0x042E,
    0x8460: 0x042F,
    0x8470: 0x0430,
    0x8471: 0x0431,
    0x8472: 0x0432,
    0x8473: 0x0433,
    0x8474: 0x0434,
    0x8475: 0x0435,
    0x8476: 0x0451,
    0x8477: 0x0436,
    0x8478: 0x0437,
    0x8479: 0x0438,
    0x847A: 0x0439,
    0x847B: 0x043A,
    0x847C: 0x043B,
    0x847D: 0x043C,
    0x847E: 0x043D,
    0x8480: 0x043E,
    0x8481: 0x043F,
    0x8482: 0x0440,
    0x8483: 0x0441,
    0x8484: 0x0442,
    0x8485: 0x0443,
    0x8486: 0x0444,
    0x8487: 0x0445,
    0x8488: 0x0446,
    0x8489: 0x0447,
    0x848A: 0x0448,
    0x848B: 0x0449,
    0x848C: 0x044A,
    0x848D: 0x044B,
    0x848E: 0x044C,
    0x848F: 0x044D,
    0x8490: 0x044E,
    0x8491: 0x044F,
    0x849F: 0x2500,
    0x84A0: 0x2502,
    0x84A1: 0x250C,
    0x84A2: 0x2510,
    0x84A3: 0x2518,
    0x84A4: 0x2514,
    0x84A5: 0x251C,
    0x84A6: 0x252C,
    0x84A7: 0x2524,
    0x84A8: 0x2534,
    0x84A9: 0x253C,
    0x84AA: 0x2501,
    0x84AB: 0x2503,
    0x84AC: 0x250F,
    0x84AD: 0x2513,
    0x84AE: 0x251B,
    0x84AF: 0x2517,
    0x84B0: 0x2523,
    0x84B1: 0x2533,
    0x84B2: 0x252B,
    0x84B3: 0x253B,
    0x84B4: 0x254B,
    0x84B5: 0x2520,
    0x84B6: 0x252F,
    0x84B7: 0x2528,
    0x84B8: 0x2537,
    0x84B9: 0x253F,
    0x84BA: 0x251D,
    0x84BB: 0x2530,
    0x84BC: 0x2525,
    0x84BD: 0x2538,
    0x84BE: 0x2542,
    0x889F: 0x4E9C,
    0x88A0: 0x5516,
    0x88A1: 0x5A03,
    0x88A2: 0x963F,
    0x88A3: 0x54C0,
    0x88A4: 0x611B,
    0x88A5: 0x6328,
    0x88A6: 0x59F6,
    0x88A7: 0x9022,
    0x88A8: 0x8475,
    0x88A9: 0x831C,
    0x88AA: 0x7A50,
    0x88AB: 0x60AA,
    0x88AC: 0x63E1,
    0x88AD: 0x6E25,
    0x88AE: 0x65ED,
    0x88AF: 0x8466,
    0x88B0: 0x82A6,
    0x88B1: 0x9BF5,
    0x88B2: 0x6893,
    0x88B3: 0x5727,
    0x88B4: 0x65A1,
    0x88B5: 0x6271,
    0x88B6: 0x5B9B,
    0x88B7: 0x59D0,
    0x88B8: 0x867B,
    0x88B9: 0x98F4,
    0x88BA: 0x7D62,
    0x88BB: 0x7DBE,
    0x88BC: 0x9B8E,
    0x88BD: 0x6216,
    0x88BE: 0x7C9F,
    0x88BF: 0x88B7,
    0x88C0: 0x5B89,
    0x88C1: 0x5EB5,
    0x88C2: 0x6309,
    0x88C3: 0x6697,
    0x88C4: 0x6848,
    0x88C5: 0x95C7,
    0x88C6: 0x978D,
    0x88C7: 0x674F,
    0x88C8: 0x4EE5,
    0x88C9: 0x4F0A,
    0x88CA: 0x4F4D,
    0x88CB: 0x4F9D,
    0x88CC: 0x5049,
    0x88CD: 0x56F2,
    0x88CE: 0x5937,
    0x88CF: 0x59D4,
    0x88D0: 0x5A01,
    0x88D1: 0x5C09,
    0x88D2: 0x60DF,
    0x88D3: 0x610F,
    0x88D4: 0x6170,
    0x88D5: 0x6613,
    0x88D6: 0x6905,
    0x88D7: 0x70BA,
    0x88D8: 0x754F,
    0x88D9: 0x7570,
    0x88DA: 0x79FB,
    0x88DB: 0x7DAD,
    0x88DC: 0x7DEF,
    0x88DD: 0x80C3,
    0x88DE: 0x840E,
    0x88DF: 0x8863,
    0x88E0: 0x8B02,
    0x88E1: 0x9055,
    0x88E2: 0x907A,
    0x88E3: 0x533B,
    0x88E4: 0x4E95,
    0x88E5: 0x4EA5,
    0x88E6: 0x57DF,
    0x88E7: 0x80B2,
    0x88E8: 0x90C1,
    0x88E9: 0x78EF,
    0x88EA: 0x4E00,
    0x88EB: 0x58F1,
    0x88EC: 0x6EA2,
    0x88ED: 0x9038,
    0x88EE: 0x7A32,
    0x88EF: 0x8328,
    0x88F0: 0x828B,
    0x88F1: 0x9C2F,
    0x88F2: 0x5141,
    0x88F3: 0x5370,
    0x88F4: 0x54BD,
    0x88F5: 0x54E1,
    0x88F6: 0x56E0,
    0x88F7: 0x59FB,
    0x88F8: 0x5F15,
    0x88F9: 0x98F2,
    0x88FA: 0x6DEB,
    0x88FB: 0x80E4,
    0x88FC: 0x852D,
    0x8940: 0x9662,
    0x8941: 0x9670,
    0x8942: 0x96A0,
    0x8943: 0x97FB,
    0x8944: 0x540B,
    0x8945: 0x53F3,
    0x8946: 0x5B87,
    0x8947: 0x70CF,
    0x8948: 0x7FBD,
    0x8949: 0x8FC2,
    0x894A: 0x96E8,
    0x894B: 0x536F,
    0x894C: 0x9D5C,
    0x894D: 0x7ABA,
    0x894E: 0x4E11,
    0x894F: 0x7893,
    0x8950: 0x81FC,
    0x8951: 0x6E26,
    0x8952: 0x5618,
    0x8953: 0x5504,
    0x8954: 0x6B1D,
    0x8955: 0x851A,
    0x8956: 0x9C3B,
    0x8957: 0x59E5,
    0x8958: 0x53A9,
    0x8959: 0x6D66,
    0x895A: 0x74DC,
    0x895B: 0x958F,
    0x895C: 0x5642,
    0x895D: 0x4E91,
    0x895E: 0x904B,
    0x895F: 0x96F2,
    0x8960: 0x834F,
    0x8961: 0x990C,
    0x8962: 0x53E1,
    0x8963: 0x55B6,
    0x8964: 0x5B30,
    0x8965: 0x5F71,
    0x8966: 0x6620,
    0x8967: 0x66F3,
    0x8968: 0x6804,
    0x8969: 0x6C38,
    0x896A: 0x6CF3,
    0x896B: 0x6D29,
    0x896C: 0x745B,
    0x896D: 0x76C8,
    0x896E: 0x7A4E,
    0x896F: 0x9834,
    0x8970: 0x82F1,
    0x8971: 0x885B,
    0x8972: 0x8A60,
    0x8973: 0x92ED,
    0x8974: 0x6DB2,
    0x8975: 0x75AB,
    0x8976: 0x76CA,
    0x8977: 0x99C5,
    0x8978: 0x60A6,
    0x8979: 0x8B01,
    0x897A: 0x8D8A,
    0x897B: 0x95B2,
    0x897C: 0x698E,
    0x897D: 0x53AD,
    0x897E: 0x5186,
    0x8980: 0x5712,
    0x8981: 0x5830,
    0x8982: 0x5944,
    0x8983: 0x5BB4,
    0x8984: 0x5EF6,
    0x8985: 0x6028,
    0x8986: 0x63A9,
    0x8987: 0x63F4,
    0x8988: 0x6CBF,
    0x8989: 0x6F14,
    0x898A: 0x708E,
    0x898B: 0x7114,
    0x898C: 0x7159,
    0x898D: 0x71D5,
    0x898E: 0x733F,
    0x898F: 0x7E01,
    0x8990: 0x8276,
    0x8991: 0x82D1,
    0x8992: 0x8597,
    0x8993: 0x9060,
    0x8994: 0x925B,
    0x8995: 0x9D1B,
    0x8996: 0x5869,
    0x8997: 0x65BC,
    0x8998: 0x6C5A,
    0x8999: 0x7525,
    0x899A: 0x51F9,
    0x899B: 0x592E,
    0x899C: 0x5965,
    0x899D: 0x5F80,
    0x899E: 0x5FDC,
    0x899F: 0x62BC,
    0x89A0: 0x65FA,
    0x89A1: 0x6A2A,
    0x89A2: 0x6B27,
    0x89A3: 0x6BB4,
    0x89A4: 0x738B,
    0x89A5: 0x7FC1,
    0x89A6: 0x8956,
    0x89A7: 0x9D2C,
    0x89A8: 0x9D0E,
    0x89A9: 0x9EC4,
    0x89AA: 0x5CA1,
    0x89AB: 0x6C96,
    0x89AC: 0x837B,
    0x89AD: 0x5104,
    0x89AE: 0x5C4B,
    0x89AF: 0x61B6,
    0x89B0: 0x81C6,
    0x89B1: 0x6876,
    0x89B2: 0x7261,
    0x89B3: 0x4E59,
    0x89B4: 0x4FFA,
    0x89B5: 0x5378,
    0x89B6: 0x6069,
    0x89B7: 0x6E29,
    0x89B8: 0x7A4F,
    0x89B9: 0x97F3,
    0x89BA: 0x4E0B,
    0x89BB: 0x5316,
    0x89BC: 0x4EEE,
    0x89BD: 0x4F55,
    0x89BE: 0x4F3D,
    0x89BF: 0x4FA1,
    0x89C0: 0x4F73,
    0x89C1: 0x52A0,
    0x89C2: 0x53EF,
    0x89C3: 0x5609,
    0x89C4: 0x590F,
    0x89C5: 0x5AC1,
    0x89C6: 0x5BB6,
    0x89C7: 0x5BE1,
    0x89C8: 0x79D1,
    0x89C9: 0x6687,
    0x89CA: 0x679C,
    0x89CB: 0x67B6,
    0x89CC: 0x6B4C,
    0x89CD: 0x6CB3,
    0x89CE: 0x706B,
    0x89CF: 0x73C2,
    0x89D0: 0x798D,
    0x89D1: 0x79BE,
    0x89D2: 0x7A3C,
    0x89D3: 0x7B87,
    0x89D4: 0x82B1,
    0x89D5: 0x82DB,
    0x89D6: 0x8304,
    0x89D7: 0x8377,
    0x89D8: 0x83EF,
    0x89D9: 0x83D3,
    0x89DA: 0x8766,
    0x89DB: 0x8AB2,
    0x89DC: 0x5629,
    0x89DD: 0x8CA8,
    0x89DE: 0x8FE6,
    0x89DF: 0x904E,
    0x89E0: 0x971E,
    0x89E1: 0x868A,
    0x89E2: 0x4FC4,
    0x89E3: 0x5CE8,
    0x89E4: 0x6211,
    0x89E5: 0x7259,
    0x89E6: 0x753B,
    0x89E7: 0x81E5,
    0x89E8: 0x82BD,
    0x89E9: 0x86FE,
    0x89EA: 0x8CC0,
    0x89EB: 0x96C5,
    0x89EC: 0x9913,
    0x89ED: 0x99D5,
    0x89EE: 0x4ECB,
    0x89EF: 0x4F1A,
    0x89F0: 0x89E3,
    0x89F1: 0x56DE,
    0x89F2: 0x584A,
    0x89F3: 0x58CA,
    0x89F4: 0x5EFB,
    0x89F5: 0x5FEB,
    0x89F6: 0x602A,
    0x89F7: 0x6094,
    0x89F8: 0x6062,
    0x89F9: 0x61D0,
    0x89FA: 0x6212,
    0x89FB: 0x62D0,
    0x89FC: 0x6539,
    0x8A40: 0x9B41,
    0x8A41: 0x6666,
    0x8A42: 0x68B0,
    0x8A43: 0x6D77,
    0x8A44: 0x7070,
    0x8A45: 0x754C,
    0x8A46: 0x7686,
    0x8A47: 0x7D75,
    0x8A48: 0x82A5,
    0x8A49: 0x87F9,
    0x8A4A: 0x958B,
    0x8A4B: 0x968E,
    0x8A4C: 0x8C9D,
    0x8A4D: 0x51F1,
    0x8A4E: 0x52BE,
    0x8A4F: 0x5916,
    0x8A50: 0x54B3,
    0x8A51: 0x5BB3,
    0x8A52: 0x5D16,
    0x8A53: 0x6168,
    0x8A54: 0x6982,
    0x8A55: 0x6DAF,
    0x8A56: 0x788D,
    0x8A57: 0x84CB,
    0x8A58: 0x8857,
    0x8A59: 0x8A72,
    0x8A5A: 0x93A7,
    0x8A5B: 0x9AB8,
    0x8A5C: 0x6D6C,
    0x8A5D: 0x99A8,
    0x8A5E: 0x86D9,
    0x8A5F: 0x57A3,
    0x8A60: 0x67FF,
    0x8A61: 0x86CE,
    0x8A62: 0x920E,
    0x8A63: 0x5283,
    0x8A64: 0x5687,
    0x8A65: 0x5404,
    0x8A66: 0x5ED3,
    0x8A67: 0x62E1,
    0x8A68: 0x64B9,
    0x8A69: 0x683C,
    0x8A6A: 0x6838,
    0x8A6B: 0x6BBB,
    0x8A6C: 0x7372,
    0x8A6D: 0x78BA,
    0x8A6E: 0x7A6B,
    0x8A6F: 0x899A,
    0x8A70: 0x89D2,
    0x8A71: 0x8D6B,
    0x8A72: 0x8F03,
    0x8A73: 0x90ED,
    0x8A74: 0x95A3,
    0x8A75: 0x9694,
    0x8A76: 0x9769,
    0x8A77: 0x5B66,
    0x8A78: 0x5CB3,
    0x8A79: 0x697D,
    0x8A7A: 0x984D,
    0x8A7B: 0x984E,
    0x8A7C: 0x639B,
    0x8A7D: 0x7B20,
    0x8A7E: 0x6A2B,
    0x8A80: 0x6A7F,
    0x8A81: 0x68B6,
    0x8A82: 0x9C0D,
    0x8A83: 0x6F5F,
    0x8A84: 0x5272,
    0x8A85: 0x559D,
    0x8A86: 0x6070,
    0x8A87: 0x62EC,
    0x8A88: 0x6D3B,
    0x8A89: 0x6E07,
    0x8A8A: 0x6ED1,
    0x8A8B: 0x845B,
    0x8A8C: 0x8910,
    0x8A8D: 0x8F44,
    0x8A8E: 0x4E14,
    0x8A8F: 0x9C39,
    0x8A90: 0x53F6,
    0x8A91: 0x691B,
    0x8A92: 0x6A3A,
    0x8A93: 0x9784,
    0x8A94: 0x682A,
    0x8A95: 0x515C,
    0x8A96: 0x7AC3,
    0x8A97: 0x84B2,
    0x8A98: 0x91DC,
    0x8A99: 0x938C,
    0x8A9A: 0x565B,
    0x8A9B: 0x9D28,
    0x8A9C: 0x6822,
    0x8A9D: 0x8305,
    0x8A9E: 0x8431,
    0x8A9F: 0x7CA5,
    0x8AA0: 0x5208,
    0x8AA1: 0x82C5,
    0x8AA2: 0x74E6,
    0x8AA3: 0x4E7E,
    0x8AA4: 0x4F83,
    0x8AA5: 0x51A0,
    0x8AA6: 0x5BD2,
    0x8AA7: 0x520A,
    0x8AA8: 0x52D8,
    0x8AA9: 0x52E7,
    0x8AAA: 0x5DFB,
    0x8AAB: 0x559A,
    0x8AAC: 0x582A,
    0x8AAD: 0x59E6,
    0x8AAE: 0x5B8C,
    0x8AAF: 0x5B98,
    0x8AB0: 0x5BDB,
    0x8AB1: 0x5E72,
    0x8AB2: 0x5E79,
    0x8AB3: 0x60A3,
    0x8AB4: 0x611F,
    0x8AB5: 0x6163,
    0x8AB6: 0x61BE,
    0x8AB7: 0x63DB,
    0x8AB8: 0x6562,
    0x8AB9: 0x67D1,
    0x8ABA: 0x6853,
    0x8ABB: 0x68FA,
    0x8ABC: 0x6B3E,
    0x8ABD: 0x6B53,
    0x8ABE: 0x6C57,
    0x8ABF: 0x6F22,
    0x8AC0: 0x6F97,
    0x8AC1: 0x6F45,
    0x8AC2: 0x74B0,
    0x8AC3: 0x7518,
    0x8AC4: 0x76E3,
    0x8AC5: 0x770B,
    0x8AC6: 0x7AFF,
    0x8AC7: 0x7BA1,
    0x8AC8: 0x7C21,
    0x8AC9: 0x7DE9,
    0x8ACA: 0x7F36,
    0x8ACB: 0x7FF0,
    0x8ACC: 0x809D,
    0x8ACD: 0x8266,
    0x8ACE: 0x839E,
    0x8ACF: 0x89B3,
    0x8AD0: 0x8ACC,
    0x8AD1: 0x8CAB,
    0x8AD2: 0x9084,
    0x8AD3: 0x9451,
    0x8AD4: 0x9593,
    0x8AD5: 0x9591,
    0x8AD6: 0x95A2,
    0x8AD7: 0x9665,
    0x8AD8: 0x97D3,
    0x8AD9: 0x9928,
    0x8ADA: 0x8218,
    0x8ADB: 0x4E38,
    0x8ADC: 0x542B,
    0x8ADD: 0x5CB8,
    0x8ADE: 0x5DCC,
    0x8ADF: 0x73A9,
    0x8AE0: 0x764C,
    0x8AE1: 0x773C,
    0x8AE2: 0x5CA9,
    0x8AE3: 0x7FEB,
    0x8AE4: 0x8D0B,
    0x8AE5: 0x96C1,
    0x8AE6: 0x9811,
    0x8AE7: 0x9854,
    0x8AE8: 0x9858,
    0x8AE9: 0x4F01,
    0x8AEA: 0x4F0E,
    0x8AEB: 0x5371,
    0x8AEC: 0x559C,
    0x8AED: 0x5668,
    0x8AEE: 0x57FA,
    0x8AEF: 0x5947,
    0x8AF0: 0x5B09,
    0x8AF1: 0x5BC4,
    0x8AF2: 0x5C90,
    0x8AF3: 0x5E0C,
    0x8AF4: 0x5E7E,
    0x8AF5: 0x5FCC,
    0x8AF6: 0x63EE,
    0x8AF7: 0x673A,
    0x8AF8: 0x65D7,
    0x8AF9: 0x65E2,
    0x8AFA: 0x671F,
    0x8AFB: 0x68CB,
    0x8AFC: 0x68C4,
    0x8B40: 0x6A5F,
    0x8B41: 0x5E30,
    0x8B42: 0x6BC5,
    0x8B43: 0x6C17,
    0x8B44: 0x6C7D,
    0x8B45: 0x757F,
    0x8B46: 0x7948,
    0x8B47: 0x5B63,
    0x8B48: 0x7A00,
    0x8B49: 0x7D00,
    0x8B4A: 0x5FBD,
    0x8B4B: 0x898F,
    0x8B4C: 0x8A18,
    0x8B4D: 0x8CB4,
    0x8B4E: 0x8D77,
    0x8B4F: 0x8ECC,
    0x8B50: 0x8F1D,
    0x8B51: 0x98E2,
    0x8B52: 0x9A0E,
    0x8B53: 0x9B3C,
    0x8B54: 0x4E80,
    0x8B55: 0x507D,
    0x8B56: 0x5100,
    0x8B57: 0x5993,
    0x8B58: 0x5B9C,
    0x8B59: 0x622F,
    0x8B5A: 0x6280,
    0x8B5B: 0x64EC,
    0x8B5C: 0x6B3A,
    0x8B5D: 0x72A0,
    0x8B5E: 0x7591,
    0x8B5F: 0x7947,
    0x8B60: 0x7FA9,
    0x8B61: 0x87FB,
    0x8B62: 0x8ABC,
    0x8B63: 0x8B70,
    0x8B64: 0x63AC,
    0x8B65: 0x83CA,
    0x8B66: 0x97A0,
    0x8B67: 0x5409,
    0x8B68: 0x5403,
    0x8B69: 0x55AB,
    0x8B6A: 0x6854,
    0x8B6B: 0x6A58,
    0x8B6C: 0x8A70,
    0x8B6D: 0x7827,
    0x8B6E: 0x6775,
    0x8B6F: 0x9ECD,
    0x8B70: 0x5374,
    0x8B71: 0x5BA2,
    0x8B72: 0x811A,
    0x8B73: 0x8650,
    0x8B74: 0x9006,
    0x8B75: 0x4E18,
    0x8B76: 0x4E45,
    0x8B77: 0x4EC7,
    0x8B78: 0x4F11,
    0x8B79: 0x53CA,
    0x8B7A: 0x5438,
    0x8B7B: 0x5BAE,
    0x8B7C: 0x5F13,
    0x8B7D: 0x6025,
    0x8B7E: 0x6551,
    0x8B80: 0x673D,
    0x8B81: 0x6C42,
    0x8B82: 0x6C72,
    0x8B83: 0x6CE3,
    0x8B84: 0x7078,
    0x8B85: 0x7403,
    0x8B86: 0x7A76,
    0x8B87: 0x7AAE,
    0x8B88: 0x7B08,
    0x8B89: 0x7D1A,
    0x8B8A: 0x7CFE,
    0x8B8B: 0x7D66,
    0x8B8C: 0x65E7,
    0x8B8D: 0x725B,
    0x8B8E: 0x53BB,
    0x8B8F: 0x5C45,
    0x8B90: 0x5DE8,
    0x8B91: 0x62D2,
    0x8B92: 0x62E0,
    0x8B93: 0x6319,
    0x8B94: 0x6E20,
    0x8B95: 0x865A,
    0x8B96: 0x8A31,
    0x8B97: 0x8DDD,
    0x8B98: 0x92F8,
    0x8B99: 0x6F01,
    0x8B9A: 0x79A6,
    0x8B9B: 0x9B5A,
    0x8B9C: 0x4EA8,
    0x8B9D: 0x4EAB,
    0x8B9E: 0x4EAC,
    0x8B9F: 0x4F9B,
    0x8BA0: 0x4FA0,
    0x8BA1: 0x50D1,
    0x8BA2: 0x5147,
    0x8BA3: 0x7AF6,
    0x8BA4: 0x5171,
    0x8BA5: 0x51F6,
    0x8BA6: 0x5354,
    0x8BA7: 0x5321,
    0x8BA8: 0x537F,
    0x8BA9: 0x53EB,
    0x8BAA: 0x55AC,
    0x8BAB: 0x5883,
    0x8BAC: 0x5CE1,
    0x8BAD: 0x5F37,
    0x8BAE: 0x5F4A,
    0x8BAF: 0x602F,
    0x8BB0: 0x6050,
    0x8BB1: 0x606D,
    0x8BB2: 0x631F,
    0x8BB3: 0x6559,
    0x8BB4: 0x6A4B,
    0x8BB5: 0x6CC1,
    0x8BB6: 0x72C2,
    0x8BB7: 0x72ED,
    0x8BB8: 0x77EF,
    0x8BB9: 0x80F8,
    0x8BBA: 0x8105,
    0x8BBB: 0x8208,
    0x8BBC: 0x854E,
    0x8BBD: 0x90F7,
    0x8BBE: 0x93E1,
    0x8BBF: 0x97FF,
    0x8BC0: 0x9957,
    0x8BC1: 0x9A5A,
    0x8BC2: 0x4EF0,
    0x8BC3: 0x51DD,
    0x8BC4: 0x5C2D,
    0x8BC5: 0x6681,
    0x8BC6: 0x696D,
    0x8BC7: 0x5C40,
    0x8BC8: 0x66F2,
    0x8BC9: 0x6975,
    0x8BCA: 0x7389,
    0x8BCB: 0x6850,
    0x8BCC: 0x7C81,
    0x8BCD: 0x50C5,
    0x8BCE: 0x52E4,
    0x8BCF: 0x5747,
    0x8BD0: 0x5DFE,
    0x8BD1: 0x9326,
    0x8BD2: 0x65A4,
    0x8BD3: 0x6B23,
    0x8BD4: 0x6B3D,
    0x8BD5: 0x7434,
    0x8BD6: 0x7981,
    0x8BD7: 0x79BD,
    0x8BD8: 0x7B4B,
    0x8BD9: 0x7DCA,
    0x8BDA: 0x82B9,
    0x8BDB: 0x83CC,
    0x8BDC: 0x887F,
    0x8BDD: 0x895F,
    0x8BDE: 0x8B39,
    0x8BDF: 0x8FD1,
    0x8BE0: 0x91D1,
    0x8BE1: 0x541F,
    0x8BE2: 0x9280,
    0x8BE3: 0x4E5D,
    0x8BE4: 0x5036,
    0x8BE5: 0x53E5,
    0x8BE6: 0x533A,
    0x8BE7: 0x72D7,
    0x8BE8: 0x7396,
    0x8BE9: 0x77E9,
    0x8BEA: 0x82E6,
    0x8BEB: 0x8EAF,
    0x8BEC: 0x99C6,
    0x8BED: 0x99C8,
    0x8BEE: 0x99D2,
    0x8BEF: 0x5177,
    0x8BF0: 0x611A,
    0x8BF1: 0x865E,
    0x8BF2: 0x55B0,
    0x8BF3: 0x7A7A,
    0x8BF4: 0x5076,
    0x8BF5: 0x5BD3,
    0x8BF6: 0x9047,
    0x8BF7: 0x9685,
    0x8BF8: 0x4E32,
    0x8BF9: 0x6ADB,
    0x8BFA: 0x91E7,
    0x8BFB: 0x5C51,
    0x8BFC: 0x5C48,
    0x8C40: 0x6398,
    0x8C41: 0x7A9F,
    0x8C42: 0x6C93,
    0x8C43: 0x9774,
    0x8C44: 0x8F61,
    0x8C45: 0x7AAA,
    0x8C46: 0x718A,
    0x8C47: 0x9688,
    0x8C48: 0x7C82,
    0x8C49: 0x6817,
    0x8C4A: 0x7E70,
    0x8C4B: 0x6851,
    0x8C4C: 0x936C,
    0x8C4D: 0x52F2,
    0x8C4E: 0x541B,
    0x8C4F: 0x85AB,
    0x8C50: 0x8A13,
    0x8C51: 0x7FA4,
    0x8C52: 0x8ECD,
    0x8C53: 0x90E1,
    0x8C54: 0x5366,
    0x8C55: 0x8888,
    0x8C56: 0x7941,
    0x8C57: 0x4FC2,
    0x8C58: 0x50BE,
    0x8C59: 0x5211,
    0x8C5A: 0x5144,
    0x8C5B: 0x5553,
    0x8C5C: 0x572D,
    0x8C5D: 0x73EA,
    0x8C5E: 0x578B,
    0x8C5F: 0x5951,
    0x8C60: 0x5F62,
    0x8C61: 0x5F84,
    0x8C62: 0x6075,
    0x8C63: 0x6176,
    0x8C64: 0x6167,
    0x8C65: 0x61A9,
    0x8C66: 0x63B2,
    0x8C67: 0x643A,
    0x8C68: 0x656C,
    0x8C69: 0x666F,
    0x8C6A: 0x6842,
    0x8C6B: 0x6E13,
    0x8C6C: 0x7566,
    0x8C6D: 0x7A3D,
    0x8C6E: 0x7CFB,
    0x8C6F: 0x7D4C,
    0x8C70: 0x7D99,
    0x8C71: 0x7E4B,
    0x8C72: 0x7F6B,
    0x8C73: 0x830E,
    0x8C74: 0x834A,
    0x8C75: 0x86CD,
    0x8C76: 0x8A08,
    0x8C77: 0x8A63,
    0x8C78: 0x8B66,
    0x8C79: 0x8EFD,
    0x8C7A: 0x981A,
    0x8C7B: 0x9D8F,
    0x8C7C: 0x82B8,
    0x8C7D: 0x8FCE,
    0x8C7E: 0x9BE8,
    0x8C80: 0x5287,
    0x8C81: 0x621F,
    0x8C82: 0x6483,
    0x8C83: 0x6FC0,
    0x8C84: 0x9699,
    0x8C85: 0x6841,
    0x8C86: 0x5091,
    0x8C87: 0x6B20,
    0x8C88: 0x6C7A,
    0x8C89: 0x6F54,
    0x8C8A: 0x7A74,
    0x8C8B: 0x7D50,
    0x8C8C: 0x8840,
    0x8C8D: 0x8A23,
    0x8C8E: 0x6708,
    0x8C8F: 0x4EF6,
    0x8C90: 0x5039,
    0x8C91: 0x5026,
    0x8C92: 0x5065,
    0x8C93: 0x517C,
    0x8C94: 0x5238,
    0x8C95: 0x5263,
    0x8C96: 0x55A7,
    0x8C97: 0x570F,
    0x8C98: 0x5805,
    0x8C99: 0x5ACC,
    0x8C9A: 0x5EFA,
    0x8C9B: 0x61B2,
    0x8C9C: 0x61F8,
    0x8C9D: 0x62F3,
    0x8C9E: 0x6372,
    0x8C9F: 0x691C,
    0x8CA0: 0x6A29,
    0x8CA1: 0x727D,
    0x8CA2: 0x72AC,
    0x8CA3: 0x732E,
    0x8CA4: 0x7814,
    0x8CA5: 0x786F,
    0x8CA6: 0x7D79,
    0x8CA7: 0x770C,
    0x8CA8: 0x80A9,
    0x8CA9: 0x898B,
    0x8CAA: 0x8B19,
    0x8CAB: 0x8CE2,
    0x8CAC: 0x8ED2,
    0x8CAD: 0x9063,
    0x8CAE: 0x9375,
    0x8CAF: 0x967A,
    0x8CB0: 0x9855,
    0x8CB1: 0x9A13,
    0x8CB2: 0x9E78,
    0x8CB3: 0x5143,
    0x8CB4: 0x539F,
    0x8CB5: 0x53B3,
    0x8CB6: 0x5E7B,
    0x8CB7: 0x5F26,
    0x8CB8: 0x6E1B,
    0x8CB9: 0x6E90,
    0x8CBA: 0x7384,
    0x8CBB: 0x73FE,
    0x8CBC: 0x7D43,
    0x8CBD: 0x8237,
    0x8CBE: 0x8A00,
    0x8CBF: 0x8AFA,
    0x8CC0: 0x9650,
    0x8CC1: 0x4E4E,
    0x8CC2: 0x500B,
    0x8CC3: 0x53E4,
    0x8CC4: 0x547C,
    0x8CC5: 0x56FA,
    0x8CC6: 0x59D1,
    0x8CC7: 0x5B64,
    0x8CC8: 0x5DF1,
    0x8CC9: 0x5EAB,
    0x8CCA: 0x5F27,
    0x8CCB: 0x6238,
    0x8CCC: 0x6545,
    0x8CCD: 0x67AF,
    0x8CCE: 0x6E56,
    0x8CCF: 0x72D0,
    0x8CD0: 0x7CCA,
    0x8CD1: 0x88B4,
    0x8CD2: 0x80A1,
    0x8CD3: 0x80E1,
    0x8CD4: 0x83F0,
    0x8CD5: 0x864E,
    0x8CD6: 0x8A87,
    0x8CD7: 0x8DE8,
    0x8CD8: 0x9237,
    0x8CD9: 0x96C7,
    0x8CDA: 0x9867,
    0x8CDB: 0x9F13,
    0x8CDC: 0x4E94,
    0x8CDD: 0x4E92,
    0x8CDE: 0x4F0D,
    0x8CDF: 0x5348,
    0x8CE0: 0x5449,
    0x8CE1: 0x543E,
    0x8CE2: 0x5A2F,
    0x8CE3: 0x5F8C,
    0x8CE4: 0x5FA1,
    0x8CE5: 0x609F,
    0x8CE6: 0x68A7,
    0x8CE7: 0x6A8E,
    0x8CE8: 0x745A,
    0x8CE9: 0x7881,
    0x8CEA: 0x8A9E,
    0x8CEB: 0x8AA4,
    0x8CEC: 0x8B77,
    0x8CED: 0x9190,
    0x8CEE: 0x4E5E,
    0x8CEF: 0x9BC9,
    0x8CF0: 0x4EA4,
    0x8CF1: 0x4F7C,
    0x8CF2: 0x4FAF,
    0x8CF3: 0x5019,
    0x8CF4: 0x5016,
    0x8CF5: 0x5149,
    0x8CF6: 0x516C,
    0x8CF7: 0x529F,
    0x8CF8: 0x52B9,
    0x8CF9: 0x52FE,
    0x8CFA: 0x539A,
    0x8CFB: 0x53E3,
    0x8CFC: 0x5411,
    0x8D40: 0x540E,
    0x8D41: 0x5589,
    0x8D42: 0x5751,
    0x8D43: 0x57A2,
    0x8D44: 0x597D,
    0x8D45: 0x5B54,
    0x8D46: 0x5B5D,
    0x8D47: 0x5B8F,
    0x8D48: 0x5DE5,
    0x8D49: 0x5DE7,
    0x8D4A: 0x5DF7,
    0x8D4B: 0x5E78,
    0x8D4C: 0x5E83,
    0x8D4D: 0x5E9A,
    0x8D4E: 0x5EB7,
    0x8D4F: 0x5F18,
    0x8D50: 0x6052,
    0x8D51: 0x614C,
    0x8D52: 0x6297,
    0x8D53: 0x62D8,
    0x8D54: 0x63A7,
    0x8D55: 0x653B,
    0x8D56: 0x6602,
    0x8D57: 0x6643,
    0x8D58: 0x66F4,
    0x8D59: 0x676D,
    0x8D5A: 0x6821,
    0x8D5B: 0x6897,
    0x8D5C: 0x69CB,
    0x8D5D: 0x6C5F,
    0x8D5E: 0x6D2A,
    0x8D5F: 0x6D69,
    0x8D60: 0x6E2F,
    0x8D61: 0x6E9D,
    0x8D62: 0x7532,
    0x8D63: 0x7687,
    0x8D64: 0x786C,
    0x8D65: 0x7A3F,
    0x8D66: 0x7CE0,
    0x8D67: 0x7D05,
    0x8D68: 0x7D18,
    0x8D69: 0x7D5E,
    0x8D6A: 0x7DB1,
    0x8D6B: 0x8015,
    0x8D6C: 0x8003,
    0x8D6D: 0x80AF,
    0x8D6E: 0x80B1,
    0x8D6F: 0x8154,
    0x8D70: 0x818F,
    0x8D71: 0x822A,
    0x8D72: 0x8352,
    0x8D73: 0x884C,
    0x8D74: 0x8861,
    0x8D75: 0x8B1B,
    0x8D76: 0x8CA2,
    0x8D77: 0x8CFC,
    0x8D78: 0x90CA,
    0x8D79: 0x9175,
    0x8D7A: 0x9271,
    0x8D7B: 0x783F,
    0x8D7C: 0x92FC,
    0x8D7D: 0x95A4,
    0x8D7E: 0x964D,
    0x8D80: 0x9805,
    0x8D81: 0x9999,
    0x8D82: 0x9AD8,
    0x8D83: 0x9D3B,
    0x8D84: 0x525B,
    0x8D85: 0x52AB,
    0x8D86: 0x53F7,
    0x8D87: 0x5408,
    0x8D88: 0x58D5,
    0x8D89: 0x62F7,
    0x8D8A: 0x6FE0,
    0x8D8B: 0x8C6A,
    0x8D8C: 0x8F5F,
    0x8D8D: 0x9EB9,
    0x8D8E: 0x514B,
    0x8D8F: 0x523B,
    0x8D90: 0x544A,
    0x8D91: 0x56FD,
    0x8D92: 0x7A40,
    0x8D93: 0x9177,
    0x8D94: 0x9D60,
    0x8D95: 0x9ED2,
    0x8D96: 0x7344,
    0x8D97: 0x6F09,
    0x8D98: 0x8170,
    0x8D99: 0x7511,
    0x8D9A: 0x5FFD,
    0x8D9B: 0x60DA,
    0x8D9C: 0x9AA8,
    0x8D9D: 0x72DB,
    0x8D9E: 0x8FBC,
    0x8D9F: 0x6B64,
    0x8DA0: 0x9803,
    0x8DA1: 0x4ECA,
    0x8DA2: 0x56F0,
    0x8DA3: 0x5764,
    0x8DA4: 0x58BE,
    0x8DA5: 0x5A5A,
    0x8DA6: 0x6068,
    0x8DA7: 0x61C7,
    0x8DA8: 0x660F,
    0x8DA9: 0x6606,
    0x8DAA: 0x6839,
    0x8DAB: 0x68B1,
    0x8DAC: 0x6DF7,
    0x8DAD: 0x75D5,
    0x8DAE: 0x7D3A,
    0x8DAF: 0x826E,
    0x8DB0: 0x9B42,
    0x8DB1: 0x4E9B,
    0x8DB2: 0x4F50,
    0x8DB3: 0x53C9,
    0x8DB4: 0x5506,
    0x8DB5: 0x5D6F,
    0x8DB6: 0x5DE6,
    0x8DB7: 0x5DEE,
    0x8DB8: 0x67FB,
    0x8DB9: 0x6C99,
    0x8DBA: 0x7473,
    0x8DBB: 0x7802,
    0x8DBC: 0x8A50,
    0x8DBD: 0x9396,
    0x8DBE: 0x88DF,
    0x8DBF: 0x5750,
    0x8DC0: 0x5EA7,
    0x8DC1: 0x632B,
    0x8DC2: 0x50B5,
    0x8DC3: 0x50AC,
    0x8DC4: 0x518D,
    0x8DC5: 0x6700,
    0x8DC6: 0x54C9,
    0x8DC7: 0x585E,
    0x8DC8: 0x59BB,
    0x8DC9: 0x5BB0,
    0x8DCA: 0x5F69,
    0x8DCB: 0x624D,
    0x8DCC: 0x63A1,
    0x8DCD: 0x683D,
    0x8DCE: 0x6B73,
    0x8DCF: 0x6E08,
    0x8DD0: 0x707D,
    0x8DD1: 0x91C7,
    0x8DD2: 0x7280,
    0x8DD3: 0x7815,
    0x8DD4: 0x7826,
    0x8DD5: 0x796D,
    0x8DD6: 0x658E,
    0x8DD7: 0x7D30,
    0x8DD8: 0x83DC,
    0x8DD9: 0x88C1,
    0x8DDA: 0x8F09,
    0x8DDB: 0x969B,
    0x8DDC: 0x5264,
    0x8DDD: 0x5728,
    0x8DDE: 0x6750,
    0x8DDF: 0x7F6A,
    0x8DE0: 0x8CA1,
    0x8DE1: 0x51B4,
    0x8DE2: 0x5742,
    0x8DE3: 0x962A,
    0x8DE4: 0x583A,
    0x8DE5: 0x698A,
    0x8DE6: 0x80B4,
    0x8DE7: 0x54B2,
    0x8DE8: 0x5D0E,
    0x8DE9: 0x57FC,
    0x8DEA: 0x7895,
    0x8DEB: 0x9DFA,
    0x8DEC: 0x4F5C,
    0x8DED: 0x524A,
    0x8DEE: 0x548B,
    0x8DEF: 0x643E,
    0x8DF0: 0x6628,
    0x8DF1: 0x6714,
    0x8DF2: 0x67F5,
    0x8DF3: 0x7A84,
    0x8DF4: 0x7B56,
    0x8DF5: 0x7D22,
    0x8DF6: 0x932F,
    0x8DF7: 0x685C,
    0x8DF8: 0x9BAD,
    0x8DF9: 0x7B39,
    0x8DFA: 0x5319,
    0x8DFB: 0x518A,
    0x8DFC: 0x5237,
    0x8E40: 0x5BDF,
    0x8E41: 0x62F6,
    0x8E42: 0x64AE,
    0x8E43: 0x64E6,
    0x8E44: 0x672D,
    0x8E45: 0x6BBA,
    0x8E46: 0x85A9,
    0x8E47: 0x96D1,
    0x8E48: 0x7690,
    0x8E49: 0x9BD6,
    0x8E4A: 0x634C,
    0x8E4B: 0x9306,
    0x8E4C: 0x9BAB,
    0x8E4D: 0x76BF,
    0x8E4E: 0x6652,
    0x8E4F: 0x4E09,
    0x8E50: 0x5098,
    0x8E51: 0x53C2,
    0x8E52: 0x5C71,
    0x8E53: 0x60E8,
    0x8E54: 0x6492,
    0x8E55: 0x6563,
    0x8E56: 0x685F,
    0x8E57: 0x71E6,
    0x8E58: 0x73CA,
    0x8E59: 0x7523,
    0x8E5A: 0x7B97,
    0x8E5B: 0x7E82,
    0x8E5C: 0x8695,
    0x8E5D: 0x8B83,
    0x8E5E: 0x8CDB,
    0x8E5F: 0x9178,
    0x8E60: 0x9910,
    0x8E61: 0x65AC,
    0x8E62: 0x66AB,
    0x8E63: 0x6B8B,
    0x8E64: 0x4ED5,
    0x8E65: 0x4ED4,
    0x8E66: 0x4F3A,
    0x8E67: 0x4F7F,
    0x8E68: 0x523A,
    0x8E69: 0x53F8,
    0x8E6A: 0x53F2,
    0x8E6B: 0x55E3,
    0x8E6C: 0x56DB,
    0x8E6D: 0x58EB,
    0x8E6E: 0x59CB,
    0x8E6F: 0x59C9,
    0x8E70: 0x59FF,
    0x8E71: 0x5B50,
    0x8E72: 0x5C4D,
    0x8E73: 0x5E02,
    0x8E74: 0x5E2B,
    0x8E75: 0x5FD7,
    0x8E76: 0x601D,
    0x8E77: 0x6307,
    0x8E78: 0x652F,
    0x8E79: 0x5B5C,
    0x8E7A: 0x65AF,
    0x8E7B: 0x65BD,
    0x8E7C: 0x65E8,
    0x8E7D: 0x679D,
    0x8E7E: 0x6B62,
    0x8E80: 0x6B7B,
    0x8E81: 0x6C0F,
    0x8E82: 0x7345,
    0x8E83: 0x7949,
    0x8E84: 0x79C1,
    0x8E85: 0x7CF8,
    0x8E86: 0x7D19,
    0x8E87: 0x7D2B,
    0x8E88: 0x80A2,
    0x8E89: 0x8102,
    0x8E8A: 0x81F3,
    0x8E8B: 0x8996,
    0x8E8C: 0x8A5E,
    0x8E8D: 0x8A69,
    0x8E8E: 0x8A66,
    0x8E8F: 0x8A8C,
    0x8E90: 0x8AEE,
    0x8E91: 0x8CC7,
    0x8E92: 0x8CDC,
    0x8E93: 0x96CC,
    0x8E94: 0x98FC,
    0x8E95: 0x6B6F,
    0x8E96: 0x4E8B,
    0x8E97: 0x4F3C,
    0x8E98: 0x4F8D,
    0x8E99: 0x5150,
    0x8E9A: 0x5B57,
    0x8E9B: 0x5BFA,
    0x8E9C: 0x6148,
    0x8E9D: 0x6301,
    0x8E9E: 0x6642,
    0x8E9F: 0x6B21,
    0x8EA0: 0x6ECB,
    0x8EA1: 0x6CBB,
    0x8EA2: 0x723E,
    0x8EA3: 0x74BD,
    0x8EA4: 0x75D4,
    0x8EA5: 0x78C1,
    0x8EA6: 0x793A,
    0x8EA7: 0x800C,
    0x8EA8: 0x8033,
    0x8EA9: 0x81EA,
    0x8EAA: 0x8494,
    0x8EAB: 0x8F9E,
    0x8EAC: 0x6C50,
    0x8EAD: 0x9E7F,
    0x8EAE: 0x5F0F,
    0x8EAF: 0x8B58,
    0x8EB0: 0x9D2B,
    0x8EB1: 0x7AFA,
    0x8EB2: 0x8EF8,
    0x8EB3: 0x5B8D,
    0x8EB4: 0x96EB,
    0x8EB5: 0x4E03,
    0x8EB6: 0x53F1,
    0x8EB7: 0x57F7,
    0x8EB8: 0x5931,
    0x8EB9: 0x5AC9,
    0x8EBA: 0x5BA4,
    0x8EBB: 0x6089,
    0x8EBC: 0x6E7F,
    0x8EBD: 0x6F06,
    0x8EBE: 0x75BE,
    0x8EBF: 0x8CEA,
    0x8EC0: 0x5B9F,
    0x8EC1: 0x8500,
    0x8EC2: 0x7BE0,
    0x8EC3: 0x5072,
    0x8EC4: 0x67F4,
    0x8EC5: 0x829D,
    0x8EC6: 0x5C61,
    0x8EC7: 0x854A,
    0x8EC8: 0x7E1E,
    0x8EC9: 0x820E,
    0x8ECA: 0x5199,
    0x8ECB: 0x5C04,
    0x8ECC: 0x6368,
    0x8ECD: 0x8D66,
    0x8ECE: 0x659C,
    0x8ECF: 0x716E,
    0x8ED0: 0x793E,
    0x8ED1: 0x7D17,
    0x8ED2: 0x8005,
    0x8ED3: 0x8B1D,
    0x8ED4: 0x8ECA,
    0x8ED5: 0x906E,
    0x8ED6: 0x86C7,
    0x8ED7: 0x90AA,
    0x8ED8: 0x501F,
    0x8ED9: 0x52FA,
    0x8EDA: 0x5C3A,
    0x8EDB: 0x6753,
    0x8EDC: 0x707C,
    0x8EDD: 0x7235,
    0x8EDE: 0x914C,
    0x8EDF: 0x91C8,
    0x8EE0: 0x932B,
    0x8EE1: 0x82E5,
    0x8EE2: 0x5BC2,
    0x8EE3: 0x5F31,
    0x8EE4: 0x60F9,
    0x8EE5: 0x4E3B,
    0x8EE6: 0x53D6,
    0x8EE7: 0x5B88,
    0x8EE8: 0x624B,
    0x8EE9: 0x6731,
    0x8EEA: 0x6B8A,
    0x8EEB: 0x72E9,
    0x8EEC: 0x73E0,
    0x8EED: 0x7A2E,
    0x8EEE: 0x816B,
    0x8EEF: 0x8DA3,
    0x8EF0: 0x9152,
    0x8EF1: 0x9996,
    0x8EF2: 0x5112,
    0x8EF3: 0x53D7,
    0x8EF4: 0x546A,
    0x8EF5: 0x5BFF,
    0x8EF6: 0x6388,
    0x8EF7: 0x6A39,
    0x8EF8: 0x7DAC,
    0x8EF9: 0x9700,
    0x8EFA: 0x56DA,
    0x8EFB: 0x53CE,
    0x8EFC: 0x5468,
    0x8F40: 0x5B97,
    0x8F41: 0x5C31,
    0x8F42: 0x5DDE,
    0x8F43: 0x4FEE,
    0x8F44: 0x6101,
    0x8F45: 0x62FE,
    0x8F46: 0x6D32,
    0x8F47: 0x79C0,
    0x8F48: 0x79CB,
    0x8F49: 0x7D42,
    0x8F4A: 0x7E4D,
    0x8F4B: 0x7FD2,
    0x8F4C: 0x81ED,
    0x8F4D: 0x821F,
    0x8F4E: 0x8490,
    0x8F4F: 0x8846,
    0x8F50: 0x8972,
    0x8F51: 0x8B90,
    0x8F52: 0x8E74,
    0x8F53: 0x8F2F,
    0x8F54: 0x9031,
    0x8F55: 0x914B,
    0x8F56: 0x916C,
    0x8F57: 0x96C6,
    0x8F58: 0x919C,
    0x8F59: 0x4EC0,
    0x8F5A: 0x4F4F,
    0x8F5B: 0x5145,
    0x8F5C: 0x5341,
    0x8F5D: 0x5F93,
    0x8F5E: 0x620E,
    0x8F5F: 0x67D4,
    0x8F60: 0x6C41,
    0x8F61: 0x6E0B,
    0x8F62: 0x7363,
    0x8F63: 0x7E26,
    0x8F64: 0x91CD,
    0x8F65: 0x9283,
    0x8F66: 0x53D4,
    0x8F67: 0x5919,
    0x8F68: 0x5BBF,
    0x8F69: 0x6DD1,
    0x8F6A: 0x795D,
    0x8F6B: 0x7E2E,
    0x8F6C: 0x7C9B,
    0x8F6D: 0x587E,
    0x8F6E: 0x719F,
    0x8F6F: 0x51FA,
    0x8F70: 0x8853,
    0x8F71: 0x8FF0,
    0x8F72: 0x4FCA,
    0x8F73: 0x5CFB,
    0x8F74: 0x6625,
    0x8F75: 0x77AC,
    0x8F76: 0x7AE3,
    0x8F77: 0x821C,
    0x8F78: 0x99FF,
    0x8F79: 0x51C6,
    0x8F7A: 0x5FAA,
    0x8F7B: 0x65EC,
    0x8F7C: 0x696F,
    0x8F7D: 0x6B89,
    0x8F7E: 0x6DF3,
    0x8F80: 0x6E96,
    0x8F81: 0x6F64,
    0x8F82: 0x76FE,
    0x8F83: 0x7D14,
    0x8F84: 0x5DE1,
    0x8F85: 0x9075,
    0x8F86: 0x9187,
    0x8F87: 0x9806,
    0x8F88: 0x51E6,
    0x8F89: 0x521D,
    0x8F8A: 0x6240,
    0x8F8B: 0x6691,
    0x8F8C: 0x66D9,
    0x8F8D: 0x6E1A,
    0x8F8E: 0x5EB6,
    0x8F8F: 0x7DD2,
    0x8F90: 0x7F72,
    0x8F91: 0x66F8,
    0x8F92: 0x85AF,
    0x8F93: 0x85F7,
    0x8F94: 0x8AF8,
    0x8F95: 0x52A9,
    0x8F96: 0x53D9,
    0x8F97: 0x5973,
    0x8F98: 0x5E8F,
    0x8F99: 0x5F90,
    0x8F9A: 0x6055,
    0x8F9B: 0x92E4,
    0x8F9C: 0x9664,
    0x8F9D: 0x50B7,
    0x8F9E: 0x511F,
    0x8F9F: 0x52DD,
    0x8FA0: 0x5320,
    0x8FA1: 0x5347,
    0x8FA2: 0x53EC,
    0x8FA3: 0x54E8,
    0x8FA4: 0x5546,
    0x8FA5: 0x5531,
    0x8FA6: 0x5617,
    0x8FA7: 0x5968,
    0x8FA8: 0x59BE,
    0x8FA9: 0x5A3C,
    0x8FAA: 0x5BB5,
    0x8FAB: 0x5C06,
    0x8FAC: 0x5C0F,
    0x8FAD: 0x5C11,
    0x8FAE: 0x5C1A,
    0x8FAF: 0x5E84,
    0x8FB0: 0x5E8A,
    0x8FB1: 0x5EE0,
    0x8FB2: 0x5F70,
    0x8FB3: 0x627F,
    0x8FB4: 0x6284,
    0x8FB5: 0x62DB,
    0x8FB6: 0x638C,
    0x8FB7: 0x6377,
    0x8FB8: 0x6607,
    0x8FB9: 0x660C,
    0x8FBA: 0x662D,
    0x8FBB: 0x6676,
    0x8FBC: 0x677E,
    0x8FBD: 0x68A2,
    0x8FBE: 0x6A1F,
    0x8FBF: 0x6A35,
    0x8FC0: 0x6CBC,
    0x8FC1: 0x6D88,
    0x8FC2: 0x6E09,
    0x8FC3: 0x6E58,
    0x8FC4: 0x713C,
    0x8FC5: 0x7126,
    0x8FC6: 0x7167,
    0x8FC7: 0x75C7,
    0x8FC8: 0x7701,
    0x8FC9: 0x785D,
    0x8FCA: 0x7901,
    0x8FCB: 0x7965,
    0x8FCC: 0x79F0,
    0x8FCD: 0x7AE0,
    0x8FCE: 0x7B11,
    0x8FCF: 0x7CA7,
    0x8FD0: 0x7D39,
    0x8FD1: 0x8096,
    0x8FD2: 0x83D6,
    0x8FD3: 0x848B,
    0x8FD4: 0x8549,
    0x8FD5: 0x885D,
    0x8FD6: 0x88F3,
    0x8FD7: 0x8A1F,
    0x8FD8: 0x8A3C,
    0x8FD9: 0x8A54,
    0x8FDA: 0x8A73,
    0x8FDB: 0x8C61,
    0x8FDC: 0x8CDE,
    0x8FDD: 0x91A4,
    0x8FDE: 0x9266,
    0x8FDF: 0x937E,
    0x8FE0: 0x9418,
    0x8FE1: 0x969C,
    0x8FE2: 0x9798,
    0x8FE3: 0x4E0A,
    0x8FE4: 0x4E08,
    0x8FE5: 0x4E1E,
    0x8FE6: 0x4E57,
    0x8FE7: 0x5197,
    0x8FE8: 0x5270,
    0x8FE9: 0x57CE,
    0x8FEA: 0x5834,
    0x8FEB: 0x58CC,
    0x8FEC: 0x5B22,
    0x8FED: 0x5E38,
    0x8FEE: 0x60C5,
    0x8FEF: 0x64FE,
    0x8FF0: 0x6761,
    0x8FF1: 0x6756,
    0x8FF2: 0x6D44,
    0x8FF3: 0x72B6,
    0x8FF4: 0x7573,
    0x8FF5: 0x7A63,
    0x8FF6: 0x84B8,
    0x8FF7: 0x8B72,
    0x8FF8: 0x91B8,
    0x8FF9: 0x9320,
    0x8FFA: 0x5631,
    0x8FFB: 0x57F4,
    0x8FFC: 0x98FE,
    0x9040: 0x62ED,
    0x9041: 0x690D,
    0x9042: 0x6B96,
    0x9043: 0x71ED,
    0x9044: 0x7E54,
    0x9045: 0x8077,
    0x9046: 0x8272,
    0x9047: 0x89E6,
    0x9048: 0x98DF,
    0x9049: 0x8755,
    0x904A: 0x8FB1,
    0x904B: 0x5C3B,
    0x904C: 0x4F38,
    0x904D: 0x4FE1,
    0x904E: 0x4FB5,
    0x904F: 0x5507,
    0x9050: 0x5A20,
    0x9051: 0x5BDD,
    0x9052: 0x5BE9,
    0x9053: 0x5FC3,
    0x9054: 0x614E,
    0x9055: 0x632F,
    0x9056: 0x65B0,
    0x9057: 0x664B,
    0x9058: 0x68EE,
    0x9059: 0x699B,
    0x905A: 0x6D78,
    0x905B: 0x6DF1,
    0x905C: 0x7533,
    0x905D: 0x75B9,
    0x905E: 0x771F,
    0x905F: 0x795E,
    0x9060: 0x79E6,
    0x9061: 0x7D33,
    0x9062: 0x81E3,
    0x9063: 0x82AF,
    0x9064: 0x85AA,
    0x9065: 0x89AA,
    0x9066: 0x8A3A,
    0x9067: 0x8EAB,
    0x9068: 0x8F9B,
    0x9069: 0x9032,
    0x906A: 0x91DD,
    0x906B: 0x9707,
    0x906C: 0x4EBA,
    0x906D: 0x4EC1,
    0x906E: 0x5203,
    0x906F: 0x5875,
    0x9070: 0x58EC,
    0x9071: 0x5C0B,
    0x9072: 0x751A,
    0x9073: 0x5C3D,
    0x9074: 0x814E,
    0x9075: 0x8A0A,
    0x9076: 0x8FC5,
    0x9077: 0x9663,
    0x9078: 0x976D,
    0x9079: 0x7B25,
    0x907A: 0x8ACF,
    0x907B: 0x9808,
    0x907C: 0x9162,
    0x907D: 0x56F3,
    0x907E: 0x53A8,
    0x9080: 0x9017,
    0x9081: 0x5439,
    0x9082: 0x5782,
    0x9083: 0x5E25,
    0x9084: 0x63A8,
    0x9085: 0x6C34,
    0x9086: 0x708A,
    0x9087: 0x7761,
    0x9088: 0x7C8B,
    0x9089: 0x7FE0,
    0x908A: 0x8870,
    0x908B: 0x9042,
    0x908C: 0x9154,
    0x908D: 0x9310,
    0x908E: 0x9318,
    0x908F: 0x968F,
    0x9090: 0x745E,
    0x9091: 0x9AC4,
    0x9092: 0x5D07,
    0x9093: 0x5D69,
    0x9094: 0x6570,
    0x9095: 0x67A2,
    0x9096: 0x8DA8,
    0x9097: 0x96DB,
    0x9098: 0x636E,
    0x9099: 0x6749,
    0x909A: 0x6919,
    0x909B: 0x83C5,
    0x909C: 0x9817,
    0x909D: 0x96C0,
    0x909E: 0x88FE,
    0x909F: 0x6F84,
    0x90A0: 0x647A,
    0x90A1: 0x5BF8,
    0x90A2: 0x4E16,
    0x90A3: 0x702C,
    0x90A4: 0x755D,
    0x90A5: 0x662F,
    0x90A6: 0x51C4,
    0x90A7: 0x5236,
    0x90A8: 0x52E2,
    0x90A9: 0x59D3,
    0x90AA: 0x5F81,
    0x90AB: 0x6027,
    0x90AC: 0x6210,
    0x90AD: 0x653F,
    0x90AE: 0x6574,
    0x90AF: 0x661F,
    0x90B0: 0x6674,
    0x90B1: 0x68F2,
    0x90B2: 0x6816,
    0x90B3: 0x6B63,
    0x90B4: 0x6E05,
    0x90B5: 0x7272,
    0x90B6: 0x751F,
    0x90B7: 0x76DB,
    0x90B8: 0x7CBE,
    0x90B9: 0x8056,
    0x90BA: 0x58F0,
    0x90BB: 0x88FD,
    0x90BC: 0x897F,
    0x90BD: 0x8AA0,
    0x90BE: 0x8A93,
    0x90BF: 0x8ACB,
    0x90C0: 0x901D,
    0x90C1: 0x9192,
    0x90C2: 0x9752,
    0x90C3: 0x9759,
    0x90C4: 0x6589,
    0x90C5: 0x7A0E,
    0x90C6: 0x8106,
    0x90C7: 0x96BB,
    0x90C8: 0x5E2D,
    0x90C9: 0x60DC,
    0x90CA: 0x621A,
    0x90CB: 0x65A5,
    0x90CC: 0x6614,
    0x90CD: 0x6790,
    0x90CE: 0x77F3,
    0x90CF: 0x7A4D,
    0x90D0: 0x7C4D,
    0x90D1: 0x7E3E,
    0x90D2: 0x810A,
    0x90D3: 0x8CAC,
    0x90D4: 0x8D64,
    0x90D5: 0x8DE1,
    0x90D6: 0x8E5F,
    0x90D7: 0x78A9,
    0x90D8: 0x5207,
    0x90D9: 0x62D9,
    0x90DA: 0x63A5,
    0x90DB: 0x6442,
    0x90DC: 0x6298,
    0x90DD: 0x8A2D,
    0x90DE: 0x7A83,
    0x90DF: 0x7BC0,
    0x90E0: 0x8AAC,
    0x90E1: 0x96EA,
    0x90E2: 0x7D76,
    0x90E3: 0x820C,
    0x90E4: 0x8749,
    0x90E5: 0x4ED9,
    0x90E6: 0x5148,
    0x90E7: 0x5343,
    0x90E8: 0x5360,
    0x90E9: 0x5BA3,
    0x90EA: 0x5C02,
    0x90EB: 0x5C16,
    0x90EC: 0x5DDD,
    0x90ED: 0x6226,
    0x90EE: 0x6247,
    0x90EF: 0x64B0,
    0x90F0: 0x6813,
    0x90F1: 0x6834,
    0x90F2: 0x6CC9,
    0x90F3: 0x6D45,
    0x90F4: 0x6D17,
    0x90F5: 0x67D3,
    0x90F6: 0x6F5C,
    0x90F7: 0x714E,
    0x90F8: 0x717D,
    0x90F9: 0x65CB,
    0x90FA: 0x7A7F,
    0x90FB: 0x7BAD,
    0x90FC: 0x7DDA,
    0x9140: 0x7E4A,
    0x9141: 0x7FA8,
    0x9142: 0x817A,
    0x9143: 0x821B,
    0x9144: 0x8239,
    0x9145: 0x85A6,
    0x9146: 0x8A6E,
    0x9147: 0x8CCE,
    0x9148: 0x8DF5,
    0x9149: 0x9078,
    0x914A: 0x9077,
    0x914B: 0x92AD,
    0x914C: 0x9291,
    0x914D: 0x9583,
    0x914E: 0x9BAE,
    0x914F: 0x524D,
    0x9150: 0x5584,
    0x9151: 0x6F38,
    0x9152: 0x7136,
    0x9153: 0x5168,
    0x9154: 0x7985,
    0x9155: 0x7E55,
    0x9156: 0x81B3,
    0x9157: 0x7CCE,
    0x9158: 0x564C,
    0x9159: 0x5851,
    0x915A: 0x5CA8,
    0x915B: 0x63AA,
    0x915C: 0x66FE,
    0x915D: 0x66FD,
    0x915E: 0x695A,
    0x915F: 0x72D9,
    0x9160: 0x758F,
    0x9161: 0x758E,
    0x9162: 0x790E,
    0x9163: 0x7956,
    0x9164: 0x79DF,
    0x9165: 0x7C97,
    0x9166: 0x7D20,
    0x9167: 0x7D44,
    0x9168: 0x8607,
    0x9169: 0x8A34,
    0x916A: 0x963B,
    0x916B: 0x9061,
    0x916C: 0x9F20,
    0x916D: 0x50E7,
    0x916E: 0x5275,
    0x916F: 0x53CC,
    0x9170: 0x53E2,
    0x9171: 0x5009,
    0x9172: 0x55AA,
    0x9173: 0x58EE,
    0x9174: 0x594F,
    0x9175: 0x723D,
    0x9176: 0x5B8B,
    0x9177: 0x5C64,
    0x9178: 0x531D,
    0x9179: 0x60E3,
    0x917A: 0x60F3,
    0x917B: 0x635C,
    0x917C: 0x6383,
    0x917D: 0x633F,
    0x917E: 0x63BB,
    0x9180: 0x64CD,
    0x9181: 0x65E9,
    0x9182: 0x66F9,
    0x9183: 0x5DE3,
    0x9184: 0x69CD,
    0x9185: 0x69FD,
    0x9186: 0x6F15,
    0x9187: 0x71E5,
    0x9188: 0x4E89,
    0x9189: 0x75E9,
    0x918A: 0x76F8,
    0x918B: 0x7A93,
    0x918C: 0x7CDF,
    0x918D: 0x7DCF,
    0x918E: 0x7D9C,
    0x918F: 0x8061,
    0x9190: 0x8349,
    0x9191: 0x8358,
    0x9192: 0x846C,
    0x9193: 0x84BC,
    0x9194: 0x85FB,
    0x9195: 0x88C5,
    0x9196: 0x8D70,
    0x9197: 0x9001,
    0x9198: 0x906D,
    0x9199: 0x9397,
    0x919A: 0x971C,
    0x919B: 0x9A12,
    0x919C: 0x50CF,
    0x919D: 0x5897,
    0x919E: 0x618E,
    0x919F: 0x81D3,
    0x91A0: 0x8535,
    0x91A1: 0x8D08,
    0x91A2: 0x9020,
    0x91A3: 0x4FC3,
    0x91A4: 0x5074,
    0x91A5: 0x5247,
    0x91A6: 0x5373,
    0x91A7: 0x606F,
    0x91A8: 0x6349,
    0x91A9: 0x675F,
    0x91AA: 0x6E2C,
    0x91AB: 0x8DB3,
    0x91AC: 0x901F,
    0x91AD: 0x4FD7,
    0x91AE: 0x5C5E,
    0x91AF: 0x8CCA,
    0x91B0: 0x65CF,
    0x91B1: 0x7D9A,
    0x91B2: 0x5352,
    0x91B3: 0x8896,
    0x91B4: 0x5176,
    0x91B5: 0x63C3,
    0x91B6: 0x5B58,
    0x91B7: 0x5B6B,
    0x91B8: 0x5C0A,
    0x91B9: 0x640D,
    0x91BA: 0x6751,
    0x91BB: 0x905C,
    0x91BC: 0x4ED6,
    0x91BD: 0x591A,
    0x91BE: 0x592A,
    0x91BF: 0x6C70,
    0x91C0: 0x8A51,
    0x91C1: 0x553E,
    0x91C2: 0x5815,
    0x91C3: 0x59A5,
    0x91C4: 0x60F0,
    0x91C5: 0x6253,
    0x91C6: 0x67C1,
    0x91C7: 0x8235,
    0x91C8: 0x6955,
    0x91C9: 0x9640,
    0x91CA: 0x99C4,
    0x91CB: 0x9A28,
    0x91CC: 0x4F53,
    0x91CD: 0x5806,
    0x91CE: 0x5BFE,
    0x91CF: 0x8010,
    0x91D0: 0x5CB1,
    0x91D1: 0x5E2F,
    0x91D2: 0x5F85,
    0x91D3: 0x6020,
    0x91D4: 0x614B,
    0x91D5: 0x6234,
    0x91D6: 0x66FF,
    0x91D7: 0x6CF0,
    0x91D8: 0x6EDE,
    0x91D9: 0x80CE,
    0x91DA: 0x817F,
    0x91DB: 0x82D4,
    0x91DC: 0x888B,
    0x91DD: 0x8CB8,
    0x91DE: 0x9000,
    0x91DF: 0x902E,
    0x91E0: 0x968A,
    0x91E1: 0x9EDB,
    0x91E2: 0x9BDB,
    0x91E3: 0x4EE3,
    0x91E4: 0x53F0,
    0x91E5: 0x5927,
    0x91E6: 0x7B2C,
    0x91E7: 0x918D,
    0x91E8: 0x984C,
    0x91E9: 0x9DF9,
    0x91EA: 0x6EDD,
    0x91EB: 0x7027,
    0x91EC: 0x5353,
    0x91ED: 0x5544,
    0x91EE: 0x5B85,
    0x91EF: 0x6258,
    0x91F0: 0x629E,
    0x91F1: 0x62D3,
    0x91F2: 0x6CA2,
    0x91F3: 0x6FEF,
    0x91F4: 0x7422,
    0x91F5: 0x8A17,
    0x91F6: 0x9438,
    0x91F7: 0x6FC1,
    0x91F8: 0x8AFE,
    0x91F9: 0x8338,
    0x91FA: 0x51E7,
    0x91FB: 0x86F8,
    0x91FC: 0x53EA,
    0x9240: 0x53E9,
    0x9241: 0x4F46,
    0x9242: 0x9054,
    0x9243: 0x8FB0,
    0x9244: 0x596A,
    0x9245: 0x8131,
    0x9246: 0x5DFD,
    0x9247: 0x7AEA,
    0x9248: 0x8FBF,
    0x9249: 0x68DA,
    0x924A: 0x8C37,
    0x924B: 0x72F8,
    0x924C: 0x9C48,
    0x924D: 0x6A3D,
    0x924E: 0x8AB0,
    0x924F: 0x4E39,
    0x9250: 0x5358,
    0x9251: 0x5606,
    0x9252: 0x5766,
    0x9253: 0x62C5,
    0x9254: 0x63A2,
    0x9255: 0x65E6,
    0x9256: 0x6B4E,
    0x9257: 0x6DE1,
    0x9258: 0x6E5B,
    0x9259: 0x70AD,
    0x925A: 0x77ED,
    0x925B: 0x7AEF,
    0x925C: 0x7BAA,
    0x925D: 0x7DBB,
    0x925E: 0x803D,
    0x925F: 0x80C6,
    0x9260: 0x86CB,
    0x9261: 0x8A95,
    0x9262: 0x935B,
    0x9263: 0x56E3,
    0x9264: 0x58C7,
    0x9265: 0x5F3E,
    0x9266: 0x65AD,
    0x9267: 0x6696,
    0x9268: 0x6A80,
    0x9269: 0x6BB5,
    0x926A: 0x7537,
    0x926B: 0x8AC7,
    0x926C: 0x5024,
    0x926D: 0x77E5,
    0x926E: 0x5730,
    0x926F: 0x5F1B,
    0x9270: 0x6065,
    0x9271: 0x667A,
    0x9272: 0x6C60,
    0x9273: 0x75F4,
    0x9274: 0x7A1A,
    0x9275: 0x7F6E,
    0x9276: 0x81F4,
    0x9277: 0x8718,
    0x9278: 0x9045,
    0x9279: 0x99B3,
    0x927A: 0x7BC9,
    0x927B: 0x755C,
    0x927C: 0x7AF9,
    0x927D: 0x7B51,
    0x927E: 0x84C4,
    0x9280: 0x9010,
    0x9281: 0x79E9,
    0x9282: 0x7A92,
    0x9283: 0x8336,
    0x9284: 0x5AE1,
    0x9285: 0x7740,
    0x9286: 0x4E2D,
    0x9287: 0x4EF2,
    0x9288: 0x5B99,
    0x9289: 0x5FE0,
    0x928A: 0x62BD,
    0x928B: 0x663C,
    0x928C: 0x67F1,
    0x928D: 0x6CE8,
    0x928E: 0x866B,
    0x928F: 0x8877,
    0x9290: 0x8A3B,
    0x9291: 0x914E,
    0x9292: 0x92F3,
    0x9293: 0x99D0,
    0x9294: 0x6A17,
    0x9295: 0x7026,
    0x9296: 0x732A,
    0x9297: 0x82E7,
    0x9298: 0x8457,
    0x9299: 0x8CAF,
    0x929A: 0x4E01,
    0x929B: 0x5146,
    0x929C: 0x51CB,
    0x929D: 0x558B,
    0x929E: 0x5BF5,
    0x929F: 0x5E16,
    0x92A0: 0x5E33,
    0x92A1: 0x5E81,
    0x92A2: 0x5F14,
    0x92A3: 0x5F35,
    0x92A4: 0x5F6B,
    0x92A5: 0x5FB4,
    0x92A6: 0x61F2,
    0x92A7: 0x6311,
    0x92A8: 0x66A2,
    0x92A9: 0x671D,
    0x92AA: 0x6F6E,
    0x92AB: 0x7252,
    0x92AC: 0x753A,
    0x92AD: 0x773A,
    0x92AE: 0x8074,
    0x92AF: 0x8139,
    0x92B0: 0x8178,
    0x92B1: 0x8776,
    0x92B2: 0x8ABF,
    0x92B3: 0x8ADC,
    0x92B4: 0x8D85,
    0x92B5: 0x8DF3,
    0x92B6: 0x929A,
    0x92B7: 0x9577,
    0x92B8: 0x9802,
    0x92B9: 0x9CE5,
    0x92BA: 0x52C5,
    0x92BB: 0x6357,
    0x92BC: 0x76F4,
    0x92BD: 0x6715,
    0x92BE: 0x6C88,
    0x92BF: 0x73CD,
    0x92C0: 0x8CC3,
    0x92C1: 0x93AE,
    0x92C2: 0x9673,
    0x92C3: 0x6D25,
    0x92C4: 0x589C,
    0x92C5: 0x690E,
    0x92C6: 0x69CC,
    0x92C7: 0x8FFD,
    0x92C8: 0x939A,
    0x92C9: 0x75DB,
    0x92CA: 0x901A,
    0x92CB: 0x585A,
    0x92CC: 0x6802,
    0x92CD: 0x63B4,
    0x92CE: 0x69FB,
    0x92CF: 0x4F43,
    0x92D0: 0x6F2C,
    0x92D1: 0x67D8,
    0x92D2: 0x8FBB,
    0x92D3: 0x8526,
    0x92D4: 0x7DB4,
    0x92D5: 0x9354,
    0x92D6: 0x693F,
    0x92D7: 0x6F70,
    0x92D8: 0x576A,
    0x92D9: 0x58F7,
    0x92DA: 0x5B2C,
    0x92DB: 0x7D2C,
    0x92DC: 0x722A,
    0x92DD: 0x540A,
    0x92DE: 0x91E3,
    0x92DF: 0x9DB4,
    0x92E0: 0x4EAD,
    0x92E1: 0x4F4E,
    0x92E2: 0x505C,
    0x92E3: 0x5075,
    0x92E4: 0x5243,
    0x92E5: 0x8C9E,
    0x92E6: 0x5448,
    0x92E7: 0x5824,
    0x92E8: 0x5B9A,
    0x92E9: 0x5E1D,
    0x92EA: 0x5E95,
    0x92EB: 0x5EAD,
    0x92EC: 0x5EF7,
    0x92ED: 0x5F1F,
    0x92EE: 0x608C,
    0x92EF: 0x62B5,
    0x92F0: 0x633A,
    0x92F1: 0x63D0,
    0x92F2: 0x68AF,
    0x92F3: 0x6C40,
    0x92F4: 0x7887,
    0x92F5: 0x798E,
    0x92F6: 0x7A0B,
    0x92F7: 0x7DE0,
    0x92F8: 0x8247,
    0x92F9: 0x8A02,
    0x92FA: 0x8AE6,
    0x92FB: 0x8E44,
    0x92FC: 0x9013,
    0x9340: 0x90B8,
    0x9341: 0x912D,
    0x9342: 0x91D8,
    0x9343: 0x9F0E,
    0x9344: 0x6CE5,
    0x9345: 0x6458,
    0x9346: 0x64E2,
    0x9347: 0x6575,
    0x9348: 0x6EF4,
    0x9349: 0x7684,
    0x934A: 0x7B1B,
    0x934B: 0x9069,
    0x934C: 0x93D1,
    0x934D: 0x6EBA,
    0x934E: 0x54F2,
    0x934F: 0x5FB9,
    0x9350: 0x64A4,
    0x9351: 0x8F4D,
    0x9352: 0x8FED,
    0x9353: 0x9244,
    0x9354: 0x5178,
    0x9355: 0x586B,
    0x9356: 0x5929,
    0x9357: 0x5C55,
    0x9358: 0x5E97,
    0x9359: 0x6DFB,
    0x935A: 0x7E8F,
    0x935B: 0x751C,
    0x935C: 0x8CBC,
    0x935D: 0x8EE2,
    0x935E: 0x985B,
    0x935F: 0x70B9,
    0x9360: 0x4F1D,
    0x9361: 0x6BBF,
    0x9362: 0x6FB1,
    0x9363: 0x7530,
    0x9364: 0x96FB,
    0x9365: 0x514E,
    0x9366: 0x5410,
    0x9367: 0x5835,
    0x9368: 0x5857,
    0x9369: 0x59AC,
    0x936A: 0x5C60,
    0x936B: 0x5F92,
    0x936C: 0x6597,
    0x936D: 0x675C,
    0x936E: 0x6E21,
    0x936F: 0x767B,
    0x9370: 0x83DF,
    0x9371: 0x8CED,
    0x9372: 0x9014,
    0x9373: 0x90FD,
    0x9374: 0x934D,
    0x9375: 0x7825,
    0x9376: 0x783A,
    0x9377: 0x52AA,
    0x9378: 0x5EA6,
    0x9379: 0x571F,
    0x937A: 0x5974,
    0x937B: 0x6012,
    0x937C: 0x5012,
    0x937D: 0x515A,
    0x937E: 0x51AC,
    0x9380: 0x51CD,
    0x9381: 0x5200,
    0x9382: 0x5510,
    0x9383: 0x5854,
    0x9384: 0x5858,
    0x9385: 0x5957,
    0x9386: 0x5B95,
    0x9387: 0x5CF6,
    0x9388: 0x5D8B,
    0x9389: 0x60BC,
    0x938A: 0x6295,
    0x938B: 0x642D,
    0x938C: 0x6771,
    0x938D: 0x6843,
    0x938E: 0x68BC,
    0x938F: 0x68DF,
    0x9390: 0x76D7,
    0x9391: 0x6DD8,
    0x9392: 0x6E6F,
    0x9393: 0x6D9B,
    0x9394: 0x706F,
    0x9395: 0x71C8,
    0x9396: 0x5F53,
    0x9397: 0x75D8,
    0x9398: 0x7977,
    0x9399: 0x7B49,
    0x939A: 0x7B54,
    0x939B: 0x7B52,
    0x939C: 0x7CD6,
    0x939D: 0x7D71,
    0x939E: 0x5230,
    0x939F: 0x8463,
    0x93A0: 0x8569,
    0x93A1: 0x85E4,
    0x93A2: 0x8A0E,
    0x93A3: 0x8B04,
    0x93A4: 0x8C46,
    0x93A5: 0x8E0F,
    0x93A6: 0x9003,
    0x93A7: 0x900F,
    0x93A8: 0x9419,
    0x93A9: 0x9676,
    0x93AA: 0x982D,
    0x93AB: 0x9A30,
    0x93AC: 0x95D8,
    0x93AD: 0x50CD,
    0x93AE: 0x52D5,
    0x93AF: 0x540C,
    0x93B0: 0x5802,
    0x93B1: 0x5C0E,
    0x93B2: 0x61A7,
    0x93B3: 0x649E,
    0x93B4: 0x6D1E,
    0x93B5: 0x77B3,
    0x93B6: 0x7AE5,
    0x93B7: 0x80F4,
    0x93B8: 0x8404,
    0x93B9: 0x9053,
    0x93BA: 0x9285,
    0x93BB: 0x5CE0,
    0x93BC: 0x9D07,
    0x93BD: 0x533F,
    0x93BE: 0x5F97,
    0x93BF: 0x5FB3,
    0x93C0: 0x6D9C,
    0x93C1: 0x7279,
    0x93C2: 0x7763,
    0x93C3: 0x79BF,
    0x93C4: 0x7BE4,
    0x93C5: 0x6BD2,
    0x93C6: 0x72EC,
    0x93C7: 0x8AAD,
    0x93C8: 0x6803,
    0x93C9: 0x6A61,
    0x93CA: 0x51F8,
    0x93CB: 0x7A81,
    0x93CC: 0x6934,
    0x93CD: 0x5C4A,
    0x93CE: 0x9CF6,
    0x93CF: 0x82EB,
    0x93D0: 0x5BC5,
    0x93D1: 0x9149,
    0x93D2: 0x701E,
    0x93D3: 0x5678,
    0x93D4: 0x5C6F,
    0x93D5: 0x60C7,
    0x93D6: 0x6566,
    0x93D7: 0x6C8C,
    0x93D8: 0x8C5A,
    0x93D9: 0x9041,
    0x93DA: 0x9813,
    0x93DB: 0x5451,
    0x93DC: 0x66C7,
    0x93DD: 0x920D,
    0x93DE: 0x5948,
    0x93DF: 0x90A3,
    0x93E0: 0x5185,
    0x93E1: 0x4E4D,
    0x93E2: 0x51EA,
    0x93E3: 0x8599,
    0x93E4: 0x8B0E,
    0x93E5: 0x7058,
    0x93E6: 0x637A,
    0x93E7: 0x934B,
    0x93E8: 0x6962,
    0x93E9: 0x99B4,
    0x93EA: 0x7E04,
    0x93EB: 0x7577,
    0x93EC: 0x5357,
    0x93ED: 0x6960,
    0x93EE: 0x8EDF,
    0x93EF: 0x96E3,
    0x93F0: 0x6C5D,
    0x93F1: 0x4E8C,
    0x93F2: 0x5C3C,
    0x93F3: 0x5F10,
    0x93F4: 0x8FE9,
    0x93F5: 0x5302,
    0x93F6: 0x8CD1,
    0x93F7: 0x8089,
    0x93F8: 0x8679,
    0x93F9: 0x5EFF,
    0x93FA: 0x65E5,
    0x93FB: 0x4E73,
    0x93FC: 0x5165,
    0x9440: 0x5982,
    0x9441: 0x5C3F,
    0x9442: 0x97EE,
    0x9443: 0x4EFB,
    0x9444: 0x598A,
    0x9445: 0x5FCD,
    0x9446: 0x8A8D,
    0x9447: 0x6FE1,
    0x9448: 0x79B0,
    0x9449: 0x7962,
    0x944A: 0x5BE7,
    0x944B: 0x8471,
    0x944C: 0x732B,
    0x944D: 0x71B1,
    0x944E: 0x5E74,
    0x944F: 0x5FF5,
    0x9450: 0x637B,
    0x9451: 0x649A,
    0x9452: 0x71C3,
    0x9453: 0x7C98,
    0x9454: 0x4E43,
    0x9455: 0x5EFC,
    0x9456: 0x4E4B,
    0x9457: 0x57DC,
    0x9458: 0x56A2,
    0x9459: 0x60A9,
    0x945A: 0x6FC3,
    0x945B: 0x7D0D,
    0x945C: 0x80FD,
    0x945D: 0x8133,
    0x945E: 0x81BF,
    0x945F: 0x8FB2,
    0x9460: 0x8997,
    0x9461: 0x86A4,
    0x9462: 0x5DF4,
    0x9463: 0x628A,
    0x9464: 0x64AD,
    0x9465: 0x8987,
    0x9466: 0x6777,
    0x9467: 0x6CE2,
    0x9468: 0x6D3E,
    0x9469: 0x7436,
    0x946A: 0x7834,
    0x946B: 0x5A46,
    0x946C: 0x7F75,
    0x946D: 0x82AD,
    0x946E: 0x99AC,
    0x946F: 0x4FF3,
    0x9470: 0x5EC3,
    0x9471: 0x62DD,
    0x9472: 0x6392,
    0x9473: 0x6557,
    0x9474: 0x676F,
    0x9475: 0x76C3,
    0x9476: 0x724C,
    0x9477: 0x80CC,
    0x9478: 0x80BA,
    0x9479: 0x8F29,
    0x947A: 0x914D,
    0x947B: 0x500D,
    0x947C: 0x57F9,
    0x947D: 0x5A92,
    0x947E: 0x6885,
    0x9480: 0x6973,
    0x9481: 0x7164,
    0x9482: 0x72FD,
    0x9483: 0x8CB7,
    0x9484: 0x58F2,
    0x9485: 0x8CE0,
    0x9486: 0x966A,
    0x9487: 0x9019,
    0x9488: 0x877F,
    0x9489: 0x79E4,
    0x948A: 0x77E7,
    0x948B: 0x8429,
    0x948C: 0x4F2F,
    0x948D: 0x5265,
    0x948E: 0x535A,
    0x948F: 0x62CD,
    0x9490: 0x67CF,
    0x9491: 0x6CCA,
    0x9492: 0x767D,
    0x9493: 0x7B94,
    0x9494: 0x7C95,
    0x9495: 0x8236,
    0x9496: 0x8584,
    0x9497: 0x8FEB,
    0x9498: 0x66DD,
    0x9499: 0x6F20,
    0x949A: 0x7206,
    0x949B: 0x7E1B,
    0x949C: 0x83AB,
    0x949D: 0x99C1,
    0x949E: 0x9EA6,
    0x949F: 0x51FD,
    0x94A0: 0x7BB1,
    0x94A1: 0x7872,
    0x94A2: 0x7BB8,
    0x94A3: 0x8087,
    0x94A4: 0x7B48,
    0x94A5: 0x6AE8,
    0x94A6: 0x5E61,
    0x94A7: 0x808C,
    0x94A8: 0x7551,
    0x94A9: 0x7560,
    0x94AA: 0x516B,
    0x94AB: 0x9262,
    0x94AC: 0x6E8C,
    0x94AD: 0x767A,
    0x94AE: 0x9197,
    0x94AF: 0x9AEA,
    0x94B0: 0x4F10,
    0x94B1: 0x7F70,
    0x94B2: 0x629C,
    0x94B3: 0x7B4F,
    0x94B4: 0x95A5,
    0x94B5: 0x9CE9,
    0x94B6: 0x567A,
    0x94B7: 0x5859,
    0x94B8: 0x86E4,
    0x94B9: 0x96BC,
    0x94BA: 0x4F34,
    0x94BB: 0x5224,
    0x94BC: 0x534A,
    0x94BD: 0x53CD,
    0x94BE: 0x53DB,
    0x94BF: 0x5E06,
    0x94C0: 0x642C,
    0x94C1: 0x6591,
    0x94C2: 0x677F,
    0x94C3: 0x6C3E,
    0x94C4: 0x6C4E,
    0x94C5: 0x7248,
    0x94C6: 0x72AF,
    0x94C7: 0x73ED,
    0x94C8: 0x7554,
    0x94C9: 0x7E41,
    0x94CA: 0x822C,
    0x94CB: 0x85E9,
    0x94CC: 0x8CA9,
    0x94CD: 0x7BC4,
    0x94CE: 0x91C6,
    0x94CF: 0x7169,
    0x94D0: 0x9812,
    0x94D1: 0x98EF,
    0x94D2: 0x633D,
    0x94D3: 0x6669,
    0x94D4: 0x756A,
    0x94D5: 0x76E4,
    0x94D6: 0x78D0,
    0x94D7: 0x8543,
    0x94D8: 0x86EE,
    0x94D9: 0x532A,
    0x94DA: 0x5351,
    0x94DB: 0x5426,
    0x94DC: 0x5983,
    0x94DD: 0x5E87,
    0x94DE: 0x5F7C,
    0x94DF: 0x60B2,
    0x94E0: 0x6249,
    0x94E1: 0x6279,
    0x94E2: 0x62AB,
    0x94E3: 0x6590,
    0x94E4: 0x6BD4,
    0x94E5: 0x6CCC,
    0x94E6: 0x75B2,
    0x94E7: 0x76AE,
    0x94E8: 0x7891,
    0x94E9: 0x79D8,
    0x94EA: 0x7DCB,
    0x94EB: 0x7F77,
    0x94EC: 0x80A5,
    0x94ED: 0x88AB,
    0x94EE: 0x8AB9,
    0x94EF: 0x8CBB,
    0x94F0: 0x907F,
    0x94F1: 0x975E,
    0x94F2: 0x98DB,
    0x94F3: 0x6A0B,
    0x94F4: 0x7C38,
    0x94F5: 0x5099,
    0x94F6: 0x5C3E,
    0x94F7: 0x5FAE,
    0x94F8: 0x6787,
    0x94F9: 0x6BD8,
    0x94FA: 0x7435,
    0x94FB: 0x7709,
    0x94FC: 0x7F8E,
    0x9540: 0x9F3B,
    0x9541: 0x67CA,
    0x9542: 0x7A17,
    0x9543: 0x5339,
    0x9544: 0x758B,
    0x9545: 0x9AED,
    0x9546: 0x5F66,
    0x9547: 0x819D,
    0x9548: 0x83F1,
    0x9549: 0x8098,
    0x954A: 0x5F3C,
    0x954B: 0x5FC5,
    0x954C: 0x7562,
    0x954D: 0x7B46,
    0x954E: 0x903C,
    0x954F: 0x6867,
    0x9550: 0x59EB,
    0x9551: 0x5A9B,
    0x9552: 0x7D10,
    0x9553: 0x767E,
    0x9554: 0x8B2C,
    0x9555: 0x4FF5,
    0x9556: 0x5F6A,
    0x9557: 0x6A19,
    0x9558: 0x6C37,
    0x9559: 0x6F02,
    0x955A: 0x74E2,
    0x955B: 0x7968,
    0x955C: 0x8868,
    0x955D: 0x8A55,
    0x955E: 0x8C79,
    0x955F: 0x5EDF,
    0x9560: 0x63CF,
    0x9561: 0x75C5,
    0x9562: 0x79D2,
    0x9563: 0x82D7,
    0x9564: 0x9328,
    0x9565: 0x92F2,
    0x9566: 0x849C,
    0x9567: 0x86ED,
    0x9568: 0x9C2D,
    0x9569: 0x54C1,
    0x956A: 0x5F6C,
    0x956B: 0x658C,
    0x956C: 0x6D5C,
    0x956D: 0x7015,
    0x956E: 0x8CA7,
    0x956F: 0x8CD3,
    0x9570: 0x983B,
    0x9571: 0x654F,
    0x9572: 0x74F6,
    0x9573: 0x4E0D,
    0x9574: 0x4ED8,
    0x9575: 0x57E0,
    0x9576: 0x592B,
    0x9577: 0x5A66,
    0x9578: 0x5BCC,
    0x9579: 0x51A8,
    0x957A: 0x5E03,
    0x957B: 0x5E9C,
    0x957C: 0x6016,
    0x957D: 0x6276,
    0x957E: 0x6577,
    0x9580: 0x65A7,
    0x9581: 0x666E,
    0x9582: 0x6D6E,
    0x9583: 0x7236,
    0x9584: 0x7B26,
    0x9585: 0x8150,
    0x9586: 0x819A,
    0x9587: 0x8299,
    0x9588: 0x8B5C,
    0x9589: 0x8CA0,
    0x958A: 0x8CE6,
    0x958B: 0x8D74,
    0x958C: 0x961C,
    0x958D: 0x9644,
    0x958E: 0x4FAE,
    0x958F: 0x64AB,
    0x9590: 0x6B66,
    0x9591: 0x821E,
    0x9592: 0x8461,
    0x9593: 0x856A,
    0x9594: 0x90E8,
    0x9595: 0x5C01,
    0x9596: 0x6953,
    0x9597: 0x98A8,
    0x9598: 0x847A,
    0x9599: 0x8557,
    0x959A: 0x4F0F,
    0x959B: 0x526F,
    0x959C: 0x5FA9,
    0x959D: 0x5E45,
    0x959E: 0x670D,
    0x959F: 0x798F,
    0x95A0: 0x8179,
    0x95A1: 0x8907,
    0x95A2: 0x8986,
    0x95A3: 0x6DF5,
    0x95A4: 0x5F17,
    0x95A5: 0x6255,
    0x95A6: 0x6CB8,
    0x95A7: 0x4ECF,
    0x95A8: 0x7269,
    0x95A9: 0x9B92,
    0x95AA: 0x5206,
    0x95AB: 0x543B,
    0x95AC: 0x5674,
    0x95AD: 0x58B3,
    0x95AE: 0x61A4,
    0x95AF: 0x626E,
    0x95B0: 0x711A,
    0x95B1: 0x596E,
    0x95B2: 0x7C89,
    0x95B3: 0x7CDE,
    0x95B4: 0x7D1B,
    0x95B5: 0x96F0,
    0x95B6: 0x6587,
    0x95B7: 0x805E,
    0x95B8: 0x4E19,
    0x95B9: 0x4F75,
    0x95BA: 0x5175,
    0x95BB: 0x5840,
    0x95BC: 0x5E63,
    0x95BD: 0x5E73,
    0x95BE: 0x5F0A,
    0x95BF: 0x67C4,
    0x95C0: 0x4E26,
    0x95C1: 0x853D,
    0x95C2: 0x9589,
    0x95C3: 0x965B,
    0x95C4: 0x7C73,
    0x95C5: 0x9801,
    0x95C6: 0x50FB,
    0x95C7: 0x58C1,
    0x95C8: 0x7656,
    0x95C9: 0x78A7,
    0x95CA: 0x5225,
    0x95CB: 0x77A5,
    0x95CC: 0x8511,
    0x95CD: 0x7B86,
    0x95CE: 0x504F,
    0x95CF: 0x5909,
    0x95D0: 0x7247,
    0x95D1: 0x7BC7,
    0x95D2: 0x7DE8,
    0x95D3: 0x8FBA,
    0x95D4: 0x8FD4,
    0x95D5: 0x904D,
    0x95D6: 0x4FBF,
    0x95D7: 0x52C9,
    0x95D8: 0x5A29,
    0x95D9: 0x5F01,
    0x95DA: 0x97AD,
    0x95DB: 0x4FDD,
    0x95DC: 0x8217,
    0x95DD: 0x92EA,
    0x95DE: 0x5703,
    0x95DF: 0x6355,
    0x95E0: 0x6B69,
    0x95E1: 0x752B,
    0x95E2: 0x88DC,
    0x95E3: 0x8F14,
    0x95E4: 0x7A42,
    0x95E5: 0x52DF,
    0x95E6: 0x5893,
    0x95E7: 0x6155,
    0x95E8: 0x620A,
    0x95E9: 0x66AE,
    0x95EA: 0x6BCD,
    0x95EB: 0x7C3F,
    0x95EC: 0x83E9,
    0x95ED: 0x5023,
    0x95EE: 0x4FF8,
    0x95EF: 0x5305,
    0x95F0: 0x5446,
    0x95F1: 0x5831,
    0x95F2: 0x5949,
    0x95F3: 0x5B9D,
    0x95F4: 0x5CF0,
    0x95F5: 0x5CEF,
    0x95F6: 0x5D29,
    0x95F7: 0x5E96,
    0x95F8: 0x62B1,
    0x95F9: 0x6367,
    0x95FA: 0x653E,
    0x95FB: 0x65B9,
    0x95FC: 0x670B,
    0x9640: 0x6CD5,
    0x9641: 0x6CE1,
    0x9642: 0x70F9,
    0x9643: 0x7832,
    0x9644: 0x7E2B,
    0x9645: 0x80DE,
    0x9646: 0x82B3,
    0x9647: 0x840C,
    0x9648: 0x84EC,
    0x9649: 0x8702,
    0x964A: 0x8912,
    0x964B: 0x8A2A,
    0x964C: 0x8C4A,
    0x964D: 0x90A6,
    0x964E: 0x92D2,
    0x964F: 0x98FD,
    0x9650: 0x9CF3,
    0x9651: 0x9D6C,
    0x9652: 0x4E4F,
    0x9653: 0x4EA1,
    0x9654: 0x508D,
    0x9655: 0x5256,
    0x9656: 0x574A,
    0x9657: 0x59A8,
    0x9658: 0x5E3D,
    0x9659: 0x5FD8,
    0x965A: 0x5FD9,
    0x965B: 0x623F,
    0x965C: 0x66B4,
    0x965D: 0x671B,
    0x965E: 0x67D0,
    0x965F: 0x68D2,
    0x9660: 0x5192,
    0x9661: 0x7D21,
    0x9662: 0x80AA,
    0x9663: 0x81A8,
    0x9664: 0x8B00,
    0x9665: 0x8C8C,
    0x9666: 0x8CBF,
    0x9667: 0x927E,
    0x9668: 0x9632,
    0x9669: 0x5420,
    0x966A: 0x982C,
    0x966B: 0x5317,
    0x966C: 0x50D5,
    0x966D: 0x535C,
    0x966E: 0x58A8,
    0x966F: 0x64B2,
    0x9670: 0x6734,
    0x9671: 0x7267,
    0x9672: 0x7766,
    0x9673: 0x7A46,
    0x9674: 0x91E6,
    0x9675: 0x52C3,
    0x9676: 0x6CA1,
    0x9677: 0x6B86,
    0x9678: 0x5800,
    0x9679: 0x5E4C,
    0x967A: 0x5954,
    0x967B: 0x672C,
    0x967C: 0x7FFB,
    0x967D: 0x51E1,
    0x967E: 0x76C6,
    0x9680: 0x6469,
    0x9681: 0x78E8,
    0x9682: 0x9B54,
    0x9683: 0x9EBB,
    0x9684: 0x57CB,
    0x9685: 0x59B9,
    0x9686: 0x6627,
    0x9687: 0x679A,
    0x9688: 0x6BCE,
    0x9689: 0x54E9,
    0x968A: 0x69D9,
    0x968B: 0x5E55,
    0x968C: 0x819C,
    0x968D: 0x6795,
    0x968E: 0x9BAA,
    0x968F: 0x67FE,
    0x9690: 0x9C52,
    0x9691: 0x685D,
    0x9692: 0x4EA6,
    0x9693: 0x4FE3,
    0x9694: 0x53C8,
    0x9695: 0x62B9,
    0x9696: 0x672B,
    0x9697: 0x6CAB,
    0x9698: 0x8FC4,
    0x9699: 0x4FAD,
    0x969A: 0x7E6D,
    0x969B: 0x9EBF,
    0x969C: 0x4E07,
    0x969D: 0x6162,
    0x969E: 0x6E80,
    0x969F: 0x6F2B,
    0x96A0: 0x8513,
    0x96A1: 0x5473,
    0x96A2: 0x672A,
    0x96A3: 0x9B45,
    0x96A4: 0x5DF3,
    0x96A5: 0x7B95,
    0x96A6: 0x5CAC,
    0x96A7: 0x5BC6,
    0x96A8: 0x871C,
    0x96A9: 0x6E4A,
    0x96AA: 0x84D1,
    0x96AB: 0x7A14,
    0x96AC: 0x8108,
    0x96AD: 0x5999,
    0x96AE: 0x7C8D,
    0x96AF: 0x6C11,
    0x96B0: 0x7720,
    0x96B1: 0x52D9,
    0x96B2: 0x5922,
    0x96B3: 0x7121,
    0x96B4: 0x725F,
    0x96B5: 0x77DB,
    0x96B6: 0x9727,
    0x96B7: 0x9D61,
    0x96B8: 0x690B,
    0x96B9: 0x5A7F,
    0x96BA: 0x5A18,
    0x96BB: 0x51A5,
    0x96BC: 0x540D,
    0x96BD: 0x547D,
    0x96BE: 0x660E,
    0x96BF: 0x76DF,
    0x96C0: 0x8FF7,
    0x96C1: 0x9298,
    0x96C2: 0x9CF4,
    0x96C3: 0x59EA,
    0x96C4: 0x725D,
    0x96C5: 0x6EC5,
    0x96C6: 0x514D,
    0x96C7: 0x68C9,
    0x96C8: 0x7DBF,
    0x96C9: 0x7DEC,
    0x96CA: 0x9762,
    0x96CB: 0x9EBA,
    0x96CC: 0x6478,
    0x96CD: 0x6A21,
    0x96CE: 0x8302,
    0x96CF: 0x5984,
    0x96D0: 0x5B5F,
    0x96D1: 0x6BDB,
    0x96D2: 0x731B,
    0x96D3: 0x76F2,
    0x96D4: 0x7DB2,
    0x96D5: 0x8017,
    0x96D6: 0x8499,
    0x96D7: 0x5132,
    0x96D8: 0x6728,
    0x96D9: 0x9ED9,
    0x96DA: 0x76EE,
    0x96DB: 0x6762,
    0x96DC: 0x52FF,
    0x96DD: 0x9905,
    0x96DE: 0x5C24,
    0x96DF: 0x623B,
    0x96E0: 0x7C7E,
    0x96E1: 0x8CB0,
    0x96E2: 0x554F,
    0x96E3: 0x60B6,
    0x96E4: 0x7D0B,
    0x96E5: 0x9580,
    0x96E6: 0x5301,
    0x96E7: 0x4E5F,
    0x96E8: 0x51B6,
    0x96E9: 0x591C,
    0x96EA: 0x723A,
    0x96EB: 0x8036,
    0x96EC: 0x91CE,
    0x96ED: 0x5F25,
    0x96EE: 0x77E2,
    0x96EF: 0x5384,
    0x96F0: 0x5F79,
    0x96F1: 0x7D04,
    0x96F2: 0x85AC,
    0x96F3: 0x8A33,
    0x96F4: 0x8E8D,
    0x96F5: 0x9756,
    0x96F6: 0x67F3,
    0x96F7: 0x85AE,
    0x96F8: 0x9453,
    0x96F9: 0x6109,
    0x96FA: 0x6108,
    0x96FB: 0x6CB9,
    0x96FC: 0x7652,
    0x9740: 0x8AED,
    0x9741: 0x8F38,
    0x9742: 0x552F,
    0x9743: 0x4F51,
    0x9744: 0x512A,
    0x9745: 0x52C7,
    0x9746: 0x53CB,
    0x9747: 0x5BA5,
    0x9748: 0x5E7D,
    0x9749: 0x60A0,
    0x974A: 0x6182,
    0x974B: 0x63D6,
    0x974C: 0x6709,
    0x974D: 0x67DA,
    0x974E: 0x6E67,
    0x974F: 0x6D8C,
    0x9750: 0x7336,
    0x9751: 0x7337,
    0x9752: 0x7531,
    0x9753: 0x7950,
    0x9754: 0x88D5,
    0x9755: 0x8A98,
    0x9756: 0x904A,
    0x9757: 0x9091,
    0x9758: 0x90F5,
    0x9759: 0x96C4,
    0x975A: 0x878D,
    0x975B: 0x5915,
    0x975C: 0x4E88,
    0x975D: 0x4F59,
    0x975E: 0x4E0E,
    0x975F: 0x8A89,
    0x9760: 0x8F3F,
    0x9761: 0x9810,
    0x9762: 0x50AD,
    0x9763: 0x5E7C,
    0x9764: 0x5996,
    0x9765: 0x5BB9,
    0x9766: 0x5EB8,
    0x9767: 0x63DA,
    0x9768: 0x63FA,
    0x9769: 0x64C1,
    0x976A: 0x66DC,
    0x976B: 0x694A,
    0x976C: 0x69D8,
    0x976D: 0x6D0B,
    0x976E: 0x6EB6,
    0x976F: 0x7194,
    0x9770: 0x7528,
    0x9771: 0x7AAF,
    0x9772: 0x7F8A,
    0x9773: 0x8000,
    0x9774: 0x8449,
    0x9775: 0x84C9,
    0x9776: 0x8981,
    0x9777: 0x8B21,
    0x9778: 0x8E0A,
    0x9779: 0x9065,
    0x977A: 0x967D,
    0x977B: 0x990A,
    0x977C: 0x617E,
    0x977D: 0x6291,
    0x977E: 0x6B32,
    0x9780: 0x6C83,
    0x9781: 0x6D74,
    0x9782: 0x7FCC,
    0x9783: 0x7FFC,
    0x9784: 0x6DC0,
    0x9785: 0x7F85,
    0x9786: 0x87BA,
    0x9787: 0x88F8,
    0x9788: 0x6765,
    0x9789: 0x83B1,
    0x978A: 0x983C,
    0x978B: 0x96F7,
    0x978C: 0x6D1B,
    0x978D: 0x7D61,
    0x978E: 0x843D,
    0x978F: 0x916A,
    0x9790: 0x4E71,
    0x9791: 0x5375,
    0x9792: 0x5D50,
    0x9793: 0x6B04,
    0x9794: 0x6FEB,
    0x9795: 0x85CD,
    0x9796: 0x862D,
    0x9797: 0x89A7,
    0x9798: 0x5229,
    0x9799: 0x540F,
    0x979A: 0x5C65,
    0x979B: 0x674E,
    0x979C: 0x68A8,
    0x979D: 0x7406,
    0x979E: 0x7483,
    0x979F: 0x75E2,
    0x97A0: 0x88CF,
    0x97A1: 0x88E1,
    0x97A2: 0x91CC,
    0x97A3: 0x96E2,
    0x97A4: 0x9678,
    0x97A5: 0x5F8B,
    0x97A6: 0x7387,
    0x97A7: 0x7ACB,
    0x97A8: 0x844E,
    0x97A9: 0x63A0,
    0x97AA: 0x7565,
    0x97AB: 0x5289,
    0x97AC: 0x6D41,
    0x97AD: 0x6E9C,
    0x97AE: 0x7409,
    0x97AF: 0x7559,
    0x97B0: 0x786B,
    0x97B1: 0x7C92,
    0x97B2: 0x9686,
    0x97B3: 0x7ADC,
    0x97B4: 0x9F8D,
    0x97B5: 0x4FB6,
    0x97B6: 0x616E,
    0x97B7: 0x65C5,
    0x97B8: 0x865C,
    0x97B9: 0x4E86,
    0x97BA: 0x4EAE,
    0x97BB: 0x50DA,
    0x97BC: 0x4E21,
    0x97BD: 0x51CC,
    0x97BE: 0x5BEE,
    0x97BF: 0x6599,
    0x97C0: 0x6881,
    0x97C1: 0x6DBC,
    0x97C2: 0x731F,
    0x97C3: 0x7642,
    0x97C4: 0x77AD,
    0x97C5: 0x7A1C,
    0x97C6: 0x7CE7,
    0x97C7: 0x826F,
    0x97C8: 0x8AD2,
    0x97C9: 0x907C,
    0x97CA: 0x91CF,
    0x97CB: 0x9675,
    0x97CC: 0x9818,
    0x97CD: 0x529B,
    0x97CE: 0x7DD1,
    0x97CF: 0x502B,
    0x97D0: 0x5398,
    0x97D1: 0x6797,
    0x97D2: 0x6DCB,
    0x97D3: 0x71D0,
    0x97D4: 0x7433,
    0x97D5: 0x81E8,
    0x97D6: 0x8F2A,
    0x97D7: 0x96A3,
    0x97D8: 0x9C57,
    0x97D9: 0x9E9F,
    0x97DA: 0x7460,
    0x97DB: 0x5841,
    0x97DC: 0x6D99,
    0x97DD: 0x7D2F,
    0x97DE: 0x985E,
    0x97DF: 0x4EE4,
    0x97E0: 0x4F36,
    0x97E1: 0x4F8B,
    0x97E2: 0x51B7,
    0x97E3: 0x52B1,
    0x97E4: 0x5DBA,
    0x97E5: 0x601C,
    0x97E6: 0x73B2,
    0x97E7: 0x793C,
    0x97E8: 0x82D3,
    0x97E9: 0x9234,
    0x97EA: 0x96B7,
    0x97EB: 0x96F6,
    0x97EC: 0x970A,
    0x97ED: 0x9E97,
    0x97EE: 0x9F62,
    0x97EF: 0x66A6,
    0x97F0: 0x6B74,
    0x97F1: 0x5217,
    0x97F2: 0x52A3,
    0x97F3: 0x70C8,
    0x97F4: 0x88C2,
    0x97F5: 0x5EC9,
    0x97F6: 0x604B,
    0x97F7: 0x6190,
    0x97F8: 0x6F23,
    0x97F9: 0x7149,
    0x97FA: 0x7C3E,
    0x97FB: 0x7DF4,
    0x97FC: 0x806F,
    0x9840: 0x84EE,
    0x9841: 0x9023,
    0x9842: 0x932C,
    0x9843: 0x5442,
    0x9844: 0x9B6F,
    0x9845: 0x6AD3,
    0x9846: 0x7089,
    0x9847: 0x8CC2,
    0x9848: 0x8DEF,
    0x9849: 0x9732,
    0x984A: 0x52B4,
    0x984B: 0x5A41,
    0x984C: 0x5ECA,
    0x984D: 0x5F04,
    0x984E: 0x6717,
    0x984F: 0x697C,
    0x9850: 0x6994,
    0x9851: 0x6D6A,
    0x9852: 0x6F0F,
    0x9853: 0x7262,
    0x9854: 0x72FC,
    0x9855: 0x7BED,
    0x9856: 0x8001,
    0x9857: 0x807E,
    0x9858: 0x874B,
    0x9859: 0x90CE,
    0x985A: 0x516D,
    0x985B: 0x9E93,
    0x985C: 0x7984,
    0x985D: 0x808B,
    0x985E: 0x9332,
    0x985F: 0x8AD6,
    0x9860: 0x502D,
    0x9861: 0x548C,
    0x9862: 0x8A71,
    0x9863: 0x6B6A,
    0x9864: 0x8CC4,
    0x9865: 0x8107,
    0x9866: 0x60D1,
    0x9867: 0x67A0,
    0x9868: 0x9DF2,
    0x9869: 0x4E99,
    0x986A: 0x4E98,
    0x986B: 0x9C10,
    0x986C: 0x8A6B,
    0x986D: 0x85C1,
    0x986E: 0x8568,
    0x986F: 0x6900,
    0x9870: 0x6E7E,
    0x9871: 0x7897,
    0x9872: 0x8155,
    0x989F: 0x5F0C,
    0x98A0: 0x4E10,
    0x98A1: 0x4E15,
    0x98A2: 0x4E2A,
    0x98A3: 0x4E31,
    0x98A4: 0x4E36,
    0x98A5: 0x4E3C,
    0x98A6: 0x4E3F,
    0x98A7: 0x4E42,
    0x98A8: 0x4E56,
    0x98A9: 0x4E58,
    0x98AA: 0x4E82,
    0x98AB: 0x4E85,
    0x98AC: 0x8C6B,
    0x98AD: 0x4E8A,
    0x98AE: 0x8212,
    0x98AF: 0x5F0D,
    0x98B0: 0x4E8E,
    0x98B1: 0x4E9E,
    0x98B2: 0x4E9F,
    0x98B3: 0x4EA0,
    0x98B4: 0x4EA2,
    0x98B5: 0x4EB0,
    0x98B6: 0x4EB3,
    0x98B7: 0x4EB6,
    0x98B8: 0x4ECE,
    0x98B9: 0x4ECD,
    0x98BA: 0x4EC4,
    0x98BB: 0x4EC6,
    0x98BC: 0x4EC2,
    0x98BD: 0x4ED7,
    0x98BE: 0x4EDE,
    0x98BF: 0x4EED,
    0x98C0: 0x4EDF,
    0x98C1: 0x4EF7,
    0x98C2: 0x4F09,
    0x98C3: 0x4F5A,
    0x98C4: 0x4F30,
    0x98C5: 0x4F5B,
    0x98C6: 0x4F5D,
    0x98C7: 0x4F57,
    0x98C8: 0x4F47,
    0x98C9: 0x4F76,
    0x98CA: 0x4F88,
    0x98CB: 0x4F8F,
    0x98CC: 0x4F98,
    0x98CD: 0x4F7B,
    0x98CE: 0x4F69,
    0x98CF: 0x4F70,
    0x98D0: 0x4F91,
    0x98D1: 0x4F6F,
    0x98D2: 0x4F86,
    0x98D3: 0x4F96,
    0x98D4: 0x5118,
    0x98D5: 0x4FD4,
    0x98D6: 0x4FDF,
    0x98D7: 0x4FCE,
    0x98D8: 0x4FD8,
    0x98D9: 0x4FDB,
    0x98DA: 0x4FD1,
    0x98DB: 0x4FDA,
    0x98DC: 0x4FD0,
    0x98DD: 0x4FE4,
    0x98DE: 0x4FE5,
    0x98DF: 0x501A,
    0x98E0: 0x5028,
    0x98E1: 0x5014,
    0x98E2: 0x502A,
    0x98E3: 0x5025,
    0x98E4: 0x5005,
    0x98E5: 0x4F1C,
    0x98E6: 0x4FF6,
    0x98E7: 0x5021,
    0x98E8: 0x5029,
    0x98E9: 0x502C,
    0x98EA: 0x4FFE,
    0x98EB: 0x4FEF,
    0x98EC: 0x5011,
    0x98ED: 0x5006,
    0x98EE: 0x5043,
    0x98EF: 0x5047,
    0x98F0: 0x6703,
    0x98F1: 0x5055,
    0x98F2: 0x5050,
    0x98F3: 0x5048,
    0x98F4: 0x505A,
    0x98F5: 0x5056,
    0x98F6: 0x506C,
    0x98F7: 0x5078,
    0x98F8: 0x5080,
    0x98F9: 0x509A,
    0x98FA: 0x5085,
    0x98FB: 0x50B4,
    0x98FC: 0x50B2,
    0x9940: 0x50C9,
    0x9941: 0x50CA,
    0x9942: 0x50B3,
    0x9943: 0x50C2,
    0x9944: 0x50D6,
    0x9945: 0x50DE,
    0x9946: 0x50E5,
    0x9947: 0x50ED,
    0x9948: 0x50E3,
    0x9949: 0x50EE,
    0x994A: 0x50F9,
    0x994B: 0x50F5,
    0x994C: 0x5109,
    0x994D: 0x5101,
    0x994E: 0x5102,
    0x994F: 0x5116,
    0x9950: 0x5115,
    0x9951: 0x5114,
    0x9952: 0x511A,
    0x9953: 0x5121,
    0x9954: 0x513A,
    0x9955: 0x5137,
    0x9956: 0x513C,
    0x9957: 0x513B,
    0x9958: 0x513F,
    0x9959: 0x5140,
    0x995A: 0x5152,
    0x995B: 0x514C,
    0x995C: 0x5154,
    0x995D: 0x5162,
    0x995E: 0x7AF8,
    0x995F: 0x5169,
    0x9960: 0x516A,
    0x9961: 0x516E,
    0x9962: 0x5180,
    0x9963: 0x5182,
    0x9964: 0x56D8,
    0x9965: 0x518C,
    0x9966: 0x5189,
    0x9967: 0x518F,
    0x9968: 0x5191,
    0x9969: 0x5193,
    0x996A: 0x5195,
    0x996B: 0x5196,
    0x996C: 0x51A4,
    0x996D: 0x51A6,
    0x996E: 0x51A2,
    0x996F: 0x51A9,
    0x9970: 0x51AA,
    0x9971: 0x51AB,
    0x9972: 0x51B3,
    0x9973: 0x51B1,
    0x9974: 0x51B2,
    0x9975: 0x51B0,
    0x9976: 0x51B5,
    0x9977: 0x51BD,
    0x9978: 0x51C5,
    0x9979: 0x51C9,
    0x997A: 0x51DB,
    0x997B: 0x51E0,
    0x997C: 0x8655,
    0x997D: 0x51E9,
    0x997E: 0x51ED,
    0x9980: 0x51F0,
    0x9981: 0x51F5,
    0x9982: 0x51FE,
    0x9983: 0x5204,
    0x9984: 0x520B,
    0x9985: 0x5214,
    0x9986: 0x520E,
    0x9987: 0x5227,
    0x9988: 0x522A,
    0x9989: 0x522E,
    0x998A: 0x5233,
    0x998B: 0x5239,
    0x998C: 0x524F,
    0x998D: 0x5244,
    0x998E: 0x524B,
    0x998F: 0x524C,
    0x9990: 0x525E,
    0x9991: 0x5254,
    0x9992: 0x526A,
    0x9993: 0x5274,
    0x9994: 0x5269,
    0x9995: 0x5273,
    0x9996: 0x527F,
    0x9997: 0x527D,
    0x9998: 0x528D,
    0x9999: 0x5294,
    0x999A: 0x5292,
    0x999B: 0x5271,
    0x999C: 0x5288,
    0x999D: 0x5291,
    0x999E: 0x8FA8,
    0x999F: 0x8FA7,
    0x99A0: 0x52AC,
    0x99A1: 0x52AD,
    0x99A2: 0x52BC,
    0x99A3: 0x52B5,
    0x99A4: 0x52C1,
    0x99A5: 0x52CD,
    0x99A6: 0x52D7,
    0x99A7: 0x52DE,
    0x99A8: 0x52E3,
    0x99A9: 0x52E6,
    0x99AA: 0x98ED,
    0x99AB: 0x52E0,
    0x99AC: 0x52F3,
    0x99AD: 0x52F5,
    0x99AE: 0x52F8,
    0x99AF: 0x52F9,
    0x99B0: 0x5306,
    0x99B1: 0x5308,
    0x99B2: 0x7538,
    0x99B3: 0x530D,
    0x99B4: 0x5310,
    0x99B5: 0x530F,
    0x99B6: 0x5315,
    0x99B7: 0x531A,
    0x99B8: 0x5323,
    0x99B9: 0x532F,
    0x99BA: 0x5331,
    0x99BB: 0x5333,
    0x99BC: 0x5338,
    0x99BD: 0x5340,
    0x99BE: 0x5346,
    0x99BF: 0x5345,
    0x99C0: 0x4E17,
    0x99C1: 0x5349,
    0x99C2: 0x534D,
    0x99C3: 0x51D6,
    0x99C4: 0x535E,
    0x99C5: 0x5369,
    0x99C6: 0x536E,
    0x99C7: 0x5918,
    0x99C8: 0x537B,
    0x99C9: 0x5377,
    0x99CA: 0x5382,
    0x99CB: 0x5396,
    0x99CC: 0x53A0,
    0x99CD: 0x53A6,
    0x99CE: 0x53A5,
    0x99CF: 0x53AE,
    0x99D0: 0x53B0,
    0x99D1: 0x53B6,
    0x99D2: 0x53C3,
    0x99D3: 0x7C12,
    0x99D4: 0x96D9,
    0x99D5: 0x53DF,
    0x99D6: 0x66FC,
    0x99D7: 0x71EE,
    0x99D8: 0x53EE,
    0x99D9: 0x53E8,
    0x99DA: 0x53ED,
    0x99DB: 0x53FA,
    0x99DC: 0x5401,
    0x99DD: 0x543D,
    0x99DE: 0x5440,
    0x99DF: 0x542C,
    0x99E0: 0x542D,
    0x99E1: 0x543C,
    0x99E2: 0x542E,
    0x99E3: 0x5436,
    0x99E4: 0x5429,
    0x99E5: 0x541D,
    0x99E6: 0x544E,
    0x99E7: 0x548F,
    0x99E8: 0x5475,
    0x99E9: 0x548E,
    0x99EA: 0x545F,
    0x99EB: 0x5471,
    0x99EC: 0x5477,
    0x99ED: 0x5470,
    0x99EE: 0x5492,
    0x99EF: 0x547B,
    0x99F0: 0x5480,
    0x99F1: 0x5476,
    0x99F2: 0x5484,
    0x99F3: 0x5490,
    0x99F4: 0x5486,
    0x99F5: 0x54C7,
    0x99F6: 0x54A2,
    0x99F7: 0x54B8,
    0x99F8: 0x54A5,
    0x99F9: 0x54AC,
    0x99FA: 0x54C4,
    0x99FB: 0x54C8,
    0x99FC: 0x54A8,
    0x9A40: 0x54AB,
    0x9A41: 0x54C2,
    0x9A42: 0x54A4,
    0x9A43: 0x54BE,
    0x9A44: 0x54BC,
    0x9A45: 0x54D8,
    0x9A46: 0x54E5,
    0x9A47: 0x54E6,
    0x9A48: 0x550F,
    0x9A49: 0x5514,
    0x9A4A: 0x54FD,
    0x9A4B: 0x54EE,
    0x9A4C: 0x54ED,
    0x9A4D: 0x54FA,
    0x9A4E: 0x54E2,
    0x9A4F: 0x5539,
    0x9A50: 0x5540,
    0x9A51: 0x5563,
    0x9A52: 0x554C,
    0x9A53: 0x552E,
    0x9A54: 0x555C,
    0x9A55: 0x5545,
    0x9A56: 0x5556,
    0x9A57: 0x5557,
    0x9A58: 0x5538,
    0x9A59: 0x5533,
    0x9A5A: 0x555D,
    0x9A5B: 0x5599,
    0x9A5C: 0x5580,
    0x9A5D: 0x54AF,
    0x9A5E: 0x558A,
    0x9A5F: 0x559F,
    0x9A60: 0x557B,
    0x9A61: 0x557E,
    0x9A62: 0x5598,
    0x9A63: 0x559E,
    0x9A64: 0x55AE,
    0x9A65: 0x557C,
    0x9A66: 0x5583,
    0x9A67: 0x55A9,
    0x9A68: 0x5587,
    0x9A69: 0x55A8,
    0x9A6A: 0x55DA,
    0x9A6B: 0x55C5,
    0x9A6C: 0x55DF,
    0x9A6D: 0x55C4,
    0x9A6E: 0x55DC,
    0x9A6F: 0x55E4,
    0x9A70: 0x55D4,
    0x9A71: 0x5614,
    0x9A72: 0x55F7,
    0x9A73: 0x5616,
    0x9A74: 0x55FE,
    0x9A75: 0x55FD,
    0x9A76: 0x561B,
    0x9A77: 0x55F9,
    0x9A78: 0x564E,
    0x9A79: 0x5650,
    0x9A7A: 0x71DF,
    0x9A7B: 0x5634,
    0x9A7C: 0x5636,
    0x9A7D: 0x5632,
    0x9A7E: 0x5638,
    0x9A80: 0x566B,
    0x9A81: 0x5664,
    0x9A82: 0x562F,
    0x9A83: 0x566C,
    0x9A84: 0x566A,
    0x9A85: 0x5686,
    0x9A86: 0x5680,
    0x9A87: 0x568A,
    0x9A88: 0x56A0,
    0x9A89: 0x5694,
    0x9A8A: 0x568F,
    0x9A8B: 0x56A5,
    0x9A8C: 0x56AE,
    0x9A8D: 0x56B6,
    0x9A8E: 0x56B4,
    0x9A8F: 0x56C2,
    0x9A90: 0x56BC,
    0x9A91: 0x56C1,
    0x9A92: 0x56C3,
    0x9A93: 0x56C0,
    0x9A94: 0x56C8,
    0x9A95: 0x56CE,
    0x9A96: 0x56D1,
    0x9A97: 0x56D3,
    0x9A98: 0x56D7,
    0x9A99: 0x56EE,
    0x9A9A: 0x56F9,
    0x9A9B: 0x5700,
    0x9A9C: 0x56FF,
    0x9A9D: 0x5704,
    0x9A9E: 0x5709,
    0x9A9F: 0x5708,
    0x9AA0: 0x570B,
    0x9AA1: 0x570D,
    0x9AA2: 0x5713,
    0x9AA3: 0x5718,
    0x9AA4: 0x5716,
    0x9AA5: 0x55C7,
    0x9AA6: 0x571C,
    0x9AA7: 0x5726,
    0x9AA8: 0x5737,
    0x9AA9: 0x5738,
    0x9AAA: 0x574E,
    0x9AAB: 0x573B,
    0x9AAC: 0x5740,
    0x9AAD: 0x574F,
    0x9AAE: 0x5769,
    0x9AAF: 0x57C0,
    0x9AB0: 0x5788,
    0x9AB1: 0x5761,
    0x9AB2: 0x577F,
    0x9AB3: 0x5789,
    0x9AB4: 0x5793,
    0x9AB5: 0x57A0,
    0x9AB6: 0x57B3,
    0x9AB7: 0x57A4,
    0x9AB8: 0x57AA,
    0x9AB9: 0x57B0,
    0x9ABA: 0x57C3,
    0x9ABB: 0x57C6,
    0x9ABC: 0x57D4,
    0x9ABD: 0x57D2,
    0x9ABE: 0x57D3,
    0x9ABF: 0x580A,
    0x9AC0: 0x57D6,
    0x9AC1: 0x57E3,
    0x9AC2: 0x580B,
    0x9AC3: 0x5819,
    0x9AC4: 0x581D,
    0x9AC5: 0x5872,
    0x9AC6: 0x5821,
    0x9AC7: 0x5862,
    0x9AC8: 0x584B,
    0x9AC9: 0x5870,
    0x9ACA: 0x6BC0,
    0x9ACB: 0x5852,
    0x9ACC: 0x583D,
    0x9ACD: 0x5879,
    0x9ACE: 0x5885,
    0x9ACF: 0x58B9,
    0x9AD0: 0x589F,
    0x9AD1: 0x58AB,
    0x9AD2: 0x58BA,
    0x9AD3: 0x58DE,
    0x9AD4: 0x58BB,
    0x9AD5: 0x58B8,
    0x9AD6: 0x58AE,
    0x9AD7: 0x58C5,
    0x9AD8: 0x58D3,
    0x9AD9: 0x58D1,
    0x9ADA: 0x58D7,
    0x9ADB: 0x58D9,
    0x9ADC: 0x58D8,
    0x9ADD: 0x58E5,
    0x9ADE: 0x58DC,
    0x9ADF: 0x58E4,
    0x9AE0: 0x58DF,
    0x9AE1: 0x58EF,
    0x9AE2: 0x58FA,
    0x9AE3: 0x58F9,
    0x9AE4: 0x58FB,
    0x9AE5: 0x58FC,
    0x9AE6: 0x58FD,
    0x9AE7: 0x5902,
    0x9AE8: 0x590A,
    0x9AE9: 0x5910,
    0x9AEA: 0x591B,
    0x9AEB: 0x68A6,
    0x9AEC: 0x5925,
    0x9AED: 0x592C,
    0x9AEE: 0x592D,
    0x9AEF: 0x5932,
    0x9AF0: 0x5938,
    0x9AF1: 0x593E,
    0x9AF2: 0x7AD2,
    0x9AF3: 0x5955,
    0x9AF4: 0x5950,
    0x9AF5: 0x594E,
    0x9AF6: 0x595A,
    0x9AF7: 0x5958,
    0x9AF8: 0x5962,
    0x9AF9: 0x5960,
    0x9AFA: 0x5967,
    0x9AFB: 0x596C,
    0x9AFC: 0x5969,
    0x9B40: 0x5978,
    0x9B41: 0x5981,
    0x9B42: 0x599D,
    0x9B43: 0x4F5E,
    0x9B44: 0x4FAB,
    0x9B45: 0x59A3,
    0x9B46: 0x59B2,
    0x9B47: 0x59C6,
    0x9B48: 0x59E8,
    0x9B49: 0x59DC,
    0x9B4A: 0x598D,
    0x9B4B: 0x59D9,
    0x9B4C: 0x59DA,
    0x9B4D: 0x5A25,
    0x9B4E: 0x5A1F,
    0x9B4F: 0x5A11,
    0x9B50: 0x5A1C,
    0x9B51: 0x5A09,
    0x9B52: 0x5A1A,
    0x9B53: 0x5A40,
    0x9B54: 0x5A6C,
    0x9B55: 0x5A49,
    0x9B56: 0x5A35,
    0x9B57: 0x5A36,
    0x9B58: 0x5A62,
    0x9B59: 0x5A6A,
    0x9B5A: 0x5A9A,
    0x9B5B: 0x5ABC,
    0x9B5C: 0x5ABE,
    0x9B5D: 0x5ACB,
    0x9B5E: 0x5AC2,
    0x9B5F: 0x5ABD,
    0x9B60: 0x5AE3,
    0x9B61: 0x5AD7,
    0x9B62: 0x5AE6,
    0x9B63: 0x5AE9,
    0x9B64: 0x5AD6,
    0x9B65: 0x5AFA,
    0x9B66: 0x5AFB,
    0x9B67: 0x5B0C,
    0x9B68: 0x5B0B,
    0x9B69: 0x5B16,
    0x9B6A: 0x5B32,
    0x9B6B: 0x5AD0,
    0x9B6C: 0x5B2A,
    0x9B6D: 0x5B36,
    0x9B6E: 0x5B3E,
    0x9B6F: 0x5B43,
    0x9B70: 0x5B45,
    0x9B71: 0x5B40,
    0x9B72: 0x5B51,
    0x9B73: 0x5B55,
    0x9B74: 0x5B5A,
    0x9B75: 0x5B5B,
    0x9B76: 0x5B65,
    0x9B77: 0x5B69,
    0x9B78: 0x5B70,
    0x9B79: 0x5B73,
    0x9B7A: 0x5B75,
    0x9B7B: 0x5B78,
    0x9B7C: 0x6588,
    0x9B7D: 0x5B7A,
    0x9B7E: 0x5B80,
    0x9B80: 0x5B83,
    0x9B81: 0x5BA6,
    0x9B82: 0x5BB8,
    0x9B83: 0x5BC3,
    0x9B84: 0x5BC7,
    0x9B85: 0x5BC9,
    0x9B86: 0x5BD4,
    0x9B87: 0x5BD0,
    0x9B88: 0x5BE4,
    0x9B89: 0x5BE6,
    0x9B8A: 0x5BE2,
    0x9B8B: 0x5BDE,
    0x9B8C: 0x5BE5,
    0x9B8D: 0x5BEB,
    0x9B8E: 0x5BF0,
    0x9B8F: 0x5BF6,
    0x9B90: 0x5BF3,
    0x9B91: 0x5C05,
    0x9B92: 0x5C07,
    0x9B93: 0x5C08,
    0x9B94: 0x5C0D,
    0x9B95: 0x5C13,
    0x9B96: 0x5C20,
    0x9B97: 0x5C22,
    0x9B98: 0x5C28,
    0x9B99: 0x5C38,
    0x9B9A: 0x5C39,
    0x9B9B: 0x5C41,
    0x9B9C: 0x5C46,
    0x9B9D: 0x5C4E,
    0x9B9E: 0x5C53,
    0x9B9F: 0x5C50,
    0x9BA0: 0x5C4F,
    0x9BA1: 0x5B71,
    0x9BA2: 0x5C6C,
    0x9BA3: 0x5C6E,
    0x9BA4: 0x4E62,
    0x9BA5: 0x5C76,
    0x9BA6: 0x5C79,
    0x9BA7: 0x5C8C,
    0x9BA8: 0x5C91,
    0x9BA9: 0x5C94,
    0x9BAA: 0x599B,
    0x9BAB: 0x5CAB,
    0x9BAC: 0x5CBB,
    0x9BAD: 0x5CB6,
    0x9BAE: 0x5CBC,
    0x9BAF: 0x5CB7,
    0x9BB0: 0x5CC5,
    0x9BB1: 0x5CBE,
    0x9BB2: 0x5CC7,
    0x9BB3: 0x5CD9,
    0x9BB4: 0x5CE9,
    0x9BB5: 0x5CFD,
    0x9BB6: 0x5CFA,
    0x9BB7: 0x5CED,
    0x9BB8: 0x5D8C,
    0x9BB9: 0x5CEA,
    0x9BBA: 0x5D0B,
    0x9BBB: 0x5D15,
    0x9BBC: 0x5D17,
    0x9BBD: 0x5D5C,
    0x9BBE: 0x5D1F,
    0x9BBF: 0x5D1B,
    0x9BC0: 0x5D11,
    0x9BC1: 0x5D14,
    0x9BC2: 0x5D22,
    0x9BC3: 0x5D1A,
    0x9BC4: 0x5D19,
    0x9BC5: 0x5D18,
    0x9BC6: 0x5D4C,
    0x9BC7: 0x5D52,
    0x9BC8: 0x5D4E,
    0x9BC9: 0x5D4B,
    0x9BCA: 0x5D6C,
    0x9BCB: 0x5D73,
    0x9BCC: 0x5D76,
    0x9BCD: 0x5D87,
    0x9BCE: 0x5D84,
    0x9BCF: 0x5D82,
    0x9BD0: 0x5DA2,
    0x9BD1: 0x5D9D,
    0x9BD2: 0x5DAC,
    0x9BD3: 0x5DAE,
    0x9BD4: 0x5DBD,
    0x9BD5: 0x5D90,
    0x9BD6: 0x5DB7,
    0x9BD7: 0x5DBC,
    0x9BD8: 0x5DC9,
    0x9BD9: 0x5DCD,
    0x9BDA: 0x5DD3,
    0x9BDB: 0x5DD2,
    0x9BDC: 0x5DD6,
    0x9BDD: 0x5DDB,
    0x9BDE: 0x5DEB,
    0x9BDF: 0x5DF2,
    0x9BE0: 0x5DF5,
    0x9BE1: 0x5E0B,
    0x9BE2: 0x5E1A,
    0x9BE3: 0x5E19,
    0x9BE4: 0x5E11,
    0x9BE5: 0x5E1B,
    0x9BE6: 0x5E36,
    0x9BE7: 0x5E37,
    0x9BE8: 0x5E44,
    0x9BE9: 0x5E43,
    0x9BEA: 0x5E40,
    0x9BEB: 0x5E4E,
    0x9BEC: 0x5E57,
    0x9BED: 0x5E54,
    0x9BEE: 0x5E5F,
    0x9BEF: 0x5E62,
    0x9BF0: 0x5E64,
    0x9BF1: 0x5E47,
    0x9BF2: 0x5E75,
    0x9BF3: 0x5E76,
    0x9BF4: 0x5E7A,
    0x9BF5: 0x9EBC,
    0x9BF6: 0x5E7F,
    0x9BF7: 0x5EA0,
    0x9BF8: 0x5EC1,
    0x9BF9: 0x5EC2,
    0x9BFA: 0x5EC8,
    0x9BFB: 0x5ED0,
    0x9BFC: 0x5ECF,
    0x9C40: 0x5ED6,
    0x9C41: 0x5EE3,
    0x9C42: 0x5EDD,
    0x9C43: 0x5EDA,
    0x9C44: 0x5EDB,
    0x9C45: 0x5EE2,
    0x9C46: 0x5EE1,
    0x9C47: 0x5EE8,
    0x9C48: 0x5EE9,
    0x9C49: 0x5EEC,
    0x9C4A: 0x5EF1,
    0x9C4B: 0x5EF3,
    0x9C4C: 0x5EF0,
    0x9C4D: 0x5EF4,
    0x9C4E: 0x5EF8,
    0x9C4F: 0x5EFE,
    0x9C50: 0x5F03,
    0x9C51: 0x5F09,
    0x9C52: 0x5F5D,
    0x9C53: 0x5F5C,
    0x9C54: 0x5F0B,
    0x9C55: 0x5F11,
    0x9C56: 0x5F16,
    0x9C57: 0x5F29,
    0x9C58: 0x5F2D,
    0x9C59: 0x5F38,
    0x9C5A: 0x5F41,
    0x9C5B: 0x5F48,
    0x9C5C: 0x5F4C,
    0x9C5D: 0x5F4E,
    0x9C5E: 0x5F2F,
    0x9C5F: 0x5F51,
    0x9C60: 0x5F56,
    0x9C61: 0x5F57,
    0x9C62: 0x5F59,
    0x9C63: 0x5F61,
    0x9C64: 0x5F6D,
    0x9C65: 0x5F73,
    0x9C66: 0x5F77,
    0x9C67: 0x5F83,
    0x9C68: 0x5F82,
    0x9C69: 0x5F7F,
    0x9C6A: 0x5F8A,
    0x9C6B: 0x5F88,
    0x9C6C: 0x5F91,
    0x9C6D: 0x5F87,
    0x9C6E: 0x5F9E,
    0x9C6F: 0x5F99,
    0x9C70: 0x5F98,
    0x9C71: 0x5FA0,
    0x9C72: 0x5FA8,
    0x9C73: 0x5FAD,
    0x9C74: 0x5FBC,
    0x9C75: 0x5FD6,
    0x9C76: 0x5FFB,
    0x9C77: 0x5FE4,
    0x9C78: 0x5FF8,
    0x9C79: 0x5FF1,
    0x9C7A: 0x5FDD,
    0x9C7B: 0x60B3,
    0x9C7C: 0x5FFF,
    0x9C7D: 0x6021,
    0x9C7E: 0x6060,
    0x9C80: 0x6019,
    0x9C81: 0x6010,
    0x9C82: 0x6029,
    0x9C83: 0x600E,
    0x9C84: 0x6031,
    0x9C85: 0x601B,
    0x9C86: 0x6015,
    0x9C87: 0x602B,
    0x9C88: 0x6026,
    0x9C89: 0x600F,
    0x9C8A: 0x603A,
    0x9C8B: 0x605A,
    0x9C8C: 0x6041,
    0x9C8D: 0x606A,
    0x9C8E: 0x6077,
    0x9C8F: 0x605F,
    0x9C90: 0x604A,
    0x9C91: 0x6046,
    0x9C92: 0x604D,
    0x9C93: 0x6063,
    0x9C94: 0x6043,
    0x9C95: 0x6064,
    0x9C96: 0x6042,
    0x9C97: 0x606C,
    0x9C98: 0x606B,
    0x9C99: 0x6059,
    0x9C9A: 0x6081,
    0x9C9B: 0x608D,
    0x9C9C: 0x60E7,
    0x9C9D: 0x6083,
    0x9C9E: 0x609A,
    0x9C9F: 0x6084,
    0x9CA0: 0x609B,
    0x9CA1: 0x6096,
    0x9CA2: 0x6097,
    0x9CA3: 0x6092,
    0x9CA4: 0x60A7,
    0x9CA5: 0x608B,
    0x9CA6: 0x60E1,
    0x9CA7: 0x60B8,
    0x9CA8: 0x60E0,
    0x9CA9: 0x60D3,
    0x9CAA: 0x60B4,
    0x9CAB: 0x5FF0,
    0x9CAC: 0x60BD,
    0x9CAD: 0x60C6,
    0x9CAE: 0x60B5,
    0x9CAF: 0x60D8,
    0x9CB0: 0x614D,
    0x9CB1: 0x6115,
    0x9CB2: 0x6106,
    0x9CB3: 0x60F6,
    0x9CB4: 0x60F7,
    0x9CB5: 0x6100,
    0x9CB6: 0x60F4,
    0x9CB7: 0x60FA,
    0x9CB8: 0x6103,
    0x9CB9: 0x6121,
    0x9CBA: 0x60FB,
    0x9CBB: 0x60F1,
    0x9CBC: 0x610D,
    0x9CBD: 0x610E,
    0x9CBE: 0x6147,
    0x9CBF: 0x613E,
    0x9CC0: 0x6128,
    0x9CC1: 0x6127,
    0x9CC2: 0x614A,
    0x9CC3: 0x613F,
    0x9CC4: 0x613C,
    0x9CC5: 0x612C,
    0x9CC6: 0x6134,
    0x9CC7: 0x613D,
    0x9CC8: 0x6142,
    0x9CC9: 0x6144,
    0x9CCA: 0x6173,
    0x9CCB: 0x6177,
    0x9CCC: 0x6158,
    0x9CCD: 0x6159,
    0x9CCE: 0x615A,
    0x9CCF: 0x616B,
    0x9CD0: 0x6174,
    0x9CD1: 0x616F,
    0x9CD2: 0x6165,
    0x9CD3: 0x6171,
    0x9CD4: 0x615F,
    0x9CD5: 0x615D,
    0x9CD6: 0x6153,
    0x9CD7: 0x6175,
    0x9CD8: 0x6199,
    0x9CD9: 0x6196,
    0x9CDA: 0x6187,
    0x9CDB: 0x61AC,
    0x9CDC: 0x6194,
    0x9CDD: 0x619A,
    0x9CDE: 0x618A,
    0x9CDF: 0x6191,
    0x9CE0: 0x61AB,
    0x9CE1: 0x61AE,
    0x9CE2: 0x61CC,
    0x9CE3: 0x61CA,
    0x9CE4: 0x61C9,
    0x9CE5: 0x61F7,
    0x9CE6: 0x61C8,
    0x9CE7: 0x61C3,
    0x9CE8: 0x61C6,
    0x9CE9: 0x61BA,
    0x9CEA: 0x61CB,
    0x9CEB: 0x7F79,
    0x9CEC: 0x61CD,
    0x9CED: 0x61E6,
    0x9CEE: 0x61E3,
    0x9CEF: 0x61F6,
    0x9CF0: 0x61FA,
    0x9CF1: 0x61F4,
    0x9CF2: 0x61FF,
    0x9CF3: 0x61FD,
    0x9CF4: 0x61FC,
    0x9CF5: 0x61FE,
    0x9CF6: 0x6200,
    0x9CF7: 0x6208,
    0x9CF8: 0x6209,
    0x9CF9: 0x620D,
    0x9CFA: 0x620C,
    0x9CFB: 0x6214,
    0x9CFC: 0x621B,
    0x9D40: 0x621E,
    0x9D41: 0x6221,
    0x9D42: 0x622A,
    0x9D43: 0x622E,
    0x9D44: 0x6230,
    0x9D45: 0x6232,
    0x9D46: 0x6233,
    0x9D47: 0x6241,
    0x9D48: 0x624E,
    0x9D49: 0x625E,
    0x9D4A: 0x6263,
    0x9D4B: 0x625B,
    0x9D4C: 0x6260,
    0x9D4D: 0x6268,
    0x9D4E: 0x627C,
    0x9D4F: 0x6282,
    0x9D50: 0x6289,
    0x9D51: 0x627E,
    0x9D52: 0x6292,
    0x9D53: 0x6293,
    0x9D54: 0x6296,
    0x9D55: 0x62D4,
    0x9D56: 0x6283,
    0x9D57: 0x6294,
    0x9D58: 0x62D7,
    0x9D59: 0x62D1,
    0x9D5A: 0x62BB,
    0x9D5B: 0x62CF,
    0x9D5C: 0x62FF,
    0x9D5D: 0x62C6,
    0x9D5E: 0x64D4,
    0x9D5F: 0x62C8,
    0x9D60: 0x62DC,
    0x9D61: 0x62CC,
    0x9D62: 0x62CA,
    0x9D63: 0x62C2,
    0x9D64: 0x62C7,
    0x9D65: 0x629B,
    0x9D66: 0x62C9,
    0x9D67: 0x630C,
    0x9D68: 0x62EE,
    0x9D69: 0x62F1,
    0x9D6A: 0x6327,
    0x9D6B: 0x6302,
    0x9D6C: 0x6308,
    0x9D6D: 0x62EF,
    0x9D6E: 0x62F5,
    0x9D6F: 0x6350,
    0x9D70: 0x633E,
    0x9D71: 0x634D,
    0x9D72: 0x641C,
    0x9D73: 0x634F,
    0x9D74: 0x6396,
    0x9D75: 0x638E,
    0x9D76: 0x6380,
    0x9D77: 0x63AB,
    0x9D78: 0x6376,
    0x9D79: 0x63A3,
    0x9D7A: 0x638F,
    0x9D7B: 0x6389,
    0x9D7C: 0x639F,
    0x9D7D: 0x63B5,
    0x9D7E: 0x636B,
    0x9D80: 0x6369,
    0x9D81: 0x63BE,
    0x9D82: 0x63E9,
    0x9D83: 0x63C0,
    0x9D84: 0x63C6,
    0x9D85: 0x63E3,
    0x9D86: 0x63C9,
    0x9D87: 0x63D2,
    0x9D88: 0x63F6,
    0x9D89: 0x63C4,
    0x9D8A: 0x6416,
    0x9D8B: 0x6434,
    0x9D8C: 0x6406,
    0x9D8D: 0x6413,
    0x9D8E: 0x6426,
    0x9D8F: 0x6436,
    0x9D90: 0x651D,
    0x9D91: 0x6417,
    0x9D92: 0x6428,
    0x9D93: 0x640F,
    0x9D94: 0x6467,
    0x9D95: 0x646F,
    0x9D96: 0x6476,
    0x9D97: 0x644E,
    0x9D98: 0x652A,
    0x9D99: 0x6495,
    0x9D9A: 0x6493,
    0x9D9B: 0x64A5,
    0x9D9C: 0x64A9,
    0x9D9D: 0x6488,
    0x9D9E: 0x64BC,
    0x9D9F: 0x64DA,
    0x9DA0: 0x64D2,
    0x9DA1: 0x64C5,
    0x9DA2: 0x64C7,
    0x9DA3: 0x64BB,
    0x9DA4: 0x64D8,
    0x9DA5: 0x64C2,
    0x9DA6: 0x64F1,
    0x9DA7: 0x64E7,
    0x9DA8: 0x8209,
    0x9DA9: 0x64E0,
    0x9DAA: 0x64E1,
    0x9DAB: 0x62AC,
    0x9DAC: 0x64E3,
    0x9DAD: 0x64EF,
    0x9DAE: 0x652C,
    0x9DAF: 0x64F6,
    0x9DB0: 0x64F4,
    0x9DB1: 0x64F2,
    0x9DB2: 0x64FA,
    0x9DB3: 0x6500,
    0x9DB4: 0x64FD,
    0x9DB5: 0x6518,
    0x9DB6: 0x651C,
    0x9DB7: 0x6505,
    0x9DB8: 0x6524,
    0x9DB9: 0x6523,
    0x9DBA: 0x652B,
    0x9DBB: 0x6534,
    0x9DBC: 0x6535,
    0x9DBD: 0x6537,
    0x9DBE: 0x6536,
    0x9DBF: 0x6538,
    0x9DC0: 0x754B,
    0x9DC1: 0x6548,
    0x9DC2: 0x6556,
    0x9DC3: 0x6555,
    0x9DC4: 0x654D,
    0x9DC5: 0x6558,
    0x9DC6: 0x655E,
    0x9DC7: 0x655D,
    0x9DC8: 0x6572,
    0x9DC9: 0x6578,
    0x9DCA: 0x6582,
    0x9DCB: 0x6583,
    0x9DCC: 0x8B8A,
    0x9DCD: 0x659B,
    0x9DCE: 0x659F,
    0x9DCF: 0x65AB,
    0x9DD0: 0x65B7,
    0x9DD1: 0x65C3,
    0x9DD2: 0x65C6,
    0x9DD3: 0x65C1,
    0x9DD4: 0x65C4,
    0x9DD5: 0x65CC,
    0x9DD6: 0x65D2,
    0x9DD7: 0x65DB,
    0x9DD8: 0x65D9,
    0x9DD9: 0x65E0,
    0x9DDA: 0x65E1,
    0x9DDB: 0x65F1,
    0x9DDC: 0x6772,
    0x9DDD: 0x660A,
    0x9DDE: 0x6603,
    0x9DDF: 0x65FB,
    0x9DE0: 0x6773,
    0x9DE1: 0x6635,
    0x9DE2: 0x6636,
    0x9DE3: 0x6634,
    0x9DE4: 0x661C,
    0x9DE5: 0x664F,
    0x9DE6: 0x6644,
    0x9DE7: 0x6649,
    0x9DE8: 0x6641,
    0x9DE9: 0x665E,
    0x9DEA: 0x665D,
    0x9DEB: 0x6664,
    0x9DEC: 0x6667,
    0x9DED: 0x6668,
    0x9DEE: 0x665F,
    0x9DEF: 0x6662,
    0x9DF0: 0x6670,
    0x9DF1: 0x6683,
    0x9DF2: 0x6688,
    0x9DF3: 0x668E,
    0x9DF4: 0x6689,
    0x9DF5: 0x6684,
    0x9DF6: 0x6698,
    0x9DF7: 0x669D,
    0x9DF8: 0x66C1,
    0x9DF9: 0x66B9,
    0x9DFA: 0x66C9,
    0x9DFB: 0x66BE,
    0x9DFC: 0x66BC,
    0x9E40: 0x66C4,
    0x9E41: 0x66B8,
    0x9E42: 0x66D6,
    0x9E43: 0x66DA,
    0x9E44: 0x66E0,
    0x9E45: 0x663F,
    0x9E46: 0x66E6,
    0x9E47: 0x66E9,
    0x9E48: 0x66F0,
    0x9E49: 0x66F5,
    0x9E4A: 0x66F7,
    0x9E4B: 0x670F,
    0x9E4C: 0x6716,
    0x9E4D: 0x671E,
    0x9E4E: 0x6726,
    0x9E4F: 0x6727,
    0x9E50: 0x9738,
    0x9E51: 0x672E,
    0x9E52: 0x673F,
    0x9E53: 0x6736,
    0x9E54: 0x6741,
    0x9E55: 0x6738,
    0x9E56: 0x6737,
    0x9E57: 0x6746,
    0x9E58: 0x675E,
    0x9E59: 0x6760,
    0x9E5A: 0x6759,
    0x9E5B: 0x6763,
    0x9E5C: 0x6764,
    0x9E5D: 0x6789,
    0x9E5E: 0x6770,
    0x9E5F: 0x67A9,
    0x9E60: 0x677C,
    0x9E61: 0x676A,
    0x9E62: 0x678C,
    0x9E63: 0x678B,
    0x9E64: 0x67A6,
    0x9E65: 0x67A1,
    0x9E66: 0x6785,
    0x9E67: 0x67B7,
    0x9E68: 0x67EF,
    0x9E69: 0x67B4,
    0x9E6A: 0x67EC,
    0x9E6B: 0x67B3,
    0x9E6C: 0x67E9,
    0x9E6D: 0x67B8,
    0x9E6E: 0x67E4,
    0x9E6F: 0x67DE,
    0x9E70: 0x67DD,
    0x9E71: 0x67E2,
    0x9E72: 0x67EE,
    0x9E73: 0x67B9,
    0x9E74: 0x67CE,
    0x9E75: 0x67C6,
    0x9E76: 0x67E7,
    0x9E77: 0x6A9C,
    0x9E78: 0x681E,
    0x9E79: 0x6846,
    0x9E7A: 0x6829,
    0x9E7B: 0x6840,
    0x9E7C: 0x684D,
    0x9E7D: 0x6832,
    0x9E7E: 0x684E,
    0x9E80: 0x68B3,
    0x9E81: 0x682B,
    0x9E82: 0x6859,
    0x9E83: 0x6863,
    0x9E84: 0x6877,
    0x9E85: 0x687F,
    0x9E86: 0x689F,
    0x9E87: 0x688F,
    0x9E88: 0x68AD,
    0x9E89: 0x6894,
    0x9E8A: 0x689D,
    0x9E8B: 0x689B,
    0x9E8C: 0x6883,
    0x9E8D: 0x6AAE,
    0x9E8E: 0x68B9,
    0x9E8F: 0x6874,
    0x9E90: 0x68B5,
    0x9E91: 0x68A0,
    0x9E92: 0x68BA,
    0x9E93: 0x690F,
    0x9E94: 0x688D,
    0x9E95: 0x687E,
    0x9E96: 0x6901,
    0x9E97: 0x68CA,
    0x9E98: 0x6908,
    0x9E99: 0x68D8,
    0x9E9A: 0x6922,
    0x9E9B: 0x6926,
    0x9E9C: 0x68E1,
    0x9E9D: 0x690C,
    0x9E9E: 0x68CD,
    0x9E9F: 0x68D4,
    0x9EA0: 0x68E7,
    0x9EA1: 0x68D5,
    0x9EA2: 0x6936,
    0x9EA3: 0x6912,
    0x9EA4: 0x6904,
    0x9EA5: 0x68D7,
    0x9EA6: 0x68E3,
    0x9EA7: 0x6925,
    0x9EA8: 0x68F9,
    0x9EA9: 0x68E0,
    0x9EAA: 0x68EF,
    0x9EAB: 0x6928,
    0x9EAC: 0x692A,
    0x9EAD: 0x691A,
    0x9EAE: 0x6923,
    0x9EAF: 0x6921,
    0x9EB0: 0x68C6,
    0x9EB1: 0x6979,
    0x9EB2: 0x6977,
    0x9EB3: 0x695C,
    0x9EB4: 0x6978,
    0x9EB5: 0x696B,
    0x9EB6: 0x6954,
    0x9EB7: 0x697E,
    0x9EB8: 0x696E,
    0x9EB9: 0x6939,
    0x9EBA: 0x6974,
    0x9EBB: 0x693D,
    0x9EBC: 0x6959,
    0x9EBD: 0x6930,
    0x9EBE: 0x6961,
    0x9EBF: 0x695E,
    0x9EC0: 0x695D,
    0x9EC1: 0x6981,
    0x9EC2: 0x696A,
    0x9EC3: 0x69B2,
    0x9EC4: 0x69AE,
    0x9EC5: 0x69D0,
    0x9EC6: 0x69BF,
    0x9EC7: 0x69C1,
    0x9EC8: 0x69D3,
    0x9EC9: 0x69BE,
    0x9ECA: 0x69CE,
    0x9ECB: 0x5BE8,
    0x9ECC: 0x69CA,
    0x9ECD: 0x69DD,
    0x9ECE: 0x69BB,
    0x9ECF: 0x69C3,
    0x9ED0: 0x69A7,
    0x9ED1: 0x6A2E,
    0x9ED2: 0x6991,
    0x9ED3: 0x69A0,
    0x9ED4: 0x699C,
    0x9ED5: 0x6995,
    0x9ED6: 0x69B4,
    0x9ED7: 0x69DE,
    0x9ED8: 0x69E8,
    0x9ED9: 0x6A02,
    0x9EDA: 0x6A1B,
    0x9EDB: 0x69FF,
    0x9EDC: 0x6B0A,
    0x9EDD: 0x69F9,
    0x9EDE: 0x69F2,
    0x9EDF: 0x69E7,
    0x9EE0: 0x6A05,
    0x9EE1: 0x69B1,
    0x9EE2: 0x6A1E,
    0x9EE3: 0x69ED,
    0x9EE4: 0x6A14,
    0x9EE5: 0x69EB,
    0x9EE6: 0x6A0A,
    0x9EE7: 0x6A12,
    0x9EE8: 0x6AC1,
    0x9EE9: 0x6A23,
    0x9EEA: 0x6A13,
    0x9EEB: 0x6A44,
    0x9EEC: 0x6A0C,
    0x9EED: 0x6A72,
    0x9EEE: 0x6A36,
    0x9EEF: 0x6A78,
    0x9EF0: 0x6A47,
    0x9EF1: 0x6A62,
    0x9EF2: 0x6A59,
    0x9EF3: 0x6A66,
    0x9EF4: 0x6A48,
    0x9EF5: 0x6A38,
    0x9EF6: 0x6A22,
    0x9EF7: 0x6A90,
    0x9EF8: 0x6A8D,
    0x9EF9: 0x6AA0,
    0x9EFA: 0x6A84,
    0x9EFB: 0x6AA2,
    0x9EFC: 0x6AA3,
    0x9F40: 0x6A97,
    0x9F41: 0x8617,
    0x9F42: 0x6ABB,
    0x9F43: 0x6AC3,
    0x9F44: 0x6AC2,
    0x9F45: 0x6AB8,
    0x9F46: 0x6AB3,
    0x9F47: 0x6AAC,
    0x9F48: 0x6ADE,
    0x9F49: 0x6AD1,
    0x9F4A: 0x6ADF,
    0x9F4B: 0x6AAA,
    0x9F4C: 0x6ADA,
    0x9F4D: 0x6AEA,
    0x9F4E: 0x6AFB,
    0x9F4F: 0x6B05,
    0x9F50: 0x8616,
    0x9F51: 0x6AFA,
    0x9F52: 0x6B12,
    0x9F53: 0x6B16,
    0x9F54: 0x9B31,
    0x9F55: 0x6B1F,
    0x9F56: 0x6B38,
    0x9F57: 0x6B37,
    0x9F58: 0x76DC,
    0x9F59: 0x6B39,
    0x9F5A: 0x98EE,
    0x9F5B: 0x6B47,
    0x9F5C: 0x6B43,
    0x9F5D: 0x6B49,
    0x9F5E: 0x6B50,
    0x9F5F: 0x6B59,
    0x9F60: 0x6B54,
    0x9F61: 0x6B5B,
    0x9F62: 0x6B5F,
    0x9F63: 0x6B61,
    0x9F64: 0x6B78,
    0x9F65: 0x6B79,
    0x9F66: 0x6B7F,
    0x9F67: 0x6B80,
    0x9F68: 0x6B84,
    0x9F69: 0x6B83,
    0x9F6A: 0x6B8D,
    0x9F6B: 0x6B98,
    0x9F6C: 0x6B95,
    0x9F6D: 0x6B9E,
    0x9F6E: 0x6BA4,
    0x9F6F: 0x6BAA,
    0x9F70: 0x6BAB,
    0x9F71: 0x6BAF,
    0x9F72: 0x6BB2,
    0x9F73: 0x6BB1,
    0x9F74: 0x6BB3,
    0x9F75: 0x6BB7,
    0x9F76: 0x6BBC,
    0x9F77: 0x6BC6,
    0x9F78: 0x6BCB,
    0x9F79: 0x6BD3,
    0x9F7A: 0x6BDF,
    0x9F7B: 0x6BEC,
    0x9F7C: 0x6BEB,
    0x9F7D: 0x6BF3,
    0x9F7E: 0x6BEF,
    0x9F80: 0x9EBE,
    0x9F81: 0x6C08,
    0x9F82: 0x6C13,
    0x9F83: 0x6C14,
    0x9F84: 0x6C1B,
    0x9F85: 0x6C24,
    0x9F86: 0x6C23,
    0x9F87: 0x6C5E,
    0x9F88: 0x6C55,
    0x9F89: 0x6C62,
    0x9F8A: 0x6C6A,
    0x9F8B: 0x6C82,
    0x9F8C: 0x6C8D,
    0x9F8D: 0x6C9A,
    0x9F8E: 0x6C81,
    0x9F8F: 0x6C9B,
    0x9F90: 0x6C7E,
    0x9F91: 0x6C68,
    0x9F92: 0x6C73,
    0x9F93: 0x6C92,
    0x9F94: 0x6C90,
    0x9F95: 0x6CC4,
    0x9F96: 0x6CF1,
    0x9F97: 0x6CD3,
    0x9F98: 0x6CBD,
    0x9F99: 0x6CD7,
    0x9F9A: 0x6CC5,
    0x9F9B: 0x6CDD,
    0x9F9C: 0x6CAE,
    0x9F9D: 0x6CB1,
    0x9F9E: 0x6CBE,
    0x9F9F: 0x6CBA,
    0x9FA0: 0x6CDB,
    0x9FA1: 0x6CEF,
    0x9FA2: 0x6CD9,
    0x9FA3: 0x6CEA,
    0x9FA4: 0x6D1F,
    0x9FA5: 0x884D,
    0x9FA6: 0x6D36,
    0x9FA7: 0x6D2B,
    0x9FA8: 0x6D3D,
    0x9FA9: 0x6D38,
    0x9FAA: 0x6D19,
    0x9FAB: 0x6D35,
    0x9FAC: 0x6D33,
    0x9FAD: 0x6D12,
    0x9FAE: 0x6D0C,
    0x9FAF: 0x6D63,
    0x9FB0: 0x6D93,
    0x9FB1: 0x6D64,
    0x9FB2: 0x6D5A,
    0x9FB3: 0x6D79,
    0x9FB4: 0x6D59,
    0x9FB5: 0x6D8E,
    0x9FB6: 0x6D95,
    0x9FB7: 0x6FE4,
    0x9FB8: 0x6D85,
    0x9FB9: 0x6DF9,
    0x9FBA: 0x6E15,
    0x9FBB: 0x6E0A,
    0x9FBC: 0x6DB5,
    0x9FBD: 0x6DC7,
    0x9FBE: 0x6DE6,
    0x9FBF: 0x6DB8,
    0x9FC0: 0x6DC6,
    0x9FC1: 0x6DEC,
    0x9FC2: 0x6DDE,
    0x9FC3: 0x6DCC,
    0x9FC4: 0x6DE8,
    0x9FC5: 0x6DD2,
    0x9FC6: 0x6DC5,
    0x9FC7: 0x6DFA,
    0x9FC8: 0x6DD9,
    0x9FC9: 0x6DE4,
    0x9FCA: 0x6DD5,
    0x9FCB: 0x6DEA,
    0x9FCC: 0x6DEE,
    0x9FCD: 0x6E2D,
    0x9FCE: 0x6E6E,
    0x9FCF: 0x6E2E,
    0x9FD0: 0x6E19,
    0x9FD1: 0x6E72,
    0x9FD2: 0x6E5F,
    0x9FD3: 0x6E3E,
    0x9FD4: 0x6E23,
    0x9FD5: 0x6E6B,
    0x9FD6: 0x6E2B,
    0x9FD7: 0x6E76,
    0x9FD8: 0x6E4D,
    0x9FD9: 0x6E1F,
    0x9FDA: 0x6E43,
    0x9FDB: 0x6E3A,
    0x9FDC: 0x6E4E,
    0x9FDD: 0x6E24,
    0x9FDE: 0x6EFF,
    0x9FDF: 0x6E1D,
    0x9FE0: 0x6E38,
    0x9FE1: 0x6E82,
    0x9FE2: 0x6EAA,
    0x9FE3: 0x6E98,
    0x9FE4: 0x6EC9,
    0x9FE5: 0x6EB7,
    0x9FE6: 0x6ED3,
    0x9FE7: 0x6EBD,
    0x9FE8: 0x6EAF,
    0x9FE9: 0x6EC4,
    0x9FEA: 0x6EB2,
    0x9FEB: 0x6ED4,
    0x9FEC: 0x6ED5,
    0x9FED: 0x6E8F,
    0x9FEE: 0x6EA5,
    0x9FEF: 0x6EC2,
    0x9FF0: 0x6E9F,
    0x9FF1: 0x6F41,
    0x9FF2: 0x6F11,
    0x9FF3: 0x704C,
    0x9FF4: 0x6EEC,
    0x9FF5: 0x6EF8,
    0x9FF6: 0x6EFE,
    0x9FF7: 0x6F3F,
    0x9FF8: 0x6EF2,
    0x9FF9: 0x6F31,
    0x9FFA: 0x6EEF,
    0x9FFB: 0x6F32,
    0x9FFC: 0x6ECC,
    0xA1: 0xFF61,
    0xA2: 0xFF62,
    0xA3: 0xFF63,
    0xA4: 0xFF64,
    0xA5: 0xFF65,
    0xA6: 0xFF66,
    0xA7: 0xFF67,
    0xA8: 0xFF68,
    0xA9: 0xFF69,
    0xAA: 0xFF6A,
    0xAB: 0xFF6B,
    0xAC: 0xFF6C,
    0xAD: 0xFF6D,
    0xAE: 0xFF6E,
    0xAF: 0xFF6F,
    0xB0: 0xFF70,
    0xB1: 0xFF71,
    0xB2: 0xFF72,
    0xB3: 0xFF73,
    0xB4: 0xFF74,
    0xB5: 0xFF75,
    0xB6: 0xFF76,
    0xB7: 0xFF77,
    0xB8: 0xFF78,
    0xB9: 0xFF79,
    0xBA: 0xFF7A,
    0xBB: 0xFF7B,
    0xBC: 0xFF7C,
    0xBD: 0xFF7D,
    0xBE: 0xFF7E,
    0xBF: 0xFF7F,
    0xC0: 0xFF80,
    0xC1: 0xFF81,
    0xC2: 0xFF82,
    0xC3: 0xFF83,
    0xC4: 0xFF84,
    0xC5: 0xFF85,
    0xC6: 0xFF86,
    0xC7: 0xFF87,
    0xC8: 0xFF88,
    0xC9: 0xFF89,
    0xCA: 0xFF8A,
    0xCB: 0xFF8B,
    0xCC: 0xFF8C,
    0xCD: 0xFF8D,
    0xCE: 0xFF8E,
    0xCF: 0xFF8F,
    0xD0: 0xFF90,
    0xD1: 0xFF91,
    0xD2: 0xFF92,
    0xD3: 0xFF93,
    0xD4: 0xFF94,
    0xD5: 0xFF95,
    0xD6: 0xFF96,
    0xD7: 0xFF97,
    0xD8: 0xFF98,
    0xD9: 0xFF99,
    0xDA: 0xFF9A,
    0xDB: 0xFF9B,
    0xDC: 0xFF9C,
    0xDD: 0xFF9D,
    0xDE: 0xFF9E,
    0xDF: 0xFF9F,
    0xE040: 0x6F3E,
    0xE041: 0x6F13,
    0xE042: 0x6EF7,
    0xE043: 0x6F86,
    0xE044: 0x6F7A,
    0xE045: 0x6F78,
    0xE046: 0x6F81,
    0xE047: 0x6F80,
    0xE048: 0x6F6F,
    0xE049: 0x6F5B,
    0xE04A: 0x6FF3,
    0xE04B: 0x6F6D,
    0xE04C: 0x6F82,
    0xE04D: 0x6F7C,
    0xE04E: 0x6F58,
    0xE04F: 0x6F8E,
    0xE050: 0x6F91,
    0xE051: 0x6FC2,
    0xE052: 0x6F66,
    0xE053: 0x6FB3,
    0xE054: 0x6FA3,
    0xE055: 0x6FA1,
    0xE056: 0x6FA4,
    0xE057: 0x6FB9,
    0xE058: 0x6FC6,
    0xE059: 0x6FAA,
    0xE05A: 0x6FDF,
    0xE05B: 0x6FD5,
    0xE05C: 0x6FEC,
    0xE05D: 0x6FD4,
    0xE05E: 0x6FD8,
    0xE05F: 0x6FF1,
    0xE060: 0x6FEE,
    0xE061: 0x6FDB,
    0xE062: 0x7009,
    0xE063: 0x700B,
    0xE064: 0x6FFA,
    0xE065: 0x7011,
    0xE066: 0x7001,
    0xE067: 0x700F,
    0xE068: 0x6FFE,
    0xE069: 0x701B,
    0xE06A: 0x701A,
    0xE06B: 0x6F74,
    0xE06C: 0x701D,
    0xE06D: 0x7018,
    0xE06E: 0x701F,
    0xE06F: 0x7030,
    0xE070: 0x703E,
    0xE071: 0x7032,
    0xE072: 0x7051,
    0xE073: 0x7063,
    0xE074: 0x7099,
    0xE075: 0x7092,
    0xE076: 0x70AF,
    0xE077: 0x70F1,
    0xE078: 0x70AC,
    0xE079: 0x70B8,
    0xE07A: 0x70B3,
    0xE07B: 0x70AE,
    0xE07C: 0x70DF,
    0xE07D: 0x70CB,
    0xE07E: 0x70DD,
    0xE080: 0x70D9,
    0xE081: 0x7109,
    0xE082: 0x70FD,
    0xE083: 0x711C,
    0xE084: 0x7119,
    0xE085: 0x7165,
    0xE086: 0x7155,
    0xE087: 0x7188,
    0xE088: 0x7166,
    0xE089: 0x7162,
    0xE08A: 0x714C,
    0xE08B: 0x7156,
    0xE08C: 0x716C,
    0xE08D: 0x718F,
    0xE08E: 0x71FB,
    0xE08F: 0x7184,
    0xE090: 0x7195,
    0xE091: 0x71A8,
    0xE092: 0x71AC,
    0xE093: 0x71D7,
    0xE094: 0x71B9,
    0xE095: 0x71BE,
    0xE096: 0x71D2,
    0xE097: 0x71C9,
    0xE098: 0x71D4,
    0xE099: 0x71CE,
    0xE09A: 0x71E0,
    0xE09B: 0x71EC,
    0xE09C: 0x71E7,
    0xE09D: 0x71F5,
    0xE09E: 0x71FC,
    0xE09F: 0x71F9,
    0xE0A0: 0x71FF,
    0xE0A1: 0x720D,
    0xE0A2: 0x7210,
    0xE0A3: 0x721B,
    0xE0A4: 0x7228,
    0xE0A5: 0x722D,
    0xE0A6: 0x722C,
    0xE0A7: 0x7230,
    0xE0A8: 0x7232,
    0xE0A9: 0x723B,
    0xE0AA: 0x723C,
    0xE0AB: 0x723F,
    0xE0AC: 0x7240,
    0xE0AD: 0x7246,
    0xE0AE: 0x724B,
    0xE0AF: 0x7258,
    0xE0B0: 0x7274,
    0xE0B1: 0x727E,
    0xE0B2: 0x7282,
    0xE0B3: 0x7281,
    0xE0B4: 0x7287,
    0xE0B5: 0x7292,
    0xE0B6: 0x7296,
    0xE0B7: 0x72A2,
    0xE0B8: 0x72A7,
    0xE0B9: 0x72B9,
    0xE0BA: 0x72B2,
    0xE0BB: 0x72C3,
    0xE0BC: 0x72C6,
    0xE0BD: 0x72C4,
    0xE0BE: 0x72CE,
    0xE0BF: 0x72D2,
    0xE0C0: 0x72E2,
    0xE0C1: 0x72E0,
    0xE0C2: 0x72E1,
    0xE0C3: 0x72F9,
    0xE0C4: 0x72F7,
    0xE0C5: 0x500F,
    0xE0C6: 0x7317,
    0xE0C7: 0x730A,
    0xE0C8: 0x731C,
    0xE0C9: 0x7316,
    0xE0CA: 0x731D,
    0xE0CB: 0x7334,
    0xE0CC: 0x732F,
    0xE0CD: 0x7329,
    0xE0CE: 0x7325,
    0xE0CF: 0x733E,
    0xE0D0: 0x734E,
    0xE0D1: 0x734F,
    0xE0D2: 0x9ED8,
    0xE0D3: 0x7357,
    0xE0D4: 0x736A,
    0xE0D5: 0x7368,
    0xE0D6: 0x7370,
    0xE0D7: 0x7378,
    0xE0D8: 0x7375,
    0xE0D9: 0x737B,
    0xE0DA: 0x737A,
    0xE0DB: 0x73C8,
    0xE0DC: 0x73B3,
    0xE0DD: 0x73CE,
    0xE0DE: 0x73BB,
    0xE0DF: 0x73C0,
    0xE0E0: 0x73E5,
    0xE0E1: 0x73EE,
    0xE0E2: 0x73DE,
    0xE0E3: 0x74A2,
    0xE0E4: 0x7405,
    0xE0E5: 0x746F,
    0xE0E6: 0x7425,
    0xE0E7: 0x73F8,
    0xE0E8: 0x7432,
    0xE0E9: 0x743A,
    0xE0EA: 0x7455,
    0xE0EB: 0x743F,
    0xE0EC: 0x745F,
    0xE0ED: 0x7459,
    0xE0EE: 0x7441,
    0xE0EF: 0x745C,
    0xE0F0: 0x7469,
    0xE0F1: 0x7470,
    0xE0F2: 0x7463,
    0xE0F3: 0x746A,
    0xE0F4: 0x7476,
    0xE0F5: 0x747E,
    0xE0F6: 0x748B,
    0xE0F7: 0x749E,
    0xE0F8: 0x74A7,
    0xE0F9: 0x74CA,
    0xE0FA: 0x74CF,
    0xE0FB: 0x74D4,
    0xE0FC: 0x73F1,
    0xE140: 0x74E0,
    0xE141: 0x74E3,
    0xE142: 0x74E7,
    0xE143: 0x74E9,
    0xE144: 0x74EE,
    0xE145: 0x74F2,
    0xE146: 0x74F0,
    0xE147: 0x74F1,
    0xE148: 0x74F8,
    0xE149: 0x74F7,
    0xE14A: 0x7504,
    0xE14B: 0x7503,
    0xE14C: 0x7505,
    0xE14D: 0x750C,
    0xE14E: 0x750E,
    0xE14F: 0x750D,
    0xE150: 0x7515,
    0xE151: 0x7513,
    0xE152: 0x751E,
    0xE153: 0x7526,
    0xE154: 0x752C,
    0xE155: 0x753C,
    0xE156: 0x7544,
    0xE157: 0x754D,
    0xE158: 0x754A,
    0xE159: 0x7549,
    0xE15A: 0x755B,
    0xE15B: 0x7546,
    0xE15C: 0x755A,
    0xE15D: 0x7569,
    0xE15E: 0x7564,
    0xE15F: 0x7567,
    0xE160: 0x756B,
    0xE161: 0x756D,
    0xE162: 0x7578,
    0xE163: 0x7576,
    0xE164: 0x7586,
    0xE165: 0x7587,
    0xE166: 0x7574,
    0xE167: 0x758A,
    0xE168: 0x7589,
    0xE169: 0x7582,
    0xE16A: 0x7594,
    0xE16B: 0x759A,
    0xE16C: 0x759D,
    0xE16D: 0x75A5,
    0xE16E: 0x75A3,
    0xE16F: 0x75C2,
    0xE170: 0x75B3,
    0xE171: 0x75C3,
    0xE172: 0x75B5,
    0xE173: 0x75BD,
    0xE174: 0x75B8,
    0xE175: 0x75BC,
    0xE176: 0x75B1,
    0xE177: 0x75CD,
    0xE178: 0x75CA,
    0xE179: 0x75D2,
    0xE17A: 0x75D9,
    0xE17B: 0x75E3,
    0xE17C: 0x75DE,
    0xE17D: 0x75FE,
    0xE17E: 0x75FF,
    0xE180: 0x75FC,
    0xE181: 0x7601,
    0xE182: 0x75F0,
    0xE183: 0x75FA,
    0xE184: 0x75F2,
    0xE185: 0x75F3,
    0xE186: 0x760B,
    0xE187: 0x760D,
    0xE188: 0x7609,
    0xE189: 0x761F,
    0xE18A: 0x7627,
    0xE18B: 0x7620,
    0xE18C: 0x7621,
    0xE18D: 0x7622,
    0xE18E: 0x7624,
    0xE18F: 0x7634,
    0xE190: 0x7630,
    0xE191: 0x763B,
    0xE192: 0x7647,
    0xE193: 0x7648,
    0xE194: 0x7646,
    0xE195: 0x765C,
    0xE196: 0x7658,
    0xE197: 0x7661,
    0xE198: 0x7662,
    0xE199: 0x7668,
    0xE19A: 0x7669,
    0xE19B: 0x766A,
    0xE19C: 0x7667,
    0xE19D: 0x766C,
    0xE19E: 0x7670,
    0xE19F: 0x7672,
    0xE1A0: 0x7676,
    0xE1A1: 0x7678,
    0xE1A2: 0x767C,
    0xE1A3: 0x7680,
    0xE1A4: 0x7683,
    0xE1A5: 0x7688,
    0xE1A6: 0x768B,
    0xE1A7: 0x768E,
    0xE1A8: 0x7696,
    0xE1A9: 0x7693,
    0xE1AA: 0x7699,
    0xE1AB: 0x769A,
    0xE1AC: 0x76B0,
    0xE1AD: 0x76B4,
    0xE1AE: 0x76B8,
    0xE1AF: 0x76B9,
    0xE1B0: 0x76BA,
    0xE1B1: 0x76C2,
    0xE1B2: 0x76CD,
    0xE1B3: 0x76D6,
    0xE1B4: 0x76D2,
    0xE1B5: 0x76DE,
    0xE1B6: 0x76E1,
    0xE1B7: 0x76E5,
    0xE1B8: 0x76E7,
    0xE1B9: 0x76EA,
    0xE1BA: 0x862F,
    0xE1BB: 0x76FB,
    0xE1BC: 0x7708,
    0xE1BD: 0x7707,
    0xE1BE: 0x7704,
    0xE1BF: 0x7729,
    0xE1C0: 0x7724,
    0xE1C1: 0x771E,
    0xE1C2: 0x7725,
    0xE1C3: 0x7726,
    0xE1C4: 0x771B,
    0xE1C5: 0x7737,
    0xE1C6: 0x7738,
    0xE1C7: 0x7747,
    0xE1C8: 0x775A,
    0xE1C9: 0x7768,
    0xE1CA: 0x776B,
    0xE1CB: 0x775B,
    0xE1CC: 0x7765,
    0xE1CD: 0x777F,
    0xE1CE: 0x777E,
    0xE1CF: 0x7779,
    0xE1D0: 0x778E,
    0xE1D1: 0x778B,
    0xE1D2: 0x7791,
    0xE1D3: 0x77A0,
    0xE1D4: 0x779E,
    0xE1D5: 0x77B0,
    0xE1D6: 0x77B6,
    0xE1D7: 0x77B9,
    0xE1D8: 0x77BF,
    0xE1D9: 0x77BC,
    0xE1DA: 0x77BD,
    0xE1DB: 0x77BB,
    0xE1DC: 0x77C7,
    0xE1DD: 0x77CD,
    0xE1DE: 0x77D7,
    0xE1DF: 0x77DA,
    0xE1E0: 0x77DC,
    0xE1E1: 0x77E3,
    0xE1E2: 0x77EE,
    0xE1E3: 0x77FC,
    0xE1E4: 0x780C,
    0xE1E5: 0x7812,
    0xE1E6: 0x7926,
    0xE1E7: 0x7820,
    0xE1E8: 0x792A,
    0xE1E9: 0x7845,
    0xE1EA: 0x788E,
    0xE1EB: 0x7874,
    0xE1EC: 0x7886,
    0xE1ED: 0x787C,
    0xE1EE: 0x789A,
    0xE1EF: 0x788C,
    0xE1F0: 0x78A3,
    0xE1F1: 0x78B5,
    0xE1F2: 0x78AA,
    0xE1F3: 0x78AF,
    0xE1F4: 0x78D1,
    0xE1F5: 0x78C6,
    0xE1F6: 0x78CB,
    0xE1F7: 0x78D4,
    0xE1F8: 0x78BE,
    0xE1F9: 0x78BC,
    0xE1FA: 0x78C5,
    0xE1FB: 0x78CA,
    0xE1FC: 0x78EC,
    0xE240: 0x78E7,
    0xE241: 0x78DA,
    0xE242: 0x78FD,
    0xE243: 0x78F4,
    0xE244: 0x7907,
    0xE245: 0x7912,
    0xE246: 0x7911,
    0xE247: 0x7919,
    0xE248: 0x792C,
    0xE249: 0x792B,
    0xE24A: 0x7940,
    0xE24B: 0x7960,
    0xE24C: 0x7957,
    0xE24D: 0x795F,
    0xE24E: 0x795A,
    0xE24F: 0x7955,
    0xE250: 0x7953,
    0xE251: 0x797A,
    0xE252: 0x797F,
    0xE253: 0x798A,
    0xE254: 0x799D,
    0xE255: 0x79A7,
    0xE256: 0x9F4B,
    0xE257: 0x79AA,
    0xE258: 0x79AE,
    0xE259: 0x79B3,
    0xE25A: 0x79B9,
    0xE25B: 0x79BA,
    0xE25C: 0x79C9,
    0xE25D: 0x79D5,
    0xE25E: 0x79E7,
    0xE25F: 0x79EC,
    0xE260: 0x79E1,
    0xE261: 0x79E3,
    0xE262: 0x7A08,
    0xE263: 0x7A0D,
    0xE264: 0x7A18,
    0xE265: 0x7A19,
    0xE266: 0x7A20,
    0xE267: 0x7A1F,
    0xE268: 0x7980,
    0xE269: 0x7A31,
    0xE26A: 0x7A3B,
    0xE26B: 0x7A3E,
    0xE26C: 0x7A37,
    0xE26D: 0x7A43,
    0xE26E: 0x7A57,
    0xE26F: 0x7A49,
    0xE270: 0x7A61,
    0xE271: 0x7A62,
    0xE272: 0x7A69,
    0xE273: 0x9F9D,
    0xE274: 0x7A70,
    0xE275: 0x7A79,
    0xE276: 0x7A7D,
    0xE277: 0x7A88,
    0xE278: 0x7A97,
    0xE279: 0x7A95,
    0xE27A: 0x7A98,
    0xE27B: 0x7A96,
    0xE27C: 0x7AA9,
    0xE27D: 0x7AC8,
    0xE27E: 0x7AB0,
    0xE280: 0x7AB6,
    0xE281: 0x7AC5,
    0xE282: 0x7AC4,
    0xE283: 0x7ABF,
    0xE284: 0x9083,
    0xE285: 0x7AC7,
    0xE286: 0x7ACA,
    0xE287: 0x7ACD,
    0xE288: 0x7ACF,
    0xE289: 0x7AD5,
    0xE28A: 0x7AD3,
    0xE28B: 0x7AD9,
    0xE28C: 0x7ADA,
    0xE28D: 0x7ADD,
    0xE28E: 0x7AE1,
    0xE28F: 0x7AE2,
    0xE290: 0x7AE6,
    0xE291: 0x7AED,
    0xE292: 0x7AF0,
    0xE293: 0x7B02,
    0xE294: 0x7B0F,
    0xE295: 0x7B0A,
    0xE296: 0x7B06,
    0xE297: 0x7B33,
    0xE298: 0x7B18,
    0xE299: 0x7B19,
    0xE29A: 0x7B1E,
    0xE29B: 0x7B35,
    0xE29C: 0x7B28,
    0xE29D: 0x7B36,
    0xE29E: 0x7B50,
    0xE29F: 0x7B7A,
    0xE2A0: 0x7B04,
    0xE2A1: 0x7B4D,
    0xE2A2: 0x7B0B,
    0xE2A3: 0x7B4C,
    0xE2A4: 0x7B45,
    0xE2A5: 0x7B75,
    0xE2A6: 0x7B65,
    0xE2A7: 0x7B74,
    0xE2A8: 0x7B67,
    0xE2A9: 0x7B70,
    0xE2AA: 0x7B71,
    0xE2AB: 0x7B6C,
    0xE2AC: 0x7B6E,
    0xE2AD: 0x7B9D,
    0xE2AE: 0x7B98,
    0xE2AF: 0x7B9F,
    0xE2B0: 0x7B8D,
    0xE2B1: 0x7B9C,
    0xE2B2: 0x7B9A,
    0xE2B3: 0x7B8B,
    0xE2B4: 0x7B92,
    0xE2B5: 0x7B8F,
    0xE2B6: 0x7B5D,
    0xE2B7: 0x7B99,
    0xE2B8: 0x7BCB,
    0xE2B9: 0x7BC1,
    0xE2BA: 0x7BCC,
    0xE2BB: 0x7BCF,
    0xE2BC: 0x7BB4,
    0xE2BD: 0x7BC6,
    0xE2BE: 0x7BDD,
    0xE2BF: 0x7BE9,
    0xE2C0: 0x7C11,
    0xE2C1: 0x7C14,
    0xE2C2: 0x7BE6,
    0xE2C3: 0x7BE5,
    0xE2C4: 0x7C60,
    0xE2C5: 0x7C00,
    0xE2C6: 0x7C07,
    0xE2C7: 0x7C13,
    0xE2C8: 0x7BF3,
    0xE2C9: 0x7BF7,
    0xE2CA: 0x7C17,
    0xE2CB: 0x7C0D,
    0xE2CC: 0x7BF6,
    0xE2CD: 0x7C23,
    0xE2CE: 0x7C27,
    0xE2CF: 0x7C2A,
    0xE2D0: 0x7C1F,
    0xE2D1: 0x7C37,
    0xE2D2: 0x7C2B,
    0xE2D3: 0x7C3D,
    0xE2D4: 0x7C4C,
    0xE2D5: 0x7C43,
    0xE2D6: 0x7C54,
    0xE2D7: 0x7C4F,
    0xE2D8: 0x7C40,
    0xE2D9: 0x7C50,
    0xE2DA: 0x7C58,
    0xE2DB: 0x7C5F,
    0xE2DC: 0x7C64,
    0xE2DD: 0x7C56,
    0xE2DE: 0x7C65,
    0xE2DF: 0x7C6C,
    0xE2E0: 0x7C75,
    0xE2E1: 0x7C83,
    0xE2E2: 0x7C90,
    0xE2E3: 0x7CA4,
    0xE2E4: 0x7CAD,
    0xE2E5: 0x7CA2,
    0xE2E6: 0x7CAB,
    0xE2E7: 0x7CA1,
    0xE2E8: 0x7CA8,
    0xE2E9: 0x7CB3,
    0xE2EA: 0x7CB2,
    0xE2EB: 0x7CB1,
    0xE2EC: 0x7CAE,
    0xE2ED: 0x7CB9,
    0xE2EE: 0x7CBD,
    0xE2EF: 0x7CC0,
    0xE2F0: 0x7CC5,
    0xE2F1: 0x7CC2,
    0xE2F2: 0x7CD8,
    0xE2F3: 0x7CD2,
    0xE2F4: 0x7CDC,
    0xE2F5: 0x7CE2,
    0xE2F6: 0x9B3B,
    0xE2F7: 0x7CEF,
    0xE2F8: 0x7CF2,
    0xE2F9: 0x7CF4,
    0xE2FA: 0x7CF6,
    0xE2FB: 0x7CFA,
    0xE2FC: 0x7D06,
    0xE340: 0x7D02,
    0xE341: 0x7D1C,
    0xE342: 0x7D15,
    0xE343: 0x7D0A,
    0xE344: 0x7D45,
    0xE345: 0x7D4B,
    0xE346: 0x7D2E,
    0xE347: 0x7D32,
    0xE348: 0x7D3F,
    0xE349: 0x7D35,
    0xE34A: 0x7D46,
    0xE34B: 0x7D73,
    0xE34C: 0x7D56,
    0xE34D: 0x7D4E,
    0xE34E: 0x7D72,
    0xE34F: 0x7D68,
    0xE350: 0x7D6E,
    0xE351: 0x7D4F,
    0xE352: 0x7D63,
    0xE353: 0x7D93,
    0xE354: 0x7D89,
    0xE355: 0x7D5B,
    0xE356: 0x7D8F,
    0xE357: 0x7D7D,
    0xE358: 0x7D9B,
    0xE359: 0x7DBA,
    0xE35A: 0x7DAE,
    0xE35B: 0x7DA3,
    0xE35C: 0x7DB5,
    0xE35D: 0x7DC7,
    0xE35E: 0x7DBD,
    0xE35F: 0x7DAB,
    0xE360: 0x7E3D,
    0xE361: 0x7DA2,
    0xE362: 0x7DAF,
    0xE363: 0x7DDC,
    0xE364: 0x7DB8,
    0xE365: 0x7D9F,
    0xE366: 0x7DB0,
    0xE367: 0x7DD8,
    0xE368: 0x7DDD,
    0xE369: 0x7DE4,
    0xE36A: 0x7DDE,
    0xE36B: 0x7DFB,
    0xE36C: 0x7DF2,
    0xE36D: 0x7DE1,
    0xE36E: 0x7E05,
    0xE36F: 0x7E0A,
    0xE370: 0x7E23,
    0xE371: 0x7E21,
    0xE372: 0x7E12,
    0xE373: 0x7E31,
    0xE374: 0x7E1F,
    0xE375: 0x7E09,
    0xE376: 0x7E0B,
    0xE377: 0x7E22,
    0xE378: 0x7E46,
    0xE379: 0x7E66,
    0xE37A: 0x7E3B,
    0xE37B: 0x7E35,
    0xE37C: 0x7E39,
    0xE37D: 0x7E43,
    0xE37E: 0x7E37,
    0xE380: 0x7E32,
    0xE381: 0x7E3A,
    0xE382: 0x7E67,
    0xE383: 0x7E5D,
    0xE384: 0x7E56,
    0xE385: 0x7E5E,
    0xE386: 0x7E59,
    0xE387: 0x7E5A,
    0xE388: 0x7E79,
    0xE389: 0x7E6A,
    0xE38A: 0x7E69,
    0xE38B: 0x7E7C,
    0xE38C: 0x7E7B,
    0xE38D: 0x7E83,
    0xE38E: 0x7DD5,
    0xE38F: 0x7E7D,
    0xE390: 0x8FAE,
    0xE391: 0x7E7F,
    0xE392: 0x7E88,
    0xE393: 0x7E89,
    0xE394: 0x7E8C,
    0xE395: 0x7E92,
    0xE396: 0x7E90,
    0xE397: 0x7E93,
    0xE398: 0x7E94,
    0xE399: 0x7E96,
    0xE39A: 0x7E8E,
    0xE39B: 0x7E9B,
    0xE39C: 0x7E9C,
    0xE39D: 0x7F38,
    0xE39E: 0x7F3A,
    0xE39F: 0x7F45,
    0xE3A0: 0x7F4C,
    0xE3A1: 0x7F4D,
    0xE3A2: 0x7F4E,
    0xE3A3: 0x7F50,
    0xE3A4: 0x7F51,
    0xE3A5: 0x7F55,
    0xE3A6: 0x7F54,
    0xE3A7: 0x7F58,
    0xE3A8: 0x7F5F,
    0xE3A9: 0x7F60,
    0xE3AA: 0x7F68,
    0xE3AB: 0x7F69,
    0xE3AC: 0x7F67,
    0xE3AD: 0x7F78,
    0xE3AE: 0x7F82,
    0xE3AF: 0x7F86,
    0xE3B0: 0x7F83,
    0xE3B1: 0x7F88,
    0xE3B2: 0x7F87,
    0xE3B3: 0x7F8C,
    0xE3B4: 0x7F94,
    0xE3B5: 0x7F9E,
    0xE3B6: 0x7F9D,
    0xE3B7: 0x7F9A,
    0xE3B8: 0x7FA3,
    0xE3B9: 0x7FAF,
    0xE3BA: 0x7FB2,
    0xE3BB: 0x7FB9,
    0xE3BC: 0x7FAE,
    0xE3BD: 0x7FB6,
    0xE3BE: 0x7FB8,
    0xE3BF: 0x8B71,
    0xE3C0: 0x7FC5,
    0xE3C1: 0x7FC6,
    0xE3C2: 0x7FCA,
    0xE3C3: 0x7FD5,
    0xE3C4: 0x7FD4,
    0xE3C5: 0x7FE1,
    0xE3C6: 0x7FE6,
    0xE3C7: 0x7FE9,
    0xE3C8: 0x7FF3,
    0xE3C9: 0x7FF9,
    0xE3CA: 0x98DC,
    0xE3CB: 0x8006,
    0xE3CC: 0x8004,
    0xE3CD: 0x800B,
    0xE3CE: 0x8012,
    0xE3CF: 0x8018,
    0xE3D0: 0x8019,
    0xE3D1: 0x801C,
    0xE3D2: 0x8021,
    0xE3D3: 0x8028,
    0xE3D4: 0x803F,
    0xE3D5: 0x803B,
    0xE3D6: 0x804A,
    0xE3D7: 0x8046,
    0xE3D8: 0x8052,
    0xE3D9: 0x8058,
    0xE3DA: 0x805A,
    0xE3DB: 0x805F,
    0xE3DC: 0x8062,
    0xE3DD: 0x8068,
    0xE3DE: 0x8073,
    0xE3DF: 0x8072,
    0xE3E0: 0x8070,
    0xE3E1: 0x8076,
    0xE3E2: 0x8079,
    0xE3E3: 0x807D,
    0xE3E4: 0x807F,
    0xE3E5: 0x8084,
    0xE3E6: 0x8086,
    0xE3E7: 0x8085,
    0xE3E8: 0x809B,
    0xE3E9: 0x8093,
    0xE3EA: 0x809A,
    0xE3EB: 0x80AD,
    0xE3EC: 0x5190,
    0xE3ED: 0x80AC,
    0xE3EE: 0x80DB,
    0xE3EF: 0x80E5,
    0xE3F0: 0x80D9,
    0xE3F1: 0x80DD,
    0xE3F2: 0x80C4,
    0xE3F3: 0x80DA,
    0xE3F4: 0x80D6,
    0xE3F5: 0x8109,
    0xE3F6: 0x80EF,
    0xE3F7: 0x80F1,
    0xE3F8: 0x811B,
    0xE3F9: 0x8129,
    0xE3FA: 0x8123,
    0xE3FB: 0x812F,
    0xE3FC: 0x814B,
    0xE440: 0x968B,
    0xE441: 0x8146,
    0xE442: 0x813E,
    0xE443: 0x8153,
    0xE444: 0x8151,
    0xE445: 0x80FC,
    0xE446: 0x8171,
    0xE447: 0x816E,
    0xE448: 0x8165,
    0xE449: 0x8166,
    0xE44A: 0x8174,
    0xE44B: 0x8183,
    0xE44C: 0x8188,
    0xE44D: 0x818A,
    0xE44E: 0x8180,
    0xE44F: 0x8182,
    0xE450: 0x81A0,
    0xE451: 0x8195,
    0xE452: 0x81A4,
    0xE453: 0x81A3,
    0xE454: 0x815F,
    0xE455: 0x8193,
    0xE456: 0x81A9,
    0xE457: 0x81B0,
    0xE458: 0x81B5,
    0xE459: 0x81BE,
    0xE45A: 0x81B8,
    0xE45B: 0x81BD,
    0xE45C: 0x81C0,
    0xE45D: 0x81C2,
    0xE45E: 0x81BA,
    0xE45F: 0x81C9,
    0xE460: 0x81CD,
    0xE461: 0x81D1,
    0xE462: 0x81D9,
    0xE463: 0x81D8,
    0xE464: 0x81C8,
    0xE465: 0x81DA,
    0xE466: 0x81DF,
    0xE467: 0x81E0,
    0xE468: 0x81E7,
    0xE469: 0x81FA,
    0xE46A: 0x81FB,
    0xE46B: 0x81FE,
    0xE46C: 0x8201,
    0xE46D: 0x8202,
    0xE46E: 0x8205,
    0xE46F: 0x8207,
    0xE470: 0x820A,
    0xE471: 0x820D,
    0xE472: 0x8210,
    0xE473: 0x8216,
    0xE474: 0x8229,
    0xE475: 0x822B,
    0xE476: 0x8238,
    0xE477: 0x8233,
    0xE478: 0x8240,
    0xE479: 0x8259,
    0xE47A: 0x8258,
    0xE47B: 0x825D,
    0xE47C: 0x825A,
    0xE47D: 0x825F,
    0xE47E: 0x8264,
    0xE480: 0x8262,
    0xE481: 0x8268,
    0xE482: 0x826A,
    0xE483: 0x826B,
    0xE484: 0x822E,
    0xE485: 0x8271,
    0xE486: 0x8277,
    0xE487: 0x8278,
    0xE488: 0x827E,
    0xE489: 0x828D,
    0xE48A: 0x8292,
    0xE48B: 0x82AB,
    0xE48C: 0x829F,
    0xE48D: 0x82BB,
    0xE48E: 0x82AC,
    0xE48F: 0x82E1,
    0xE490: 0x82E3,
    0xE491: 0x82DF,
    0xE492: 0x82D2,
    0xE493: 0x82F4,
    0xE494: 0x82F3,
    0xE495: 0x82FA,
    0xE496: 0x8393,
    0xE497: 0x8303,
    0xE498: 0x82FB,
    0xE499: 0x82F9,
    0xE49A: 0x82DE,
    0xE49B: 0x8306,
    0xE49C: 0x82DC,
    0xE49D: 0x8309,
    0xE49E: 0x82D9,
    0xE49F: 0x8335,
    0xE4A0: 0x8334,
    0xE4A1: 0x8316,
    0xE4A2: 0x8332,
    0xE4A3: 0x8331,
    0xE4A4: 0x8340,
    0xE4A5: 0x8339,
    0xE4A6: 0x8350,
    0xE4A7: 0x8345,
    0xE4A8: 0x832F,
    0xE4A9: 0x832B,
    0xE4AA: 0x8317,
    0xE4AB: 0x8318,
    0xE4AC: 0x8385,
    0xE4AD: 0x839A,
    0xE4AE: 0x83AA,
    0xE4AF: 0x839F,
    0xE4B0: 0x83A2,
    0xE4B1: 0x8396,
    0xE4B2: 0x8323,
    0xE4B3: 0x838E,
    0xE4B4: 0x8387,
    0xE4B5: 0x838A,
    0xE4B6: 0x837C,
    0xE4B7: 0x83B5,
    0xE4B8: 0x8373,
    0xE4B9: 0x8375,
    0xE4BA: 0x83A0,
    0xE4BB: 0x8389,
    0xE4BC: 0x83A8,
    0xE4BD: 0x83F4,
    0xE4BE: 0x8413,
    0xE4BF: 0x83EB,
    0xE4C0: 0x83CE,
    0xE4C1: 0x83FD,
    0xE4C2: 0x8403,
    0xE4C3: 0x83D8,
    0xE4C4: 0x840B,
    0xE4C5: 0x83C1,
    0xE4C6: 0x83F7,
    0xE4C7: 0x8407,
    0xE4C8: 0x83E0,
    0xE4C9: 0x83F2,
    0xE4CA: 0x840D,
    0xE4CB: 0x8422,
    0xE4CC: 0x8420,
    0xE4CD: 0x83BD,
    0xE4CE: 0x8438,
    0xE4CF: 0x8506,
    0xE4D0: 0x83FB,
    0xE4D1: 0x846D,
    0xE4D2: 0x842A,
    0xE4D3: 0x843C,
    0xE4D4: 0x855A,
    0xE4D5: 0x8484,
    0xE4D6: 0x8477,
    0xE4D7: 0x846B,
    0xE4D8: 0x84AD,
    0xE4D9: 0x846E,
    0xE4DA: 0x8482,
    0xE4DB: 0x8469,
    0xE4DC: 0x8446,
    0xE4DD: 0x842C,
    0xE4DE: 0x846F,
    0xE4DF: 0x8479,
    0xE4E0: 0x8435,
    0xE4E1: 0x84CA,
    0xE4E2: 0x8462,
    0xE4E3: 0x84B9,
    0xE4E4: 0x84BF,
    0xE4E5: 0x849F,
    0xE4E6: 0x84D9,
    0xE4E7: 0x84CD,
    0xE4E8: 0x84BB,
    0xE4E9: 0x84DA,
    0xE4EA: 0x84D0,
    0xE4EB: 0x84C1,
    0xE4EC: 0x84C6,
    0xE4ED: 0x84D6,
    0xE4EE: 0x84A1,
    0xE4EF: 0x8521,
    0xE4F0: 0x84FF,
    0xE4F1: 0x84F4,
    0xE4F2: 0x8517,
    0xE4F3: 0x8518,
    0xE4F4: 0x852C,
    0xE4F5: 0x851F,
    0xE4F6: 0x8515,
    0xE4F7: 0x8514,
    0xE4F8: 0x84FC,
    0xE4F9: 0x8540,
    0xE4FA: 0x8563,
    0xE4FB: 0x8558,
    0xE4FC: 0x8548,
    0xE540: 0x8541,
    0xE541: 0x8602,
    0xE542: 0x854B,
    0xE543: 0x8555,
    0xE544: 0x8580,
    0xE545: 0x85A4,
    0xE546: 0x8588,
    0xE547: 0x8591,
    0xE548: 0x858A,
    0xE549: 0x85A8,
    0xE54A: 0x856D,
    0xE54B: 0x8594,
    0xE54C: 0x859B,
    0xE54D: 0x85EA,
    0xE54E: 0x8587,
    0xE54F: 0x859C,
    0xE550: 0x8577,
    0xE551: 0x857E,
    0xE552: 0x8590,
    0xE553: 0x85C9,
    0xE554: 0x85BA,
    0xE555: 0x85CF,
    0xE556: 0x85B9,
    0xE557: 0x85D0,
    0xE558: 0x85D5,
    0xE559: 0x85DD,
    0xE55A: 0x85E5,
    0xE55B: 0x85DC,
    0xE55C: 0x85F9,
    0xE55D: 0x860A,
    0xE55E: 0x8613,
    0xE55F: 0x860B,
    0xE560: 0x85FE,
    0xE561: 0x85FA,
    0xE562: 0x8606,
    0xE563: 0x8622,
    0xE564: 0x861A,
    0xE565: 0x8630,
    0xE566: 0x863F,
    0xE567: 0x864D,
    0xE568: 0x4E55,
    0xE569: 0x8654,
    0xE56A: 0x865F,
    0xE56B: 0x8667,
    0xE56C: 0x8671,
    0xE56D: 0x8693,
    0xE56E: 0x86A3,
    0xE56F: 0x86A9,
    0xE570: 0x86AA,
    0xE571: 0x868B,
    0xE572: 0x868C,
    0xE573: 0x86B6,
    0xE574: 0x86AF,
    0xE575: 0x86C4,
    0xE576: 0x86C6,
    0xE577: 0x86B0,
    0xE578: 0x86C9,
    0xE579: 0x8823,
    0xE57A: 0x86AB,
    0xE57B: 0x86D4,
    0xE57C: 0x86DE,
    0xE57D: 0x86E9,
    0xE57E: 0x86EC,
    0xE580: 0x86DF,
    0xE581: 0x86DB,
    0xE582: 0x86EF,
    0xE583: 0x8712,
    0xE584: 0x8706,
    0xE585: 0x8708,
    0xE586: 0x8700,
    0xE587: 0x8703,
    0xE588: 0x86FB,
    0xE589: 0x8711,
    0xE58A: 0x8709,
    0xE58B: 0x870D,
    0xE58C: 0x86F9,
    0xE58D: 0x870A,
    0xE58E: 0x8734,
    0xE58F: 0x873F,
    0xE590: 0x8737,
    0xE591: 0x873B,
    0xE592: 0x8725,
    0xE593: 0x8729,
    0xE594: 0x871A,
    0xE595: 0x8760,
    0xE596: 0x875F,
    0xE597: 0x8778,
    0xE598: 0x874C,
    0xE599: 0x874E,
    0xE59A: 0x8774,
    0xE59B: 0x8757,
    0xE59C: 0x8768,
    0xE59D: 0x876E,
    0xE59E: 0x8759,
    0xE59F: 0x8753,
    0xE5A0: 0x8763,
    0xE5A1: 0x876A,
    0xE5A2: 0x8805,
    0xE5A3: 0x87A2,
    0xE5A4: 0x879F,
    0xE5A5: 0x8782,
    0xE5A6: 0x87AF,
    0xE5A7: 0x87CB,
    0xE5A8: 0x87BD,
    0xE5A9: 0x87C0,
    0xE5AA: 0x87D0,
    0xE5AB: 0x96D6,
    0xE5AC: 0x87AB,
    0xE5AD: 0x87C4,
    0xE5AE: 0x87B3,
    0xE5AF: 0x87C7,
    0xE5B0: 0x87C6,
    0xE5B1: 0x87BB,
    0xE5B2: 0x87EF,
    0xE5B3: 0x87F2,
    0xE5B4: 0x87E0,
    0xE5B5: 0x880F,
    0xE5B6: 0x880D,
    0xE5B7: 0x87FE,
    0xE5B8: 0x87F6,
    0xE5B9: 0x87F7,
    0xE5BA: 0x880E,
    0xE5BB: 0x87D2,
    0xE5BC: 0x8811,
    0xE5BD: 0x8816,
    0xE5BE: 0x8815,
    0xE5BF: 0x8822,
    0xE5C0: 0x8821,
    0xE5C1: 0x8831,
    0xE5C2: 0x8836,
    0xE5C3: 0x8839,
    0xE5C4: 0x8827,
    0xE5C5: 0x883B,
    0xE5C6: 0x8844,
    0xE5C7: 0x8842,
    0xE5C8: 0x8852,
    0xE5C9: 0x8859,
    0xE5CA: 0x885E,
    0xE5CB: 0x8862,
    0xE5CC: 0x886B,
    0xE5CD: 0x8881,
    0xE5CE: 0x887E,
    0xE5CF: 0x889E,
    0xE5D0: 0x8875,
    0xE5D1: 0x887D,
    0xE5D2: 0x88B5,
    0xE5D3: 0x8872,
    0xE5D4: 0x8882,
    0xE5D5: 0x8897,
    0xE5D6: 0x8892,
    0xE5D7: 0x88AE,
    0xE5D8: 0x8899,
    0xE5D9: 0x88A2,
    0xE5DA: 0x888D,
    0xE5DB: 0x88A4,
    0xE5DC: 0x88B0,
    0xE5DD: 0x88BF,
    0xE5DE: 0x88B1,
    0xE5DF: 0x88C3,
    0xE5E0: 0x88C4,
    0xE5E1: 0x88D4,
    0xE5E2: 0x88D8,
    0xE5E3: 0x88D9,
    0xE5E4: 0x88DD,
    0xE5E5: 0x88F9,
    0xE5E6: 0x8902,
    0xE5E7: 0x88FC,
    0xE5E8: 0x88F4,
    0xE5E9: 0x88E8,
    0xE5EA: 0x88F2,
    0xE5EB: 0x8904,
    0xE5EC: 0x890C,
    0xE5ED: 0x890A,
    0xE5EE: 0x8913,
    0xE5EF: 0x8943,
    0xE5F0: 0x891E,
    0xE5F1: 0x8925,
    0xE5F2: 0x892A,
    0xE5F3: 0x892B,
    0xE5F4: 0x8941,
    0xE5F5: 0x8944,
    0xE5F6: 0x893B,
    0xE5F7: 0x8936,
    0xE5F8: 0x8938,
    0xE5F9: 0x894C,
    0xE5FA: 0x891D,
    0xE5FB: 0x8960,
    0xE5FC: 0x895E,
    0xE640: 0x8966,
    0xE641: 0x8964,
    0xE642: 0x896D,
    0xE643: 0x896A,
    0xE644: 0x896F,
    0xE645: 0x8974,
    0xE646: 0x8977,
    0xE647: 0x897E,
    0xE648: 0x8983,
    0xE649: 0x8988,
    0xE64A: 0x898A,
    0xE64B: 0x8993,
    0xE64C: 0x8998,
    0xE64D: 0x89A1,
    0xE64E: 0x89A9,
    0xE64F: 0x89A6,
    0xE650: 0x89AC,
    0xE651: 0x89AF,
    0xE652: 0x89B2,
    0xE653: 0x89BA,
    0xE654: 0x89BD,
    0xE655: 0x89BF,
    0xE656: 0x89C0,
    0xE657: 0x89DA,
    0xE658: 0x89DC,
    0xE659: 0x89DD,
    0xE65A: 0x89E7,
    0xE65B: 0x89F4,
    0xE65C: 0x89F8,
    0xE65D: 0x8A03,
    0xE65E: 0x8A16,
    0xE65F: 0x8A10,
    0xE660: 0x8A0C,
    0xE661: 0x8A1B,
    0xE662: 0x8A1D,
    0xE663: 0x8A25,
    0xE664: 0x8A36,
    0xE665: 0x8A41,
    0xE666: 0x8A5B,
    0xE667: 0x8A52,
    0xE668: 0x8A46,
    0xE669: 0x8A48,
    0xE66A: 0x8A7C,
    0xE66B: 0x8A6D,
    0xE66C: 0x8A6C,
    0xE66D: 0x8A62,
    0xE66E: 0x8A85,
    0xE66F: 0x8A82,
    0xE670: 0x8A84,
    0xE671: 0x8AA8,
    0xE672: 0x8AA1,
    0xE673: 0x8A91,
    0xE674: 0x8AA5,
    0xE675: 0x8AA6,
    0xE676: 0x8A9A,
    0xE677: 0x8AA3,
    0xE678: 0x8AC4,
    0xE679: 0x8ACD,
    0xE67A: 0x8AC2,
    0xE67B: 0x8ADA,
    0xE67C: 0x8AEB,
    0xE67D: 0x8AF3,
    0xE67E: 0x8AE7,
    0xE680: 0x8AE4,
    0xE681: 0x8AF1,
    0xE682: 0x8B14,
    0xE683: 0x8AE0,
    0xE684: 0x8AE2,
    0xE685: 0x8AF7,
    0xE686: 0x8ADE,
    0xE687: 0x8ADB,
    0xE688: 0x8B0C,
    0xE689: 0x8B07,
    0xE68A: 0x8B1A,
    0xE68B: 0x8AE1,
    0xE68C: 0x8B16,
    0xE68D: 0x8B10,
    0xE68E: 0x8B17,
    0xE68F: 0x8B20,
    0xE690: 0x8B33,
    0xE691: 0x97AB,
    0xE692: 0x8B26,
    0xE693: 0x8B2B,
    0xE694: 0x8B3E,
    0xE695: 0x8B28,
    0xE696: 0x8B41,
    0xE697: 0x8B4C,
    0xE698: 0x8B4F,
    0xE699: 0x8B4E,
    0xE69A: 0x8B49,
    0xE69B: 0x8B56,
    0xE69C: 0x8B5B,
    0xE69D: 0x8B5A,
    0xE69E: 0x8B6B,
    0xE69F: 0x8B5F,
    0xE6A0: 0x8B6C,
    0xE6A1: 0x8B6F,
    0xE6A2: 0x8B74,
    0xE6A3: 0x8B7D,
    0xE6A4: 0x8B80,
    0xE6A5: 0x8B8C,
    0xE6A6: 0x8B8E,
    0xE6A7: 0x8B92,
    0xE6A8: 0x8B93,
    0xE6A9: 0x8B96,
    0xE6AA: 0x8B99,
    0xE6AB: 0x8B9A,
    0xE6AC: 0x8C3A,
    0xE6AD: 0x8C41,
    0xE6AE: 0x8C3F,
    0xE6AF: 0x8C48,
    0xE6B0: 0x8C4C,
    0xE6B1: 0x8C4E,
    0xE6B2: 0x8C50,
    0xE6B3: 0x8C55,
    0xE6B4: 0x8C62,
    0xE6B5: 0x8C6C,
    0xE6B6: 0x8C78,
    0xE6B7: 0x8C7A,
    0xE6B8: 0x8C82,
    0xE6B9: 0x8C89,
    0xE6BA: 0x8C85,
    0xE6BB: 0x8C8A,
    0xE6BC: 0x8C8D,
    0xE6BD: 0x8C8E,
    0xE6BE: 0x8C94,
    0xE6BF: 0x8C7C,
    0xE6C0: 0x8C98,
    0xE6C1: 0x621D,
    0xE6C2: 0x8CAD,
    0xE6C3: 0x8CAA,
    0xE6C4: 0x8CBD,
    0xE6C5: 0x8CB2,
    0xE6C6: 0x8CB3,
    0xE6C7: 0x8CAE,
    0xE6C8: 0x8CB6,
    0xE6C9: 0x8CC8,
    0xE6CA: 0x8CC1,
    0xE6CB: 0x8CE4,
    0xE6CC: 0x8CE3,
    0xE6CD: 0x8CDA,
    0xE6CE: 0x8CFD,
    0xE6CF: 0x8CFA,
    0xE6D0: 0x8CFB,
    0xE6D1: 0x8D04,
    0xE6D2: 0x8D05,
    0xE6D3: 0x8D0A,
    0xE6D4: 0x8D07,
    0xE6D5: 0x8D0F,
    0xE6D6: 0x8D0D,
    0xE6D7: 0x8D10,
    0xE6D8: 0x9F4E,
    0xE6D9: 0x8D13,
    0xE6DA: 0x8CCD,
    0xE6DB: 0x8D14,
    0xE6DC: 0x8D16,
    0xE6DD: 0x8D67,
    0xE6DE: 0x8D6D,
    0xE6DF: 0x8D71,
    0xE6E0: 0x8D73,
    0xE6E1: 0x8D81,
    0xE6E2: 0x8D99,
    0xE6E3: 0x8DC2,
    0xE6E4: 0x8DBE,
    0xE6E5: 0x8DBA,
    0xE6E6: 0x8DCF,
    0xE6E7: 0x8DDA,
    0xE6E8: 0x8DD6,
    0xE6E9: 0x8DCC,
    0xE6EA: 0x8DDB,
    0xE6EB: 0x8DCB,
    0xE6EC: 0x8DEA,
    0xE6ED: 0x8DEB,
    0xE6EE: 0x8DDF,
    0xE6EF: 0x8DE3,
    0xE6F0: 0x8DFC,
    0xE6F1: 0x8E08,
    0xE6F2: 0x8E09,
    0xE6F3: 0x8DFF,
    0xE6F4: 0x8E1D,
    0xE6F5: 0x8E1E,
    0xE6F6: 0x8E10,
    0xE6F7: 0x8E1F,
    0xE6F8: 0x8E42,
    0xE6F9: 0x8E35,
    0xE6FA: 0x8E30,
    0xE6FB: 0x8E34,
    0xE6FC: 0x8E4A,
    0xE740: 0x8E47,
    0xE741: 0x8E49,
    0xE742: 0x8E4C,
    0xE743: 0x8E50,
    0xE744: 0x8E48,
    0xE745: 0x8E59,
    0xE746: 0x8E64,
    0xE747: 0x8E60,
    0xE748: 0x8E2A,
    0xE749: 0x8E63,
    0xE74A: 0x8E55,
    0xE74B: 0x8E76,
    0xE74C: 0x8E72,
    0xE74D: 0x8E7C,
    0xE74E: 0x8E81,
    0xE74F: 0x8E87,
    0xE750: 0x8E85,
    0xE751: 0x8E84,
    0xE752: 0x8E8B,
    0xE753: 0x8E8A,
    0xE754: 0x8E93,
    0xE755: 0x8E91,
    0xE756: 0x8E94,
    0xE757: 0x8E99,
    0xE758: 0x8EAA,
    0xE759: 0x8EA1,
    0xE75A: 0x8EAC,
    0xE75B: 0x8EB0,
    0xE75C: 0x8EC6,
    0xE75D: 0x8EB1,
    0xE75E: 0x8EBE,
    0xE75F: 0x8EC5,
    0xE760: 0x8EC8,
    0xE761: 0x8ECB,
    0xE762: 0x8EDB,
    0xE763: 0x8EE3,
    0xE764: 0x8EFC,
    0xE765: 0x8EFB,
    0xE766: 0x8EEB,
    0xE767: 0x8EFE,
    0xE768: 0x8F0A,
    0xE769: 0x8F05,
    0xE76A: 0x8F15,
    0xE76B: 0x8F12,
    0xE76C: 0x8F19,
    0xE76D: 0x8F13,
    0xE76E: 0x8F1C,
    0xE76F: 0x8F1F,
    0xE770: 0x8F1B,
    0xE771: 0x8F0C,
    0xE772: 0x8F26,
    0xE773: 0x8F33,
    0xE774: 0x8F3B,
    0xE775: 0x8F39,
    0xE776: 0x8F45,
    0xE777: 0x8F42,
    0xE778: 0x8F3E,
    0xE779: 0x8F4C,
    0xE77A: 0x8F49,
    0xE77B: 0x8F46,
    0xE77C: 0x8F4E,
    0xE77D: 0x8F57,
    0xE77E: 0x8F5C,
    0xE780: 0x8F62,
    0xE781: 0x8F63,
    0xE782: 0x8F64,
    0xE783: 0x8F9C,
    0xE784: 0x8F9F,
    0xE785: 0x8FA3,
    0xE786: 0x8FAD,
    0xE787: 0x8FAF,
    0xE788: 0x8FB7,
    0xE789: 0x8FDA,
    0xE78A: 0x8FE5,
    0xE78B: 0x8FE2,
    0xE78C: 0x8FEA,
    0xE78D: 0x8FEF,
    0xE78E: 0x9087,
    0xE78F: 0x8FF4,
    0xE790: 0x9005,
    0xE791: 0x8FF9,
    0xE792: 0x8FFA,
    0xE793: 0x9011,
    0xE794: 0x9015,
    0xE795: 0x9021,
    0xE796: 0x900D,
    0xE797: 0x901E,
    0xE798: 0x9016,
    0xE799: 0x900B,
    0xE79A: 0x9027,
    0xE79B: 0x9036,
    0xE79C: 0x9035,
    0xE79D: 0x9039,
    0xE79E: 0x8FF8,
    0xE79F: 0x904F,
    0xE7A0: 0x9050,
    0xE7A1: 0x9051,
    0xE7A2: 0x9052,
    0xE7A3: 0x900E,
    0xE7A4: 0x9049,
    0xE7A5: 0x903E,
    0xE7A6: 0x9056,
    0xE7A7: 0x9058,
    0xE7A8: 0x905E,
    0xE7A9: 0x9068,
    0xE7AA: 0x906F,
    0xE7AB: 0x9076,
    0xE7AC: 0x96A8,
    0xE7AD: 0x9072,
    0xE7AE: 0x9082,
    0xE7AF: 0x907D,
    0xE7B0: 0x9081,
    0xE7B1: 0x9080,
    0xE7B2: 0x908A,
    0xE7B3: 0x9089,
    0xE7B4: 0x908F,
    0xE7B5: 0x90A8,
    0xE7B6: 0x90AF,
    0xE7B7: 0x90B1,
    0xE7B8: 0x90B5,
    0xE7B9: 0x90E2,
    0xE7BA: 0x90E4,
    0xE7BB: 0x6248,
    0xE7BC: 0x90DB,
    0xE7BD: 0x9102,
    0xE7BE: 0x9112,
    0xE7BF: 0x9119,
    0xE7C0: 0x9132,
    0xE7C1: 0x9130,
    0xE7C2: 0x914A,
    0xE7C3: 0x9156,
    0xE7C4: 0x9158,
    0xE7C5: 0x9163,
    0xE7C6: 0x9165,
    0xE7C7: 0x9169,
    0xE7C8: 0x9173,
    0xE7C9: 0x9172,
    0xE7CA: 0x918B,
    0xE7CB: 0x9189,
    0xE7CC: 0x9182,
    0xE7CD: 0x91A2,
    0xE7CE: 0x91AB,
    0xE7CF: 0x91AF,
    0xE7D0: 0x91AA,
    0xE7D1: 0x91B5,
    0xE7D2: 0x91B4,
    0xE7D3: 0x91BA,
    0xE7D4: 0x91C0,
    0xE7D5: 0x91C1,
    0xE7D6: 0x91C9,
    0xE7D7: 0x91CB,
    0xE7D8: 0x91D0,
    0xE7D9: 0x91D6,
    0xE7DA: 0x91DF,
    0xE7DB: 0x91E1,
    0xE7DC: 0x91DB,
    0xE7DD: 0x91FC,
    0xE7DE: 0x91F5,
    0xE7DF: 0x91F6,
    0xE7E0: 0x921E,
    0xE7E1: 0x91FF,
    0xE7E2: 0x9214,
    0xE7E3: 0x922C,
    0xE7E4: 0x9215,
    0xE7E5: 0x9211,
    0xE7E6: 0x925E,
    0xE7E7: 0x9257,
    0xE7E8: 0x9245,
    0xE7E9: 0x9249,
    0xE7EA: 0x9264,
    0xE7EB: 0x9248,
    0xE7EC: 0x9295,
    0xE7ED: 0x923F,
    0xE7EE: 0x924B,
    0xE7EF: 0x9250,
    0xE7F0: 0x929C,
    0xE7F1: 0x9296,
    0xE7F2: 0x9293,
    0xE7F3: 0x929B,
    0xE7F4: 0x925A,
    0xE7F5: 0x92CF,
    0xE7F6: 0x92B9,
    0xE7F7: 0x92B7,
    0xE7F8: 0x92E9,
    0xE7F9: 0x930F,
    0xE7FA: 0x92FA,
    0xE7FB: 0x9344,
    0xE7FC: 0x932E,
    0xE840: 0x9319,
    0xE841: 0x9322,
    0xE842: 0x931A,
    0xE843: 0x9323,
    0xE844: 0x933A,
    0xE845: 0x9335,
    0xE846: 0x933B,
    0xE847: 0x935C,
    0xE848: 0x9360,
    0xE849: 0x937C,
    0xE84A: 0x936E,
    0xE84B: 0x9356,
    0xE84C: 0x93B0,
    0xE84D: 0x93AC,
    0xE84E: 0x93AD,
    0xE84F: 0x9394,
    0xE850: 0x93B9,
    0xE851: 0x93D6,
    0xE852: 0x93D7,
    0xE853: 0x93E8,
    0xE854: 0x93E5,
    0xE855: 0x93D8,
    0xE856: 0x93C3,
    0xE857: 0x93DD,
    0xE858: 0x93D0,
    0xE859: 0x93C8,
    0xE85A: 0x93E4,
    0xE85B: 0x941A,
    0xE85C: 0x9414,
    0xE85D: 0x9413,
    0xE85E: 0x9403,
    0xE85F: 0x9407,
    0xE860: 0x9410,
    0xE861: 0x9436,
    0xE862: 0x942B,
    0xE863: 0x9435,
    0xE864: 0x9421,
    0xE865: 0x943A,
    0xE866: 0x9441,
    0xE867: 0x9452,
    0xE868: 0x9444,
    0xE869: 0x945B,
    0xE86A: 0x9460,
    0xE86B: 0x9462,
    0xE86C: 0x945E,
    0xE86D: 0x946A,
    0xE86E: 0x9229,
    0xE86F: 0x9470,
    0xE870: 0x9475,
    0xE871: 0x9477,
    0xE872: 0x947D,
    0xE873: 0x945A,
    0xE874: 0x947C,
    0xE875: 0x947E,
    0xE876: 0x9481,
    0xE877: 0x947F,
    0xE878: 0x9582,
    0xE879: 0x9587,
    0xE87A: 0x958A,
    0xE87B: 0x9594,
    0xE87C: 0x9596,
    0xE87D: 0x9598,
    0xE87E: 0x9599,
    0xE880: 0x95A0,
    0xE881: 0x95A8,
    0xE882: 0x95A7,
    0xE883: 0x95AD,
    0xE884: 0x95BC,
    0xE885: 0x95BB,
    0xE886: 0x95B9,
    0xE887: 0x95BE,
    0xE888: 0x95CA,
    0xE889: 0x6FF6,
    0xE88A: 0x95C3,
    0xE88B: 0x95CD,
    0xE88C: 0x95CC,
    0xE88D: 0x95D5,
    0xE88E: 0x95D4,
    0xE88F: 0x95D6,
    0xE890: 0x95DC,
    0xE891: 0x95E1,
    0xE892: 0x95E5,
    0xE893: 0x95E2,
    0xE894: 0x9621,
    0xE895: 0x9628,
    0xE896: 0x962E,
    0xE897: 0x962F,
    0xE898: 0x9642,
    0xE899: 0x964C,
    0xE89A: 0x964F,
    0xE89B: 0x964B,
    0xE89C: 0x9677,
    0xE89D: 0x965C,
    0xE89E: 0x965E,
    0xE89F: 0x965D,
    0xE8A0: 0x965F,
    0xE8A1: 0x9666,
    0xE8A2: 0x9672,
    0xE8A3: 0x966C,
    0xE8A4: 0x968D,
    0xE8A5: 0x9698,
    0xE8A6: 0x9695,
    0xE8A7: 0x9697,
    0xE8A8: 0x96AA,
    0xE8A9: 0x96A7,
    0xE8AA: 0x96B1,
    0xE8AB: 0x96B2,
    0xE8AC: 0x96B0,
    0xE8AD: 0x96B4,
    0xE8AE: 0x96B6,
    0xE8AF: 0x96B8,
    0xE8B0: 0x96B9,
    0xE8B1: 0x96CE,
    0xE8B2: 0x96CB,
    0xE8B3: 0x96C9,
    0xE8B4: 0x96CD,
    0xE8B5: 0x894D,
    0xE8B6: 0x96DC,
    0xE8B7: 0x970D,
    0xE8B8: 0x96D5,
    0xE8B9: 0x96F9,
    0xE8BA: 0x9704,
    0xE8BB: 0x9706,
    0xE8BC: 0x9708,
    0xE8BD: 0x9713,
    0xE8BE: 0x970E,
    0xE8BF: 0x9711,
    0xE8C0: 0x970F,
    0xE8C1: 0x9716,
    0xE8C2: 0x9719,
    0xE8C3: 0x9724,
    0xE8C4: 0x972A,
    0xE8C5: 0x9730,
    0xE8C6: 0x9739,
    0xE8C7: 0x973D,
    0xE8C8: 0x973E,
    0xE8C9: 0x9744,
    0xE8CA: 0x9746,
    0xE8CB: 0x9748,
    0xE8CC: 0x9742,
    0xE8CD: 0x9749,
    0xE8CE: 0x975C,
    0xE8CF: 0x9760,
    0xE8D0: 0x9764,
    0xE8D1: 0x9766,
    0xE8D2: 0x9768,
    0xE8D3: 0x52D2,
    0xE8D4: 0x976B,
    0xE8D5: 0x9771,
    0xE8D6: 0x9779,
    0xE8D7: 0x9785,
    0xE8D8: 0x977C,
    0xE8D9: 0x9781,
    0xE8DA: 0x977A,
    0xE8DB: 0x9786,
    0xE8DC: 0x978B,
    0xE8DD: 0x978F,
    0xE8DE: 0x9790,
    0xE8DF: 0x979C,
    0xE8E0: 0x97A8,
    0xE8E1: 0x97A6,
    0xE8E2: 0x97A3,
    0xE8E3: 0x97B3,
    0xE8E4: 0x97B4,
    0xE8E5: 0x97C3,
    0xE8E6: 0x97C6,
    0xE8E7: 0x97C8,
    0xE8E8: 0x97CB,
    0xE8E9: 0x97DC,
    0xE8EA: 0x97ED,
    0xE8EB: 0x9F4F,
    0xE8EC: 0x97F2,
    0xE8ED: 0x7ADF,
    0xE8EE: 0x97F6,
    0xE8EF: 0x97F5,
    0xE8F0: 0x980F,
    0xE8F1: 0x980C,
    0xE8F2: 0x9838,
    0xE8F3: 0x9824,
    0xE8F4: 0x9821,
    0xE8F5: 0x9837,
    0xE8F6: 0x983D,
    0xE8F7: 0x9846,
    0xE8F8: 0x984F,
    0xE8F9: 0x984B,
    0xE8FA: 0x986B,
    0xE8FB: 0x986F,
    0xE8FC: 0x9870,
    0xE940: 0x9871,
    0xE941: 0x9874,
    0xE942: 0x9873,
    0xE943: 0x98AA,
    0xE944: 0x98AF,
    0xE945: 0x98B1,
    0xE946: 0x98B6,
    0xE947: 0x98C4,
    0xE948: 0x98C3,
    0xE949: 0x98C6,
    0xE94A: 0x98E9,
    0xE94B: 0x98EB,
    0xE94C: 0x9903,
    0xE94D: 0x9909,
    0xE94E: 0x9912,
    0xE94F: 0x9914,
    0xE950: 0x9918,
    0xE951: 0x9921,
    0xE952: 0x991D,
    0xE953: 0x991E,
    0xE954: 0x9924,
    0xE955: 0x9920,
    0xE956: 0x992C,
    0xE957: 0x992E,
    0xE958: 0x993D,
    0xE959: 0x993E,
    0xE95A: 0x9942,
    0xE95B: 0x9949,
    0xE95C: 0x9945,
    0xE95D: 0x9950,
    0xE95E: 0x994B,
    0xE95F: 0x9951,
    0xE960: 0x9952,
    0xE961: 0x994C,
    0xE962: 0x9955,
    0xE963: 0x9997,
    0xE964: 0x9998,
    0xE965: 0x99A5,
    0xE966: 0x99AD,
    0xE967: 0x99AE,
    0xE968: 0x99BC,
    0xE969: 0x99DF,
    0xE96A: 0x99DB,
    0xE96B: 0x99DD,
    0xE96C: 0x99D8,
    0xE96D: 0x99D1,
    0xE96E: 0x99ED,
    0xE96F: 0x99EE,
    0xE970: 0x99F1,
    0xE971: 0x99F2,
    0xE972: 0x99FB,
    0xE973: 0x99F8,
    0xE974: 0x9A01,
    0xE975: 0x9A0F,
    0xE976: 0x9A05,
    0xE977: 0x99E2,
    0xE978: 0x9A19,
    0xE979: 0x9A2B,
    0xE97A: 0x9A37,
    0xE97B: 0x9A45,
    0xE97C: 0x9A42,
    0xE97D: 0x9A40,
    0xE97E: 0x9A43,
    0xE980: 0x9A3E,
    0xE981: 0x9A55,
    0xE982: 0x9A4D,
    0xE983: 0x9A5B,
    0xE984: 0x9A57,
    0xE985: 0x9A5F,
    0xE986: 0x9A62,
    0xE987: 0x9A65,
    0xE988: 0x9A64,
    0xE989: 0x9A69,
    0xE98A: 0x9A6B,
    0xE98B: 0x9A6A,
    0xE98C: 0x9AAD,
    0xE98D: 0x9AB0,
    0xE98E: 0x9ABC,
    0xE98F: 0x9AC0,
    0xE990: 0x9ACF,
    0xE991: 0x9AD1,
    0xE992: 0x9AD3,
    0xE993: 0x9AD4,
    0xE994: 0x9ADE,
    0xE995: 0x9ADF,
    0xE996: 0x9AE2,
    0xE997: 0x9AE3,
    0xE998: 0x9AE6,
    0xE999: 0x9AEF,
    0xE99A: 0x9AEB,
    0xE99B: 0x9AEE,
    0xE99C: 0x9AF4,
    0xE99D: 0x9AF1,
    0xE99E: 0x9AF7,
    0xE99F: 0x9AFB,
    0xE9A0: 0x9B06,
    0xE9A1: 0x9B18,
    0xE9A2: 0x9B1A,
    0xE9A3: 0x9B1F,
    0xE9A4: 0x9B22,
    0xE9A5: 0x9B23,
    0xE9A6: 0x9B25,
    0xE9A7: 0x9B27,
    0xE9A8: 0x9B28,
    0xE9A9: 0x9B29,
    0xE9AA: 0x9B2A,
    0xE9AB: 0x9B2E,
    0xE9AC: 0x9B2F,
    0xE9AD: 0x9B32,
    0xE9AE: 0x9B44,
    0xE9AF: 0x9B43,
    0xE9B0: 0x9B4F,
    0xE9B1: 0x9B4D,
    0xE9B2: 0x9B4E,
    0xE9B3: 0x9B51,
    0xE9B4: 0x9B58,
    0xE9B5: 0x9B74,
    0xE9B6: 0x9B93,
    0xE9B7: 0x9B83,
    0xE9B8: 0x9B91,
    0xE9B9: 0x9B96,
    0xE9BA: 0x9B97,
    0xE9BB: 0x9B9F,
    0xE9BC: 0x9BA0,
    0xE9BD: 0x9BA8,
    0xE9BE: 0x9BB4,
    0xE9BF: 0x9BC0,
    0xE9C0: 0x9BCA,
    0xE9C1: 0x9BB9,
    0xE9C2: 0x9BC6,
    0xE9C3: 0x9BCF,
    0xE9C4: 0x9BD1,
    0xE9C5: 0x9BD2,
    0xE9C6: 0x9BE3,
    0xE9C7: 0x9BE2,
    0xE9C8: 0x9BE4,
    0xE9C9: 0x9BD4,
    0xE9CA: 0x9BE1,
    0xE9CB: 0x9C3A,
    0xE9CC: 0x9BF2,
    0xE9CD: 0x9BF1,
    0xE9CE: 0x9BF0,
    0xE9CF: 0x9C15,
    0xE9D0: 0x9C14,
    0xE9D1: 0x9C09,
    0xE9D2: 0x9C13,
    0xE9D3: 0x9C0C,
    0xE9D4: 0x9C06,
    0xE9D5: 0x9C08,
    0xE9D6: 0x9C12,
    0xE9D7: 0x9C0A,
    0xE9D8: 0x9C04,
    0xE9D9: 0x9C2E,
    0xE9DA: 0x9C1B,
    0xE9DB: 0x9C25,
    0xE9DC: 0x9C24,
    0xE9DD: 0x9C21,
    0xE9DE: 0x9C30,
    0xE9DF: 0x9C47,
    0xE9E0: 0x9C32,
    0xE9E1: 0x9C46,
    0xE9E2: 0x9C3E,
    0xE9E3: 0x9C5A,
    0xE9E4: 0x9C60,
    0xE9E5: 0x9C67,
    0xE9E6: 0x9C76,
    0xE9E7: 0x9C78,
    0xE9E8: 0x9CE7,
    0xE9E9: 0x9CEC,
    0xE9EA: 0x9CF0,
    0xE9EB: 0x9D09,
    0xE9EC: 0x9D08,
    0xE9ED: 0x9CEB,
    0xE9EE: 0x9D03,
    0xE9EF: 0x9D06,
    0xE9F0: 0x9D2A,
    0xE9F1: 0x9D26,
    0xE9F2: 0x9DAF,
    0xE9F3: 0x9D23,
    0xE9F4: 0x9D1F,
    0xE9F5: 0x9D44,
    0xE9F6: 0x9D15,
    0xE9F7: 0x9D12,
    0xE9F8: 0x9D41,
    0xE9F9: 0x9D3F,
    0xE9FA: 0x9D3E,
    0xE9FB: 0x9D46,
    0xE9FC: 0x9D48,
    0xEA40: 0x9D5D,
    0xEA41: 0x9D5E,
    0xEA42: 0x9D64,
    0xEA43: 0x9D51,
    0xEA44: 0x9D50,
    0xEA45: 0x9D59,
    0xEA46: 0x9D72,
    0xEA47: 0x9D89,
    0xEA48: 0x9D87,
    0xEA49: 0x9DAB,
    0xEA4A: 0x9D6F,
    0xEA4B: 0x9D7A,
    0xEA4C: 0x9D9A,
    0xEA4D: 0x9DA4,
    0xEA4E: 0x9DA9,
    0xEA4F: 0x9DB2,
    0xEA50: 0x9DC4,
    0xEA51: 0x9DC1,
    0xEA52: 0x9DBB,
    0xEA53: 0x9DB8,
    0xEA54: 0x9DBA,
    0xEA55: 0x9DC6,
    0xEA56: 0x9DCF,
    0xEA57: 0x9DC2,
    0xEA58: 0x9DD9,
    0xEA59: 0x9DD3,
    0xEA5A: 0x9DF8,
    0xEA5B: 0x9DE6,
    0xEA5C: 0x9DED,
    0xEA5D: 0x9DEF,
    0xEA5E: 0x9DFD,
    0xEA5F: 0x9E1A,
    0xEA60: 0x9E1B,
    0xEA61: 0x9E1E,
    0xEA62: 0x9E75,
    0xEA63: 0x9E79,
    0xEA64: 0x9E7D,
    0xEA65: 0x9E81,
    0xEA66: 0x9E88,
    0xEA67: 0x9E8B,
    0xEA68: 0x9E8C,
    0xEA69: 0x9E92,
    0xEA6A: 0x9E95,
    0xEA6B: 0x9E91,
    0xEA6C: 0x9E9D,
    0xEA6D: 0x9EA5,
    0xEA6E: 0x9EA9,
    0xEA6F: 0x9EB8,
    0xEA70: 0x9EAA,
    0xEA71: 0x9EAD,
    0xEA72: 0x9761,
    0xEA73: 0x9ECC,
    0xEA74: 0x9ECE,
    0xEA75: 0x9ECF,
    0xEA76: 0x9ED0,
    0xEA77: 0x9ED4,
    0xEA78: 0x9EDC,
    0xEA79: 0x9EDE,
    0xEA7A: 0x9EDD,
    0xEA7B: 0x9EE0,
    0xEA7C: 0x9EE5,
    0xEA7D: 0x9EE8,
    0xEA7E: 0x9EEF,
    0xEA80: 0x9EF4,
    0xEA81: 0x9EF6,
    0xEA82: 0x9EF7,
    0xEA83: 0x9EF9,
    0xEA84: 0x9EFB,
    0xEA85: 0x9EFC,
    0xEA86: 0x9EFD,
    0xEA87: 0x9F07,
    0xEA88: 0x9F08,
    0xEA89: 0x76B7,
    0xEA8A: 0x9F15,
    0xEA8B: 0x9F21,
    0xEA8C: 0x9F2C,
    0xEA8D: 0x9F3E,
    0xEA8E: 0x9F4A,
    0xEA8F: 0x9F52,
    0xEA90: 0x9F54,
    0xEA91: 0x9F63,
    0xEA92: 0x9F5F,
    0xEA93: 0x9F60,
    0xEA94: 0x9F61,
    0xEA95: 0x9F66,
    0xEA96: 0x9F67,
    0xEA97: 0x9F6C,
    0xEA98: 0x9F6A,
    0xEA99: 0x9F77,
    0xEA9A: 0x9F72,
    0xEA9B: 0x9F76,
    0xEA9C: 0x9F95,
    0xEA9D: 0x9F9C,
    0xEA9E: 0x9FA0,
    0xEA9F: 0x582F,
    0xEAA0: 0x69C7,
    0xEAA1: 0x9059,
    0xEAA2: 0x7464,
    0xEAA3: 0x51DC,
    0xEAA4: 0x7199,
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __nested_webpack_require_183922__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GenericGF_1 = __nested_webpack_require_183922__(1);
var GenericGFPoly_1 = __nested_webpack_require_183922__(2);
function runEuclideanAlgorithm(field, a, b, R) {
    var _a;
    // Assume a's degree is >= b's
    if (a.degree() < b.degree()) {
        _a = [b, a], a = _a[0], b = _a[1];
    }
    var rLast = a;
    var r = b;
    var tLast = field.zero;
    var t = field.one;
    // Run Euclidean algorithm until r's degree is less than R/2
    while (r.degree() >= R / 2) {
        var rLastLast = rLast;
        var tLastLast = tLast;
        rLast = r;
        tLast = t;
        // Divide rLastLast by rLast, with quotient in q and remainder in r
        if (rLast.isZero()) {
            // Euclidean algorithm already terminated?
            return null;
        }
        r = rLastLast;
        var q = field.zero;
        var denominatorLeadingTerm = rLast.getCoefficient(rLast.degree());
        var dltInverse = field.inverse(denominatorLeadingTerm);
        while (r.degree() >= rLast.degree() && !r.isZero()) {
            var degreeDiff = r.degree() - rLast.degree();
            var scale = field.multiply(r.getCoefficient(r.degree()), dltInverse);
            q = q.addOrSubtract(field.buildMonomial(degreeDiff, scale));
            r = r.addOrSubtract(rLast.multiplyByMonomial(degreeDiff, scale));
        }
        t = q.multiplyPoly(tLast).addOrSubtract(tLastLast);
        if (r.degree() >= rLast.degree()) {
            return null;
        }
    }
    var sigmaTildeAtZero = t.getCoefficient(0);
    if (sigmaTildeAtZero === 0) {
        return null;
    }
    var inverse = field.inverse(sigmaTildeAtZero);
    return [t.multiply(inverse), r.multiply(inverse)];
}
function findErrorLocations(field, errorLocator) {
    // This is a direct application of Chien's search
    var numErrors = errorLocator.degree();
    if (numErrors === 1) {
        return [errorLocator.getCoefficient(1)];
    }
    var result = new Array(numErrors);
    var errorCount = 0;
    for (var i = 1; i < field.size && errorCount < numErrors; i++) {
        if (errorLocator.evaluateAt(i) === 0) {
            result[errorCount] = field.inverse(i);
            errorCount++;
        }
    }
    if (errorCount !== numErrors) {
        return null;
    }
    return result;
}
function findErrorMagnitudes(field, errorEvaluator, errorLocations) {
    // This is directly applying Forney's Formula
    var s = errorLocations.length;
    var result = new Array(s);
    for (var i = 0; i < s; i++) {
        var xiInverse = field.inverse(errorLocations[i]);
        var denominator = 1;
        for (var j = 0; j < s; j++) {
            if (i !== j) {
                denominator = field.multiply(denominator, GenericGF_1.addOrSubtractGF(1, field.multiply(errorLocations[j], xiInverse)));
            }
        }
        result[i] = field.multiply(errorEvaluator.evaluateAt(xiInverse), field.inverse(denominator));
        if (field.generatorBase !== 0) {
            result[i] = field.multiply(result[i], xiInverse);
        }
    }
    return result;
}
function decode(bytes, twoS) {
    var outputBytes = new Uint8ClampedArray(bytes.length);
    outputBytes.set(bytes);
    var field = new GenericGF_1.default(0x011D, 256, 0); // x^8 + x^4 + x^3 + x^2 + 1
    var poly = new GenericGFPoly_1.default(field, outputBytes);
    var syndromeCoefficients = new Uint8ClampedArray(twoS);
    var error = false;
    for (var s = 0; s < twoS; s++) {
        var evaluation = poly.evaluateAt(field.exp(s + field.generatorBase));
        syndromeCoefficients[syndromeCoefficients.length - 1 - s] = evaluation;
        if (evaluation !== 0) {
            error = true;
        }
    }
    if (!error) {
        return outputBytes;
    }
    var syndrome = new GenericGFPoly_1.default(field, syndromeCoefficients);
    var sigmaOmega = runEuclideanAlgorithm(field, field.buildMonomial(twoS, 1), syndrome, twoS);
    if (sigmaOmega === null) {
        return null;
    }
    var errorLocations = findErrorLocations(field, sigmaOmega[0]);
    if (errorLocations == null) {
        return null;
    }
    var errorMagnitudes = findErrorMagnitudes(field, sigmaOmega[1], errorLocations);
    for (var i = 0; i < errorLocations.length; i++) {
        var position = outputBytes.length - 1 - field.log(errorLocations[i]);
        if (position < 0) {
            return null;
        }
        outputBytes[position] = GenericGF_1.addOrSubtractGF(outputBytes[position], errorMagnitudes[i]);
    }
    return outputBytes;
}
exports.decode = decode;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSIONS = [
    {
        infoBits: null,
        versionNumber: 1,
        alignmentPatternCenters: [],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 7,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
            {
                ecCodewordsPerBlock: 13,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 13 }],
            },
            {
                ecCodewordsPerBlock: 17,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 2,
        alignmentPatternCenters: [6, 18],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 10,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 34 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 28 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 22 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 16 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 3,
        alignmentPatternCenters: [6, 22],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 15,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 55 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 44 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 17 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 4,
        alignmentPatternCenters: [6, 26],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 80 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 32 }],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 24 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 9 }],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 5,
        alignmentPatternCenters: [6, 30],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 1, dataCodewordsPerBlock: 108 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 43 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 11 },
                    { numBlocks: 2, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: null,
        versionNumber: 6,
        alignmentPatternCenters: [6, 34],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 68 }],
            },
            {
                ecCodewordsPerBlock: 16,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 27 }],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 19 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 15 }],
            },
        ],
    },
    {
        infoBits: 0x07C94,
        versionNumber: 7,
        alignmentPatternCenters: [6, 22, 38],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 78 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 31 }],
            },
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                    { numBlocks: 1, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x085BC,
        versionNumber: 8,
        alignmentPatternCenters: [6, 24, 42],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 97 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 38 },
                    { numBlocks: 2, dataCodewordsPerBlock: 39 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 18 },
                    { numBlocks: 2, dataCodewordsPerBlock: 19 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 14 },
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x09A99,
        versionNumber: 9,
        alignmentPatternCenters: [6, 26, 46],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 2, dataCodewordsPerBlock: 116 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                    { numBlocks: 4, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0A4D3,
        versionNumber: 10,
        alignmentPatternCenters: [6, 28, 50],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 18,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 68 },
                    { numBlocks: 2, dataCodewordsPerBlock: 69 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 43 },
                    { numBlocks: 1, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 15 },
                    { numBlocks: 2, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0BBF6,
        versionNumber: 11,
        alignmentPatternCenters: [6, 30, 54],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 81 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 50 },
                    { numBlocks: 4, dataCodewordsPerBlock: 51 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                    { numBlocks: 4, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 12 },
                    { numBlocks: 8, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0C762,
        versionNumber: 12,
        alignmentPatternCenters: [6, 32, 58],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 92 },
                    { numBlocks: 2, dataCodewordsPerBlock: 93 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 36 },
                    { numBlocks: 2, dataCodewordsPerBlock: 37 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 20 },
                    { numBlocks: 6, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 14 },
                    { numBlocks: 4, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0D847,
        versionNumber: 13,
        alignmentPatternCenters: [6, 34, 62],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 4, dataCodewordsPerBlock: 107 }],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 37 },
                    { numBlocks: 1, dataCodewordsPerBlock: 38 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 20 },
                    { numBlocks: 4, dataCodewordsPerBlock: 21 },
                ],
            },
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 11 },
                    { numBlocks: 4, dataCodewordsPerBlock: 12 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0E60D,
        versionNumber: 14,
        alignmentPatternCenters: [6, 26, 46, 66],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 40 },
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                ],
            },
            {
                ecCodewordsPerBlock: 20,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 16 },
                    { numBlocks: 5, dataCodewordsPerBlock: 17 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 5, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x0F928,
        versionNumber: 15,
        alignmentPatternCenters: [6, 26, 48, 70],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 22,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 87 },
                    { numBlocks: 1, dataCodewordsPerBlock: 88 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 41 },
                    { numBlocks: 5, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 12 },
                    { numBlocks: 7, dataCodewordsPerBlock: 13 },
                ],
            },
        ],
    },
    {
        infoBits: 0x10B78,
        versionNumber: 16,
        alignmentPatternCenters: [6, 26, 50, 74],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 98 },
                    { numBlocks: 1, dataCodewordsPerBlock: 99 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 19 },
                    { numBlocks: 2, dataCodewordsPerBlock: 20 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1145D,
        versionNumber: 17,
        alignmentPatternCenters: [6, 30, 54, 78],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 1, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 22 },
                    { numBlocks: 15, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 17, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x12A17,
        versionNumber: 18,
        alignmentPatternCenters: [6, 30, 56, 82],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 120 },
                    { numBlocks: 1, dataCodewordsPerBlock: 121 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 43 },
                    { numBlocks: 4, dataCodewordsPerBlock: 44 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 14 },
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                ],
            },
        ],
    },
    {
        infoBits: 0x13532,
        versionNumber: 19,
        alignmentPatternCenters: [6, 30, 58, 86],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 113 },
                    { numBlocks: 4, dataCodewordsPerBlock: 114 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 44 },
                    { numBlocks: 11, dataCodewordsPerBlock: 45 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 21 },
                    { numBlocks: 4, dataCodewordsPerBlock: 22 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 9, dataCodewordsPerBlock: 13 },
                    { numBlocks: 16, dataCodewordsPerBlock: 14 },
                ],
            },
        ],
    },
    {
        infoBits: 0x149A6,
        versionNumber: 20,
        alignmentPatternCenters: [6, 34, 62, 90],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 107 },
                    { numBlocks: 5, dataCodewordsPerBlock: 108 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 41 },
                    { numBlocks: 13, dataCodewordsPerBlock: 42 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 5, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 15 },
                    { numBlocks: 10, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x15683,
        versionNumber: 21,
        alignmentPatternCenters: [6, 28, 50, 72, 94],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 116 },
                    { numBlocks: 4, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 42 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 16 },
                    { numBlocks: 6, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x168C9,
        versionNumber: 22,
        alignmentPatternCenters: [6, 26, 50, 74, 98],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 111 },
                    { numBlocks: 7, dataCodewordsPerBlock: 112 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 46 }],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 24,
                ecBlocks: [{ numBlocks: 34, dataCodewordsPerBlock: 13 }],
            },
        ],
    },
    {
        infoBits: 0x177EC,
        versionNumber: 23,
        alignmentPatternCenters: [6, 30, 54, 74, 102],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 121 },
                    { numBlocks: 5, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                    { numBlocks: 14, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 16, dataCodewordsPerBlock: 15 },
                    { numBlocks: 14, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x18EC4,
        versionNumber: 24,
        alignmentPatternCenters: [6, 28, 54, 80, 106],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 45 },
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 24 },
                    { numBlocks: 16, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 30, dataCodewordsPerBlock: 16 },
                    { numBlocks: 2, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x191E1,
        versionNumber: 25,
        alignmentPatternCenters: [6, 32, 58, 84, 110],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 26,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 106 },
                    { numBlocks: 4, dataCodewordsPerBlock: 107 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 47 },
                    { numBlocks: 13, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 13, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1AFAB,
        versionNumber: 26,
        alignmentPatternCenters: [6, 30, 58, 86, 114],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 114 },
                    { numBlocks: 2, dataCodewordsPerBlock: 115 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 46 },
                    { numBlocks: 4, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 28, dataCodewordsPerBlock: 22 },
                    { numBlocks: 6, dataCodewordsPerBlock: 23 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 33, dataCodewordsPerBlock: 16 },
                    { numBlocks: 4, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1B08E,
        versionNumber: 27,
        alignmentPatternCenters: [6, 34, 62, 90, 118],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 45 },
                    { numBlocks: 3, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 8, dataCodewordsPerBlock: 23 },
                    { numBlocks: 26, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1CC1A,
        versionNumber: 28,
        alignmentPatternCenters: [6, 26, 50, 74, 98, 122],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 117 },
                    { numBlocks: 10, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 3, dataCodewordsPerBlock: 45 },
                    { numBlocks: 23, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 24 },
                    { numBlocks: 31, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 31, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1D33F,
        versionNumber: 29,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 7, dataCodewordsPerBlock: 116 },
                    { numBlocks: 7, dataCodewordsPerBlock: 117 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 21, dataCodewordsPerBlock: 45 },
                    { numBlocks: 7, dataCodewordsPerBlock: 46 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 1, dataCodewordsPerBlock: 23 },
                    { numBlocks: 37, dataCodewordsPerBlock: 24 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 26, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1ED75,
        versionNumber: 30,
        alignmentPatternCenters: [6, 26, 52, 78, 104, 130],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 5, dataCodewordsPerBlock: 115 },
                    { numBlocks: 10, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 47 },
                    { numBlocks: 10, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 15, dataCodewordsPerBlock: 24 },
                    { numBlocks: 25, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 25, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x1F250,
        versionNumber: 31,
        alignmentPatternCenters: [6, 30, 56, 82, 108, 134],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 3, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 46 },
                    { numBlocks: 29, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 24 },
                    { numBlocks: 1, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 23, dataCodewordsPerBlock: 15 },
                    { numBlocks: 28, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x209D5,
        versionNumber: 32,
        alignmentPatternCenters: [6, 34, 60, 86, 112, 138],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [{ numBlocks: 17, dataCodewordsPerBlock: 115 }],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 24 },
                    { numBlocks: 35, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 15 },
                    { numBlocks: 35, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x216F0,
        versionNumber: 33,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 115 },
                    { numBlocks: 1, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 21, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 24 },
                    { numBlocks: 19, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 11, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x228BA,
        versionNumber: 34,
        alignmentPatternCenters: [6, 34, 62, 90, 118, 146],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 115 },
                    { numBlocks: 6, dataCodewordsPerBlock: 116 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 14, dataCodewordsPerBlock: 46 },
                    { numBlocks: 23, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 44, dataCodewordsPerBlock: 24 },
                    { numBlocks: 7, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 59, dataCodewordsPerBlock: 16 },
                    { numBlocks: 1, dataCodewordsPerBlock: 17 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2379F,
        versionNumber: 35,
        alignmentPatternCenters: [6, 30, 54, 78, 102, 126, 150],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 121 },
                    { numBlocks: 7, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 12, dataCodewordsPerBlock: 47 },
                    { numBlocks: 26, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 39, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 22, dataCodewordsPerBlock: 15 },
                    { numBlocks: 41, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x24B0B,
        versionNumber: 36,
        alignmentPatternCenters: [6, 24, 50, 76, 102, 128, 154],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 121 },
                    { numBlocks: 14, dataCodewordsPerBlock: 122 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 6, dataCodewordsPerBlock: 47 },
                    { numBlocks: 34, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 46, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 2, dataCodewordsPerBlock: 15 },
                    { numBlocks: 64, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x2542E,
        versionNumber: 37,
        alignmentPatternCenters: [6, 28, 54, 80, 106, 132, 158],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 17, dataCodewordsPerBlock: 122 },
                    { numBlocks: 4, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 29, dataCodewordsPerBlock: 46 },
                    { numBlocks: 14, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 49, dataCodewordsPerBlock: 24 },
                    { numBlocks: 10, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 24, dataCodewordsPerBlock: 15 },
                    { numBlocks: 46, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x26A64,
        versionNumber: 38,
        alignmentPatternCenters: [6, 32, 58, 84, 110, 136, 162],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 4, dataCodewordsPerBlock: 122 },
                    { numBlocks: 18, dataCodewordsPerBlock: 123 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 13, dataCodewordsPerBlock: 46 },
                    { numBlocks: 32, dataCodewordsPerBlock: 47 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 48, dataCodewordsPerBlock: 24 },
                    { numBlocks: 14, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 42, dataCodewordsPerBlock: 15 },
                    { numBlocks: 32, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x27541,
        versionNumber: 39,
        alignmentPatternCenters: [6, 26, 54, 82, 110, 138, 166],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 117 },
                    { numBlocks: 4, dataCodewordsPerBlock: 118 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 40, dataCodewordsPerBlock: 47 },
                    { numBlocks: 7, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 43, dataCodewordsPerBlock: 24 },
                    { numBlocks: 22, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 10, dataCodewordsPerBlock: 15 },
                    { numBlocks: 67, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
    {
        infoBits: 0x28C69,
        versionNumber: 40,
        alignmentPatternCenters: [6, 30, 58, 86, 114, 142, 170],
        errorCorrectionLevels: [
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 19, dataCodewordsPerBlock: 118 },
                    { numBlocks: 6, dataCodewordsPerBlock: 119 },
                ],
            },
            {
                ecCodewordsPerBlock: 28,
                ecBlocks: [
                    { numBlocks: 18, dataCodewordsPerBlock: 47 },
                    { numBlocks: 31, dataCodewordsPerBlock: 48 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 34, dataCodewordsPerBlock: 24 },
                    { numBlocks: 34, dataCodewordsPerBlock: 25 },
                ],
            },
            {
                ecCodewordsPerBlock: 30,
                ecBlocks: [
                    { numBlocks: 20, dataCodewordsPerBlock: 15 },
                    { numBlocks: 61, dataCodewordsPerBlock: 16 },
                ],
            },
        ],
    },
];


/***/ }),
/* 11 */
/***/ (function(module, exports, __nested_webpack_require_231645__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var BitMatrix_1 = __nested_webpack_require_231645__(0);
function squareToQuadrilateral(p1, p2, p3, p4) {
    var dx3 = p1.x - p2.x + p3.x - p4.x;
    var dy3 = p1.y - p2.y + p3.y - p4.y;
    if (dx3 === 0 && dy3 === 0) { // Affine
        return {
            a11: p2.x - p1.x,
            a12: p2.y - p1.y,
            a13: 0,
            a21: p3.x - p2.x,
            a22: p3.y - p2.y,
            a23: 0,
            a31: p1.x,
            a32: p1.y,
            a33: 1,
        };
    }
    else {
        var dx1 = p2.x - p3.x;
        var dx2 = p4.x - p3.x;
        var dy1 = p2.y - p3.y;
        var dy2 = p4.y - p3.y;
        var denominator = dx1 * dy2 - dx2 * dy1;
        var a13 = (dx3 * dy2 - dx2 * dy3) / denominator;
        var a23 = (dx1 * dy3 - dx3 * dy1) / denominator;
        return {
            a11: p2.x - p1.x + a13 * p2.x,
            a12: p2.y - p1.y + a13 * p2.y,
            a13: a13,
            a21: p4.x - p1.x + a23 * p4.x,
            a22: p4.y - p1.y + a23 * p4.y,
            a23: a23,
            a31: p1.x,
            a32: p1.y,
            a33: 1,
        };
    }
}
function quadrilateralToSquare(p1, p2, p3, p4) {
    // Here, the adjoint serves as the inverse:
    var sToQ = squareToQuadrilateral(p1, p2, p3, p4);
    return {
        a11: sToQ.a22 * sToQ.a33 - sToQ.a23 * sToQ.a32,
        a12: sToQ.a13 * sToQ.a32 - sToQ.a12 * sToQ.a33,
        a13: sToQ.a12 * sToQ.a23 - sToQ.a13 * sToQ.a22,
        a21: sToQ.a23 * sToQ.a31 - sToQ.a21 * sToQ.a33,
        a22: sToQ.a11 * sToQ.a33 - sToQ.a13 * sToQ.a31,
        a23: sToQ.a13 * sToQ.a21 - sToQ.a11 * sToQ.a23,
        a31: sToQ.a21 * sToQ.a32 - sToQ.a22 * sToQ.a31,
        a32: sToQ.a12 * sToQ.a31 - sToQ.a11 * sToQ.a32,
        a33: sToQ.a11 * sToQ.a22 - sToQ.a12 * sToQ.a21,
    };
}
function times(a, b) {
    return {
        a11: a.a11 * b.a11 + a.a21 * b.a12 + a.a31 * b.a13,
        a12: a.a12 * b.a11 + a.a22 * b.a12 + a.a32 * b.a13,
        a13: a.a13 * b.a11 + a.a23 * b.a12 + a.a33 * b.a13,
        a21: a.a11 * b.a21 + a.a21 * b.a22 + a.a31 * b.a23,
        a22: a.a12 * b.a21 + a.a22 * b.a22 + a.a32 * b.a23,
        a23: a.a13 * b.a21 + a.a23 * b.a22 + a.a33 * b.a23,
        a31: a.a11 * b.a31 + a.a21 * b.a32 + a.a31 * b.a33,
        a32: a.a12 * b.a31 + a.a22 * b.a32 + a.a32 * b.a33,
        a33: a.a13 * b.a31 + a.a23 * b.a32 + a.a33 * b.a33,
    };
}
function extract(image, location) {
    var qToS = quadrilateralToSquare({ x: 3.5, y: 3.5 }, { x: location.dimension - 3.5, y: 3.5 }, { x: location.dimension - 6.5, y: location.dimension - 6.5 }, { x: 3.5, y: location.dimension - 3.5 });
    var sToQ = squareToQuadrilateral(location.topLeft, location.topRight, location.alignmentPattern, location.bottomLeft);
    var transform = times(sToQ, qToS);
    var matrix = BitMatrix_1.BitMatrix.createEmpty(location.dimension, location.dimension);
    var mappingFunction = function (x, y) {
        var denominator = transform.a13 * x + transform.a23 * y + transform.a33;
        return {
            x: (transform.a11 * x + transform.a21 * y + transform.a31) / denominator,
            y: (transform.a12 * x + transform.a22 * y + transform.a32) / denominator,
        };
    };
    for (var y = 0; y < location.dimension; y++) {
        for (var x = 0; x < location.dimension; x++) {
            var xValue = x + 0.5;
            var yValue = y + 0.5;
            var sourcePixel = mappingFunction(xValue, yValue);
            matrix.set(x, y, image.get(Math.floor(sourcePixel.x), Math.floor(sourcePixel.y)));
        }
    }
    return {
        matrix: matrix,
        mappingFunction: mappingFunction,
    };
}
exports.extract = extract;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MAX_FINDERPATTERNS_TO_SEARCH = 4;
var MIN_QUAD_RATIO = 0.5;
var MAX_QUAD_RATIO = 1.5;
var distance = function (a, b) { return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)); };
function sum(values) {
    return values.reduce(function (a, b) { return a + b; });
}
// Takes three finder patterns and organizes them into topLeft, topRight, etc
function reorderFinderPatterns(pattern1, pattern2, pattern3) {
    var _a, _b, _c, _d;
    // Find distances between pattern centers
    var oneTwoDistance = distance(pattern1, pattern2);
    var twoThreeDistance = distance(pattern2, pattern3);
    var oneThreeDistance = distance(pattern1, pattern3);
    var bottomLeft;
    var topLeft;
    var topRight;
    // Assume one closest to other two is B; A and C will just be guesses at first
    if (twoThreeDistance >= oneTwoDistance && twoThreeDistance >= oneThreeDistance) {
        _a = [pattern2, pattern1, pattern3], bottomLeft = _a[0], topLeft = _a[1], topRight = _a[2];
    }
    else if (oneThreeDistance >= twoThreeDistance && oneThreeDistance >= oneTwoDistance) {
        _b = [pattern1, pattern2, pattern3], bottomLeft = _b[0], topLeft = _b[1], topRight = _b[2];
    }
    else {
        _c = [pattern1, pattern3, pattern2], bottomLeft = _c[0], topLeft = _c[1], topRight = _c[2];
    }
    // Use cross product to figure out whether bottomLeft (A) and topRight (C) are correct or flipped in relation to topLeft (B)
    // This asks whether BC x BA has a positive z component, which is the arrangement we want. If it's negative, then
    // we've got it flipped around and should swap topRight and bottomLeft.
    if (((topRight.x - topLeft.x) * (bottomLeft.y - topLeft.y)) - ((topRight.y - topLeft.y) * (bottomLeft.x - topLeft.x)) < 0) {
        _d = [topRight, bottomLeft], bottomLeft = _d[0], topRight = _d[1];
    }
    return { bottomLeft: bottomLeft, topLeft: topLeft, topRight: topRight };
}
// Computes the dimension (number of modules on a side) of the QR Code based on the position of the finder patterns
function computeDimension(topLeft, topRight, bottomLeft, matrix) {
    var moduleSize = (sum(countBlackWhiteRun(topLeft, bottomLeft, matrix, 5)) / 7 + // Divide by 7 since the ratio is 1:1:3:1:1
        sum(countBlackWhiteRun(topLeft, topRight, matrix, 5)) / 7 +
        sum(countBlackWhiteRun(bottomLeft, topLeft, matrix, 5)) / 7 +
        sum(countBlackWhiteRun(topRight, topLeft, matrix, 5)) / 7) / 4;
    if (moduleSize < 1) {
        throw new Error("Invalid module size");
    }
    var topDimension = Math.round(distance(topLeft, topRight) / moduleSize);
    var sideDimension = Math.round(distance(topLeft, bottomLeft) / moduleSize);
    var dimension = Math.floor((topDimension + sideDimension) / 2) + 7;
    switch (dimension % 4) {
        case 0:
            dimension++;
            break;
        case 2:
            dimension--;
            break;
    }
    return { dimension: dimension, moduleSize: moduleSize };
}
// Takes an origin point and an end point and counts the sizes of the black white run from the origin towards the end point.
// Returns an array of elements, representing the pixel size of the black white run.
// Uses a variant of http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
function countBlackWhiteRunTowardsPoint(origin, end, matrix, length) {
    var switchPoints = [{ x: Math.floor(origin.x), y: Math.floor(origin.y) }];
    var steep = Math.abs(end.y - origin.y) > Math.abs(end.x - origin.x);
    var fromX;
    var fromY;
    var toX;
    var toY;
    if (steep) {
        fromX = Math.floor(origin.y);
        fromY = Math.floor(origin.x);
        toX = Math.floor(end.y);
        toY = Math.floor(end.x);
    }
    else {
        fromX = Math.floor(origin.x);
        fromY = Math.floor(origin.y);
        toX = Math.floor(end.x);
        toY = Math.floor(end.y);
    }
    var dx = Math.abs(toX - fromX);
    var dy = Math.abs(toY - fromY);
    var error = Math.floor(-dx / 2);
    var xStep = fromX < toX ? 1 : -1;
    var yStep = fromY < toY ? 1 : -1;
    var currentPixel = true;
    // Loop up until x == toX, but not beyond
    for (var x = fromX, y = fromY; x !== toX + xStep; x += xStep) {
        // Does current pixel mean we have moved white to black or vice versa?
        // Scanning black in state 0,2 and white in state 1, so if we find the wrong
        // color, advance to next state or end if we are in state 2 already
        var realX = steep ? y : x;
        var realY = steep ? x : y;
        if (matrix.get(realX, realY) !== currentPixel) {
            currentPixel = !currentPixel;
            switchPoints.push({ x: realX, y: realY });
            if (switchPoints.length === length + 1) {
                break;
            }
        }
        error += dy;
        if (error > 0) {
            if (y === toY) {
                break;
            }
            y += yStep;
            error -= dx;
        }
    }
    var distances = [];
    for (var i = 0; i < length; i++) {
        if (switchPoints[i] && switchPoints[i + 1]) {
            distances.push(distance(switchPoints[i], switchPoints[i + 1]));
        }
        else {
            distances.push(0);
        }
    }
    return distances;
}
// Takes an origin point and an end point and counts the sizes of the black white run in the origin point
// along the line that intersects with the end point. Returns an array of elements, representing the pixel sizes
// of the black white run. Takes a length which represents the number of switches from black to white to look for.
function countBlackWhiteRun(origin, end, matrix, length) {
    var _a;
    var rise = end.y - origin.y;
    var run = end.x - origin.x;
    var towardsEnd = countBlackWhiteRunTowardsPoint(origin, end, matrix, Math.ceil(length / 2));
    var awayFromEnd = countBlackWhiteRunTowardsPoint(origin, { x: origin.x - run, y: origin.y - rise }, matrix, Math.ceil(length / 2));
    var middleValue = towardsEnd.shift() + awayFromEnd.shift() - 1; // Substract one so we don't double count a pixel
    return (_a = awayFromEnd.concat(middleValue)).concat.apply(_a, towardsEnd);
}
// Takes in a black white run and an array of expected ratios. Returns the average size of the run as well as the "error" -
// that is the amount the run diverges from the expected ratio
function scoreBlackWhiteRun(sequence, ratios) {
    var averageSize = sum(sequence) / sum(ratios);
    var error = 0;
    ratios.forEach(function (ratio, i) {
        error += Math.pow((sequence[i] - ratio * averageSize), 2);
    });
    return { averageSize: averageSize, error: error };
}
// Takes an X,Y point and an array of sizes and scores the point against those ratios.
// For example for a finder pattern takes the ratio list of 1:1:3:1:1 and checks horizontal, vertical and diagonal ratios
// against that.
function scorePattern(point, ratios, matrix) {
    try {
        var horizontalRun = countBlackWhiteRun(point, { x: -1, y: point.y }, matrix, ratios.length);
        var verticalRun = countBlackWhiteRun(point, { x: point.x, y: -1 }, matrix, ratios.length);
        var topLeftPoint = {
            x: Math.max(0, point.x - point.y) - 1,
            y: Math.max(0, point.y - point.x) - 1,
        };
        var topLeftBottomRightRun = countBlackWhiteRun(point, topLeftPoint, matrix, ratios.length);
        var bottomLeftPoint = {
            x: Math.min(matrix.width, point.x + point.y) + 1,
            y: Math.min(matrix.height, point.y + point.x) + 1,
        };
        var bottomLeftTopRightRun = countBlackWhiteRun(point, bottomLeftPoint, matrix, ratios.length);
        var horzError = scoreBlackWhiteRun(horizontalRun, ratios);
        var vertError = scoreBlackWhiteRun(verticalRun, ratios);
        var diagDownError = scoreBlackWhiteRun(topLeftBottomRightRun, ratios);
        var diagUpError = scoreBlackWhiteRun(bottomLeftTopRightRun, ratios);
        var ratioError = Math.sqrt(horzError.error * horzError.error +
            vertError.error * vertError.error +
            diagDownError.error * diagDownError.error +
            diagUpError.error * diagUpError.error);
        var avgSize = (horzError.averageSize + vertError.averageSize + diagDownError.averageSize + diagUpError.averageSize) / 4;
        var sizeError = (Math.pow((horzError.averageSize - avgSize), 2) +
            Math.pow((vertError.averageSize - avgSize), 2) +
            Math.pow((diagDownError.averageSize - avgSize), 2) +
            Math.pow((diagUpError.averageSize - avgSize), 2)) / avgSize;
        return ratioError + sizeError;
    }
    catch (_a) {
        return Infinity;
    }
}
function recenterLocation(matrix, p) {
    var leftX = Math.round(p.x);
    while (matrix.get(leftX, Math.round(p.y))) {
        leftX--;
    }
    var rightX = Math.round(p.x);
    while (matrix.get(rightX, Math.round(p.y))) {
        rightX++;
    }
    var x = (leftX + rightX) / 2;
    var topY = Math.round(p.y);
    while (matrix.get(Math.round(x), topY)) {
        topY--;
    }
    var bottomY = Math.round(p.y);
    while (matrix.get(Math.round(x), bottomY)) {
        bottomY++;
    }
    var y = (topY + bottomY) / 2;
    return { x: x, y: y };
}
function locate(matrix) {
    var finderPatternQuads = [];
    var activeFinderPatternQuads = [];
    var alignmentPatternQuads = [];
    var activeAlignmentPatternQuads = [];
    var _loop_1 = function (y) {
        var length_1 = 0;
        var lastBit = false;
        var scans = [0, 0, 0, 0, 0];
        var _loop_2 = function (x) {
            var v = matrix.get(x, y);
            if (v === lastBit) {
                length_1++;
            }
            else {
                scans = [scans[1], scans[2], scans[3], scans[4], length_1];
                length_1 = 1;
                lastBit = v;
                // Do the last 5 color changes ~ match the expected ratio for a finder pattern? 1:1:3:1:1 of b:w:b:w:b
                var averageFinderPatternBlocksize = sum(scans) / 7;
                var validFinderPattern = Math.abs(scans[0] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[1] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[2] - 3 * averageFinderPatternBlocksize) < 3 * averageFinderPatternBlocksize &&
                    Math.abs(scans[3] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    Math.abs(scans[4] - averageFinderPatternBlocksize) < averageFinderPatternBlocksize &&
                    !v; // And make sure the current pixel is white since finder patterns are bordered in white
                // Do the last 3 color changes ~ match the expected ratio for an alignment pattern? 1:1:1 of w:b:w
                var averageAlignmentPatternBlocksize = sum(scans.slice(-3)) / 3;
                var validAlignmentPattern = Math.abs(scans[2] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    Math.abs(scans[3] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    Math.abs(scans[4] - averageAlignmentPatternBlocksize) < averageAlignmentPatternBlocksize &&
                    v; // Is the current pixel black since alignment patterns are bordered in black
                if (validFinderPattern) {
                    // Compute the start and end x values of the large center black square
                    var endX_1 = x - scans[3] - scans[4];
                    var startX_1 = endX_1 - scans[2];
                    var line = { startX: startX_1, endX: endX_1, y: y };
                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                    // that line as the starting point.
                    var matchingQuads = activeFinderPatternQuads.filter(function (q) {
                        return (startX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
                            (endX_1 >= q.bottom.startX && startX_1 <= q.bottom.endX) ||
                            (startX_1 <= q.bottom.startX && endX_1 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
                    });
                    if (matchingQuads.length > 0) {
                        matchingQuads[0].bottom = line;
                    }
                    else {
                        activeFinderPatternQuads.push({ top: line, bottom: line });
                    }
                }
                if (validAlignmentPattern) {
                    // Compute the start and end x values of the center black square
                    var endX_2 = x - scans[4];
                    var startX_2 = endX_2 - scans[3];
                    var line = { startX: startX_2, y: y, endX: endX_2 };
                    // Is there a quad directly above the current spot? If so, extend it with the new line. Otherwise, create a new quad with
                    // that line as the starting point.
                    var matchingQuads = activeAlignmentPatternQuads.filter(function (q) {
                        return (startX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
                            (endX_2 >= q.bottom.startX && startX_2 <= q.bottom.endX) ||
                            (startX_2 <= q.bottom.startX && endX_2 >= q.bottom.endX && ((scans[2] / (q.bottom.endX - q.bottom.startX)) < MAX_QUAD_RATIO &&
                                (scans[2] / (q.bottom.endX - q.bottom.startX)) > MIN_QUAD_RATIO));
                    });
                    if (matchingQuads.length > 0) {
                        matchingQuads[0].bottom = line;
                    }
                    else {
                        activeAlignmentPatternQuads.push({ top: line, bottom: line });
                    }
                }
            }
        };
        for (var x = -1; x <= matrix.width; x++) {
            _loop_2(x);
        }
        finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y !== y && q.bottom.y - q.top.y >= 2; }));
        activeFinderPatternQuads = activeFinderPatternQuads.filter(function (q) { return q.bottom.y === y; });
        alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y !== y; }));
        activeAlignmentPatternQuads = activeAlignmentPatternQuads.filter(function (q) { return q.bottom.y === y; });
    };
    for (var y = 0; y <= matrix.height; y++) {
        _loop_1(y);
    }
    finderPatternQuads.push.apply(finderPatternQuads, activeFinderPatternQuads.filter(function (q) { return q.bottom.y - q.top.y >= 2; }));
    alignmentPatternQuads.push.apply(alignmentPatternQuads, activeAlignmentPatternQuads);
    var finderPatternGroups = finderPatternQuads
        .filter(function (q) { return q.bottom.y - q.top.y >= 2; }) // All quads must be at least 2px tall since the center square is larger than a block
        .map(function (q) {
        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
        var y = (q.top.y + q.bottom.y + 1) / 2;
        if (!matrix.get(Math.round(x), Math.round(y))) {
            return;
        }
        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, q.bottom.y - q.top.y + 1];
        var size = sum(lengths) / lengths.length;
        var score = scorePattern({ x: Math.round(x), y: Math.round(y) }, [1, 1, 3, 1, 1], matrix);
        return { score: score, x: x, y: y, size: size };
    })
        .filter(function (q) { return !!q; }) // Filter out any rejected quads from above
        .sort(function (a, b) { return a.score - b.score; })
        // Now take the top finder pattern options and try to find 2 other options with a similar size.
        .map(function (point, i, finderPatterns) {
        if (i > MAX_FINDERPATTERNS_TO_SEARCH) {
            return null;
        }
        var otherPoints = finderPatterns
            .filter(function (p, ii) { return i !== ii; })
            .map(function (p) { return ({ x: p.x, y: p.y, score: p.score + (Math.pow((p.size - point.size), 2)) / point.size, size: p.size }); })
            .sort(function (a, b) { return a.score - b.score; });
        if (otherPoints.length < 2) {
            return null;
        }
        var score = point.score + otherPoints[0].score + otherPoints[1].score;
        return { points: [point].concat(otherPoints.slice(0, 2)), score: score };
    })
        .filter(function (q) { return !!q; }) // Filter out any rejected finder patterns from above
        .sort(function (a, b) { return a.score - b.score; });
    if (finderPatternGroups.length === 0) {
        return null;
    }
    var _a = reorderFinderPatterns(finderPatternGroups[0].points[0], finderPatternGroups[0].points[1], finderPatternGroups[0].points[2]), topRight = _a.topRight, topLeft = _a.topLeft, bottomLeft = _a.bottomLeft;
    var alignment = findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft);
    var result = [];
    if (alignment) {
        result.push({
            alignmentPattern: { x: alignment.alignmentPattern.x, y: alignment.alignmentPattern.y },
            bottomLeft: { x: bottomLeft.x, y: bottomLeft.y },
            dimension: alignment.dimension,
            topLeft: { x: topLeft.x, y: topLeft.y },
            topRight: { x: topRight.x, y: topRight.y },
        });
    }
    // We normally use the center of the quads as the location of the tracking points, which is optimal for most cases and will account
    // for a skew in the image. However, In some cases, a slight skew might not be real and instead be caused by image compression
    // errors and/or low resolution. For those cases, we'd be better off centering the point exactly in the middle of the black area. We
    // compute and return the location data for the naively centered points as it is little additional work and allows for multiple
    // attempts at decoding harder images.
    var midTopRight = recenterLocation(matrix, topRight);
    var midTopLeft = recenterLocation(matrix, topLeft);
    var midBottomLeft = recenterLocation(matrix, bottomLeft);
    var centeredAlignment = findAlignmentPattern(matrix, alignmentPatternQuads, midTopRight, midTopLeft, midBottomLeft);
    if (centeredAlignment) {
        result.push({
            alignmentPattern: { x: centeredAlignment.alignmentPattern.x, y: centeredAlignment.alignmentPattern.y },
            bottomLeft: { x: midBottomLeft.x, y: midBottomLeft.y },
            topLeft: { x: midTopLeft.x, y: midTopLeft.y },
            topRight: { x: midTopRight.x, y: midTopRight.y },
            dimension: centeredAlignment.dimension,
        });
    }
    if (result.length === 0) {
        return null;
    }
    return result;
}
exports.locate = locate;
function findAlignmentPattern(matrix, alignmentPatternQuads, topRight, topLeft, bottomLeft) {
    var _a;
    // Now that we've found the three finder patterns we can determine the blockSize and the size of the QR code.
    // We'll use these to help find the alignment pattern but also later when we do the extraction.
    var dimension;
    var moduleSize;
    try {
        (_a = computeDimension(topLeft, topRight, bottomLeft, matrix), dimension = _a.dimension, moduleSize = _a.moduleSize);
    }
    catch (e) {
        return null;
    }
    // Now find the alignment pattern
    var bottomRightFinderPattern = {
        x: topRight.x - topLeft.x + bottomLeft.x,
        y: topRight.y - topLeft.y + bottomLeft.y,
    };
    var modulesBetweenFinderPatterns = ((distance(topLeft, bottomLeft) + distance(topLeft, topRight)) / 2 / moduleSize);
    var correctionToTopLeft = 1 - (3 / modulesBetweenFinderPatterns);
    var expectedAlignmentPattern = {
        x: topLeft.x + correctionToTopLeft * (bottomRightFinderPattern.x - topLeft.x),
        y: topLeft.y + correctionToTopLeft * (bottomRightFinderPattern.y - topLeft.y),
    };
    var alignmentPatterns = alignmentPatternQuads
        .map(function (q) {
        var x = (q.top.startX + q.top.endX + q.bottom.startX + q.bottom.endX) / 4;
        var y = (q.top.y + q.bottom.y + 1) / 2;
        if (!matrix.get(Math.floor(x), Math.floor(y))) {
            return;
        }
        var lengths = [q.top.endX - q.top.startX, q.bottom.endX - q.bottom.startX, (q.bottom.y - q.top.y + 1)];
        var size = sum(lengths) / lengths.length;
        var sizeScore = scorePattern({ x: Math.floor(x), y: Math.floor(y) }, [1, 1, 1], matrix);
        var score = sizeScore + distance({ x: x, y: y }, expectedAlignmentPattern);
        return { x: x, y: y, score: score };
    })
        .filter(function (v) { return !!v; })
        .sort(function (a, b) { return a.score - b.score; });
    // If there are less than 15 modules between finder patterns it's a version 1 QR code and as such has no alignmemnt pattern
    // so we can only use our best guess.
    var alignmentPattern = modulesBetweenFinderPatterns >= 15 && alignmentPatterns.length ? alignmentPatterns[0] : expectedAlignmentPattern;
    return { alignmentPattern: alignmentPattern, dimension: dimension };
}


/***/ })
/******/ ])["default"];
});

/***/ }),

/***/ "../qr-scanner-js-src/src/lib/QRReader.ts":
/*!************************************************!*\
  !*** ../qr-scanner-js-src/src/lib/QRReader.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsqr */ "../qr-scanner-js-src/node_modules/jsqr/dist/jsQR.js");
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsqr__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Coded By : aigenseer
 * Copyright 2021, https://github.com/aigenseer
 */

var QRReader = /** @class */ (function () {
    function QRReader() {
    }
    QRReader.readArrayBuffer = function (buffer, width, height) {
        return this.readUint8ClampedArray(new Uint8ClampedArray(buffer), width, height);
    };
    QRReader.readUint8ClampedArray = function (buffer, width, height) {
        try {
            var code = jsqr__WEBPACK_IMPORTED_MODULE_0___default()(buffer, width, height);
            if (code !== null) {
                return code.data;
            }
            return null;
        }
        catch (err) {
            console.log(err);
            return null;
        }
    };
    return QRReader;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QRReader);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _qr_scanner_js_src_src_lib_QRReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../qr-scanner-js-src/src/lib/QRReader */ "../qr-scanner-js-src/src/lib/QRReader.ts");
/// <reference lib="WebWorker" />

self.onmessage = function (e) {
    if (typeof e.data[0] !== "object" || e.data[0].constructor != ImageData) {
        self.postMessage(null);
    }
    else {
        var imageData = e.data[0];
        var data = _qr_scanner_js_src_src_lib_QRReader__WEBPACK_IMPORTED_MODULE_0__["default"].readUint8ClampedArray(imageData.data, imageData.width, imageData.height);
        self.postMessage(data);
    }
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRSxNQUFNLDRCQUE0Qix3Q0FBd0M7QUFDMUUsTUFBTSw0QkFBNEIsd0NBQXdDO0FBQzFFLE1BQU0sNEJBQTRCLHdDQUF3QztBQUMxRTtBQUNBO0FBQ0EsbUJBQW1CLGlDQUFpQztBQUNwRCxtQkFBbUIseUJBQXlCO0FBQzVDLG1CQUFtQix1QkFBdUI7QUFDMUMsbUJBQW1CLCtCQUErQjtBQUNsRCxtQkFBbUIs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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSwrQ0FBK0MsYUFBYTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDs7O0FBR0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7O0FBRUEsK0NBQStDLGFBQWE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLE9BQU87QUFDUDtBQUNBLGlDQUFpQyxpQ0FBbUI7O0FBRXBEOztBQUVBLCtDQUErQyxh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RCxJQUFJLFNBQVMsR0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBZSxDQUFDO1FBQ3pDLElBQUksSUFBSSxHQUFHLGlHQUE4QixDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMxQjtBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3FyLXNjYW5uZXItd29ya2VyLy4uL3FyLXNjYW5uZXItanMtc3JjL25vZGVfbW9kdWxlcy9qc3FyL2Rpc3QvanNRUi5qcyIsIndlYnBhY2s6Ly9xci1zY2FubmVyLXdvcmtlci8uLi9xci1zY2FubmVyLWpzLXNyYy9zcmMvbGliL1FSUmVhZGVyLnRzIiwid2VicGFjazovL3FyLXNjYW5uZXItd29ya2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3FyLXNjYW5uZXItd29ya2VyL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3FyLXNjYW5uZXItd29ya2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9xci1zY2FubmVyLXdvcmtlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3FyLXNjYW5uZXItd29ya2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcXItc2Nhbm5lci13b3JrZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wianNRUlwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJqc1FSXCJdID0gZmFjdG9yeSgpO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuLyoqKioqKi8gXHRcdFx0aTogbW9kdWxlSWQsXG4vKioqKioqLyBcdFx0XHRsOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4vKioqKioqLyBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4vKioqKioqLyBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuLyoqKioqKi8gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbi8qKioqKiovIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbi8qKioqKiovIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbi8qKioqKiovIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbi8qKioqKiovIFx0XHRcdH0pO1xuLyoqKioqKi8gXHRcdH1cbi8qKioqKiovIFx0fTtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzKTtcbi8qKioqKiovIH0pXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gKFtcbi8qIDAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaXRNYXRyaXggPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQml0TWF0cml4KGRhdGEsIHdpZHRoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBkYXRhLmxlbmd0aCAvIHdpZHRoO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIH1cbiAgICBCaXRNYXRyaXguY3JlYXRlRW1wdHkgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICByZXR1cm4gbmV3IEJpdE1hdHJpeChuZXcgVWludDhDbGFtcGVkQXJyYXkod2lkdGggKiBoZWlnaHQpLCB3aWR0aCk7XG4gICAgfTtcbiAgICBCaXRNYXRyaXgucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIGlmICh4IDwgMCB8fCB4ID49IHRoaXMud2lkdGggfHwgeSA8IDAgfHwgeSA+PSB0aGlzLmhlaWdodCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhIXRoaXMuZGF0YVt5ICogdGhpcy53aWR0aCArIHhdO1xuICAgIH07XG4gICAgQml0TWF0cml4LnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoeCwgeSwgdikge1xuICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMud2lkdGggKyB4XSA9IHYgPyAxIDogMDtcbiAgICB9O1xuICAgIEJpdE1hdHJpeC5wcm90b3R5cGUuc2V0UmVnaW9uID0gZnVuY3Rpb24gKGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCwgdikge1xuICAgICAgICBmb3IgKHZhciB5ID0gdG9wOyB5IDwgdG9wICsgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSBsZWZ0OyB4IDwgbGVmdCArIHdpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldCh4LCB5LCAhIXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQml0TWF0cml4O1xufSgpKTtcbmV4cG9ydHMuQml0TWF0cml4ID0gQml0TWF0cml4O1xuXG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdlbmVyaWNHRlBvbHlfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMik7XG5mdW5jdGlvbiBhZGRPclN1YnRyYWN0R0YoYSwgYikge1xuICAgIHJldHVybiBhIF4gYjsgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1iaXR3aXNlXG59XG5leHBvcnRzLmFkZE9yU3VidHJhY3RHRiA9IGFkZE9yU3VidHJhY3RHRjtcbnZhciBHZW5lcmljR0YgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2VuZXJpY0dGKHByaW1pdGl2ZSwgc2l6ZSwgZ2VuQmFzZSkge1xuICAgICAgICB0aGlzLnByaW1pdGl2ZSA9IHByaW1pdGl2ZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5nZW5lcmF0b3JCYXNlID0gZ2VuQmFzZTtcbiAgICAgICAgdGhpcy5leHBUYWJsZSA9IG5ldyBBcnJheSh0aGlzLnNpemUpO1xuICAgICAgICB0aGlzLmxvZ1RhYmxlID0gbmV3IEFycmF5KHRoaXMuc2l6ZSk7XG4gICAgICAgIHZhciB4ID0gMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNpemU7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5leHBUYWJsZVtpXSA9IHg7XG4gICAgICAgICAgICB4ID0geCAqIDI7XG4gICAgICAgICAgICBpZiAoeCA+PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgICAgICB4ID0gKHggXiB0aGlzLnByaW1pdGl2ZSkgJiAodGhpcy5zaXplIC0gMSk7IC8vIHRzbGludDpkaXNhYmxlLWxpbmU6bm8tYml0d2lzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zaXplIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ1RhYmxlW3RoaXMuZXhwVGFibGVbaV1dID0gaTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnplcm8gPSBuZXcgR2VuZXJpY0dGUG9seV8xLmRlZmF1bHQodGhpcywgVWludDhDbGFtcGVkQXJyYXkuZnJvbShbMF0pKTtcbiAgICAgICAgdGhpcy5vbmUgPSBuZXcgR2VuZXJpY0dGUG9seV8xLmRlZmF1bHQodGhpcywgVWludDhDbGFtcGVkQXJyYXkuZnJvbShbMV0pKTtcbiAgICB9XG4gICAgR2VuZXJpY0dGLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIGlmIChhID09PSAwIHx8IGIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmV4cFRhYmxlWyh0aGlzLmxvZ1RhYmxlW2FdICsgdGhpcy5sb2dUYWJsZVtiXSkgJSAodGhpcy5zaXplIC0gMSldO1xuICAgIH07XG4gICAgR2VuZXJpY0dGLnByb3RvdHlwZS5pbnZlcnNlID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IGludmVydCAwXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmV4cFRhYmxlW3RoaXMuc2l6ZSAtIHRoaXMubG9nVGFibGVbYV0gLSAxXTtcbiAgICB9O1xuICAgIEdlbmVyaWNHRi5wcm90b3R5cGUuYnVpbGRNb25vbWlhbCA9IGZ1bmN0aW9uIChkZWdyZWUsIGNvZWZmaWNpZW50KSB7XG4gICAgICAgIGlmIChkZWdyZWUgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG1vbm9taWFsIGRlZ3JlZSBsZXNzIHRoYW4gMFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnplcm87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvZWZmaWNpZW50cyA9IG5ldyBVaW50OENsYW1wZWRBcnJheShkZWdyZWUgKyAxKTtcbiAgICAgICAgY29lZmZpY2llbnRzWzBdID0gY29lZmZpY2llbnQ7XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJpY0dGUG9seV8xLmRlZmF1bHQodGhpcywgY29lZmZpY2llbnRzKTtcbiAgICB9O1xuICAgIEdlbmVyaWNHRi5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgaWYgKGEgPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHRha2UgbG9nKDApXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmxvZ1RhYmxlW2FdO1xuICAgIH07XG4gICAgR2VuZXJpY0dGLnByb3RvdHlwZS5leHAgPSBmdW5jdGlvbiAoYSkge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBUYWJsZVthXTtcbiAgICB9O1xuICAgIHJldHVybiBHZW5lcmljR0Y7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gR2VuZXJpY0dGO1xuXG5cbi8qKiovIH0pLFxuLyogMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdlbmVyaWNHRl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcbnZhciBHZW5lcmljR0ZQb2x5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdlbmVyaWNHRlBvbHkoZmllbGQsIGNvZWZmaWNpZW50cykge1xuICAgICAgICBpZiAoY29lZmZpY2llbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gY29lZmZpY2llbnRzLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZpZWxkID0gZmllbGQ7XG4gICAgICAgIHZhciBjb2VmZmljaWVudHNMZW5ndGggPSBjb2VmZmljaWVudHMubGVuZ3RoO1xuICAgICAgICBpZiAoY29lZmZpY2llbnRzTGVuZ3RoID4gMSAmJiBjb2VmZmljaWVudHNbMF0gPT09IDApIHtcbiAgICAgICAgICAgIC8vIExlYWRpbmcgdGVybSBtdXN0IGJlIG5vbi16ZXJvIGZvciBhbnl0aGluZyBleGNlcHQgdGhlIGNvbnN0YW50IHBvbHlub21pYWwgXCIwXCJcbiAgICAgICAgICAgIHZhciBmaXJzdE5vblplcm8gPSAxO1xuICAgICAgICAgICAgd2hpbGUgKGZpcnN0Tm9uWmVybyA8IGNvZWZmaWNpZW50c0xlbmd0aCAmJiBjb2VmZmljaWVudHNbZmlyc3ROb25aZXJvXSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0Tm9uWmVybysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZpcnN0Tm9uWmVybyA9PT0gY29lZmZpY2llbnRzTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2VmZmljaWVudHMgPSBmaWVsZC56ZXJvLmNvZWZmaWNpZW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29lZmZpY2llbnRzID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGNvZWZmaWNpZW50c0xlbmd0aCAtIGZpcnN0Tm9uWmVybyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvZWZmaWNpZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvZWZmaWNpZW50c1tpXSA9IGNvZWZmaWNpZW50c1tmaXJzdE5vblplcm8gKyBpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvZWZmaWNpZW50cyA9IGNvZWZmaWNpZW50cztcbiAgICAgICAgfVxuICAgIH1cbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5kZWdyZWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvZWZmaWNpZW50cy5sZW5ndGggLSAxO1xuICAgIH07XG4gICAgR2VuZXJpY0dGUG9seS5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb2VmZmljaWVudHNbMF0gPT09IDA7XG4gICAgfTtcbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5nZXRDb2VmZmljaWVudCA9IGZ1bmN0aW9uIChkZWdyZWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29lZmZpY2llbnRzW3RoaXMuY29lZmZpY2llbnRzLmxlbmd0aCAtIDEgLSBkZWdyZWVdO1xuICAgIH07XG4gICAgR2VuZXJpY0dGUG9seS5wcm90b3R5cGUuYWRkT3JTdWJ0cmFjdCA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLmlzWmVybygpKSB7XG4gICAgICAgICAgICByZXR1cm4gb3RoZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG90aGVyLmlzWmVybygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc21hbGxlckNvZWZmaWNpZW50cyA9IHRoaXMuY29lZmZpY2llbnRzO1xuICAgICAgICB2YXIgbGFyZ2VyQ29lZmZpY2llbnRzID0gb3RoZXIuY29lZmZpY2llbnRzO1xuICAgICAgICBpZiAoc21hbGxlckNvZWZmaWNpZW50cy5sZW5ndGggPiBsYXJnZXJDb2VmZmljaWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBfYSA9IFtsYXJnZXJDb2VmZmljaWVudHMsIHNtYWxsZXJDb2VmZmljaWVudHNdLCBzbWFsbGVyQ29lZmZpY2llbnRzID0gX2FbMF0sIGxhcmdlckNvZWZmaWNpZW50cyA9IF9hWzFdO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdW1EaWZmID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGxhcmdlckNvZWZmaWNpZW50cy5sZW5ndGgpO1xuICAgICAgICB2YXIgbGVuZ3RoRGlmZiA9IGxhcmdlckNvZWZmaWNpZW50cy5sZW5ndGggLSBzbWFsbGVyQ29lZmZpY2llbnRzLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGhEaWZmOyBpKyspIHtcbiAgICAgICAgICAgIHN1bURpZmZbaV0gPSBsYXJnZXJDb2VmZmljaWVudHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IGxlbmd0aERpZmY7IGkgPCBsYXJnZXJDb2VmZmljaWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHN1bURpZmZbaV0gPSBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0Yoc21hbGxlckNvZWZmaWNpZW50c1tpIC0gbGVuZ3RoRGlmZl0sIGxhcmdlckNvZWZmaWNpZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljR0ZQb2x5KHRoaXMuZmllbGQsIHN1bURpZmYpO1xuICAgIH07XG4gICAgR2VuZXJpY0dGUG9seS5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG4gICAgICAgIGlmIChzY2FsYXIgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLnplcm87XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjYWxhciA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLmNvZWZmaWNpZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciBwcm9kdWN0ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHNpemUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgcHJvZHVjdFtpXSA9IHRoaXMuZmllbGQubXVsdGlwbHkodGhpcy5jb2VmZmljaWVudHNbaV0sIHNjYWxhcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmljR0ZQb2x5KHRoaXMuZmllbGQsIHByb2R1Y3QpO1xuICAgIH07XG4gICAgR2VuZXJpY0dGUG9seS5wcm90b3R5cGUubXVsdGlwbHlQb2x5ID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIGlmICh0aGlzLmlzWmVybygpIHx8IG90aGVyLmlzWmVybygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZC56ZXJvO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhQ29lZmZpY2llbnRzID0gdGhpcy5jb2VmZmljaWVudHM7XG4gICAgICAgIHZhciBhTGVuZ3RoID0gYUNvZWZmaWNpZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciBiQ29lZmZpY2llbnRzID0gb3RoZXIuY29lZmZpY2llbnRzO1xuICAgICAgICB2YXIgYkxlbmd0aCA9IGJDb2VmZmljaWVudHMubGVuZ3RoO1xuICAgICAgICB2YXIgcHJvZHVjdCA9IG5ldyBVaW50OENsYW1wZWRBcnJheShhTGVuZ3RoICsgYkxlbmd0aCAtIDEpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGFDb2VmZiA9IGFDb2VmZmljaWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RbaSArIGpdID0gR2VuZXJpY0dGXzEuYWRkT3JTdWJ0cmFjdEdGKHByb2R1Y3RbaSArIGpdLCB0aGlzLmZpZWxkLm11bHRpcGx5KGFDb2VmZiwgYkNvZWZmaWNpZW50c1tqXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgR2VuZXJpY0dGUG9seSh0aGlzLmZpZWxkLCBwcm9kdWN0KTtcbiAgICB9O1xuICAgIEdlbmVyaWNHRlBvbHkucHJvdG90eXBlLm11bHRpcGx5QnlNb25vbWlhbCA9IGZ1bmN0aW9uIChkZWdyZWUsIGNvZWZmaWNpZW50KSB7XG4gICAgICAgIGlmIChkZWdyZWUgPCAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRlZ3JlZSBsZXNzIHRoYW4gMFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLnplcm87XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNpemUgPSB0aGlzLmNvZWZmaWNpZW50cy5sZW5ndGg7XG4gICAgICAgIHZhciBwcm9kdWN0ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHNpemUgKyBkZWdyZWUpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgcHJvZHVjdFtpXSA9IHRoaXMuZmllbGQubXVsdGlwbHkodGhpcy5jb2VmZmljaWVudHNbaV0sIGNvZWZmaWNpZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEdlbmVyaWNHRlBvbHkodGhpcy5maWVsZCwgcHJvZHVjdCk7XG4gICAgfTtcbiAgICBHZW5lcmljR0ZQb2x5LnByb3RvdHlwZS5ldmFsdWF0ZUF0ID0gZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIGlmIChhID09PSAwKSB7XG4gICAgICAgICAgICAvLyBKdXN0IHJldHVybiB0aGUgeF4wIGNvZWZmaWNpZW50XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb2VmZmljaWVudCgwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2l6ZSA9IHRoaXMuY29lZmZpY2llbnRzLmxlbmd0aDtcbiAgICAgICAgaWYgKGEgPT09IDEpIHtcbiAgICAgICAgICAgIC8vIEp1c3QgdGhlIHN1bSBvZiB0aGUgY29lZmZpY2llbnRzXG4gICAgICAgICAgICB0aGlzLmNvZWZmaWNpZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChjb2VmZmljaWVudCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEdlbmVyaWNHRl8xLmFkZE9yU3VidHJhY3RHRihyZXN1bHQsIGNvZWZmaWNpZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSB0aGlzLmNvZWZmaWNpZW50c1swXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEdlbmVyaWNHRl8xLmFkZE9yU3VidHJhY3RHRih0aGlzLmZpZWxkLm11bHRpcGx5KGEsIHJlc3VsdCksIHRoaXMuY29lZmZpY2llbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgcmV0dXJuIEdlbmVyaWNHRlBvbHk7XG59KCkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gR2VuZXJpY0dGUG9seTtcblxuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBiaW5hcml6ZXJfMSA9IF9fd2VicGFja19yZXF1aXJlX18oNCk7XG52YXIgZGVjb2Rlcl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg1KTtcbnZhciBleHRyYWN0b3JfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMTEpO1xudmFyIGxvY2F0b3JfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMTIpO1xuZnVuY3Rpb24gc2NhbihtYXRyaXgpIHtcbiAgICB2YXIgbG9jYXRpb25zID0gbG9jYXRvcl8xLmxvY2F0ZShtYXRyaXgpO1xuICAgIGlmICghbG9jYXRpb25zKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBmb3IgKHZhciBfaSA9IDAsIGxvY2F0aW9uc18xID0gbG9jYXRpb25zOyBfaSA8IGxvY2F0aW9uc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgbG9jYXRpb25fMSA9IGxvY2F0aW9uc18xW19pXTtcbiAgICAgICAgdmFyIGV4dHJhY3RlZCA9IGV4dHJhY3Rvcl8xLmV4dHJhY3QobWF0cml4LCBsb2NhdGlvbl8xKTtcbiAgICAgICAgdmFyIGRlY29kZWQgPSBkZWNvZGVyXzEuZGVjb2RlKGV4dHJhY3RlZC5tYXRyaXgpO1xuICAgICAgICBpZiAoZGVjb2RlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBiaW5hcnlEYXRhOiBkZWNvZGVkLmJ5dGVzLFxuICAgICAgICAgICAgICAgIGRhdGE6IGRlY29kZWQudGV4dCxcbiAgICAgICAgICAgICAgICBjaHVua3M6IGRlY29kZWQuY2h1bmtzLFxuICAgICAgICAgICAgICAgIHZlcnNpb246IGRlY29kZWQudmVyc2lvbixcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB0b3BSaWdodENvcm5lcjogZXh0cmFjdGVkLm1hcHBpbmdGdW5jdGlvbihsb2NhdGlvbl8xLmRpbWVuc2lvbiwgMCksXG4gICAgICAgICAgICAgICAgICAgIHRvcExlZnRDb3JuZXI6IGV4dHJhY3RlZC5tYXBwaW5nRnVuY3Rpb24oMCwgMCksXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbVJpZ2h0Q29ybmVyOiBleHRyYWN0ZWQubWFwcGluZ0Z1bmN0aW9uKGxvY2F0aW9uXzEuZGltZW5zaW9uLCBsb2NhdGlvbl8xLmRpbWVuc2lvbiksXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUxlZnRDb3JuZXI6IGV4dHJhY3RlZC5tYXBwaW5nRnVuY3Rpb24oMCwgbG9jYXRpb25fMS5kaW1lbnNpb24pLFxuICAgICAgICAgICAgICAgICAgICB0b3BSaWdodEZpbmRlclBhdHRlcm46IGxvY2F0aW9uXzEudG9wUmlnaHQsXG4gICAgICAgICAgICAgICAgICAgIHRvcExlZnRGaW5kZXJQYXR0ZXJuOiBsb2NhdGlvbl8xLnRvcExlZnQsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbUxlZnRGaW5kZXJQYXR0ZXJuOiBsb2NhdGlvbl8xLmJvdHRvbUxlZnQsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbVJpZ2h0QWxpZ25tZW50UGF0dGVybjogbG9jYXRpb25fMS5hbGlnbm1lbnRQYXR0ZXJuLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGludmVyc2lvbkF0dGVtcHRzOiBcImF0dGVtcHRCb3RoXCIsXG59O1xuZnVuY3Rpb24ganNRUihkYXRhLCB3aWR0aCwgaGVpZ2h0LCBwcm92aWRlZE9wdGlvbnMpIHtcbiAgICBpZiAocHJvdmlkZWRPcHRpb25zID09PSB2b2lkIDApIHsgcHJvdmlkZWRPcHRpb25zID0ge307IH1cbiAgICB2YXIgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIE9iamVjdC5rZXlzKG9wdGlvbnMgfHwge30pLmZvckVhY2goZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICBvcHRpb25zW29wdF0gPSBwcm92aWRlZE9wdGlvbnNbb3B0XSB8fCBvcHRpb25zW29wdF07XG4gICAgfSk7XG4gICAgdmFyIHNob3VsZEludmVydCA9IG9wdGlvbnMuaW52ZXJzaW9uQXR0ZW1wdHMgPT09IFwiYXR0ZW1wdEJvdGhcIiB8fCBvcHRpb25zLmludmVyc2lvbkF0dGVtcHRzID09PSBcImludmVydEZpcnN0XCI7XG4gICAgdmFyIHRyeUludmVydGVkRmlyc3QgPSBvcHRpb25zLmludmVyc2lvbkF0dGVtcHRzID09PSBcIm9ubHlJbnZlcnRcIiB8fCBvcHRpb25zLmludmVyc2lvbkF0dGVtcHRzID09PSBcImludmVydEZpcnN0XCI7XG4gICAgdmFyIF9hID0gYmluYXJpemVyXzEuYmluYXJpemUoZGF0YSwgd2lkdGgsIGhlaWdodCwgc2hvdWxkSW52ZXJ0KSwgYmluYXJpemVkID0gX2EuYmluYXJpemVkLCBpbnZlcnRlZCA9IF9hLmludmVydGVkO1xuICAgIHZhciByZXN1bHQgPSBzY2FuKHRyeUludmVydGVkRmlyc3QgPyBpbnZlcnRlZCA6IGJpbmFyaXplZCk7XG4gICAgaWYgKCFyZXN1bHQgJiYgKG9wdGlvbnMuaW52ZXJzaW9uQXR0ZW1wdHMgPT09IFwiYXR0ZW1wdEJvdGhcIiB8fCBvcHRpb25zLmludmVyc2lvbkF0dGVtcHRzID09PSBcImludmVydEZpcnN0XCIpKSB7XG4gICAgICAgIHJlc3VsdCA9IHNjYW4odHJ5SW52ZXJ0ZWRGaXJzdCA/IGJpbmFyaXplZCA6IGludmVydGVkKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmpzUVIuZGVmYXVsdCA9IGpzUVI7XG5leHBvcnRzLmRlZmF1bHQgPSBqc1FSO1xuXG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEJpdE1hdHJpeF8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcbnZhciBSRUdJT05fU0laRSA9IDg7XG52YXIgTUlOX0RZTkFNSUNfUkFOR0UgPSAyNDtcbmZ1bmN0aW9uIG51bUJldHdlZW4odmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIHZhbHVlIDwgbWluID8gbWluIDogdmFsdWUgPiBtYXggPyBtYXggOiB2YWx1ZTtcbn1cbi8vIExpa2UgQml0TWF0cml4IGJ1dCBhY2NlcHRzIGFyYml0cnkgVWludDggdmFsdWVzXG52YXIgTWF0cml4ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hdHJpeCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgdGhpcy5kYXRhID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHdpZHRoICogaGVpZ2h0KTtcbiAgICB9XG4gICAgTWF0cml4LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW3kgKiB0aGlzLndpZHRoICsgeF07XG4gICAgfTtcbiAgICBNYXRyaXgucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh4LCB5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmRhdGFbeSAqIHRoaXMud2lkdGggKyB4XSA9IHZhbHVlO1xuICAgIH07XG4gICAgcmV0dXJuIE1hdHJpeDtcbn0oKSk7XG5mdW5jdGlvbiBiaW5hcml6ZShkYXRhLCB3aWR0aCwgaGVpZ2h0LCByZXR1cm5JbnZlcnRlZCkge1xuICAgIGlmIChkYXRhLmxlbmd0aCAhPT0gd2lkdGggKiBoZWlnaHQgKiA0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hbGZvcm1lZCBkYXRhIHBhc3NlZCB0byBiaW5hcml6ZXIuXCIpO1xuICAgIH1cbiAgICAvLyBDb252ZXJ0IGltYWdlIHRvIGdyZXlzY2FsZVxuICAgIHZhciBncmV5c2NhbGVQaXhlbHMgPSBuZXcgTWF0cml4KHdpZHRoLCBoZWlnaHQpO1xuICAgIGZvciAodmFyIHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICB2YXIgciA9IGRhdGFbKCh5ICogd2lkdGggKyB4KSAqIDQpICsgMF07XG4gICAgICAgICAgICB2YXIgZyA9IGRhdGFbKCh5ICogd2lkdGggKyB4KSAqIDQpICsgMV07XG4gICAgICAgICAgICB2YXIgYiA9IGRhdGFbKCh5ICogd2lkdGggKyB4KSAqIDQpICsgMl07XG4gICAgICAgICAgICBncmV5c2NhbGVQaXhlbHMuc2V0KHgsIHksIDAuMjEyNiAqIHIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogYik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGhvcml6b250YWxSZWdpb25Db3VudCA9IE1hdGguY2VpbCh3aWR0aCAvIFJFR0lPTl9TSVpFKTtcbiAgICB2YXIgdmVydGljYWxSZWdpb25Db3VudCA9IE1hdGguY2VpbChoZWlnaHQgLyBSRUdJT05fU0laRSk7XG4gICAgdmFyIGJsYWNrUG9pbnRzID0gbmV3IE1hdHJpeChob3Jpem9udGFsUmVnaW9uQ291bnQsIHZlcnRpY2FsUmVnaW9uQ291bnQpO1xuICAgIGZvciAodmFyIHZlcnRpY2FsUmVnaW9uID0gMDsgdmVydGljYWxSZWdpb24gPCB2ZXJ0aWNhbFJlZ2lvbkNvdW50OyB2ZXJ0aWNhbFJlZ2lvbisrKSB7XG4gICAgICAgIGZvciAodmFyIGhvcnRpem9udGFsUmVnaW9uID0gMDsgaG9ydGl6b250YWxSZWdpb24gPCBob3Jpem9udGFsUmVnaW9uQ291bnQ7IGhvcnRpem9udGFsUmVnaW9uKyspIHtcbiAgICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgICAgdmFyIG1pbiA9IEluZmluaXR5O1xuICAgICAgICAgICAgdmFyIG1heCA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMDsgeSA8IFJFR0lPTl9TSVpFOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0gMDsgeCA8IFJFR0lPTl9TSVpFOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBpeGVsTHVtb3NpdHkgPSBncmV5c2NhbGVQaXhlbHMuZ2V0KGhvcnRpem9udGFsUmVnaW9uICogUkVHSU9OX1NJWkUgKyB4LCB2ZXJ0aWNhbFJlZ2lvbiAqIFJFR0lPTl9TSVpFICsgeSk7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBwaXhlbEx1bW9zaXR5O1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBNYXRoLm1pbihtaW4sIHBpeGVsTHVtb3NpdHkpO1xuICAgICAgICAgICAgICAgICAgICBtYXggPSBNYXRoLm1heChtYXgsIHBpeGVsTHVtb3NpdHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBhdmVyYWdlID0gc3VtIC8gKE1hdGgucG93KFJFR0lPTl9TSVpFLCAyKSk7XG4gICAgICAgICAgICBpZiAobWF4IC0gbWluIDw9IE1JTl9EWU5BTUlDX1JBTkdFKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdmFyaWF0aW9uIHdpdGhpbiB0aGUgYmxvY2sgaXMgbG93LCBhc3N1bWUgdGhpcyBpcyBhIGJsb2NrIHdpdGggb25seSBsaWdodCBvciBvbmx5XG4gICAgICAgICAgICAgICAgLy8gZGFyayBwaXhlbHMuIEluIHRoYXQgY2FzZSB3ZSBkbyBub3Qgd2FudCB0byB1c2UgdGhlIGF2ZXJhZ2UsIGFzIGl0IHdvdWxkIGRpdmlkZSB0aGlzXG4gICAgICAgICAgICAgICAgLy8gbG93IGNvbnRyYXN0IGFyZWEgaW50byBibGFjayBhbmQgd2hpdGUgcGl4ZWxzLCBlc3NlbnRpYWxseSBjcmVhdGluZyBkYXRhIG91dCBvZiBub2lzZS5cbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIERlZmF1bHQgdGhlIGJsYWNrcG9pbnQgZm9yIHRoZXNlIGJsb2NrcyB0byBiZSBoYWxmIHRoZSBtaW4gLSBlZmZlY3RpdmVseSB3aGl0ZSB0aGVtIG91dFxuICAgICAgICAgICAgICAgIGF2ZXJhZ2UgPSBtaW4gLyAyO1xuICAgICAgICAgICAgICAgIGlmICh2ZXJ0aWNhbFJlZ2lvbiA+IDAgJiYgaG9ydGl6b250YWxSZWdpb24gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvcnJlY3QgdGhlIFwid2hpdGUgYmFja2dyb3VuZFwiIGFzc3VtcHRpb24gZm9yIGJsb2NrcyB0aGF0IGhhdmUgbmVpZ2hib3JzIGJ5IGNvbXBhcmluZ1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgcGl4ZWxzIGluIHRoaXMgYmxvY2sgdG8gdGhlIHByZXZpb3VzbHkgY2FsY3VsYXRlZCBibGFjayBwb2ludHMuIFRoaXMgaXMgYmFzZWQgb25cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGZhY3QgdGhhdCBkYXJrIGJhcmNvZGUgc3ltYm9sb2d5IGlzIGFsd2F5cyBzdXJyb3VuZGVkIGJ5IHNvbWUgYW1vdW50IG9mIGxpZ2h0XG4gICAgICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmQgZm9yIHdoaWNoIHJlYXNvbmFibGUgYmxhY2sgcG9pbnQgZXN0aW1hdGVzIHdlcmUgbWFkZS4gVGhlIGJwIGVzdGltYXRlZCBhdFxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYm91bmRhcmllcyBpcyB1c2VkIGZvciB0aGUgaW50ZXJpb3IuXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSAobWluIDwgYnApIGlzIGFyYml0cmFyeSBidXQgd29ya3MgYmV0dGVyIHRoYW4gb3RoZXIgaGV1cmlzdGljcyB0aGF0IHdlcmUgdHJpZWQuXG4gICAgICAgICAgICAgICAgICAgIHZhciBhdmVyYWdlTmVpZ2hib3JCbGFja1BvaW50ID0gKGJsYWNrUG9pbnRzLmdldChob3J0aXpvbnRhbFJlZ2lvbiwgdmVydGljYWxSZWdpb24gLSAxKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAoMiAqIGJsYWNrUG9pbnRzLmdldChob3J0aXpvbnRhbFJlZ2lvbiAtIDEsIHZlcnRpY2FsUmVnaW9uKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxhY2tQb2ludHMuZ2V0KGhvcnRpem9udGFsUmVnaW9uIC0gMSwgdmVydGljYWxSZWdpb24gLSAxKSkgLyA0O1xuICAgICAgICAgICAgICAgICAgICBpZiAobWluIDwgYXZlcmFnZU5laWdoYm9yQmxhY2tQb2ludCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXZlcmFnZSA9IGF2ZXJhZ2VOZWlnaGJvckJsYWNrUG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBibGFja1BvaW50cy5zZXQoaG9ydGl6b250YWxSZWdpb24sIHZlcnRpY2FsUmVnaW9uLCBhdmVyYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgYmluYXJpemVkID0gQml0TWF0cml4XzEuQml0TWF0cml4LmNyZWF0ZUVtcHR5KHdpZHRoLCBoZWlnaHQpO1xuICAgIHZhciBpbnZlcnRlZCA9IG51bGw7XG4gICAgaWYgKHJldHVybkludmVydGVkKSB7XG4gICAgICAgIGludmVydGVkID0gQml0TWF0cml4XzEuQml0TWF0cml4LmNyZWF0ZUVtcHR5KHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICBmb3IgKHZhciB2ZXJ0aWNhbFJlZ2lvbiA9IDA7IHZlcnRpY2FsUmVnaW9uIDwgdmVydGljYWxSZWdpb25Db3VudDsgdmVydGljYWxSZWdpb24rKykge1xuICAgICAgICBmb3IgKHZhciBob3J0aXpvbnRhbFJlZ2lvbiA9IDA7IGhvcnRpem9udGFsUmVnaW9uIDwgaG9yaXpvbnRhbFJlZ2lvbkNvdW50OyBob3J0aXpvbnRhbFJlZ2lvbisrKSB7XG4gICAgICAgICAgICB2YXIgbGVmdCA9IG51bUJldHdlZW4oaG9ydGl6b250YWxSZWdpb24sIDIsIGhvcml6b250YWxSZWdpb25Db3VudCAtIDMpO1xuICAgICAgICAgICAgdmFyIHRvcF8xID0gbnVtQmV0d2Vlbih2ZXJ0aWNhbFJlZ2lvbiwgMiwgdmVydGljYWxSZWdpb25Db3VudCAtIDMpO1xuICAgICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciB4UmVnaW9uID0gLTI7IHhSZWdpb24gPD0gMjsgeFJlZ2lvbisrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeVJlZ2lvbiA9IC0yOyB5UmVnaW9uIDw9IDI7IHlSZWdpb24rKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gYmxhY2tQb2ludHMuZ2V0KGxlZnQgKyB4UmVnaW9uLCB0b3BfMSArIHlSZWdpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0aHJlc2hvbGQgPSBzdW0gLyAyNTtcbiAgICAgICAgICAgIGZvciAodmFyIHhSZWdpb24gPSAwOyB4UmVnaW9uIDwgUkVHSU9OX1NJWkU7IHhSZWdpb24rKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHlSZWdpb24gPSAwOyB5UmVnaW9uIDwgUkVHSU9OX1NJWkU7IHlSZWdpb24rKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeCA9IGhvcnRpem9udGFsUmVnaW9uICogUkVHSU9OX1NJWkUgKyB4UmVnaW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeSA9IHZlcnRpY2FsUmVnaW9uICogUkVHSU9OX1NJWkUgKyB5UmVnaW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbHVtID0gZ3JleXNjYWxlUGl4ZWxzLmdldCh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgYmluYXJpemVkLnNldCh4LCB5LCBsdW0gPD0gdGhyZXNob2xkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybkludmVydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnZlcnRlZC5zZXQoeCwgeSwgIShsdW0gPD0gdGhyZXNob2xkKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJldHVybkludmVydGVkKSB7XG4gICAgICAgIHJldHVybiB7IGJpbmFyaXplZDogYmluYXJpemVkLCBpbnZlcnRlZDogaW52ZXJ0ZWQgfTtcbiAgICB9XG4gICAgcmV0dXJuIHsgYmluYXJpemVkOiBiaW5hcml6ZWQgfTtcbn1cbmV4cG9ydHMuYmluYXJpemUgPSBiaW5hcml6ZTtcblxuXG4vKioqLyB9KSxcbi8qIDUgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaXRNYXRyaXhfMSA9IF9fd2VicGFja19yZXF1aXJlX18oMCk7XG52YXIgZGVjb2RlRGF0YV8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KTtcbnZhciByZWVkc29sb21vbl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KTtcbnZhciB2ZXJzaW9uXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEwKTtcbi8vIHRzbGludDpkaXNhYmxlOm5vLWJpdHdpc2VcbmZ1bmN0aW9uIG51bUJpdHNEaWZmZXJpbmcoeCwgeSkge1xuICAgIHZhciB6ID0geCBeIHk7XG4gICAgdmFyIGJpdENvdW50ID0gMDtcbiAgICB3aGlsZSAoeikge1xuICAgICAgICBiaXRDb3VudCsrO1xuICAgICAgICB6ICY9IHogLSAxO1xuICAgIH1cbiAgICByZXR1cm4gYml0Q291bnQ7XG59XG5mdW5jdGlvbiBwdXNoQml0KGJpdCwgYnl0ZSkge1xuICAgIHJldHVybiAoYnl0ZSA8PCAxKSB8IGJpdDtcbn1cbi8vIHRzbGludDplbmFibGU6bm8tYml0d2lzZVxudmFyIEZPUk1BVF9JTkZPX1RBQkxFID0gW1xuICAgIHsgYml0czogMHg1NDEyLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAxLCBkYXRhTWFzazogMCB9IH0sXG4gICAgeyBiaXRzOiAweDUxMjUsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDEsIGRhdGFNYXNrOiAxIH0gfSxcbiAgICB7IGJpdHM6IDB4NUU3QywgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMSwgZGF0YU1hc2s6IDIgfSB9LFxuICAgIHsgYml0czogMHg1QjRCLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAxLCBkYXRhTWFzazogMyB9IH0sXG4gICAgeyBiaXRzOiAweDQ1RjksIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDEsIGRhdGFNYXNrOiA0IH0gfSxcbiAgICB7IGJpdHM6IDB4NDBDRSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMSwgZGF0YU1hc2s6IDUgfSB9LFxuICAgIHsgYml0czogMHg0Rjk3LCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAxLCBkYXRhTWFzazogNiB9IH0sXG4gICAgeyBiaXRzOiAweDRBQTAsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDEsIGRhdGFNYXNrOiA3IH0gfSxcbiAgICB7IGJpdHM6IDB4NzdDNCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMCwgZGF0YU1hc2s6IDAgfSB9LFxuICAgIHsgYml0czogMHg3MkYzLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAwLCBkYXRhTWFzazogMSB9IH0sXG4gICAgeyBiaXRzOiAweDdEQUEsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDAsIGRhdGFNYXNrOiAyIH0gfSxcbiAgICB7IGJpdHM6IDB4Nzg5RCwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMCwgZGF0YU1hc2s6IDMgfSB9LFxuICAgIHsgYml0czogMHg2NjJGLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAwLCBkYXRhTWFzazogNCB9IH0sXG4gICAgeyBiaXRzOiAweDYzMTgsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDAsIGRhdGFNYXNrOiA1IH0gfSxcbiAgICB7IGJpdHM6IDB4NkM0MSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMCwgZGF0YU1hc2s6IDYgfSB9LFxuICAgIHsgYml0czogMHg2OTc2LCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAwLCBkYXRhTWFzazogNyB9IH0sXG4gICAgeyBiaXRzOiAweDE2ODksIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDMsIGRhdGFNYXNrOiAwIH0gfSxcbiAgICB7IGJpdHM6IDB4MTNCRSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMywgZGF0YU1hc2s6IDEgfSB9LFxuICAgIHsgYml0czogMHgxQ0U3LCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAzLCBkYXRhTWFzazogMiB9IH0sXG4gICAgeyBiaXRzOiAweDE5RDAsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDMsIGRhdGFNYXNrOiAzIH0gfSxcbiAgICB7IGJpdHM6IDB4MDc2MiwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMywgZGF0YU1hc2s6IDQgfSB9LFxuICAgIHsgYml0czogMHgwMjU1LCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAzLCBkYXRhTWFzazogNSB9IH0sXG4gICAgeyBiaXRzOiAweDBEMEMsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDMsIGRhdGFNYXNrOiA2IH0gfSxcbiAgICB7IGJpdHM6IDB4MDgzQiwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMywgZGF0YU1hc2s6IDcgfSB9LFxuICAgIHsgYml0czogMHgzNTVGLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAyLCBkYXRhTWFzazogMCB9IH0sXG4gICAgeyBiaXRzOiAweDMwNjgsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDIsIGRhdGFNYXNrOiAxIH0gfSxcbiAgICB7IGJpdHM6IDB4M0YzMSwgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMiwgZGF0YU1hc2s6IDIgfSB9LFxuICAgIHsgYml0czogMHgzQTA2LCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAyLCBkYXRhTWFzazogMyB9IH0sXG4gICAgeyBiaXRzOiAweDI0QjQsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDIsIGRhdGFNYXNrOiA0IH0gfSxcbiAgICB7IGJpdHM6IDB4MjE4MywgZm9ybWF0SW5mbzogeyBlcnJvckNvcnJlY3Rpb25MZXZlbDogMiwgZGF0YU1hc2s6IDUgfSB9LFxuICAgIHsgYml0czogMHgyRURBLCBmb3JtYXRJbmZvOiB7IGVycm9yQ29ycmVjdGlvbkxldmVsOiAyLCBkYXRhTWFzazogNiB9IH0sXG4gICAgeyBiaXRzOiAweDJCRUQsIGZvcm1hdEluZm86IHsgZXJyb3JDb3JyZWN0aW9uTGV2ZWw6IDIsIGRhdGFNYXNrOiA3IH0gfSxcbl07XG52YXIgREFUQV9NQVNLUyA9IFtcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gKChwLnkgKyBwLngpICUgMikgPT09IDA7IH0sXG4gICAgZnVuY3Rpb24gKHApIHsgcmV0dXJuIChwLnkgJSAyKSA9PT0gMDsgfSxcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gcC54ICUgMyA9PT0gMDsgfSxcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gKHAueSArIHAueCkgJSAzID09PSAwOyB9LFxuICAgIGZ1bmN0aW9uIChwKSB7IHJldHVybiAoTWF0aC5mbG9vcihwLnkgLyAyKSArIE1hdGguZmxvb3IocC54IC8gMykpICUgMiA9PT0gMDsgfSxcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gKChwLnggKiBwLnkpICUgMikgKyAoKHAueCAqIHAueSkgJSAzKSA9PT0gMDsgfSxcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gKCgoKHAueSAqIHAueCkgJSAyKSArIChwLnkgKiBwLngpICUgMykgJSAyKSA9PT0gMDsgfSxcbiAgICBmdW5jdGlvbiAocCkgeyByZXR1cm4gKCgoKHAueSArIHAueCkgJSAyKSArIChwLnkgKiBwLngpICUgMykgJSAyKSA9PT0gMDsgfSxcbl07XG5mdW5jdGlvbiBidWlsZEZ1bmN0aW9uUGF0dGVybk1hc2sodmVyc2lvbikge1xuICAgIHZhciBkaW1lbnNpb24gPSAxNyArIDQgKiB2ZXJzaW9uLnZlcnNpb25OdW1iZXI7XG4gICAgdmFyIG1hdHJpeCA9IEJpdE1hdHJpeF8xLkJpdE1hdHJpeC5jcmVhdGVFbXB0eShkaW1lbnNpb24sIGRpbWVuc2lvbik7XG4gICAgbWF0cml4LnNldFJlZ2lvbigwLCAwLCA5LCA5LCB0cnVlKTsgLy8gVG9wIGxlZnQgZmluZGVyIHBhdHRlcm4gKyBzZXBhcmF0b3IgKyBmb3JtYXRcbiAgICBtYXRyaXguc2V0UmVnaW9uKGRpbWVuc2lvbiAtIDgsIDAsIDgsIDksIHRydWUpOyAvLyBUb3AgcmlnaHQgZmluZGVyIHBhdHRlcm4gKyBzZXBhcmF0b3IgKyBmb3JtYXRcbiAgICBtYXRyaXguc2V0UmVnaW9uKDAsIGRpbWVuc2lvbiAtIDgsIDksIDgsIHRydWUpOyAvLyBCb3R0b20gbGVmdCBmaW5kZXIgcGF0dGVybiArIHNlcGFyYXRvciArIGZvcm1hdFxuICAgIC8vIEFsaWdubWVudCBwYXR0ZXJuc1xuICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB2ZXJzaW9uLmFsaWdubWVudFBhdHRlcm5DZW50ZXJzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgeCA9IF9hW19pXTtcbiAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHZlcnNpb24uYWxpZ25tZW50UGF0dGVybkNlbnRlcnM7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICB2YXIgeSA9IF9jW19iXTtcbiAgICAgICAgICAgIGlmICghKHggPT09IDYgJiYgeSA9PT0gNiB8fCB4ID09PSA2ICYmIHkgPT09IGRpbWVuc2lvbiAtIDcgfHwgeCA9PT0gZGltZW5zaW9uIC0gNyAmJiB5ID09PSA2KSkge1xuICAgICAgICAgICAgICAgIG1hdHJpeC5zZXRSZWdpb24oeCAtIDIsIHkgLSAyLCA1LCA1LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtYXRyaXguc2V0UmVnaW9uKDYsIDksIDEsIGRpbWVuc2lvbiAtIDE3LCB0cnVlKTsgLy8gVmVydGljYWwgdGltaW5nIHBhdHRlcm5cbiAgICBtYXRyaXguc2V0UmVnaW9uKDksIDYsIGRpbWVuc2lvbiAtIDE3LCAxLCB0cnVlKTsgLy8gSG9yaXpvbnRhbCB0aW1pbmcgcGF0dGVyblxuICAgIGlmICh2ZXJzaW9uLnZlcnNpb25OdW1iZXIgPiA2KSB7XG4gICAgICAgIG1hdHJpeC5zZXRSZWdpb24oZGltZW5zaW9uIC0gMTEsIDAsIDMsIDYsIHRydWUpOyAvLyBWZXJzaW9uIGluZm8sIHRvcCByaWdodFxuICAgICAgICBtYXRyaXguc2V0UmVnaW9uKDAsIGRpbWVuc2lvbiAtIDExLCA2LCAzLCB0cnVlKTsgLy8gVmVyc2lvbiBpbmZvLCBib3R0b20gbGVmdFxuICAgIH1cbiAgICByZXR1cm4gbWF0cml4O1xufVxuZnVuY3Rpb24gcmVhZENvZGV3b3JkcyhtYXRyaXgsIHZlcnNpb24sIGZvcm1hdEluZm8pIHtcbiAgICB2YXIgZGF0YU1hc2sgPSBEQVRBX01BU0tTW2Zvcm1hdEluZm8uZGF0YU1hc2tdO1xuICAgIHZhciBkaW1lbnNpb24gPSBtYXRyaXguaGVpZ2h0O1xuICAgIHZhciBmdW5jdGlvblBhdHRlcm5NYXNrID0gYnVpbGRGdW5jdGlvblBhdHRlcm5NYXNrKHZlcnNpb24pO1xuICAgIHZhciBjb2Rld29yZHMgPSBbXTtcbiAgICB2YXIgY3VycmVudEJ5dGUgPSAwO1xuICAgIHZhciBiaXRzUmVhZCA9IDA7XG4gICAgLy8gUmVhZCBjb2x1bW5zIGluIHBhaXJzLCBmcm9tIHJpZ2h0IHRvIGxlZnRcbiAgICB2YXIgcmVhZGluZ1VwID0gdHJ1ZTtcbiAgICBmb3IgKHZhciBjb2x1bW5JbmRleCA9IGRpbWVuc2lvbiAtIDE7IGNvbHVtbkluZGV4ID4gMDsgY29sdW1uSW5kZXggLT0gMikge1xuICAgICAgICBpZiAoY29sdW1uSW5kZXggPT09IDYpIHsgLy8gU2tpcCB3aG9sZSBjb2x1bW4gd2l0aCB2ZXJ0aWNhbCBhbGlnbm1lbnQgcGF0dGVybjtcbiAgICAgICAgICAgIGNvbHVtbkluZGV4LS07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaW1lbnNpb247IGkrKykge1xuICAgICAgICAgICAgdmFyIHkgPSByZWFkaW5nVXAgPyBkaW1lbnNpb24gLSAxIC0gaSA6IGk7XG4gICAgICAgICAgICBmb3IgKHZhciBjb2x1bW5PZmZzZXQgPSAwOyBjb2x1bW5PZmZzZXQgPCAyOyBjb2x1bW5PZmZzZXQrKykge1xuICAgICAgICAgICAgICAgIHZhciB4ID0gY29sdW1uSW5kZXggLSBjb2x1bW5PZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKCFmdW5jdGlvblBhdHRlcm5NYXNrLmdldCh4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICBiaXRzUmVhZCsrO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYml0ID0gbWF0cml4LmdldCh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFNYXNrKHsgeTogeSwgeDogeCB9KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0ID0gIWJpdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Qnl0ZSA9IHB1c2hCaXQoYml0LCBjdXJyZW50Qnl0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiaXRzUmVhZCA9PT0gOCkgeyAvLyBXaG9sZSBieXRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgY29kZXdvcmRzLnB1c2goY3VycmVudEJ5dGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0c1JlYWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEJ5dGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlYWRpbmdVcCA9ICFyZWFkaW5nVXA7XG4gICAgfVxuICAgIHJldHVybiBjb2Rld29yZHM7XG59XG5mdW5jdGlvbiByZWFkVmVyc2lvbihtYXRyaXgpIHtcbiAgICB2YXIgZGltZW5zaW9uID0gbWF0cml4LmhlaWdodDtcbiAgICB2YXIgcHJvdmlzaW9uYWxWZXJzaW9uID0gTWF0aC5mbG9vcigoZGltZW5zaW9uIC0gMTcpIC8gNCk7XG4gICAgaWYgKHByb3Zpc2lvbmFsVmVyc2lvbiA8PSA2KSB7IC8vIDYgYW5kIHVuZGVyIGRvbnQgaGF2ZSB2ZXJzaW9uIGluZm8gaW4gdGhlIFFSIGNvZGVcbiAgICAgICAgcmV0dXJuIHZlcnNpb25fMS5WRVJTSU9OU1twcm92aXNpb25hbFZlcnNpb24gLSAxXTtcbiAgICB9XG4gICAgdmFyIHRvcFJpZ2h0VmVyc2lvbkJpdHMgPSAwO1xuICAgIGZvciAodmFyIHkgPSA1OyB5ID49IDA7IHktLSkge1xuICAgICAgICBmb3IgKHZhciB4ID0gZGltZW5zaW9uIC0gOTsgeCA+PSBkaW1lbnNpb24gLSAxMTsgeC0tKSB7XG4gICAgICAgICAgICB0b3BSaWdodFZlcnNpb25CaXRzID0gcHVzaEJpdChtYXRyaXguZ2V0KHgsIHkpLCB0b3BSaWdodFZlcnNpb25CaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgYm90dG9tTGVmdFZlcnNpb25CaXRzID0gMDtcbiAgICBmb3IgKHZhciB4ID0gNTsgeCA+PSAwOyB4LS0pIHtcbiAgICAgICAgZm9yICh2YXIgeSA9IGRpbWVuc2lvbiAtIDk7IHkgPj0gZGltZW5zaW9uIC0gMTE7IHktLSkge1xuICAgICAgICAgICAgYm90dG9tTGVmdFZlcnNpb25CaXRzID0gcHVzaEJpdChtYXRyaXguZ2V0KHgsIHkpLCBib3R0b21MZWZ0VmVyc2lvbkJpdHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBiZXN0RGlmZmVyZW5jZSA9IEluZmluaXR5O1xuICAgIHZhciBiZXN0VmVyc2lvbjtcbiAgICBmb3IgKHZhciBfaSA9IDAsIFZFUlNJT05TXzEgPSB2ZXJzaW9uXzEuVkVSU0lPTlM7IF9pIDwgVkVSU0lPTlNfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIHZlcnNpb24gPSBWRVJTSU9OU18xW19pXTtcbiAgICAgICAgaWYgKHZlcnNpb24uaW5mb0JpdHMgPT09IHRvcFJpZ2h0VmVyc2lvbkJpdHMgfHwgdmVyc2lvbi5pbmZvQml0cyA9PT0gYm90dG9tTGVmdFZlcnNpb25CaXRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IG51bUJpdHNEaWZmZXJpbmcodG9wUmlnaHRWZXJzaW9uQml0cywgdmVyc2lvbi5pbmZvQml0cyk7XG4gICAgICAgIGlmIChkaWZmZXJlbmNlIDwgYmVzdERpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgIGJlc3RWZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgICAgIGJlc3REaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgICBkaWZmZXJlbmNlID0gbnVtQml0c0RpZmZlcmluZyhib3R0b21MZWZ0VmVyc2lvbkJpdHMsIHZlcnNpb24uaW5mb0JpdHMpO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA8IGJlc3REaWZmZXJlbmNlKSB7XG4gICAgICAgICAgICBiZXN0VmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgICAgICBiZXN0RGlmZmVyZW5jZSA9IGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gV2UgY2FuIHRvbGVyYXRlIHVwIHRvIDMgYml0cyBvZiBlcnJvciBzaW5jZSBubyB0d28gdmVyc2lvbiBpbmZvIGNvZGV3b3JkcyB3aWxsXG4gICAgLy8gZGlmZmVyIGluIGxlc3MgdGhhbiA4IGJpdHMuXG4gICAgaWYgKGJlc3REaWZmZXJlbmNlIDw9IDMpIHtcbiAgICAgICAgcmV0dXJuIGJlc3RWZXJzaW9uO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlYWRGb3JtYXRJbmZvcm1hdGlvbihtYXRyaXgpIHtcbiAgICB2YXIgdG9wTGVmdEZvcm1hdEluZm9CaXRzID0gMDtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8PSA4OyB4KyspIHtcbiAgICAgICAgaWYgKHggIT09IDYpIHsgLy8gU2tpcCB0aW1pbmcgcGF0dGVybiBiaXRcbiAgICAgICAgICAgIHRvcExlZnRGb3JtYXRJbmZvQml0cyA9IHB1c2hCaXQobWF0cml4LmdldCh4LCA4KSwgdG9wTGVmdEZvcm1hdEluZm9CaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciB5ID0gNzsgeSA+PSAwOyB5LS0pIHtcbiAgICAgICAgaWYgKHkgIT09IDYpIHsgLy8gU2tpcCB0aW1pbmcgcGF0dGVybiBiaXRcbiAgICAgICAgICAgIHRvcExlZnRGb3JtYXRJbmZvQml0cyA9IHB1c2hCaXQobWF0cml4LmdldCg4LCB5KSwgdG9wTGVmdEZvcm1hdEluZm9CaXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgZGltZW5zaW9uID0gbWF0cml4LmhlaWdodDtcbiAgICB2YXIgdG9wUmlnaHRCb3R0b21SaWdodEZvcm1hdEluZm9CaXRzID0gMDtcbiAgICBmb3IgKHZhciB5ID0gZGltZW5zaW9uIC0gMTsgeSA+PSBkaW1lbnNpb24gLSA3OyB5LS0pIHsgLy8gYm90dG9tIGxlZnRcbiAgICAgICAgdG9wUmlnaHRCb3R0b21SaWdodEZvcm1hdEluZm9CaXRzID0gcHVzaEJpdChtYXRyaXguZ2V0KDgsIHkpLCB0b3BSaWdodEJvdHRvbVJpZ2h0Rm9ybWF0SW5mb0JpdHMpO1xuICAgIH1cbiAgICBmb3IgKHZhciB4ID0gZGltZW5zaW9uIC0gODsgeCA8IGRpbWVuc2lvbjsgeCsrKSB7IC8vIHRvcCByaWdodFxuICAgICAgICB0b3BSaWdodEJvdHRvbVJpZ2h0Rm9ybWF0SW5mb0JpdHMgPSBwdXNoQml0KG1hdHJpeC5nZXQoeCwgOCksIHRvcFJpZ2h0Qm90dG9tUmlnaHRGb3JtYXRJbmZvQml0cyk7XG4gICAgfVxuICAgIHZhciBiZXN0RGlmZmVyZW5jZSA9IEluZmluaXR5O1xuICAgIHZhciBiZXN0Rm9ybWF0SW5mbyA9IG51bGw7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBGT1JNQVRfSU5GT19UQUJMRV8xID0gRk9STUFUX0lORk9fVEFCTEU7IF9pIDwgRk9STUFUX0lORk9fVEFCTEVfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIF9hID0gRk9STUFUX0lORk9fVEFCTEVfMVtfaV0sIGJpdHMgPSBfYS5iaXRzLCBmb3JtYXRJbmZvID0gX2EuZm9ybWF0SW5mbztcbiAgICAgICAgaWYgKGJpdHMgPT09IHRvcExlZnRGb3JtYXRJbmZvQml0cyB8fCBiaXRzID09PSB0b3BSaWdodEJvdHRvbVJpZ2h0Rm9ybWF0SW5mb0JpdHMpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXRJbmZvO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkaWZmZXJlbmNlID0gbnVtQml0c0RpZmZlcmluZyh0b3BMZWZ0Rm9ybWF0SW5mb0JpdHMsIGJpdHMpO1xuICAgICAgICBpZiAoZGlmZmVyZW5jZSA8IGJlc3REaWZmZXJlbmNlKSB7XG4gICAgICAgICAgICBiZXN0Rm9ybWF0SW5mbyA9IGZvcm1hdEluZm87XG4gICAgICAgICAgICBiZXN0RGlmZmVyZW5jZSA9IGRpZmZlcmVuY2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRvcExlZnRGb3JtYXRJbmZvQml0cyAhPT0gdG9wUmlnaHRCb3R0b21SaWdodEZvcm1hdEluZm9CaXRzKSB7IC8vIGFsc28gdHJ5IHRoZSBvdGhlciBvcHRpb25cbiAgICAgICAgICAgIGRpZmZlcmVuY2UgPSBudW1CaXRzRGlmZmVyaW5nKHRvcFJpZ2h0Qm90dG9tUmlnaHRGb3JtYXRJbmZvQml0cywgYml0cyk7XG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA8IGJlc3REaWZmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgYmVzdEZvcm1hdEluZm8gPSBmb3JtYXRJbmZvO1xuICAgICAgICAgICAgICAgIGJlc3REaWZmZXJlbmNlID0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBIYW1taW5nIGRpc3RhbmNlIG9mIHRoZSAzMiBtYXNrZWQgY29kZXMgaXMgNywgYnkgY29uc3RydWN0aW9uLCBzbyA8PSAzIGJpdHMgZGlmZmVyaW5nIG1lYW5zIHdlIGZvdW5kIGEgbWF0Y2hcbiAgICBpZiAoYmVzdERpZmZlcmVuY2UgPD0gMykge1xuICAgICAgICByZXR1cm4gYmVzdEZvcm1hdEluZm87XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0RGF0YUJsb2Nrcyhjb2Rld29yZHMsIHZlcnNpb24sIGVjTGV2ZWwpIHtcbiAgICB2YXIgZWNJbmZvID0gdmVyc2lvbi5lcnJvckNvcnJlY3Rpb25MZXZlbHNbZWNMZXZlbF07XG4gICAgdmFyIGRhdGFCbG9ja3MgPSBbXTtcbiAgICB2YXIgdG90YWxDb2Rld29yZHMgPSAwO1xuICAgIGVjSW5mby5lY0Jsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2NrLm51bUJsb2NrczsgaSsrKSB7XG4gICAgICAgICAgICBkYXRhQmxvY2tzLnB1c2goeyBudW1EYXRhQ29kZXdvcmRzOiBibG9jay5kYXRhQ29kZXdvcmRzUGVyQmxvY2ssIGNvZGV3b3JkczogW10gfSk7XG4gICAgICAgICAgICB0b3RhbENvZGV3b3JkcyArPSBibG9jay5kYXRhQ29kZXdvcmRzUGVyQmxvY2sgKyBlY0luZm8uZWNDb2Rld29yZHNQZXJCbG9jaztcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIEluIHNvbWUgY2FzZXMgdGhlIFFSIGNvZGUgd2lsbCBiZSBtYWxmb3JtZWQgZW5vdWdoIHRoYXQgd2UgcHVsbCBvZmYgbW9yZSBvciBsZXNzIHRoYW4gd2Ugc2hvdWxkLlxuICAgIC8vIElmIHdlIHB1bGwgb2ZmIGxlc3MgdGhlcmUncyBub3RoaW5nIHdlIGNhbiBkby5cbiAgICAvLyBJZiB3ZSBwdWxsIG9mZiBtb3JlIHdlIGNhbiBzYWZlbHkgdHJ1bmNhdGVcbiAgICBpZiAoY29kZXdvcmRzLmxlbmd0aCA8IHRvdGFsQ29kZXdvcmRzKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb2Rld29yZHMgPSBjb2Rld29yZHMuc2xpY2UoMCwgdG90YWxDb2Rld29yZHMpO1xuICAgIHZhciBzaG9ydEJsb2NrU2l6ZSA9IGVjSW5mby5lY0Jsb2Nrc1swXS5kYXRhQ29kZXdvcmRzUGVyQmxvY2s7XG4gICAgLy8gUHVsbCBjb2Rld29yZHMgdG8gZmlsbCB0aGUgYmxvY2tzIHVwIHRvIHRoZSBtaW5pbXVtIHNpemVcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNob3J0QmxvY2tTaXplOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBkYXRhQmxvY2tzXzEgPSBkYXRhQmxvY2tzOyBfaSA8IGRhdGFCbG9ja3NfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzXzFbX2ldO1xuICAgICAgICAgICAgZGF0YUJsb2NrLmNvZGV3b3Jkcy5wdXNoKGNvZGV3b3Jkcy5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB0aGVyZSBhcmUgYW55IGxhcmdlIGJsb2NrcywgcHVsbCBjb2Rld29yZHMgdG8gZmlsbCB0aGUgbGFzdCBlbGVtZW50IG9mIHRob3NlXG4gICAgaWYgKGVjSW5mby5lY0Jsb2Nrcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBzbWFsbEJsb2NrQ291bnQgPSBlY0luZm8uZWNCbG9ja3NbMF0ubnVtQmxvY2tzO1xuICAgICAgICB2YXIgbGFyZ2VCbG9ja0NvdW50ID0gZWNJbmZvLmVjQmxvY2tzWzFdLm51bUJsb2NrcztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXJnZUJsb2NrQ291bnQ7IGkrKykge1xuICAgICAgICAgICAgZGF0YUJsb2Nrc1tzbWFsbEJsb2NrQ291bnQgKyBpXS5jb2Rld29yZHMucHVzaChjb2Rld29yZHMuc2hpZnQoKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gQWRkIHRoZSByZXN0IG9mIHRoZSBjb2Rld29yZHMgdG8gdGhlIGJsb2Nrcy4gVGhlc2UgYXJlIHRoZSBlcnJvciBjb3JyZWN0aW9uIGNvZGV3b3Jkcy5cbiAgICB3aGlsZSAoY29kZXdvcmRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBkYXRhQmxvY2tzXzIgPSBkYXRhQmxvY2tzOyBfYSA8IGRhdGFCbG9ja3NfMi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBkYXRhQmxvY2sgPSBkYXRhQmxvY2tzXzJbX2FdO1xuICAgICAgICAgICAgZGF0YUJsb2NrLmNvZGV3b3Jkcy5wdXNoKGNvZGV3b3Jkcy5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YUJsb2Nrcztcbn1cbmZ1bmN0aW9uIGRlY29kZU1hdHJpeChtYXRyaXgpIHtcbiAgICB2YXIgdmVyc2lvbiA9IHJlYWRWZXJzaW9uKG1hdHJpeCk7XG4gICAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0SW5mbyA9IHJlYWRGb3JtYXRJbmZvcm1hdGlvbihtYXRyaXgpO1xuICAgIGlmICghZm9ybWF0SW5mbykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGNvZGV3b3JkcyA9IHJlYWRDb2Rld29yZHMobWF0cml4LCB2ZXJzaW9uLCBmb3JtYXRJbmZvKTtcbiAgICB2YXIgZGF0YUJsb2NrcyA9IGdldERhdGFCbG9ja3MoY29kZXdvcmRzLCB2ZXJzaW9uLCBmb3JtYXRJbmZvLmVycm9yQ29ycmVjdGlvbkxldmVsKTtcbiAgICBpZiAoIWRhdGFCbG9ja3MpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8vIENvdW50IHRvdGFsIG51bWJlciBvZiBkYXRhIGJ5dGVzXG4gICAgdmFyIHRvdGFsQnl0ZXMgPSBkYXRhQmxvY2tzLnJlZHVjZShmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYSArIGIubnVtRGF0YUNvZGV3b3JkczsgfSwgMCk7XG4gICAgdmFyIHJlc3VsdEJ5dGVzID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KHRvdGFsQnl0ZXMpO1xuICAgIHZhciByZXN1bHRJbmRleCA9IDA7XG4gICAgZm9yICh2YXIgX2kgPSAwLCBkYXRhQmxvY2tzXzMgPSBkYXRhQmxvY2tzOyBfaSA8IGRhdGFCbG9ja3NfMy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgdmFyIGRhdGFCbG9jayA9IGRhdGFCbG9ja3NfM1tfaV07XG4gICAgICAgIHZhciBjb3JyZWN0ZWRCeXRlcyA9IHJlZWRzb2xvbW9uXzEuZGVjb2RlKGRhdGFCbG9jay5jb2Rld29yZHMsIGRhdGFCbG9jay5jb2Rld29yZHMubGVuZ3RoIC0gZGF0YUJsb2NrLm51bURhdGFDb2Rld29yZHMpO1xuICAgICAgICBpZiAoIWNvcnJlY3RlZEJ5dGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFCbG9jay5udW1EYXRhQ29kZXdvcmRzOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdEJ5dGVzW3Jlc3VsdEluZGV4KytdID0gY29ycmVjdGVkQnl0ZXNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZURhdGFfMS5kZWNvZGUocmVzdWx0Qnl0ZXMsIHZlcnNpb24udmVyc2lvbk51bWJlcik7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5mdW5jdGlvbiBkZWNvZGUobWF0cml4KSB7XG4gICAgaWYgKG1hdHJpeCA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0ID0gZGVjb2RlTWF0cml4KG1hdHJpeCk7XG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvLyBEZWNvZGluZyBkaWRuJ3Qgd29yaywgdHJ5IG1pcnJvcmluZyB0aGUgUVIgYWNyb3NzIHRoZSB0b3BMZWZ0IC0+IGJvdHRvbVJpZ2h0IGxpbmUuXG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCBtYXRyaXgud2lkdGg7IHgrKykge1xuICAgICAgICBmb3IgKHZhciB5ID0geCArIDE7IHkgPCBtYXRyaXguaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgIGlmIChtYXRyaXguZ2V0KHgsIHkpICE9PSBtYXRyaXguZ2V0KHksIHgpKSB7XG4gICAgICAgICAgICAgICAgbWF0cml4LnNldCh4LCB5LCAhbWF0cml4LmdldCh4LCB5KSk7XG4gICAgICAgICAgICAgICAgbWF0cml4LnNldCh5LCB4LCAhbWF0cml4LmdldCh5LCB4KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZU1hdHJpeChtYXRyaXgpO1xufVxuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4vLyB0c2xpbnQ6ZGlzYWJsZTpuby1iaXR3aXNlXG52YXIgQml0U3RyZWFtXzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpO1xudmFyIHNoaWZ0SklTVGFibGVfMSA9IF9fd2VicGFja19yZXF1aXJlX18oOCk7XG52YXIgTW9kZTtcbihmdW5jdGlvbiAoTW9kZSkge1xuICAgIE1vZGVbXCJOdW1lcmljXCJdID0gXCJudW1lcmljXCI7XG4gICAgTW9kZVtcIkFscGhhbnVtZXJpY1wiXSA9IFwiYWxwaGFudW1lcmljXCI7XG4gICAgTW9kZVtcIkJ5dGVcIl0gPSBcImJ5dGVcIjtcbiAgICBNb2RlW1wiS2FuamlcIl0gPSBcImthbmppXCI7XG4gICAgTW9kZVtcIkVDSVwiXSA9IFwiZWNpXCI7XG59KShNb2RlID0gZXhwb3J0cy5Nb2RlIHx8IChleHBvcnRzLk1vZGUgPSB7fSkpO1xudmFyIE1vZGVCeXRlO1xuKGZ1bmN0aW9uIChNb2RlQnl0ZSkge1xuICAgIE1vZGVCeXRlW01vZGVCeXRlW1wiVGVybWluYXRvclwiXSA9IDBdID0gXCJUZXJtaW5hdG9yXCI7XG4gICAgTW9kZUJ5dGVbTW9kZUJ5dGVbXCJOdW1lcmljXCJdID0gMV0gPSBcIk51bWVyaWNcIjtcbiAgICBNb2RlQnl0ZVtNb2RlQnl0ZVtcIkFscGhhbnVtZXJpY1wiXSA9IDJdID0gXCJBbHBoYW51bWVyaWNcIjtcbiAgICBNb2RlQnl0ZVtNb2RlQnl0ZVtcIkJ5dGVcIl0gPSA0XSA9IFwiQnl0ZVwiO1xuICAgIE1vZGVCeXRlW01vZGVCeXRlW1wiS2FuamlcIl0gPSA4XSA9IFwiS2FuamlcIjtcbiAgICBNb2RlQnl0ZVtNb2RlQnl0ZVtcIkVDSVwiXSA9IDddID0gXCJFQ0lcIjtcbiAgICAvLyBTdHJ1Y3R1cmVkQXBwZW5kID0gMHgzLFxuICAgIC8vIEZOQzFGaXJzdFBvc2l0aW9uID0gMHg1LFxuICAgIC8vIEZOQzFTZWNvbmRQb3NpdGlvbiA9IDB4OSxcbn0pKE1vZGVCeXRlIHx8IChNb2RlQnl0ZSA9IHt9KSk7XG5mdW5jdGlvbiBkZWNvZGVOdW1lcmljKHN0cmVhbSwgc2l6ZSkge1xuICAgIHZhciBieXRlcyA9IFtdO1xuICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVyQ291bnRTaXplID0gWzEwLCAxMiwgMTRdW3NpemVdO1xuICAgIHZhciBsZW5ndGggPSBzdHJlYW0ucmVhZEJpdHMoY2hhcmFjdGVyQ291bnRTaXplKTtcbiAgICAvLyBSZWFkIGRpZ2l0cyBpbiBncm91cHMgb2YgM1xuICAgIHdoaWxlIChsZW5ndGggPj0gMykge1xuICAgICAgICB2YXIgbnVtID0gc3RyZWFtLnJlYWRCaXRzKDEwKTtcbiAgICAgICAgaWYgKG51bSA+PSAxMDAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG51bWVyaWMgdmFsdWUgYWJvdmUgOTk5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhID0gTWF0aC5mbG9vcihudW0gLyAxMDApO1xuICAgICAgICB2YXIgYiA9IE1hdGguZmxvb3IobnVtIC8gMTApICUgMTA7XG4gICAgICAgIHZhciBjID0gbnVtICUgMTA7XG4gICAgICAgIGJ5dGVzLnB1c2goNDggKyBhLCA0OCArIGIsIDQ4ICsgYyk7XG4gICAgICAgIHRleHQgKz0gYS50b1N0cmluZygpICsgYi50b1N0cmluZygpICsgYy50b1N0cmluZygpO1xuICAgICAgICBsZW5ndGggLT0gMztcbiAgICB9XG4gICAgLy8gSWYgdGhlIG51bWJlciBvZiBkaWdpdHMgYXJlbid0IGEgbXVsdGlwbGUgb2YgMywgdGhlIHJlbWFpbmluZyBkaWdpdHMgYXJlIHNwZWNpYWwgY2FzZWQuXG4gICAgaWYgKGxlbmd0aCA9PT0gMikge1xuICAgICAgICB2YXIgbnVtID0gc3RyZWFtLnJlYWRCaXRzKDcpO1xuICAgICAgICBpZiAobnVtID49IDEwMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBudW1lcmljIHZhbHVlIGFib3ZlIDk5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhID0gTWF0aC5mbG9vcihudW0gLyAxMCk7XG4gICAgICAgIHZhciBiID0gbnVtICUgMTA7XG4gICAgICAgIGJ5dGVzLnB1c2goNDggKyBhLCA0OCArIGIpO1xuICAgICAgICB0ZXh0ICs9IGEudG9TdHJpbmcoKSArIGIudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHZhciBudW0gPSBzdHJlYW0ucmVhZEJpdHMoNCk7XG4gICAgICAgIGlmIChudW0gPj0gMTApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbnVtZXJpYyB2YWx1ZSBhYm92ZSA5XCIpO1xuICAgICAgICB9XG4gICAgICAgIGJ5dGVzLnB1c2goNDggKyBudW0pO1xuICAgICAgICB0ZXh0ICs9IG51bS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4geyBieXRlczogYnl0ZXMsIHRleHQ6IHRleHQgfTtcbn1cbnZhciBBbHBoYW51bWVyaWNDaGFyYWN0ZXJDb2RlcyA9IFtcbiAgICBcIjBcIiwgXCIxXCIsIFwiMlwiLCBcIjNcIiwgXCI0XCIsIFwiNVwiLCBcIjZcIiwgXCI3XCIsIFwiOFwiLFxuICAgIFwiOVwiLCBcIkFcIiwgXCJCXCIsIFwiQ1wiLCBcIkRcIiwgXCJFXCIsIFwiRlwiLCBcIkdcIiwgXCJIXCIsXG4gICAgXCJJXCIsIFwiSlwiLCBcIktcIiwgXCJMXCIsIFwiTVwiLCBcIk5cIiwgXCJPXCIsIFwiUFwiLCBcIlFcIixcbiAgICBcIlJcIiwgXCJTXCIsIFwiVFwiLCBcIlVcIiwgXCJWXCIsIFwiV1wiLCBcIlhcIiwgXCJZXCIsIFwiWlwiLFxuICAgIFwiIFwiLCBcIiRcIiwgXCIlXCIsIFwiKlwiLCBcIitcIiwgXCItXCIsIFwiLlwiLCBcIi9cIiwgXCI6XCIsXG5dO1xuZnVuY3Rpb24gZGVjb2RlQWxwaGFudW1lcmljKHN0cmVhbSwgc2l6ZSkge1xuICAgIHZhciBieXRlcyA9IFtdO1xuICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVyQ291bnRTaXplID0gWzksIDExLCAxM11bc2l6ZV07XG4gICAgdmFyIGxlbmd0aCA9IHN0cmVhbS5yZWFkQml0cyhjaGFyYWN0ZXJDb3VudFNpemUpO1xuICAgIHdoaWxlIChsZW5ndGggPj0gMikge1xuICAgICAgICB2YXIgdiA9IHN0cmVhbS5yZWFkQml0cygxMSk7XG4gICAgICAgIHZhciBhID0gTWF0aC5mbG9vcih2IC8gNDUpO1xuICAgICAgICB2YXIgYiA9IHYgJSA0NTtcbiAgICAgICAgYnl0ZXMucHVzaChBbHBoYW51bWVyaWNDaGFyYWN0ZXJDb2Rlc1thXS5jaGFyQ29kZUF0KDApLCBBbHBoYW51bWVyaWNDaGFyYWN0ZXJDb2Rlc1tiXS5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgdGV4dCArPSBBbHBoYW51bWVyaWNDaGFyYWN0ZXJDb2Rlc1thXSArIEFscGhhbnVtZXJpY0NoYXJhY3RlckNvZGVzW2JdO1xuICAgICAgICBsZW5ndGggLT0gMjtcbiAgICB9XG4gICAgaWYgKGxlbmd0aCA9PT0gMSkge1xuICAgICAgICB2YXIgYSA9IHN0cmVhbS5yZWFkQml0cyg2KTtcbiAgICAgICAgYnl0ZXMucHVzaChBbHBoYW51bWVyaWNDaGFyYWN0ZXJDb2Rlc1thXS5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgdGV4dCArPSBBbHBoYW51bWVyaWNDaGFyYWN0ZXJDb2Rlc1thXTtcbiAgICB9XG4gICAgcmV0dXJuIHsgYnl0ZXM6IGJ5dGVzLCB0ZXh0OiB0ZXh0IH07XG59XG5mdW5jdGlvbiBkZWNvZGVCeXRlKHN0cmVhbSwgc2l6ZSkge1xuICAgIHZhciBieXRlcyA9IFtdO1xuICAgIHZhciB0ZXh0ID0gXCJcIjtcbiAgICB2YXIgY2hhcmFjdGVyQ291bnRTaXplID0gWzgsIDE2LCAxNl1bc2l6ZV07XG4gICAgdmFyIGxlbmd0aCA9IHN0cmVhbS5yZWFkQml0cyhjaGFyYWN0ZXJDb3VudFNpemUpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGIgPSBzdHJlYW0ucmVhZEJpdHMoOCk7XG4gICAgICAgIGJ5dGVzLnB1c2goYik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHRleHQgKz0gZGVjb2RlVVJJQ29tcG9uZW50KGJ5dGVzLm1hcChmdW5jdGlvbiAoYikgeyByZXR1cm4gXCIlXCIgKyAoXCIwXCIgKyBiLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKTsgfSkuam9pbihcIlwiKSk7XG4gICAgfVxuICAgIGNhdGNoIChfYSkge1xuICAgICAgICAvLyBmYWlsZWQgdG8gZGVjb2RlXG4gICAgfVxuICAgIHJldHVybiB7IGJ5dGVzOiBieXRlcywgdGV4dDogdGV4dCB9O1xufVxuZnVuY3Rpb24gZGVjb2RlS2Fuamkoc3RyZWFtLCBzaXplKSB7XG4gICAgdmFyIGJ5dGVzID0gW107XG4gICAgdmFyIHRleHQgPSBcIlwiO1xuICAgIHZhciBjaGFyYWN0ZXJDb3VudFNpemUgPSBbOCwgMTAsIDEyXVtzaXplXTtcbiAgICB2YXIgbGVuZ3RoID0gc3RyZWFtLnJlYWRCaXRzKGNoYXJhY3RlckNvdW50U2l6ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgayA9IHN0cmVhbS5yZWFkQml0cygxMyk7XG4gICAgICAgIHZhciBjID0gKE1hdGguZmxvb3IoayAvIDB4QzApIDw8IDgpIHwgKGsgJSAweEMwKTtcbiAgICAgICAgaWYgKGMgPCAweDFGMDApIHtcbiAgICAgICAgICAgIGMgKz0gMHg4MTQwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYyArPSAweEMxNDA7XG4gICAgICAgIH1cbiAgICAgICAgYnl0ZXMucHVzaChjID4+IDgsIGMgJiAweEZGKTtcbiAgICAgICAgdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHNoaWZ0SklTVGFibGVfMS5zaGlmdEpJU1RhYmxlW2NdKTtcbiAgICB9XG4gICAgcmV0dXJuIHsgYnl0ZXM6IGJ5dGVzLCB0ZXh0OiB0ZXh0IH07XG59XG5mdW5jdGlvbiBkZWNvZGUoZGF0YSwgdmVyc2lvbikge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICB2YXIgc3RyZWFtID0gbmV3IEJpdFN0cmVhbV8xLkJpdFN0cmVhbShkYXRhKTtcbiAgICAvLyBUaGVyZSBhcmUgMyAnc2l6ZXMnIGJhc2VkIG9uIHRoZSB2ZXJzaW9uLiAxLTkgaXMgc21hbGwgKDApLCAxMC0yNiBpcyBtZWRpdW0gKDEpIGFuZCAyNy00MCBpcyBsYXJnZSAoMikuXG4gICAgdmFyIHNpemUgPSB2ZXJzaW9uIDw9IDkgPyAwIDogdmVyc2lvbiA8PSAyNiA/IDEgOiAyO1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgIGJ5dGVzOiBbXSxcbiAgICAgICAgY2h1bmtzOiBbXSxcbiAgICAgICAgdmVyc2lvbjogdmVyc2lvbixcbiAgICB9O1xuICAgIHdoaWxlIChzdHJlYW0uYXZhaWxhYmxlKCkgPj0gNCkge1xuICAgICAgICB2YXIgbW9kZSA9IHN0cmVhbS5yZWFkQml0cyg0KTtcbiAgICAgICAgaWYgKG1vZGUgPT09IE1vZGVCeXRlLlRlcm1pbmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gTW9kZUJ5dGUuRUNJKSB7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLnJlYWRCaXRzKDEpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmNodW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTW9kZS5FQ0ksXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnROdW1iZXI6IHN0cmVhbS5yZWFkQml0cyg3KSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHN0cmVhbS5yZWFkQml0cygxKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5jaHVua3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IE1vZGUuRUNJLFxuICAgICAgICAgICAgICAgICAgICBhc3NpZ25tZW50TnVtYmVyOiBzdHJlYW0ucmVhZEJpdHMoMTQpLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyZWFtLnJlYWRCaXRzKDEpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmNodW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogTW9kZS5FQ0ksXG4gICAgICAgICAgICAgICAgICAgIGFzc2lnbm1lbnROdW1iZXI6IHN0cmVhbS5yZWFkQml0cygyMSksXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFQ0kgZGF0YSBzZWVtcyBjb3JydXB0ZWRcbiAgICAgICAgICAgICAgICByZXN1bHQuY2h1bmtzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBNb2RlLkVDSSxcbiAgICAgICAgICAgICAgICAgICAgYXNzaWdubWVudE51bWJlcjogLTEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gTW9kZUJ5dGUuTnVtZXJpYykge1xuICAgICAgICAgICAgdmFyIG51bWVyaWNSZXN1bHQgPSBkZWNvZGVOdW1lcmljKHN0cmVhbSwgc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCArPSBudW1lcmljUmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAoX2EgPSByZXN1bHQuYnl0ZXMpLnB1c2guYXBwbHkoX2EsIG51bWVyaWNSZXN1bHQuYnl0ZXMpO1xuICAgICAgICAgICAgcmVzdWx0LmNodW5rcy5wdXNoKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBNb2RlLk51bWVyaWMsXG4gICAgICAgICAgICAgICAgdGV4dDogbnVtZXJpY1Jlc3VsdC50ZXh0LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gTW9kZUJ5dGUuQWxwaGFudW1lcmljKSB7XG4gICAgICAgICAgICB2YXIgYWxwaGFudW1lcmljUmVzdWx0ID0gZGVjb2RlQWxwaGFudW1lcmljKHN0cmVhbSwgc2l6ZSk7XG4gICAgICAgICAgICByZXN1bHQudGV4dCArPSBhbHBoYW51bWVyaWNSZXN1bHQudGV4dDtcbiAgICAgICAgICAgIChfYiA9IHJlc3VsdC5ieXRlcykucHVzaC5hcHBseShfYiwgYWxwaGFudW1lcmljUmVzdWx0LmJ5dGVzKTtcbiAgICAgICAgICAgIHJlc3VsdC5jaHVua3MucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTW9kZS5BbHBoYW51bWVyaWMsXG4gICAgICAgICAgICAgICAgdGV4dDogYWxwaGFudW1lcmljUmVzdWx0LnRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtb2RlID09PSBNb2RlQnl0ZS5CeXRlKSB7XG4gICAgICAgICAgICB2YXIgYnl0ZVJlc3VsdCA9IGRlY29kZUJ5dGUoc3RyZWFtLCBzaXplKTtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IGJ5dGVSZXN1bHQudGV4dDtcbiAgICAgICAgICAgIChfYyA9IHJlc3VsdC5ieXRlcykucHVzaC5hcHBseShfYywgYnl0ZVJlc3VsdC5ieXRlcyk7XG4gICAgICAgICAgICByZXN1bHQuY2h1bmtzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IE1vZGUuQnl0ZSxcbiAgICAgICAgICAgICAgICBieXRlczogYnl0ZVJlc3VsdC5ieXRlcyxcbiAgICAgICAgICAgICAgICB0ZXh0OiBieXRlUmVzdWx0LnRleHQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChtb2RlID09PSBNb2RlQnl0ZS5LYW5qaSkge1xuICAgICAgICAgICAgdmFyIGthbmppUmVzdWx0ID0gZGVjb2RlS2Fuamkoc3RyZWFtLCBzaXplKTtcbiAgICAgICAgICAgIHJlc3VsdC50ZXh0ICs9IGthbmppUmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAoX2QgPSByZXN1bHQuYnl0ZXMpLnB1c2guYXBwbHkoX2QsIGthbmppUmVzdWx0LmJ5dGVzKTtcbiAgICAgICAgICAgIHJlc3VsdC5jaHVua3MucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogTW9kZS5LYW5qaSxcbiAgICAgICAgICAgICAgICBieXRlczoga2FuamlSZXN1bHQuYnl0ZXMsXG4gICAgICAgICAgICAgICAgdGV4dDoga2FuamlSZXN1bHQudGV4dCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIHRoZXJlIGlzIG5vIGRhdGEgbGVmdCwgb3IgdGhlIHJlbWFpbmluZyBiaXRzIGFyZSBhbGwgMCwgdGhlbiB0aGF0IGNvdW50cyBhcyBhIHRlcm1pbmF0aW9uIG1hcmtlclxuICAgIGlmIChzdHJlYW0uYXZhaWxhYmxlKCkgPT09IDAgfHwgc3RyZWFtLnJlYWRCaXRzKHN0cmVhbS5hdmFpbGFibGUoKSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcblxuXG4vKioqLyB9KSxcbi8qIDcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHRzbGludDpkaXNhYmxlOm5vLWJpdHdpc2Vcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBCaXRTdHJlYW0gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQml0U3RyZWFtKGJ5dGVzKSB7XG4gICAgICAgIHRoaXMuYnl0ZU9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuYml0T2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5ieXRlcyA9IGJ5dGVzO1xuICAgIH1cbiAgICBCaXRTdHJlYW0ucHJvdG90eXBlLnJlYWRCaXRzID0gZnVuY3Rpb24gKG51bUJpdHMpIHtcbiAgICAgICAgaWYgKG51bUJpdHMgPCAxIHx8IG51bUJpdHMgPiAzMiB8fCBudW1CaXRzID4gdGhpcy5hdmFpbGFibGUoKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHJlYWQgXCIgKyBudW1CaXRzLnRvU3RyaW5nKCkgKyBcIiBiaXRzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICAvLyBGaXJzdCwgcmVhZCByZW1haW5kZXIgZnJvbSBjdXJyZW50IGJ5dGVcbiAgICAgICAgaWYgKHRoaXMuYml0T2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgdmFyIGJpdHNMZWZ0ID0gOCAtIHRoaXMuYml0T2Zmc2V0O1xuICAgICAgICAgICAgdmFyIHRvUmVhZCA9IG51bUJpdHMgPCBiaXRzTGVmdCA/IG51bUJpdHMgOiBiaXRzTGVmdDtcbiAgICAgICAgICAgIHZhciBiaXRzVG9Ob3RSZWFkID0gYml0c0xlZnQgLSB0b1JlYWQ7XG4gICAgICAgICAgICB2YXIgbWFzayA9ICgweEZGID4+ICg4IC0gdG9SZWFkKSkgPDwgYml0c1RvTm90UmVhZDtcbiAgICAgICAgICAgIHJlc3VsdCA9ICh0aGlzLmJ5dGVzW3RoaXMuYnl0ZU9mZnNldF0gJiBtYXNrKSA+PiBiaXRzVG9Ob3RSZWFkO1xuICAgICAgICAgICAgbnVtQml0cyAtPSB0b1JlYWQ7XG4gICAgICAgICAgICB0aGlzLmJpdE9mZnNldCArPSB0b1JlYWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5iaXRPZmZzZXQgPT09IDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpdE9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlT2Zmc2V0Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTmV4dCByZWFkIHdob2xlIGJ5dGVzXG4gICAgICAgIGlmIChudW1CaXRzID4gMCkge1xuICAgICAgICAgICAgd2hpbGUgKG51bUJpdHMgPj0gOCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IChyZXN1bHQgPDwgOCkgfCAodGhpcy5ieXRlc1t0aGlzLmJ5dGVPZmZzZXRdICYgMHhGRik7XG4gICAgICAgICAgICAgICAgdGhpcy5ieXRlT2Zmc2V0Kys7XG4gICAgICAgICAgICAgICAgbnVtQml0cyAtPSA4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRmluYWxseSByZWFkIGEgcGFydGlhbCBieXRlXG4gICAgICAgICAgICBpZiAobnVtQml0cyA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgYml0c1RvTm90UmVhZCA9IDggLSBudW1CaXRzO1xuICAgICAgICAgICAgICAgIHZhciBtYXNrID0gKDB4RkYgPj4gYml0c1RvTm90UmVhZCkgPDwgYml0c1RvTm90UmVhZDtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAocmVzdWx0IDw8IG51bUJpdHMpIHwgKCh0aGlzLmJ5dGVzW3RoaXMuYnl0ZU9mZnNldF0gJiBtYXNrKSA+PiBiaXRzVG9Ob3RSZWFkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpdE9mZnNldCArPSBudW1CaXRzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBCaXRTdHJlYW0ucHJvdG90eXBlLmF2YWlsYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDggKiAodGhpcy5ieXRlcy5sZW5ndGggLSB0aGlzLmJ5dGVPZmZzZXQpIC0gdGhpcy5iaXRPZmZzZXQ7XG4gICAgfTtcbiAgICByZXR1cm4gQml0U3RyZWFtO1xufSgpKTtcbmV4cG9ydHMuQml0U3RyZWFtID0gQml0U3RyZWFtO1xuXG5cbi8qKiovIH0pLFxuLyogOCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5zaGlmdEpJU1RhYmxlID0ge1xuICAgIDB4MjA6IDB4MDAyMCxcbiAgICAweDIxOiAweDAwMjEsXG4gICAgMHgyMjogMHgwMDIyLFxuICAgIDB4MjM6IDB4MDAyMyxcbiAgICAweDI0OiAweDAwMjQsXG4gICAgMHgyNTogMHgwMDI1LFxuICAgIDB4MjY6IDB4MDAyNixcbiAgICAweDI3OiAweDAwMjcsXG4gICAgMHgyODogMHgwMDI4LFxuICAgIDB4Mjk6IDB4MDAyOSxcbiAgICAweDJBOiAweDAwMkEsXG4gICAgMHgyQjogMHgwMDJCLFxuICAgIDB4MkM6IDB4MDAyQyxcbiAgICAweDJEOiAweDAwMkQsXG4gICAgMHgyRTogMHgwMDJFLFxuICAgIDB4MkY6IDB4MDAyRixcbiAgICAweDMwOiAweDAwMzAsXG4gICAgMHgzMTogMHgwMDMxLFxuICAgIDB4MzI6IDB4MDAzMixcbiAgICAweDMzOiAweDAwMzMsXG4gICAgMHgzNDogMHgwMDM0LFxuICAgIDB4MzU6IDB4MDAzNSxcbiAgICAweDM2OiAweDAwMzYsXG4gICAgMHgzNzogMHgwMDM3LFxuICAgIDB4Mzg6IDB4MDAzOCxcbiAgICAweDM5OiAweDAwMzksXG4gICAgMHgzQTogMHgwMDNBLFxuICAgIDB4M0I6IDB4MDAzQixcbiAgICAweDNDOiAweDAwM0MsXG4gICAgMHgzRDogMHgwMDNELFxuICAgIDB4M0U6IDB4MDAzRSxcbiAgICAweDNGOiAweDAwM0YsXG4gICAgMHg0MDogMHgwMDQwLFxuICAgIDB4NDE6IDB4MDA0MSxcbiAgICAweDQyOiAweDAwNDIsXG4gICAgMHg0MzogMHgwMDQzLFxuICAgIDB4NDQ6IDB4MDA0NCxcbiAgICAweDQ1OiAweDAwNDUsXG4gICAgMHg0NjogMHgwMDQ2LFxuICAgIDB4NDc6IDB4MDA0NyxcbiAgICAweDQ4OiAweDAwNDgsXG4gICAgMHg0OTogMHgwMDQ5LFxuICAgIDB4NEE6IDB4MDA0QSxcbiAgICAweDRCOiAweDAwNEIsXG4gICAgMHg0QzogMHgwMDRDLFxuICAgIDB4NEQ6IDB4MDA0RCxcbiAgICAweDRFOiAweDAwNEUsXG4gICAgMHg0RjogMHgwMDRGLFxuICAgIDB4NTA6IDB4MDA1MCxcbiAgICAweDUxOiAweDAwNTEsXG4gICAgMHg1MjogMHgwMDUyLFxuICAgIDB4NTM6IDB4MDA1MyxcbiAgICAweDU0OiAweDAwNTQsXG4gICAgMHg1NTogMHgwMDU1LFxuICAgIDB4NTY6IDB4MDA1NixcbiAgICAweDU3OiAweDAwNTcsXG4gICAgMHg1ODogMHgwMDU4LFxuICAgIDB4NTk6IDB4MDA1OSxcbiAgICAweDVBOiAweDAwNUEsXG4gICAgMHg1QjogMHgwMDVCLFxuICAgIDB4NUM6IDB4MDBBNSxcbiAgICAweDVEOiAweDAwNUQsXG4gICAgMHg1RTogMHgwMDVFLFxuICAgIDB4NUY6IDB4MDA1RixcbiAgICAweDYwOiAweDAwNjAsXG4gICAgMHg2MTogMHgwMDYxLFxuICAgIDB4NjI6IDB4MDA2MixcbiAgICAweDYzOiAweDAwNjMsXG4gICAgMHg2NDogMHgwMDY0LFxuICAgIDB4NjU6IDB4MDA2NSxcbiAgICAweDY2OiAweDAwNjYsXG4gICAgMHg2NzogMHgwMDY3LFxuICAgIDB4Njg6IDB4MDA2OCxcbiAgICAweDY5OiAweDAwNjksXG4gICAgMHg2QTogMHgwMDZBLFxuICAgIDB4NkI6IDB4MDA2QixcbiAgICAweDZDOiAweDAwNkMsXG4gICAgMHg2RDogMHgwMDZELFxuICAgIDB4NkU6IDB4MDA2RSxcbiAgICAweDZGOiAweDAwNkYsXG4gICAgMHg3MDogMHgwMDcwLFxuICAgIDB4NzE6IDB4MDA3MSxcbiAgICAweDcyOiAweDAwNzIsXG4gICAgMHg3MzogMHgwMDczLFxuICAgIDB4NzQ6IDB4MDA3NCxcbiAgICAweDc1OiAweDAwNzUsXG4gICAgMHg3NjogMHgwMDc2LFxuICAgIDB4Nzc6IDB4MDA3NyxcbiAgICAweDc4OiAweDAwNzgsXG4gICAgMHg3OTogMHgwMDc5LFxuICAgIDB4N0E6IDB4MDA3QSxcbiAgICAweDdCOiAweDAwN0IsXG4gICAgMHg3QzogMHgwMDdDLFxuICAgIDB4N0Q6IDB4MDA3RCxcbiAgICAweDdFOiAweDIwM0UsXG4gICAgMHg4MTQwOiAweDMwMDAsXG4gICAgMHg4MTQxOiAweDMwMDEsXG4gICAgMHg4MTQyOiAweDMwMDIsXG4gICAgMHg4MTQzOiAweEZGMEMsXG4gICAgMHg4MTQ0OiAweEZGMEUsXG4gICAgMHg4MTQ1OiAweDMwRkIsXG4gICAgMHg4MTQ2OiAweEZGMUEsXG4gICAgMHg4MTQ3OiAweEZGMUIsXG4gICAgMHg4MTQ4OiAweEZGMUYsXG4gICAgMHg4MTQ5OiAweEZGMDEsXG4gICAgMHg4MTRBOiAweDMwOUIsXG4gICAgMHg4MTRCOiAweDMwOUMsXG4gICAgMHg4MTRDOiAweDAwQjQsXG4gICAgMHg4MTREOiAweEZGNDAsXG4gICAgMHg4MTRFOiAweDAwQTgsXG4gICAgMHg4MTRGOiAweEZGM0UsXG4gICAgMHg4MTUwOiAweEZGRTMsXG4gICAgMHg4MTUxOiAweEZGM0YsXG4gICAgMHg4MTUyOiAweDMwRkQsXG4gICAgMHg4MTUzOiAweDMwRkUsXG4gICAgMHg4MTU0OiAweDMwOUQsXG4gICAgMHg4MTU1OiAweDMwOUUsXG4gICAgMHg4MTU2OiAweDMwMDMsXG4gICAgMHg4MTU3OiAweDRFREQsXG4gICAgMHg4MTU4OiAweDMwMDUsXG4gICAgMHg4MTU5OiAweDMwMDYsXG4gICAgMHg4MTVBOiAweDMwMDcsXG4gICAgMHg4MTVCOiAweDMwRkMsXG4gICAgMHg4MTVDOiAweDIwMTUsXG4gICAgMHg4MTVEOiAweDIwMTAsXG4gICAgMHg4MTVFOiAweEZGMEYsXG4gICAgMHg4MTVGOiAweDAwNUMsXG4gICAgMHg4MTYwOiAweDMwMUMsXG4gICAgMHg4MTYxOiAweDIwMTYsXG4gICAgMHg4MTYyOiAweEZGNUMsXG4gICAgMHg4MTYzOiAweDIwMjYsXG4gICAgMHg4MTY0OiAweDIwMjUsXG4gICAgMHg4MTY1OiAweDIwMTgsXG4gICAgMHg4MTY2OiAweDIwMTksXG4gICAgMHg4MTY3OiAweDIwMUMsXG4gICAgMHg4MTY4OiAweDIwMUQsXG4gICAgMHg4MTY5OiAweEZGMDgsXG4gICAgMHg4MTZBOiAweEZGMDksXG4gICAgMHg4MTZCOiAweDMwMTQsXG4gICAgMHg4MTZDOiAweDMwMTUsXG4gICAgMHg4MTZEOiAweEZGM0IsXG4gICAgMHg4MTZFOiAweEZGM0QsXG4gICAgMHg4MTZGOiAweEZGNUIsXG4gICAgMHg4MTcwOiAweEZGNUQsXG4gICAgMHg4MTcxOiAweDMwMDgsXG4gICAgMHg4MTcyOiAweDMwMDksXG4gICAgMHg4MTczOiAweDMwMEEsXG4gICAgMHg4MTc0OiAweDMwMEIsXG4gICAgMHg4MTc1OiAweDMwMEMsXG4gICAgMHg4MTc2OiAweDMwMEQsXG4gICAgMHg4MTc3OiAweDMwMEUsXG4gICAgMHg4MTc4OiAweDMwMEYsXG4gICAgMHg4MTc5OiAweDMwMTAsXG4gICAgMHg4MTdBOiAweDMwMTEsXG4gICAgMHg4MTdCOiAweEZGMEIsXG4gICAgMHg4MTdDOiAweDIyMTIsXG4gICAgMHg4MTdEOiAweDAwQjEsXG4gICAgMHg4MTdFOiAweDAwRDcsXG4gICAgMHg4MTgwOiAweDAwRjcsXG4gICAgMHg4MTgxOiAweEZGMUQsXG4gICAgMHg4MTgyOiAweDIyNjAsXG4gICAgMHg4MTgzOiAweEZGMUMsXG4gICAgMHg4MTg0OiAweEZGMUUsXG4gICAgMHg4MTg1OiAweDIyNjYsXG4gICAgMHg4MTg2OiAweDIyNjcsXG4gICAgMHg4MTg3OiAweDIyMUUsXG4gICAgMHg4MTg4OiAweDIyMzQsXG4gICAgMHg4MTg5OiAweDI2NDIsXG4gICAgMHg4MThBOiAweDI2NDAsXG4gICAgMHg4MThCOiAweDAwQjAsXG4gICAgMHg4MThDOiAweDIwMzIsXG4gICAgMHg4MThEOiAweDIwMzMsXG4gICAgMHg4MThFOiAweDIxMDMsXG4gICAgMHg4MThGOiAweEZGRTUsXG4gICAgMHg4MTkwOiAweEZGMDQsXG4gICAgMHg4MTkxOiAweDAwQTIsXG4gICAgMHg4MTkyOiAweDAwQTMsXG4gICAgMHg4MTkzOiAweEZGMDUsXG4gICAgMHg4MTk0OiAweEZGMDMsXG4gICAgMHg4MTk1OiAweEZGMDYsXG4gICAgMHg4MTk2OiAweEZGMEEsXG4gICAgMHg4MTk3OiAweEZGMjAsXG4gICAgMHg4MTk4OiAweDAwQTcsXG4gICAgMHg4MTk5OiAweDI2MDYsXG4gICAgMHg4MTlBOiAweDI2MDUsXG4gICAgMHg4MTlCOiAweDI1Q0IsXG4gICAgMHg4MTlDOiAweDI1Q0YsXG4gICAgMHg4MTlEOiAweDI1Q0UsXG4gICAgMHg4MTlFOiAweDI1QzcsXG4gICAgMHg4MTlGOiAweDI1QzYsXG4gICAgMHg4MUEwOiAweDI1QTEsXG4gICAgMHg4MUExOiAweDI1QTAsXG4gICAgMHg4MUEyOiAweDI1QjMsXG4gICAgMHg4MUEzOiAweDI1QjIsXG4gICAgMHg4MUE0OiAweDI1QkQsXG4gICAgMHg4MUE1OiAweDI1QkMsXG4gICAgMHg4MUE2OiAweDIwM0IsXG4gICAgMHg4MUE3OiAweDMwMTIsXG4gICAgMHg4MUE4OiAweDIxOTIsXG4gICAgMHg4MUE5OiAweDIxOTAsXG4gICAgMHg4MUFBOiAweDIxOTEsXG4gICAgMHg4MUFCOiAweDIxOTMsXG4gICAgMHg4MUFDOiAweDMwMTMsXG4gICAgMHg4MUI4OiAweDIyMDgsXG4gICAgMHg4MUI5OiAweDIyMEIsXG4gICAgMHg4MUJBOiAweDIyODYsXG4gICAgMHg4MUJCOiAweDIyODcsXG4gICAgMHg4MUJDOiAweDIyODIsXG4gICAgMHg4MUJEOiAweDIyODMsXG4gICAgMHg4MUJFOiAweDIyMkEsXG4gICAgMHg4MUJGOiAweDIyMjksXG4gICAgMHg4MUM4OiAweDIyMjcsXG4gICAgMHg4MUM5OiAweDIyMjgsXG4gICAgMHg4MUNBOiAweDAwQUMsXG4gICAgMHg4MUNCOiAweDIxRDIsXG4gICAgMHg4MUNDOiAweDIxRDQsXG4gICAgMHg4MUNEOiAweDIyMDAsXG4gICAgMHg4MUNFOiAweDIyMDMsXG4gICAgMHg4MURBOiAweDIyMjAsXG4gICAgMHg4MURCOiAweDIyQTUsXG4gICAgMHg4MURDOiAweDIzMTIsXG4gICAgMHg4MUREOiAweDIyMDIsXG4gICAgMHg4MURFOiAweDIyMDcsXG4gICAgMHg4MURGOiAweDIyNjEsXG4gICAgMHg4MUUwOiAweDIyNTIsXG4gICAgMHg4MUUxOiAweDIyNkEsXG4gICAgMHg4MUUyOiAweDIyNkIsXG4gICAgMHg4MUUzOiAweDIyMUEsXG4gICAgMHg4MUU0OiAweDIyM0QsXG4gICAgMHg4MUU1OiAweDIyMUQsXG4gICAgMHg4MUU2OiAweDIyMzUsXG4gICAgMHg4MUU3OiAweDIyMkIsXG4gICAgMHg4MUU4OiAweDIyMkMsXG4gICAgMHg4MUYwOiAweDIxMkIsXG4gICAgMHg4MUYxOiAweDIwMzAsXG4gICAgMHg4MUYyOiAweDI2NkYsXG4gICAgMHg4MUYzOiAweDI2NkQsXG4gICAgMHg4MUY0OiAweDI2NkEsXG4gICAgMHg4MUY1OiAweDIwMjAsXG4gICAgMHg4MUY2OiAweDIwMjEsXG4gICAgMHg4MUY3OiAweDAwQjYsXG4gICAgMHg4MUZDOiAweDI1RUYsXG4gICAgMHg4MjRGOiAweEZGMTAsXG4gICAgMHg4MjUwOiAweEZGMTEsXG4gICAgMHg4MjUxOiAweEZGMTIsXG4gICAgMHg4MjUyOiAweEZGMTMsXG4gICAgMHg4MjUzOiAweEZGMTQsXG4gICAgMHg4MjU0OiAweEZGMTUsXG4gICAgMHg4MjU1OiAweEZGMTYsXG4gICAgMHg4MjU2OiAweEZGMTcsXG4gICAgMHg4MjU3OiAweEZGMTgsXG4gICAgMHg4MjU4OiAweEZGMTksXG4gICAgMHg4MjYwOiAweEZGMjEsXG4gICAgMHg4MjYxOiAweEZGMjIsXG4gICAgMHg4MjYyOiAweEZGMjMsXG4gICAgMHg4MjYzOiAweEZGMjQsXG4gICAgMHg4MjY0OiAweEZGMjUsXG4gICAgMHg4MjY1OiAweEZGMjYsXG4gICAgMHg4MjY2OiAweEZGMjcsXG4gICAgMHg4MjY3OiAweEZGMjgsXG4gICAgMHg4MjY4OiAweEZGMjksXG4gICAgMHg4MjY5OiAweEZGMkEsXG4gICAgMHg4MjZBOiAweEZGMkIsXG4gICAgMHg4MjZCOiAweEZGMkMsXG4gICAgMHg4MjZDOiAweEZGMkQsXG4gICAgMHg4MjZEOiAweEZGMkUsXG4gICAgMHg4MjZFOiAweEZGMkYsXG4gICAgMHg4MjZGOiAweEZGMzAsXG4gICAgMHg4MjcwOiAweEZGMzEsXG4gICAgMHg4MjcxOiAweEZGMzIsXG4gICAgMHg4MjcyOiAweEZGMzMsXG4gICAgMHg4MjczOiAweEZGMzQsXG4gICAgMHg4Mjc0OiAweEZGMzUsXG4gICAgMHg4Mjc1OiAweEZGMzYsXG4gICAgMHg4Mjc2OiAweEZGMzcsXG4gICAgMHg4Mjc3OiAweEZGMzgsXG4gICAgMHg4Mjc4OiAweEZGMzksXG4gICAgMHg4Mjc5OiAweEZGM0EsXG4gICAgMHg4MjgxOiAweEZGNDEsXG4gICAgMHg4MjgyOiAweEZGNDIsXG4gICAgMHg4MjgzOiAweEZGNDMsXG4gICAgMHg4Mjg0OiAweEZGNDQsXG4gICAgMHg4Mjg1OiAweEZGNDUsXG4gICAgMHg4Mjg2OiAweEZGNDYsXG4gICAgMHg4Mjg3OiAweEZGNDcsXG4gICAgMHg4Mjg4OiAweEZGNDgsXG4gICAgMHg4Mjg5OiAweEZGNDksXG4gICAgMHg4MjhBOiAweEZGNEEsXG4gICAgMHg4MjhCOiAweEZGNEIsXG4gICAgMHg4MjhDOiAweEZGNEMsXG4gICAgMHg4MjhEOiAweEZGNEQsXG4gICAgMHg4MjhFOiAweEZGNEUsXG4gICAgMHg4MjhGOiAweEZGNEYsXG4gICAgMHg4MjkwOiAweEZGNTAsXG4gICAgMHg4MjkxOiAweEZGNTEsXG4gICAgMHg4MjkyOiAweEZGNTIsXG4gICAgMHg4MjkzOiAweEZGNTMsXG4gICAgMHg4Mjk0OiAweEZGNTQsXG4gICAgMHg4Mjk1OiAweEZGNTUsXG4gICAgMHg4Mjk2OiAweEZGNTYsXG4gICAgMHg4Mjk3OiAweEZGNTcsXG4gICAgMHg4Mjk4OiAweEZGNTgsXG4gICAgMHg4Mjk5OiAweEZGNTksXG4gICAgMHg4MjlBOiAweEZGNUEsXG4gICAgMHg4MjlGOiAweDMwNDEsXG4gICAgMHg4MkEwOiAweDMwNDIsXG4gICAgMHg4MkExOiAweDMwNDMsXG4gICAgMHg4MkEyOiAweDMwNDQsXG4gICAgMHg4MkEzOiAweDMwNDUsXG4gICAgMHg4MkE0OiAweDMwNDYsXG4gICAgMHg4MkE1OiAweDMwNDcsXG4gICAgMHg4MkE2OiAweDMwNDgsXG4gICAgMHg4MkE3OiAweDMwNDksXG4gICAgMHg4MkE4OiAweDMwNEEsXG4gICAgMHg4MkE5OiAweDMwNEIsXG4gICAgMHg4MkFBOiAweDMwNEMsXG4gICAgMHg4MkFCOiAweDMwNEQsXG4gICAgMHg4MkFDOiAweDMwNEUsXG4gICAgMHg4MkFEOiAweDMwNEYsXG4gICAgMHg4MkFFOiAweDMwNTAsXG4gICAgMHg4MkFGOiAweDMwNTEsXG4gICAgMHg4MkIwOiAweDMwNTIsXG4gICAgMHg4MkIxOiAweDMwNTMsXG4gICAgMHg4MkIyOiAweDMwNTQsXG4gICAgMHg4MkIzOiAweDMwNTUsXG4gICAgMHg4MkI0OiAweDMwNTYsXG4gICAgMHg4MkI1OiAweDMwNTcsXG4gICAgMHg4MkI2OiAweDMwNTgsXG4gICAgMHg4MkI3OiAweDMwNTksXG4gICAgMHg4MkI4OiAweDMwNUEsXG4gICAgMHg4MkI5OiAweDMwNUIsXG4gICAgMHg4MkJBOiAweDMwNUMsXG4gICAgMHg4MkJCOiAweDMwNUQsXG4gICAgMHg4MkJDOiAweDMwNUUsXG4gICAgMHg4MkJEOiAweDMwNUYsXG4gICAgMHg4MkJFOiAweDMwNjAsXG4gICAgMHg4MkJGOiAweDMwNjEsXG4gICAgMHg4MkMwOiAweDMwNjIsXG4gICAgMHg4MkMxOiAweDMwNjMsXG4gICAgMHg4MkMyOiAweDMwNjQsXG4gICAgMHg4MkMzOiAweDMwNjUsXG4gICAgMHg4MkM0OiAweDMwNjYsXG4gICAgMHg4MkM1OiAweDMwNjcsXG4gICAgMHg4MkM2OiAweDMwNjgsXG4gICAgMHg4MkM3OiAweDMwNjksXG4gICAgMHg4MkM4OiAweDMwNkEsXG4gICAgMHg4MkM5OiAweDMwNkIsXG4gICAgMHg4MkNBOiAweDMwNkMsXG4gICAgMHg4MkNCOiAweDMwNkQsXG4gICAgMHg4MkNDOiAweDMwNkUsXG4gICAgMHg4MkNEOiAweDMwNkYsXG4gICAgMHg4MkNFOiAweDMwNzAsXG4gICAgMHg4MkNGOiAweDMwNzEsXG4gICAgMHg4MkQwOiAweDMwNzIsXG4gICAgMHg4MkQxOiAweDMwNzMsXG4gICAgMHg4MkQyOiAweDMwNzQsXG4gICAgMHg4MkQzOiAweDMwNzUsXG4gICAgMHg4MkQ0OiAweDMwNzYsXG4gICAgMHg4MkQ1OiAweDMwNzcsXG4gICAgMHg4MkQ2OiAweDMwNzgsXG4gICAgMHg4MkQ3OiAweDMwNzksXG4gICAgMHg4MkQ4OiAweDMwN0EsXG4gICAgMHg4MkQ5OiAweDMwN0IsXG4gICAgMHg4MkRBOiAweDMwN0MsXG4gICAgMHg4MkRCOiAweDMwN0QsXG4gICAgMHg4MkRDOiAweDMwN0UsXG4gICAgMHg4MkREOiAweDMwN0YsXG4gICAgMHg4MkRFOiAweDMwODAsXG4gICAgMHg4MkRGOiAweDMwODEsXG4gICAgMHg4MkUwOiAweDMwODIsXG4gICAgMHg4MkUxOiAweDMwODMsXG4gICAgMHg4MkUyOiAweDMwODQsXG4gICAgMHg4MkUzOiAweDMwODUsXG4gICAgMHg4MkU0OiAweDMwODYsXG4gICAgMHg4MkU1OiAweDMwODcsXG4gICAgMHg4MkU2OiAweDMwODgsXG4gICAgMHg4MkU3OiAweDMwODksXG4gICAgMHg4MkU4OiAweDMwOEEsXG4gICAgMHg4MkU5OiAweDMwOEIsXG4gICAgMHg4MkVBOiAweDMwOEMsXG4gICAgMHg4MkVCOiAweDMwOEQsXG4gICAgMHg4MkVDOiAweDMwOEUsXG4gICAgMHg4MkVEOiAweDMwOEYsXG4gICAgMHg4MkVFOiAweDMwOTAsXG4gICAgMHg4MkVGOiAweDMwOTEsXG4gICAgMHg4MkYwOiAweDMwOTIsXG4gICAgMHg4MkYxOiAweDMwOTMsXG4gICAgMHg4MzQwOiAweDMwQTEsXG4gICAgMHg4MzQxOiAweDMwQTIsXG4gICAgMHg4MzQyOiAweDMwQTMsXG4gICAgMHg4MzQzOiAweDMwQTQsXG4gICAgMHg4MzQ0OiAweDMwQTUsXG4gICAgMHg4MzQ1OiAweDMwQTYsXG4gICAgMHg4MzQ2OiAweDMwQTcsXG4gICAgMHg4MzQ3OiAweDMwQTgsXG4gICAgMHg4MzQ4OiAweDMwQTksXG4gICAgMHg4MzQ5OiAweDMwQUEsXG4gICAgMHg4MzRBOiAweDMwQUIsXG4gICAgMHg4MzRCOiAweDMwQUMsXG4gICAgMHg4MzRDOiAweDMwQUQsXG4gICAgMHg4MzREOiAweDMwQUUsXG4gICAgMHg4MzRFOiAweDMwQUYsXG4gICAgMHg4MzRGOiAweDMwQjAsXG4gICAgMHg4MzUwOiAweDMwQjEsXG4gICAgMHg4MzUxOiAweDMwQjIsXG4gICAgMHg4MzUyOiAweDMwQjMsXG4gICAgMHg4MzUzOiAweDMwQjQsXG4gICAgMHg4MzU0OiAweDMwQjUsXG4gICAgMHg4MzU1OiAweDMwQjYsXG4gICAgMHg4MzU2OiAweDMwQjcsXG4gICAgMHg4MzU3OiAweDMwQjgsXG4gICAgMHg4MzU4OiAweDMwQjksXG4gICAgMHg4MzU5OiAweDMwQkEsXG4gICAgMHg4MzVBOiAweDMwQkIsXG4gICAgMHg4MzVCOiAweDMwQkMsXG4gICAgMHg4MzVDOiAweDMwQkQsXG4gICAgMHg4MzVEOiAweDMwQkUsXG4gICAgMHg4MzVFOiAweDMwQkYsXG4gICAgMHg4MzVGOiAweDMwQzAsXG4gICAgMHg4MzYwOiAweDMwQzEsXG4gICAgMHg4MzYxOiAweDMwQzIsXG4gICAgMHg4MzYyOiAweDMwQzMsXG4gICAgMHg4MzYzOiAweDMwQzQsXG4gICAgMHg4MzY0OiAweDMwQzUsXG4gICAgMHg4MzY1OiAweDMwQzYsXG4gICAgMHg4MzY2OiAweDMwQzcsXG4gICAgMHg4MzY3OiAweDMwQzgsXG4gICAgMHg4MzY4OiAweDMwQzksXG4gICAgMHg4MzY5OiAweDMwQ0EsXG4gICAgMHg4MzZBOiAweDMwQ0IsXG4gICAgMHg4MzZCOiAweDMwQ0MsXG4gICAgMHg4MzZDOiAweDMwQ0QsXG4gICAgMHg4MzZEOiAweDMwQ0UsXG4gICAgMHg4MzZFOiAweDMwQ0YsXG4gICAgMHg4MzZGOiAweDMwRDAsXG4gICAgMHg4MzcwOiAweDMwRDEsXG4gICAgMHg4MzcxOiAweDMwRDIsXG4gICAgMHg4MzcyOiAweDMwRDMsXG4gICAgMHg4MzczOiAweDMwRDQsXG4gICAgMHg4Mzc0OiAweDMwRDUsXG4gICAgMHg4Mzc1OiAweDMwRDYsXG4gICAgMHg4Mzc2OiAweDMwRDcsXG4gICAgMHg4Mzc3OiAweDMwRDgsXG4gICAgMHg4Mzc4OiAweDMwRDksXG4gICAgMHg4Mzc5OiAweDMwREEsXG4gICAgMHg4MzdBOiAweDMwREIsXG4gICAgMHg4MzdCOiAweDMwREMsXG4gICAgMHg4MzdDOiAweDMwREQsXG4gICAgMHg4MzdEOiAweDMwREUsXG4gICAgMHg4MzdFOiAweDMwREYsXG4gICAgMHg4MzgwOiAweDMwRTAsXG4gICAgMHg4MzgxOiAweDMwRTEsXG4gICAgMHg4MzgyOiAweDMwRTIsXG4gICAgMHg4MzgzOiAweDMwRTMsXG4gICAgMHg4Mzg0OiAweDMwRTQsXG4gICAgMHg4Mzg1OiAweDMwRTUsXG4gICAgMHg4Mzg2OiAweDMwRTYsXG4gICAgMHg4Mzg3OiAweDMwRTcsXG4gICAgMHg4Mzg4OiAweDMwRTgsXG4gICAgMHg4Mzg5OiAweDMwRTksXG4gICAgMHg4MzhBOiAweDMwRUEsXG4gICAgMHg4MzhCOiAweDMwRUIsXG4gICAgMHg4MzhDOiAweDMwRUMsXG4gICAgMHg4MzhEOiAweDMwRUQsXG4gICAgMHg4MzhFOiAweDMwRUUsXG4gICAgMHg4MzhGOiAweDMwRUYsXG4gICAgMHg4MzkwOiAweDMwRjAsXG4gICAgMHg4MzkxOiAweDMwRjEsXG4gICAgMHg4MzkyOiAweDMwRjIsXG4gICAgMHg4MzkzOiAweDMwRjMsXG4gICAgMHg4Mzk0OiAweDMwRjQsXG4gICAgMHg4Mzk1OiAweDMwRjUsXG4gICAgMHg4Mzk2OiAweDMwRjYsXG4gICAgMHg4MzlGOiAweDAzOTEsXG4gICAgMHg4M0EwOiAweDAzOTIsXG4gICAgMHg4M0ExOiAweDAzOTMsXG4gICAgMHg4M0EyOiAweDAzOTQsXG4gICAgMHg4M0EzOiAweDAzOTUsXG4gICAgMHg4M0E0OiAweDAzOTYsXG4gICAgMHg4M0E1OiAweDAzOTcsXG4gICAgMHg4M0E2OiAweDAzOTgsXG4gICAgMHg4M0E3OiAweDAzOTksXG4gICAgMHg4M0E4OiAweDAzOUEsXG4gICAgMHg4M0E5OiAweDAzOUIsXG4gICAgMHg4M0FBOiAweDAzOUMsXG4gICAgMHg4M0FCOiAweDAzOUQsXG4gICAgMHg4M0FDOiAweDAzOUUsXG4gICAgMHg4M0FEOiAweDAzOUYsXG4gICAgMHg4M0FFOiAweDAzQTAsXG4gICAgMHg4M0FGOiAweDAzQTEsXG4gICAgMHg4M0IwOiAweDAzQTMsXG4gICAgMHg4M0IxOiAweDAzQTQsXG4gICAgMHg4M0IyOiAweDAzQTUsXG4gICAgMHg4M0IzOiAweDAzQTYsXG4gICAgMHg4M0I0OiAweDAzQTcsXG4gICAgMHg4M0I1OiAweDAzQTgsXG4gICAgMHg4M0I2OiAweDAzQTksXG4gICAgMHg4M0JGOiAweDAzQjEsXG4gICAgMHg4M0MwOiAweDAzQjIsXG4gICAgMHg4M0MxOiAweDAzQjMsXG4gICAgMHg4M0MyOiAweDAzQjQsXG4gICAgMHg4M0MzOiAweDAzQjUsXG4gICAgMHg4M0M0OiAweDAzQjYsXG4gICAgMHg4M0M1OiAweDAzQjcsXG4gICAgMHg4M0M2OiAweDAzQjgsXG4gICAgMHg4M0M3OiAweDAzQjksXG4gICAgMHg4M0M4OiAweDAzQkEsXG4gICAgMHg4M0M5OiAweDAzQkIsXG4gICAgMHg4M0NBOiAweDAzQkMsXG4gICAgMHg4M0NCOiAweDAzQkQsXG4gICAgMHg4M0NDOiAweDAzQkUsXG4gICAgMHg4M0NEOiAweDAzQkYsXG4gICAgMHg4M0NFOiAweDAzQzAsXG4gICAgMHg4M0NGOiAweDAzQzEsXG4gICAgMHg4M0QwOiAweDAzQzMsXG4gICAgMHg4M0QxOiAweDAzQzQsXG4gICAgMHg4M0QyOiAweDAzQzUsXG4gICAgMHg4M0QzOiAweDAzQzYsXG4gICAgMHg4M0Q0OiAweDAzQzcsXG4gICAgMHg4M0Q1OiAweDAzQzgsXG4gICAgMHg4M0Q2OiAweDAzQzksXG4gICAgMHg4NDQwOiAweDA0MTAsXG4gICAgMHg4NDQxOiAweDA0MTEsXG4gICAgMHg4NDQyOiAweDA0MTIsXG4gICAgMHg4NDQzOiAweDA0MTMsXG4gICAgMHg4NDQ0OiAweDA0MTQsXG4gICAgMHg4NDQ1OiAweDA0MTUsXG4gICAgMHg4NDQ2OiAweDA0MDEsXG4gICAgMHg4NDQ3OiAweDA0MTYsXG4gICAgMHg4NDQ4OiAweDA0MTcsXG4gICAgMHg4NDQ5OiAweDA0MTgsXG4gICAgMHg4NDRBOiAweDA0MTksXG4gICAgMHg4NDRCOiAweDA0MUEsXG4gICAgMHg4NDRDOiAweDA0MUIsXG4gICAgMHg4NDREOiAweDA0MUMsXG4gICAgMHg4NDRFOiAweDA0MUQsXG4gICAgMHg4NDRGOiAweDA0MUUsXG4gICAgMHg4NDUwOiAweDA0MUYsXG4gICAgMHg4NDUxOiAweDA0MjAsXG4gICAgMHg4NDUyOiAweDA0MjEsXG4gICAgMHg4NDUzOiAweDA0MjIsXG4gICAgMHg4NDU0OiAweDA0MjMsXG4gICAgMHg4NDU1OiAweDA0MjQsXG4gICAgMHg4NDU2OiAweDA0MjUsXG4gICAgMHg4NDU3OiAweDA0MjYsXG4gICAgMHg4NDU4OiAweDA0MjcsXG4gICAgMHg4NDU5OiAweDA0MjgsXG4gICAgMHg4NDVBOiAweDA0MjksXG4gICAgMHg4NDVCOiAweDA0MkEsXG4gICAgMHg4NDVDOiAweDA0MkIsXG4gICAgMHg4NDVEOiAweDA0MkMsXG4gICAgMHg4NDVFOiAweDA0MkQsXG4gICAgMHg4NDVGOiAweDA0MkUsXG4gICAgMHg4NDYwOiAweDA0MkYsXG4gICAgMHg4NDcwOiAweDA0MzAsXG4gICAgMHg4NDcxOiAweDA0MzEsXG4gICAgMHg4NDcyOiAweDA0MzIsXG4gICAgMHg4NDczOiAweDA0MzMsXG4gICAgMHg4NDc0OiAweDA0MzQsXG4gICAgMHg4NDc1OiAweDA0MzUsXG4gICAgMHg4NDc2OiAweDA0NTEsXG4gICAgMHg4NDc3OiAweDA0MzYsXG4gICAgMHg4NDc4OiAweDA0MzcsXG4gICAgMHg4NDc5OiAweDA0MzgsXG4gICAgMHg4NDdBOiAweDA0MzksXG4gICAgMHg4NDdCOiAweDA0M0EsXG4gICAgMHg4NDdDOiAweDA0M0IsXG4gICAgMHg4NDdEOiAweDA0M0MsXG4gICAgMHg4NDdFOiAweDA0M0QsXG4gICAgMHg4NDgwOiAweDA0M0UsXG4gICAgMHg4NDgxOiAweDA0M0YsXG4gICAgMHg4NDgyOiAweDA0NDAsXG4gICAgMHg4NDgzOiAweDA0NDEsXG4gICAgMHg4NDg0OiAweDA0NDIsXG4gICAgMHg4NDg1OiAweDA0NDMsXG4gICAgMHg4NDg2OiAweDA0NDQsXG4gICAgMHg4NDg3OiAweDA0NDUsXG4gICAgMHg4NDg4OiAweDA0NDYsXG4gICAgMHg4NDg5OiAweDA0NDcsXG4gICAgMHg4NDhBOiAweDA0NDgsXG4gICAgMHg4NDhCOiAweDA0NDksXG4gICAgMHg4NDhDOiAweDA0NEEsXG4gICAgMHg4NDhEOiAweDA0NEIsXG4gICAgMHg4NDhFOiAweDA0NEMsXG4gICAgMHg4NDhGOiAweDA0NEQsXG4gICAgMHg4NDkwOiAweDA0NEUsXG4gICAgMHg4NDkxOiAweDA0NEYsXG4gICAgMHg4NDlGOiAweDI1MDAsXG4gICAgMHg4NEEwOiAweDI1MDIsXG4gICAgMHg4NEExOiAweDI1MEMsXG4gICAgMHg4NEEyOiAweDI1MTAsXG4gICAgMHg4NEEzOiAweDI1MTgsXG4gICAgMHg4NEE0OiAweDI1MTQsXG4gICAgMHg4NEE1OiAweDI1MUMsXG4gICAgMHg4NEE2OiAweDI1MkMsXG4gICAgMHg4NEE3OiAweDI1MjQsXG4gICAgMHg4NEE4OiAweDI1MzQsXG4gICAgMHg4NEE5OiAweDI1M0MsXG4gICAgMHg4NEFBOiAweDI1MDEsXG4gICAgMHg4NEFCOiAweDI1MDMsXG4gICAgMHg4NEFDOiAweDI1MEYsXG4gICAgMHg4NEFEOiAweDI1MTMsXG4gICAgMHg4NEFFOiAweDI1MUIsXG4gICAgMHg4NEFGOiAweDI1MTcsXG4gICAgMHg4NEIwOiAweDI1MjMsXG4gICAgMHg4NEIxOiAweDI1MzMsXG4gICAgMHg4NEIyOiAweDI1MkIsXG4gICAgMHg4NEIzOiAweDI1M0IsXG4gICAgMHg4NEI0OiAweDI1NEIsXG4gICAgMHg4NEI1OiAweDI1MjAsXG4gICAgMHg4NEI2OiAweDI1MkYsXG4gICAgMHg4NEI3OiAweDI1MjgsXG4gICAgMHg4NEI4OiAweDI1MzcsXG4gICAgMHg4NEI5OiAweDI1M0YsXG4gICAgMHg4NEJBOiAweDI1MUQsXG4gICAgMHg4NEJCOiAweDI1MzAsXG4gICAgMHg4NEJDOiAweDI1MjUsXG4gICAgMHg4NEJEOiAweDI1MzgsXG4gICAgMHg4NEJFOiAweDI1NDIsXG4gICAgMHg4ODlGOiAweDRFOUMsXG4gICAgMHg4OEEwOiAweDU1MTYsXG4gICAgMHg4OEExOiAweDVBMDMsXG4gICAgMHg4OEEyOiAweDk2M0YsXG4gICAgMHg4OEEzOiAweDU0QzAsXG4gICAgMHg4OEE0OiAweDYxMUIsXG4gICAgMHg4OEE1OiAweDYzMjgsXG4gICAgMHg4OEE2OiAweDU5RjYsXG4gICAgMHg4OEE3OiAweDkwMjIsXG4gICAgMHg4OEE4OiAweDg0NzUsXG4gICAgMHg4OEE5OiAweDgzMUMsXG4gICAgMHg4OEFBOiAweDdBNTAsXG4gICAgMHg4OEFCOiAweDYwQUEsXG4gICAgMHg4OEFDOiAweDYzRTEsXG4gICAgMHg4OEFEOiAweDZFMjUsXG4gICAgMHg4OEFFOiAweDY1RUQsXG4gICAgMHg4OEFGOiAweDg0NjYsXG4gICAgMHg4OEIwOiAweDgyQTYsXG4gICAgMHg4OEIxOiAweDlCRjUsXG4gICAgMHg4OEIyOiAweDY4OTMsXG4gICAgMHg4OEIzOiAweDU3MjcsXG4gICAgMHg4OEI0OiAweDY1QTEsXG4gICAgMHg4OEI1OiAweDYyNzEsXG4gICAgMHg4OEI2OiAweDVCOUIsXG4gICAgMHg4OEI3OiAweDU5RDAsXG4gICAgMHg4OEI4OiAweDg2N0IsXG4gICAgMHg4OEI5OiAweDk4RjQsXG4gICAgMHg4OEJBOiAweDdENjIsXG4gICAgMHg4OEJCOiAweDdEQkUsXG4gICAgMHg4OEJDOiAweDlCOEUsXG4gICAgMHg4OEJEOiAweDYyMTYsXG4gICAgMHg4OEJFOiAweDdDOUYsXG4gICAgMHg4OEJGOiAweDg4QjcsXG4gICAgMHg4OEMwOiAweDVCODksXG4gICAgMHg4OEMxOiAweDVFQjUsXG4gICAgMHg4OEMyOiAweDYzMDksXG4gICAgMHg4OEMzOiAweDY2OTcsXG4gICAgMHg4OEM0OiAweDY4NDgsXG4gICAgMHg4OEM1OiAweDk1QzcsXG4gICAgMHg4OEM2OiAweDk3OEQsXG4gICAgMHg4OEM3OiAweDY3NEYsXG4gICAgMHg4OEM4OiAweDRFRTUsXG4gICAgMHg4OEM5OiAweDRGMEEsXG4gICAgMHg4OENBOiAweDRGNEQsXG4gICAgMHg4OENCOiAweDRGOUQsXG4gICAgMHg4OENDOiAweDUwNDksXG4gICAgMHg4OENEOiAweDU2RjIsXG4gICAgMHg4OENFOiAweDU5MzcsXG4gICAgMHg4OENGOiAweDU5RDQsXG4gICAgMHg4OEQwOiAweDVBMDEsXG4gICAgMHg4OEQxOiAweDVDMDksXG4gICAgMHg4OEQyOiAweDYwREYsXG4gICAgMHg4OEQzOiAweDYxMEYsXG4gICAgMHg4OEQ0OiAweDYxNzAsXG4gICAgMHg4OEQ1OiAweDY2MTMsXG4gICAgMHg4OEQ2OiAweDY5MDUsXG4gICAgMHg4OEQ3OiAweDcwQkEsXG4gICAgMHg4OEQ4OiAweDc1NEYsXG4gICAgMHg4OEQ5OiAweDc1NzAsXG4gICAgMHg4OERBOiAweDc5RkIsXG4gICAgMHg4OERCOiAweDdEQUQsXG4gICAgMHg4OERDOiAweDdERUYsXG4gICAgMHg4OEREOiAweDgwQzMsXG4gICAgMHg4OERFOiAweDg0MEUsXG4gICAgMHg4OERGOiAweDg4NjMsXG4gICAgMHg4OEUwOiAweDhCMDIsXG4gICAgMHg4OEUxOiAweDkwNTUsXG4gICAgMHg4OEUyOiAweDkwN0EsXG4gICAgMHg4OEUzOiAweDUzM0IsXG4gICAgMHg4OEU0OiAweDRFOTUsXG4gICAgMHg4OEU1OiAweDRFQTUsXG4gICAgMHg4OEU2OiAweDU3REYsXG4gICAgMHg4OEU3OiAweDgwQjIsXG4gICAgMHg4OEU4OiAweDkwQzEsXG4gICAgMHg4OEU5OiAweDc4RUYsXG4gICAgMHg4OEVBOiAweDRFMDAsXG4gICAgMHg4OEVCOiAweDU4RjEsXG4gICAgMHg4OEVDOiAweDZFQTIsXG4gICAgMHg4OEVEOiAweDkwMzgsXG4gICAgMHg4OEVFOiAweDdBMzIsXG4gICAgMHg4OEVGOiAweDgzMjgsXG4gICAgMHg4OEYwOiAweDgyOEIsXG4gICAgMHg4OEYxOiAweDlDMkYsXG4gICAgMHg4OEYyOiAweDUxNDEsXG4gICAgMHg4OEYzOiAweDUzNzAsXG4gICAgMHg4OEY0OiAweDU0QkQsXG4gICAgMHg4OEY1OiAweDU0RTEsXG4gICAgMHg4OEY2OiAweDU2RTAsXG4gICAgMHg4OEY3OiAweDU5RkIsXG4gICAgMHg4OEY4OiAweDVGMTUsXG4gICAgMHg4OEY5OiAweDk4RjIsXG4gICAgMHg4OEZBOiAweDZERUIsXG4gICAgMHg4OEZCOiAweDgwRTQsXG4gICAgMHg4OEZDOiAweDg1MkQsXG4gICAgMHg4OTQwOiAweDk2NjIsXG4gICAgMHg4OTQxOiAweDk2NzAsXG4gICAgMHg4OTQyOiAweDk2QTAsXG4gICAgMHg4OTQzOiAweDk3RkIsXG4gICAgMHg4OTQ0OiAweDU0MEIsXG4gICAgMHg4OTQ1OiAweDUzRjMsXG4gICAgMHg4OTQ2OiAweDVCODcsXG4gICAgMHg4OTQ3OiAweDcwQ0YsXG4gICAgMHg4OTQ4OiAweDdGQkQsXG4gICAgMHg4OTQ5OiAweDhGQzIsXG4gICAgMHg4OTRBOiAweDk2RTgsXG4gICAgMHg4OTRCOiAweDUzNkYsXG4gICAgMHg4OTRDOiAweDlENUMsXG4gICAgMHg4OTREOiAweDdBQkEsXG4gICAgMHg4OTRFOiAweDRFMTEsXG4gICAgMHg4OTRGOiAweDc4OTMsXG4gICAgMHg4OTUwOiAweDgxRkMsXG4gICAgMHg4OTUxOiAweDZFMjYsXG4gICAgMHg4OTUyOiAweDU2MTgsXG4gICAgMHg4OTUzOiAweDU1MDQsXG4gICAgMHg4OTU0OiAweDZCMUQsXG4gICAgMHg4OTU1OiAweDg1MUEsXG4gICAgMHg4OTU2OiAweDlDM0IsXG4gICAgMHg4OTU3OiAweDU5RTUsXG4gICAgMHg4OTU4OiAweDUzQTksXG4gICAgMHg4OTU5OiAweDZENjYsXG4gICAgMHg4OTVBOiAweDc0REMsXG4gICAgMHg4OTVCOiAweDk1OEYsXG4gICAgMHg4OTVDOiAweDU2NDIsXG4gICAgMHg4OTVEOiAweDRFOTEsXG4gICAgMHg4OTVFOiAweDkwNEIsXG4gICAgMHg4OTVGOiAweDk2RjIsXG4gICAgMHg4OTYwOiAweDgzNEYsXG4gICAgMHg4OTYxOiAweDk5MEMsXG4gICAgMHg4OTYyOiAweDUzRTEsXG4gICAgMHg4OTYzOiAweDU1QjYsXG4gICAgMHg4OTY0OiAweDVCMzAsXG4gICAgMHg4OTY1OiAweDVGNzEsXG4gICAgMHg4OTY2OiAweDY2MjAsXG4gICAgMHg4OTY3OiAweDY2RjMsXG4gICAgMHg4OTY4OiAweDY4MDQsXG4gICAgMHg4OTY5OiAweDZDMzgsXG4gICAgMHg4OTZBOiAweDZDRjMsXG4gICAgMHg4OTZCOiAweDZEMjksXG4gICAgMHg4OTZDOiAweDc0NUIsXG4gICAgMHg4OTZEOiAweDc2QzgsXG4gICAgMHg4OTZFOiAweDdBNEUsXG4gICAgMHg4OTZGOiAweDk4MzQsXG4gICAgMHg4OTcwOiAweDgyRjEsXG4gICAgMHg4OTcxOiAweDg4NUIsXG4gICAgMHg4OTcyOiAweDhBNjAsXG4gICAgMHg4OTczOiAweDkyRUQsXG4gICAgMHg4OTc0OiAweDZEQjIsXG4gICAgMHg4OTc1OiAweDc1QUIsXG4gICAgMHg4OTc2OiAweDc2Q0EsXG4gICAgMHg4OTc3OiAweDk5QzUsXG4gICAgMHg4OTc4OiAweDYwQTYsXG4gICAgMHg4OTc5OiAweDhCMDEsXG4gICAgMHg4OTdBOiAweDhEOEEsXG4gICAgMHg4OTdCOiAweDk1QjIsXG4gICAgMHg4OTdDOiAweDY5OEUsXG4gICAgMHg4OTdEOiAweDUzQUQsXG4gICAgMHg4OTdFOiAweDUxODYsXG4gICAgMHg4OTgwOiAweDU3MTIsXG4gICAgMHg4OTgxOiAweDU4MzAsXG4gICAgMHg4OTgyOiAweDU5NDQsXG4gICAgMHg4OTgzOiAweDVCQjQsXG4gICAgMHg4OTg0OiAweDVFRjYsXG4gICAgMHg4OTg1OiAweDYwMjgsXG4gICAgMHg4OTg2OiAweDYzQTksXG4gICAgMHg4OTg3OiAweDYzRjQsXG4gICAgMHg4OTg4OiAweDZDQkYsXG4gICAgMHg4OTg5OiAweDZGMTQsXG4gICAgMHg4OThBOiAweDcwOEUsXG4gICAgMHg4OThCOiAweDcxMTQsXG4gICAgMHg4OThDOiAweDcxNTksXG4gICAgMHg4OThEOiAweDcxRDUsXG4gICAgMHg4OThFOiAweDczM0YsXG4gICAgMHg4OThGOiAweDdFMDEsXG4gICAgMHg4OTkwOiAweDgyNzYsXG4gICAgMHg4OTkxOiAweDgyRDEsXG4gICAgMHg4OTkyOiAweDg1OTcsXG4gICAgMHg4OTkzOiAweDkwNjAsXG4gICAgMHg4OTk0OiAweDkyNUIsXG4gICAgMHg4OTk1OiAweDlEMUIsXG4gICAgMHg4OTk2OiAweDU4NjksXG4gICAgMHg4OTk3OiAweDY1QkMsXG4gICAgMHg4OTk4OiAweDZDNUEsXG4gICAgMHg4OTk5OiAweDc1MjUsXG4gICAgMHg4OTlBOiAweDUxRjksXG4gICAgMHg4OTlCOiAweDU5MkUsXG4gICAgMHg4OTlDOiAweDU5NjUsXG4gICAgMHg4OTlEOiAweDVGODAsXG4gICAgMHg4OTlFOiAweDVGREMsXG4gICAgMHg4OTlGOiAweDYyQkMsXG4gICAgMHg4OUEwOiAweDY1RkEsXG4gICAgMHg4OUExOiAweDZBMkEsXG4gICAgMHg4OUEyOiAweDZCMjcsXG4gICAgMHg4OUEzOiAweDZCQjQsXG4gICAgMHg4OUE0OiAweDczOEIsXG4gICAgMHg4OUE1OiAweDdGQzEsXG4gICAgMHg4OUE2OiAweDg5NTYsXG4gICAgMHg4OUE3OiAweDlEMkMsXG4gICAgMHg4OUE4OiAweDlEMEUsXG4gICAgMHg4OUE5OiAweDlFQzQsXG4gICAgMHg4OUFBOiAweDVDQTEsXG4gICAgMHg4OUFCOiAweDZDOTYsXG4gICAgMHg4OUFDOiAweDgzN0IsXG4gICAgMHg4OUFEOiAweDUxMDQsXG4gICAgMHg4OUFFOiAweDVDNEIsXG4gICAgMHg4OUFGOiAweDYxQjYsXG4gICAgMHg4OUIwOiAweDgxQzYsXG4gICAgMHg4OUIxOiAweDY4NzYsXG4gICAgMHg4OUIyOiAweDcyNjEsXG4gICAgMHg4OUIzOiAweDRFNTksXG4gICAgMHg4OUI0OiAweDRGRkEsXG4gICAgMHg4OUI1OiAweDUzNzgsXG4gICAgMHg4OUI2OiAweDYwNjksXG4gICAgMHg4OUI3OiAweDZFMjksXG4gICAgMHg4OUI4OiAweDdBNEYsXG4gICAgMHg4OUI5OiAweDk3RjMsXG4gICAgMHg4OUJBOiAweDRFMEIsXG4gICAgMHg4OUJCOiAweDUzMTYsXG4gICAgMHg4OUJDOiAweDRFRUUsXG4gICAgMHg4OUJEOiAweDRGNTUsXG4gICAgMHg4OUJFOiAweDRGM0QsXG4gICAgMHg4OUJGOiAweDRGQTEsXG4gICAgMHg4OUMwOiAweDRGNzMsXG4gICAgMHg4OUMxOiAweDUyQTAsXG4gICAgMHg4OUMyOiAweDUzRUYsXG4gICAgMHg4OUMzOiAweDU2MDksXG4gICAgMHg4OUM0OiAweDU5MEYsXG4gICAgMHg4OUM1OiAweDVBQzEsXG4gICAgMHg4OUM2OiAweDVCQjYsXG4gICAgMHg4OUM3OiAweDVCRTEsXG4gICAgMHg4OUM4OiAweDc5RDEsXG4gICAgMHg4OUM5OiAweDY2ODcsXG4gICAgMHg4OUNBOiAweDY3OUMsXG4gICAgMHg4OUNCOiAweDY3QjYsXG4gICAgMHg4OUNDOiAweDZCNEMsXG4gICAgMHg4OUNEOiAweDZDQjMsXG4gICAgMHg4OUNFOiAweDcwNkIsXG4gICAgMHg4OUNGOiAweDczQzIsXG4gICAgMHg4OUQwOiAweDc5OEQsXG4gICAgMHg4OUQxOiAweDc5QkUsXG4gICAgMHg4OUQyOiAweDdBM0MsXG4gICAgMHg4OUQzOiAweDdCODcsXG4gICAgMHg4OUQ0OiAweDgyQjEsXG4gICAgMHg4OUQ1OiAweDgyREIsXG4gICAgMHg4OUQ2OiAweDgzMDQsXG4gICAgMHg4OUQ3OiAweDgzNzcsXG4gICAgMHg4OUQ4OiAweDgzRUYsXG4gICAgMHg4OUQ5OiAweDgzRDMsXG4gICAgMHg4OURBOiAweDg3NjYsXG4gICAgMHg4OURCOiAweDhBQjIsXG4gICAgMHg4OURDOiAweDU2MjksXG4gICAgMHg4OUREOiAweDhDQTgsXG4gICAgMHg4OURFOiAweDhGRTYsXG4gICAgMHg4OURGOiAweDkwNEUsXG4gICAgMHg4OUUwOiAweDk3MUUsXG4gICAgMHg4OUUxOiAweDg2OEEsXG4gICAgMHg4OUUyOiAweDRGQzQsXG4gICAgMHg4OUUzOiAweDVDRTgsXG4gICAgMHg4OUU0OiAweDYyMTEsXG4gICAgMHg4OUU1OiAweDcyNTksXG4gICAgMHg4OUU2OiAweDc1M0IsXG4gICAgMHg4OUU3OiAweDgxRTUsXG4gICAgMHg4OUU4OiAweDgyQkQsXG4gICAgMHg4OUU5OiAweDg2RkUsXG4gICAgMHg4OUVBOiAweDhDQzAsXG4gICAgMHg4OUVCOiAweDk2QzUsXG4gICAgMHg4OUVDOiAweDk5MTMsXG4gICAgMHg4OUVEOiAweDk5RDUsXG4gICAgMHg4OUVFOiAweDRFQ0IsXG4gICAgMHg4OUVGOiAweDRGMUEsXG4gICAgMHg4OUYwOiAweDg5RTMsXG4gICAgMHg4OUYxOiAweDU2REUsXG4gICAgMHg4OUYyOiAweDU4NEEsXG4gICAgMHg4OUYzOiAweDU4Q0EsXG4gICAgMHg4OUY0OiAweDVFRkIsXG4gICAgMHg4OUY1OiAweDVGRUIsXG4gICAgMHg4OUY2OiAweDYwMkEsXG4gICAgMHg4OUY3OiAweDYwOTQsXG4gICAgMHg4OUY4OiAweDYwNjIsXG4gICAgMHg4OUY5OiAweDYxRDAsXG4gICAgMHg4OUZBOiAweDYyMTIsXG4gICAgMHg4OUZCOiAweDYyRDAsXG4gICAgMHg4OUZDOiAweDY1MzksXG4gICAgMHg4QTQwOiAweDlCNDEsXG4gICAgMHg4QTQxOiAweDY2NjYsXG4gICAgMHg4QTQyOiAweDY4QjAsXG4gICAgMHg4QTQzOiAweDZENzcsXG4gICAgMHg4QTQ0OiAweDcwNzAsXG4gICAgMHg4QTQ1OiAweDc1NEMsXG4gICAgMHg4QTQ2OiAweDc2ODYsXG4gICAgMHg4QTQ3OiAweDdENzUsXG4gICAgMHg4QTQ4OiAweDgyQTUsXG4gICAgMHg4QTQ5OiAweDg3RjksXG4gICAgMHg4QTRBOiAweDk1OEIsXG4gICAgMHg4QTRCOiAweDk2OEUsXG4gICAgMHg4QTRDOiAweDhDOUQsXG4gICAgMHg4QTREOiAweDUxRjEsXG4gICAgMHg4QTRFOiAweDUyQkUsXG4gICAgMHg4QTRGOiAweDU5MTYsXG4gICAgMHg4QTUwOiAweDU0QjMsXG4gICAgMHg4QTUxOiAweDVCQjMsXG4gICAgMHg4QTUyOiAweDVEMTYsXG4gICAgMHg4QTUzOiAweDYxNjgsXG4gICAgMHg4QTU0OiAweDY5ODIsXG4gICAgMHg4QTU1OiAweDZEQUYsXG4gICAgMHg4QTU2OiAweDc4OEQsXG4gICAgMHg4QTU3OiAweDg0Q0IsXG4gICAgMHg4QTU4OiAweDg4NTcsXG4gICAgMHg4QTU5OiAweDhBNzIsXG4gICAgMHg4QTVBOiAweDkzQTcsXG4gICAgMHg4QTVCOiAweDlBQjgsXG4gICAgMHg4QTVDOiAweDZENkMsXG4gICAgMHg4QTVEOiAweDk5QTgsXG4gICAgMHg4QTVFOiAweDg2RDksXG4gICAgMHg4QTVGOiAweDU3QTMsXG4gICAgMHg4QTYwOiAweDY3RkYsXG4gICAgMHg4QTYxOiAweDg2Q0UsXG4gICAgMHg4QTYyOiAweDkyMEUsXG4gICAgMHg4QTYzOiAweDUyODMsXG4gICAgMHg4QTY0OiAweDU2ODcsXG4gICAgMHg4QTY1OiAweDU0MDQsXG4gICAgMHg4QTY2OiAweDVFRDMsXG4gICAgMHg4QTY3OiAweDYyRTEsXG4gICAgMHg4QTY4OiAweDY0QjksXG4gICAgMHg4QTY5OiAweDY4M0MsXG4gICAgMHg4QTZBOiAweDY4MzgsXG4gICAgMHg4QTZCOiAweDZCQkIsXG4gICAgMHg4QTZDOiAweDczNzIsXG4gICAgMHg4QTZEOiAweDc4QkEsXG4gICAgMHg4QTZFOiAweDdBNkIsXG4gICAgMHg4QTZGOiAweDg5OUEsXG4gICAgMHg4QTcwOiAweDg5RDIsXG4gICAgMHg4QTcxOiAweDhENkIsXG4gICAgMHg4QTcyOiAweDhGMDMsXG4gICAgMHg4QTczOiAweDkwRUQsXG4gICAgMHg4QTc0OiAweDk1QTMsXG4gICAgMHg4QTc1OiAweDk2OTQsXG4gICAgMHg4QTc2OiAweDk3NjksXG4gICAgMHg4QTc3OiAweDVCNjYsXG4gICAgMHg4QTc4OiAweDVDQjMsXG4gICAgMHg4QTc5OiAweDY5N0QsXG4gICAgMHg4QTdBOiAweDk4NEQsXG4gICAgMHg4QTdCOiAweDk4NEUsXG4gICAgMHg4QTdDOiAweDYzOUIsXG4gICAgMHg4QTdEOiAweDdCMjAsXG4gICAgMHg4QTdFOiAweDZBMkIsXG4gICAgMHg4QTgwOiAweDZBN0YsXG4gICAgMHg4QTgxOiAweDY4QjYsXG4gICAgMHg4QTgyOiAweDlDMEQsXG4gICAgMHg4QTgzOiAweDZGNUYsXG4gICAgMHg4QTg0OiAweDUyNzIsXG4gICAgMHg4QTg1OiAweDU1OUQsXG4gICAgMHg4QTg2OiAweDYwNzAsXG4gICAgMHg4QTg3OiAweDYyRUMsXG4gICAgMHg4QTg4OiAweDZEM0IsXG4gICAgMHg4QTg5OiAweDZFMDcsXG4gICAgMHg4QThBOiAweDZFRDEsXG4gICAgMHg4QThCOiAweDg0NUIsXG4gICAgMHg4QThDOiAweDg5MTAsXG4gICAgMHg4QThEOiAweDhGNDQsXG4gICAgMHg4QThFOiAweDRFMTQsXG4gICAgMHg4QThGOiAweDlDMzksXG4gICAgMHg4QTkwOiAweDUzRjYsXG4gICAgMHg4QTkxOiAweDY5MUIsXG4gICAgMHg4QTkyOiAweDZBM0EsXG4gICAgMHg4QTkzOiAweDk3ODQsXG4gICAgMHg4QTk0OiAweDY4MkEsXG4gICAgMHg4QTk1OiAweDUxNUMsXG4gICAgMHg4QTk2OiAweDdBQzMsXG4gICAgMHg4QTk3OiAweDg0QjIsXG4gICAgMHg4QTk4OiAweDkxREMsXG4gICAgMHg4QTk5OiAweDkzOEMsXG4gICAgMHg4QTlBOiAweDU2NUIsXG4gICAgMHg4QTlCOiAweDlEMjgsXG4gICAgMHg4QTlDOiAweDY4MjIsXG4gICAgMHg4QTlEOiAweDgzMDUsXG4gICAgMHg4QTlFOiAweDg0MzEsXG4gICAgMHg4QTlGOiAweDdDQTUsXG4gICAgMHg4QUEwOiAweDUyMDgsXG4gICAgMHg4QUExOiAweDgyQzUsXG4gICAgMHg4QUEyOiAweDc0RTYsXG4gICAgMHg4QUEzOiAweDRFN0UsXG4gICAgMHg4QUE0OiAweDRGODMsXG4gICAgMHg4QUE1OiAweDUxQTAsXG4gICAgMHg4QUE2OiAweDVCRDIsXG4gICAgMHg4QUE3OiAweDUyMEEsXG4gICAgMHg4QUE4OiAweDUyRDgsXG4gICAgMHg4QUE5OiAweDUyRTcsXG4gICAgMHg4QUFBOiAweDVERkIsXG4gICAgMHg4QUFCOiAweDU1OUEsXG4gICAgMHg4QUFDOiAweDU4MkEsXG4gICAgMHg4QUFEOiAweDU5RTYsXG4gICAgMHg4QUFFOiAweDVCOEMsXG4gICAgMHg4QUFGOiAweDVCOTgsXG4gICAgMHg4QUIwOiAweDVCREIsXG4gICAgMHg4QUIxOiAweDVFNzIsXG4gICAgMHg4QUIyOiAweDVFNzksXG4gICAgMHg4QUIzOiAweDYwQTMsXG4gICAgMHg4QUI0OiAweDYxMUYsXG4gICAgMHg4QUI1OiAweDYxNjMsXG4gICAgMHg4QUI2OiAweDYxQkUsXG4gICAgMHg4QUI3OiAweDYzREIsXG4gICAgMHg4QUI4OiAweDY1NjIsXG4gICAgMHg4QUI5OiAweDY3RDEsXG4gICAgMHg4QUJBOiAweDY4NTMsXG4gICAgMHg4QUJCOiAweDY4RkEsXG4gICAgMHg4QUJDOiAweDZCM0UsXG4gICAgMHg4QUJEOiAweDZCNTMsXG4gICAgMHg4QUJFOiAweDZDNTcsXG4gICAgMHg4QUJGOiAweDZGMjIsXG4gICAgMHg4QUMwOiAweDZGOTcsXG4gICAgMHg4QUMxOiAweDZGNDUsXG4gICAgMHg4QUMyOiAweDc0QjAsXG4gICAgMHg4QUMzOiAweDc1MTgsXG4gICAgMHg4QUM0OiAweDc2RTMsXG4gICAgMHg4QUM1OiAweDc3MEIsXG4gICAgMHg4QUM2OiAweDdBRkYsXG4gICAgMHg4QUM3OiAweDdCQTEsXG4gICAgMHg4QUM4OiAweDdDMjEsXG4gICAgMHg4QUM5OiAweDdERTksXG4gICAgMHg4QUNBOiAweDdGMzYsXG4gICAgMHg4QUNCOiAweDdGRjAsXG4gICAgMHg4QUNDOiAweDgwOUQsXG4gICAgMHg4QUNEOiAweDgyNjYsXG4gICAgMHg4QUNFOiAweDgzOUUsXG4gICAgMHg4QUNGOiAweDg5QjMsXG4gICAgMHg4QUQwOiAweDhBQ0MsXG4gICAgMHg4QUQxOiAweDhDQUIsXG4gICAgMHg4QUQyOiAweDkwODQsXG4gICAgMHg4QUQzOiAweDk0NTEsXG4gICAgMHg4QUQ0OiAweDk1OTMsXG4gICAgMHg4QUQ1OiAweDk1OTEsXG4gICAgMHg4QUQ2OiAweDk1QTIsXG4gICAgMHg4QUQ3OiAweDk2NjUsXG4gICAgMHg4QUQ4OiAweDk3RDMsXG4gICAgMHg4QUQ5OiAweDk5MjgsXG4gICAgMHg4QURBOiAweDgyMTgsXG4gICAgMHg4QURCOiAweDRFMzgsXG4gICAgMHg4QURDOiAweDU0MkIsXG4gICAgMHg4QUREOiAweDVDQjgsXG4gICAgMHg4QURFOiAweDVEQ0MsXG4gICAgMHg4QURGOiAweDczQTksXG4gICAgMHg4QUUwOiAweDc2NEMsXG4gICAgMHg4QUUxOiAweDc3M0MsXG4gICAgMHg4QUUyOiAweDVDQTksXG4gICAgMHg4QUUzOiAweDdGRUIsXG4gICAgMHg4QUU0OiAweDhEMEIsXG4gICAgMHg4QUU1OiAweDk2QzEsXG4gICAgMHg4QUU2OiAweDk4MTEsXG4gICAgMHg4QUU3OiAweDk4NTQsXG4gICAgMHg4QUU4OiAweDk4NTgsXG4gICAgMHg4QUU5OiAweDRGMDEsXG4gICAgMHg4QUVBOiAweDRGMEUsXG4gICAgMHg4QUVCOiAweDUzNzEsXG4gICAgMHg4QUVDOiAweDU1OUMsXG4gICAgMHg4QUVEOiAweDU2NjgsXG4gICAgMHg4QUVFOiAweDU3RkEsXG4gICAgMHg4QUVGOiAweDU5NDcsXG4gICAgMHg4QUYwOiAweDVCMDksXG4gICAgMHg4QUYxOiAweDVCQzQsXG4gICAgMHg4QUYyOiAweDVDOTAsXG4gICAgMHg4QUYzOiAweDVFMEMsXG4gICAgMHg4QUY0OiAweDVFN0UsXG4gICAgMHg4QUY1OiAweDVGQ0MsXG4gICAgMHg4QUY2OiAweDYzRUUsXG4gICAgMHg4QUY3OiAweDY3M0EsXG4gICAgMHg4QUY4OiAweDY1RDcsXG4gICAgMHg4QUY5OiAweDY1RTIsXG4gICAgMHg4QUZBOiAweDY3MUYsXG4gICAgMHg4QUZCOiAweDY4Q0IsXG4gICAgMHg4QUZDOiAweDY4QzQsXG4gICAgMHg4QjQwOiAweDZBNUYsXG4gICAgMHg4QjQxOiAweDVFMzAsXG4gICAgMHg4QjQyOiAweDZCQzUsXG4gICAgMHg4QjQzOiAweDZDMTcsXG4gICAgMHg4QjQ0OiAweDZDN0QsXG4gICAgMHg4QjQ1OiAweDc1N0YsXG4gICAgMHg4QjQ2OiAweDc5NDgsXG4gICAgMHg4QjQ3OiAweDVCNjMsXG4gICAgMHg4QjQ4OiAweDdBMDAsXG4gICAgMHg4QjQ5OiAweDdEMDAsXG4gICAgMHg4QjRBOiAweDVGQkQsXG4gICAgMHg4QjRCOiAweDg5OEYsXG4gICAgMHg4QjRDOiAweDhBMTgsXG4gICAgMHg4QjREOiAweDhDQjQsXG4gICAgMHg4QjRFOiAweDhENzcsXG4gICAgMHg4QjRGOiAweDhFQ0MsXG4gICAgMHg4QjUwOiAweDhGMUQsXG4gICAgMHg4QjUxOiAweDk4RTIsXG4gICAgMHg4QjUyOiAweDlBMEUsXG4gICAgMHg4QjUzOiAweDlCM0MsXG4gICAgMHg4QjU0OiAweDRFODAsXG4gICAgMHg4QjU1OiAweDUwN0QsXG4gICAgMHg4QjU2OiAweDUxMDAsXG4gICAgMHg4QjU3OiAweDU5OTMsXG4gICAgMHg4QjU4OiAweDVCOUMsXG4gICAgMHg4QjU5OiAweDYyMkYsXG4gICAgMHg4QjVBOiAweDYyODAsXG4gICAgMHg4QjVCOiAweDY0RUMsXG4gICAgMHg4QjVDOiAweDZCM0EsXG4gICAgMHg4QjVEOiAweDcyQTAsXG4gICAgMHg4QjVFOiAweDc1OTEsXG4gICAgMHg4QjVGOiAweDc5NDcsXG4gICAgMHg4QjYwOiAweDdGQTksXG4gICAgMHg4QjYxOiAweDg3RkIsXG4gICAgMHg4QjYyOiAweDhBQkMsXG4gICAgMHg4QjYzOiAweDhCNzAsXG4gICAgMHg4QjY0OiAweDYzQUMsXG4gICAgMHg4QjY1OiAweDgzQ0EsXG4gICAgMHg4QjY2OiAweDk3QTAsXG4gICAgMHg4QjY3OiAweDU0MDksXG4gICAgMHg4QjY4OiAweDU0MDMsXG4gICAgMHg4QjY5OiAweDU1QUIsXG4gICAgMHg4QjZBOiAweDY4NTQsXG4gICAgMHg4QjZCOiAweDZBNTgsXG4gICAgMHg4QjZDOiAweDhBNzAsXG4gICAgMHg4QjZEOiAweDc4MjcsXG4gICAgMHg4QjZFOiAweDY3NzUsXG4gICAgMHg4QjZGOiAweDlFQ0QsXG4gICAgMHg4QjcwOiAweDUzNzQsXG4gICAgMHg4QjcxOiAweDVCQTIsXG4gICAgMHg4QjcyOiAweDgxMUEsXG4gICAgMHg4QjczOiAweDg2NTAsXG4gICAgMHg4Qjc0OiAweDkwMDYsXG4gICAgMHg4Qjc1OiAweDRFMTgsXG4gICAgMHg4Qjc2OiAweDRFNDUsXG4gICAgMHg4Qjc3OiAweDRFQzcsXG4gICAgMHg4Qjc4OiAweDRGMTEsXG4gICAgMHg4Qjc5OiAweDUzQ0EsXG4gICAgMHg4QjdBOiAweDU0MzgsXG4gICAgMHg4QjdCOiAweDVCQUUsXG4gICAgMHg4QjdDOiAweDVGMTMsXG4gICAgMHg4QjdEOiAweDYwMjUsXG4gICAgMHg4QjdFOiAweDY1NTEsXG4gICAgMHg4QjgwOiAweDY3M0QsXG4gICAgMHg4QjgxOiAweDZDNDIsXG4gICAgMHg4QjgyOiAweDZDNzIsXG4gICAgMHg4QjgzOiAweDZDRTMsXG4gICAgMHg4Qjg0OiAweDcwNzgsXG4gICAgMHg4Qjg1OiAweDc0MDMsXG4gICAgMHg4Qjg2OiAweDdBNzYsXG4gICAgMHg4Qjg3OiAweDdBQUUsXG4gICAgMHg4Qjg4OiAweDdCMDgsXG4gICAgMHg4Qjg5OiAweDdEMUEsXG4gICAgMHg4QjhBOiAweDdDRkUsXG4gICAgMHg4QjhCOiAweDdENjYsXG4gICAgMHg4QjhDOiAweDY1RTcsXG4gICAgMHg4QjhEOiAweDcyNUIsXG4gICAgMHg4QjhFOiAweDUzQkIsXG4gICAgMHg4QjhGOiAweDVDNDUsXG4gICAgMHg4QjkwOiAweDVERTgsXG4gICAgMHg4QjkxOiAweDYyRDIsXG4gICAgMHg4QjkyOiAweDYyRTAsXG4gICAgMHg4QjkzOiAweDYzMTksXG4gICAgMHg4Qjk0OiAweDZFMjAsXG4gICAgMHg4Qjk1OiAweDg2NUEsXG4gICAgMHg4Qjk2OiAweDhBMzEsXG4gICAgMHg4Qjk3OiAweDhEREQsXG4gICAgMHg4Qjk4OiAweDkyRjgsXG4gICAgMHg4Qjk5OiAweDZGMDEsXG4gICAgMHg4QjlBOiAweDc5QTYsXG4gICAgMHg4QjlCOiAweDlCNUEsXG4gICAgMHg4QjlDOiAweDRFQTgsXG4gICAgMHg4QjlEOiAweDRFQUIsXG4gICAgMHg4QjlFOiAweDRFQUMsXG4gICAgMHg4QjlGOiAweDRGOUIsXG4gICAgMHg4QkEwOiAweDRGQTAsXG4gICAgMHg4QkExOiAweDUwRDEsXG4gICAgMHg4QkEyOiAweDUxNDcsXG4gICAgMHg4QkEzOiAweDdBRjYsXG4gICAgMHg4QkE0OiAweDUxNzEsXG4gICAgMHg4QkE1OiAweDUxRjYsXG4gICAgMHg4QkE2OiAweDUzNTQsXG4gICAgMHg4QkE3OiAweDUzMjEsXG4gICAgMHg4QkE4OiAweDUzN0YsXG4gICAgMHg4QkE5OiAweDUzRUIsXG4gICAgMHg4QkFBOiAweDU1QUMsXG4gICAgMHg4QkFCOiAweDU4ODMsXG4gICAgMHg4QkFDOiAweDVDRTEsXG4gICAgMHg4QkFEOiAweDVGMzcsXG4gICAgMHg4QkFFOiAweDVGNEEsXG4gICAgMHg4QkFGOiAweDYwMkYsXG4gICAgMHg4QkIwOiAweDYwNTAsXG4gICAgMHg4QkIxOiAweDYwNkQsXG4gICAgMHg4QkIyOiAweDYzMUYsXG4gICAgMHg4QkIzOiAweDY1NTksXG4gICAgMHg4QkI0OiAweDZBNEIsXG4gICAgMHg4QkI1OiAweDZDQzEsXG4gICAgMHg4QkI2OiAweDcyQzIsXG4gICAgMHg4QkI3OiAweDcyRUQsXG4gICAgMHg4QkI4OiAweDc3RUYsXG4gICAgMHg4QkI5OiAweDgwRjgsXG4gICAgMHg4QkJBOiAweDgxMDUsXG4gICAgMHg4QkJCOiAweDgyMDgsXG4gICAgMHg4QkJDOiAweDg1NEUsXG4gICAgMHg4QkJEOiAweDkwRjcsXG4gICAgMHg4QkJFOiAweDkzRTEsXG4gICAgMHg4QkJGOiAweDk3RkYsXG4gICAgMHg4QkMwOiAweDk5NTcsXG4gICAgMHg4QkMxOiAweDlBNUEsXG4gICAgMHg4QkMyOiAweDRFRjAsXG4gICAgMHg4QkMzOiAweDUxREQsXG4gICAgMHg4QkM0OiAweDVDMkQsXG4gICAgMHg4QkM1OiAweDY2ODEsXG4gICAgMHg4QkM2OiAweDY5NkQsXG4gICAgMHg4QkM3OiAweDVDNDAsXG4gICAgMHg4QkM4OiAweDY2RjIsXG4gICAgMHg4QkM5OiAweDY5NzUsXG4gICAgMHg4QkNBOiAweDczODksXG4gICAgMHg4QkNCOiAweDY4NTAsXG4gICAgMHg4QkNDOiAweDdDODEsXG4gICAgMHg4QkNEOiAweDUwQzUsXG4gICAgMHg4QkNFOiAweDUyRTQsXG4gICAgMHg4QkNGOiAweDU3NDcsXG4gICAgMHg4QkQwOiAweDVERkUsXG4gICAgMHg4QkQxOiAweDkzMjYsXG4gICAgMHg4QkQyOiAweDY1QTQsXG4gICAgMHg4QkQzOiAweDZCMjMsXG4gICAgMHg4QkQ0OiAweDZCM0QsXG4gICAgMHg4QkQ1OiAweDc0MzQsXG4gICAgMHg4QkQ2OiAweDc5ODEsXG4gICAgMHg4QkQ3OiAweDc5QkQsXG4gICAgMHg4QkQ4OiAweDdCNEIsXG4gICAgMHg4QkQ5OiAweDdEQ0EsXG4gICAgMHg4QkRBOiAweDgyQjksXG4gICAgMHg4QkRCOiAweDgzQ0MsXG4gICAgMHg4QkRDOiAweDg4N0YsXG4gICAgMHg4QkREOiAweDg5NUYsXG4gICAgMHg4QkRFOiAweDhCMzksXG4gICAgMHg4QkRGOiAweDhGRDEsXG4gICAgMHg4QkUwOiAweDkxRDEsXG4gICAgMHg4QkUxOiAweDU0MUYsXG4gICAgMHg4QkUyOiAweDkyODAsXG4gICAgMHg4QkUzOiAweDRFNUQsXG4gICAgMHg4QkU0OiAweDUwMzYsXG4gICAgMHg4QkU1OiAweDUzRTUsXG4gICAgMHg4QkU2OiAweDUzM0EsXG4gICAgMHg4QkU3OiAweDcyRDcsXG4gICAgMHg4QkU4OiAweDczOTYsXG4gICAgMHg4QkU5OiAweDc3RTksXG4gICAgMHg4QkVBOiAweDgyRTYsXG4gICAgMHg4QkVCOiAweDhFQUYsXG4gICAgMHg4QkVDOiAweDk5QzYsXG4gICAgMHg4QkVEOiAweDk5QzgsXG4gICAgMHg4QkVFOiAweDk5RDIsXG4gICAgMHg4QkVGOiAweDUxNzcsXG4gICAgMHg4QkYwOiAweDYxMUEsXG4gICAgMHg4QkYxOiAweDg2NUUsXG4gICAgMHg4QkYyOiAweDU1QjAsXG4gICAgMHg4QkYzOiAweDdBN0EsXG4gICAgMHg4QkY0OiAweDUwNzYsXG4gICAgMHg4QkY1OiAweDVCRDMsXG4gICAgMHg4QkY2OiAweDkwNDcsXG4gICAgMHg4QkY3OiAweDk2ODUsXG4gICAgMHg4QkY4OiAweDRFMzIsXG4gICAgMHg4QkY5OiAweDZBREIsXG4gICAgMHg4QkZBOiAweDkxRTcsXG4gICAgMHg4QkZCOiAweDVDNTEsXG4gICAgMHg4QkZDOiAweDVDNDgsXG4gICAgMHg4QzQwOiAweDYzOTgsXG4gICAgMHg4QzQxOiAweDdBOUYsXG4gICAgMHg4QzQyOiAweDZDOTMsXG4gICAgMHg4QzQzOiAweDk3NzQsXG4gICAgMHg4QzQ0OiAweDhGNjEsXG4gICAgMHg4QzQ1OiAweDdBQUEsXG4gICAgMHg4QzQ2OiAweDcxOEEsXG4gICAgMHg4QzQ3OiAweDk2ODgsXG4gICAgMHg4QzQ4OiAweDdDODIsXG4gICAgMHg4QzQ5OiAweDY4MTcsXG4gICAgMHg4QzRBOiAweDdFNzAsXG4gICAgMHg4QzRCOiAweDY4NTEsXG4gICAgMHg4QzRDOiAweDkzNkMsXG4gICAgMHg4QzREOiAweDUyRjIsXG4gICAgMHg4QzRFOiAweDU0MUIsXG4gICAgMHg4QzRGOiAweDg1QUIsXG4gICAgMHg4QzUwOiAweDhBMTMsXG4gICAgMHg4QzUxOiAweDdGQTQsXG4gICAgMHg4QzUyOiAweDhFQ0QsXG4gICAgMHg4QzUzOiAweDkwRTEsXG4gICAgMHg4QzU0OiAweDUzNjYsXG4gICAgMHg4QzU1OiAweDg4ODgsXG4gICAgMHg4QzU2OiAweDc5NDEsXG4gICAgMHg4QzU3OiAweDRGQzIsXG4gICAgMHg4QzU4OiAweDUwQkUsXG4gICAgMHg4QzU5OiAweDUyMTEsXG4gICAgMHg4QzVBOiAweDUxNDQsXG4gICAgMHg4QzVCOiAweDU1NTMsXG4gICAgMHg4QzVDOiAweDU3MkQsXG4gICAgMHg4QzVEOiAweDczRUEsXG4gICAgMHg4QzVFOiAweDU3OEIsXG4gICAgMHg4QzVGOiAweDU5NTEsXG4gICAgMHg4QzYwOiAweDVGNjIsXG4gICAgMHg4QzYxOiAweDVGODQsXG4gICAgMHg4QzYyOiAweDYwNzUsXG4gICAgMHg4QzYzOiAweDYxNzYsXG4gICAgMHg4QzY0OiAweDYxNjcsXG4gICAgMHg4QzY1OiAweDYxQTksXG4gICAgMHg4QzY2OiAweDYzQjIsXG4gICAgMHg4QzY3OiAweDY0M0EsXG4gICAgMHg4QzY4OiAweDY1NkMsXG4gICAgMHg4QzY5OiAweDY2NkYsXG4gICAgMHg4QzZBOiAweDY4NDIsXG4gICAgMHg4QzZCOiAweDZFMTMsXG4gICAgMHg4QzZDOiAweDc1NjYsXG4gICAgMHg4QzZEOiAweDdBM0QsXG4gICAgMHg4QzZFOiAweDdDRkIsXG4gICAgMHg4QzZGOiAweDdENEMsXG4gICAgMHg4QzcwOiAweDdEOTksXG4gICAgMHg4QzcxOiAweDdFNEIsXG4gICAgMHg4QzcyOiAweDdGNkIsXG4gICAgMHg4QzczOiAweDgzMEUsXG4gICAgMHg4Qzc0OiAweDgzNEEsXG4gICAgMHg4Qzc1OiAweDg2Q0QsXG4gICAgMHg4Qzc2OiAweDhBMDgsXG4gICAgMHg4Qzc3OiAweDhBNjMsXG4gICAgMHg4Qzc4OiAweDhCNjYsXG4gICAgMHg4Qzc5OiAweDhFRkQsXG4gICAgMHg4QzdBOiAweDk4MUEsXG4gICAgMHg4QzdCOiAweDlEOEYsXG4gICAgMHg4QzdDOiAweDgyQjgsXG4gICAgMHg4QzdEOiAweDhGQ0UsXG4gICAgMHg4QzdFOiAweDlCRTgsXG4gICAgMHg4QzgwOiAweDUyODcsXG4gICAgMHg4QzgxOiAweDYyMUYsXG4gICAgMHg4QzgyOiAweDY0ODMsXG4gICAgMHg4QzgzOiAweDZGQzAsXG4gICAgMHg4Qzg0OiAweDk2OTksXG4gICAgMHg4Qzg1OiAweDY4NDEsXG4gICAgMHg4Qzg2OiAweDUwOTEsXG4gICAgMHg4Qzg3OiAweDZCMjAsXG4gICAgMHg4Qzg4OiAweDZDN0EsXG4gICAgMHg4Qzg5OiAweDZGNTQsXG4gICAgMHg4QzhBOiAweDdBNzQsXG4gICAgMHg4QzhCOiAweDdENTAsXG4gICAgMHg4QzhDOiAweDg4NDAsXG4gICAgMHg4QzhEOiAweDhBMjMsXG4gICAgMHg4QzhFOiAweDY3MDgsXG4gICAgMHg4QzhGOiAweDRFRjYsXG4gICAgMHg4QzkwOiAweDUwMzksXG4gICAgMHg4QzkxOiAweDUwMjYsXG4gICAgMHg4QzkyOiAweDUwNjUsXG4gICAgMHg4QzkzOiAweDUxN0MsXG4gICAgMHg4Qzk0OiAweDUyMzgsXG4gICAgMHg4Qzk1OiAweDUyNjMsXG4gICAgMHg4Qzk2OiAweDU1QTcsXG4gICAgMHg4Qzk3OiAweDU3MEYsXG4gICAgMHg4Qzk4OiAweDU4MDUsXG4gICAgMHg4Qzk5OiAweDVBQ0MsXG4gICAgMHg4QzlBOiAweDVFRkEsXG4gICAgMHg4QzlCOiAweDYxQjIsXG4gICAgMHg4QzlDOiAweDYxRjgsXG4gICAgMHg4QzlEOiAweDYyRjMsXG4gICAgMHg4QzlFOiAweDYzNzIsXG4gICAgMHg4QzlGOiAweDY5MUMsXG4gICAgMHg4Q0EwOiAweDZBMjksXG4gICAgMHg4Q0ExOiAweDcyN0QsXG4gICAgMHg4Q0EyOiAweDcyQUMsXG4gICAgMHg4Q0EzOiAweDczMkUsXG4gICAgMHg4Q0E0OiAweDc4MTQsXG4gICAgMHg4Q0E1OiAweDc4NkYsXG4gICAgMHg4Q0E2OiAweDdENzksXG4gICAgMHg4Q0E3OiAweDc3MEMsXG4gICAgMHg4Q0E4OiAweDgwQTksXG4gICAgMHg4Q0E5OiAweDg5OEIsXG4gICAgMHg4Q0FBOiAweDhCMTksXG4gICAgMHg4Q0FCOiAweDhDRTIsXG4gICAgMHg4Q0FDOiAweDhFRDIsXG4gICAgMHg4Q0FEOiAweDkwNjMsXG4gICAgMHg4Q0FFOiAweDkzNzUsXG4gICAgMHg4Q0FGOiAweDk2N0EsXG4gICAgMHg4Q0IwOiAweDk4NTUsXG4gICAgMHg4Q0IxOiAweDlBMTMsXG4gICAgMHg4Q0IyOiAweDlFNzgsXG4gICAgMHg4Q0IzOiAweDUxNDMsXG4gICAgMHg4Q0I0OiAweDUzOUYsXG4gICAgMHg4Q0I1OiAweDUzQjMsXG4gICAgMHg4Q0I2OiAweDVFN0IsXG4gICAgMHg4Q0I3OiAweDVGMjYsXG4gICAgMHg4Q0I4OiAweDZFMUIsXG4gICAgMHg4Q0I5OiAweDZFOTAsXG4gICAgMHg4Q0JBOiAweDczODQsXG4gICAgMHg4Q0JCOiAweDczRkUsXG4gICAgMHg4Q0JDOiAweDdENDMsXG4gICAgMHg4Q0JEOiAweDgyMzcsXG4gICAgMHg4Q0JFOiAweDhBMDAsXG4gICAgMHg4Q0JGOiAweDhBRkEsXG4gICAgMHg4Q0MwOiAweDk2NTAsXG4gICAgMHg4Q0MxOiAweDRFNEUsXG4gICAgMHg4Q0MyOiAweDUwMEIsXG4gICAgMHg4Q0MzOiAweDUzRTQsXG4gICAgMHg4Q0M0OiAweDU0N0MsXG4gICAgMHg4Q0M1OiAweDU2RkEsXG4gICAgMHg4Q0M2OiAweDU5RDEsXG4gICAgMHg4Q0M3OiAweDVCNjQsXG4gICAgMHg4Q0M4OiAweDVERjEsXG4gICAgMHg4Q0M5OiAweDVFQUIsXG4gICAgMHg4Q0NBOiAweDVGMjcsXG4gICAgMHg4Q0NCOiAweDYyMzgsXG4gICAgMHg4Q0NDOiAweDY1NDUsXG4gICAgMHg4Q0NEOiAweDY3QUYsXG4gICAgMHg4Q0NFOiAweDZFNTYsXG4gICAgMHg4Q0NGOiAweDcyRDAsXG4gICAgMHg4Q0QwOiAweDdDQ0EsXG4gICAgMHg4Q0QxOiAweDg4QjQsXG4gICAgMHg4Q0QyOiAweDgwQTEsXG4gICAgMHg4Q0QzOiAweDgwRTEsXG4gICAgMHg4Q0Q0OiAweDgzRjAsXG4gICAgMHg4Q0Q1OiAweDg2NEUsXG4gICAgMHg4Q0Q2OiAweDhBODcsXG4gICAgMHg4Q0Q3OiAweDhERTgsXG4gICAgMHg4Q0Q4OiAweDkyMzcsXG4gICAgMHg4Q0Q5OiAweDk2QzcsXG4gICAgMHg4Q0RBOiAweDk4NjcsXG4gICAgMHg4Q0RCOiAweDlGMTMsXG4gICAgMHg4Q0RDOiAweDRFOTQsXG4gICAgMHg4Q0REOiAweDRFOTIsXG4gICAgMHg4Q0RFOiAweDRGMEQsXG4gICAgMHg4Q0RGOiAweDUzNDgsXG4gICAgMHg4Q0UwOiAweDU0NDksXG4gICAgMHg4Q0UxOiAweDU0M0UsXG4gICAgMHg4Q0UyOiAweDVBMkYsXG4gICAgMHg4Q0UzOiAweDVGOEMsXG4gICAgMHg4Q0U0OiAweDVGQTEsXG4gICAgMHg4Q0U1OiAweDYwOUYsXG4gICAgMHg4Q0U2OiAweDY4QTcsXG4gICAgMHg4Q0U3OiAweDZBOEUsXG4gICAgMHg4Q0U4OiAweDc0NUEsXG4gICAgMHg4Q0U5OiAweDc4ODEsXG4gICAgMHg4Q0VBOiAweDhBOUUsXG4gICAgMHg4Q0VCOiAweDhBQTQsXG4gICAgMHg4Q0VDOiAweDhCNzcsXG4gICAgMHg4Q0VEOiAweDkxOTAsXG4gICAgMHg4Q0VFOiAweDRFNUUsXG4gICAgMHg4Q0VGOiAweDlCQzksXG4gICAgMHg4Q0YwOiAweDRFQTQsXG4gICAgMHg4Q0YxOiAweDRGN0MsXG4gICAgMHg4Q0YyOiAweDRGQUYsXG4gICAgMHg4Q0YzOiAweDUwMTksXG4gICAgMHg4Q0Y0OiAweDUwMTYsXG4gICAgMHg4Q0Y1OiAweDUxNDksXG4gICAgMHg4Q0Y2OiAweDUxNkMsXG4gICAgMHg4Q0Y3OiAweDUyOUYsXG4gICAgMHg4Q0Y4OiAweDUyQjksXG4gICAgMHg4Q0Y5OiAweDUyRkUsXG4gICAgMHg4Q0ZBOiAweDUzOUEsXG4gICAgMHg4Q0ZCOiAweDUzRTMsXG4gICAgMHg4Q0ZDOiAweDU0MTEsXG4gICAgMHg4RDQwOiAweDU0MEUsXG4gICAgMHg4RDQxOiAweDU1ODksXG4gICAgMHg4RDQyOiAweDU3NTEsXG4gICAgMHg4RDQzOiAweDU3QTIsXG4gICAgMHg4RDQ0OiAweDU5N0QsXG4gICAgMHg4RDQ1OiAweDVCNTQsXG4gICAgMHg4RDQ2OiAweDVCNUQsXG4gICAgMHg4RDQ3OiAweDVCOEYsXG4gICAgMHg4RDQ4OiAweDVERTUsXG4gICAgMHg4RDQ5OiAweDVERTcsXG4gICAgMHg4RDRBOiAweDVERjcsXG4gICAgMHg4RDRCOiAweDVFNzgsXG4gICAgMHg4RDRDOiAweDVFODMsXG4gICAgMHg4RDREOiAweDVFOUEsXG4gICAgMHg4RDRFOiAweDVFQjcsXG4gICAgMHg4RDRGOiAweDVGMTgsXG4gICAgMHg4RDUwOiAweDYwNTIsXG4gICAgMHg4RDUxOiAweDYxNEMsXG4gICAgMHg4RDUyOiAweDYyOTcsXG4gICAgMHg4RDUzOiAweDYyRDgsXG4gICAgMHg4RDU0OiAweDYzQTcsXG4gICAgMHg4RDU1OiAweDY1M0IsXG4gICAgMHg4RDU2OiAweDY2MDIsXG4gICAgMHg4RDU3OiAweDY2NDMsXG4gICAgMHg4RDU4OiAweDY2RjQsXG4gICAgMHg4RDU5OiAweDY3NkQsXG4gICAgMHg4RDVBOiAweDY4MjEsXG4gICAgMHg4RDVCOiAweDY4OTcsXG4gICAgMHg4RDVDOiAweDY5Q0IsXG4gICAgMHg4RDVEOiAweDZDNUYsXG4gICAgMHg4RDVFOiAweDZEMkEsXG4gICAgMHg4RDVGOiAweDZENjksXG4gICAgMHg4RDYwOiAweDZFMkYsXG4gICAgMHg4RDYxOiAweDZFOUQsXG4gICAgMHg4RDYyOiAweDc1MzIsXG4gICAgMHg4RDYzOiAweDc2ODcsXG4gICAgMHg4RDY0OiAweDc4NkMsXG4gICAgMHg4RDY1OiAweDdBM0YsXG4gICAgMHg4RDY2OiAweDdDRTAsXG4gICAgMHg4RDY3OiAweDdEMDUsXG4gICAgMHg4RDY4OiAweDdEMTgsXG4gICAgMHg4RDY5OiAweDdENUUsXG4gICAgMHg4RDZBOiAweDdEQjEsXG4gICAgMHg4RDZCOiAweDgwMTUsXG4gICAgMHg4RDZDOiAweDgwMDMsXG4gICAgMHg4RDZEOiAweDgwQUYsXG4gICAgMHg4RDZFOiAweDgwQjEsXG4gICAgMHg4RDZGOiAweDgxNTQsXG4gICAgMHg4RDcwOiAweDgxOEYsXG4gICAgMHg4RDcxOiAweDgyMkEsXG4gICAgMHg4RDcyOiAweDgzNTIsXG4gICAgMHg4RDczOiAweDg4NEMsXG4gICAgMHg4RDc0OiAweDg4NjEsXG4gICAgMHg4RDc1OiAweDhCMUIsXG4gICAgMHg4RDc2OiAweDhDQTIsXG4gICAgMHg4RDc3OiAweDhDRkMsXG4gICAgMHg4RDc4OiAweDkwQ0EsXG4gICAgMHg4RDc5OiAweDkxNzUsXG4gICAgMHg4RDdBOiAweDkyNzEsXG4gICAgMHg4RDdCOiAweDc4M0YsXG4gICAgMHg4RDdDOiAweDkyRkMsXG4gICAgMHg4RDdEOiAweDk1QTQsXG4gICAgMHg4RDdFOiAweDk2NEQsXG4gICAgMHg4RDgwOiAweDk4MDUsXG4gICAgMHg4RDgxOiAweDk5OTksXG4gICAgMHg4RDgyOiAweDlBRDgsXG4gICAgMHg4RDgzOiAweDlEM0IsXG4gICAgMHg4RDg0OiAweDUyNUIsXG4gICAgMHg4RDg1OiAweDUyQUIsXG4gICAgMHg4RDg2OiAweDUzRjcsXG4gICAgMHg4RDg3OiAweDU0MDgsXG4gICAgMHg4RDg4OiAweDU4RDUsXG4gICAgMHg4RDg5OiAweDYyRjcsXG4gICAgMHg4RDhBOiAweDZGRTAsXG4gICAgMHg4RDhCOiAweDhDNkEsXG4gICAgMHg4RDhDOiAweDhGNUYsXG4gICAgMHg4RDhEOiAweDlFQjksXG4gICAgMHg4RDhFOiAweDUxNEIsXG4gICAgMHg4RDhGOiAweDUyM0IsXG4gICAgMHg4RDkwOiAweDU0NEEsXG4gICAgMHg4RDkxOiAweDU2RkQsXG4gICAgMHg4RDkyOiAweDdBNDAsXG4gICAgMHg4RDkzOiAweDkxNzcsXG4gICAgMHg4RDk0OiAweDlENjAsXG4gICAgMHg4RDk1OiAweDlFRDIsXG4gICAgMHg4RDk2OiAweDczNDQsXG4gICAgMHg4RDk3OiAweDZGMDksXG4gICAgMHg4RDk4OiAweDgxNzAsXG4gICAgMHg4RDk5OiAweDc1MTEsXG4gICAgMHg4RDlBOiAweDVGRkQsXG4gICAgMHg4RDlCOiAweDYwREEsXG4gICAgMHg4RDlDOiAweDlBQTgsXG4gICAgMHg4RDlEOiAweDcyREIsXG4gICAgMHg4RDlFOiAweDhGQkMsXG4gICAgMHg4RDlGOiAweDZCNjQsXG4gICAgMHg4REEwOiAweDk4MDMsXG4gICAgMHg4REExOiAweDRFQ0EsXG4gICAgMHg4REEyOiAweDU2RjAsXG4gICAgMHg4REEzOiAweDU3NjQsXG4gICAgMHg4REE0OiAweDU4QkUsXG4gICAgMHg4REE1OiAweDVBNUEsXG4gICAgMHg4REE2OiAweDYwNjgsXG4gICAgMHg4REE3OiAweDYxQzcsXG4gICAgMHg4REE4OiAweDY2MEYsXG4gICAgMHg4REE5OiAweDY2MDYsXG4gICAgMHg4REFBOiAweDY4MzksXG4gICAgMHg4REFCOiAweDY4QjEsXG4gICAgMHg4REFDOiAweDZERjcsXG4gICAgMHg4REFEOiAweDc1RDUsXG4gICAgMHg4REFFOiAweDdEM0EsXG4gICAgMHg4REFGOiAweDgyNkUsXG4gICAgMHg4REIwOiAweDlCNDIsXG4gICAgMHg4REIxOiAweDRFOUIsXG4gICAgMHg4REIyOiAweDRGNTAsXG4gICAgMHg4REIzOiAweDUzQzksXG4gICAgMHg4REI0OiAweDU1MDYsXG4gICAgMHg4REI1OiAweDVENkYsXG4gICAgMHg4REI2OiAweDVERTYsXG4gICAgMHg4REI3OiAweDVERUUsXG4gICAgMHg4REI4OiAweDY3RkIsXG4gICAgMHg4REI5OiAweDZDOTksXG4gICAgMHg4REJBOiAweDc0NzMsXG4gICAgMHg4REJCOiAweDc4MDIsXG4gICAgMHg4REJDOiAweDhBNTAsXG4gICAgMHg4REJEOiAweDkzOTYsXG4gICAgMHg4REJFOiAweDg4REYsXG4gICAgMHg4REJGOiAweDU3NTAsXG4gICAgMHg4REMwOiAweDVFQTcsXG4gICAgMHg4REMxOiAweDYzMkIsXG4gICAgMHg4REMyOiAweDUwQjUsXG4gICAgMHg4REMzOiAweDUwQUMsXG4gICAgMHg4REM0OiAweDUxOEQsXG4gICAgMHg4REM1OiAweDY3MDAsXG4gICAgMHg4REM2OiAweDU0QzksXG4gICAgMHg4REM3OiAweDU4NUUsXG4gICAgMHg4REM4OiAweDU5QkIsXG4gICAgMHg4REM5OiAweDVCQjAsXG4gICAgMHg4RENBOiAweDVGNjksXG4gICAgMHg4RENCOiAweDYyNEQsXG4gICAgMHg4RENDOiAweDYzQTEsXG4gICAgMHg4RENEOiAweDY4M0QsXG4gICAgMHg4RENFOiAweDZCNzMsXG4gICAgMHg4RENGOiAweDZFMDgsXG4gICAgMHg4REQwOiAweDcwN0QsXG4gICAgMHg4REQxOiAweDkxQzcsXG4gICAgMHg4REQyOiAweDcyODAsXG4gICAgMHg4REQzOiAweDc4MTUsXG4gICAgMHg4REQ0OiAweDc4MjYsXG4gICAgMHg4REQ1OiAweDc5NkQsXG4gICAgMHg4REQ2OiAweDY1OEUsXG4gICAgMHg4REQ3OiAweDdEMzAsXG4gICAgMHg4REQ4OiAweDgzREMsXG4gICAgMHg4REQ5OiAweDg4QzEsXG4gICAgMHg4RERBOiAweDhGMDksXG4gICAgMHg4RERCOiAweDk2OUIsXG4gICAgMHg4RERDOiAweDUyNjQsXG4gICAgMHg4REREOiAweDU3MjgsXG4gICAgMHg4RERFOiAweDY3NTAsXG4gICAgMHg4RERGOiAweDdGNkEsXG4gICAgMHg4REUwOiAweDhDQTEsXG4gICAgMHg4REUxOiAweDUxQjQsXG4gICAgMHg4REUyOiAweDU3NDIsXG4gICAgMHg4REUzOiAweDk2MkEsXG4gICAgMHg4REU0OiAweDU4M0EsXG4gICAgMHg4REU1OiAweDY5OEEsXG4gICAgMHg4REU2OiAweDgwQjQsXG4gICAgMHg4REU3OiAweDU0QjIsXG4gICAgMHg4REU4OiAweDVEMEUsXG4gICAgMHg4REU5OiAweDU3RkMsXG4gICAgMHg4REVBOiAweDc4OTUsXG4gICAgMHg4REVCOiAweDlERkEsXG4gICAgMHg4REVDOiAweDRGNUMsXG4gICAgMHg4REVEOiAweDUyNEEsXG4gICAgMHg4REVFOiAweDU0OEIsXG4gICAgMHg4REVGOiAweDY0M0UsXG4gICAgMHg4REYwOiAweDY2MjgsXG4gICAgMHg4REYxOiAweDY3MTQsXG4gICAgMHg4REYyOiAweDY3RjUsXG4gICAgMHg4REYzOiAweDdBODQsXG4gICAgMHg4REY0OiAweDdCNTYsXG4gICAgMHg4REY1OiAweDdEMjIsXG4gICAgMHg4REY2OiAweDkzMkYsXG4gICAgMHg4REY3OiAweDY4NUMsXG4gICAgMHg4REY4OiAweDlCQUQsXG4gICAgMHg4REY5OiAweDdCMzksXG4gICAgMHg4REZBOiAweDUzMTksXG4gICAgMHg4REZCOiAweDUxOEEsXG4gICAgMHg4REZDOiAweDUyMzcsXG4gICAgMHg4RTQwOiAweDVCREYsXG4gICAgMHg4RTQxOiAweDYyRjYsXG4gICAgMHg4RTQyOiAweDY0QUUsXG4gICAgMHg4RTQzOiAweDY0RTYsXG4gICAgMHg4RTQ0OiAweDY3MkQsXG4gICAgMHg4RTQ1OiAweDZCQkEsXG4gICAgMHg4RTQ2OiAweDg1QTksXG4gICAgMHg4RTQ3OiAweDk2RDEsXG4gICAgMHg4RTQ4OiAweDc2OTAsXG4gICAgMHg4RTQ5OiAweDlCRDYsXG4gICAgMHg4RTRBOiAweDYzNEMsXG4gICAgMHg4RTRCOiAweDkzMDYsXG4gICAgMHg4RTRDOiAweDlCQUIsXG4gICAgMHg4RTREOiAweDc2QkYsXG4gICAgMHg4RTRFOiAweDY2NTIsXG4gICAgMHg4RTRGOiAweDRFMDksXG4gICAgMHg4RTUwOiAweDUwOTgsXG4gICAgMHg4RTUxOiAweDUzQzIsXG4gICAgMHg4RTUyOiAweDVDNzEsXG4gICAgMHg4RTUzOiAweDYwRTgsXG4gICAgMHg4RTU0OiAweDY0OTIsXG4gICAgMHg4RTU1OiAweDY1NjMsXG4gICAgMHg4RTU2OiAweDY4NUYsXG4gICAgMHg4RTU3OiAweDcxRTYsXG4gICAgMHg4RTU4OiAweDczQ0EsXG4gICAgMHg4RTU5OiAweDc1MjMsXG4gICAgMHg4RTVBOiAweDdCOTcsXG4gICAgMHg4RTVCOiAweDdFODIsXG4gICAgMHg4RTVDOiAweDg2OTUsXG4gICAgMHg4RTVEOiAweDhCODMsXG4gICAgMHg4RTVFOiAweDhDREIsXG4gICAgMHg4RTVGOiAweDkxNzgsXG4gICAgMHg4RTYwOiAweDk5MTAsXG4gICAgMHg4RTYxOiAweDY1QUMsXG4gICAgMHg4RTYyOiAweDY2QUIsXG4gICAgMHg4RTYzOiAweDZCOEIsXG4gICAgMHg4RTY0OiAweDRFRDUsXG4gICAgMHg4RTY1OiAweDRFRDQsXG4gICAgMHg4RTY2OiAweDRGM0EsXG4gICAgMHg4RTY3OiAweDRGN0YsXG4gICAgMHg4RTY4OiAweDUyM0EsXG4gICAgMHg4RTY5OiAweDUzRjgsXG4gICAgMHg4RTZBOiAweDUzRjIsXG4gICAgMHg4RTZCOiAweDU1RTMsXG4gICAgMHg4RTZDOiAweDU2REIsXG4gICAgMHg4RTZEOiAweDU4RUIsXG4gICAgMHg4RTZFOiAweDU5Q0IsXG4gICAgMHg4RTZGOiAweDU5QzksXG4gICAgMHg4RTcwOiAweDU5RkYsXG4gICAgMHg4RTcxOiAweDVCNTAsXG4gICAgMHg4RTcyOiAweDVDNEQsXG4gICAgMHg4RTczOiAweDVFMDIsXG4gICAgMHg4RTc0OiAweDVFMkIsXG4gICAgMHg4RTc1OiAweDVGRDcsXG4gICAgMHg4RTc2OiAweDYwMUQsXG4gICAgMHg4RTc3OiAweDYzMDcsXG4gICAgMHg4RTc4OiAweDY1MkYsXG4gICAgMHg4RTc5OiAweDVCNUMsXG4gICAgMHg4RTdBOiAweDY1QUYsXG4gICAgMHg4RTdCOiAweDY1QkQsXG4gICAgMHg4RTdDOiAweDY1RTgsXG4gICAgMHg4RTdEOiAweDY3OUQsXG4gICAgMHg4RTdFOiAweDZCNjIsXG4gICAgMHg4RTgwOiAweDZCN0IsXG4gICAgMHg4RTgxOiAweDZDMEYsXG4gICAgMHg4RTgyOiAweDczNDUsXG4gICAgMHg4RTgzOiAweDc5NDksXG4gICAgMHg4RTg0OiAweDc5QzEsXG4gICAgMHg4RTg1OiAweDdDRjgsXG4gICAgMHg4RTg2OiAweDdEMTksXG4gICAgMHg4RTg3OiAweDdEMkIsXG4gICAgMHg4RTg4OiAweDgwQTIsXG4gICAgMHg4RTg5OiAweDgxMDIsXG4gICAgMHg4RThBOiAweDgxRjMsXG4gICAgMHg4RThCOiAweDg5OTYsXG4gICAgMHg4RThDOiAweDhBNUUsXG4gICAgMHg4RThEOiAweDhBNjksXG4gICAgMHg4RThFOiAweDhBNjYsXG4gICAgMHg4RThGOiAweDhBOEMsXG4gICAgMHg4RTkwOiAweDhBRUUsXG4gICAgMHg4RTkxOiAweDhDQzcsXG4gICAgMHg4RTkyOiAweDhDREMsXG4gICAgMHg4RTkzOiAweDk2Q0MsXG4gICAgMHg4RTk0OiAweDk4RkMsXG4gICAgMHg4RTk1OiAweDZCNkYsXG4gICAgMHg4RTk2OiAweDRFOEIsXG4gICAgMHg4RTk3OiAweDRGM0MsXG4gICAgMHg4RTk4OiAweDRGOEQsXG4gICAgMHg4RTk5OiAweDUxNTAsXG4gICAgMHg4RTlBOiAweDVCNTcsXG4gICAgMHg4RTlCOiAweDVCRkEsXG4gICAgMHg4RTlDOiAweDYxNDgsXG4gICAgMHg4RTlEOiAweDYzMDEsXG4gICAgMHg4RTlFOiAweDY2NDIsXG4gICAgMHg4RTlGOiAweDZCMjEsXG4gICAgMHg4RUEwOiAweDZFQ0IsXG4gICAgMHg4RUExOiAweDZDQkIsXG4gICAgMHg4RUEyOiAweDcyM0UsXG4gICAgMHg4RUEzOiAweDc0QkQsXG4gICAgMHg4RUE0OiAweDc1RDQsXG4gICAgMHg4RUE1OiAweDc4QzEsXG4gICAgMHg4RUE2OiAweDc5M0EsXG4gICAgMHg4RUE3OiAweDgwMEMsXG4gICAgMHg4RUE4OiAweDgwMzMsXG4gICAgMHg4RUE5OiAweDgxRUEsXG4gICAgMHg4RUFBOiAweDg0OTQsXG4gICAgMHg4RUFCOiAweDhGOUUsXG4gICAgMHg4RUFDOiAweDZDNTAsXG4gICAgMHg4RUFEOiAweDlFN0YsXG4gICAgMHg4RUFFOiAweDVGMEYsXG4gICAgMHg4RUFGOiAweDhCNTgsXG4gICAgMHg4RUIwOiAweDlEMkIsXG4gICAgMHg4RUIxOiAweDdBRkEsXG4gICAgMHg4RUIyOiAweDhFRjgsXG4gICAgMHg4RUIzOiAweDVCOEQsXG4gICAgMHg4RUI0OiAweDk2RUIsXG4gICAgMHg4RUI1OiAweDRFMDMsXG4gICAgMHg4RUI2OiAweDUzRjEsXG4gICAgMHg4RUI3OiAweDU3RjcsXG4gICAgMHg4RUI4OiAweDU5MzEsXG4gICAgMHg4RUI5OiAweDVBQzksXG4gICAgMHg4RUJBOiAweDVCQTQsXG4gICAgMHg4RUJCOiAweDYwODksXG4gICAgMHg4RUJDOiAweDZFN0YsXG4gICAgMHg4RUJEOiAweDZGMDYsXG4gICAgMHg4RUJFOiAweDc1QkUsXG4gICAgMHg4RUJGOiAweDhDRUEsXG4gICAgMHg4RUMwOiAweDVCOUYsXG4gICAgMHg4RUMxOiAweDg1MDAsXG4gICAgMHg4RUMyOiAweDdCRTAsXG4gICAgMHg4RUMzOiAweDUwNzIsXG4gICAgMHg4RUM0OiAweDY3RjQsXG4gICAgMHg4RUM1OiAweDgyOUQsXG4gICAgMHg4RUM2OiAweDVDNjEsXG4gICAgMHg4RUM3OiAweDg1NEEsXG4gICAgMHg4RUM4OiAweDdFMUUsXG4gICAgMHg4RUM5OiAweDgyMEUsXG4gICAgMHg4RUNBOiAweDUxOTksXG4gICAgMHg4RUNCOiAweDVDMDQsXG4gICAgMHg4RUNDOiAweDYzNjgsXG4gICAgMHg4RUNEOiAweDhENjYsXG4gICAgMHg4RUNFOiAweDY1OUMsXG4gICAgMHg4RUNGOiAweDcxNkUsXG4gICAgMHg4RUQwOiAweDc5M0UsXG4gICAgMHg4RUQxOiAweDdEMTcsXG4gICAgMHg4RUQyOiAweDgwMDUsXG4gICAgMHg4RUQzOiAweDhCMUQsXG4gICAgMHg4RUQ0OiAweDhFQ0EsXG4gICAgMHg4RUQ1OiAweDkwNkUsXG4gICAgMHg4RUQ2OiAweDg2QzcsXG4gICAgMHg4RUQ3OiAweDkwQUEsXG4gICAgMHg4RUQ4OiAweDUwMUYsXG4gICAgMHg4RUQ5OiAweDUyRkEsXG4gICAgMHg4RURBOiAweDVDM0EsXG4gICAgMHg4RURCOiAweDY3NTMsXG4gICAgMHg4RURDOiAweDcwN0MsXG4gICAgMHg4RUREOiAweDcyMzUsXG4gICAgMHg4RURFOiAweDkxNEMsXG4gICAgMHg4RURGOiAweDkxQzgsXG4gICAgMHg4RUUwOiAweDkzMkIsXG4gICAgMHg4RUUxOiAweDgyRTUsXG4gICAgMHg4RUUyOiAweDVCQzIsXG4gICAgMHg4RUUzOiAweDVGMzEsXG4gICAgMHg4RUU0OiAweDYwRjksXG4gICAgMHg4RUU1OiAweDRFM0IsXG4gICAgMHg4RUU2OiAweDUzRDYsXG4gICAgMHg4RUU3OiAweDVCODgsXG4gICAgMHg4RUU4OiAweDYyNEIsXG4gICAgMHg4RUU5OiAweDY3MzEsXG4gICAgMHg4RUVBOiAweDZCOEEsXG4gICAgMHg4RUVCOiAweDcyRTksXG4gICAgMHg4RUVDOiAweDczRTAsXG4gICAgMHg4RUVEOiAweDdBMkUsXG4gICAgMHg4RUVFOiAweDgxNkIsXG4gICAgMHg4RUVGOiAweDhEQTMsXG4gICAgMHg4RUYwOiAweDkxNTIsXG4gICAgMHg4RUYxOiAweDk5OTYsXG4gICAgMHg4RUYyOiAweDUxMTIsXG4gICAgMHg4RUYzOiAweDUzRDcsXG4gICAgMHg4RUY0OiAweDU0NkEsXG4gICAgMHg4RUY1OiAweDVCRkYsXG4gICAgMHg4RUY2OiAweDYzODgsXG4gICAgMHg4RUY3OiAweDZBMzksXG4gICAgMHg4RUY4OiAweDdEQUMsXG4gICAgMHg4RUY5OiAweDk3MDAsXG4gICAgMHg4RUZBOiAweDU2REEsXG4gICAgMHg4RUZCOiAweDUzQ0UsXG4gICAgMHg4RUZDOiAweDU0NjgsXG4gICAgMHg4RjQwOiAweDVCOTcsXG4gICAgMHg4RjQxOiAweDVDMzEsXG4gICAgMHg4RjQyOiAweDVEREUsXG4gICAgMHg4RjQzOiAweDRGRUUsXG4gICAgMHg4RjQ0OiAweDYxMDEsXG4gICAgMHg4RjQ1OiAweDYyRkUsXG4gICAgMHg4RjQ2OiAweDZEMzIsXG4gICAgMHg4RjQ3OiAweDc5QzAsXG4gICAgMHg4RjQ4OiAweDc5Q0IsXG4gICAgMHg4RjQ5OiAweDdENDIsXG4gICAgMHg4RjRBOiAweDdFNEQsXG4gICAgMHg4RjRCOiAweDdGRDIsXG4gICAgMHg4RjRDOiAweDgxRUQsXG4gICAgMHg4RjREOiAweDgyMUYsXG4gICAgMHg4RjRFOiAweDg0OTAsXG4gICAgMHg4RjRGOiAweDg4NDYsXG4gICAgMHg4RjUwOiAweDg5NzIsXG4gICAgMHg4RjUxOiAweDhCOTAsXG4gICAgMHg4RjUyOiAweDhFNzQsXG4gICAgMHg4RjUzOiAweDhGMkYsXG4gICAgMHg4RjU0OiAweDkwMzEsXG4gICAgMHg4RjU1OiAweDkxNEIsXG4gICAgMHg4RjU2OiAweDkxNkMsXG4gICAgMHg4RjU3OiAweDk2QzYsXG4gICAgMHg4RjU4OiAweDkxOUMsXG4gICAgMHg4RjU5OiAweDRFQzAsXG4gICAgMHg4RjVBOiAweDRGNEYsXG4gICAgMHg4RjVCOiAweDUxNDUsXG4gICAgMHg4RjVDOiAweDUzNDEsXG4gICAgMHg4RjVEOiAweDVGOTMsXG4gICAgMHg4RjVFOiAweDYyMEUsXG4gICAgMHg4RjVGOiAweDY3RDQsXG4gICAgMHg4RjYwOiAweDZDNDEsXG4gICAgMHg4RjYxOiAweDZFMEIsXG4gICAgMHg4RjYyOiAweDczNjMsXG4gICAgMHg4RjYzOiAweDdFMjYsXG4gICAgMHg4RjY0OiAweDkxQ0QsXG4gICAgMHg4RjY1OiAweDkyODMsXG4gICAgMHg4RjY2OiAweDUzRDQsXG4gICAgMHg4RjY3OiAweDU5MTksXG4gICAgMHg4RjY4OiAweDVCQkYsXG4gICAgMHg4RjY5OiAweDZERDEsXG4gICAgMHg4RjZBOiAweDc5NUQsXG4gICAgMHg4RjZCOiAweDdFMkUsXG4gICAgMHg4RjZDOiAweDdDOUIsXG4gICAgMHg4RjZEOiAweDU4N0UsXG4gICAgMHg4RjZFOiAweDcxOUYsXG4gICAgMHg4RjZGOiAweDUxRkEsXG4gICAgMHg4RjcwOiAweDg4NTMsXG4gICAgMHg4RjcxOiAweDhGRjAsXG4gICAgMHg4RjcyOiAweDRGQ0EsXG4gICAgMHg4RjczOiAweDVDRkIsXG4gICAgMHg4Rjc0OiAweDY2MjUsXG4gICAgMHg4Rjc1OiAweDc3QUMsXG4gICAgMHg4Rjc2OiAweDdBRTMsXG4gICAgMHg4Rjc3OiAweDgyMUMsXG4gICAgMHg4Rjc4OiAweDk5RkYsXG4gICAgMHg4Rjc5OiAweDUxQzYsXG4gICAgMHg4RjdBOiAweDVGQUEsXG4gICAgMHg4RjdCOiAweDY1RUMsXG4gICAgMHg4RjdDOiAweDY5NkYsXG4gICAgMHg4RjdEOiAweDZCODksXG4gICAgMHg4RjdFOiAweDZERjMsXG4gICAgMHg4RjgwOiAweDZFOTYsXG4gICAgMHg4RjgxOiAweDZGNjQsXG4gICAgMHg4RjgyOiAweDc2RkUsXG4gICAgMHg4RjgzOiAweDdEMTQsXG4gICAgMHg4Rjg0OiAweDVERTEsXG4gICAgMHg4Rjg1OiAweDkwNzUsXG4gICAgMHg4Rjg2OiAweDkxODcsXG4gICAgMHg4Rjg3OiAweDk4MDYsXG4gICAgMHg4Rjg4OiAweDUxRTYsXG4gICAgMHg4Rjg5OiAweDUyMUQsXG4gICAgMHg4RjhBOiAweDYyNDAsXG4gICAgMHg4RjhCOiAweDY2OTEsXG4gICAgMHg4RjhDOiAweDY2RDksXG4gICAgMHg4RjhEOiAweDZFMUEsXG4gICAgMHg4RjhFOiAweDVFQjYsXG4gICAgMHg4RjhGOiAweDdERDIsXG4gICAgMHg4RjkwOiAweDdGNzIsXG4gICAgMHg4RjkxOiAweDY2RjgsXG4gICAgMHg4RjkyOiAweDg1QUYsXG4gICAgMHg4RjkzOiAweDg1RjcsXG4gICAgMHg4Rjk0OiAweDhBRjgsXG4gICAgMHg4Rjk1OiAweDUyQTksXG4gICAgMHg4Rjk2OiAweDUzRDksXG4gICAgMHg4Rjk3OiAweDU5NzMsXG4gICAgMHg4Rjk4OiAweDVFOEYsXG4gICAgMHg4Rjk5OiAweDVGOTAsXG4gICAgMHg4RjlBOiAweDYwNTUsXG4gICAgMHg4RjlCOiAweDkyRTQsXG4gICAgMHg4RjlDOiAweDk2NjQsXG4gICAgMHg4RjlEOiAweDUwQjcsXG4gICAgMHg4RjlFOiAweDUxMUYsXG4gICAgMHg4RjlGOiAweDUyREQsXG4gICAgMHg4RkEwOiAweDUzMjAsXG4gICAgMHg4RkExOiAweDUzNDcsXG4gICAgMHg4RkEyOiAweDUzRUMsXG4gICAgMHg4RkEzOiAweDU0RTgsXG4gICAgMHg4RkE0OiAweDU1NDYsXG4gICAgMHg4RkE1OiAweDU1MzEsXG4gICAgMHg4RkE2OiAweDU2MTcsXG4gICAgMHg4RkE3OiAweDU5NjgsXG4gICAgMHg4RkE4OiAweDU5QkUsXG4gICAgMHg4RkE5OiAweDVBM0MsXG4gICAgMHg4RkFBOiAweDVCQjUsXG4gICAgMHg4RkFCOiAweDVDMDYsXG4gICAgMHg4RkFDOiAweDVDMEYsXG4gICAgMHg4RkFEOiAweDVDMTEsXG4gICAgMHg4RkFFOiAweDVDMUEsXG4gICAgMHg4RkFGOiAweDVFODQsXG4gICAgMHg4RkIwOiAweDVFOEEsXG4gICAgMHg4RkIxOiAweDVFRTAsXG4gICAgMHg4RkIyOiAweDVGNzAsXG4gICAgMHg4RkIzOiAweDYyN0YsXG4gICAgMHg4RkI0OiAweDYyODQsXG4gICAgMHg4RkI1OiAweDYyREIsXG4gICAgMHg4RkI2OiAweDYzOEMsXG4gICAgMHg4RkI3OiAweDYzNzcsXG4gICAgMHg4RkI4OiAweDY2MDcsXG4gICAgMHg4RkI5OiAweDY2MEMsXG4gICAgMHg4RkJBOiAweDY2MkQsXG4gICAgMHg4RkJCOiAweDY2NzYsXG4gICAgMHg4RkJDOiAweDY3N0UsXG4gICAgMHg4RkJEOiAweDY4QTIsXG4gICAgMHg4RkJFOiAweDZBMUYsXG4gICAgMHg4RkJGOiAweDZBMzUsXG4gICAgMHg4RkMwOiAweDZDQkMsXG4gICAgMHg4RkMxOiAweDZEODgsXG4gICAgMHg4RkMyOiAweDZFMDksXG4gICAgMHg4RkMzOiAweDZFNTgsXG4gICAgMHg4RkM0OiAweDcxM0MsXG4gICAgMHg4RkM1OiAweDcxMjYsXG4gICAgMHg4RkM2OiAweDcxNjcsXG4gICAgMHg4RkM3OiAweDc1QzcsXG4gICAgMHg4RkM4OiAweDc3MDEsXG4gICAgMHg4RkM5OiAweDc4NUQsXG4gICAgMHg4RkNBOiAweDc5MDEsXG4gICAgMHg4RkNCOiAweDc5NjUsXG4gICAgMHg4RkNDOiAweDc5RjAsXG4gICAgMHg4RkNEOiAweDdBRTAsXG4gICAgMHg4RkNFOiAweDdCMTEsXG4gICAgMHg4RkNGOiAweDdDQTcsXG4gICAgMHg4RkQwOiAweDdEMzksXG4gICAgMHg4RkQxOiAweDgwOTYsXG4gICAgMHg4RkQyOiAweDgzRDYsXG4gICAgMHg4RkQzOiAweDg0OEIsXG4gICAgMHg4RkQ0OiAweDg1NDksXG4gICAgMHg4RkQ1OiAweDg4NUQsXG4gICAgMHg4RkQ2OiAweDg4RjMsXG4gICAgMHg4RkQ3OiAweDhBMUYsXG4gICAgMHg4RkQ4OiAweDhBM0MsXG4gICAgMHg4RkQ5OiAweDhBNTQsXG4gICAgMHg4RkRBOiAweDhBNzMsXG4gICAgMHg4RkRCOiAweDhDNjEsXG4gICAgMHg4RkRDOiAweDhDREUsXG4gICAgMHg4RkREOiAweDkxQTQsXG4gICAgMHg4RkRFOiAweDkyNjYsXG4gICAgMHg4RkRGOiAweDkzN0UsXG4gICAgMHg4RkUwOiAweDk0MTgsXG4gICAgMHg4RkUxOiAweDk2OUMsXG4gICAgMHg4RkUyOiAweDk3OTgsXG4gICAgMHg4RkUzOiAweDRFMEEsXG4gICAgMHg4RkU0OiAweDRFMDgsXG4gICAgMHg4RkU1OiAweDRFMUUsXG4gICAgMHg4RkU2OiAweDRFNTcsXG4gICAgMHg4RkU3OiAweDUxOTcsXG4gICAgMHg4RkU4OiAweDUyNzAsXG4gICAgMHg4RkU5OiAweDU3Q0UsXG4gICAgMHg4RkVBOiAweDU4MzQsXG4gICAgMHg4RkVCOiAweDU4Q0MsXG4gICAgMHg4RkVDOiAweDVCMjIsXG4gICAgMHg4RkVEOiAweDVFMzgsXG4gICAgMHg4RkVFOiAweDYwQzUsXG4gICAgMHg4RkVGOiAweDY0RkUsXG4gICAgMHg4RkYwOiAweDY3NjEsXG4gICAgMHg4RkYxOiAweDY3NTYsXG4gICAgMHg4RkYyOiAweDZENDQsXG4gICAgMHg4RkYzOiAweDcyQjYsXG4gICAgMHg4RkY0OiAweDc1NzMsXG4gICAgMHg4RkY1OiAweDdBNjMsXG4gICAgMHg4RkY2OiAweDg0QjgsXG4gICAgMHg4RkY3OiAweDhCNzIsXG4gICAgMHg4RkY4OiAweDkxQjgsXG4gICAgMHg4RkY5OiAweDkzMjAsXG4gICAgMHg4RkZBOiAweDU2MzEsXG4gICAgMHg4RkZCOiAweDU3RjQsXG4gICAgMHg4RkZDOiAweDk4RkUsXG4gICAgMHg5MDQwOiAweDYyRUQsXG4gICAgMHg5MDQxOiAweDY5MEQsXG4gICAgMHg5MDQyOiAweDZCOTYsXG4gICAgMHg5MDQzOiAweDcxRUQsXG4gICAgMHg5MDQ0OiAweDdFNTQsXG4gICAgMHg5MDQ1OiAweDgwNzcsXG4gICAgMHg5MDQ2OiAweDgyNzIsXG4gICAgMHg5MDQ3OiAweDg5RTYsXG4gICAgMHg5MDQ4OiAweDk4REYsXG4gICAgMHg5MDQ5OiAweDg3NTUsXG4gICAgMHg5MDRBOiAweDhGQjEsXG4gICAgMHg5MDRCOiAweDVDM0IsXG4gICAgMHg5MDRDOiAweDRGMzgsXG4gICAgMHg5MDREOiAweDRGRTEsXG4gICAgMHg5MDRFOiAweDRGQjUsXG4gICAgMHg5MDRGOiAweDU1MDcsXG4gICAgMHg5MDUwOiAweDVBMjAsXG4gICAgMHg5MDUxOiAweDVCREQsXG4gICAgMHg5MDUyOiAweDVCRTksXG4gICAgMHg5MDUzOiAweDVGQzMsXG4gICAgMHg5MDU0OiAweDYxNEUsXG4gICAgMHg5MDU1OiAweDYzMkYsXG4gICAgMHg5MDU2OiAweDY1QjAsXG4gICAgMHg5MDU3OiAweDY2NEIsXG4gICAgMHg5MDU4OiAweDY4RUUsXG4gICAgMHg5MDU5OiAweDY5OUIsXG4gICAgMHg5MDVBOiAweDZENzgsXG4gICAgMHg5MDVCOiAweDZERjEsXG4gICAgMHg5MDVDOiAweDc1MzMsXG4gICAgMHg5MDVEOiAweDc1QjksXG4gICAgMHg5MDVFOiAweDc3MUYsXG4gICAgMHg5MDVGOiAweDc5NUUsXG4gICAgMHg5MDYwOiAweDc5RTYsXG4gICAgMHg5MDYxOiAweDdEMzMsXG4gICAgMHg5MDYyOiAweDgxRTMsXG4gICAgMHg5MDYzOiAweDgyQUYsXG4gICAgMHg5MDY0OiAweDg1QUEsXG4gICAgMHg5MDY1OiAweDg5QUEsXG4gICAgMHg5MDY2OiAweDhBM0EsXG4gICAgMHg5MDY3OiAweDhFQUIsXG4gICAgMHg5MDY4OiAweDhGOUIsXG4gICAgMHg5MDY5OiAweDkwMzIsXG4gICAgMHg5MDZBOiAweDkxREQsXG4gICAgMHg5MDZCOiAweDk3MDcsXG4gICAgMHg5MDZDOiAweDRFQkEsXG4gICAgMHg5MDZEOiAweDRFQzEsXG4gICAgMHg5MDZFOiAweDUyMDMsXG4gICAgMHg5MDZGOiAweDU4NzUsXG4gICAgMHg5MDcwOiAweDU4RUMsXG4gICAgMHg5MDcxOiAweDVDMEIsXG4gICAgMHg5MDcyOiAweDc1MUEsXG4gICAgMHg5MDczOiAweDVDM0QsXG4gICAgMHg5MDc0OiAweDgxNEUsXG4gICAgMHg5MDc1OiAweDhBMEEsXG4gICAgMHg5MDc2OiAweDhGQzUsXG4gICAgMHg5MDc3OiAweDk2NjMsXG4gICAgMHg5MDc4OiAweDk3NkQsXG4gICAgMHg5MDc5OiAweDdCMjUsXG4gICAgMHg5MDdBOiAweDhBQ0YsXG4gICAgMHg5MDdCOiAweDk4MDgsXG4gICAgMHg5MDdDOiAweDkxNjIsXG4gICAgMHg5MDdEOiAweDU2RjMsXG4gICAgMHg5MDdFOiAweDUzQTgsXG4gICAgMHg5MDgwOiAweDkwMTcsXG4gICAgMHg5MDgxOiAweDU0MzksXG4gICAgMHg5MDgyOiAweDU3ODIsXG4gICAgMHg5MDgzOiAweDVFMjUsXG4gICAgMHg5MDg0OiAweDYzQTgsXG4gICAgMHg5MDg1OiAweDZDMzQsXG4gICAgMHg5MDg2OiAweDcwOEEsXG4gICAgMHg5MDg3OiAweDc3NjEsXG4gICAgMHg5MDg4OiAweDdDOEIsXG4gICAgMHg5MDg5OiAweDdGRTAsXG4gICAgMHg5MDhBOiAweDg4NzAsXG4gICAgMHg5MDhCOiAweDkwNDIsXG4gICAgMHg5MDhDOiAweDkxNTQsXG4gICAgMHg5MDhEOiAweDkzMTAsXG4gICAgMHg5MDhFOiAweDkzMTgsXG4gICAgMHg5MDhGOiAweDk2OEYsXG4gICAgMHg5MDkwOiAweDc0NUUsXG4gICAgMHg5MDkxOiAweDlBQzQsXG4gICAgMHg5MDkyOiAweDVEMDcsXG4gICAgMHg5MDkzOiAweDVENjksXG4gICAgMHg5MDk0OiAweDY1NzAsXG4gICAgMHg5MDk1OiAweDY3QTIsXG4gICAgMHg5MDk2OiAweDhEQTgsXG4gICAgMHg5MDk3OiAweDk2REIsXG4gICAgMHg5MDk4OiAweDYzNkUsXG4gICAgMHg5MDk5OiAweDY3NDksXG4gICAgMHg5MDlBOiAweDY5MTksXG4gICAgMHg5MDlCOiAweDgzQzUsXG4gICAgMHg5MDlDOiAweDk4MTcsXG4gICAgMHg5MDlEOiAweDk2QzAsXG4gICAgMHg5MDlFOiAweDg4RkUsXG4gICAgMHg5MDlGOiAweDZGODQsXG4gICAgMHg5MEEwOiAweDY0N0EsXG4gICAgMHg5MEExOiAweDVCRjgsXG4gICAgMHg5MEEyOiAweDRFMTYsXG4gICAgMHg5MEEzOiAweDcwMkMsXG4gICAgMHg5MEE0OiAweDc1NUQsXG4gICAgMHg5MEE1OiAweDY2MkYsXG4gICAgMHg5MEE2OiAweDUxQzQsXG4gICAgMHg5MEE3OiAweDUyMzYsXG4gICAgMHg5MEE4OiAweDUyRTIsXG4gICAgMHg5MEE5OiAweDU5RDMsXG4gICAgMHg5MEFBOiAweDVGODEsXG4gICAgMHg5MEFCOiAweDYwMjcsXG4gICAgMHg5MEFDOiAweDYyMTAsXG4gICAgMHg5MEFEOiAweDY1M0YsXG4gICAgMHg5MEFFOiAweDY1NzQsXG4gICAgMHg5MEFGOiAweDY2MUYsXG4gICAgMHg5MEIwOiAweDY2NzQsXG4gICAgMHg5MEIxOiAweDY4RjIsXG4gICAgMHg5MEIyOiAweDY4MTYsXG4gICAgMHg5MEIzOiAweDZCNjMsXG4gICAgMHg5MEI0OiAweDZFMDUsXG4gICAgMHg5MEI1OiAweDcyNzIsXG4gICAgMHg5MEI2OiAweDc1MUYsXG4gICAgMHg5MEI3OiAweDc2REIsXG4gICAgMHg5MEI4OiAweDdDQkUsXG4gICAgMHg5MEI5OiAweDgwNTYsXG4gICAgMHg5MEJBOiAweDU4RjAsXG4gICAgMHg5MEJCOiAweDg4RkQsXG4gICAgMHg5MEJDOiAweDg5N0YsXG4gICAgMHg5MEJEOiAweDhBQTAsXG4gICAgMHg5MEJFOiAweDhBOTMsXG4gICAgMHg5MEJGOiAweDhBQ0IsXG4gICAgMHg5MEMwOiAweDkwMUQsXG4gICAgMHg5MEMxOiAweDkxOTIsXG4gICAgMHg5MEMyOiAweDk3NTIsXG4gICAgMHg5MEMzOiAweDk3NTksXG4gICAgMHg5MEM0OiAweDY1ODksXG4gICAgMHg5MEM1OiAweDdBMEUsXG4gICAgMHg5MEM2OiAweDgxMDYsXG4gICAgMHg5MEM3OiAweDk2QkIsXG4gICAgMHg5MEM4OiAweDVFMkQsXG4gICAgMHg5MEM5OiAweDYwREMsXG4gICAgMHg5MENBOiAweDYyMUEsXG4gICAgMHg5MENCOiAweDY1QTUsXG4gICAgMHg5MENDOiAweDY2MTQsXG4gICAgMHg5MENEOiAweDY3OTAsXG4gICAgMHg5MENFOiAweDc3RjMsXG4gICAgMHg5MENGOiAweDdBNEQsXG4gICAgMHg5MEQwOiAweDdDNEQsXG4gICAgMHg5MEQxOiAweDdFM0UsXG4gICAgMHg5MEQyOiAweDgxMEEsXG4gICAgMHg5MEQzOiAweDhDQUMsXG4gICAgMHg5MEQ0OiAweDhENjQsXG4gICAgMHg5MEQ1OiAweDhERTEsXG4gICAgMHg5MEQ2OiAweDhFNUYsXG4gICAgMHg5MEQ3OiAweDc4QTksXG4gICAgMHg5MEQ4OiAweDUyMDcsXG4gICAgMHg5MEQ5OiAweDYyRDksXG4gICAgMHg5MERBOiAweDYzQTUsXG4gICAgMHg5MERCOiAweDY0NDIsXG4gICAgMHg5MERDOiAweDYyOTgsXG4gICAgMHg5MEREOiAweDhBMkQsXG4gICAgMHg5MERFOiAweDdBODMsXG4gICAgMHg5MERGOiAweDdCQzAsXG4gICAgMHg5MEUwOiAweDhBQUMsXG4gICAgMHg5MEUxOiAweDk2RUEsXG4gICAgMHg5MEUyOiAweDdENzYsXG4gICAgMHg5MEUzOiAweDgyMEMsXG4gICAgMHg5MEU0OiAweDg3NDksXG4gICAgMHg5MEU1OiAweDRFRDksXG4gICAgMHg5MEU2OiAweDUxNDgsXG4gICAgMHg5MEU3OiAweDUzNDMsXG4gICAgMHg5MEU4OiAweDUzNjAsXG4gICAgMHg5MEU5OiAweDVCQTMsXG4gICAgMHg5MEVBOiAweDVDMDIsXG4gICAgMHg5MEVCOiAweDVDMTYsXG4gICAgMHg5MEVDOiAweDVEREQsXG4gICAgMHg5MEVEOiAweDYyMjYsXG4gICAgMHg5MEVFOiAweDYyNDcsXG4gICAgMHg5MEVGOiAweDY0QjAsXG4gICAgMHg5MEYwOiAweDY4MTMsXG4gICAgMHg5MEYxOiAweDY4MzQsXG4gICAgMHg5MEYyOiAweDZDQzksXG4gICAgMHg5MEYzOiAweDZENDUsXG4gICAgMHg5MEY0OiAweDZEMTcsXG4gICAgMHg5MEY1OiAweDY3RDMsXG4gICAgMHg5MEY2OiAweDZGNUMsXG4gICAgMHg5MEY3OiAweDcxNEUsXG4gICAgMHg5MEY4OiAweDcxN0QsXG4gICAgMHg5MEY5OiAweDY1Q0IsXG4gICAgMHg5MEZBOiAweDdBN0YsXG4gICAgMHg5MEZCOiAweDdCQUQsXG4gICAgMHg5MEZDOiAweDdEREEsXG4gICAgMHg5MTQwOiAweDdFNEEsXG4gICAgMHg5MTQxOiAweDdGQTgsXG4gICAgMHg5MTQyOiAweDgxN0EsXG4gICAgMHg5MTQzOiAweDgyMUIsXG4gICAgMHg5MTQ0OiAweDgyMzksXG4gICAgMHg5MTQ1OiAweDg1QTYsXG4gICAgMHg5MTQ2OiAweDhBNkUsXG4gICAgMHg5MTQ3OiAweDhDQ0UsXG4gICAgMHg5MTQ4OiAweDhERjUsXG4gICAgMHg5MTQ5OiAweDkwNzgsXG4gICAgMHg5MTRBOiAweDkwNzcsXG4gICAgMHg5MTRCOiAweDkyQUQsXG4gICAgMHg5MTRDOiAweDkyOTEsXG4gICAgMHg5MTREOiAweDk1ODMsXG4gICAgMHg5MTRFOiAweDlCQUUsXG4gICAgMHg5MTRGOiAweDUyNEQsXG4gICAgMHg5MTUwOiAweDU1ODQsXG4gICAgMHg5MTUxOiAweDZGMzgsXG4gICAgMHg5MTUyOiAweDcxMzYsXG4gICAgMHg5MTUzOiAweDUxNjgsXG4gICAgMHg5MTU0OiAweDc5ODUsXG4gICAgMHg5MTU1OiAweDdFNTUsXG4gICAgMHg5MTU2OiAweDgxQjMsXG4gICAgMHg5MTU3OiAweDdDQ0UsXG4gICAgMHg5MTU4OiAweDU2NEMsXG4gICAgMHg5MTU5OiAweDU4NTEsXG4gICAgMHg5MTVBOiAweDVDQTgsXG4gICAgMHg5MTVCOiAweDYzQUEsXG4gICAgMHg5MTVDOiAweDY2RkUsXG4gICAgMHg5MTVEOiAweDY2RkQsXG4gICAgMHg5MTVFOiAweDY5NUEsXG4gICAgMHg5MTVGOiAweDcyRDksXG4gICAgMHg5MTYwOiAweDc1OEYsXG4gICAgMHg5MTYxOiAweDc1OEUsXG4gICAgMHg5MTYyOiAweDc5MEUsXG4gICAgMHg5MTYzOiAweDc5NTYsXG4gICAgMHg5MTY0OiAweDc5REYsXG4gICAgMHg5MTY1OiAweDdDOTcsXG4gICAgMHg5MTY2OiAweDdEMjAsXG4gICAgMHg5MTY3OiAweDdENDQsXG4gICAgMHg5MTY4OiAweDg2MDcsXG4gICAgMHg5MTY5OiAweDhBMzQsXG4gICAgMHg5MTZBOiAweDk2M0IsXG4gICAgMHg5MTZCOiAweDkwNjEsXG4gICAgMHg5MTZDOiAweDlGMjAsXG4gICAgMHg5MTZEOiAweDUwRTcsXG4gICAgMHg5MTZFOiAweDUyNzUsXG4gICAgMHg5MTZGOiAweDUzQ0MsXG4gICAgMHg5MTcwOiAweDUzRTIsXG4gICAgMHg5MTcxOiAweDUwMDksXG4gICAgMHg5MTcyOiAweDU1QUEsXG4gICAgMHg5MTczOiAweDU4RUUsXG4gICAgMHg5MTc0OiAweDU5NEYsXG4gICAgMHg5MTc1OiAweDcyM0QsXG4gICAgMHg5MTc2OiAweDVCOEIsXG4gICAgMHg5MTc3OiAweDVDNjQsXG4gICAgMHg5MTc4OiAweDUzMUQsXG4gICAgMHg5MTc5OiAweDYwRTMsXG4gICAgMHg5MTdBOiAweDYwRjMsXG4gICAgMHg5MTdCOiAweDYzNUMsXG4gICAgMHg5MTdDOiAweDYzODMsXG4gICAgMHg5MTdEOiAweDYzM0YsXG4gICAgMHg5MTdFOiAweDYzQkIsXG4gICAgMHg5MTgwOiAweDY0Q0QsXG4gICAgMHg5MTgxOiAweDY1RTksXG4gICAgMHg5MTgyOiAweDY2RjksXG4gICAgMHg5MTgzOiAweDVERTMsXG4gICAgMHg5MTg0OiAweDY5Q0QsXG4gICAgMHg5MTg1OiAweDY5RkQsXG4gICAgMHg5MTg2OiAweDZGMTUsXG4gICAgMHg5MTg3OiAweDcxRTUsXG4gICAgMHg5MTg4OiAweDRFODksXG4gICAgMHg5MTg5OiAweDc1RTksXG4gICAgMHg5MThBOiAweDc2RjgsXG4gICAgMHg5MThCOiAweDdBOTMsXG4gICAgMHg5MThDOiAweDdDREYsXG4gICAgMHg5MThEOiAweDdEQ0YsXG4gICAgMHg5MThFOiAweDdEOUMsXG4gICAgMHg5MThGOiAweDgwNjEsXG4gICAgMHg5MTkwOiAweDgzNDksXG4gICAgMHg5MTkxOiAweDgzNTgsXG4gICAgMHg5MTkyOiAweDg0NkMsXG4gICAgMHg5MTkzOiAweDg0QkMsXG4gICAgMHg5MTk0OiAweDg1RkIsXG4gICAgMHg5MTk1OiAweDg4QzUsXG4gICAgMHg5MTk2OiAweDhENzAsXG4gICAgMHg5MTk3OiAweDkwMDEsXG4gICAgMHg5MTk4OiAweDkwNkQsXG4gICAgMHg5MTk5OiAweDkzOTcsXG4gICAgMHg5MTlBOiAweDk3MUMsXG4gICAgMHg5MTlCOiAweDlBMTIsXG4gICAgMHg5MTlDOiAweDUwQ0YsXG4gICAgMHg5MTlEOiAweDU4OTcsXG4gICAgMHg5MTlFOiAweDYxOEUsXG4gICAgMHg5MTlGOiAweDgxRDMsXG4gICAgMHg5MUEwOiAweDg1MzUsXG4gICAgMHg5MUExOiAweDhEMDgsXG4gICAgMHg5MUEyOiAweDkwMjAsXG4gICAgMHg5MUEzOiAweDRGQzMsXG4gICAgMHg5MUE0OiAweDUwNzQsXG4gICAgMHg5MUE1OiAweDUyNDcsXG4gICAgMHg5MUE2OiAweDUzNzMsXG4gICAgMHg5MUE3OiAweDYwNkYsXG4gICAgMHg5MUE4OiAweDYzNDksXG4gICAgMHg5MUE5OiAweDY3NUYsXG4gICAgMHg5MUFBOiAweDZFMkMsXG4gICAgMHg5MUFCOiAweDhEQjMsXG4gICAgMHg5MUFDOiAweDkwMUYsXG4gICAgMHg5MUFEOiAweDRGRDcsXG4gICAgMHg5MUFFOiAweDVDNUUsXG4gICAgMHg5MUFGOiAweDhDQ0EsXG4gICAgMHg5MUIwOiAweDY1Q0YsXG4gICAgMHg5MUIxOiAweDdEOUEsXG4gICAgMHg5MUIyOiAweDUzNTIsXG4gICAgMHg5MUIzOiAweDg4OTYsXG4gICAgMHg5MUI0OiAweDUxNzYsXG4gICAgMHg5MUI1OiAweDYzQzMsXG4gICAgMHg5MUI2OiAweDVCNTgsXG4gICAgMHg5MUI3OiAweDVCNkIsXG4gICAgMHg5MUI4OiAweDVDMEEsXG4gICAgMHg5MUI5OiAweDY0MEQsXG4gICAgMHg5MUJBOiAweDY3NTEsXG4gICAgMHg5MUJCOiAweDkwNUMsXG4gICAgMHg5MUJDOiAweDRFRDYsXG4gICAgMHg5MUJEOiAweDU5MUEsXG4gICAgMHg5MUJFOiAweDU5MkEsXG4gICAgMHg5MUJGOiAweDZDNzAsXG4gICAgMHg5MUMwOiAweDhBNTEsXG4gICAgMHg5MUMxOiAweDU1M0UsXG4gICAgMHg5MUMyOiAweDU4MTUsXG4gICAgMHg5MUMzOiAweDU5QTUsXG4gICAgMHg5MUM0OiAweDYwRjAsXG4gICAgMHg5MUM1OiAweDYyNTMsXG4gICAgMHg5MUM2OiAweDY3QzEsXG4gICAgMHg5MUM3OiAweDgyMzUsXG4gICAgMHg5MUM4OiAweDY5NTUsXG4gICAgMHg5MUM5OiAweDk2NDAsXG4gICAgMHg5MUNBOiAweDk5QzQsXG4gICAgMHg5MUNCOiAweDlBMjgsXG4gICAgMHg5MUNDOiAweDRGNTMsXG4gICAgMHg5MUNEOiAweDU4MDYsXG4gICAgMHg5MUNFOiAweDVCRkUsXG4gICAgMHg5MUNGOiAweDgwMTAsXG4gICAgMHg5MUQwOiAweDVDQjEsXG4gICAgMHg5MUQxOiAweDVFMkYsXG4gICAgMHg5MUQyOiAweDVGODUsXG4gICAgMHg5MUQzOiAweDYwMjAsXG4gICAgMHg5MUQ0OiAweDYxNEIsXG4gICAgMHg5MUQ1OiAweDYyMzQsXG4gICAgMHg5MUQ2OiAweDY2RkYsXG4gICAgMHg5MUQ3OiAweDZDRjAsXG4gICAgMHg5MUQ4OiAweDZFREUsXG4gICAgMHg5MUQ5OiAweDgwQ0UsXG4gICAgMHg5MURBOiAweDgxN0YsXG4gICAgMHg5MURCOiAweDgyRDQsXG4gICAgMHg5MURDOiAweDg4OEIsXG4gICAgMHg5MUREOiAweDhDQjgsXG4gICAgMHg5MURFOiAweDkwMDAsXG4gICAgMHg5MURGOiAweDkwMkUsXG4gICAgMHg5MUUwOiAweDk2OEEsXG4gICAgMHg5MUUxOiAweDlFREIsXG4gICAgMHg5MUUyOiAweDlCREIsXG4gICAgMHg5MUUzOiAweDRFRTMsXG4gICAgMHg5MUU0OiAweDUzRjAsXG4gICAgMHg5MUU1OiAweDU5MjcsXG4gICAgMHg5MUU2OiAweDdCMkMsXG4gICAgMHg5MUU3OiAweDkxOEQsXG4gICAgMHg5MUU4OiAweDk4NEMsXG4gICAgMHg5MUU5OiAweDlERjksXG4gICAgMHg5MUVBOiAweDZFREQsXG4gICAgMHg5MUVCOiAweDcwMjcsXG4gICAgMHg5MUVDOiAweDUzNTMsXG4gICAgMHg5MUVEOiAweDU1NDQsXG4gICAgMHg5MUVFOiAweDVCODUsXG4gICAgMHg5MUVGOiAweDYyNTgsXG4gICAgMHg5MUYwOiAweDYyOUUsXG4gICAgMHg5MUYxOiAweDYyRDMsXG4gICAgMHg5MUYyOiAweDZDQTIsXG4gICAgMHg5MUYzOiAweDZGRUYsXG4gICAgMHg5MUY0OiAweDc0MjIsXG4gICAgMHg5MUY1OiAweDhBMTcsXG4gICAgMHg5MUY2OiAweDk0MzgsXG4gICAgMHg5MUY3OiAweDZGQzEsXG4gICAgMHg5MUY4OiAweDhBRkUsXG4gICAgMHg5MUY5OiAweDgzMzgsXG4gICAgMHg5MUZBOiAweDUxRTcsXG4gICAgMHg5MUZCOiAweDg2RjgsXG4gICAgMHg5MUZDOiAweDUzRUEsXG4gICAgMHg5MjQwOiAweDUzRTksXG4gICAgMHg5MjQxOiAweDRGNDYsXG4gICAgMHg5MjQyOiAweDkwNTQsXG4gICAgMHg5MjQzOiAweDhGQjAsXG4gICAgMHg5MjQ0OiAweDU5NkEsXG4gICAgMHg5MjQ1OiAweDgxMzEsXG4gICAgMHg5MjQ2OiAweDVERkQsXG4gICAgMHg5MjQ3OiAweDdBRUEsXG4gICAgMHg5MjQ4OiAweDhGQkYsXG4gICAgMHg5MjQ5OiAweDY4REEsXG4gICAgMHg5MjRBOiAweDhDMzcsXG4gICAgMHg5MjRCOiAweDcyRjgsXG4gICAgMHg5MjRDOiAweDlDNDgsXG4gICAgMHg5MjREOiAweDZBM0QsXG4gICAgMHg5MjRFOiAweDhBQjAsXG4gICAgMHg5MjRGOiAweDRFMzksXG4gICAgMHg5MjUwOiAweDUzNTgsXG4gICAgMHg5MjUxOiAweDU2MDYsXG4gICAgMHg5MjUyOiAweDU3NjYsXG4gICAgMHg5MjUzOiAweDYyQzUsXG4gICAgMHg5MjU0OiAweDYzQTIsXG4gICAgMHg5MjU1OiAweDY1RTYsXG4gICAgMHg5MjU2OiAweDZCNEUsXG4gICAgMHg5MjU3OiAweDZERTEsXG4gICAgMHg5MjU4OiAweDZFNUIsXG4gICAgMHg5MjU5OiAweDcwQUQsXG4gICAgMHg5MjVBOiAweDc3RUQsXG4gICAgMHg5MjVCOiAweDdBRUYsXG4gICAgMHg5MjVDOiAweDdCQUEsXG4gICAgMHg5MjVEOiAweDdEQkIsXG4gICAgMHg5MjVFOiAweDgwM0QsXG4gICAgMHg5MjVGOiAweDgwQzYsXG4gICAgMHg5MjYwOiAweDg2Q0IsXG4gICAgMHg5MjYxOiAweDhBOTUsXG4gICAgMHg5MjYyOiAweDkzNUIsXG4gICAgMHg5MjYzOiAweDU2RTMsXG4gICAgMHg5MjY0OiAweDU4QzcsXG4gICAgMHg5MjY1OiAweDVGM0UsXG4gICAgMHg5MjY2OiAweDY1QUQsXG4gICAgMHg5MjY3OiAweDY2OTYsXG4gICAgMHg5MjY4OiAweDZBODAsXG4gICAgMHg5MjY5OiAweDZCQjUsXG4gICAgMHg5MjZBOiAweDc1MzcsXG4gICAgMHg5MjZCOiAweDhBQzcsXG4gICAgMHg5MjZDOiAweDUwMjQsXG4gICAgMHg5MjZEOiAweDc3RTUsXG4gICAgMHg5MjZFOiAweDU3MzAsXG4gICAgMHg5MjZGOiAweDVGMUIsXG4gICAgMHg5MjcwOiAweDYwNjUsXG4gICAgMHg5MjcxOiAweDY2N0EsXG4gICAgMHg5MjcyOiAweDZDNjAsXG4gICAgMHg5MjczOiAweDc1RjQsXG4gICAgMHg5Mjc0OiAweDdBMUEsXG4gICAgMHg5Mjc1OiAweDdGNkUsXG4gICAgMHg5Mjc2OiAweDgxRjQsXG4gICAgMHg5Mjc3OiAweDg3MTgsXG4gICAgMHg5Mjc4OiAweDkwNDUsXG4gICAgMHg5Mjc5OiAweDk5QjMsXG4gICAgMHg5MjdBOiAweDdCQzksXG4gICAgMHg5MjdCOiAweDc1NUMsXG4gICAgMHg5MjdDOiAweDdBRjksXG4gICAgMHg5MjdEOiAweDdCNTEsXG4gICAgMHg5MjdFOiAweDg0QzQsXG4gICAgMHg5MjgwOiAweDkwMTAsXG4gICAgMHg5MjgxOiAweDc5RTksXG4gICAgMHg5MjgyOiAweDdBOTIsXG4gICAgMHg5MjgzOiAweDgzMzYsXG4gICAgMHg5Mjg0OiAweDVBRTEsXG4gICAgMHg5Mjg1OiAweDc3NDAsXG4gICAgMHg5Mjg2OiAweDRFMkQsXG4gICAgMHg5Mjg3OiAweDRFRjIsXG4gICAgMHg5Mjg4OiAweDVCOTksXG4gICAgMHg5Mjg5OiAweDVGRTAsXG4gICAgMHg5MjhBOiAweDYyQkQsXG4gICAgMHg5MjhCOiAweDY2M0MsXG4gICAgMHg5MjhDOiAweDY3RjEsXG4gICAgMHg5MjhEOiAweDZDRTgsXG4gICAgMHg5MjhFOiAweDg2NkIsXG4gICAgMHg5MjhGOiAweDg4NzcsXG4gICAgMHg5MjkwOiAweDhBM0IsXG4gICAgMHg5MjkxOiAweDkxNEUsXG4gICAgMHg5MjkyOiAweDkyRjMsXG4gICAgMHg5MjkzOiAweDk5RDAsXG4gICAgMHg5Mjk0OiAweDZBMTcsXG4gICAgMHg5Mjk1OiAweDcwMjYsXG4gICAgMHg5Mjk2OiAweDczMkEsXG4gICAgMHg5Mjk3OiAweDgyRTcsXG4gICAgMHg5Mjk4OiAweDg0NTcsXG4gICAgMHg5Mjk5OiAweDhDQUYsXG4gICAgMHg5MjlBOiAweDRFMDEsXG4gICAgMHg5MjlCOiAweDUxNDYsXG4gICAgMHg5MjlDOiAweDUxQ0IsXG4gICAgMHg5MjlEOiAweDU1OEIsXG4gICAgMHg5MjlFOiAweDVCRjUsXG4gICAgMHg5MjlGOiAweDVFMTYsXG4gICAgMHg5MkEwOiAweDVFMzMsXG4gICAgMHg5MkExOiAweDVFODEsXG4gICAgMHg5MkEyOiAweDVGMTQsXG4gICAgMHg5MkEzOiAweDVGMzUsXG4gICAgMHg5MkE0OiAweDVGNkIsXG4gICAgMHg5MkE1OiAweDVGQjQsXG4gICAgMHg5MkE2OiAweDYxRjIsXG4gICAgMHg5MkE3OiAweDYzMTEsXG4gICAgMHg5MkE4OiAweDY2QTIsXG4gICAgMHg5MkE5OiAweDY3MUQsXG4gICAgMHg5MkFBOiAweDZGNkUsXG4gICAgMHg5MkFCOiAweDcyNTIsXG4gICAgMHg5MkFDOiAweDc1M0EsXG4gICAgMHg5MkFEOiAweDc3M0EsXG4gICAgMHg5MkFFOiAweDgwNzQsXG4gICAgMHg5MkFGOiAweDgxMzksXG4gICAgMHg5MkIwOiAweDgxNzgsXG4gICAgMHg5MkIxOiAweDg3NzYsXG4gICAgMHg5MkIyOiAweDhBQkYsXG4gICAgMHg5MkIzOiAweDhBREMsXG4gICAgMHg5MkI0OiAweDhEODUsXG4gICAgMHg5MkI1OiAweDhERjMsXG4gICAgMHg5MkI2OiAweDkyOUEsXG4gICAgMHg5MkI3OiAweDk1NzcsXG4gICAgMHg5MkI4OiAweDk4MDIsXG4gICAgMHg5MkI5OiAweDlDRTUsXG4gICAgMHg5MkJBOiAweDUyQzUsXG4gICAgMHg5MkJCOiAweDYzNTcsXG4gICAgMHg5MkJDOiAweDc2RjQsXG4gICAgMHg5MkJEOiAweDY3MTUsXG4gICAgMHg5MkJFOiAweDZDODgsXG4gICAgMHg5MkJGOiAweDczQ0QsXG4gICAgMHg5MkMwOiAweDhDQzMsXG4gICAgMHg5MkMxOiAweDkzQUUsXG4gICAgMHg5MkMyOiAweDk2NzMsXG4gICAgMHg5MkMzOiAweDZEMjUsXG4gICAgMHg5MkM0OiAweDU4OUMsXG4gICAgMHg5MkM1OiAweDY5MEUsXG4gICAgMHg5MkM2OiAweDY5Q0MsXG4gICAgMHg5MkM3OiAweDhGRkQsXG4gICAgMHg5MkM4OiAweDkzOUEsXG4gICAgMHg5MkM5OiAweDc1REIsXG4gICAgMHg5MkNBOiAweDkwMUEsXG4gICAgMHg5MkNCOiAweDU4NUEsXG4gICAgMHg5MkNDOiAweDY4MDIsXG4gICAgMHg5MkNEOiAweDYzQjQsXG4gICAgMHg5MkNFOiAweDY5RkIsXG4gICAgMHg5MkNGOiAweDRGNDMsXG4gICAgMHg5MkQwOiAweDZGMkMsXG4gICAgMHg5MkQxOiAweDY3RDgsXG4gICAgMHg5MkQyOiAweDhGQkIsXG4gICAgMHg5MkQzOiAweDg1MjYsXG4gICAgMHg5MkQ0OiAweDdEQjQsXG4gICAgMHg5MkQ1OiAweDkzNTQsXG4gICAgMHg5MkQ2OiAweDY5M0YsXG4gICAgMHg5MkQ3OiAweDZGNzAsXG4gICAgMHg5MkQ4OiAweDU3NkEsXG4gICAgMHg5MkQ5OiAweDU4RjcsXG4gICAgMHg5MkRBOiAweDVCMkMsXG4gICAgMHg5MkRCOiAweDdEMkMsXG4gICAgMHg5MkRDOiAweDcyMkEsXG4gICAgMHg5MkREOiAweDU0MEEsXG4gICAgMHg5MkRFOiAweDkxRTMsXG4gICAgMHg5MkRGOiAweDlEQjQsXG4gICAgMHg5MkUwOiAweDRFQUQsXG4gICAgMHg5MkUxOiAweDRGNEUsXG4gICAgMHg5MkUyOiAweDUwNUMsXG4gICAgMHg5MkUzOiAweDUwNzUsXG4gICAgMHg5MkU0OiAweDUyNDMsXG4gICAgMHg5MkU1OiAweDhDOUUsXG4gICAgMHg5MkU2OiAweDU0NDgsXG4gICAgMHg5MkU3OiAweDU4MjQsXG4gICAgMHg5MkU4OiAweDVCOUEsXG4gICAgMHg5MkU5OiAweDVFMUQsXG4gICAgMHg5MkVBOiAweDVFOTUsXG4gICAgMHg5MkVCOiAweDVFQUQsXG4gICAgMHg5MkVDOiAweDVFRjcsXG4gICAgMHg5MkVEOiAweDVGMUYsXG4gICAgMHg5MkVFOiAweDYwOEMsXG4gICAgMHg5MkVGOiAweDYyQjUsXG4gICAgMHg5MkYwOiAweDYzM0EsXG4gICAgMHg5MkYxOiAweDYzRDAsXG4gICAgMHg5MkYyOiAweDY4QUYsXG4gICAgMHg5MkYzOiAweDZDNDAsXG4gICAgMHg5MkY0OiAweDc4ODcsXG4gICAgMHg5MkY1OiAweDc5OEUsXG4gICAgMHg5MkY2OiAweDdBMEIsXG4gICAgMHg5MkY3OiAweDdERTAsXG4gICAgMHg5MkY4OiAweDgyNDcsXG4gICAgMHg5MkY5OiAweDhBMDIsXG4gICAgMHg5MkZBOiAweDhBRTYsXG4gICAgMHg5MkZCOiAweDhFNDQsXG4gICAgMHg5MkZDOiAweDkwMTMsXG4gICAgMHg5MzQwOiAweDkwQjgsXG4gICAgMHg5MzQxOiAweDkxMkQsXG4gICAgMHg5MzQyOiAweDkxRDgsXG4gICAgMHg5MzQzOiAweDlGMEUsXG4gICAgMHg5MzQ0OiAweDZDRTUsXG4gICAgMHg5MzQ1OiAweDY0NTgsXG4gICAgMHg5MzQ2OiAweDY0RTIsXG4gICAgMHg5MzQ3OiAweDY1NzUsXG4gICAgMHg5MzQ4OiAweDZFRjQsXG4gICAgMHg5MzQ5OiAweDc2ODQsXG4gICAgMHg5MzRBOiAweDdCMUIsXG4gICAgMHg5MzRCOiAweDkwNjksXG4gICAgMHg5MzRDOiAweDkzRDEsXG4gICAgMHg5MzREOiAweDZFQkEsXG4gICAgMHg5MzRFOiAweDU0RjIsXG4gICAgMHg5MzRGOiAweDVGQjksXG4gICAgMHg5MzUwOiAweDY0QTQsXG4gICAgMHg5MzUxOiAweDhGNEQsXG4gICAgMHg5MzUyOiAweDhGRUQsXG4gICAgMHg5MzUzOiAweDkyNDQsXG4gICAgMHg5MzU0OiAweDUxNzgsXG4gICAgMHg5MzU1OiAweDU4NkIsXG4gICAgMHg5MzU2OiAweDU5MjksXG4gICAgMHg5MzU3OiAweDVDNTUsXG4gICAgMHg5MzU4OiAweDVFOTcsXG4gICAgMHg5MzU5OiAweDZERkIsXG4gICAgMHg5MzVBOiAweDdFOEYsXG4gICAgMHg5MzVCOiAweDc1MUMsXG4gICAgMHg5MzVDOiAweDhDQkMsXG4gICAgMHg5MzVEOiAweDhFRTIsXG4gICAgMHg5MzVFOiAweDk4NUIsXG4gICAgMHg5MzVGOiAweDcwQjksXG4gICAgMHg5MzYwOiAweDRGMUQsXG4gICAgMHg5MzYxOiAweDZCQkYsXG4gICAgMHg5MzYyOiAweDZGQjEsXG4gICAgMHg5MzYzOiAweDc1MzAsXG4gICAgMHg5MzY0OiAweDk2RkIsXG4gICAgMHg5MzY1OiAweDUxNEUsXG4gICAgMHg5MzY2OiAweDU0MTAsXG4gICAgMHg5MzY3OiAweDU4MzUsXG4gICAgMHg5MzY4OiAweDU4NTcsXG4gICAgMHg5MzY5OiAweDU5QUMsXG4gICAgMHg5MzZBOiAweDVDNjAsXG4gICAgMHg5MzZCOiAweDVGOTIsXG4gICAgMHg5MzZDOiAweDY1OTcsXG4gICAgMHg5MzZEOiAweDY3NUMsXG4gICAgMHg5MzZFOiAweDZFMjEsXG4gICAgMHg5MzZGOiAweDc2N0IsXG4gICAgMHg5MzcwOiAweDgzREYsXG4gICAgMHg5MzcxOiAweDhDRUQsXG4gICAgMHg5MzcyOiAweDkwMTQsXG4gICAgMHg5MzczOiAweDkwRkQsXG4gICAgMHg5Mzc0OiAweDkzNEQsXG4gICAgMHg5Mzc1OiAweDc4MjUsXG4gICAgMHg5Mzc2OiAweDc4M0EsXG4gICAgMHg5Mzc3OiAweDUyQUEsXG4gICAgMHg5Mzc4OiAweDVFQTYsXG4gICAgMHg5Mzc5OiAweDU3MUYsXG4gICAgMHg5MzdBOiAweDU5NzQsXG4gICAgMHg5MzdCOiAweDYwMTIsXG4gICAgMHg5MzdDOiAweDUwMTIsXG4gICAgMHg5MzdEOiAweDUxNUEsXG4gICAgMHg5MzdFOiAweDUxQUMsXG4gICAgMHg5MzgwOiAweDUxQ0QsXG4gICAgMHg5MzgxOiAweDUyMDAsXG4gICAgMHg5MzgyOiAweDU1MTAsXG4gICAgMHg5MzgzOiAweDU4NTQsXG4gICAgMHg5Mzg0OiAweDU4NTgsXG4gICAgMHg5Mzg1OiAweDU5NTcsXG4gICAgMHg5Mzg2OiAweDVCOTUsXG4gICAgMHg5Mzg3OiAweDVDRjYsXG4gICAgMHg5Mzg4OiAweDVEOEIsXG4gICAgMHg5Mzg5OiAweDYwQkMsXG4gICAgMHg5MzhBOiAweDYyOTUsXG4gICAgMHg5MzhCOiAweDY0MkQsXG4gICAgMHg5MzhDOiAweDY3NzEsXG4gICAgMHg5MzhEOiAweDY4NDMsXG4gICAgMHg5MzhFOiAweDY4QkMsXG4gICAgMHg5MzhGOiAweDY4REYsXG4gICAgMHg5MzkwOiAweDc2RDcsXG4gICAgMHg5MzkxOiAweDZERDgsXG4gICAgMHg5MzkyOiAweDZFNkYsXG4gICAgMHg5MzkzOiAweDZEOUIsXG4gICAgMHg5Mzk0OiAweDcwNkYsXG4gICAgMHg5Mzk1OiAweDcxQzgsXG4gICAgMHg5Mzk2OiAweDVGNTMsXG4gICAgMHg5Mzk3OiAweDc1RDgsXG4gICAgMHg5Mzk4OiAweDc5NzcsXG4gICAgMHg5Mzk5OiAweDdCNDksXG4gICAgMHg5MzlBOiAweDdCNTQsXG4gICAgMHg5MzlCOiAweDdCNTIsXG4gICAgMHg5MzlDOiAweDdDRDYsXG4gICAgMHg5MzlEOiAweDdENzEsXG4gICAgMHg5MzlFOiAweDUyMzAsXG4gICAgMHg5MzlGOiAweDg0NjMsXG4gICAgMHg5M0EwOiAweDg1NjksXG4gICAgMHg5M0ExOiAweDg1RTQsXG4gICAgMHg5M0EyOiAweDhBMEUsXG4gICAgMHg5M0EzOiAweDhCMDQsXG4gICAgMHg5M0E0OiAweDhDNDYsXG4gICAgMHg5M0E1OiAweDhFMEYsXG4gICAgMHg5M0E2OiAweDkwMDMsXG4gICAgMHg5M0E3OiAweDkwMEYsXG4gICAgMHg5M0E4OiAweDk0MTksXG4gICAgMHg5M0E5OiAweDk2NzYsXG4gICAgMHg5M0FBOiAweDk4MkQsXG4gICAgMHg5M0FCOiAweDlBMzAsXG4gICAgMHg5M0FDOiAweDk1RDgsXG4gICAgMHg5M0FEOiAweDUwQ0QsXG4gICAgMHg5M0FFOiAweDUyRDUsXG4gICAgMHg5M0FGOiAweDU0MEMsXG4gICAgMHg5M0IwOiAweDU4MDIsXG4gICAgMHg5M0IxOiAweDVDMEUsXG4gICAgMHg5M0IyOiAweDYxQTcsXG4gICAgMHg5M0IzOiAweDY0OUUsXG4gICAgMHg5M0I0OiAweDZEMUUsXG4gICAgMHg5M0I1OiAweDc3QjMsXG4gICAgMHg5M0I2OiAweDdBRTUsXG4gICAgMHg5M0I3OiAweDgwRjQsXG4gICAgMHg5M0I4OiAweDg0MDQsXG4gICAgMHg5M0I5OiAweDkwNTMsXG4gICAgMHg5M0JBOiAweDkyODUsXG4gICAgMHg5M0JCOiAweDVDRTAsXG4gICAgMHg5M0JDOiAweDlEMDcsXG4gICAgMHg5M0JEOiAweDUzM0YsXG4gICAgMHg5M0JFOiAweDVGOTcsXG4gICAgMHg5M0JGOiAweDVGQjMsXG4gICAgMHg5M0MwOiAweDZEOUMsXG4gICAgMHg5M0MxOiAweDcyNzksXG4gICAgMHg5M0MyOiAweDc3NjMsXG4gICAgMHg5M0MzOiAweDc5QkYsXG4gICAgMHg5M0M0OiAweDdCRTQsXG4gICAgMHg5M0M1OiAweDZCRDIsXG4gICAgMHg5M0M2OiAweDcyRUMsXG4gICAgMHg5M0M3OiAweDhBQUQsXG4gICAgMHg5M0M4OiAweDY4MDMsXG4gICAgMHg5M0M5OiAweDZBNjEsXG4gICAgMHg5M0NBOiAweDUxRjgsXG4gICAgMHg5M0NCOiAweDdBODEsXG4gICAgMHg5M0NDOiAweDY5MzQsXG4gICAgMHg5M0NEOiAweDVDNEEsXG4gICAgMHg5M0NFOiAweDlDRjYsXG4gICAgMHg5M0NGOiAweDgyRUIsXG4gICAgMHg5M0QwOiAweDVCQzUsXG4gICAgMHg5M0QxOiAweDkxNDksXG4gICAgMHg5M0QyOiAweDcwMUUsXG4gICAgMHg5M0QzOiAweDU2NzgsXG4gICAgMHg5M0Q0OiAweDVDNkYsXG4gICAgMHg5M0Q1OiAweDYwQzcsXG4gICAgMHg5M0Q2OiAweDY1NjYsXG4gICAgMHg5M0Q3OiAweDZDOEMsXG4gICAgMHg5M0Q4OiAweDhDNUEsXG4gICAgMHg5M0Q5OiAweDkwNDEsXG4gICAgMHg5M0RBOiAweDk4MTMsXG4gICAgMHg5M0RCOiAweDU0NTEsXG4gICAgMHg5M0RDOiAweDY2QzcsXG4gICAgMHg5M0REOiAweDkyMEQsXG4gICAgMHg5M0RFOiAweDU5NDgsXG4gICAgMHg5M0RGOiAweDkwQTMsXG4gICAgMHg5M0UwOiAweDUxODUsXG4gICAgMHg5M0UxOiAweDRFNEQsXG4gICAgMHg5M0UyOiAweDUxRUEsXG4gICAgMHg5M0UzOiAweDg1OTksXG4gICAgMHg5M0U0OiAweDhCMEUsXG4gICAgMHg5M0U1OiAweDcwNTgsXG4gICAgMHg5M0U2OiAweDYzN0EsXG4gICAgMHg5M0U3OiAweDkzNEIsXG4gICAgMHg5M0U4OiAweDY5NjIsXG4gICAgMHg5M0U5OiAweDk5QjQsXG4gICAgMHg5M0VBOiAweDdFMDQsXG4gICAgMHg5M0VCOiAweDc1NzcsXG4gICAgMHg5M0VDOiAweDUzNTcsXG4gICAgMHg5M0VEOiAweDY5NjAsXG4gICAgMHg5M0VFOiAweDhFREYsXG4gICAgMHg5M0VGOiAweDk2RTMsXG4gICAgMHg5M0YwOiAweDZDNUQsXG4gICAgMHg5M0YxOiAweDRFOEMsXG4gICAgMHg5M0YyOiAweDVDM0MsXG4gICAgMHg5M0YzOiAweDVGMTAsXG4gICAgMHg5M0Y0OiAweDhGRTksXG4gICAgMHg5M0Y1OiAweDUzMDIsXG4gICAgMHg5M0Y2OiAweDhDRDEsXG4gICAgMHg5M0Y3OiAweDgwODksXG4gICAgMHg5M0Y4OiAweDg2NzksXG4gICAgMHg5M0Y5OiAweDVFRkYsXG4gICAgMHg5M0ZBOiAweDY1RTUsXG4gICAgMHg5M0ZCOiAweDRFNzMsXG4gICAgMHg5M0ZDOiAweDUxNjUsXG4gICAgMHg5NDQwOiAweDU5ODIsXG4gICAgMHg5NDQxOiAweDVDM0YsXG4gICAgMHg5NDQyOiAweDk3RUUsXG4gICAgMHg5NDQzOiAweDRFRkIsXG4gICAgMHg5NDQ0OiAweDU5OEEsXG4gICAgMHg5NDQ1OiAweDVGQ0QsXG4gICAgMHg5NDQ2OiAweDhBOEQsXG4gICAgMHg5NDQ3OiAweDZGRTEsXG4gICAgMHg5NDQ4OiAweDc5QjAsXG4gICAgMHg5NDQ5OiAweDc5NjIsXG4gICAgMHg5NDRBOiAweDVCRTcsXG4gICAgMHg5NDRCOiAweDg0NzEsXG4gICAgMHg5NDRDOiAweDczMkIsXG4gICAgMHg5NDREOiAweDcxQjEsXG4gICAgMHg5NDRFOiAweDVFNzQsXG4gICAgMHg5NDRGOiAweDVGRjUsXG4gICAgMHg5NDUwOiAweDYzN0IsXG4gICAgMHg5NDUxOiAweDY0OUEsXG4gICAgMHg5NDUyOiAweDcxQzMsXG4gICAgMHg5NDUzOiAweDdDOTgsXG4gICAgMHg5NDU0OiAweDRFNDMsXG4gICAgMHg5NDU1OiAweDVFRkMsXG4gICAgMHg5NDU2OiAweDRFNEIsXG4gICAgMHg5NDU3OiAweDU3REMsXG4gICAgMHg5NDU4OiAweDU2QTIsXG4gICAgMHg5NDU5OiAweDYwQTksXG4gICAgMHg5NDVBOiAweDZGQzMsXG4gICAgMHg5NDVCOiAweDdEMEQsXG4gICAgMHg5NDVDOiAweDgwRkQsXG4gICAgMHg5NDVEOiAweDgxMzMsXG4gICAgMHg5NDVFOiAweDgxQkYsXG4gICAgMHg5NDVGOiAweDhGQjIsXG4gICAgMHg5NDYwOiAweDg5OTcsXG4gICAgMHg5NDYxOiAweDg2QTQsXG4gICAgMHg5NDYyOiAweDVERjQsXG4gICAgMHg5NDYzOiAweDYyOEEsXG4gICAgMHg5NDY0OiAweDY0QUQsXG4gICAgMHg5NDY1OiAweDg5ODcsXG4gICAgMHg5NDY2OiAweDY3NzcsXG4gICAgMHg5NDY3OiAweDZDRTIsXG4gICAgMHg5NDY4OiAweDZEM0UsXG4gICAgMHg5NDY5OiAweDc0MzYsXG4gICAgMHg5NDZBOiAweDc4MzQsXG4gICAgMHg5NDZCOiAweDVBNDYsXG4gICAgMHg5NDZDOiAweDdGNzUsXG4gICAgMHg5NDZEOiAweDgyQUQsXG4gICAgMHg5NDZFOiAweDk5QUMsXG4gICAgMHg5NDZGOiAweDRGRjMsXG4gICAgMHg5NDcwOiAweDVFQzMsXG4gICAgMHg5NDcxOiAweDYyREQsXG4gICAgMHg5NDcyOiAweDYzOTIsXG4gICAgMHg5NDczOiAweDY1NTcsXG4gICAgMHg5NDc0OiAweDY3NkYsXG4gICAgMHg5NDc1OiAweDc2QzMsXG4gICAgMHg5NDc2OiAweDcyNEMsXG4gICAgMHg5NDc3OiAweDgwQ0MsXG4gICAgMHg5NDc4OiAweDgwQkEsXG4gICAgMHg5NDc5OiAweDhGMjksXG4gICAgMHg5NDdBOiAweDkxNEQsXG4gICAgMHg5NDdCOiAweDUwMEQsXG4gICAgMHg5NDdDOiAweDU3RjksXG4gICAgMHg5NDdEOiAweDVBOTIsXG4gICAgMHg5NDdFOiAweDY4ODUsXG4gICAgMHg5NDgwOiAweDY5NzMsXG4gICAgMHg5NDgxOiAweDcxNjQsXG4gICAgMHg5NDgyOiAweDcyRkQsXG4gICAgMHg5NDgzOiAweDhDQjcsXG4gICAgMHg5NDg0OiAweDU4RjIsXG4gICAgMHg5NDg1OiAweDhDRTAsXG4gICAgMHg5NDg2OiAweDk2NkEsXG4gICAgMHg5NDg3OiAweDkwMTksXG4gICAgMHg5NDg4OiAweDg3N0YsXG4gICAgMHg5NDg5OiAweDc5RTQsXG4gICAgMHg5NDhBOiAweDc3RTcsXG4gICAgMHg5NDhCOiAweDg0MjksXG4gICAgMHg5NDhDOiAweDRGMkYsXG4gICAgMHg5NDhEOiAweDUyNjUsXG4gICAgMHg5NDhFOiAweDUzNUEsXG4gICAgMHg5NDhGOiAweDYyQ0QsXG4gICAgMHg5NDkwOiAweDY3Q0YsXG4gICAgMHg5NDkxOiAweDZDQ0EsXG4gICAgMHg5NDkyOiAweDc2N0QsXG4gICAgMHg5NDkzOiAweDdCOTQsXG4gICAgMHg5NDk0OiAweDdDOTUsXG4gICAgMHg5NDk1OiAweDgyMzYsXG4gICAgMHg5NDk2OiAweDg1ODQsXG4gICAgMHg5NDk3OiAweDhGRUIsXG4gICAgMHg5NDk4OiAweDY2REQsXG4gICAgMHg5NDk5OiAweDZGMjAsXG4gICAgMHg5NDlBOiAweDcyMDYsXG4gICAgMHg5NDlCOiAweDdFMUIsXG4gICAgMHg5NDlDOiAweDgzQUIsXG4gICAgMHg5NDlEOiAweDk5QzEsXG4gICAgMHg5NDlFOiAweDlFQTYsXG4gICAgMHg5NDlGOiAweDUxRkQsXG4gICAgMHg5NEEwOiAweDdCQjEsXG4gICAgMHg5NEExOiAweDc4NzIsXG4gICAgMHg5NEEyOiAweDdCQjgsXG4gICAgMHg5NEEzOiAweDgwODcsXG4gICAgMHg5NEE0OiAweDdCNDgsXG4gICAgMHg5NEE1OiAweDZBRTgsXG4gICAgMHg5NEE2OiAweDVFNjEsXG4gICAgMHg5NEE3OiAweDgwOEMsXG4gICAgMHg5NEE4OiAweDc1NTEsXG4gICAgMHg5NEE5OiAweDc1NjAsXG4gICAgMHg5NEFBOiAweDUxNkIsXG4gICAgMHg5NEFCOiAweDkyNjIsXG4gICAgMHg5NEFDOiAweDZFOEMsXG4gICAgMHg5NEFEOiAweDc2N0EsXG4gICAgMHg5NEFFOiAweDkxOTcsXG4gICAgMHg5NEFGOiAweDlBRUEsXG4gICAgMHg5NEIwOiAweDRGMTAsXG4gICAgMHg5NEIxOiAweDdGNzAsXG4gICAgMHg5NEIyOiAweDYyOUMsXG4gICAgMHg5NEIzOiAweDdCNEYsXG4gICAgMHg5NEI0OiAweDk1QTUsXG4gICAgMHg5NEI1OiAweDlDRTksXG4gICAgMHg5NEI2OiAweDU2N0EsXG4gICAgMHg5NEI3OiAweDU4NTksXG4gICAgMHg5NEI4OiAweDg2RTQsXG4gICAgMHg5NEI5OiAweDk2QkMsXG4gICAgMHg5NEJBOiAweDRGMzQsXG4gICAgMHg5NEJCOiAweDUyMjQsXG4gICAgMHg5NEJDOiAweDUzNEEsXG4gICAgMHg5NEJEOiAweDUzQ0QsXG4gICAgMHg5NEJFOiAweDUzREIsXG4gICAgMHg5NEJGOiAweDVFMDYsXG4gICAgMHg5NEMwOiAweDY0MkMsXG4gICAgMHg5NEMxOiAweDY1OTEsXG4gICAgMHg5NEMyOiAweDY3N0YsXG4gICAgMHg5NEMzOiAweDZDM0UsXG4gICAgMHg5NEM0OiAweDZDNEUsXG4gICAgMHg5NEM1OiAweDcyNDgsXG4gICAgMHg5NEM2OiAweDcyQUYsXG4gICAgMHg5NEM3OiAweDczRUQsXG4gICAgMHg5NEM4OiAweDc1NTQsXG4gICAgMHg5NEM5OiAweDdFNDEsXG4gICAgMHg5NENBOiAweDgyMkMsXG4gICAgMHg5NENCOiAweDg1RTksXG4gICAgMHg5NENDOiAweDhDQTksXG4gICAgMHg5NENEOiAweDdCQzQsXG4gICAgMHg5NENFOiAweDkxQzYsXG4gICAgMHg5NENGOiAweDcxNjksXG4gICAgMHg5NEQwOiAweDk4MTIsXG4gICAgMHg5NEQxOiAweDk4RUYsXG4gICAgMHg5NEQyOiAweDYzM0QsXG4gICAgMHg5NEQzOiAweDY2NjksXG4gICAgMHg5NEQ0OiAweDc1NkEsXG4gICAgMHg5NEQ1OiAweDc2RTQsXG4gICAgMHg5NEQ2OiAweDc4RDAsXG4gICAgMHg5NEQ3OiAweDg1NDMsXG4gICAgMHg5NEQ4OiAweDg2RUUsXG4gICAgMHg5NEQ5OiAweDUzMkEsXG4gICAgMHg5NERBOiAweDUzNTEsXG4gICAgMHg5NERCOiAweDU0MjYsXG4gICAgMHg5NERDOiAweDU5ODMsXG4gICAgMHg5NEREOiAweDVFODcsXG4gICAgMHg5NERFOiAweDVGN0MsXG4gICAgMHg5NERGOiAweDYwQjIsXG4gICAgMHg5NEUwOiAweDYyNDksXG4gICAgMHg5NEUxOiAweDYyNzksXG4gICAgMHg5NEUyOiAweDYyQUIsXG4gICAgMHg5NEUzOiAweDY1OTAsXG4gICAgMHg5NEU0OiAweDZCRDQsXG4gICAgMHg5NEU1OiAweDZDQ0MsXG4gICAgMHg5NEU2OiAweDc1QjIsXG4gICAgMHg5NEU3OiAweDc2QUUsXG4gICAgMHg5NEU4OiAweDc4OTEsXG4gICAgMHg5NEU5OiAweDc5RDgsXG4gICAgMHg5NEVBOiAweDdEQ0IsXG4gICAgMHg5NEVCOiAweDdGNzcsXG4gICAgMHg5NEVDOiAweDgwQTUsXG4gICAgMHg5NEVEOiAweDg4QUIsXG4gICAgMHg5NEVFOiAweDhBQjksXG4gICAgMHg5NEVGOiAweDhDQkIsXG4gICAgMHg5NEYwOiAweDkwN0YsXG4gICAgMHg5NEYxOiAweDk3NUUsXG4gICAgMHg5NEYyOiAweDk4REIsXG4gICAgMHg5NEYzOiAweDZBMEIsXG4gICAgMHg5NEY0OiAweDdDMzgsXG4gICAgMHg5NEY1OiAweDUwOTksXG4gICAgMHg5NEY2OiAweDVDM0UsXG4gICAgMHg5NEY3OiAweDVGQUUsXG4gICAgMHg5NEY4OiAweDY3ODcsXG4gICAgMHg5NEY5OiAweDZCRDgsXG4gICAgMHg5NEZBOiAweDc0MzUsXG4gICAgMHg5NEZCOiAweDc3MDksXG4gICAgMHg5NEZDOiAweDdGOEUsXG4gICAgMHg5NTQwOiAweDlGM0IsXG4gICAgMHg5NTQxOiAweDY3Q0EsXG4gICAgMHg5NTQyOiAweDdBMTcsXG4gICAgMHg5NTQzOiAweDUzMzksXG4gICAgMHg5NTQ0OiAweDc1OEIsXG4gICAgMHg5NTQ1OiAweDlBRUQsXG4gICAgMHg5NTQ2OiAweDVGNjYsXG4gICAgMHg5NTQ3OiAweDgxOUQsXG4gICAgMHg5NTQ4OiAweDgzRjEsXG4gICAgMHg5NTQ5OiAweDgwOTgsXG4gICAgMHg5NTRBOiAweDVGM0MsXG4gICAgMHg5NTRCOiAweDVGQzUsXG4gICAgMHg5NTRDOiAweDc1NjIsXG4gICAgMHg5NTREOiAweDdCNDYsXG4gICAgMHg5NTRFOiAweDkwM0MsXG4gICAgMHg5NTRGOiAweDY4NjcsXG4gICAgMHg5NTUwOiAweDU5RUIsXG4gICAgMHg5NTUxOiAweDVBOUIsXG4gICAgMHg5NTUyOiAweDdEMTAsXG4gICAgMHg5NTUzOiAweDc2N0UsXG4gICAgMHg5NTU0OiAweDhCMkMsXG4gICAgMHg5NTU1OiAweDRGRjUsXG4gICAgMHg5NTU2OiAweDVGNkEsXG4gICAgMHg5NTU3OiAweDZBMTksXG4gICAgMHg5NTU4OiAweDZDMzcsXG4gICAgMHg5NTU5OiAweDZGMDIsXG4gICAgMHg5NTVBOiAweDc0RTIsXG4gICAgMHg5NTVCOiAweDc5NjgsXG4gICAgMHg5NTVDOiAweDg4NjgsXG4gICAgMHg5NTVEOiAweDhBNTUsXG4gICAgMHg5NTVFOiAweDhDNzksXG4gICAgMHg5NTVGOiAweDVFREYsXG4gICAgMHg5NTYwOiAweDYzQ0YsXG4gICAgMHg5NTYxOiAweDc1QzUsXG4gICAgMHg5NTYyOiAweDc5RDIsXG4gICAgMHg5NTYzOiAweDgyRDcsXG4gICAgMHg5NTY0OiAweDkzMjgsXG4gICAgMHg5NTY1OiAweDkyRjIsXG4gICAgMHg5NTY2OiAweDg0OUMsXG4gICAgMHg5NTY3OiAweDg2RUQsXG4gICAgMHg5NTY4OiAweDlDMkQsXG4gICAgMHg5NTY5OiAweDU0QzEsXG4gICAgMHg5NTZBOiAweDVGNkMsXG4gICAgMHg5NTZCOiAweDY1OEMsXG4gICAgMHg5NTZDOiAweDZENUMsXG4gICAgMHg5NTZEOiAweDcwMTUsXG4gICAgMHg5NTZFOiAweDhDQTcsXG4gICAgMHg5NTZGOiAweDhDRDMsXG4gICAgMHg5NTcwOiAweDk4M0IsXG4gICAgMHg5NTcxOiAweDY1NEYsXG4gICAgMHg5NTcyOiAweDc0RjYsXG4gICAgMHg5NTczOiAweDRFMEQsXG4gICAgMHg5NTc0OiAweDRFRDgsXG4gICAgMHg5NTc1OiAweDU3RTAsXG4gICAgMHg5NTc2OiAweDU5MkIsXG4gICAgMHg5NTc3OiAweDVBNjYsXG4gICAgMHg5NTc4OiAweDVCQ0MsXG4gICAgMHg5NTc5OiAweDUxQTgsXG4gICAgMHg5NTdBOiAweDVFMDMsXG4gICAgMHg5NTdCOiAweDVFOUMsXG4gICAgMHg5NTdDOiAweDYwMTYsXG4gICAgMHg5NTdEOiAweDYyNzYsXG4gICAgMHg5NTdFOiAweDY1NzcsXG4gICAgMHg5NTgwOiAweDY1QTcsXG4gICAgMHg5NTgxOiAweDY2NkUsXG4gICAgMHg5NTgyOiAweDZENkUsXG4gICAgMHg5NTgzOiAweDcyMzYsXG4gICAgMHg5NTg0OiAweDdCMjYsXG4gICAgMHg5NTg1OiAweDgxNTAsXG4gICAgMHg5NTg2OiAweDgxOUEsXG4gICAgMHg5NTg3OiAweDgyOTksXG4gICAgMHg5NTg4OiAweDhCNUMsXG4gICAgMHg5NTg5OiAweDhDQTAsXG4gICAgMHg5NThBOiAweDhDRTYsXG4gICAgMHg5NThCOiAweDhENzQsXG4gICAgMHg5NThDOiAweDk2MUMsXG4gICAgMHg5NThEOiAweDk2NDQsXG4gICAgMHg5NThFOiAweDRGQUUsXG4gICAgMHg5NThGOiAweDY0QUIsXG4gICAgMHg5NTkwOiAweDZCNjYsXG4gICAgMHg5NTkxOiAweDgyMUUsXG4gICAgMHg5NTkyOiAweDg0NjEsXG4gICAgMHg5NTkzOiAweDg1NkEsXG4gICAgMHg5NTk0OiAweDkwRTgsXG4gICAgMHg5NTk1OiAweDVDMDEsXG4gICAgMHg5NTk2OiAweDY5NTMsXG4gICAgMHg5NTk3OiAweDk4QTgsXG4gICAgMHg5NTk4OiAweDg0N0EsXG4gICAgMHg5NTk5OiAweDg1NTcsXG4gICAgMHg5NTlBOiAweDRGMEYsXG4gICAgMHg5NTlCOiAweDUyNkYsXG4gICAgMHg5NTlDOiAweDVGQTksXG4gICAgMHg5NTlEOiAweDVFNDUsXG4gICAgMHg5NTlFOiAweDY3MEQsXG4gICAgMHg5NTlGOiAweDc5OEYsXG4gICAgMHg5NUEwOiAweDgxNzksXG4gICAgMHg5NUExOiAweDg5MDcsXG4gICAgMHg5NUEyOiAweDg5ODYsXG4gICAgMHg5NUEzOiAweDZERjUsXG4gICAgMHg5NUE0OiAweDVGMTcsXG4gICAgMHg5NUE1OiAweDYyNTUsXG4gICAgMHg5NUE2OiAweDZDQjgsXG4gICAgMHg5NUE3OiAweDRFQ0YsXG4gICAgMHg5NUE4OiAweDcyNjksXG4gICAgMHg5NUE5OiAweDlCOTIsXG4gICAgMHg5NUFBOiAweDUyMDYsXG4gICAgMHg5NUFCOiAweDU0M0IsXG4gICAgMHg5NUFDOiAweDU2NzQsXG4gICAgMHg5NUFEOiAweDU4QjMsXG4gICAgMHg5NUFFOiAweDYxQTQsXG4gICAgMHg5NUFGOiAweDYyNkUsXG4gICAgMHg5NUIwOiAweDcxMUEsXG4gICAgMHg5NUIxOiAweDU5NkUsXG4gICAgMHg5NUIyOiAweDdDODksXG4gICAgMHg5NUIzOiAweDdDREUsXG4gICAgMHg5NUI0OiAweDdEMUIsXG4gICAgMHg5NUI1OiAweDk2RjAsXG4gICAgMHg5NUI2OiAweDY1ODcsXG4gICAgMHg5NUI3OiAweDgwNUUsXG4gICAgMHg5NUI4OiAweDRFMTksXG4gICAgMHg5NUI5OiAweDRGNzUsXG4gICAgMHg5NUJBOiAweDUxNzUsXG4gICAgMHg5NUJCOiAweDU4NDAsXG4gICAgMHg5NUJDOiAweDVFNjMsXG4gICAgMHg5NUJEOiAweDVFNzMsXG4gICAgMHg5NUJFOiAweDVGMEEsXG4gICAgMHg5NUJGOiAweDY3QzQsXG4gICAgMHg5NUMwOiAweDRFMjYsXG4gICAgMHg5NUMxOiAweDg1M0QsXG4gICAgMHg5NUMyOiAweDk1ODksXG4gICAgMHg5NUMzOiAweDk2NUIsXG4gICAgMHg5NUM0OiAweDdDNzMsXG4gICAgMHg5NUM1OiAweDk4MDEsXG4gICAgMHg5NUM2OiAweDUwRkIsXG4gICAgMHg5NUM3OiAweDU4QzEsXG4gICAgMHg5NUM4OiAweDc2NTYsXG4gICAgMHg5NUM5OiAweDc4QTcsXG4gICAgMHg5NUNBOiAweDUyMjUsXG4gICAgMHg5NUNCOiAweDc3QTUsXG4gICAgMHg5NUNDOiAweDg1MTEsXG4gICAgMHg5NUNEOiAweDdCODYsXG4gICAgMHg5NUNFOiAweDUwNEYsXG4gICAgMHg5NUNGOiAweDU5MDksXG4gICAgMHg5NUQwOiAweDcyNDcsXG4gICAgMHg5NUQxOiAweDdCQzcsXG4gICAgMHg5NUQyOiAweDdERTgsXG4gICAgMHg5NUQzOiAweDhGQkEsXG4gICAgMHg5NUQ0OiAweDhGRDQsXG4gICAgMHg5NUQ1OiAweDkwNEQsXG4gICAgMHg5NUQ2OiAweDRGQkYsXG4gICAgMHg5NUQ3OiAweDUyQzksXG4gICAgMHg5NUQ4OiAweDVBMjksXG4gICAgMHg5NUQ5OiAweDVGMDEsXG4gICAgMHg5NURBOiAweDk3QUQsXG4gICAgMHg5NURCOiAweDRGREQsXG4gICAgMHg5NURDOiAweDgyMTcsXG4gICAgMHg5NUREOiAweDkyRUEsXG4gICAgMHg5NURFOiAweDU3MDMsXG4gICAgMHg5NURGOiAweDYzNTUsXG4gICAgMHg5NUUwOiAweDZCNjksXG4gICAgMHg5NUUxOiAweDc1MkIsXG4gICAgMHg5NUUyOiAweDg4REMsXG4gICAgMHg5NUUzOiAweDhGMTQsXG4gICAgMHg5NUU0OiAweDdBNDIsXG4gICAgMHg5NUU1OiAweDUyREYsXG4gICAgMHg5NUU2OiAweDU4OTMsXG4gICAgMHg5NUU3OiAweDYxNTUsXG4gICAgMHg5NUU4OiAweDYyMEEsXG4gICAgMHg5NUU5OiAweDY2QUUsXG4gICAgMHg5NUVBOiAweDZCQ0QsXG4gICAgMHg5NUVCOiAweDdDM0YsXG4gICAgMHg5NUVDOiAweDgzRTksXG4gICAgMHg5NUVEOiAweDUwMjMsXG4gICAgMHg5NUVFOiAweDRGRjgsXG4gICAgMHg5NUVGOiAweDUzMDUsXG4gICAgMHg5NUYwOiAweDU0NDYsXG4gICAgMHg5NUYxOiAweDU4MzEsXG4gICAgMHg5NUYyOiAweDU5NDksXG4gICAgMHg5NUYzOiAweDVCOUQsXG4gICAgMHg5NUY0OiAweDVDRjAsXG4gICAgMHg5NUY1OiAweDVDRUYsXG4gICAgMHg5NUY2OiAweDVEMjksXG4gICAgMHg5NUY3OiAweDVFOTYsXG4gICAgMHg5NUY4OiAweDYyQjEsXG4gICAgMHg5NUY5OiAweDYzNjcsXG4gICAgMHg5NUZBOiAweDY1M0UsXG4gICAgMHg5NUZCOiAweDY1QjksXG4gICAgMHg5NUZDOiAweDY3MEIsXG4gICAgMHg5NjQwOiAweDZDRDUsXG4gICAgMHg5NjQxOiAweDZDRTEsXG4gICAgMHg5NjQyOiAweDcwRjksXG4gICAgMHg5NjQzOiAweDc4MzIsXG4gICAgMHg5NjQ0OiAweDdFMkIsXG4gICAgMHg5NjQ1OiAweDgwREUsXG4gICAgMHg5NjQ2OiAweDgyQjMsXG4gICAgMHg5NjQ3OiAweDg0MEMsXG4gICAgMHg5NjQ4OiAweDg0RUMsXG4gICAgMHg5NjQ5OiAweDg3MDIsXG4gICAgMHg5NjRBOiAweDg5MTIsXG4gICAgMHg5NjRCOiAweDhBMkEsXG4gICAgMHg5NjRDOiAweDhDNEEsXG4gICAgMHg5NjREOiAweDkwQTYsXG4gICAgMHg5NjRFOiAweDkyRDIsXG4gICAgMHg5NjRGOiAweDk4RkQsXG4gICAgMHg5NjUwOiAweDlDRjMsXG4gICAgMHg5NjUxOiAweDlENkMsXG4gICAgMHg5NjUyOiAweDRFNEYsXG4gICAgMHg5NjUzOiAweDRFQTEsXG4gICAgMHg5NjU0OiAweDUwOEQsXG4gICAgMHg5NjU1OiAweDUyNTYsXG4gICAgMHg5NjU2OiAweDU3NEEsXG4gICAgMHg5NjU3OiAweDU5QTgsXG4gICAgMHg5NjU4OiAweDVFM0QsXG4gICAgMHg5NjU5OiAweDVGRDgsXG4gICAgMHg5NjVBOiAweDVGRDksXG4gICAgMHg5NjVCOiAweDYyM0YsXG4gICAgMHg5NjVDOiAweDY2QjQsXG4gICAgMHg5NjVEOiAweDY3MUIsXG4gICAgMHg5NjVFOiAweDY3RDAsXG4gICAgMHg5NjVGOiAweDY4RDIsXG4gICAgMHg5NjYwOiAweDUxOTIsXG4gICAgMHg5NjYxOiAweDdEMjEsXG4gICAgMHg5NjYyOiAweDgwQUEsXG4gICAgMHg5NjYzOiAweDgxQTgsXG4gICAgMHg5NjY0OiAweDhCMDAsXG4gICAgMHg5NjY1OiAweDhDOEMsXG4gICAgMHg5NjY2OiAweDhDQkYsXG4gICAgMHg5NjY3OiAweDkyN0UsXG4gICAgMHg5NjY4OiAweDk2MzIsXG4gICAgMHg5NjY5OiAweDU0MjAsXG4gICAgMHg5NjZBOiAweDk4MkMsXG4gICAgMHg5NjZCOiAweDUzMTcsXG4gICAgMHg5NjZDOiAweDUwRDUsXG4gICAgMHg5NjZEOiAweDUzNUMsXG4gICAgMHg5NjZFOiAweDU4QTgsXG4gICAgMHg5NjZGOiAweDY0QjIsXG4gICAgMHg5NjcwOiAweDY3MzQsXG4gICAgMHg5NjcxOiAweDcyNjcsXG4gICAgMHg5NjcyOiAweDc3NjYsXG4gICAgMHg5NjczOiAweDdBNDYsXG4gICAgMHg5Njc0OiAweDkxRTYsXG4gICAgMHg5Njc1OiAweDUyQzMsXG4gICAgMHg5Njc2OiAweDZDQTEsXG4gICAgMHg5Njc3OiAweDZCODYsXG4gICAgMHg5Njc4OiAweDU4MDAsXG4gICAgMHg5Njc5OiAweDVFNEMsXG4gICAgMHg5NjdBOiAweDU5NTQsXG4gICAgMHg5NjdCOiAweDY3MkMsXG4gICAgMHg5NjdDOiAweDdGRkIsXG4gICAgMHg5NjdEOiAweDUxRTEsXG4gICAgMHg5NjdFOiAweDc2QzYsXG4gICAgMHg5NjgwOiAweDY0NjksXG4gICAgMHg5NjgxOiAweDc4RTgsXG4gICAgMHg5NjgyOiAweDlCNTQsXG4gICAgMHg5NjgzOiAweDlFQkIsXG4gICAgMHg5Njg0OiAweDU3Q0IsXG4gICAgMHg5Njg1OiAweDU5QjksXG4gICAgMHg5Njg2OiAweDY2MjcsXG4gICAgMHg5Njg3OiAweDY3OUEsXG4gICAgMHg5Njg4OiAweDZCQ0UsXG4gICAgMHg5Njg5OiAweDU0RTksXG4gICAgMHg5NjhBOiAweDY5RDksXG4gICAgMHg5NjhCOiAweDVFNTUsXG4gICAgMHg5NjhDOiAweDgxOUMsXG4gICAgMHg5NjhEOiAweDY3OTUsXG4gICAgMHg5NjhFOiAweDlCQUEsXG4gICAgMHg5NjhGOiAweDY3RkUsXG4gICAgMHg5NjkwOiAweDlDNTIsXG4gICAgMHg5NjkxOiAweDY4NUQsXG4gICAgMHg5NjkyOiAweDRFQTYsXG4gICAgMHg5NjkzOiAweDRGRTMsXG4gICAgMHg5Njk0OiAweDUzQzgsXG4gICAgMHg5Njk1OiAweDYyQjksXG4gICAgMHg5Njk2OiAweDY3MkIsXG4gICAgMHg5Njk3OiAweDZDQUIsXG4gICAgMHg5Njk4OiAweDhGQzQsXG4gICAgMHg5Njk5OiAweDRGQUQsXG4gICAgMHg5NjlBOiAweDdFNkQsXG4gICAgMHg5NjlCOiAweDlFQkYsXG4gICAgMHg5NjlDOiAweDRFMDcsXG4gICAgMHg5NjlEOiAweDYxNjIsXG4gICAgMHg5NjlFOiAweDZFODAsXG4gICAgMHg5NjlGOiAweDZGMkIsXG4gICAgMHg5NkEwOiAweDg1MTMsXG4gICAgMHg5NkExOiAweDU0NzMsXG4gICAgMHg5NkEyOiAweDY3MkEsXG4gICAgMHg5NkEzOiAweDlCNDUsXG4gICAgMHg5NkE0OiAweDVERjMsXG4gICAgMHg5NkE1OiAweDdCOTUsXG4gICAgMHg5NkE2OiAweDVDQUMsXG4gICAgMHg5NkE3OiAweDVCQzYsXG4gICAgMHg5NkE4OiAweDg3MUMsXG4gICAgMHg5NkE5OiAweDZFNEEsXG4gICAgMHg5NkFBOiAweDg0RDEsXG4gICAgMHg5NkFCOiAweDdBMTQsXG4gICAgMHg5NkFDOiAweDgxMDgsXG4gICAgMHg5NkFEOiAweDU5OTksXG4gICAgMHg5NkFFOiAweDdDOEQsXG4gICAgMHg5NkFGOiAweDZDMTEsXG4gICAgMHg5NkIwOiAweDc3MjAsXG4gICAgMHg5NkIxOiAweDUyRDksXG4gICAgMHg5NkIyOiAweDU5MjIsXG4gICAgMHg5NkIzOiAweDcxMjEsXG4gICAgMHg5NkI0OiAweDcyNUYsXG4gICAgMHg5NkI1OiAweDc3REIsXG4gICAgMHg5NkI2OiAweDk3MjcsXG4gICAgMHg5NkI3OiAweDlENjEsXG4gICAgMHg5NkI4OiAweDY5MEIsXG4gICAgMHg5NkI5OiAweDVBN0YsXG4gICAgMHg5NkJBOiAweDVBMTgsXG4gICAgMHg5NkJCOiAweDUxQTUsXG4gICAgMHg5NkJDOiAweDU0MEQsXG4gICAgMHg5NkJEOiAweDU0N0QsXG4gICAgMHg5NkJFOiAweDY2MEUsXG4gICAgMHg5NkJGOiAweDc2REYsXG4gICAgMHg5NkMwOiAweDhGRjcsXG4gICAgMHg5NkMxOiAweDkyOTgsXG4gICAgMHg5NkMyOiAweDlDRjQsXG4gICAgMHg5NkMzOiAweDU5RUEsXG4gICAgMHg5NkM0OiAweDcyNUQsXG4gICAgMHg5NkM1OiAweDZFQzUsXG4gICAgMHg5NkM2OiAweDUxNEQsXG4gICAgMHg5NkM3OiAweDY4QzksXG4gICAgMHg5NkM4OiAweDdEQkYsXG4gICAgMHg5NkM5OiAweDdERUMsXG4gICAgMHg5NkNBOiAweDk3NjIsXG4gICAgMHg5NkNCOiAweDlFQkEsXG4gICAgMHg5NkNDOiAweDY0NzgsXG4gICAgMHg5NkNEOiAweDZBMjEsXG4gICAgMHg5NkNFOiAweDgzMDIsXG4gICAgMHg5NkNGOiAweDU5ODQsXG4gICAgMHg5NkQwOiAweDVCNUYsXG4gICAgMHg5NkQxOiAweDZCREIsXG4gICAgMHg5NkQyOiAweDczMUIsXG4gICAgMHg5NkQzOiAweDc2RjIsXG4gICAgMHg5NkQ0OiAweDdEQjIsXG4gICAgMHg5NkQ1OiAweDgwMTcsXG4gICAgMHg5NkQ2OiAweDg0OTksXG4gICAgMHg5NkQ3OiAweDUxMzIsXG4gICAgMHg5NkQ4OiAweDY3MjgsXG4gICAgMHg5NkQ5OiAweDlFRDksXG4gICAgMHg5NkRBOiAweDc2RUUsXG4gICAgMHg5NkRCOiAweDY3NjIsXG4gICAgMHg5NkRDOiAweDUyRkYsXG4gICAgMHg5NkREOiAweDk5MDUsXG4gICAgMHg5NkRFOiAweDVDMjQsXG4gICAgMHg5NkRGOiAweDYyM0IsXG4gICAgMHg5NkUwOiAweDdDN0UsXG4gICAgMHg5NkUxOiAweDhDQjAsXG4gICAgMHg5NkUyOiAweDU1NEYsXG4gICAgMHg5NkUzOiAweDYwQjYsXG4gICAgMHg5NkU0OiAweDdEMEIsXG4gICAgMHg5NkU1OiAweDk1ODAsXG4gICAgMHg5NkU2OiAweDUzMDEsXG4gICAgMHg5NkU3OiAweDRFNUYsXG4gICAgMHg5NkU4OiAweDUxQjYsXG4gICAgMHg5NkU5OiAweDU5MUMsXG4gICAgMHg5NkVBOiAweDcyM0EsXG4gICAgMHg5NkVCOiAweDgwMzYsXG4gICAgMHg5NkVDOiAweDkxQ0UsXG4gICAgMHg5NkVEOiAweDVGMjUsXG4gICAgMHg5NkVFOiAweDc3RTIsXG4gICAgMHg5NkVGOiAweDUzODQsXG4gICAgMHg5NkYwOiAweDVGNzksXG4gICAgMHg5NkYxOiAweDdEMDQsXG4gICAgMHg5NkYyOiAweDg1QUMsXG4gICAgMHg5NkYzOiAweDhBMzMsXG4gICAgMHg5NkY0OiAweDhFOEQsXG4gICAgMHg5NkY1OiAweDk3NTYsXG4gICAgMHg5NkY2OiAweDY3RjMsXG4gICAgMHg5NkY3OiAweDg1QUUsXG4gICAgMHg5NkY4OiAweDk0NTMsXG4gICAgMHg5NkY5OiAweDYxMDksXG4gICAgMHg5NkZBOiAweDYxMDgsXG4gICAgMHg5NkZCOiAweDZDQjksXG4gICAgMHg5NkZDOiAweDc2NTIsXG4gICAgMHg5NzQwOiAweDhBRUQsXG4gICAgMHg5NzQxOiAweDhGMzgsXG4gICAgMHg5NzQyOiAweDU1MkYsXG4gICAgMHg5NzQzOiAweDRGNTEsXG4gICAgMHg5NzQ0OiAweDUxMkEsXG4gICAgMHg5NzQ1OiAweDUyQzcsXG4gICAgMHg5NzQ2OiAweDUzQ0IsXG4gICAgMHg5NzQ3OiAweDVCQTUsXG4gICAgMHg5NzQ4OiAweDVFN0QsXG4gICAgMHg5NzQ5OiAweDYwQTAsXG4gICAgMHg5NzRBOiAweDYxODIsXG4gICAgMHg5NzRCOiAweDYzRDYsXG4gICAgMHg5NzRDOiAweDY3MDksXG4gICAgMHg5NzREOiAweDY3REEsXG4gICAgMHg5NzRFOiAweDZFNjcsXG4gICAgMHg5NzRGOiAweDZEOEMsXG4gICAgMHg5NzUwOiAweDczMzYsXG4gICAgMHg5NzUxOiAweDczMzcsXG4gICAgMHg5NzUyOiAweDc1MzEsXG4gICAgMHg5NzUzOiAweDc5NTAsXG4gICAgMHg5NzU0OiAweDg4RDUsXG4gICAgMHg5NzU1OiAweDhBOTgsXG4gICAgMHg5NzU2OiAweDkwNEEsXG4gICAgMHg5NzU3OiAweDkwOTEsXG4gICAgMHg5NzU4OiAweDkwRjUsXG4gICAgMHg5NzU5OiAweDk2QzQsXG4gICAgMHg5NzVBOiAweDg3OEQsXG4gICAgMHg5NzVCOiAweDU5MTUsXG4gICAgMHg5NzVDOiAweDRFODgsXG4gICAgMHg5NzVEOiAweDRGNTksXG4gICAgMHg5NzVFOiAweDRFMEUsXG4gICAgMHg5NzVGOiAweDhBODksXG4gICAgMHg5NzYwOiAweDhGM0YsXG4gICAgMHg5NzYxOiAweDk4MTAsXG4gICAgMHg5NzYyOiAweDUwQUQsXG4gICAgMHg5NzYzOiAweDVFN0MsXG4gICAgMHg5NzY0OiAweDU5OTYsXG4gICAgMHg5NzY1OiAweDVCQjksXG4gICAgMHg5NzY2OiAweDVFQjgsXG4gICAgMHg5NzY3OiAweDYzREEsXG4gICAgMHg5NzY4OiAweDYzRkEsXG4gICAgMHg5NzY5OiAweDY0QzEsXG4gICAgMHg5NzZBOiAweDY2REMsXG4gICAgMHg5NzZCOiAweDY5NEEsXG4gICAgMHg5NzZDOiAweDY5RDgsXG4gICAgMHg5NzZEOiAweDZEMEIsXG4gICAgMHg5NzZFOiAweDZFQjYsXG4gICAgMHg5NzZGOiAweDcxOTQsXG4gICAgMHg5NzcwOiAweDc1MjgsXG4gICAgMHg5NzcxOiAweDdBQUYsXG4gICAgMHg5NzcyOiAweDdGOEEsXG4gICAgMHg5NzczOiAweDgwMDAsXG4gICAgMHg5Nzc0OiAweDg0NDksXG4gICAgMHg5Nzc1OiAweDg0QzksXG4gICAgMHg5Nzc2OiAweDg5ODEsXG4gICAgMHg5Nzc3OiAweDhCMjEsXG4gICAgMHg5Nzc4OiAweDhFMEEsXG4gICAgMHg5Nzc5OiAweDkwNjUsXG4gICAgMHg5NzdBOiAweDk2N0QsXG4gICAgMHg5NzdCOiAweDk5MEEsXG4gICAgMHg5NzdDOiAweDYxN0UsXG4gICAgMHg5NzdEOiAweDYyOTEsXG4gICAgMHg5NzdFOiAweDZCMzIsXG4gICAgMHg5NzgwOiAweDZDODMsXG4gICAgMHg5NzgxOiAweDZENzQsXG4gICAgMHg5NzgyOiAweDdGQ0MsXG4gICAgMHg5NzgzOiAweDdGRkMsXG4gICAgMHg5Nzg0OiAweDZEQzAsXG4gICAgMHg5Nzg1OiAweDdGODUsXG4gICAgMHg5Nzg2OiAweDg3QkEsXG4gICAgMHg5Nzg3OiAweDg4RjgsXG4gICAgMHg5Nzg4OiAweDY3NjUsXG4gICAgMHg5Nzg5OiAweDgzQjEsXG4gICAgMHg5NzhBOiAweDk4M0MsXG4gICAgMHg5NzhCOiAweDk2RjcsXG4gICAgMHg5NzhDOiAweDZEMUIsXG4gICAgMHg5NzhEOiAweDdENjEsXG4gICAgMHg5NzhFOiAweDg0M0QsXG4gICAgMHg5NzhGOiAweDkxNkEsXG4gICAgMHg5NzkwOiAweDRFNzEsXG4gICAgMHg5NzkxOiAweDUzNzUsXG4gICAgMHg5NzkyOiAweDVENTAsXG4gICAgMHg5NzkzOiAweDZCMDQsXG4gICAgMHg5Nzk0OiAweDZGRUIsXG4gICAgMHg5Nzk1OiAweDg1Q0QsXG4gICAgMHg5Nzk2OiAweDg2MkQsXG4gICAgMHg5Nzk3OiAweDg5QTcsXG4gICAgMHg5Nzk4OiAweDUyMjksXG4gICAgMHg5Nzk5OiAweDU0MEYsXG4gICAgMHg5NzlBOiAweDVDNjUsXG4gICAgMHg5NzlCOiAweDY3NEUsXG4gICAgMHg5NzlDOiAweDY4QTgsXG4gICAgMHg5NzlEOiAweDc0MDYsXG4gICAgMHg5NzlFOiAweDc0ODMsXG4gICAgMHg5NzlGOiAweDc1RTIsXG4gICAgMHg5N0EwOiAweDg4Q0YsXG4gICAgMHg5N0ExOiAweDg4RTEsXG4gICAgMHg5N0EyOiAweDkxQ0MsXG4gICAgMHg5N0EzOiAweDk2RTIsXG4gICAgMHg5N0E0OiAweDk2NzgsXG4gICAgMHg5N0E1OiAweDVGOEIsXG4gICAgMHg5N0E2OiAweDczODcsXG4gICAgMHg5N0E3OiAweDdBQ0IsXG4gICAgMHg5N0E4OiAweDg0NEUsXG4gICAgMHg5N0E5OiAweDYzQTAsXG4gICAgMHg5N0FBOiAweDc1NjUsXG4gICAgMHg5N0FCOiAweDUyODksXG4gICAgMHg5N0FDOiAweDZENDEsXG4gICAgMHg5N0FEOiAweDZFOUMsXG4gICAgMHg5N0FFOiAweDc0MDksXG4gICAgMHg5N0FGOiAweDc1NTksXG4gICAgMHg5N0IwOiAweDc4NkIsXG4gICAgMHg5N0IxOiAweDdDOTIsXG4gICAgMHg5N0IyOiAweDk2ODYsXG4gICAgMHg5N0IzOiAweDdBREMsXG4gICAgMHg5N0I0OiAweDlGOEQsXG4gICAgMHg5N0I1OiAweDRGQjYsXG4gICAgMHg5N0I2OiAweDYxNkUsXG4gICAgMHg5N0I3OiAweDY1QzUsXG4gICAgMHg5N0I4OiAweDg2NUMsXG4gICAgMHg5N0I5OiAweDRFODYsXG4gICAgMHg5N0JBOiAweDRFQUUsXG4gICAgMHg5N0JCOiAweDUwREEsXG4gICAgMHg5N0JDOiAweDRFMjEsXG4gICAgMHg5N0JEOiAweDUxQ0MsXG4gICAgMHg5N0JFOiAweDVCRUUsXG4gICAgMHg5N0JGOiAweDY1OTksXG4gICAgMHg5N0MwOiAweDY4ODEsXG4gICAgMHg5N0MxOiAweDZEQkMsXG4gICAgMHg5N0MyOiAweDczMUYsXG4gICAgMHg5N0MzOiAweDc2NDIsXG4gICAgMHg5N0M0OiAweDc3QUQsXG4gICAgMHg5N0M1OiAweDdBMUMsXG4gICAgMHg5N0M2OiAweDdDRTcsXG4gICAgMHg5N0M3OiAweDgyNkYsXG4gICAgMHg5N0M4OiAweDhBRDIsXG4gICAgMHg5N0M5OiAweDkwN0MsXG4gICAgMHg5N0NBOiAweDkxQ0YsXG4gICAgMHg5N0NCOiAweDk2NzUsXG4gICAgMHg5N0NDOiAweDk4MTgsXG4gICAgMHg5N0NEOiAweDUyOUIsXG4gICAgMHg5N0NFOiAweDdERDEsXG4gICAgMHg5N0NGOiAweDUwMkIsXG4gICAgMHg5N0QwOiAweDUzOTgsXG4gICAgMHg5N0QxOiAweDY3OTcsXG4gICAgMHg5N0QyOiAweDZEQ0IsXG4gICAgMHg5N0QzOiAweDcxRDAsXG4gICAgMHg5N0Q0OiAweDc0MzMsXG4gICAgMHg5N0Q1OiAweDgxRTgsXG4gICAgMHg5N0Q2OiAweDhGMkEsXG4gICAgMHg5N0Q3OiAweDk2QTMsXG4gICAgMHg5N0Q4OiAweDlDNTcsXG4gICAgMHg5N0Q5OiAweDlFOUYsXG4gICAgMHg5N0RBOiAweDc0NjAsXG4gICAgMHg5N0RCOiAweDU4NDEsXG4gICAgMHg5N0RDOiAweDZEOTksXG4gICAgMHg5N0REOiAweDdEMkYsXG4gICAgMHg5N0RFOiAweDk4NUUsXG4gICAgMHg5N0RGOiAweDRFRTQsXG4gICAgMHg5N0UwOiAweDRGMzYsXG4gICAgMHg5N0UxOiAweDRGOEIsXG4gICAgMHg5N0UyOiAweDUxQjcsXG4gICAgMHg5N0UzOiAweDUyQjEsXG4gICAgMHg5N0U0OiAweDVEQkEsXG4gICAgMHg5N0U1OiAweDYwMUMsXG4gICAgMHg5N0U2OiAweDczQjIsXG4gICAgMHg5N0U3OiAweDc5M0MsXG4gICAgMHg5N0U4OiAweDgyRDMsXG4gICAgMHg5N0U5OiAweDkyMzQsXG4gICAgMHg5N0VBOiAweDk2QjcsXG4gICAgMHg5N0VCOiAweDk2RjYsXG4gICAgMHg5N0VDOiAweDk3MEEsXG4gICAgMHg5N0VEOiAweDlFOTcsXG4gICAgMHg5N0VFOiAweDlGNjIsXG4gICAgMHg5N0VGOiAweDY2QTYsXG4gICAgMHg5N0YwOiAweDZCNzQsXG4gICAgMHg5N0YxOiAweDUyMTcsXG4gICAgMHg5N0YyOiAweDUyQTMsXG4gICAgMHg5N0YzOiAweDcwQzgsXG4gICAgMHg5N0Y0OiAweDg4QzIsXG4gICAgMHg5N0Y1OiAweDVFQzksXG4gICAgMHg5N0Y2OiAweDYwNEIsXG4gICAgMHg5N0Y3OiAweDYxOTAsXG4gICAgMHg5N0Y4OiAweDZGMjMsXG4gICAgMHg5N0Y5OiAweDcxNDksXG4gICAgMHg5N0ZBOiAweDdDM0UsXG4gICAgMHg5N0ZCOiAweDdERjQsXG4gICAgMHg5N0ZDOiAweDgwNkYsXG4gICAgMHg5ODQwOiAweDg0RUUsXG4gICAgMHg5ODQxOiAweDkwMjMsXG4gICAgMHg5ODQyOiAweDkzMkMsXG4gICAgMHg5ODQzOiAweDU0NDIsXG4gICAgMHg5ODQ0OiAweDlCNkYsXG4gICAgMHg5ODQ1OiAweDZBRDMsXG4gICAgMHg5ODQ2OiAweDcwODksXG4gICAgMHg5ODQ3OiAweDhDQzIsXG4gICAgMHg5ODQ4OiAweDhERUYsXG4gICAgMHg5ODQ5OiAweDk3MzIsXG4gICAgMHg5ODRBOiAweDUyQjQsXG4gICAgMHg5ODRCOiAweDVBNDEsXG4gICAgMHg5ODRDOiAweDVFQ0EsXG4gICAgMHg5ODREOiAweDVGMDQsXG4gICAgMHg5ODRFOiAweDY3MTcsXG4gICAgMHg5ODRGOiAweDY5N0MsXG4gICAgMHg5ODUwOiAweDY5OTQsXG4gICAgMHg5ODUxOiAweDZENkEsXG4gICAgMHg5ODUyOiAweDZGMEYsXG4gICAgMHg5ODUzOiAweDcyNjIsXG4gICAgMHg5ODU0OiAweDcyRkMsXG4gICAgMHg5ODU1OiAweDdCRUQsXG4gICAgMHg5ODU2OiAweDgwMDEsXG4gICAgMHg5ODU3OiAweDgwN0UsXG4gICAgMHg5ODU4OiAweDg3NEIsXG4gICAgMHg5ODU5OiAweDkwQ0UsXG4gICAgMHg5ODVBOiAweDUxNkQsXG4gICAgMHg5ODVCOiAweDlFOTMsXG4gICAgMHg5ODVDOiAweDc5ODQsXG4gICAgMHg5ODVEOiAweDgwOEIsXG4gICAgMHg5ODVFOiAweDkzMzIsXG4gICAgMHg5ODVGOiAweDhBRDYsXG4gICAgMHg5ODYwOiAweDUwMkQsXG4gICAgMHg5ODYxOiAweDU0OEMsXG4gICAgMHg5ODYyOiAweDhBNzEsXG4gICAgMHg5ODYzOiAweDZCNkEsXG4gICAgMHg5ODY0OiAweDhDQzQsXG4gICAgMHg5ODY1OiAweDgxMDcsXG4gICAgMHg5ODY2OiAweDYwRDEsXG4gICAgMHg5ODY3OiAweDY3QTAsXG4gICAgMHg5ODY4OiAweDlERjIsXG4gICAgMHg5ODY5OiAweDRFOTksXG4gICAgMHg5ODZBOiAweDRFOTgsXG4gICAgMHg5ODZCOiAweDlDMTAsXG4gICAgMHg5ODZDOiAweDhBNkIsXG4gICAgMHg5ODZEOiAweDg1QzEsXG4gICAgMHg5ODZFOiAweDg1NjgsXG4gICAgMHg5ODZGOiAweDY5MDAsXG4gICAgMHg5ODcwOiAweDZFN0UsXG4gICAgMHg5ODcxOiAweDc4OTcsXG4gICAgMHg5ODcyOiAweDgxNTUsXG4gICAgMHg5ODlGOiAweDVGMEMsXG4gICAgMHg5OEEwOiAweDRFMTAsXG4gICAgMHg5OEExOiAweDRFMTUsXG4gICAgMHg5OEEyOiAweDRFMkEsXG4gICAgMHg5OEEzOiAweDRFMzEsXG4gICAgMHg5OEE0OiAweDRFMzYsXG4gICAgMHg5OEE1OiAweDRFM0MsXG4gICAgMHg5OEE2OiAweDRFM0YsXG4gICAgMHg5OEE3OiAweDRFNDIsXG4gICAgMHg5OEE4OiAweDRFNTYsXG4gICAgMHg5OEE5OiAweDRFNTgsXG4gICAgMHg5OEFBOiAweDRFODIsXG4gICAgMHg5OEFCOiAweDRFODUsXG4gICAgMHg5OEFDOiAweDhDNkIsXG4gICAgMHg5OEFEOiAweDRFOEEsXG4gICAgMHg5OEFFOiAweDgyMTIsXG4gICAgMHg5OEFGOiAweDVGMEQsXG4gICAgMHg5OEIwOiAweDRFOEUsXG4gICAgMHg5OEIxOiAweDRFOUUsXG4gICAgMHg5OEIyOiAweDRFOUYsXG4gICAgMHg5OEIzOiAweDRFQTAsXG4gICAgMHg5OEI0OiAweDRFQTIsXG4gICAgMHg5OEI1OiAweDRFQjAsXG4gICAgMHg5OEI2OiAweDRFQjMsXG4gICAgMHg5OEI3OiAweDRFQjYsXG4gICAgMHg5OEI4OiAweDRFQ0UsXG4gICAgMHg5OEI5OiAweDRFQ0QsXG4gICAgMHg5OEJBOiAweDRFQzQsXG4gICAgMHg5OEJCOiAweDRFQzYsXG4gICAgMHg5OEJDOiAweDRFQzIsXG4gICAgMHg5OEJEOiAweDRFRDcsXG4gICAgMHg5OEJFOiAweDRFREUsXG4gICAgMHg5OEJGOiAweDRFRUQsXG4gICAgMHg5OEMwOiAweDRFREYsXG4gICAgMHg5OEMxOiAweDRFRjcsXG4gICAgMHg5OEMyOiAweDRGMDksXG4gICAgMHg5OEMzOiAweDRGNUEsXG4gICAgMHg5OEM0OiAweDRGMzAsXG4gICAgMHg5OEM1OiAweDRGNUIsXG4gICAgMHg5OEM2OiAweDRGNUQsXG4gICAgMHg5OEM3OiAweDRGNTcsXG4gICAgMHg5OEM4OiAweDRGNDcsXG4gICAgMHg5OEM5OiAweDRGNzYsXG4gICAgMHg5OENBOiAweDRGODgsXG4gICAgMHg5OENCOiAweDRGOEYsXG4gICAgMHg5OENDOiAweDRGOTgsXG4gICAgMHg5OENEOiAweDRGN0IsXG4gICAgMHg5OENFOiAweDRGNjksXG4gICAgMHg5OENGOiAweDRGNzAsXG4gICAgMHg5OEQwOiAweDRGOTEsXG4gICAgMHg5OEQxOiAweDRGNkYsXG4gICAgMHg5OEQyOiAweDRGODYsXG4gICAgMHg5OEQzOiAweDRGOTYsXG4gICAgMHg5OEQ0OiAweDUxMTgsXG4gICAgMHg5OEQ1OiAweDRGRDQsXG4gICAgMHg5OEQ2OiAweDRGREYsXG4gICAgMHg5OEQ3OiAweDRGQ0UsXG4gICAgMHg5OEQ4OiAweDRGRDgsXG4gICAgMHg5OEQ5OiAweDRGREIsXG4gICAgMHg5OERBOiAweDRGRDEsXG4gICAgMHg5OERCOiAweDRGREEsXG4gICAgMHg5OERDOiAweDRGRDAsXG4gICAgMHg5OEREOiAweDRGRTQsXG4gICAgMHg5OERFOiAweDRGRTUsXG4gICAgMHg5OERGOiAweDUwMUEsXG4gICAgMHg5OEUwOiAweDUwMjgsXG4gICAgMHg5OEUxOiAweDUwMTQsXG4gICAgMHg5OEUyOiAweDUwMkEsXG4gICAgMHg5OEUzOiAweDUwMjUsXG4gICAgMHg5OEU0OiAweDUwMDUsXG4gICAgMHg5OEU1OiAweDRGMUMsXG4gICAgMHg5OEU2OiAweDRGRjYsXG4gICAgMHg5OEU3OiAweDUwMjEsXG4gICAgMHg5OEU4OiAweDUwMjksXG4gICAgMHg5OEU5OiAweDUwMkMsXG4gICAgMHg5OEVBOiAweDRGRkUsXG4gICAgMHg5OEVCOiAweDRGRUYsXG4gICAgMHg5OEVDOiAweDUwMTEsXG4gICAgMHg5OEVEOiAweDUwMDYsXG4gICAgMHg5OEVFOiAweDUwNDMsXG4gICAgMHg5OEVGOiAweDUwNDcsXG4gICAgMHg5OEYwOiAweDY3MDMsXG4gICAgMHg5OEYxOiAweDUwNTUsXG4gICAgMHg5OEYyOiAweDUwNTAsXG4gICAgMHg5OEYzOiAweDUwNDgsXG4gICAgMHg5OEY0OiAweDUwNUEsXG4gICAgMHg5OEY1OiAweDUwNTYsXG4gICAgMHg5OEY2OiAweDUwNkMsXG4gICAgMHg5OEY3OiAweDUwNzgsXG4gICAgMHg5OEY4OiAweDUwODAsXG4gICAgMHg5OEY5OiAweDUwOUEsXG4gICAgMHg5OEZBOiAweDUwODUsXG4gICAgMHg5OEZCOiAweDUwQjQsXG4gICAgMHg5OEZDOiAweDUwQjIsXG4gICAgMHg5OTQwOiAweDUwQzksXG4gICAgMHg5OTQxOiAweDUwQ0EsXG4gICAgMHg5OTQyOiAweDUwQjMsXG4gICAgMHg5OTQzOiAweDUwQzIsXG4gICAgMHg5OTQ0OiAweDUwRDYsXG4gICAgMHg5OTQ1OiAweDUwREUsXG4gICAgMHg5OTQ2OiAweDUwRTUsXG4gICAgMHg5OTQ3OiAweDUwRUQsXG4gICAgMHg5OTQ4OiAweDUwRTMsXG4gICAgMHg5OTQ5OiAweDUwRUUsXG4gICAgMHg5OTRBOiAweDUwRjksXG4gICAgMHg5OTRCOiAweDUwRjUsXG4gICAgMHg5OTRDOiAweDUxMDksXG4gICAgMHg5OTREOiAweDUxMDEsXG4gICAgMHg5OTRFOiAweDUxMDIsXG4gICAgMHg5OTRGOiAweDUxMTYsXG4gICAgMHg5OTUwOiAweDUxMTUsXG4gICAgMHg5OTUxOiAweDUxMTQsXG4gICAgMHg5OTUyOiAweDUxMUEsXG4gICAgMHg5OTUzOiAweDUxMjEsXG4gICAgMHg5OTU0OiAweDUxM0EsXG4gICAgMHg5OTU1OiAweDUxMzcsXG4gICAgMHg5OTU2OiAweDUxM0MsXG4gICAgMHg5OTU3OiAweDUxM0IsXG4gICAgMHg5OTU4OiAweDUxM0YsXG4gICAgMHg5OTU5OiAweDUxNDAsXG4gICAgMHg5OTVBOiAweDUxNTIsXG4gICAgMHg5OTVCOiAweDUxNEMsXG4gICAgMHg5OTVDOiAweDUxNTQsXG4gICAgMHg5OTVEOiAweDUxNjIsXG4gICAgMHg5OTVFOiAweDdBRjgsXG4gICAgMHg5OTVGOiAweDUxNjksXG4gICAgMHg5OTYwOiAweDUxNkEsXG4gICAgMHg5OTYxOiAweDUxNkUsXG4gICAgMHg5OTYyOiAweDUxODAsXG4gICAgMHg5OTYzOiAweDUxODIsXG4gICAgMHg5OTY0OiAweDU2RDgsXG4gICAgMHg5OTY1OiAweDUxOEMsXG4gICAgMHg5OTY2OiAweDUxODksXG4gICAgMHg5OTY3OiAweDUxOEYsXG4gICAgMHg5OTY4OiAweDUxOTEsXG4gICAgMHg5OTY5OiAweDUxOTMsXG4gICAgMHg5OTZBOiAweDUxOTUsXG4gICAgMHg5OTZCOiAweDUxOTYsXG4gICAgMHg5OTZDOiAweDUxQTQsXG4gICAgMHg5OTZEOiAweDUxQTYsXG4gICAgMHg5OTZFOiAweDUxQTIsXG4gICAgMHg5OTZGOiAweDUxQTksXG4gICAgMHg5OTcwOiAweDUxQUEsXG4gICAgMHg5OTcxOiAweDUxQUIsXG4gICAgMHg5OTcyOiAweDUxQjMsXG4gICAgMHg5OTczOiAweDUxQjEsXG4gICAgMHg5OTc0OiAweDUxQjIsXG4gICAgMHg5OTc1OiAweDUxQjAsXG4gICAgMHg5OTc2OiAweDUxQjUsXG4gICAgMHg5OTc3OiAweDUxQkQsXG4gICAgMHg5OTc4OiAweDUxQzUsXG4gICAgMHg5OTc5OiAweDUxQzksXG4gICAgMHg5OTdBOiAweDUxREIsXG4gICAgMHg5OTdCOiAweDUxRTAsXG4gICAgMHg5OTdDOiAweDg2NTUsXG4gICAgMHg5OTdEOiAweDUxRTksXG4gICAgMHg5OTdFOiAweDUxRUQsXG4gICAgMHg5OTgwOiAweDUxRjAsXG4gICAgMHg5OTgxOiAweDUxRjUsXG4gICAgMHg5OTgyOiAweDUxRkUsXG4gICAgMHg5OTgzOiAweDUyMDQsXG4gICAgMHg5OTg0OiAweDUyMEIsXG4gICAgMHg5OTg1OiAweDUyMTQsXG4gICAgMHg5OTg2OiAweDUyMEUsXG4gICAgMHg5OTg3OiAweDUyMjcsXG4gICAgMHg5OTg4OiAweDUyMkEsXG4gICAgMHg5OTg5OiAweDUyMkUsXG4gICAgMHg5OThBOiAweDUyMzMsXG4gICAgMHg5OThCOiAweDUyMzksXG4gICAgMHg5OThDOiAweDUyNEYsXG4gICAgMHg5OThEOiAweDUyNDQsXG4gICAgMHg5OThFOiAweDUyNEIsXG4gICAgMHg5OThGOiAweDUyNEMsXG4gICAgMHg5OTkwOiAweDUyNUUsXG4gICAgMHg5OTkxOiAweDUyNTQsXG4gICAgMHg5OTkyOiAweDUyNkEsXG4gICAgMHg5OTkzOiAweDUyNzQsXG4gICAgMHg5OTk0OiAweDUyNjksXG4gICAgMHg5OTk1OiAweDUyNzMsXG4gICAgMHg5OTk2OiAweDUyN0YsXG4gICAgMHg5OTk3OiAweDUyN0QsXG4gICAgMHg5OTk4OiAweDUyOEQsXG4gICAgMHg5OTk5OiAweDUyOTQsXG4gICAgMHg5OTlBOiAweDUyOTIsXG4gICAgMHg5OTlCOiAweDUyNzEsXG4gICAgMHg5OTlDOiAweDUyODgsXG4gICAgMHg5OTlEOiAweDUyOTEsXG4gICAgMHg5OTlFOiAweDhGQTgsXG4gICAgMHg5OTlGOiAweDhGQTcsXG4gICAgMHg5OUEwOiAweDUyQUMsXG4gICAgMHg5OUExOiAweDUyQUQsXG4gICAgMHg5OUEyOiAweDUyQkMsXG4gICAgMHg5OUEzOiAweDUyQjUsXG4gICAgMHg5OUE0OiAweDUyQzEsXG4gICAgMHg5OUE1OiAweDUyQ0QsXG4gICAgMHg5OUE2OiAweDUyRDcsXG4gICAgMHg5OUE3OiAweDUyREUsXG4gICAgMHg5OUE4OiAweDUyRTMsXG4gICAgMHg5OUE5OiAweDUyRTYsXG4gICAgMHg5OUFBOiAweDk4RUQsXG4gICAgMHg5OUFCOiAweDUyRTAsXG4gICAgMHg5OUFDOiAweDUyRjMsXG4gICAgMHg5OUFEOiAweDUyRjUsXG4gICAgMHg5OUFFOiAweDUyRjgsXG4gICAgMHg5OUFGOiAweDUyRjksXG4gICAgMHg5OUIwOiAweDUzMDYsXG4gICAgMHg5OUIxOiAweDUzMDgsXG4gICAgMHg5OUIyOiAweDc1MzgsXG4gICAgMHg5OUIzOiAweDUzMEQsXG4gICAgMHg5OUI0OiAweDUzMTAsXG4gICAgMHg5OUI1OiAweDUzMEYsXG4gICAgMHg5OUI2OiAweDUzMTUsXG4gICAgMHg5OUI3OiAweDUzMUEsXG4gICAgMHg5OUI4OiAweDUzMjMsXG4gICAgMHg5OUI5OiAweDUzMkYsXG4gICAgMHg5OUJBOiAweDUzMzEsXG4gICAgMHg5OUJCOiAweDUzMzMsXG4gICAgMHg5OUJDOiAweDUzMzgsXG4gICAgMHg5OUJEOiAweDUzNDAsXG4gICAgMHg5OUJFOiAweDUzNDYsXG4gICAgMHg5OUJGOiAweDUzNDUsXG4gICAgMHg5OUMwOiAweDRFMTcsXG4gICAgMHg5OUMxOiAweDUzNDksXG4gICAgMHg5OUMyOiAweDUzNEQsXG4gICAgMHg5OUMzOiAweDUxRDYsXG4gICAgMHg5OUM0OiAweDUzNUUsXG4gICAgMHg5OUM1OiAweDUzNjksXG4gICAgMHg5OUM2OiAweDUzNkUsXG4gICAgMHg5OUM3OiAweDU5MTgsXG4gICAgMHg5OUM4OiAweDUzN0IsXG4gICAgMHg5OUM5OiAweDUzNzcsXG4gICAgMHg5OUNBOiAweDUzODIsXG4gICAgMHg5OUNCOiAweDUzOTYsXG4gICAgMHg5OUNDOiAweDUzQTAsXG4gICAgMHg5OUNEOiAweDUzQTYsXG4gICAgMHg5OUNFOiAweDUzQTUsXG4gICAgMHg5OUNGOiAweDUzQUUsXG4gICAgMHg5OUQwOiAweDUzQjAsXG4gICAgMHg5OUQxOiAweDUzQjYsXG4gICAgMHg5OUQyOiAweDUzQzMsXG4gICAgMHg5OUQzOiAweDdDMTIsXG4gICAgMHg5OUQ0OiAweDk2RDksXG4gICAgMHg5OUQ1OiAweDUzREYsXG4gICAgMHg5OUQ2OiAweDY2RkMsXG4gICAgMHg5OUQ3OiAweDcxRUUsXG4gICAgMHg5OUQ4OiAweDUzRUUsXG4gICAgMHg5OUQ5OiAweDUzRTgsXG4gICAgMHg5OURBOiAweDUzRUQsXG4gICAgMHg5OURCOiAweDUzRkEsXG4gICAgMHg5OURDOiAweDU0MDEsXG4gICAgMHg5OUREOiAweDU0M0QsXG4gICAgMHg5OURFOiAweDU0NDAsXG4gICAgMHg5OURGOiAweDU0MkMsXG4gICAgMHg5OUUwOiAweDU0MkQsXG4gICAgMHg5OUUxOiAweDU0M0MsXG4gICAgMHg5OUUyOiAweDU0MkUsXG4gICAgMHg5OUUzOiAweDU0MzYsXG4gICAgMHg5OUU0OiAweDU0MjksXG4gICAgMHg5OUU1OiAweDU0MUQsXG4gICAgMHg5OUU2OiAweDU0NEUsXG4gICAgMHg5OUU3OiAweDU0OEYsXG4gICAgMHg5OUU4OiAweDU0NzUsXG4gICAgMHg5OUU5OiAweDU0OEUsXG4gICAgMHg5OUVBOiAweDU0NUYsXG4gICAgMHg5OUVCOiAweDU0NzEsXG4gICAgMHg5OUVDOiAweDU0NzcsXG4gICAgMHg5OUVEOiAweDU0NzAsXG4gICAgMHg5OUVFOiAweDU0OTIsXG4gICAgMHg5OUVGOiAweDU0N0IsXG4gICAgMHg5OUYwOiAweDU0ODAsXG4gICAgMHg5OUYxOiAweDU0NzYsXG4gICAgMHg5OUYyOiAweDU0ODQsXG4gICAgMHg5OUYzOiAweDU0OTAsXG4gICAgMHg5OUY0OiAweDU0ODYsXG4gICAgMHg5OUY1OiAweDU0QzcsXG4gICAgMHg5OUY2OiAweDU0QTIsXG4gICAgMHg5OUY3OiAweDU0QjgsXG4gICAgMHg5OUY4OiAweDU0QTUsXG4gICAgMHg5OUY5OiAweDU0QUMsXG4gICAgMHg5OUZBOiAweDU0QzQsXG4gICAgMHg5OUZCOiAweDU0QzgsXG4gICAgMHg5OUZDOiAweDU0QTgsXG4gICAgMHg5QTQwOiAweDU0QUIsXG4gICAgMHg5QTQxOiAweDU0QzIsXG4gICAgMHg5QTQyOiAweDU0QTQsXG4gICAgMHg5QTQzOiAweDU0QkUsXG4gICAgMHg5QTQ0OiAweDU0QkMsXG4gICAgMHg5QTQ1OiAweDU0RDgsXG4gICAgMHg5QTQ2OiAweDU0RTUsXG4gICAgMHg5QTQ3OiAweDU0RTYsXG4gICAgMHg5QTQ4OiAweDU1MEYsXG4gICAgMHg5QTQ5OiAweDU1MTQsXG4gICAgMHg5QTRBOiAweDU0RkQsXG4gICAgMHg5QTRCOiAweDU0RUUsXG4gICAgMHg5QTRDOiAweDU0RUQsXG4gICAgMHg5QTREOiAweDU0RkEsXG4gICAgMHg5QTRFOiAweDU0RTIsXG4gICAgMHg5QTRGOiAweDU1MzksXG4gICAgMHg5QTUwOiAweDU1NDAsXG4gICAgMHg5QTUxOiAweDU1NjMsXG4gICAgMHg5QTUyOiAweDU1NEMsXG4gICAgMHg5QTUzOiAweDU1MkUsXG4gICAgMHg5QTU0OiAweDU1NUMsXG4gICAgMHg5QTU1OiAweDU1NDUsXG4gICAgMHg5QTU2OiAweDU1NTYsXG4gICAgMHg5QTU3OiAweDU1NTcsXG4gICAgMHg5QTU4OiAweDU1MzgsXG4gICAgMHg5QTU5OiAweDU1MzMsXG4gICAgMHg5QTVBOiAweDU1NUQsXG4gICAgMHg5QTVCOiAweDU1OTksXG4gICAgMHg5QTVDOiAweDU1ODAsXG4gICAgMHg5QTVEOiAweDU0QUYsXG4gICAgMHg5QTVFOiAweDU1OEEsXG4gICAgMHg5QTVGOiAweDU1OUYsXG4gICAgMHg5QTYwOiAweDU1N0IsXG4gICAgMHg5QTYxOiAweDU1N0UsXG4gICAgMHg5QTYyOiAweDU1OTgsXG4gICAgMHg5QTYzOiAweDU1OUUsXG4gICAgMHg5QTY0OiAweDU1QUUsXG4gICAgMHg5QTY1OiAweDU1N0MsXG4gICAgMHg5QTY2OiAweDU1ODMsXG4gICAgMHg5QTY3OiAweDU1QTksXG4gICAgMHg5QTY4OiAweDU1ODcsXG4gICAgMHg5QTY5OiAweDU1QTgsXG4gICAgMHg5QTZBOiAweDU1REEsXG4gICAgMHg5QTZCOiAweDU1QzUsXG4gICAgMHg5QTZDOiAweDU1REYsXG4gICAgMHg5QTZEOiAweDU1QzQsXG4gICAgMHg5QTZFOiAweDU1REMsXG4gICAgMHg5QTZGOiAweDU1RTQsXG4gICAgMHg5QTcwOiAweDU1RDQsXG4gICAgMHg5QTcxOiAweDU2MTQsXG4gICAgMHg5QTcyOiAweDU1RjcsXG4gICAgMHg5QTczOiAweDU2MTYsXG4gICAgMHg5QTc0OiAweDU1RkUsXG4gICAgMHg5QTc1OiAweDU1RkQsXG4gICAgMHg5QTc2OiAweDU2MUIsXG4gICAgMHg5QTc3OiAweDU1RjksXG4gICAgMHg5QTc4OiAweDU2NEUsXG4gICAgMHg5QTc5OiAweDU2NTAsXG4gICAgMHg5QTdBOiAweDcxREYsXG4gICAgMHg5QTdCOiAweDU2MzQsXG4gICAgMHg5QTdDOiAweDU2MzYsXG4gICAgMHg5QTdEOiAweDU2MzIsXG4gICAgMHg5QTdFOiAweDU2MzgsXG4gICAgMHg5QTgwOiAweDU2NkIsXG4gICAgMHg5QTgxOiAweDU2NjQsXG4gICAgMHg5QTgyOiAweDU2MkYsXG4gICAgMHg5QTgzOiAweDU2NkMsXG4gICAgMHg5QTg0OiAweDU2NkEsXG4gICAgMHg5QTg1OiAweDU2ODYsXG4gICAgMHg5QTg2OiAweDU2ODAsXG4gICAgMHg5QTg3OiAweDU2OEEsXG4gICAgMHg5QTg4OiAweDU2QTAsXG4gICAgMHg5QTg5OiAweDU2OTQsXG4gICAgMHg5QThBOiAweDU2OEYsXG4gICAgMHg5QThCOiAweDU2QTUsXG4gICAgMHg5QThDOiAweDU2QUUsXG4gICAgMHg5QThEOiAweDU2QjYsXG4gICAgMHg5QThFOiAweDU2QjQsXG4gICAgMHg5QThGOiAweDU2QzIsXG4gICAgMHg5QTkwOiAweDU2QkMsXG4gICAgMHg5QTkxOiAweDU2QzEsXG4gICAgMHg5QTkyOiAweDU2QzMsXG4gICAgMHg5QTkzOiAweDU2QzAsXG4gICAgMHg5QTk0OiAweDU2QzgsXG4gICAgMHg5QTk1OiAweDU2Q0UsXG4gICAgMHg5QTk2OiAweDU2RDEsXG4gICAgMHg5QTk3OiAweDU2RDMsXG4gICAgMHg5QTk4OiAweDU2RDcsXG4gICAgMHg5QTk5OiAweDU2RUUsXG4gICAgMHg5QTlBOiAweDU2RjksXG4gICAgMHg5QTlCOiAweDU3MDAsXG4gICAgMHg5QTlDOiAweDU2RkYsXG4gICAgMHg5QTlEOiAweDU3MDQsXG4gICAgMHg5QTlFOiAweDU3MDksXG4gICAgMHg5QTlGOiAweDU3MDgsXG4gICAgMHg5QUEwOiAweDU3MEIsXG4gICAgMHg5QUExOiAweDU3MEQsXG4gICAgMHg5QUEyOiAweDU3MTMsXG4gICAgMHg5QUEzOiAweDU3MTgsXG4gICAgMHg5QUE0OiAweDU3MTYsXG4gICAgMHg5QUE1OiAweDU1QzcsXG4gICAgMHg5QUE2OiAweDU3MUMsXG4gICAgMHg5QUE3OiAweDU3MjYsXG4gICAgMHg5QUE4OiAweDU3MzcsXG4gICAgMHg5QUE5OiAweDU3MzgsXG4gICAgMHg5QUFBOiAweDU3NEUsXG4gICAgMHg5QUFCOiAweDU3M0IsXG4gICAgMHg5QUFDOiAweDU3NDAsXG4gICAgMHg5QUFEOiAweDU3NEYsXG4gICAgMHg5QUFFOiAweDU3NjksXG4gICAgMHg5QUFGOiAweDU3QzAsXG4gICAgMHg5QUIwOiAweDU3ODgsXG4gICAgMHg5QUIxOiAweDU3NjEsXG4gICAgMHg5QUIyOiAweDU3N0YsXG4gICAgMHg5QUIzOiAweDU3ODksXG4gICAgMHg5QUI0OiAweDU3OTMsXG4gICAgMHg5QUI1OiAweDU3QTAsXG4gICAgMHg5QUI2OiAweDU3QjMsXG4gICAgMHg5QUI3OiAweDU3QTQsXG4gICAgMHg5QUI4OiAweDU3QUEsXG4gICAgMHg5QUI5OiAweDU3QjAsXG4gICAgMHg5QUJBOiAweDU3QzMsXG4gICAgMHg5QUJCOiAweDU3QzYsXG4gICAgMHg5QUJDOiAweDU3RDQsXG4gICAgMHg5QUJEOiAweDU3RDIsXG4gICAgMHg5QUJFOiAweDU3RDMsXG4gICAgMHg5QUJGOiAweDU4MEEsXG4gICAgMHg5QUMwOiAweDU3RDYsXG4gICAgMHg5QUMxOiAweDU3RTMsXG4gICAgMHg5QUMyOiAweDU4MEIsXG4gICAgMHg5QUMzOiAweDU4MTksXG4gICAgMHg5QUM0OiAweDU4MUQsXG4gICAgMHg5QUM1OiAweDU4NzIsXG4gICAgMHg5QUM2OiAweDU4MjEsXG4gICAgMHg5QUM3OiAweDU4NjIsXG4gICAgMHg5QUM4OiAweDU4NEIsXG4gICAgMHg5QUM5OiAweDU4NzAsXG4gICAgMHg5QUNBOiAweDZCQzAsXG4gICAgMHg5QUNCOiAweDU4NTIsXG4gICAgMHg5QUNDOiAweDU4M0QsXG4gICAgMHg5QUNEOiAweDU4NzksXG4gICAgMHg5QUNFOiAweDU4ODUsXG4gICAgMHg5QUNGOiAweDU4QjksXG4gICAgMHg5QUQwOiAweDU4OUYsXG4gICAgMHg5QUQxOiAweDU4QUIsXG4gICAgMHg5QUQyOiAweDU4QkEsXG4gICAgMHg5QUQzOiAweDU4REUsXG4gICAgMHg5QUQ0OiAweDU4QkIsXG4gICAgMHg5QUQ1OiAweDU4QjgsXG4gICAgMHg5QUQ2OiAweDU4QUUsXG4gICAgMHg5QUQ3OiAweDU4QzUsXG4gICAgMHg5QUQ4OiAweDU4RDMsXG4gICAgMHg5QUQ5OiAweDU4RDEsXG4gICAgMHg5QURBOiAweDU4RDcsXG4gICAgMHg5QURCOiAweDU4RDksXG4gICAgMHg5QURDOiAweDU4RDgsXG4gICAgMHg5QUREOiAweDU4RTUsXG4gICAgMHg5QURFOiAweDU4REMsXG4gICAgMHg5QURGOiAweDU4RTQsXG4gICAgMHg5QUUwOiAweDU4REYsXG4gICAgMHg5QUUxOiAweDU4RUYsXG4gICAgMHg5QUUyOiAweDU4RkEsXG4gICAgMHg5QUUzOiAweDU4RjksXG4gICAgMHg5QUU0OiAweDU4RkIsXG4gICAgMHg5QUU1OiAweDU4RkMsXG4gICAgMHg5QUU2OiAweDU4RkQsXG4gICAgMHg5QUU3OiAweDU5MDIsXG4gICAgMHg5QUU4OiAweDU5MEEsXG4gICAgMHg5QUU5OiAweDU5MTAsXG4gICAgMHg5QUVBOiAweDU5MUIsXG4gICAgMHg5QUVCOiAweDY4QTYsXG4gICAgMHg5QUVDOiAweDU5MjUsXG4gICAgMHg5QUVEOiAweDU5MkMsXG4gICAgMHg5QUVFOiAweDU5MkQsXG4gICAgMHg5QUVGOiAweDU5MzIsXG4gICAgMHg5QUYwOiAweDU5MzgsXG4gICAgMHg5QUYxOiAweDU5M0UsXG4gICAgMHg5QUYyOiAweDdBRDIsXG4gICAgMHg5QUYzOiAweDU5NTUsXG4gICAgMHg5QUY0OiAweDU5NTAsXG4gICAgMHg5QUY1OiAweDU5NEUsXG4gICAgMHg5QUY2OiAweDU5NUEsXG4gICAgMHg5QUY3OiAweDU5NTgsXG4gICAgMHg5QUY4OiAweDU5NjIsXG4gICAgMHg5QUY5OiAweDU5NjAsXG4gICAgMHg5QUZBOiAweDU5NjcsXG4gICAgMHg5QUZCOiAweDU5NkMsXG4gICAgMHg5QUZDOiAweDU5NjksXG4gICAgMHg5QjQwOiAweDU5NzgsXG4gICAgMHg5QjQxOiAweDU5ODEsXG4gICAgMHg5QjQyOiAweDU5OUQsXG4gICAgMHg5QjQzOiAweDRGNUUsXG4gICAgMHg5QjQ0OiAweDRGQUIsXG4gICAgMHg5QjQ1OiAweDU5QTMsXG4gICAgMHg5QjQ2OiAweDU5QjIsXG4gICAgMHg5QjQ3OiAweDU5QzYsXG4gICAgMHg5QjQ4OiAweDU5RTgsXG4gICAgMHg5QjQ5OiAweDU5REMsXG4gICAgMHg5QjRBOiAweDU5OEQsXG4gICAgMHg5QjRCOiAweDU5RDksXG4gICAgMHg5QjRDOiAweDU5REEsXG4gICAgMHg5QjREOiAweDVBMjUsXG4gICAgMHg5QjRFOiAweDVBMUYsXG4gICAgMHg5QjRGOiAweDVBMTEsXG4gICAgMHg5QjUwOiAweDVBMUMsXG4gICAgMHg5QjUxOiAweDVBMDksXG4gICAgMHg5QjUyOiAweDVBMUEsXG4gICAgMHg5QjUzOiAweDVBNDAsXG4gICAgMHg5QjU0OiAweDVBNkMsXG4gICAgMHg5QjU1OiAweDVBNDksXG4gICAgMHg5QjU2OiAweDVBMzUsXG4gICAgMHg5QjU3OiAweDVBMzYsXG4gICAgMHg5QjU4OiAweDVBNjIsXG4gICAgMHg5QjU5OiAweDVBNkEsXG4gICAgMHg5QjVBOiAweDVBOUEsXG4gICAgMHg5QjVCOiAweDVBQkMsXG4gICAgMHg5QjVDOiAweDVBQkUsXG4gICAgMHg5QjVEOiAweDVBQ0IsXG4gICAgMHg5QjVFOiAweDVBQzIsXG4gICAgMHg5QjVGOiAweDVBQkQsXG4gICAgMHg5QjYwOiAweDVBRTMsXG4gICAgMHg5QjYxOiAweDVBRDcsXG4gICAgMHg5QjYyOiAweDVBRTYsXG4gICAgMHg5QjYzOiAweDVBRTksXG4gICAgMHg5QjY0OiAweDVBRDYsXG4gICAgMHg5QjY1OiAweDVBRkEsXG4gICAgMHg5QjY2OiAweDVBRkIsXG4gICAgMHg5QjY3OiAweDVCMEMsXG4gICAgMHg5QjY4OiAweDVCMEIsXG4gICAgMHg5QjY5OiAweDVCMTYsXG4gICAgMHg5QjZBOiAweDVCMzIsXG4gICAgMHg5QjZCOiAweDVBRDAsXG4gICAgMHg5QjZDOiAweDVCMkEsXG4gICAgMHg5QjZEOiAweDVCMzYsXG4gICAgMHg5QjZFOiAweDVCM0UsXG4gICAgMHg5QjZGOiAweDVCNDMsXG4gICAgMHg5QjcwOiAweDVCNDUsXG4gICAgMHg5QjcxOiAweDVCNDAsXG4gICAgMHg5QjcyOiAweDVCNTEsXG4gICAgMHg5QjczOiAweDVCNTUsXG4gICAgMHg5Qjc0OiAweDVCNUEsXG4gICAgMHg5Qjc1OiAweDVCNUIsXG4gICAgMHg5Qjc2OiAweDVCNjUsXG4gICAgMHg5Qjc3OiAweDVCNjksXG4gICAgMHg5Qjc4OiAweDVCNzAsXG4gICAgMHg5Qjc5OiAweDVCNzMsXG4gICAgMHg5QjdBOiAweDVCNzUsXG4gICAgMHg5QjdCOiAweDVCNzgsXG4gICAgMHg5QjdDOiAweDY1ODgsXG4gICAgMHg5QjdEOiAweDVCN0EsXG4gICAgMHg5QjdFOiAweDVCODAsXG4gICAgMHg5QjgwOiAweDVCODMsXG4gICAgMHg5QjgxOiAweDVCQTYsXG4gICAgMHg5QjgyOiAweDVCQjgsXG4gICAgMHg5QjgzOiAweDVCQzMsXG4gICAgMHg5Qjg0OiAweDVCQzcsXG4gICAgMHg5Qjg1OiAweDVCQzksXG4gICAgMHg5Qjg2OiAweDVCRDQsXG4gICAgMHg5Qjg3OiAweDVCRDAsXG4gICAgMHg5Qjg4OiAweDVCRTQsXG4gICAgMHg5Qjg5OiAweDVCRTYsXG4gICAgMHg5QjhBOiAweDVCRTIsXG4gICAgMHg5QjhCOiAweDVCREUsXG4gICAgMHg5QjhDOiAweDVCRTUsXG4gICAgMHg5QjhEOiAweDVCRUIsXG4gICAgMHg5QjhFOiAweDVCRjAsXG4gICAgMHg5QjhGOiAweDVCRjYsXG4gICAgMHg5QjkwOiAweDVCRjMsXG4gICAgMHg5QjkxOiAweDVDMDUsXG4gICAgMHg5QjkyOiAweDVDMDcsXG4gICAgMHg5QjkzOiAweDVDMDgsXG4gICAgMHg5Qjk0OiAweDVDMEQsXG4gICAgMHg5Qjk1OiAweDVDMTMsXG4gICAgMHg5Qjk2OiAweDVDMjAsXG4gICAgMHg5Qjk3OiAweDVDMjIsXG4gICAgMHg5Qjk4OiAweDVDMjgsXG4gICAgMHg5Qjk5OiAweDVDMzgsXG4gICAgMHg5QjlBOiAweDVDMzksXG4gICAgMHg5QjlCOiAweDVDNDEsXG4gICAgMHg5QjlDOiAweDVDNDYsXG4gICAgMHg5QjlEOiAweDVDNEUsXG4gICAgMHg5QjlFOiAweDVDNTMsXG4gICAgMHg5QjlGOiAweDVDNTAsXG4gICAgMHg5QkEwOiAweDVDNEYsXG4gICAgMHg5QkExOiAweDVCNzEsXG4gICAgMHg5QkEyOiAweDVDNkMsXG4gICAgMHg5QkEzOiAweDVDNkUsXG4gICAgMHg5QkE0OiAweDRFNjIsXG4gICAgMHg5QkE1OiAweDVDNzYsXG4gICAgMHg5QkE2OiAweDVDNzksXG4gICAgMHg5QkE3OiAweDVDOEMsXG4gICAgMHg5QkE4OiAweDVDOTEsXG4gICAgMHg5QkE5OiAweDVDOTQsXG4gICAgMHg5QkFBOiAweDU5OUIsXG4gICAgMHg5QkFCOiAweDVDQUIsXG4gICAgMHg5QkFDOiAweDVDQkIsXG4gICAgMHg5QkFEOiAweDVDQjYsXG4gICAgMHg5QkFFOiAweDVDQkMsXG4gICAgMHg5QkFGOiAweDVDQjcsXG4gICAgMHg5QkIwOiAweDVDQzUsXG4gICAgMHg5QkIxOiAweDVDQkUsXG4gICAgMHg5QkIyOiAweDVDQzcsXG4gICAgMHg5QkIzOiAweDVDRDksXG4gICAgMHg5QkI0OiAweDVDRTksXG4gICAgMHg5QkI1OiAweDVDRkQsXG4gICAgMHg5QkI2OiAweDVDRkEsXG4gICAgMHg5QkI3OiAweDVDRUQsXG4gICAgMHg5QkI4OiAweDVEOEMsXG4gICAgMHg5QkI5OiAweDVDRUEsXG4gICAgMHg5QkJBOiAweDVEMEIsXG4gICAgMHg5QkJCOiAweDVEMTUsXG4gICAgMHg5QkJDOiAweDVEMTcsXG4gICAgMHg5QkJEOiAweDVENUMsXG4gICAgMHg5QkJFOiAweDVEMUYsXG4gICAgMHg5QkJGOiAweDVEMUIsXG4gICAgMHg5QkMwOiAweDVEMTEsXG4gICAgMHg5QkMxOiAweDVEMTQsXG4gICAgMHg5QkMyOiAweDVEMjIsXG4gICAgMHg5QkMzOiAweDVEMUEsXG4gICAgMHg5QkM0OiAweDVEMTksXG4gICAgMHg5QkM1OiAweDVEMTgsXG4gICAgMHg5QkM2OiAweDVENEMsXG4gICAgMHg5QkM3OiAweDVENTIsXG4gICAgMHg5QkM4OiAweDVENEUsXG4gICAgMHg5QkM5OiAweDVENEIsXG4gICAgMHg5QkNBOiAweDVENkMsXG4gICAgMHg5QkNCOiAweDVENzMsXG4gICAgMHg5QkNDOiAweDVENzYsXG4gICAgMHg5QkNEOiAweDVEODcsXG4gICAgMHg5QkNFOiAweDVEODQsXG4gICAgMHg5QkNGOiAweDVEODIsXG4gICAgMHg5QkQwOiAweDVEQTIsXG4gICAgMHg5QkQxOiAweDVEOUQsXG4gICAgMHg5QkQyOiAweDVEQUMsXG4gICAgMHg5QkQzOiAweDVEQUUsXG4gICAgMHg5QkQ0OiAweDVEQkQsXG4gICAgMHg5QkQ1OiAweDVEOTAsXG4gICAgMHg5QkQ2OiAweDVEQjcsXG4gICAgMHg5QkQ3OiAweDVEQkMsXG4gICAgMHg5QkQ4OiAweDVEQzksXG4gICAgMHg5QkQ5OiAweDVEQ0QsXG4gICAgMHg5QkRBOiAweDVERDMsXG4gICAgMHg5QkRCOiAweDVERDIsXG4gICAgMHg5QkRDOiAweDVERDYsXG4gICAgMHg5QkREOiAweDVEREIsXG4gICAgMHg5QkRFOiAweDVERUIsXG4gICAgMHg5QkRGOiAweDVERjIsXG4gICAgMHg5QkUwOiAweDVERjUsXG4gICAgMHg5QkUxOiAweDVFMEIsXG4gICAgMHg5QkUyOiAweDVFMUEsXG4gICAgMHg5QkUzOiAweDVFMTksXG4gICAgMHg5QkU0OiAweDVFMTEsXG4gICAgMHg5QkU1OiAweDVFMUIsXG4gICAgMHg5QkU2OiAweDVFMzYsXG4gICAgMHg5QkU3OiAweDVFMzcsXG4gICAgMHg5QkU4OiAweDVFNDQsXG4gICAgMHg5QkU5OiAweDVFNDMsXG4gICAgMHg5QkVBOiAweDVFNDAsXG4gICAgMHg5QkVCOiAweDVFNEUsXG4gICAgMHg5QkVDOiAweDVFNTcsXG4gICAgMHg5QkVEOiAweDVFNTQsXG4gICAgMHg5QkVFOiAweDVFNUYsXG4gICAgMHg5QkVGOiAweDVFNjIsXG4gICAgMHg5QkYwOiAweDVFNjQsXG4gICAgMHg5QkYxOiAweDVFNDcsXG4gICAgMHg5QkYyOiAweDVFNzUsXG4gICAgMHg5QkYzOiAweDVFNzYsXG4gICAgMHg5QkY0OiAweDVFN0EsXG4gICAgMHg5QkY1OiAweDlFQkMsXG4gICAgMHg5QkY2OiAweDVFN0YsXG4gICAgMHg5QkY3OiAweDVFQTAsXG4gICAgMHg5QkY4OiAweDVFQzEsXG4gICAgMHg5QkY5OiAweDVFQzIsXG4gICAgMHg5QkZBOiAweDVFQzgsXG4gICAgMHg5QkZCOiAweDVFRDAsXG4gICAgMHg5QkZDOiAweDVFQ0YsXG4gICAgMHg5QzQwOiAweDVFRDYsXG4gICAgMHg5QzQxOiAweDVFRTMsXG4gICAgMHg5QzQyOiAweDVFREQsXG4gICAgMHg5QzQzOiAweDVFREEsXG4gICAgMHg5QzQ0OiAweDVFREIsXG4gICAgMHg5QzQ1OiAweDVFRTIsXG4gICAgMHg5QzQ2OiAweDVFRTEsXG4gICAgMHg5QzQ3OiAweDVFRTgsXG4gICAgMHg5QzQ4OiAweDVFRTksXG4gICAgMHg5QzQ5OiAweDVFRUMsXG4gICAgMHg5QzRBOiAweDVFRjEsXG4gICAgMHg5QzRCOiAweDVFRjMsXG4gICAgMHg5QzRDOiAweDVFRjAsXG4gICAgMHg5QzREOiAweDVFRjQsXG4gICAgMHg5QzRFOiAweDVFRjgsXG4gICAgMHg5QzRGOiAweDVFRkUsXG4gICAgMHg5QzUwOiAweDVGMDMsXG4gICAgMHg5QzUxOiAweDVGMDksXG4gICAgMHg5QzUyOiAweDVGNUQsXG4gICAgMHg5QzUzOiAweDVGNUMsXG4gICAgMHg5QzU0OiAweDVGMEIsXG4gICAgMHg5QzU1OiAweDVGMTEsXG4gICAgMHg5QzU2OiAweDVGMTYsXG4gICAgMHg5QzU3OiAweDVGMjksXG4gICAgMHg5QzU4OiAweDVGMkQsXG4gICAgMHg5QzU5OiAweDVGMzgsXG4gICAgMHg5QzVBOiAweDVGNDEsXG4gICAgMHg5QzVCOiAweDVGNDgsXG4gICAgMHg5QzVDOiAweDVGNEMsXG4gICAgMHg5QzVEOiAweDVGNEUsXG4gICAgMHg5QzVFOiAweDVGMkYsXG4gICAgMHg5QzVGOiAweDVGNTEsXG4gICAgMHg5QzYwOiAweDVGNTYsXG4gICAgMHg5QzYxOiAweDVGNTcsXG4gICAgMHg5QzYyOiAweDVGNTksXG4gICAgMHg5QzYzOiAweDVGNjEsXG4gICAgMHg5QzY0OiAweDVGNkQsXG4gICAgMHg5QzY1OiAweDVGNzMsXG4gICAgMHg5QzY2OiAweDVGNzcsXG4gICAgMHg5QzY3OiAweDVGODMsXG4gICAgMHg5QzY4OiAweDVGODIsXG4gICAgMHg5QzY5OiAweDVGN0YsXG4gICAgMHg5QzZBOiAweDVGOEEsXG4gICAgMHg5QzZCOiAweDVGODgsXG4gICAgMHg5QzZDOiAweDVGOTEsXG4gICAgMHg5QzZEOiAweDVGODcsXG4gICAgMHg5QzZFOiAweDVGOUUsXG4gICAgMHg5QzZGOiAweDVGOTksXG4gICAgMHg5QzcwOiAweDVGOTgsXG4gICAgMHg5QzcxOiAweDVGQTAsXG4gICAgMHg5QzcyOiAweDVGQTgsXG4gICAgMHg5QzczOiAweDVGQUQsXG4gICAgMHg5Qzc0OiAweDVGQkMsXG4gICAgMHg5Qzc1OiAweDVGRDYsXG4gICAgMHg5Qzc2OiAweDVGRkIsXG4gICAgMHg5Qzc3OiAweDVGRTQsXG4gICAgMHg5Qzc4OiAweDVGRjgsXG4gICAgMHg5Qzc5OiAweDVGRjEsXG4gICAgMHg5QzdBOiAweDVGREQsXG4gICAgMHg5QzdCOiAweDYwQjMsXG4gICAgMHg5QzdDOiAweDVGRkYsXG4gICAgMHg5QzdEOiAweDYwMjEsXG4gICAgMHg5QzdFOiAweDYwNjAsXG4gICAgMHg5QzgwOiAweDYwMTksXG4gICAgMHg5QzgxOiAweDYwMTAsXG4gICAgMHg5QzgyOiAweDYwMjksXG4gICAgMHg5QzgzOiAweDYwMEUsXG4gICAgMHg5Qzg0OiAweDYwMzEsXG4gICAgMHg5Qzg1OiAweDYwMUIsXG4gICAgMHg5Qzg2OiAweDYwMTUsXG4gICAgMHg5Qzg3OiAweDYwMkIsXG4gICAgMHg5Qzg4OiAweDYwMjYsXG4gICAgMHg5Qzg5OiAweDYwMEYsXG4gICAgMHg5QzhBOiAweDYwM0EsXG4gICAgMHg5QzhCOiAweDYwNUEsXG4gICAgMHg5QzhDOiAweDYwNDEsXG4gICAgMHg5QzhEOiAweDYwNkEsXG4gICAgMHg5QzhFOiAweDYwNzcsXG4gICAgMHg5QzhGOiAweDYwNUYsXG4gICAgMHg5QzkwOiAweDYwNEEsXG4gICAgMHg5QzkxOiAweDYwNDYsXG4gICAgMHg5QzkyOiAweDYwNEQsXG4gICAgMHg5QzkzOiAweDYwNjMsXG4gICAgMHg5Qzk0OiAweDYwNDMsXG4gICAgMHg5Qzk1OiAweDYwNjQsXG4gICAgMHg5Qzk2OiAweDYwNDIsXG4gICAgMHg5Qzk3OiAweDYwNkMsXG4gICAgMHg5Qzk4OiAweDYwNkIsXG4gICAgMHg5Qzk5OiAweDYwNTksXG4gICAgMHg5QzlBOiAweDYwODEsXG4gICAgMHg5QzlCOiAweDYwOEQsXG4gICAgMHg5QzlDOiAweDYwRTcsXG4gICAgMHg5QzlEOiAweDYwODMsXG4gICAgMHg5QzlFOiAweDYwOUEsXG4gICAgMHg5QzlGOiAweDYwODQsXG4gICAgMHg5Q0EwOiAweDYwOUIsXG4gICAgMHg5Q0ExOiAweDYwOTYsXG4gICAgMHg5Q0EyOiAweDYwOTcsXG4gICAgMHg5Q0EzOiAweDYwOTIsXG4gICAgMHg5Q0E0OiAweDYwQTcsXG4gICAgMHg5Q0E1OiAweDYwOEIsXG4gICAgMHg5Q0E2OiAweDYwRTEsXG4gICAgMHg5Q0E3OiAweDYwQjgsXG4gICAgMHg5Q0E4OiAweDYwRTAsXG4gICAgMHg5Q0E5OiAweDYwRDMsXG4gICAgMHg5Q0FBOiAweDYwQjQsXG4gICAgMHg5Q0FCOiAweDVGRjAsXG4gICAgMHg5Q0FDOiAweDYwQkQsXG4gICAgMHg5Q0FEOiAweDYwQzYsXG4gICAgMHg5Q0FFOiAweDYwQjUsXG4gICAgMHg5Q0FGOiAweDYwRDgsXG4gICAgMHg5Q0IwOiAweDYxNEQsXG4gICAgMHg5Q0IxOiAweDYxMTUsXG4gICAgMHg5Q0IyOiAweDYxMDYsXG4gICAgMHg5Q0IzOiAweDYwRjYsXG4gICAgMHg5Q0I0OiAweDYwRjcsXG4gICAgMHg5Q0I1OiAweDYxMDAsXG4gICAgMHg5Q0I2OiAweDYwRjQsXG4gICAgMHg5Q0I3OiAweDYwRkEsXG4gICAgMHg5Q0I4OiAweDYxMDMsXG4gICAgMHg5Q0I5OiAweDYxMjEsXG4gICAgMHg5Q0JBOiAweDYwRkIsXG4gICAgMHg5Q0JCOiAweDYwRjEsXG4gICAgMHg5Q0JDOiAweDYxMEQsXG4gICAgMHg5Q0JEOiAweDYxMEUsXG4gICAgMHg5Q0JFOiAweDYxNDcsXG4gICAgMHg5Q0JGOiAweDYxM0UsXG4gICAgMHg5Q0MwOiAweDYxMjgsXG4gICAgMHg5Q0MxOiAweDYxMjcsXG4gICAgMHg5Q0MyOiAweDYxNEEsXG4gICAgMHg5Q0MzOiAweDYxM0YsXG4gICAgMHg5Q0M0OiAweDYxM0MsXG4gICAgMHg5Q0M1OiAweDYxMkMsXG4gICAgMHg5Q0M2OiAweDYxMzQsXG4gICAgMHg5Q0M3OiAweDYxM0QsXG4gICAgMHg5Q0M4OiAweDYxNDIsXG4gICAgMHg5Q0M5OiAweDYxNDQsXG4gICAgMHg5Q0NBOiAweDYxNzMsXG4gICAgMHg5Q0NCOiAweDYxNzcsXG4gICAgMHg5Q0NDOiAweDYxNTgsXG4gICAgMHg5Q0NEOiAweDYxNTksXG4gICAgMHg5Q0NFOiAweDYxNUEsXG4gICAgMHg5Q0NGOiAweDYxNkIsXG4gICAgMHg5Q0QwOiAweDYxNzQsXG4gICAgMHg5Q0QxOiAweDYxNkYsXG4gICAgMHg5Q0QyOiAweDYxNjUsXG4gICAgMHg5Q0QzOiAweDYxNzEsXG4gICAgMHg5Q0Q0OiAweDYxNUYsXG4gICAgMHg5Q0Q1OiAweDYxNUQsXG4gICAgMHg5Q0Q2OiAweDYxNTMsXG4gICAgMHg5Q0Q3OiAweDYxNzUsXG4gICAgMHg5Q0Q4OiAweDYxOTksXG4gICAgMHg5Q0Q5OiAweDYxOTYsXG4gICAgMHg5Q0RBOiAweDYxODcsXG4gICAgMHg5Q0RCOiAweDYxQUMsXG4gICAgMHg5Q0RDOiAweDYxOTQsXG4gICAgMHg5Q0REOiAweDYxOUEsXG4gICAgMHg5Q0RFOiAweDYxOEEsXG4gICAgMHg5Q0RGOiAweDYxOTEsXG4gICAgMHg5Q0UwOiAweDYxQUIsXG4gICAgMHg5Q0UxOiAweDYxQUUsXG4gICAgMHg5Q0UyOiAweDYxQ0MsXG4gICAgMHg5Q0UzOiAweDYxQ0EsXG4gICAgMHg5Q0U0OiAweDYxQzksXG4gICAgMHg5Q0U1OiAweDYxRjcsXG4gICAgMHg5Q0U2OiAweDYxQzgsXG4gICAgMHg5Q0U3OiAweDYxQzMsXG4gICAgMHg5Q0U4OiAweDYxQzYsXG4gICAgMHg5Q0U5OiAweDYxQkEsXG4gICAgMHg5Q0VBOiAweDYxQ0IsXG4gICAgMHg5Q0VCOiAweDdGNzksXG4gICAgMHg5Q0VDOiAweDYxQ0QsXG4gICAgMHg5Q0VEOiAweDYxRTYsXG4gICAgMHg5Q0VFOiAweDYxRTMsXG4gICAgMHg5Q0VGOiAweDYxRjYsXG4gICAgMHg5Q0YwOiAweDYxRkEsXG4gICAgMHg5Q0YxOiAweDYxRjQsXG4gICAgMHg5Q0YyOiAweDYxRkYsXG4gICAgMHg5Q0YzOiAweDYxRkQsXG4gICAgMHg5Q0Y0OiAweDYxRkMsXG4gICAgMHg5Q0Y1OiAweDYxRkUsXG4gICAgMHg5Q0Y2OiAweDYyMDAsXG4gICAgMHg5Q0Y3OiAweDYyMDgsXG4gICAgMHg5Q0Y4OiAweDYyMDksXG4gICAgMHg5Q0Y5OiAweDYyMEQsXG4gICAgMHg5Q0ZBOiAweDYyMEMsXG4gICAgMHg5Q0ZCOiAweDYyMTQsXG4gICAgMHg5Q0ZDOiAweDYyMUIsXG4gICAgMHg5RDQwOiAweDYyMUUsXG4gICAgMHg5RDQxOiAweDYyMjEsXG4gICAgMHg5RDQyOiAweDYyMkEsXG4gICAgMHg5RDQzOiAweDYyMkUsXG4gICAgMHg5RDQ0OiAweDYyMzAsXG4gICAgMHg5RDQ1OiAweDYyMzIsXG4gICAgMHg5RDQ2OiAweDYyMzMsXG4gICAgMHg5RDQ3OiAweDYyNDEsXG4gICAgMHg5RDQ4OiAweDYyNEUsXG4gICAgMHg5RDQ5OiAweDYyNUUsXG4gICAgMHg5RDRBOiAweDYyNjMsXG4gICAgMHg5RDRCOiAweDYyNUIsXG4gICAgMHg5RDRDOiAweDYyNjAsXG4gICAgMHg5RDREOiAweDYyNjgsXG4gICAgMHg5RDRFOiAweDYyN0MsXG4gICAgMHg5RDRGOiAweDYyODIsXG4gICAgMHg5RDUwOiAweDYyODksXG4gICAgMHg5RDUxOiAweDYyN0UsXG4gICAgMHg5RDUyOiAweDYyOTIsXG4gICAgMHg5RDUzOiAweDYyOTMsXG4gICAgMHg5RDU0OiAweDYyOTYsXG4gICAgMHg5RDU1OiAweDYyRDQsXG4gICAgMHg5RDU2OiAweDYyODMsXG4gICAgMHg5RDU3OiAweDYyOTQsXG4gICAgMHg5RDU4OiAweDYyRDcsXG4gICAgMHg5RDU5OiAweDYyRDEsXG4gICAgMHg5RDVBOiAweDYyQkIsXG4gICAgMHg5RDVCOiAweDYyQ0YsXG4gICAgMHg5RDVDOiAweDYyRkYsXG4gICAgMHg5RDVEOiAweDYyQzYsXG4gICAgMHg5RDVFOiAweDY0RDQsXG4gICAgMHg5RDVGOiAweDYyQzgsXG4gICAgMHg5RDYwOiAweDYyREMsXG4gICAgMHg5RDYxOiAweDYyQ0MsXG4gICAgMHg5RDYyOiAweDYyQ0EsXG4gICAgMHg5RDYzOiAweDYyQzIsXG4gICAgMHg5RDY0OiAweDYyQzcsXG4gICAgMHg5RDY1OiAweDYyOUIsXG4gICAgMHg5RDY2OiAweDYyQzksXG4gICAgMHg5RDY3OiAweDYzMEMsXG4gICAgMHg5RDY4OiAweDYyRUUsXG4gICAgMHg5RDY5OiAweDYyRjEsXG4gICAgMHg5RDZBOiAweDYzMjcsXG4gICAgMHg5RDZCOiAweDYzMDIsXG4gICAgMHg5RDZDOiAweDYzMDgsXG4gICAgMHg5RDZEOiAweDYyRUYsXG4gICAgMHg5RDZFOiAweDYyRjUsXG4gICAgMHg5RDZGOiAweDYzNTAsXG4gICAgMHg5RDcwOiAweDYzM0UsXG4gICAgMHg5RDcxOiAweDYzNEQsXG4gICAgMHg5RDcyOiAweDY0MUMsXG4gICAgMHg5RDczOiAweDYzNEYsXG4gICAgMHg5RDc0OiAweDYzOTYsXG4gICAgMHg5RDc1OiAweDYzOEUsXG4gICAgMHg5RDc2OiAweDYzODAsXG4gICAgMHg5RDc3OiAweDYzQUIsXG4gICAgMHg5RDc4OiAweDYzNzYsXG4gICAgMHg5RDc5OiAweDYzQTMsXG4gICAgMHg5RDdBOiAweDYzOEYsXG4gICAgMHg5RDdCOiAweDYzODksXG4gICAgMHg5RDdDOiAweDYzOUYsXG4gICAgMHg5RDdEOiAweDYzQjUsXG4gICAgMHg5RDdFOiAweDYzNkIsXG4gICAgMHg5RDgwOiAweDYzNjksXG4gICAgMHg5RDgxOiAweDYzQkUsXG4gICAgMHg5RDgyOiAweDYzRTksXG4gICAgMHg5RDgzOiAweDYzQzAsXG4gICAgMHg5RDg0OiAweDYzQzYsXG4gICAgMHg5RDg1OiAweDYzRTMsXG4gICAgMHg5RDg2OiAweDYzQzksXG4gICAgMHg5RDg3OiAweDYzRDIsXG4gICAgMHg5RDg4OiAweDYzRjYsXG4gICAgMHg5RDg5OiAweDYzQzQsXG4gICAgMHg5RDhBOiAweDY0MTYsXG4gICAgMHg5RDhCOiAweDY0MzQsXG4gICAgMHg5RDhDOiAweDY0MDYsXG4gICAgMHg5RDhEOiAweDY0MTMsXG4gICAgMHg5RDhFOiAweDY0MjYsXG4gICAgMHg5RDhGOiAweDY0MzYsXG4gICAgMHg5RDkwOiAweDY1MUQsXG4gICAgMHg5RDkxOiAweDY0MTcsXG4gICAgMHg5RDkyOiAweDY0MjgsXG4gICAgMHg5RDkzOiAweDY0MEYsXG4gICAgMHg5RDk0OiAweDY0NjcsXG4gICAgMHg5RDk1OiAweDY0NkYsXG4gICAgMHg5RDk2OiAweDY0NzYsXG4gICAgMHg5RDk3OiAweDY0NEUsXG4gICAgMHg5RDk4OiAweDY1MkEsXG4gICAgMHg5RDk5OiAweDY0OTUsXG4gICAgMHg5RDlBOiAweDY0OTMsXG4gICAgMHg5RDlCOiAweDY0QTUsXG4gICAgMHg5RDlDOiAweDY0QTksXG4gICAgMHg5RDlEOiAweDY0ODgsXG4gICAgMHg5RDlFOiAweDY0QkMsXG4gICAgMHg5RDlGOiAweDY0REEsXG4gICAgMHg5REEwOiAweDY0RDIsXG4gICAgMHg5REExOiAweDY0QzUsXG4gICAgMHg5REEyOiAweDY0QzcsXG4gICAgMHg5REEzOiAweDY0QkIsXG4gICAgMHg5REE0OiAweDY0RDgsXG4gICAgMHg5REE1OiAweDY0QzIsXG4gICAgMHg5REE2OiAweDY0RjEsXG4gICAgMHg5REE3OiAweDY0RTcsXG4gICAgMHg5REE4OiAweDgyMDksXG4gICAgMHg5REE5OiAweDY0RTAsXG4gICAgMHg5REFBOiAweDY0RTEsXG4gICAgMHg5REFCOiAweDYyQUMsXG4gICAgMHg5REFDOiAweDY0RTMsXG4gICAgMHg5REFEOiAweDY0RUYsXG4gICAgMHg5REFFOiAweDY1MkMsXG4gICAgMHg5REFGOiAweDY0RjYsXG4gICAgMHg5REIwOiAweDY0RjQsXG4gICAgMHg5REIxOiAweDY0RjIsXG4gICAgMHg5REIyOiAweDY0RkEsXG4gICAgMHg5REIzOiAweDY1MDAsXG4gICAgMHg5REI0OiAweDY0RkQsXG4gICAgMHg5REI1OiAweDY1MTgsXG4gICAgMHg5REI2OiAweDY1MUMsXG4gICAgMHg5REI3OiAweDY1MDUsXG4gICAgMHg5REI4OiAweDY1MjQsXG4gICAgMHg5REI5OiAweDY1MjMsXG4gICAgMHg5REJBOiAweDY1MkIsXG4gICAgMHg5REJCOiAweDY1MzQsXG4gICAgMHg5REJDOiAweDY1MzUsXG4gICAgMHg5REJEOiAweDY1MzcsXG4gICAgMHg5REJFOiAweDY1MzYsXG4gICAgMHg5REJGOiAweDY1MzgsXG4gICAgMHg5REMwOiAweDc1NEIsXG4gICAgMHg5REMxOiAweDY1NDgsXG4gICAgMHg5REMyOiAweDY1NTYsXG4gICAgMHg5REMzOiAweDY1NTUsXG4gICAgMHg5REM0OiAweDY1NEQsXG4gICAgMHg5REM1OiAweDY1NTgsXG4gICAgMHg5REM2OiAweDY1NUUsXG4gICAgMHg5REM3OiAweDY1NUQsXG4gICAgMHg5REM4OiAweDY1NzIsXG4gICAgMHg5REM5OiAweDY1NzgsXG4gICAgMHg5RENBOiAweDY1ODIsXG4gICAgMHg5RENCOiAweDY1ODMsXG4gICAgMHg5RENDOiAweDhCOEEsXG4gICAgMHg5RENEOiAweDY1OUIsXG4gICAgMHg5RENFOiAweDY1OUYsXG4gICAgMHg5RENGOiAweDY1QUIsXG4gICAgMHg5REQwOiAweDY1QjcsXG4gICAgMHg5REQxOiAweDY1QzMsXG4gICAgMHg5REQyOiAweDY1QzYsXG4gICAgMHg5REQzOiAweDY1QzEsXG4gICAgMHg5REQ0OiAweDY1QzQsXG4gICAgMHg5REQ1OiAweDY1Q0MsXG4gICAgMHg5REQ2OiAweDY1RDIsXG4gICAgMHg5REQ3OiAweDY1REIsXG4gICAgMHg5REQ4OiAweDY1RDksXG4gICAgMHg5REQ5OiAweDY1RTAsXG4gICAgMHg5RERBOiAweDY1RTEsXG4gICAgMHg5RERCOiAweDY1RjEsXG4gICAgMHg5RERDOiAweDY3NzIsXG4gICAgMHg5REREOiAweDY2MEEsXG4gICAgMHg5RERFOiAweDY2MDMsXG4gICAgMHg5RERGOiAweDY1RkIsXG4gICAgMHg5REUwOiAweDY3NzMsXG4gICAgMHg5REUxOiAweDY2MzUsXG4gICAgMHg5REUyOiAweDY2MzYsXG4gICAgMHg5REUzOiAweDY2MzQsXG4gICAgMHg5REU0OiAweDY2MUMsXG4gICAgMHg5REU1OiAweDY2NEYsXG4gICAgMHg5REU2OiAweDY2NDQsXG4gICAgMHg5REU3OiAweDY2NDksXG4gICAgMHg5REU4OiAweDY2NDEsXG4gICAgMHg5REU5OiAweDY2NUUsXG4gICAgMHg5REVBOiAweDY2NUQsXG4gICAgMHg5REVCOiAweDY2NjQsXG4gICAgMHg5REVDOiAweDY2NjcsXG4gICAgMHg5REVEOiAweDY2NjgsXG4gICAgMHg5REVFOiAweDY2NUYsXG4gICAgMHg5REVGOiAweDY2NjIsXG4gICAgMHg5REYwOiAweDY2NzAsXG4gICAgMHg5REYxOiAweDY2ODMsXG4gICAgMHg5REYyOiAweDY2ODgsXG4gICAgMHg5REYzOiAweDY2OEUsXG4gICAgMHg5REY0OiAweDY2ODksXG4gICAgMHg5REY1OiAweDY2ODQsXG4gICAgMHg5REY2OiAweDY2OTgsXG4gICAgMHg5REY3OiAweDY2OUQsXG4gICAgMHg5REY4OiAweDY2QzEsXG4gICAgMHg5REY5OiAweDY2QjksXG4gICAgMHg5REZBOiAweDY2QzksXG4gICAgMHg5REZCOiAweDY2QkUsXG4gICAgMHg5REZDOiAweDY2QkMsXG4gICAgMHg5RTQwOiAweDY2QzQsXG4gICAgMHg5RTQxOiAweDY2QjgsXG4gICAgMHg5RTQyOiAweDY2RDYsXG4gICAgMHg5RTQzOiAweDY2REEsXG4gICAgMHg5RTQ0OiAweDY2RTAsXG4gICAgMHg5RTQ1OiAweDY2M0YsXG4gICAgMHg5RTQ2OiAweDY2RTYsXG4gICAgMHg5RTQ3OiAweDY2RTksXG4gICAgMHg5RTQ4OiAweDY2RjAsXG4gICAgMHg5RTQ5OiAweDY2RjUsXG4gICAgMHg5RTRBOiAweDY2RjcsXG4gICAgMHg5RTRCOiAweDY3MEYsXG4gICAgMHg5RTRDOiAweDY3MTYsXG4gICAgMHg5RTREOiAweDY3MUUsXG4gICAgMHg5RTRFOiAweDY3MjYsXG4gICAgMHg5RTRGOiAweDY3MjcsXG4gICAgMHg5RTUwOiAweDk3MzgsXG4gICAgMHg5RTUxOiAweDY3MkUsXG4gICAgMHg5RTUyOiAweDY3M0YsXG4gICAgMHg5RTUzOiAweDY3MzYsXG4gICAgMHg5RTU0OiAweDY3NDEsXG4gICAgMHg5RTU1OiAweDY3MzgsXG4gICAgMHg5RTU2OiAweDY3MzcsXG4gICAgMHg5RTU3OiAweDY3NDYsXG4gICAgMHg5RTU4OiAweDY3NUUsXG4gICAgMHg5RTU5OiAweDY3NjAsXG4gICAgMHg5RTVBOiAweDY3NTksXG4gICAgMHg5RTVCOiAweDY3NjMsXG4gICAgMHg5RTVDOiAweDY3NjQsXG4gICAgMHg5RTVEOiAweDY3ODksXG4gICAgMHg5RTVFOiAweDY3NzAsXG4gICAgMHg5RTVGOiAweDY3QTksXG4gICAgMHg5RTYwOiAweDY3N0MsXG4gICAgMHg5RTYxOiAweDY3NkEsXG4gICAgMHg5RTYyOiAweDY3OEMsXG4gICAgMHg5RTYzOiAweDY3OEIsXG4gICAgMHg5RTY0OiAweDY3QTYsXG4gICAgMHg5RTY1OiAweDY3QTEsXG4gICAgMHg5RTY2OiAweDY3ODUsXG4gICAgMHg5RTY3OiAweDY3QjcsXG4gICAgMHg5RTY4OiAweDY3RUYsXG4gICAgMHg5RTY5OiAweDY3QjQsXG4gICAgMHg5RTZBOiAweDY3RUMsXG4gICAgMHg5RTZCOiAweDY3QjMsXG4gICAgMHg5RTZDOiAweDY3RTksXG4gICAgMHg5RTZEOiAweDY3QjgsXG4gICAgMHg5RTZFOiAweDY3RTQsXG4gICAgMHg5RTZGOiAweDY3REUsXG4gICAgMHg5RTcwOiAweDY3REQsXG4gICAgMHg5RTcxOiAweDY3RTIsXG4gICAgMHg5RTcyOiAweDY3RUUsXG4gICAgMHg5RTczOiAweDY3QjksXG4gICAgMHg5RTc0OiAweDY3Q0UsXG4gICAgMHg5RTc1OiAweDY3QzYsXG4gICAgMHg5RTc2OiAweDY3RTcsXG4gICAgMHg5RTc3OiAweDZBOUMsXG4gICAgMHg5RTc4OiAweDY4MUUsXG4gICAgMHg5RTc5OiAweDY4NDYsXG4gICAgMHg5RTdBOiAweDY4MjksXG4gICAgMHg5RTdCOiAweDY4NDAsXG4gICAgMHg5RTdDOiAweDY4NEQsXG4gICAgMHg5RTdEOiAweDY4MzIsXG4gICAgMHg5RTdFOiAweDY4NEUsXG4gICAgMHg5RTgwOiAweDY4QjMsXG4gICAgMHg5RTgxOiAweDY4MkIsXG4gICAgMHg5RTgyOiAweDY4NTksXG4gICAgMHg5RTgzOiAweDY4NjMsXG4gICAgMHg5RTg0OiAweDY4NzcsXG4gICAgMHg5RTg1OiAweDY4N0YsXG4gICAgMHg5RTg2OiAweDY4OUYsXG4gICAgMHg5RTg3OiAweDY4OEYsXG4gICAgMHg5RTg4OiAweDY4QUQsXG4gICAgMHg5RTg5OiAweDY4OTQsXG4gICAgMHg5RThBOiAweDY4OUQsXG4gICAgMHg5RThCOiAweDY4OUIsXG4gICAgMHg5RThDOiAweDY4ODMsXG4gICAgMHg5RThEOiAweDZBQUUsXG4gICAgMHg5RThFOiAweDY4QjksXG4gICAgMHg5RThGOiAweDY4NzQsXG4gICAgMHg5RTkwOiAweDY4QjUsXG4gICAgMHg5RTkxOiAweDY4QTAsXG4gICAgMHg5RTkyOiAweDY4QkEsXG4gICAgMHg5RTkzOiAweDY5MEYsXG4gICAgMHg5RTk0OiAweDY4OEQsXG4gICAgMHg5RTk1OiAweDY4N0UsXG4gICAgMHg5RTk2OiAweDY5MDEsXG4gICAgMHg5RTk3OiAweDY4Q0EsXG4gICAgMHg5RTk4OiAweDY5MDgsXG4gICAgMHg5RTk5OiAweDY4RDgsXG4gICAgMHg5RTlBOiAweDY5MjIsXG4gICAgMHg5RTlCOiAweDY5MjYsXG4gICAgMHg5RTlDOiAweDY4RTEsXG4gICAgMHg5RTlEOiAweDY5MEMsXG4gICAgMHg5RTlFOiAweDY4Q0QsXG4gICAgMHg5RTlGOiAweDY4RDQsXG4gICAgMHg5RUEwOiAweDY4RTcsXG4gICAgMHg5RUExOiAweDY4RDUsXG4gICAgMHg5RUEyOiAweDY5MzYsXG4gICAgMHg5RUEzOiAweDY5MTIsXG4gICAgMHg5RUE0OiAweDY5MDQsXG4gICAgMHg5RUE1OiAweDY4RDcsXG4gICAgMHg5RUE2OiAweDY4RTMsXG4gICAgMHg5RUE3OiAweDY5MjUsXG4gICAgMHg5RUE4OiAweDY4RjksXG4gICAgMHg5RUE5OiAweDY4RTAsXG4gICAgMHg5RUFBOiAweDY4RUYsXG4gICAgMHg5RUFCOiAweDY5MjgsXG4gICAgMHg5RUFDOiAweDY5MkEsXG4gICAgMHg5RUFEOiAweDY5MUEsXG4gICAgMHg5RUFFOiAweDY5MjMsXG4gICAgMHg5RUFGOiAweDY5MjEsXG4gICAgMHg5RUIwOiAweDY4QzYsXG4gICAgMHg5RUIxOiAweDY5NzksXG4gICAgMHg5RUIyOiAweDY5NzcsXG4gICAgMHg5RUIzOiAweDY5NUMsXG4gICAgMHg5RUI0OiAweDY5NzgsXG4gICAgMHg5RUI1OiAweDY5NkIsXG4gICAgMHg5RUI2OiAweDY5NTQsXG4gICAgMHg5RUI3OiAweDY5N0UsXG4gICAgMHg5RUI4OiAweDY5NkUsXG4gICAgMHg5RUI5OiAweDY5MzksXG4gICAgMHg5RUJBOiAweDY5NzQsXG4gICAgMHg5RUJCOiAweDY5M0QsXG4gICAgMHg5RUJDOiAweDY5NTksXG4gICAgMHg5RUJEOiAweDY5MzAsXG4gICAgMHg5RUJFOiAweDY5NjEsXG4gICAgMHg5RUJGOiAweDY5NUUsXG4gICAgMHg5RUMwOiAweDY5NUQsXG4gICAgMHg5RUMxOiAweDY5ODEsXG4gICAgMHg5RUMyOiAweDY5NkEsXG4gICAgMHg5RUMzOiAweDY5QjIsXG4gICAgMHg5RUM0OiAweDY5QUUsXG4gICAgMHg5RUM1OiAweDY5RDAsXG4gICAgMHg5RUM2OiAweDY5QkYsXG4gICAgMHg5RUM3OiAweDY5QzEsXG4gICAgMHg5RUM4OiAweDY5RDMsXG4gICAgMHg5RUM5OiAweDY5QkUsXG4gICAgMHg5RUNBOiAweDY5Q0UsXG4gICAgMHg5RUNCOiAweDVCRTgsXG4gICAgMHg5RUNDOiAweDY5Q0EsXG4gICAgMHg5RUNEOiAweDY5REQsXG4gICAgMHg5RUNFOiAweDY5QkIsXG4gICAgMHg5RUNGOiAweDY5QzMsXG4gICAgMHg5RUQwOiAweDY5QTcsXG4gICAgMHg5RUQxOiAweDZBMkUsXG4gICAgMHg5RUQyOiAweDY5OTEsXG4gICAgMHg5RUQzOiAweDY5QTAsXG4gICAgMHg5RUQ0OiAweDY5OUMsXG4gICAgMHg5RUQ1OiAweDY5OTUsXG4gICAgMHg5RUQ2OiAweDY5QjQsXG4gICAgMHg5RUQ3OiAweDY5REUsXG4gICAgMHg5RUQ4OiAweDY5RTgsXG4gICAgMHg5RUQ5OiAweDZBMDIsXG4gICAgMHg5RURBOiAweDZBMUIsXG4gICAgMHg5RURCOiAweDY5RkYsXG4gICAgMHg5RURDOiAweDZCMEEsXG4gICAgMHg5RUREOiAweDY5RjksXG4gICAgMHg5RURFOiAweDY5RjIsXG4gICAgMHg5RURGOiAweDY5RTcsXG4gICAgMHg5RUUwOiAweDZBMDUsXG4gICAgMHg5RUUxOiAweDY5QjEsXG4gICAgMHg5RUUyOiAweDZBMUUsXG4gICAgMHg5RUUzOiAweDY5RUQsXG4gICAgMHg5RUU0OiAweDZBMTQsXG4gICAgMHg5RUU1OiAweDY5RUIsXG4gICAgMHg5RUU2OiAweDZBMEEsXG4gICAgMHg5RUU3OiAweDZBMTIsXG4gICAgMHg5RUU4OiAweDZBQzEsXG4gICAgMHg5RUU5OiAweDZBMjMsXG4gICAgMHg5RUVBOiAweDZBMTMsXG4gICAgMHg5RUVCOiAweDZBNDQsXG4gICAgMHg5RUVDOiAweDZBMEMsXG4gICAgMHg5RUVEOiAweDZBNzIsXG4gICAgMHg5RUVFOiAweDZBMzYsXG4gICAgMHg5RUVGOiAweDZBNzgsXG4gICAgMHg5RUYwOiAweDZBNDcsXG4gICAgMHg5RUYxOiAweDZBNjIsXG4gICAgMHg5RUYyOiAweDZBNTksXG4gICAgMHg5RUYzOiAweDZBNjYsXG4gICAgMHg5RUY0OiAweDZBNDgsXG4gICAgMHg5RUY1OiAweDZBMzgsXG4gICAgMHg5RUY2OiAweDZBMjIsXG4gICAgMHg5RUY3OiAweDZBOTAsXG4gICAgMHg5RUY4OiAweDZBOEQsXG4gICAgMHg5RUY5OiAweDZBQTAsXG4gICAgMHg5RUZBOiAweDZBODQsXG4gICAgMHg5RUZCOiAweDZBQTIsXG4gICAgMHg5RUZDOiAweDZBQTMsXG4gICAgMHg5RjQwOiAweDZBOTcsXG4gICAgMHg5RjQxOiAweDg2MTcsXG4gICAgMHg5RjQyOiAweDZBQkIsXG4gICAgMHg5RjQzOiAweDZBQzMsXG4gICAgMHg5RjQ0OiAweDZBQzIsXG4gICAgMHg5RjQ1OiAweDZBQjgsXG4gICAgMHg5RjQ2OiAweDZBQjMsXG4gICAgMHg5RjQ3OiAweDZBQUMsXG4gICAgMHg5RjQ4OiAweDZBREUsXG4gICAgMHg5RjQ5OiAweDZBRDEsXG4gICAgMHg5RjRBOiAweDZBREYsXG4gICAgMHg5RjRCOiAweDZBQUEsXG4gICAgMHg5RjRDOiAweDZBREEsXG4gICAgMHg5RjREOiAweDZBRUEsXG4gICAgMHg5RjRFOiAweDZBRkIsXG4gICAgMHg5RjRGOiAweDZCMDUsXG4gICAgMHg5RjUwOiAweDg2MTYsXG4gICAgMHg5RjUxOiAweDZBRkEsXG4gICAgMHg5RjUyOiAweDZCMTIsXG4gICAgMHg5RjUzOiAweDZCMTYsXG4gICAgMHg5RjU0OiAweDlCMzEsXG4gICAgMHg5RjU1OiAweDZCMUYsXG4gICAgMHg5RjU2OiAweDZCMzgsXG4gICAgMHg5RjU3OiAweDZCMzcsXG4gICAgMHg5RjU4OiAweDc2REMsXG4gICAgMHg5RjU5OiAweDZCMzksXG4gICAgMHg5RjVBOiAweDk4RUUsXG4gICAgMHg5RjVCOiAweDZCNDcsXG4gICAgMHg5RjVDOiAweDZCNDMsXG4gICAgMHg5RjVEOiAweDZCNDksXG4gICAgMHg5RjVFOiAweDZCNTAsXG4gICAgMHg5RjVGOiAweDZCNTksXG4gICAgMHg5RjYwOiAweDZCNTQsXG4gICAgMHg5RjYxOiAweDZCNUIsXG4gICAgMHg5RjYyOiAweDZCNUYsXG4gICAgMHg5RjYzOiAweDZCNjEsXG4gICAgMHg5RjY0OiAweDZCNzgsXG4gICAgMHg5RjY1OiAweDZCNzksXG4gICAgMHg5RjY2OiAweDZCN0YsXG4gICAgMHg5RjY3OiAweDZCODAsXG4gICAgMHg5RjY4OiAweDZCODQsXG4gICAgMHg5RjY5OiAweDZCODMsXG4gICAgMHg5RjZBOiAweDZCOEQsXG4gICAgMHg5RjZCOiAweDZCOTgsXG4gICAgMHg5RjZDOiAweDZCOTUsXG4gICAgMHg5RjZEOiAweDZCOUUsXG4gICAgMHg5RjZFOiAweDZCQTQsXG4gICAgMHg5RjZGOiAweDZCQUEsXG4gICAgMHg5RjcwOiAweDZCQUIsXG4gICAgMHg5RjcxOiAweDZCQUYsXG4gICAgMHg5RjcyOiAweDZCQjIsXG4gICAgMHg5RjczOiAweDZCQjEsXG4gICAgMHg5Rjc0OiAweDZCQjMsXG4gICAgMHg5Rjc1OiAweDZCQjcsXG4gICAgMHg5Rjc2OiAweDZCQkMsXG4gICAgMHg5Rjc3OiAweDZCQzYsXG4gICAgMHg5Rjc4OiAweDZCQ0IsXG4gICAgMHg5Rjc5OiAweDZCRDMsXG4gICAgMHg5RjdBOiAweDZCREYsXG4gICAgMHg5RjdCOiAweDZCRUMsXG4gICAgMHg5RjdDOiAweDZCRUIsXG4gICAgMHg5RjdEOiAweDZCRjMsXG4gICAgMHg5RjdFOiAweDZCRUYsXG4gICAgMHg5RjgwOiAweDlFQkUsXG4gICAgMHg5RjgxOiAweDZDMDgsXG4gICAgMHg5RjgyOiAweDZDMTMsXG4gICAgMHg5RjgzOiAweDZDMTQsXG4gICAgMHg5Rjg0OiAweDZDMUIsXG4gICAgMHg5Rjg1OiAweDZDMjQsXG4gICAgMHg5Rjg2OiAweDZDMjMsXG4gICAgMHg5Rjg3OiAweDZDNUUsXG4gICAgMHg5Rjg4OiAweDZDNTUsXG4gICAgMHg5Rjg5OiAweDZDNjIsXG4gICAgMHg5RjhBOiAweDZDNkEsXG4gICAgMHg5RjhCOiAweDZDODIsXG4gICAgMHg5RjhDOiAweDZDOEQsXG4gICAgMHg5RjhEOiAweDZDOUEsXG4gICAgMHg5RjhFOiAweDZDODEsXG4gICAgMHg5RjhGOiAweDZDOUIsXG4gICAgMHg5RjkwOiAweDZDN0UsXG4gICAgMHg5RjkxOiAweDZDNjgsXG4gICAgMHg5RjkyOiAweDZDNzMsXG4gICAgMHg5RjkzOiAweDZDOTIsXG4gICAgMHg5Rjk0OiAweDZDOTAsXG4gICAgMHg5Rjk1OiAweDZDQzQsXG4gICAgMHg5Rjk2OiAweDZDRjEsXG4gICAgMHg5Rjk3OiAweDZDRDMsXG4gICAgMHg5Rjk4OiAweDZDQkQsXG4gICAgMHg5Rjk5OiAweDZDRDcsXG4gICAgMHg5RjlBOiAweDZDQzUsXG4gICAgMHg5RjlCOiAweDZDREQsXG4gICAgMHg5RjlDOiAweDZDQUUsXG4gICAgMHg5RjlEOiAweDZDQjEsXG4gICAgMHg5RjlFOiAweDZDQkUsXG4gICAgMHg5RjlGOiAweDZDQkEsXG4gICAgMHg5RkEwOiAweDZDREIsXG4gICAgMHg5RkExOiAweDZDRUYsXG4gICAgMHg5RkEyOiAweDZDRDksXG4gICAgMHg5RkEzOiAweDZDRUEsXG4gICAgMHg5RkE0OiAweDZEMUYsXG4gICAgMHg5RkE1OiAweDg4NEQsXG4gICAgMHg5RkE2OiAweDZEMzYsXG4gICAgMHg5RkE3OiAweDZEMkIsXG4gICAgMHg5RkE4OiAweDZEM0QsXG4gICAgMHg5RkE5OiAweDZEMzgsXG4gICAgMHg5RkFBOiAweDZEMTksXG4gICAgMHg5RkFCOiAweDZEMzUsXG4gICAgMHg5RkFDOiAweDZEMzMsXG4gICAgMHg5RkFEOiAweDZEMTIsXG4gICAgMHg5RkFFOiAweDZEMEMsXG4gICAgMHg5RkFGOiAweDZENjMsXG4gICAgMHg5RkIwOiAweDZEOTMsXG4gICAgMHg5RkIxOiAweDZENjQsXG4gICAgMHg5RkIyOiAweDZENUEsXG4gICAgMHg5RkIzOiAweDZENzksXG4gICAgMHg5RkI0OiAweDZENTksXG4gICAgMHg5RkI1OiAweDZEOEUsXG4gICAgMHg5RkI2OiAweDZEOTUsXG4gICAgMHg5RkI3OiAweDZGRTQsXG4gICAgMHg5RkI4OiAweDZEODUsXG4gICAgMHg5RkI5OiAweDZERjksXG4gICAgMHg5RkJBOiAweDZFMTUsXG4gICAgMHg5RkJCOiAweDZFMEEsXG4gICAgMHg5RkJDOiAweDZEQjUsXG4gICAgMHg5RkJEOiAweDZEQzcsXG4gICAgMHg5RkJFOiAweDZERTYsXG4gICAgMHg5RkJGOiAweDZEQjgsXG4gICAgMHg5RkMwOiAweDZEQzYsXG4gICAgMHg5RkMxOiAweDZERUMsXG4gICAgMHg5RkMyOiAweDZEREUsXG4gICAgMHg5RkMzOiAweDZEQ0MsXG4gICAgMHg5RkM0OiAweDZERTgsXG4gICAgMHg5RkM1OiAweDZERDIsXG4gICAgMHg5RkM2OiAweDZEQzUsXG4gICAgMHg5RkM3OiAweDZERkEsXG4gICAgMHg5RkM4OiAweDZERDksXG4gICAgMHg5RkM5OiAweDZERTQsXG4gICAgMHg5RkNBOiAweDZERDUsXG4gICAgMHg5RkNCOiAweDZERUEsXG4gICAgMHg5RkNDOiAweDZERUUsXG4gICAgMHg5RkNEOiAweDZFMkQsXG4gICAgMHg5RkNFOiAweDZFNkUsXG4gICAgMHg5RkNGOiAweDZFMkUsXG4gICAgMHg5RkQwOiAweDZFMTksXG4gICAgMHg5RkQxOiAweDZFNzIsXG4gICAgMHg5RkQyOiAweDZFNUYsXG4gICAgMHg5RkQzOiAweDZFM0UsXG4gICAgMHg5RkQ0OiAweDZFMjMsXG4gICAgMHg5RkQ1OiAweDZFNkIsXG4gICAgMHg5RkQ2OiAweDZFMkIsXG4gICAgMHg5RkQ3OiAweDZFNzYsXG4gICAgMHg5RkQ4OiAweDZFNEQsXG4gICAgMHg5RkQ5OiAweDZFMUYsXG4gICAgMHg5RkRBOiAweDZFNDMsXG4gICAgMHg5RkRCOiAweDZFM0EsXG4gICAgMHg5RkRDOiAweDZFNEUsXG4gICAgMHg5RkREOiAweDZFMjQsXG4gICAgMHg5RkRFOiAweDZFRkYsXG4gICAgMHg5RkRGOiAweDZFMUQsXG4gICAgMHg5RkUwOiAweDZFMzgsXG4gICAgMHg5RkUxOiAweDZFODIsXG4gICAgMHg5RkUyOiAweDZFQUEsXG4gICAgMHg5RkUzOiAweDZFOTgsXG4gICAgMHg5RkU0OiAweDZFQzksXG4gICAgMHg5RkU1OiAweDZFQjcsXG4gICAgMHg5RkU2OiAweDZFRDMsXG4gICAgMHg5RkU3OiAweDZFQkQsXG4gICAgMHg5RkU4OiAweDZFQUYsXG4gICAgMHg5RkU5OiAweDZFQzQsXG4gICAgMHg5RkVBOiAweDZFQjIsXG4gICAgMHg5RkVCOiAweDZFRDQsXG4gICAgMHg5RkVDOiAweDZFRDUsXG4gICAgMHg5RkVEOiAweDZFOEYsXG4gICAgMHg5RkVFOiAweDZFQTUsXG4gICAgMHg5RkVGOiAweDZFQzIsXG4gICAgMHg5RkYwOiAweDZFOUYsXG4gICAgMHg5RkYxOiAweDZGNDEsXG4gICAgMHg5RkYyOiAweDZGMTEsXG4gICAgMHg5RkYzOiAweDcwNEMsXG4gICAgMHg5RkY0OiAweDZFRUMsXG4gICAgMHg5RkY1OiAweDZFRjgsXG4gICAgMHg5RkY2OiAweDZFRkUsXG4gICAgMHg5RkY3OiAweDZGM0YsXG4gICAgMHg5RkY4OiAweDZFRjIsXG4gICAgMHg5RkY5OiAweDZGMzEsXG4gICAgMHg5RkZBOiAweDZFRUYsXG4gICAgMHg5RkZCOiAweDZGMzIsXG4gICAgMHg5RkZDOiAweDZFQ0MsXG4gICAgMHhBMTogMHhGRjYxLFxuICAgIDB4QTI6IDB4RkY2MixcbiAgICAweEEzOiAweEZGNjMsXG4gICAgMHhBNDogMHhGRjY0LFxuICAgIDB4QTU6IDB4RkY2NSxcbiAgICAweEE2OiAweEZGNjYsXG4gICAgMHhBNzogMHhGRjY3LFxuICAgIDB4QTg6IDB4RkY2OCxcbiAgICAweEE5OiAweEZGNjksXG4gICAgMHhBQTogMHhGRjZBLFxuICAgIDB4QUI6IDB4RkY2QixcbiAgICAweEFDOiAweEZGNkMsXG4gICAgMHhBRDogMHhGRjZELFxuICAgIDB4QUU6IDB4RkY2RSxcbiAgICAweEFGOiAweEZGNkYsXG4gICAgMHhCMDogMHhGRjcwLFxuICAgIDB4QjE6IDB4RkY3MSxcbiAgICAweEIyOiAweEZGNzIsXG4gICAgMHhCMzogMHhGRjczLFxuICAgIDB4QjQ6IDB4RkY3NCxcbiAgICAweEI1OiAweEZGNzUsXG4gICAgMHhCNjogMHhGRjc2LFxuICAgIDB4Qjc6IDB4RkY3NyxcbiAgICAweEI4OiAweEZGNzgsXG4gICAgMHhCOTogMHhGRjc5LFxuICAgIDB4QkE6IDB4RkY3QSxcbiAgICAweEJCOiAweEZGN0IsXG4gICAgMHhCQzogMHhGRjdDLFxuICAgIDB4QkQ6IDB4RkY3RCxcbiAgICAweEJFOiAweEZGN0UsXG4gICAgMHhCRjogMHhGRjdGLFxuICAgIDB4QzA6IDB4RkY4MCxcbiAgICAweEMxOiAweEZGODEsXG4gICAgMHhDMjogMHhGRjgyLFxuICAgIDB4QzM6IDB4RkY4MyxcbiAgICAweEM0OiAweEZGODQsXG4gICAgMHhDNTogMHhGRjg1LFxuICAgIDB4QzY6IDB4RkY4NixcbiAgICAweEM3OiAweEZGODcsXG4gICAgMHhDODogMHhGRjg4LFxuICAgIDB4Qzk6IDB4RkY4OSxcbiAgICAweENBOiAweEZGOEEsXG4gICAgMHhDQjogMHhGRjhCLFxuICAgIDB4Q0M6IDB4RkY4QyxcbiAgICAweENEOiAweEZGOEQsXG4gICAgMHhDRTogMHhGRjhFLFxuICAgIDB4Q0Y6IDB4RkY4RixcbiAgICAweEQwOiAweEZGOTAsXG4gICAgMHhEMTogMHhGRjkxLFxuICAgIDB4RDI6IDB4RkY5MixcbiAgICAweEQzOiAweEZGOTMsXG4gICAgMHhENDogMHhGRjk0LFxuICAgIDB4RDU6IDB4RkY5NSxcbiAgICAweEQ2OiAweEZGOTYsXG4gICAgMHhENzogMHhGRjk3LFxuICAgIDB4RDg6IDB4RkY5OCxcbiAgICAweEQ5OiAweEZGOTksXG4gICAgMHhEQTogMHhGRjlBLFxuICAgIDB4REI6IDB4RkY5QixcbiAgICAweERDOiAweEZGOUMsXG4gICAgMHhERDogMHhGRjlELFxuICAgIDB4REU6IDB4RkY5RSxcbiAgICAweERGOiAweEZGOUYsXG4gICAgMHhFMDQwOiAweDZGM0UsXG4gICAgMHhFMDQxOiAweDZGMTMsXG4gICAgMHhFMDQyOiAweDZFRjcsXG4gICAgMHhFMDQzOiAweDZGODYsXG4gICAgMHhFMDQ0OiAweDZGN0EsXG4gICAgMHhFMDQ1OiAweDZGNzgsXG4gICAgMHhFMDQ2OiAweDZGODEsXG4gICAgMHhFMDQ3OiAweDZGODAsXG4gICAgMHhFMDQ4OiAweDZGNkYsXG4gICAgMHhFMDQ5OiAweDZGNUIsXG4gICAgMHhFMDRBOiAweDZGRjMsXG4gICAgMHhFMDRCOiAweDZGNkQsXG4gICAgMHhFMDRDOiAweDZGODIsXG4gICAgMHhFMDREOiAweDZGN0MsXG4gICAgMHhFMDRFOiAweDZGNTgsXG4gICAgMHhFMDRGOiAweDZGOEUsXG4gICAgMHhFMDUwOiAweDZGOTEsXG4gICAgMHhFMDUxOiAweDZGQzIsXG4gICAgMHhFMDUyOiAweDZGNjYsXG4gICAgMHhFMDUzOiAweDZGQjMsXG4gICAgMHhFMDU0OiAweDZGQTMsXG4gICAgMHhFMDU1OiAweDZGQTEsXG4gICAgMHhFMDU2OiAweDZGQTQsXG4gICAgMHhFMDU3OiAweDZGQjksXG4gICAgMHhFMDU4OiAweDZGQzYsXG4gICAgMHhFMDU5OiAweDZGQUEsXG4gICAgMHhFMDVBOiAweDZGREYsXG4gICAgMHhFMDVCOiAweDZGRDUsXG4gICAgMHhFMDVDOiAweDZGRUMsXG4gICAgMHhFMDVEOiAweDZGRDQsXG4gICAgMHhFMDVFOiAweDZGRDgsXG4gICAgMHhFMDVGOiAweDZGRjEsXG4gICAgMHhFMDYwOiAweDZGRUUsXG4gICAgMHhFMDYxOiAweDZGREIsXG4gICAgMHhFMDYyOiAweDcwMDksXG4gICAgMHhFMDYzOiAweDcwMEIsXG4gICAgMHhFMDY0OiAweDZGRkEsXG4gICAgMHhFMDY1OiAweDcwMTEsXG4gICAgMHhFMDY2OiAweDcwMDEsXG4gICAgMHhFMDY3OiAweDcwMEYsXG4gICAgMHhFMDY4OiAweDZGRkUsXG4gICAgMHhFMDY5OiAweDcwMUIsXG4gICAgMHhFMDZBOiAweDcwMUEsXG4gICAgMHhFMDZCOiAweDZGNzQsXG4gICAgMHhFMDZDOiAweDcwMUQsXG4gICAgMHhFMDZEOiAweDcwMTgsXG4gICAgMHhFMDZFOiAweDcwMUYsXG4gICAgMHhFMDZGOiAweDcwMzAsXG4gICAgMHhFMDcwOiAweDcwM0UsXG4gICAgMHhFMDcxOiAweDcwMzIsXG4gICAgMHhFMDcyOiAweDcwNTEsXG4gICAgMHhFMDczOiAweDcwNjMsXG4gICAgMHhFMDc0OiAweDcwOTksXG4gICAgMHhFMDc1OiAweDcwOTIsXG4gICAgMHhFMDc2OiAweDcwQUYsXG4gICAgMHhFMDc3OiAweDcwRjEsXG4gICAgMHhFMDc4OiAweDcwQUMsXG4gICAgMHhFMDc5OiAweDcwQjgsXG4gICAgMHhFMDdBOiAweDcwQjMsXG4gICAgMHhFMDdCOiAweDcwQUUsXG4gICAgMHhFMDdDOiAweDcwREYsXG4gICAgMHhFMDdEOiAweDcwQ0IsXG4gICAgMHhFMDdFOiAweDcwREQsXG4gICAgMHhFMDgwOiAweDcwRDksXG4gICAgMHhFMDgxOiAweDcxMDksXG4gICAgMHhFMDgyOiAweDcwRkQsXG4gICAgMHhFMDgzOiAweDcxMUMsXG4gICAgMHhFMDg0OiAweDcxMTksXG4gICAgMHhFMDg1OiAweDcxNjUsXG4gICAgMHhFMDg2OiAweDcxNTUsXG4gICAgMHhFMDg3OiAweDcxODgsXG4gICAgMHhFMDg4OiAweDcxNjYsXG4gICAgMHhFMDg5OiAweDcxNjIsXG4gICAgMHhFMDhBOiAweDcxNEMsXG4gICAgMHhFMDhCOiAweDcxNTYsXG4gICAgMHhFMDhDOiAweDcxNkMsXG4gICAgMHhFMDhEOiAweDcxOEYsXG4gICAgMHhFMDhFOiAweDcxRkIsXG4gICAgMHhFMDhGOiAweDcxODQsXG4gICAgMHhFMDkwOiAweDcxOTUsXG4gICAgMHhFMDkxOiAweDcxQTgsXG4gICAgMHhFMDkyOiAweDcxQUMsXG4gICAgMHhFMDkzOiAweDcxRDcsXG4gICAgMHhFMDk0OiAweDcxQjksXG4gICAgMHhFMDk1OiAweDcxQkUsXG4gICAgMHhFMDk2OiAweDcxRDIsXG4gICAgMHhFMDk3OiAweDcxQzksXG4gICAgMHhFMDk4OiAweDcxRDQsXG4gICAgMHhFMDk5OiAweDcxQ0UsXG4gICAgMHhFMDlBOiAweDcxRTAsXG4gICAgMHhFMDlCOiAweDcxRUMsXG4gICAgMHhFMDlDOiAweDcxRTcsXG4gICAgMHhFMDlEOiAweDcxRjUsXG4gICAgMHhFMDlFOiAweDcxRkMsXG4gICAgMHhFMDlGOiAweDcxRjksXG4gICAgMHhFMEEwOiAweDcxRkYsXG4gICAgMHhFMEExOiAweDcyMEQsXG4gICAgMHhFMEEyOiAweDcyMTAsXG4gICAgMHhFMEEzOiAweDcyMUIsXG4gICAgMHhFMEE0OiAweDcyMjgsXG4gICAgMHhFMEE1OiAweDcyMkQsXG4gICAgMHhFMEE2OiAweDcyMkMsXG4gICAgMHhFMEE3OiAweDcyMzAsXG4gICAgMHhFMEE4OiAweDcyMzIsXG4gICAgMHhFMEE5OiAweDcyM0IsXG4gICAgMHhFMEFBOiAweDcyM0MsXG4gICAgMHhFMEFCOiAweDcyM0YsXG4gICAgMHhFMEFDOiAweDcyNDAsXG4gICAgMHhFMEFEOiAweDcyNDYsXG4gICAgMHhFMEFFOiAweDcyNEIsXG4gICAgMHhFMEFGOiAweDcyNTgsXG4gICAgMHhFMEIwOiAweDcyNzQsXG4gICAgMHhFMEIxOiAweDcyN0UsXG4gICAgMHhFMEIyOiAweDcyODIsXG4gICAgMHhFMEIzOiAweDcyODEsXG4gICAgMHhFMEI0OiAweDcyODcsXG4gICAgMHhFMEI1OiAweDcyOTIsXG4gICAgMHhFMEI2OiAweDcyOTYsXG4gICAgMHhFMEI3OiAweDcyQTIsXG4gICAgMHhFMEI4OiAweDcyQTcsXG4gICAgMHhFMEI5OiAweDcyQjksXG4gICAgMHhFMEJBOiAweDcyQjIsXG4gICAgMHhFMEJCOiAweDcyQzMsXG4gICAgMHhFMEJDOiAweDcyQzYsXG4gICAgMHhFMEJEOiAweDcyQzQsXG4gICAgMHhFMEJFOiAweDcyQ0UsXG4gICAgMHhFMEJGOiAweDcyRDIsXG4gICAgMHhFMEMwOiAweDcyRTIsXG4gICAgMHhFMEMxOiAweDcyRTAsXG4gICAgMHhFMEMyOiAweDcyRTEsXG4gICAgMHhFMEMzOiAweDcyRjksXG4gICAgMHhFMEM0OiAweDcyRjcsXG4gICAgMHhFMEM1OiAweDUwMEYsXG4gICAgMHhFMEM2OiAweDczMTcsXG4gICAgMHhFMEM3OiAweDczMEEsXG4gICAgMHhFMEM4OiAweDczMUMsXG4gICAgMHhFMEM5OiAweDczMTYsXG4gICAgMHhFMENBOiAweDczMUQsXG4gICAgMHhFMENCOiAweDczMzQsXG4gICAgMHhFMENDOiAweDczMkYsXG4gICAgMHhFMENEOiAweDczMjksXG4gICAgMHhFMENFOiAweDczMjUsXG4gICAgMHhFMENGOiAweDczM0UsXG4gICAgMHhFMEQwOiAweDczNEUsXG4gICAgMHhFMEQxOiAweDczNEYsXG4gICAgMHhFMEQyOiAweDlFRDgsXG4gICAgMHhFMEQzOiAweDczNTcsXG4gICAgMHhFMEQ0OiAweDczNkEsXG4gICAgMHhFMEQ1OiAweDczNjgsXG4gICAgMHhFMEQ2OiAweDczNzAsXG4gICAgMHhFMEQ3OiAweDczNzgsXG4gICAgMHhFMEQ4OiAweDczNzUsXG4gICAgMHhFMEQ5OiAweDczN0IsXG4gICAgMHhFMERBOiAweDczN0EsXG4gICAgMHhFMERCOiAweDczQzgsXG4gICAgMHhFMERDOiAweDczQjMsXG4gICAgMHhFMEREOiAweDczQ0UsXG4gICAgMHhFMERFOiAweDczQkIsXG4gICAgMHhFMERGOiAweDczQzAsXG4gICAgMHhFMEUwOiAweDczRTUsXG4gICAgMHhFMEUxOiAweDczRUUsXG4gICAgMHhFMEUyOiAweDczREUsXG4gICAgMHhFMEUzOiAweDc0QTIsXG4gICAgMHhFMEU0OiAweDc0MDUsXG4gICAgMHhFMEU1OiAweDc0NkYsXG4gICAgMHhFMEU2OiAweDc0MjUsXG4gICAgMHhFMEU3OiAweDczRjgsXG4gICAgMHhFMEU4OiAweDc0MzIsXG4gICAgMHhFMEU5OiAweDc0M0EsXG4gICAgMHhFMEVBOiAweDc0NTUsXG4gICAgMHhFMEVCOiAweDc0M0YsXG4gICAgMHhFMEVDOiAweDc0NUYsXG4gICAgMHhFMEVEOiAweDc0NTksXG4gICAgMHhFMEVFOiAweDc0NDEsXG4gICAgMHhFMEVGOiAweDc0NUMsXG4gICAgMHhFMEYwOiAweDc0NjksXG4gICAgMHhFMEYxOiAweDc0NzAsXG4gICAgMHhFMEYyOiAweDc0NjMsXG4gICAgMHhFMEYzOiAweDc0NkEsXG4gICAgMHhFMEY0OiAweDc0NzYsXG4gICAgMHhFMEY1OiAweDc0N0UsXG4gICAgMHhFMEY2OiAweDc0OEIsXG4gICAgMHhFMEY3OiAweDc0OUUsXG4gICAgMHhFMEY4OiAweDc0QTcsXG4gICAgMHhFMEY5OiAweDc0Q0EsXG4gICAgMHhFMEZBOiAweDc0Q0YsXG4gICAgMHhFMEZCOiAweDc0RDQsXG4gICAgMHhFMEZDOiAweDczRjEsXG4gICAgMHhFMTQwOiAweDc0RTAsXG4gICAgMHhFMTQxOiAweDc0RTMsXG4gICAgMHhFMTQyOiAweDc0RTcsXG4gICAgMHhFMTQzOiAweDc0RTksXG4gICAgMHhFMTQ0OiAweDc0RUUsXG4gICAgMHhFMTQ1OiAweDc0RjIsXG4gICAgMHhFMTQ2OiAweDc0RjAsXG4gICAgMHhFMTQ3OiAweDc0RjEsXG4gICAgMHhFMTQ4OiAweDc0RjgsXG4gICAgMHhFMTQ5OiAweDc0RjcsXG4gICAgMHhFMTRBOiAweDc1MDQsXG4gICAgMHhFMTRCOiAweDc1MDMsXG4gICAgMHhFMTRDOiAweDc1MDUsXG4gICAgMHhFMTREOiAweDc1MEMsXG4gICAgMHhFMTRFOiAweDc1MEUsXG4gICAgMHhFMTRGOiAweDc1MEQsXG4gICAgMHhFMTUwOiAweDc1MTUsXG4gICAgMHhFMTUxOiAweDc1MTMsXG4gICAgMHhFMTUyOiAweDc1MUUsXG4gICAgMHhFMTUzOiAweDc1MjYsXG4gICAgMHhFMTU0OiAweDc1MkMsXG4gICAgMHhFMTU1OiAweDc1M0MsXG4gICAgMHhFMTU2OiAweDc1NDQsXG4gICAgMHhFMTU3OiAweDc1NEQsXG4gICAgMHhFMTU4OiAweDc1NEEsXG4gICAgMHhFMTU5OiAweDc1NDksXG4gICAgMHhFMTVBOiAweDc1NUIsXG4gICAgMHhFMTVCOiAweDc1NDYsXG4gICAgMHhFMTVDOiAweDc1NUEsXG4gICAgMHhFMTVEOiAweDc1NjksXG4gICAgMHhFMTVFOiAweDc1NjQsXG4gICAgMHhFMTVGOiAweDc1NjcsXG4gICAgMHhFMTYwOiAweDc1NkIsXG4gICAgMHhFMTYxOiAweDc1NkQsXG4gICAgMHhFMTYyOiAweDc1NzgsXG4gICAgMHhFMTYzOiAweDc1NzYsXG4gICAgMHhFMTY0OiAweDc1ODYsXG4gICAgMHhFMTY1OiAweDc1ODcsXG4gICAgMHhFMTY2OiAweDc1NzQsXG4gICAgMHhFMTY3OiAweDc1OEEsXG4gICAgMHhFMTY4OiAweDc1ODksXG4gICAgMHhFMTY5OiAweDc1ODIsXG4gICAgMHhFMTZBOiAweDc1OTQsXG4gICAgMHhFMTZCOiAweDc1OUEsXG4gICAgMHhFMTZDOiAweDc1OUQsXG4gICAgMHhFMTZEOiAweDc1QTUsXG4gICAgMHhFMTZFOiAweDc1QTMsXG4gICAgMHhFMTZGOiAweDc1QzIsXG4gICAgMHhFMTcwOiAweDc1QjMsXG4gICAgMHhFMTcxOiAweDc1QzMsXG4gICAgMHhFMTcyOiAweDc1QjUsXG4gICAgMHhFMTczOiAweDc1QkQsXG4gICAgMHhFMTc0OiAweDc1QjgsXG4gICAgMHhFMTc1OiAweDc1QkMsXG4gICAgMHhFMTc2OiAweDc1QjEsXG4gICAgMHhFMTc3OiAweDc1Q0QsXG4gICAgMHhFMTc4OiAweDc1Q0EsXG4gICAgMHhFMTc5OiAweDc1RDIsXG4gICAgMHhFMTdBOiAweDc1RDksXG4gICAgMHhFMTdCOiAweDc1RTMsXG4gICAgMHhFMTdDOiAweDc1REUsXG4gICAgMHhFMTdEOiAweDc1RkUsXG4gICAgMHhFMTdFOiAweDc1RkYsXG4gICAgMHhFMTgwOiAweDc1RkMsXG4gICAgMHhFMTgxOiAweDc2MDEsXG4gICAgMHhFMTgyOiAweDc1RjAsXG4gICAgMHhFMTgzOiAweDc1RkEsXG4gICAgMHhFMTg0OiAweDc1RjIsXG4gICAgMHhFMTg1OiAweDc1RjMsXG4gICAgMHhFMTg2OiAweDc2MEIsXG4gICAgMHhFMTg3OiAweDc2MEQsXG4gICAgMHhFMTg4OiAweDc2MDksXG4gICAgMHhFMTg5OiAweDc2MUYsXG4gICAgMHhFMThBOiAweDc2MjcsXG4gICAgMHhFMThCOiAweDc2MjAsXG4gICAgMHhFMThDOiAweDc2MjEsXG4gICAgMHhFMThEOiAweDc2MjIsXG4gICAgMHhFMThFOiAweDc2MjQsXG4gICAgMHhFMThGOiAweDc2MzQsXG4gICAgMHhFMTkwOiAweDc2MzAsXG4gICAgMHhFMTkxOiAweDc2M0IsXG4gICAgMHhFMTkyOiAweDc2NDcsXG4gICAgMHhFMTkzOiAweDc2NDgsXG4gICAgMHhFMTk0OiAweDc2NDYsXG4gICAgMHhFMTk1OiAweDc2NUMsXG4gICAgMHhFMTk2OiAweDc2NTgsXG4gICAgMHhFMTk3OiAweDc2NjEsXG4gICAgMHhFMTk4OiAweDc2NjIsXG4gICAgMHhFMTk5OiAweDc2NjgsXG4gICAgMHhFMTlBOiAweDc2NjksXG4gICAgMHhFMTlCOiAweDc2NkEsXG4gICAgMHhFMTlDOiAweDc2NjcsXG4gICAgMHhFMTlEOiAweDc2NkMsXG4gICAgMHhFMTlFOiAweDc2NzAsXG4gICAgMHhFMTlGOiAweDc2NzIsXG4gICAgMHhFMUEwOiAweDc2NzYsXG4gICAgMHhFMUExOiAweDc2NzgsXG4gICAgMHhFMUEyOiAweDc2N0MsXG4gICAgMHhFMUEzOiAweDc2ODAsXG4gICAgMHhFMUE0OiAweDc2ODMsXG4gICAgMHhFMUE1OiAweDc2ODgsXG4gICAgMHhFMUE2OiAweDc2OEIsXG4gICAgMHhFMUE3OiAweDc2OEUsXG4gICAgMHhFMUE4OiAweDc2OTYsXG4gICAgMHhFMUE5OiAweDc2OTMsXG4gICAgMHhFMUFBOiAweDc2OTksXG4gICAgMHhFMUFCOiAweDc2OUEsXG4gICAgMHhFMUFDOiAweDc2QjAsXG4gICAgMHhFMUFEOiAweDc2QjQsXG4gICAgMHhFMUFFOiAweDc2QjgsXG4gICAgMHhFMUFGOiAweDc2QjksXG4gICAgMHhFMUIwOiAweDc2QkEsXG4gICAgMHhFMUIxOiAweDc2QzIsXG4gICAgMHhFMUIyOiAweDc2Q0QsXG4gICAgMHhFMUIzOiAweDc2RDYsXG4gICAgMHhFMUI0OiAweDc2RDIsXG4gICAgMHhFMUI1OiAweDc2REUsXG4gICAgMHhFMUI2OiAweDc2RTEsXG4gICAgMHhFMUI3OiAweDc2RTUsXG4gICAgMHhFMUI4OiAweDc2RTcsXG4gICAgMHhFMUI5OiAweDc2RUEsXG4gICAgMHhFMUJBOiAweDg2MkYsXG4gICAgMHhFMUJCOiAweDc2RkIsXG4gICAgMHhFMUJDOiAweDc3MDgsXG4gICAgMHhFMUJEOiAweDc3MDcsXG4gICAgMHhFMUJFOiAweDc3MDQsXG4gICAgMHhFMUJGOiAweDc3MjksXG4gICAgMHhFMUMwOiAweDc3MjQsXG4gICAgMHhFMUMxOiAweDc3MUUsXG4gICAgMHhFMUMyOiAweDc3MjUsXG4gICAgMHhFMUMzOiAweDc3MjYsXG4gICAgMHhFMUM0OiAweDc3MUIsXG4gICAgMHhFMUM1OiAweDc3MzcsXG4gICAgMHhFMUM2OiAweDc3MzgsXG4gICAgMHhFMUM3OiAweDc3NDcsXG4gICAgMHhFMUM4OiAweDc3NUEsXG4gICAgMHhFMUM5OiAweDc3NjgsXG4gICAgMHhFMUNBOiAweDc3NkIsXG4gICAgMHhFMUNCOiAweDc3NUIsXG4gICAgMHhFMUNDOiAweDc3NjUsXG4gICAgMHhFMUNEOiAweDc3N0YsXG4gICAgMHhFMUNFOiAweDc3N0UsXG4gICAgMHhFMUNGOiAweDc3NzksXG4gICAgMHhFMUQwOiAweDc3OEUsXG4gICAgMHhFMUQxOiAweDc3OEIsXG4gICAgMHhFMUQyOiAweDc3OTEsXG4gICAgMHhFMUQzOiAweDc3QTAsXG4gICAgMHhFMUQ0OiAweDc3OUUsXG4gICAgMHhFMUQ1OiAweDc3QjAsXG4gICAgMHhFMUQ2OiAweDc3QjYsXG4gICAgMHhFMUQ3OiAweDc3QjksXG4gICAgMHhFMUQ4OiAweDc3QkYsXG4gICAgMHhFMUQ5OiAweDc3QkMsXG4gICAgMHhFMURBOiAweDc3QkQsXG4gICAgMHhFMURCOiAweDc3QkIsXG4gICAgMHhFMURDOiAweDc3QzcsXG4gICAgMHhFMUREOiAweDc3Q0QsXG4gICAgMHhFMURFOiAweDc3RDcsXG4gICAgMHhFMURGOiAweDc3REEsXG4gICAgMHhFMUUwOiAweDc3REMsXG4gICAgMHhFMUUxOiAweDc3RTMsXG4gICAgMHhFMUUyOiAweDc3RUUsXG4gICAgMHhFMUUzOiAweDc3RkMsXG4gICAgMHhFMUU0OiAweDc4MEMsXG4gICAgMHhFMUU1OiAweDc4MTIsXG4gICAgMHhFMUU2OiAweDc5MjYsXG4gICAgMHhFMUU3OiAweDc4MjAsXG4gICAgMHhFMUU4OiAweDc5MkEsXG4gICAgMHhFMUU5OiAweDc4NDUsXG4gICAgMHhFMUVBOiAweDc4OEUsXG4gICAgMHhFMUVCOiAweDc4NzQsXG4gICAgMHhFMUVDOiAweDc4ODYsXG4gICAgMHhFMUVEOiAweDc4N0MsXG4gICAgMHhFMUVFOiAweDc4OUEsXG4gICAgMHhFMUVGOiAweDc4OEMsXG4gICAgMHhFMUYwOiAweDc4QTMsXG4gICAgMHhFMUYxOiAweDc4QjUsXG4gICAgMHhFMUYyOiAweDc4QUEsXG4gICAgMHhFMUYzOiAweDc4QUYsXG4gICAgMHhFMUY0OiAweDc4RDEsXG4gICAgMHhFMUY1OiAweDc4QzYsXG4gICAgMHhFMUY2OiAweDc4Q0IsXG4gICAgMHhFMUY3OiAweDc4RDQsXG4gICAgMHhFMUY4OiAweDc4QkUsXG4gICAgMHhFMUY5OiAweDc4QkMsXG4gICAgMHhFMUZBOiAweDc4QzUsXG4gICAgMHhFMUZCOiAweDc4Q0EsXG4gICAgMHhFMUZDOiAweDc4RUMsXG4gICAgMHhFMjQwOiAweDc4RTcsXG4gICAgMHhFMjQxOiAweDc4REEsXG4gICAgMHhFMjQyOiAweDc4RkQsXG4gICAgMHhFMjQzOiAweDc4RjQsXG4gICAgMHhFMjQ0OiAweDc5MDcsXG4gICAgMHhFMjQ1OiAweDc5MTIsXG4gICAgMHhFMjQ2OiAweDc5MTEsXG4gICAgMHhFMjQ3OiAweDc5MTksXG4gICAgMHhFMjQ4OiAweDc5MkMsXG4gICAgMHhFMjQ5OiAweDc5MkIsXG4gICAgMHhFMjRBOiAweDc5NDAsXG4gICAgMHhFMjRCOiAweDc5NjAsXG4gICAgMHhFMjRDOiAweDc5NTcsXG4gICAgMHhFMjREOiAweDc5NUYsXG4gICAgMHhFMjRFOiAweDc5NUEsXG4gICAgMHhFMjRGOiAweDc5NTUsXG4gICAgMHhFMjUwOiAweDc5NTMsXG4gICAgMHhFMjUxOiAweDc5N0EsXG4gICAgMHhFMjUyOiAweDc5N0YsXG4gICAgMHhFMjUzOiAweDc5OEEsXG4gICAgMHhFMjU0OiAweDc5OUQsXG4gICAgMHhFMjU1OiAweDc5QTcsXG4gICAgMHhFMjU2OiAweDlGNEIsXG4gICAgMHhFMjU3OiAweDc5QUEsXG4gICAgMHhFMjU4OiAweDc5QUUsXG4gICAgMHhFMjU5OiAweDc5QjMsXG4gICAgMHhFMjVBOiAweDc5QjksXG4gICAgMHhFMjVCOiAweDc5QkEsXG4gICAgMHhFMjVDOiAweDc5QzksXG4gICAgMHhFMjVEOiAweDc5RDUsXG4gICAgMHhFMjVFOiAweDc5RTcsXG4gICAgMHhFMjVGOiAweDc5RUMsXG4gICAgMHhFMjYwOiAweDc5RTEsXG4gICAgMHhFMjYxOiAweDc5RTMsXG4gICAgMHhFMjYyOiAweDdBMDgsXG4gICAgMHhFMjYzOiAweDdBMEQsXG4gICAgMHhFMjY0OiAweDdBMTgsXG4gICAgMHhFMjY1OiAweDdBMTksXG4gICAgMHhFMjY2OiAweDdBMjAsXG4gICAgMHhFMjY3OiAweDdBMUYsXG4gICAgMHhFMjY4OiAweDc5ODAsXG4gICAgMHhFMjY5OiAweDdBMzEsXG4gICAgMHhFMjZBOiAweDdBM0IsXG4gICAgMHhFMjZCOiAweDdBM0UsXG4gICAgMHhFMjZDOiAweDdBMzcsXG4gICAgMHhFMjZEOiAweDdBNDMsXG4gICAgMHhFMjZFOiAweDdBNTcsXG4gICAgMHhFMjZGOiAweDdBNDksXG4gICAgMHhFMjcwOiAweDdBNjEsXG4gICAgMHhFMjcxOiAweDdBNjIsXG4gICAgMHhFMjcyOiAweDdBNjksXG4gICAgMHhFMjczOiAweDlGOUQsXG4gICAgMHhFMjc0OiAweDdBNzAsXG4gICAgMHhFMjc1OiAweDdBNzksXG4gICAgMHhFMjc2OiAweDdBN0QsXG4gICAgMHhFMjc3OiAweDdBODgsXG4gICAgMHhFMjc4OiAweDdBOTcsXG4gICAgMHhFMjc5OiAweDdBOTUsXG4gICAgMHhFMjdBOiAweDdBOTgsXG4gICAgMHhFMjdCOiAweDdBOTYsXG4gICAgMHhFMjdDOiAweDdBQTksXG4gICAgMHhFMjdEOiAweDdBQzgsXG4gICAgMHhFMjdFOiAweDdBQjAsXG4gICAgMHhFMjgwOiAweDdBQjYsXG4gICAgMHhFMjgxOiAweDdBQzUsXG4gICAgMHhFMjgyOiAweDdBQzQsXG4gICAgMHhFMjgzOiAweDdBQkYsXG4gICAgMHhFMjg0OiAweDkwODMsXG4gICAgMHhFMjg1OiAweDdBQzcsXG4gICAgMHhFMjg2OiAweDdBQ0EsXG4gICAgMHhFMjg3OiAweDdBQ0QsXG4gICAgMHhFMjg4OiAweDdBQ0YsXG4gICAgMHhFMjg5OiAweDdBRDUsXG4gICAgMHhFMjhBOiAweDdBRDMsXG4gICAgMHhFMjhCOiAweDdBRDksXG4gICAgMHhFMjhDOiAweDdBREEsXG4gICAgMHhFMjhEOiAweDdBREQsXG4gICAgMHhFMjhFOiAweDdBRTEsXG4gICAgMHhFMjhGOiAweDdBRTIsXG4gICAgMHhFMjkwOiAweDdBRTYsXG4gICAgMHhFMjkxOiAweDdBRUQsXG4gICAgMHhFMjkyOiAweDdBRjAsXG4gICAgMHhFMjkzOiAweDdCMDIsXG4gICAgMHhFMjk0OiAweDdCMEYsXG4gICAgMHhFMjk1OiAweDdCMEEsXG4gICAgMHhFMjk2OiAweDdCMDYsXG4gICAgMHhFMjk3OiAweDdCMzMsXG4gICAgMHhFMjk4OiAweDdCMTgsXG4gICAgMHhFMjk5OiAweDdCMTksXG4gICAgMHhFMjlBOiAweDdCMUUsXG4gICAgMHhFMjlCOiAweDdCMzUsXG4gICAgMHhFMjlDOiAweDdCMjgsXG4gICAgMHhFMjlEOiAweDdCMzYsXG4gICAgMHhFMjlFOiAweDdCNTAsXG4gICAgMHhFMjlGOiAweDdCN0EsXG4gICAgMHhFMkEwOiAweDdCMDQsXG4gICAgMHhFMkExOiAweDdCNEQsXG4gICAgMHhFMkEyOiAweDdCMEIsXG4gICAgMHhFMkEzOiAweDdCNEMsXG4gICAgMHhFMkE0OiAweDdCNDUsXG4gICAgMHhFMkE1OiAweDdCNzUsXG4gICAgMHhFMkE2OiAweDdCNjUsXG4gICAgMHhFMkE3OiAweDdCNzQsXG4gICAgMHhFMkE4OiAweDdCNjcsXG4gICAgMHhFMkE5OiAweDdCNzAsXG4gICAgMHhFMkFBOiAweDdCNzEsXG4gICAgMHhFMkFCOiAweDdCNkMsXG4gICAgMHhFMkFDOiAweDdCNkUsXG4gICAgMHhFMkFEOiAweDdCOUQsXG4gICAgMHhFMkFFOiAweDdCOTgsXG4gICAgMHhFMkFGOiAweDdCOUYsXG4gICAgMHhFMkIwOiAweDdCOEQsXG4gICAgMHhFMkIxOiAweDdCOUMsXG4gICAgMHhFMkIyOiAweDdCOUEsXG4gICAgMHhFMkIzOiAweDdCOEIsXG4gICAgMHhFMkI0OiAweDdCOTIsXG4gICAgMHhFMkI1OiAweDdCOEYsXG4gICAgMHhFMkI2OiAweDdCNUQsXG4gICAgMHhFMkI3OiAweDdCOTksXG4gICAgMHhFMkI4OiAweDdCQ0IsXG4gICAgMHhFMkI5OiAweDdCQzEsXG4gICAgMHhFMkJBOiAweDdCQ0MsXG4gICAgMHhFMkJCOiAweDdCQ0YsXG4gICAgMHhFMkJDOiAweDdCQjQsXG4gICAgMHhFMkJEOiAweDdCQzYsXG4gICAgMHhFMkJFOiAweDdCREQsXG4gICAgMHhFMkJGOiAweDdCRTksXG4gICAgMHhFMkMwOiAweDdDMTEsXG4gICAgMHhFMkMxOiAweDdDMTQsXG4gICAgMHhFMkMyOiAweDdCRTYsXG4gICAgMHhFMkMzOiAweDdCRTUsXG4gICAgMHhFMkM0OiAweDdDNjAsXG4gICAgMHhFMkM1OiAweDdDMDAsXG4gICAgMHhFMkM2OiAweDdDMDcsXG4gICAgMHhFMkM3OiAweDdDMTMsXG4gICAgMHhFMkM4OiAweDdCRjMsXG4gICAgMHhFMkM5OiAweDdCRjcsXG4gICAgMHhFMkNBOiAweDdDMTcsXG4gICAgMHhFMkNCOiAweDdDMEQsXG4gICAgMHhFMkNDOiAweDdCRjYsXG4gICAgMHhFMkNEOiAweDdDMjMsXG4gICAgMHhFMkNFOiAweDdDMjcsXG4gICAgMHhFMkNGOiAweDdDMkEsXG4gICAgMHhFMkQwOiAweDdDMUYsXG4gICAgMHhFMkQxOiAweDdDMzcsXG4gICAgMHhFMkQyOiAweDdDMkIsXG4gICAgMHhFMkQzOiAweDdDM0QsXG4gICAgMHhFMkQ0OiAweDdDNEMsXG4gICAgMHhFMkQ1OiAweDdDNDMsXG4gICAgMHhFMkQ2OiAweDdDNTQsXG4gICAgMHhFMkQ3OiAweDdDNEYsXG4gICAgMHhFMkQ4OiAweDdDNDAsXG4gICAgMHhFMkQ5OiAweDdDNTAsXG4gICAgMHhFMkRBOiAweDdDNTgsXG4gICAgMHhFMkRCOiAweDdDNUYsXG4gICAgMHhFMkRDOiAweDdDNjQsXG4gICAgMHhFMkREOiAweDdDNTYsXG4gICAgMHhFMkRFOiAweDdDNjUsXG4gICAgMHhFMkRGOiAweDdDNkMsXG4gICAgMHhFMkUwOiAweDdDNzUsXG4gICAgMHhFMkUxOiAweDdDODMsXG4gICAgMHhFMkUyOiAweDdDOTAsXG4gICAgMHhFMkUzOiAweDdDQTQsXG4gICAgMHhFMkU0OiAweDdDQUQsXG4gICAgMHhFMkU1OiAweDdDQTIsXG4gICAgMHhFMkU2OiAweDdDQUIsXG4gICAgMHhFMkU3OiAweDdDQTEsXG4gICAgMHhFMkU4OiAweDdDQTgsXG4gICAgMHhFMkU5OiAweDdDQjMsXG4gICAgMHhFMkVBOiAweDdDQjIsXG4gICAgMHhFMkVCOiAweDdDQjEsXG4gICAgMHhFMkVDOiAweDdDQUUsXG4gICAgMHhFMkVEOiAweDdDQjksXG4gICAgMHhFMkVFOiAweDdDQkQsXG4gICAgMHhFMkVGOiAweDdDQzAsXG4gICAgMHhFMkYwOiAweDdDQzUsXG4gICAgMHhFMkYxOiAweDdDQzIsXG4gICAgMHhFMkYyOiAweDdDRDgsXG4gICAgMHhFMkYzOiAweDdDRDIsXG4gICAgMHhFMkY0OiAweDdDREMsXG4gICAgMHhFMkY1OiAweDdDRTIsXG4gICAgMHhFMkY2OiAweDlCM0IsXG4gICAgMHhFMkY3OiAweDdDRUYsXG4gICAgMHhFMkY4OiAweDdDRjIsXG4gICAgMHhFMkY5OiAweDdDRjQsXG4gICAgMHhFMkZBOiAweDdDRjYsXG4gICAgMHhFMkZCOiAweDdDRkEsXG4gICAgMHhFMkZDOiAweDdEMDYsXG4gICAgMHhFMzQwOiAweDdEMDIsXG4gICAgMHhFMzQxOiAweDdEMUMsXG4gICAgMHhFMzQyOiAweDdEMTUsXG4gICAgMHhFMzQzOiAweDdEMEEsXG4gICAgMHhFMzQ0OiAweDdENDUsXG4gICAgMHhFMzQ1OiAweDdENEIsXG4gICAgMHhFMzQ2OiAweDdEMkUsXG4gICAgMHhFMzQ3OiAweDdEMzIsXG4gICAgMHhFMzQ4OiAweDdEM0YsXG4gICAgMHhFMzQ5OiAweDdEMzUsXG4gICAgMHhFMzRBOiAweDdENDYsXG4gICAgMHhFMzRCOiAweDdENzMsXG4gICAgMHhFMzRDOiAweDdENTYsXG4gICAgMHhFMzREOiAweDdENEUsXG4gICAgMHhFMzRFOiAweDdENzIsXG4gICAgMHhFMzRGOiAweDdENjgsXG4gICAgMHhFMzUwOiAweDdENkUsXG4gICAgMHhFMzUxOiAweDdENEYsXG4gICAgMHhFMzUyOiAweDdENjMsXG4gICAgMHhFMzUzOiAweDdEOTMsXG4gICAgMHhFMzU0OiAweDdEODksXG4gICAgMHhFMzU1OiAweDdENUIsXG4gICAgMHhFMzU2OiAweDdEOEYsXG4gICAgMHhFMzU3OiAweDdEN0QsXG4gICAgMHhFMzU4OiAweDdEOUIsXG4gICAgMHhFMzU5OiAweDdEQkEsXG4gICAgMHhFMzVBOiAweDdEQUUsXG4gICAgMHhFMzVCOiAweDdEQTMsXG4gICAgMHhFMzVDOiAweDdEQjUsXG4gICAgMHhFMzVEOiAweDdEQzcsXG4gICAgMHhFMzVFOiAweDdEQkQsXG4gICAgMHhFMzVGOiAweDdEQUIsXG4gICAgMHhFMzYwOiAweDdFM0QsXG4gICAgMHhFMzYxOiAweDdEQTIsXG4gICAgMHhFMzYyOiAweDdEQUYsXG4gICAgMHhFMzYzOiAweDdEREMsXG4gICAgMHhFMzY0OiAweDdEQjgsXG4gICAgMHhFMzY1OiAweDdEOUYsXG4gICAgMHhFMzY2OiAweDdEQjAsXG4gICAgMHhFMzY3OiAweDdERDgsXG4gICAgMHhFMzY4OiAweDdEREQsXG4gICAgMHhFMzY5OiAweDdERTQsXG4gICAgMHhFMzZBOiAweDdEREUsXG4gICAgMHhFMzZCOiAweDdERkIsXG4gICAgMHhFMzZDOiAweDdERjIsXG4gICAgMHhFMzZEOiAweDdERTEsXG4gICAgMHhFMzZFOiAweDdFMDUsXG4gICAgMHhFMzZGOiAweDdFMEEsXG4gICAgMHhFMzcwOiAweDdFMjMsXG4gICAgMHhFMzcxOiAweDdFMjEsXG4gICAgMHhFMzcyOiAweDdFMTIsXG4gICAgMHhFMzczOiAweDdFMzEsXG4gICAgMHhFMzc0OiAweDdFMUYsXG4gICAgMHhFMzc1OiAweDdFMDksXG4gICAgMHhFMzc2OiAweDdFMEIsXG4gICAgMHhFMzc3OiAweDdFMjIsXG4gICAgMHhFMzc4OiAweDdFNDYsXG4gICAgMHhFMzc5OiAweDdFNjYsXG4gICAgMHhFMzdBOiAweDdFM0IsXG4gICAgMHhFMzdCOiAweDdFMzUsXG4gICAgMHhFMzdDOiAweDdFMzksXG4gICAgMHhFMzdEOiAweDdFNDMsXG4gICAgMHhFMzdFOiAweDdFMzcsXG4gICAgMHhFMzgwOiAweDdFMzIsXG4gICAgMHhFMzgxOiAweDdFM0EsXG4gICAgMHhFMzgyOiAweDdFNjcsXG4gICAgMHhFMzgzOiAweDdFNUQsXG4gICAgMHhFMzg0OiAweDdFNTYsXG4gICAgMHhFMzg1OiAweDdFNUUsXG4gICAgMHhFMzg2OiAweDdFNTksXG4gICAgMHhFMzg3OiAweDdFNUEsXG4gICAgMHhFMzg4OiAweDdFNzksXG4gICAgMHhFMzg5OiAweDdFNkEsXG4gICAgMHhFMzhBOiAweDdFNjksXG4gICAgMHhFMzhCOiAweDdFN0MsXG4gICAgMHhFMzhDOiAweDdFN0IsXG4gICAgMHhFMzhEOiAweDdFODMsXG4gICAgMHhFMzhFOiAweDdERDUsXG4gICAgMHhFMzhGOiAweDdFN0QsXG4gICAgMHhFMzkwOiAweDhGQUUsXG4gICAgMHhFMzkxOiAweDdFN0YsXG4gICAgMHhFMzkyOiAweDdFODgsXG4gICAgMHhFMzkzOiAweDdFODksXG4gICAgMHhFMzk0OiAweDdFOEMsXG4gICAgMHhFMzk1OiAweDdFOTIsXG4gICAgMHhFMzk2OiAweDdFOTAsXG4gICAgMHhFMzk3OiAweDdFOTMsXG4gICAgMHhFMzk4OiAweDdFOTQsXG4gICAgMHhFMzk5OiAweDdFOTYsXG4gICAgMHhFMzlBOiAweDdFOEUsXG4gICAgMHhFMzlCOiAweDdFOUIsXG4gICAgMHhFMzlDOiAweDdFOUMsXG4gICAgMHhFMzlEOiAweDdGMzgsXG4gICAgMHhFMzlFOiAweDdGM0EsXG4gICAgMHhFMzlGOiAweDdGNDUsXG4gICAgMHhFM0EwOiAweDdGNEMsXG4gICAgMHhFM0ExOiAweDdGNEQsXG4gICAgMHhFM0EyOiAweDdGNEUsXG4gICAgMHhFM0EzOiAweDdGNTAsXG4gICAgMHhFM0E0OiAweDdGNTEsXG4gICAgMHhFM0E1OiAweDdGNTUsXG4gICAgMHhFM0E2OiAweDdGNTQsXG4gICAgMHhFM0E3OiAweDdGNTgsXG4gICAgMHhFM0E4OiAweDdGNUYsXG4gICAgMHhFM0E5OiAweDdGNjAsXG4gICAgMHhFM0FBOiAweDdGNjgsXG4gICAgMHhFM0FCOiAweDdGNjksXG4gICAgMHhFM0FDOiAweDdGNjcsXG4gICAgMHhFM0FEOiAweDdGNzgsXG4gICAgMHhFM0FFOiAweDdGODIsXG4gICAgMHhFM0FGOiAweDdGODYsXG4gICAgMHhFM0IwOiAweDdGODMsXG4gICAgMHhFM0IxOiAweDdGODgsXG4gICAgMHhFM0IyOiAweDdGODcsXG4gICAgMHhFM0IzOiAweDdGOEMsXG4gICAgMHhFM0I0OiAweDdGOTQsXG4gICAgMHhFM0I1OiAweDdGOUUsXG4gICAgMHhFM0I2OiAweDdGOUQsXG4gICAgMHhFM0I3OiAweDdGOUEsXG4gICAgMHhFM0I4OiAweDdGQTMsXG4gICAgMHhFM0I5OiAweDdGQUYsXG4gICAgMHhFM0JBOiAweDdGQjIsXG4gICAgMHhFM0JCOiAweDdGQjksXG4gICAgMHhFM0JDOiAweDdGQUUsXG4gICAgMHhFM0JEOiAweDdGQjYsXG4gICAgMHhFM0JFOiAweDdGQjgsXG4gICAgMHhFM0JGOiAweDhCNzEsXG4gICAgMHhFM0MwOiAweDdGQzUsXG4gICAgMHhFM0MxOiAweDdGQzYsXG4gICAgMHhFM0MyOiAweDdGQ0EsXG4gICAgMHhFM0MzOiAweDdGRDUsXG4gICAgMHhFM0M0OiAweDdGRDQsXG4gICAgMHhFM0M1OiAweDdGRTEsXG4gICAgMHhFM0M2OiAweDdGRTYsXG4gICAgMHhFM0M3OiAweDdGRTksXG4gICAgMHhFM0M4OiAweDdGRjMsXG4gICAgMHhFM0M5OiAweDdGRjksXG4gICAgMHhFM0NBOiAweDk4REMsXG4gICAgMHhFM0NCOiAweDgwMDYsXG4gICAgMHhFM0NDOiAweDgwMDQsXG4gICAgMHhFM0NEOiAweDgwMEIsXG4gICAgMHhFM0NFOiAweDgwMTIsXG4gICAgMHhFM0NGOiAweDgwMTgsXG4gICAgMHhFM0QwOiAweDgwMTksXG4gICAgMHhFM0QxOiAweDgwMUMsXG4gICAgMHhFM0QyOiAweDgwMjEsXG4gICAgMHhFM0QzOiAweDgwMjgsXG4gICAgMHhFM0Q0OiAweDgwM0YsXG4gICAgMHhFM0Q1OiAweDgwM0IsXG4gICAgMHhFM0Q2OiAweDgwNEEsXG4gICAgMHhFM0Q3OiAweDgwNDYsXG4gICAgMHhFM0Q4OiAweDgwNTIsXG4gICAgMHhFM0Q5OiAweDgwNTgsXG4gICAgMHhFM0RBOiAweDgwNUEsXG4gICAgMHhFM0RCOiAweDgwNUYsXG4gICAgMHhFM0RDOiAweDgwNjIsXG4gICAgMHhFM0REOiAweDgwNjgsXG4gICAgMHhFM0RFOiAweDgwNzMsXG4gICAgMHhFM0RGOiAweDgwNzIsXG4gICAgMHhFM0UwOiAweDgwNzAsXG4gICAgMHhFM0UxOiAweDgwNzYsXG4gICAgMHhFM0UyOiAweDgwNzksXG4gICAgMHhFM0UzOiAweDgwN0QsXG4gICAgMHhFM0U0OiAweDgwN0YsXG4gICAgMHhFM0U1OiAweDgwODQsXG4gICAgMHhFM0U2OiAweDgwODYsXG4gICAgMHhFM0U3OiAweDgwODUsXG4gICAgMHhFM0U4OiAweDgwOUIsXG4gICAgMHhFM0U5OiAweDgwOTMsXG4gICAgMHhFM0VBOiAweDgwOUEsXG4gICAgMHhFM0VCOiAweDgwQUQsXG4gICAgMHhFM0VDOiAweDUxOTAsXG4gICAgMHhFM0VEOiAweDgwQUMsXG4gICAgMHhFM0VFOiAweDgwREIsXG4gICAgMHhFM0VGOiAweDgwRTUsXG4gICAgMHhFM0YwOiAweDgwRDksXG4gICAgMHhFM0YxOiAweDgwREQsXG4gICAgMHhFM0YyOiAweDgwQzQsXG4gICAgMHhFM0YzOiAweDgwREEsXG4gICAgMHhFM0Y0OiAweDgwRDYsXG4gICAgMHhFM0Y1OiAweDgxMDksXG4gICAgMHhFM0Y2OiAweDgwRUYsXG4gICAgMHhFM0Y3OiAweDgwRjEsXG4gICAgMHhFM0Y4OiAweDgxMUIsXG4gICAgMHhFM0Y5OiAweDgxMjksXG4gICAgMHhFM0ZBOiAweDgxMjMsXG4gICAgMHhFM0ZCOiAweDgxMkYsXG4gICAgMHhFM0ZDOiAweDgxNEIsXG4gICAgMHhFNDQwOiAweDk2OEIsXG4gICAgMHhFNDQxOiAweDgxNDYsXG4gICAgMHhFNDQyOiAweDgxM0UsXG4gICAgMHhFNDQzOiAweDgxNTMsXG4gICAgMHhFNDQ0OiAweDgxNTEsXG4gICAgMHhFNDQ1OiAweDgwRkMsXG4gICAgMHhFNDQ2OiAweDgxNzEsXG4gICAgMHhFNDQ3OiAweDgxNkUsXG4gICAgMHhFNDQ4OiAweDgxNjUsXG4gICAgMHhFNDQ5OiAweDgxNjYsXG4gICAgMHhFNDRBOiAweDgxNzQsXG4gICAgMHhFNDRCOiAweDgxODMsXG4gICAgMHhFNDRDOiAweDgxODgsXG4gICAgMHhFNDREOiAweDgxOEEsXG4gICAgMHhFNDRFOiAweDgxODAsXG4gICAgMHhFNDRGOiAweDgxODIsXG4gICAgMHhFNDUwOiAweDgxQTAsXG4gICAgMHhFNDUxOiAweDgxOTUsXG4gICAgMHhFNDUyOiAweDgxQTQsXG4gICAgMHhFNDUzOiAweDgxQTMsXG4gICAgMHhFNDU0OiAweDgxNUYsXG4gICAgMHhFNDU1OiAweDgxOTMsXG4gICAgMHhFNDU2OiAweDgxQTksXG4gICAgMHhFNDU3OiAweDgxQjAsXG4gICAgMHhFNDU4OiAweDgxQjUsXG4gICAgMHhFNDU5OiAweDgxQkUsXG4gICAgMHhFNDVBOiAweDgxQjgsXG4gICAgMHhFNDVCOiAweDgxQkQsXG4gICAgMHhFNDVDOiAweDgxQzAsXG4gICAgMHhFNDVEOiAweDgxQzIsXG4gICAgMHhFNDVFOiAweDgxQkEsXG4gICAgMHhFNDVGOiAweDgxQzksXG4gICAgMHhFNDYwOiAweDgxQ0QsXG4gICAgMHhFNDYxOiAweDgxRDEsXG4gICAgMHhFNDYyOiAweDgxRDksXG4gICAgMHhFNDYzOiAweDgxRDgsXG4gICAgMHhFNDY0OiAweDgxQzgsXG4gICAgMHhFNDY1OiAweDgxREEsXG4gICAgMHhFNDY2OiAweDgxREYsXG4gICAgMHhFNDY3OiAweDgxRTAsXG4gICAgMHhFNDY4OiAweDgxRTcsXG4gICAgMHhFNDY5OiAweDgxRkEsXG4gICAgMHhFNDZBOiAweDgxRkIsXG4gICAgMHhFNDZCOiAweDgxRkUsXG4gICAgMHhFNDZDOiAweDgyMDEsXG4gICAgMHhFNDZEOiAweDgyMDIsXG4gICAgMHhFNDZFOiAweDgyMDUsXG4gICAgMHhFNDZGOiAweDgyMDcsXG4gICAgMHhFNDcwOiAweDgyMEEsXG4gICAgMHhFNDcxOiAweDgyMEQsXG4gICAgMHhFNDcyOiAweDgyMTAsXG4gICAgMHhFNDczOiAweDgyMTYsXG4gICAgMHhFNDc0OiAweDgyMjksXG4gICAgMHhFNDc1OiAweDgyMkIsXG4gICAgMHhFNDc2OiAweDgyMzgsXG4gICAgMHhFNDc3OiAweDgyMzMsXG4gICAgMHhFNDc4OiAweDgyNDAsXG4gICAgMHhFNDc5OiAweDgyNTksXG4gICAgMHhFNDdBOiAweDgyNTgsXG4gICAgMHhFNDdCOiAweDgyNUQsXG4gICAgMHhFNDdDOiAweDgyNUEsXG4gICAgMHhFNDdEOiAweDgyNUYsXG4gICAgMHhFNDdFOiAweDgyNjQsXG4gICAgMHhFNDgwOiAweDgyNjIsXG4gICAgMHhFNDgxOiAweDgyNjgsXG4gICAgMHhFNDgyOiAweDgyNkEsXG4gICAgMHhFNDgzOiAweDgyNkIsXG4gICAgMHhFNDg0OiAweDgyMkUsXG4gICAgMHhFNDg1OiAweDgyNzEsXG4gICAgMHhFNDg2OiAweDgyNzcsXG4gICAgMHhFNDg3OiAweDgyNzgsXG4gICAgMHhFNDg4OiAweDgyN0UsXG4gICAgMHhFNDg5OiAweDgyOEQsXG4gICAgMHhFNDhBOiAweDgyOTIsXG4gICAgMHhFNDhCOiAweDgyQUIsXG4gICAgMHhFNDhDOiAweDgyOUYsXG4gICAgMHhFNDhEOiAweDgyQkIsXG4gICAgMHhFNDhFOiAweDgyQUMsXG4gICAgMHhFNDhGOiAweDgyRTEsXG4gICAgMHhFNDkwOiAweDgyRTMsXG4gICAgMHhFNDkxOiAweDgyREYsXG4gICAgMHhFNDkyOiAweDgyRDIsXG4gICAgMHhFNDkzOiAweDgyRjQsXG4gICAgMHhFNDk0OiAweDgyRjMsXG4gICAgMHhFNDk1OiAweDgyRkEsXG4gICAgMHhFNDk2OiAweDgzOTMsXG4gICAgMHhFNDk3OiAweDgzMDMsXG4gICAgMHhFNDk4OiAweDgyRkIsXG4gICAgMHhFNDk5OiAweDgyRjksXG4gICAgMHhFNDlBOiAweDgyREUsXG4gICAgMHhFNDlCOiAweDgzMDYsXG4gICAgMHhFNDlDOiAweDgyREMsXG4gICAgMHhFNDlEOiAweDgzMDksXG4gICAgMHhFNDlFOiAweDgyRDksXG4gICAgMHhFNDlGOiAweDgzMzUsXG4gICAgMHhFNEEwOiAweDgzMzQsXG4gICAgMHhFNEExOiAweDgzMTYsXG4gICAgMHhFNEEyOiAweDgzMzIsXG4gICAgMHhFNEEzOiAweDgzMzEsXG4gICAgMHhFNEE0OiAweDgzNDAsXG4gICAgMHhFNEE1OiAweDgzMzksXG4gICAgMHhFNEE2OiAweDgzNTAsXG4gICAgMHhFNEE3OiAweDgzNDUsXG4gICAgMHhFNEE4OiAweDgzMkYsXG4gICAgMHhFNEE5OiAweDgzMkIsXG4gICAgMHhFNEFBOiAweDgzMTcsXG4gICAgMHhFNEFCOiAweDgzMTgsXG4gICAgMHhFNEFDOiAweDgzODUsXG4gICAgMHhFNEFEOiAweDgzOUEsXG4gICAgMHhFNEFFOiAweDgzQUEsXG4gICAgMHhFNEFGOiAweDgzOUYsXG4gICAgMHhFNEIwOiAweDgzQTIsXG4gICAgMHhFNEIxOiAweDgzOTYsXG4gICAgMHhFNEIyOiAweDgzMjMsXG4gICAgMHhFNEIzOiAweDgzOEUsXG4gICAgMHhFNEI0OiAweDgzODcsXG4gICAgMHhFNEI1OiAweDgzOEEsXG4gICAgMHhFNEI2OiAweDgzN0MsXG4gICAgMHhFNEI3OiAweDgzQjUsXG4gICAgMHhFNEI4OiAweDgzNzMsXG4gICAgMHhFNEI5OiAweDgzNzUsXG4gICAgMHhFNEJBOiAweDgzQTAsXG4gICAgMHhFNEJCOiAweDgzODksXG4gICAgMHhFNEJDOiAweDgzQTgsXG4gICAgMHhFNEJEOiAweDgzRjQsXG4gICAgMHhFNEJFOiAweDg0MTMsXG4gICAgMHhFNEJGOiAweDgzRUIsXG4gICAgMHhFNEMwOiAweDgzQ0UsXG4gICAgMHhFNEMxOiAweDgzRkQsXG4gICAgMHhFNEMyOiAweDg0MDMsXG4gICAgMHhFNEMzOiAweDgzRDgsXG4gICAgMHhFNEM0OiAweDg0MEIsXG4gICAgMHhFNEM1OiAweDgzQzEsXG4gICAgMHhFNEM2OiAweDgzRjcsXG4gICAgMHhFNEM3OiAweDg0MDcsXG4gICAgMHhFNEM4OiAweDgzRTAsXG4gICAgMHhFNEM5OiAweDgzRjIsXG4gICAgMHhFNENBOiAweDg0MEQsXG4gICAgMHhFNENCOiAweDg0MjIsXG4gICAgMHhFNENDOiAweDg0MjAsXG4gICAgMHhFNENEOiAweDgzQkQsXG4gICAgMHhFNENFOiAweDg0MzgsXG4gICAgMHhFNENGOiAweDg1MDYsXG4gICAgMHhFNEQwOiAweDgzRkIsXG4gICAgMHhFNEQxOiAweDg0NkQsXG4gICAgMHhFNEQyOiAweDg0MkEsXG4gICAgMHhFNEQzOiAweDg0M0MsXG4gICAgMHhFNEQ0OiAweDg1NUEsXG4gICAgMHhFNEQ1OiAweDg0ODQsXG4gICAgMHhFNEQ2OiAweDg0NzcsXG4gICAgMHhFNEQ3OiAweDg0NkIsXG4gICAgMHhFNEQ4OiAweDg0QUQsXG4gICAgMHhFNEQ5OiAweDg0NkUsXG4gICAgMHhFNERBOiAweDg0ODIsXG4gICAgMHhFNERCOiAweDg0NjksXG4gICAgMHhFNERDOiAweDg0NDYsXG4gICAgMHhFNEREOiAweDg0MkMsXG4gICAgMHhFNERFOiAweDg0NkYsXG4gICAgMHhFNERGOiAweDg0NzksXG4gICAgMHhFNEUwOiAweDg0MzUsXG4gICAgMHhFNEUxOiAweDg0Q0EsXG4gICAgMHhFNEUyOiAweDg0NjIsXG4gICAgMHhFNEUzOiAweDg0QjksXG4gICAgMHhFNEU0OiAweDg0QkYsXG4gICAgMHhFNEU1OiAweDg0OUYsXG4gICAgMHhFNEU2OiAweDg0RDksXG4gICAgMHhFNEU3OiAweDg0Q0QsXG4gICAgMHhFNEU4OiAweDg0QkIsXG4gICAgMHhFNEU5OiAweDg0REEsXG4gICAgMHhFNEVBOiAweDg0RDAsXG4gICAgMHhFNEVCOiAweDg0QzEsXG4gICAgMHhFNEVDOiAweDg0QzYsXG4gICAgMHhFNEVEOiAweDg0RDYsXG4gICAgMHhFNEVFOiAweDg0QTEsXG4gICAgMHhFNEVGOiAweDg1MjEsXG4gICAgMHhFNEYwOiAweDg0RkYsXG4gICAgMHhFNEYxOiAweDg0RjQsXG4gICAgMHhFNEYyOiAweDg1MTcsXG4gICAgMHhFNEYzOiAweDg1MTgsXG4gICAgMHhFNEY0OiAweDg1MkMsXG4gICAgMHhFNEY1OiAweDg1MUYsXG4gICAgMHhFNEY2OiAweDg1MTUsXG4gICAgMHhFNEY3OiAweDg1MTQsXG4gICAgMHhFNEY4OiAweDg0RkMsXG4gICAgMHhFNEY5OiAweDg1NDAsXG4gICAgMHhFNEZBOiAweDg1NjMsXG4gICAgMHhFNEZCOiAweDg1NTgsXG4gICAgMHhFNEZDOiAweDg1NDgsXG4gICAgMHhFNTQwOiAweDg1NDEsXG4gICAgMHhFNTQxOiAweDg2MDIsXG4gICAgMHhFNTQyOiAweDg1NEIsXG4gICAgMHhFNTQzOiAweDg1NTUsXG4gICAgMHhFNTQ0OiAweDg1ODAsXG4gICAgMHhFNTQ1OiAweDg1QTQsXG4gICAgMHhFNTQ2OiAweDg1ODgsXG4gICAgMHhFNTQ3OiAweDg1OTEsXG4gICAgMHhFNTQ4OiAweDg1OEEsXG4gICAgMHhFNTQ5OiAweDg1QTgsXG4gICAgMHhFNTRBOiAweDg1NkQsXG4gICAgMHhFNTRCOiAweDg1OTQsXG4gICAgMHhFNTRDOiAweDg1OUIsXG4gICAgMHhFNTREOiAweDg1RUEsXG4gICAgMHhFNTRFOiAweDg1ODcsXG4gICAgMHhFNTRGOiAweDg1OUMsXG4gICAgMHhFNTUwOiAweDg1NzcsXG4gICAgMHhFNTUxOiAweDg1N0UsXG4gICAgMHhFNTUyOiAweDg1OTAsXG4gICAgMHhFNTUzOiAweDg1QzksXG4gICAgMHhFNTU0OiAweDg1QkEsXG4gICAgMHhFNTU1OiAweDg1Q0YsXG4gICAgMHhFNTU2OiAweDg1QjksXG4gICAgMHhFNTU3OiAweDg1RDAsXG4gICAgMHhFNTU4OiAweDg1RDUsXG4gICAgMHhFNTU5OiAweDg1REQsXG4gICAgMHhFNTVBOiAweDg1RTUsXG4gICAgMHhFNTVCOiAweDg1REMsXG4gICAgMHhFNTVDOiAweDg1RjksXG4gICAgMHhFNTVEOiAweDg2MEEsXG4gICAgMHhFNTVFOiAweDg2MTMsXG4gICAgMHhFNTVGOiAweDg2MEIsXG4gICAgMHhFNTYwOiAweDg1RkUsXG4gICAgMHhFNTYxOiAweDg1RkEsXG4gICAgMHhFNTYyOiAweDg2MDYsXG4gICAgMHhFNTYzOiAweDg2MjIsXG4gICAgMHhFNTY0OiAweDg2MUEsXG4gICAgMHhFNTY1OiAweDg2MzAsXG4gICAgMHhFNTY2OiAweDg2M0YsXG4gICAgMHhFNTY3OiAweDg2NEQsXG4gICAgMHhFNTY4OiAweDRFNTUsXG4gICAgMHhFNTY5OiAweDg2NTQsXG4gICAgMHhFNTZBOiAweDg2NUYsXG4gICAgMHhFNTZCOiAweDg2NjcsXG4gICAgMHhFNTZDOiAweDg2NzEsXG4gICAgMHhFNTZEOiAweDg2OTMsXG4gICAgMHhFNTZFOiAweDg2QTMsXG4gICAgMHhFNTZGOiAweDg2QTksXG4gICAgMHhFNTcwOiAweDg2QUEsXG4gICAgMHhFNTcxOiAweDg2OEIsXG4gICAgMHhFNTcyOiAweDg2OEMsXG4gICAgMHhFNTczOiAweDg2QjYsXG4gICAgMHhFNTc0OiAweDg2QUYsXG4gICAgMHhFNTc1OiAweDg2QzQsXG4gICAgMHhFNTc2OiAweDg2QzYsXG4gICAgMHhFNTc3OiAweDg2QjAsXG4gICAgMHhFNTc4OiAweDg2QzksXG4gICAgMHhFNTc5OiAweDg4MjMsXG4gICAgMHhFNTdBOiAweDg2QUIsXG4gICAgMHhFNTdCOiAweDg2RDQsXG4gICAgMHhFNTdDOiAweDg2REUsXG4gICAgMHhFNTdEOiAweDg2RTksXG4gICAgMHhFNTdFOiAweDg2RUMsXG4gICAgMHhFNTgwOiAweDg2REYsXG4gICAgMHhFNTgxOiAweDg2REIsXG4gICAgMHhFNTgyOiAweDg2RUYsXG4gICAgMHhFNTgzOiAweDg3MTIsXG4gICAgMHhFNTg0OiAweDg3MDYsXG4gICAgMHhFNTg1OiAweDg3MDgsXG4gICAgMHhFNTg2OiAweDg3MDAsXG4gICAgMHhFNTg3OiAweDg3MDMsXG4gICAgMHhFNTg4OiAweDg2RkIsXG4gICAgMHhFNTg5OiAweDg3MTEsXG4gICAgMHhFNThBOiAweDg3MDksXG4gICAgMHhFNThCOiAweDg3MEQsXG4gICAgMHhFNThDOiAweDg2RjksXG4gICAgMHhFNThEOiAweDg3MEEsXG4gICAgMHhFNThFOiAweDg3MzQsXG4gICAgMHhFNThGOiAweDg3M0YsXG4gICAgMHhFNTkwOiAweDg3MzcsXG4gICAgMHhFNTkxOiAweDg3M0IsXG4gICAgMHhFNTkyOiAweDg3MjUsXG4gICAgMHhFNTkzOiAweDg3MjksXG4gICAgMHhFNTk0OiAweDg3MUEsXG4gICAgMHhFNTk1OiAweDg3NjAsXG4gICAgMHhFNTk2OiAweDg3NUYsXG4gICAgMHhFNTk3OiAweDg3NzgsXG4gICAgMHhFNTk4OiAweDg3NEMsXG4gICAgMHhFNTk5OiAweDg3NEUsXG4gICAgMHhFNTlBOiAweDg3NzQsXG4gICAgMHhFNTlCOiAweDg3NTcsXG4gICAgMHhFNTlDOiAweDg3NjgsXG4gICAgMHhFNTlEOiAweDg3NkUsXG4gICAgMHhFNTlFOiAweDg3NTksXG4gICAgMHhFNTlGOiAweDg3NTMsXG4gICAgMHhFNUEwOiAweDg3NjMsXG4gICAgMHhFNUExOiAweDg3NkEsXG4gICAgMHhFNUEyOiAweDg4MDUsXG4gICAgMHhFNUEzOiAweDg3QTIsXG4gICAgMHhFNUE0OiAweDg3OUYsXG4gICAgMHhFNUE1OiAweDg3ODIsXG4gICAgMHhFNUE2OiAweDg3QUYsXG4gICAgMHhFNUE3OiAweDg3Q0IsXG4gICAgMHhFNUE4OiAweDg3QkQsXG4gICAgMHhFNUE5OiAweDg3QzAsXG4gICAgMHhFNUFBOiAweDg3RDAsXG4gICAgMHhFNUFCOiAweDk2RDYsXG4gICAgMHhFNUFDOiAweDg3QUIsXG4gICAgMHhFNUFEOiAweDg3QzQsXG4gICAgMHhFNUFFOiAweDg3QjMsXG4gICAgMHhFNUFGOiAweDg3QzcsXG4gICAgMHhFNUIwOiAweDg3QzYsXG4gICAgMHhFNUIxOiAweDg3QkIsXG4gICAgMHhFNUIyOiAweDg3RUYsXG4gICAgMHhFNUIzOiAweDg3RjIsXG4gICAgMHhFNUI0OiAweDg3RTAsXG4gICAgMHhFNUI1OiAweDg4MEYsXG4gICAgMHhFNUI2OiAweDg4MEQsXG4gICAgMHhFNUI3OiAweDg3RkUsXG4gICAgMHhFNUI4OiAweDg3RjYsXG4gICAgMHhFNUI5OiAweDg3RjcsXG4gICAgMHhFNUJBOiAweDg4MEUsXG4gICAgMHhFNUJCOiAweDg3RDIsXG4gICAgMHhFNUJDOiAweDg4MTEsXG4gICAgMHhFNUJEOiAweDg4MTYsXG4gICAgMHhFNUJFOiAweDg4MTUsXG4gICAgMHhFNUJGOiAweDg4MjIsXG4gICAgMHhFNUMwOiAweDg4MjEsXG4gICAgMHhFNUMxOiAweDg4MzEsXG4gICAgMHhFNUMyOiAweDg4MzYsXG4gICAgMHhFNUMzOiAweDg4MzksXG4gICAgMHhFNUM0OiAweDg4MjcsXG4gICAgMHhFNUM1OiAweDg4M0IsXG4gICAgMHhFNUM2OiAweDg4NDQsXG4gICAgMHhFNUM3OiAweDg4NDIsXG4gICAgMHhFNUM4OiAweDg4NTIsXG4gICAgMHhFNUM5OiAweDg4NTksXG4gICAgMHhFNUNBOiAweDg4NUUsXG4gICAgMHhFNUNCOiAweDg4NjIsXG4gICAgMHhFNUNDOiAweDg4NkIsXG4gICAgMHhFNUNEOiAweDg4ODEsXG4gICAgMHhFNUNFOiAweDg4N0UsXG4gICAgMHhFNUNGOiAweDg4OUUsXG4gICAgMHhFNUQwOiAweDg4NzUsXG4gICAgMHhFNUQxOiAweDg4N0QsXG4gICAgMHhFNUQyOiAweDg4QjUsXG4gICAgMHhFNUQzOiAweDg4NzIsXG4gICAgMHhFNUQ0OiAweDg4ODIsXG4gICAgMHhFNUQ1OiAweDg4OTcsXG4gICAgMHhFNUQ2OiAweDg4OTIsXG4gICAgMHhFNUQ3OiAweDg4QUUsXG4gICAgMHhFNUQ4OiAweDg4OTksXG4gICAgMHhFNUQ5OiAweDg4QTIsXG4gICAgMHhFNURBOiAweDg4OEQsXG4gICAgMHhFNURCOiAweDg4QTQsXG4gICAgMHhFNURDOiAweDg4QjAsXG4gICAgMHhFNUREOiAweDg4QkYsXG4gICAgMHhFNURFOiAweDg4QjEsXG4gICAgMHhFNURGOiAweDg4QzMsXG4gICAgMHhFNUUwOiAweDg4QzQsXG4gICAgMHhFNUUxOiAweDg4RDQsXG4gICAgMHhFNUUyOiAweDg4RDgsXG4gICAgMHhFNUUzOiAweDg4RDksXG4gICAgMHhFNUU0OiAweDg4REQsXG4gICAgMHhFNUU1OiAweDg4RjksXG4gICAgMHhFNUU2OiAweDg5MDIsXG4gICAgMHhFNUU3OiAweDg4RkMsXG4gICAgMHhFNUU4OiAweDg4RjQsXG4gICAgMHhFNUU5OiAweDg4RTgsXG4gICAgMHhFNUVBOiAweDg4RjIsXG4gICAgMHhFNUVCOiAweDg5MDQsXG4gICAgMHhFNUVDOiAweDg5MEMsXG4gICAgMHhFNUVEOiAweDg5MEEsXG4gICAgMHhFNUVFOiAweDg5MTMsXG4gICAgMHhFNUVGOiAweDg5NDMsXG4gICAgMHhFNUYwOiAweDg5MUUsXG4gICAgMHhFNUYxOiAweDg5MjUsXG4gICAgMHhFNUYyOiAweDg5MkEsXG4gICAgMHhFNUYzOiAweDg5MkIsXG4gICAgMHhFNUY0OiAweDg5NDEsXG4gICAgMHhFNUY1OiAweDg5NDQsXG4gICAgMHhFNUY2OiAweDg5M0IsXG4gICAgMHhFNUY3OiAweDg5MzYsXG4gICAgMHhFNUY4OiAweDg5MzgsXG4gICAgMHhFNUY5OiAweDg5NEMsXG4gICAgMHhFNUZBOiAweDg5MUQsXG4gICAgMHhFNUZCOiAweDg5NjAsXG4gICAgMHhFNUZDOiAweDg5NUUsXG4gICAgMHhFNjQwOiAweDg5NjYsXG4gICAgMHhFNjQxOiAweDg5NjQsXG4gICAgMHhFNjQyOiAweDg5NkQsXG4gICAgMHhFNjQzOiAweDg5NkEsXG4gICAgMHhFNjQ0OiAweDg5NkYsXG4gICAgMHhFNjQ1OiAweDg5NzQsXG4gICAgMHhFNjQ2OiAweDg5NzcsXG4gICAgMHhFNjQ3OiAweDg5N0UsXG4gICAgMHhFNjQ4OiAweDg5ODMsXG4gICAgMHhFNjQ5OiAweDg5ODgsXG4gICAgMHhFNjRBOiAweDg5OEEsXG4gICAgMHhFNjRCOiAweDg5OTMsXG4gICAgMHhFNjRDOiAweDg5OTgsXG4gICAgMHhFNjREOiAweDg5QTEsXG4gICAgMHhFNjRFOiAweDg5QTksXG4gICAgMHhFNjRGOiAweDg5QTYsXG4gICAgMHhFNjUwOiAweDg5QUMsXG4gICAgMHhFNjUxOiAweDg5QUYsXG4gICAgMHhFNjUyOiAweDg5QjIsXG4gICAgMHhFNjUzOiAweDg5QkEsXG4gICAgMHhFNjU0OiAweDg5QkQsXG4gICAgMHhFNjU1OiAweDg5QkYsXG4gICAgMHhFNjU2OiAweDg5QzAsXG4gICAgMHhFNjU3OiAweDg5REEsXG4gICAgMHhFNjU4OiAweDg5REMsXG4gICAgMHhFNjU5OiAweDg5REQsXG4gICAgMHhFNjVBOiAweDg5RTcsXG4gICAgMHhFNjVCOiAweDg5RjQsXG4gICAgMHhFNjVDOiAweDg5RjgsXG4gICAgMHhFNjVEOiAweDhBMDMsXG4gICAgMHhFNjVFOiAweDhBMTYsXG4gICAgMHhFNjVGOiAweDhBMTAsXG4gICAgMHhFNjYwOiAweDhBMEMsXG4gICAgMHhFNjYxOiAweDhBMUIsXG4gICAgMHhFNjYyOiAweDhBMUQsXG4gICAgMHhFNjYzOiAweDhBMjUsXG4gICAgMHhFNjY0OiAweDhBMzYsXG4gICAgMHhFNjY1OiAweDhBNDEsXG4gICAgMHhFNjY2OiAweDhBNUIsXG4gICAgMHhFNjY3OiAweDhBNTIsXG4gICAgMHhFNjY4OiAweDhBNDYsXG4gICAgMHhFNjY5OiAweDhBNDgsXG4gICAgMHhFNjZBOiAweDhBN0MsXG4gICAgMHhFNjZCOiAweDhBNkQsXG4gICAgMHhFNjZDOiAweDhBNkMsXG4gICAgMHhFNjZEOiAweDhBNjIsXG4gICAgMHhFNjZFOiAweDhBODUsXG4gICAgMHhFNjZGOiAweDhBODIsXG4gICAgMHhFNjcwOiAweDhBODQsXG4gICAgMHhFNjcxOiAweDhBQTgsXG4gICAgMHhFNjcyOiAweDhBQTEsXG4gICAgMHhFNjczOiAweDhBOTEsXG4gICAgMHhFNjc0OiAweDhBQTUsXG4gICAgMHhFNjc1OiAweDhBQTYsXG4gICAgMHhFNjc2OiAweDhBOUEsXG4gICAgMHhFNjc3OiAweDhBQTMsXG4gICAgMHhFNjc4OiAweDhBQzQsXG4gICAgMHhFNjc5OiAweDhBQ0QsXG4gICAgMHhFNjdBOiAweDhBQzIsXG4gICAgMHhFNjdCOiAweDhBREEsXG4gICAgMHhFNjdDOiAweDhBRUIsXG4gICAgMHhFNjdEOiAweDhBRjMsXG4gICAgMHhFNjdFOiAweDhBRTcsXG4gICAgMHhFNjgwOiAweDhBRTQsXG4gICAgMHhFNjgxOiAweDhBRjEsXG4gICAgMHhFNjgyOiAweDhCMTQsXG4gICAgMHhFNjgzOiAweDhBRTAsXG4gICAgMHhFNjg0OiAweDhBRTIsXG4gICAgMHhFNjg1OiAweDhBRjcsXG4gICAgMHhFNjg2OiAweDhBREUsXG4gICAgMHhFNjg3OiAweDhBREIsXG4gICAgMHhFNjg4OiAweDhCMEMsXG4gICAgMHhFNjg5OiAweDhCMDcsXG4gICAgMHhFNjhBOiAweDhCMUEsXG4gICAgMHhFNjhCOiAweDhBRTEsXG4gICAgMHhFNjhDOiAweDhCMTYsXG4gICAgMHhFNjhEOiAweDhCMTAsXG4gICAgMHhFNjhFOiAweDhCMTcsXG4gICAgMHhFNjhGOiAweDhCMjAsXG4gICAgMHhFNjkwOiAweDhCMzMsXG4gICAgMHhFNjkxOiAweDk3QUIsXG4gICAgMHhFNjkyOiAweDhCMjYsXG4gICAgMHhFNjkzOiAweDhCMkIsXG4gICAgMHhFNjk0OiAweDhCM0UsXG4gICAgMHhFNjk1OiAweDhCMjgsXG4gICAgMHhFNjk2OiAweDhCNDEsXG4gICAgMHhFNjk3OiAweDhCNEMsXG4gICAgMHhFNjk4OiAweDhCNEYsXG4gICAgMHhFNjk5OiAweDhCNEUsXG4gICAgMHhFNjlBOiAweDhCNDksXG4gICAgMHhFNjlCOiAweDhCNTYsXG4gICAgMHhFNjlDOiAweDhCNUIsXG4gICAgMHhFNjlEOiAweDhCNUEsXG4gICAgMHhFNjlFOiAweDhCNkIsXG4gICAgMHhFNjlGOiAweDhCNUYsXG4gICAgMHhFNkEwOiAweDhCNkMsXG4gICAgMHhFNkExOiAweDhCNkYsXG4gICAgMHhFNkEyOiAweDhCNzQsXG4gICAgMHhFNkEzOiAweDhCN0QsXG4gICAgMHhFNkE0OiAweDhCODAsXG4gICAgMHhFNkE1OiAweDhCOEMsXG4gICAgMHhFNkE2OiAweDhCOEUsXG4gICAgMHhFNkE3OiAweDhCOTIsXG4gICAgMHhFNkE4OiAweDhCOTMsXG4gICAgMHhFNkE5OiAweDhCOTYsXG4gICAgMHhFNkFBOiAweDhCOTksXG4gICAgMHhFNkFCOiAweDhCOUEsXG4gICAgMHhFNkFDOiAweDhDM0EsXG4gICAgMHhFNkFEOiAweDhDNDEsXG4gICAgMHhFNkFFOiAweDhDM0YsXG4gICAgMHhFNkFGOiAweDhDNDgsXG4gICAgMHhFNkIwOiAweDhDNEMsXG4gICAgMHhFNkIxOiAweDhDNEUsXG4gICAgMHhFNkIyOiAweDhDNTAsXG4gICAgMHhFNkIzOiAweDhDNTUsXG4gICAgMHhFNkI0OiAweDhDNjIsXG4gICAgMHhFNkI1OiAweDhDNkMsXG4gICAgMHhFNkI2OiAweDhDNzgsXG4gICAgMHhFNkI3OiAweDhDN0EsXG4gICAgMHhFNkI4OiAweDhDODIsXG4gICAgMHhFNkI5OiAweDhDODksXG4gICAgMHhFNkJBOiAweDhDODUsXG4gICAgMHhFNkJCOiAweDhDOEEsXG4gICAgMHhFNkJDOiAweDhDOEQsXG4gICAgMHhFNkJEOiAweDhDOEUsXG4gICAgMHhFNkJFOiAweDhDOTQsXG4gICAgMHhFNkJGOiAweDhDN0MsXG4gICAgMHhFNkMwOiAweDhDOTgsXG4gICAgMHhFNkMxOiAweDYyMUQsXG4gICAgMHhFNkMyOiAweDhDQUQsXG4gICAgMHhFNkMzOiAweDhDQUEsXG4gICAgMHhFNkM0OiAweDhDQkQsXG4gICAgMHhFNkM1OiAweDhDQjIsXG4gICAgMHhFNkM2OiAweDhDQjMsXG4gICAgMHhFNkM3OiAweDhDQUUsXG4gICAgMHhFNkM4OiAweDhDQjYsXG4gICAgMHhFNkM5OiAweDhDQzgsXG4gICAgMHhFNkNBOiAweDhDQzEsXG4gICAgMHhFNkNCOiAweDhDRTQsXG4gICAgMHhFNkNDOiAweDhDRTMsXG4gICAgMHhFNkNEOiAweDhDREEsXG4gICAgMHhFNkNFOiAweDhDRkQsXG4gICAgMHhFNkNGOiAweDhDRkEsXG4gICAgMHhFNkQwOiAweDhDRkIsXG4gICAgMHhFNkQxOiAweDhEMDQsXG4gICAgMHhFNkQyOiAweDhEMDUsXG4gICAgMHhFNkQzOiAweDhEMEEsXG4gICAgMHhFNkQ0OiAweDhEMDcsXG4gICAgMHhFNkQ1OiAweDhEMEYsXG4gICAgMHhFNkQ2OiAweDhEMEQsXG4gICAgMHhFNkQ3OiAweDhEMTAsXG4gICAgMHhFNkQ4OiAweDlGNEUsXG4gICAgMHhFNkQ5OiAweDhEMTMsXG4gICAgMHhFNkRBOiAweDhDQ0QsXG4gICAgMHhFNkRCOiAweDhEMTQsXG4gICAgMHhFNkRDOiAweDhEMTYsXG4gICAgMHhFNkREOiAweDhENjcsXG4gICAgMHhFNkRFOiAweDhENkQsXG4gICAgMHhFNkRGOiAweDhENzEsXG4gICAgMHhFNkUwOiAweDhENzMsXG4gICAgMHhFNkUxOiAweDhEODEsXG4gICAgMHhFNkUyOiAweDhEOTksXG4gICAgMHhFNkUzOiAweDhEQzIsXG4gICAgMHhFNkU0OiAweDhEQkUsXG4gICAgMHhFNkU1OiAweDhEQkEsXG4gICAgMHhFNkU2OiAweDhEQ0YsXG4gICAgMHhFNkU3OiAweDhEREEsXG4gICAgMHhFNkU4OiAweDhERDYsXG4gICAgMHhFNkU5OiAweDhEQ0MsXG4gICAgMHhFNkVBOiAweDhEREIsXG4gICAgMHhFNkVCOiAweDhEQ0IsXG4gICAgMHhFNkVDOiAweDhERUEsXG4gICAgMHhFNkVEOiAweDhERUIsXG4gICAgMHhFNkVFOiAweDhEREYsXG4gICAgMHhFNkVGOiAweDhERTMsXG4gICAgMHhFNkYwOiAweDhERkMsXG4gICAgMHhFNkYxOiAweDhFMDgsXG4gICAgMHhFNkYyOiAweDhFMDksXG4gICAgMHhFNkYzOiAweDhERkYsXG4gICAgMHhFNkY0OiAweDhFMUQsXG4gICAgMHhFNkY1OiAweDhFMUUsXG4gICAgMHhFNkY2OiAweDhFMTAsXG4gICAgMHhFNkY3OiAweDhFMUYsXG4gICAgMHhFNkY4OiAweDhFNDIsXG4gICAgMHhFNkY5OiAweDhFMzUsXG4gICAgMHhFNkZBOiAweDhFMzAsXG4gICAgMHhFNkZCOiAweDhFMzQsXG4gICAgMHhFNkZDOiAweDhFNEEsXG4gICAgMHhFNzQwOiAweDhFNDcsXG4gICAgMHhFNzQxOiAweDhFNDksXG4gICAgMHhFNzQyOiAweDhFNEMsXG4gICAgMHhFNzQzOiAweDhFNTAsXG4gICAgMHhFNzQ0OiAweDhFNDgsXG4gICAgMHhFNzQ1OiAweDhFNTksXG4gICAgMHhFNzQ2OiAweDhFNjQsXG4gICAgMHhFNzQ3OiAweDhFNjAsXG4gICAgMHhFNzQ4OiAweDhFMkEsXG4gICAgMHhFNzQ5OiAweDhFNjMsXG4gICAgMHhFNzRBOiAweDhFNTUsXG4gICAgMHhFNzRCOiAweDhFNzYsXG4gICAgMHhFNzRDOiAweDhFNzIsXG4gICAgMHhFNzREOiAweDhFN0MsXG4gICAgMHhFNzRFOiAweDhFODEsXG4gICAgMHhFNzRGOiAweDhFODcsXG4gICAgMHhFNzUwOiAweDhFODUsXG4gICAgMHhFNzUxOiAweDhFODQsXG4gICAgMHhFNzUyOiAweDhFOEIsXG4gICAgMHhFNzUzOiAweDhFOEEsXG4gICAgMHhFNzU0OiAweDhFOTMsXG4gICAgMHhFNzU1OiAweDhFOTEsXG4gICAgMHhFNzU2OiAweDhFOTQsXG4gICAgMHhFNzU3OiAweDhFOTksXG4gICAgMHhFNzU4OiAweDhFQUEsXG4gICAgMHhFNzU5OiAweDhFQTEsXG4gICAgMHhFNzVBOiAweDhFQUMsXG4gICAgMHhFNzVCOiAweDhFQjAsXG4gICAgMHhFNzVDOiAweDhFQzYsXG4gICAgMHhFNzVEOiAweDhFQjEsXG4gICAgMHhFNzVFOiAweDhFQkUsXG4gICAgMHhFNzVGOiAweDhFQzUsXG4gICAgMHhFNzYwOiAweDhFQzgsXG4gICAgMHhFNzYxOiAweDhFQ0IsXG4gICAgMHhFNzYyOiAweDhFREIsXG4gICAgMHhFNzYzOiAweDhFRTMsXG4gICAgMHhFNzY0OiAweDhFRkMsXG4gICAgMHhFNzY1OiAweDhFRkIsXG4gICAgMHhFNzY2OiAweDhFRUIsXG4gICAgMHhFNzY3OiAweDhFRkUsXG4gICAgMHhFNzY4OiAweDhGMEEsXG4gICAgMHhFNzY5OiAweDhGMDUsXG4gICAgMHhFNzZBOiAweDhGMTUsXG4gICAgMHhFNzZCOiAweDhGMTIsXG4gICAgMHhFNzZDOiAweDhGMTksXG4gICAgMHhFNzZEOiAweDhGMTMsXG4gICAgMHhFNzZFOiAweDhGMUMsXG4gICAgMHhFNzZGOiAweDhGMUYsXG4gICAgMHhFNzcwOiAweDhGMUIsXG4gICAgMHhFNzcxOiAweDhGMEMsXG4gICAgMHhFNzcyOiAweDhGMjYsXG4gICAgMHhFNzczOiAweDhGMzMsXG4gICAgMHhFNzc0OiAweDhGM0IsXG4gICAgMHhFNzc1OiAweDhGMzksXG4gICAgMHhFNzc2OiAweDhGNDUsXG4gICAgMHhFNzc3OiAweDhGNDIsXG4gICAgMHhFNzc4OiAweDhGM0UsXG4gICAgMHhFNzc5OiAweDhGNEMsXG4gICAgMHhFNzdBOiAweDhGNDksXG4gICAgMHhFNzdCOiAweDhGNDYsXG4gICAgMHhFNzdDOiAweDhGNEUsXG4gICAgMHhFNzdEOiAweDhGNTcsXG4gICAgMHhFNzdFOiAweDhGNUMsXG4gICAgMHhFNzgwOiAweDhGNjIsXG4gICAgMHhFNzgxOiAweDhGNjMsXG4gICAgMHhFNzgyOiAweDhGNjQsXG4gICAgMHhFNzgzOiAweDhGOUMsXG4gICAgMHhFNzg0OiAweDhGOUYsXG4gICAgMHhFNzg1OiAweDhGQTMsXG4gICAgMHhFNzg2OiAweDhGQUQsXG4gICAgMHhFNzg3OiAweDhGQUYsXG4gICAgMHhFNzg4OiAweDhGQjcsXG4gICAgMHhFNzg5OiAweDhGREEsXG4gICAgMHhFNzhBOiAweDhGRTUsXG4gICAgMHhFNzhCOiAweDhGRTIsXG4gICAgMHhFNzhDOiAweDhGRUEsXG4gICAgMHhFNzhEOiAweDhGRUYsXG4gICAgMHhFNzhFOiAweDkwODcsXG4gICAgMHhFNzhGOiAweDhGRjQsXG4gICAgMHhFNzkwOiAweDkwMDUsXG4gICAgMHhFNzkxOiAweDhGRjksXG4gICAgMHhFNzkyOiAweDhGRkEsXG4gICAgMHhFNzkzOiAweDkwMTEsXG4gICAgMHhFNzk0OiAweDkwMTUsXG4gICAgMHhFNzk1OiAweDkwMjEsXG4gICAgMHhFNzk2OiAweDkwMEQsXG4gICAgMHhFNzk3OiAweDkwMUUsXG4gICAgMHhFNzk4OiAweDkwMTYsXG4gICAgMHhFNzk5OiAweDkwMEIsXG4gICAgMHhFNzlBOiAweDkwMjcsXG4gICAgMHhFNzlCOiAweDkwMzYsXG4gICAgMHhFNzlDOiAweDkwMzUsXG4gICAgMHhFNzlEOiAweDkwMzksXG4gICAgMHhFNzlFOiAweDhGRjgsXG4gICAgMHhFNzlGOiAweDkwNEYsXG4gICAgMHhFN0EwOiAweDkwNTAsXG4gICAgMHhFN0ExOiAweDkwNTEsXG4gICAgMHhFN0EyOiAweDkwNTIsXG4gICAgMHhFN0EzOiAweDkwMEUsXG4gICAgMHhFN0E0OiAweDkwNDksXG4gICAgMHhFN0E1OiAweDkwM0UsXG4gICAgMHhFN0E2OiAweDkwNTYsXG4gICAgMHhFN0E3OiAweDkwNTgsXG4gICAgMHhFN0E4OiAweDkwNUUsXG4gICAgMHhFN0E5OiAweDkwNjgsXG4gICAgMHhFN0FBOiAweDkwNkYsXG4gICAgMHhFN0FCOiAweDkwNzYsXG4gICAgMHhFN0FDOiAweDk2QTgsXG4gICAgMHhFN0FEOiAweDkwNzIsXG4gICAgMHhFN0FFOiAweDkwODIsXG4gICAgMHhFN0FGOiAweDkwN0QsXG4gICAgMHhFN0IwOiAweDkwODEsXG4gICAgMHhFN0IxOiAweDkwODAsXG4gICAgMHhFN0IyOiAweDkwOEEsXG4gICAgMHhFN0IzOiAweDkwODksXG4gICAgMHhFN0I0OiAweDkwOEYsXG4gICAgMHhFN0I1OiAweDkwQTgsXG4gICAgMHhFN0I2OiAweDkwQUYsXG4gICAgMHhFN0I3OiAweDkwQjEsXG4gICAgMHhFN0I4OiAweDkwQjUsXG4gICAgMHhFN0I5OiAweDkwRTIsXG4gICAgMHhFN0JBOiAweDkwRTQsXG4gICAgMHhFN0JCOiAweDYyNDgsXG4gICAgMHhFN0JDOiAweDkwREIsXG4gICAgMHhFN0JEOiAweDkxMDIsXG4gICAgMHhFN0JFOiAweDkxMTIsXG4gICAgMHhFN0JGOiAweDkxMTksXG4gICAgMHhFN0MwOiAweDkxMzIsXG4gICAgMHhFN0MxOiAweDkxMzAsXG4gICAgMHhFN0MyOiAweDkxNEEsXG4gICAgMHhFN0MzOiAweDkxNTYsXG4gICAgMHhFN0M0OiAweDkxNTgsXG4gICAgMHhFN0M1OiAweDkxNjMsXG4gICAgMHhFN0M2OiAweDkxNjUsXG4gICAgMHhFN0M3OiAweDkxNjksXG4gICAgMHhFN0M4OiAweDkxNzMsXG4gICAgMHhFN0M5OiAweDkxNzIsXG4gICAgMHhFN0NBOiAweDkxOEIsXG4gICAgMHhFN0NCOiAweDkxODksXG4gICAgMHhFN0NDOiAweDkxODIsXG4gICAgMHhFN0NEOiAweDkxQTIsXG4gICAgMHhFN0NFOiAweDkxQUIsXG4gICAgMHhFN0NGOiAweDkxQUYsXG4gICAgMHhFN0QwOiAweDkxQUEsXG4gICAgMHhFN0QxOiAweDkxQjUsXG4gICAgMHhFN0QyOiAweDkxQjQsXG4gICAgMHhFN0QzOiAweDkxQkEsXG4gICAgMHhFN0Q0OiAweDkxQzAsXG4gICAgMHhFN0Q1OiAweDkxQzEsXG4gICAgMHhFN0Q2OiAweDkxQzksXG4gICAgMHhFN0Q3OiAweDkxQ0IsXG4gICAgMHhFN0Q4OiAweDkxRDAsXG4gICAgMHhFN0Q5OiAweDkxRDYsXG4gICAgMHhFN0RBOiAweDkxREYsXG4gICAgMHhFN0RCOiAweDkxRTEsXG4gICAgMHhFN0RDOiAweDkxREIsXG4gICAgMHhFN0REOiAweDkxRkMsXG4gICAgMHhFN0RFOiAweDkxRjUsXG4gICAgMHhFN0RGOiAweDkxRjYsXG4gICAgMHhFN0UwOiAweDkyMUUsXG4gICAgMHhFN0UxOiAweDkxRkYsXG4gICAgMHhFN0UyOiAweDkyMTQsXG4gICAgMHhFN0UzOiAweDkyMkMsXG4gICAgMHhFN0U0OiAweDkyMTUsXG4gICAgMHhFN0U1OiAweDkyMTEsXG4gICAgMHhFN0U2OiAweDkyNUUsXG4gICAgMHhFN0U3OiAweDkyNTcsXG4gICAgMHhFN0U4OiAweDkyNDUsXG4gICAgMHhFN0U5OiAweDkyNDksXG4gICAgMHhFN0VBOiAweDkyNjQsXG4gICAgMHhFN0VCOiAweDkyNDgsXG4gICAgMHhFN0VDOiAweDkyOTUsXG4gICAgMHhFN0VEOiAweDkyM0YsXG4gICAgMHhFN0VFOiAweDkyNEIsXG4gICAgMHhFN0VGOiAweDkyNTAsXG4gICAgMHhFN0YwOiAweDkyOUMsXG4gICAgMHhFN0YxOiAweDkyOTYsXG4gICAgMHhFN0YyOiAweDkyOTMsXG4gICAgMHhFN0YzOiAweDkyOUIsXG4gICAgMHhFN0Y0OiAweDkyNUEsXG4gICAgMHhFN0Y1OiAweDkyQ0YsXG4gICAgMHhFN0Y2OiAweDkyQjksXG4gICAgMHhFN0Y3OiAweDkyQjcsXG4gICAgMHhFN0Y4OiAweDkyRTksXG4gICAgMHhFN0Y5OiAweDkzMEYsXG4gICAgMHhFN0ZBOiAweDkyRkEsXG4gICAgMHhFN0ZCOiAweDkzNDQsXG4gICAgMHhFN0ZDOiAweDkzMkUsXG4gICAgMHhFODQwOiAweDkzMTksXG4gICAgMHhFODQxOiAweDkzMjIsXG4gICAgMHhFODQyOiAweDkzMUEsXG4gICAgMHhFODQzOiAweDkzMjMsXG4gICAgMHhFODQ0OiAweDkzM0EsXG4gICAgMHhFODQ1OiAweDkzMzUsXG4gICAgMHhFODQ2OiAweDkzM0IsXG4gICAgMHhFODQ3OiAweDkzNUMsXG4gICAgMHhFODQ4OiAweDkzNjAsXG4gICAgMHhFODQ5OiAweDkzN0MsXG4gICAgMHhFODRBOiAweDkzNkUsXG4gICAgMHhFODRCOiAweDkzNTYsXG4gICAgMHhFODRDOiAweDkzQjAsXG4gICAgMHhFODREOiAweDkzQUMsXG4gICAgMHhFODRFOiAweDkzQUQsXG4gICAgMHhFODRGOiAweDkzOTQsXG4gICAgMHhFODUwOiAweDkzQjksXG4gICAgMHhFODUxOiAweDkzRDYsXG4gICAgMHhFODUyOiAweDkzRDcsXG4gICAgMHhFODUzOiAweDkzRTgsXG4gICAgMHhFODU0OiAweDkzRTUsXG4gICAgMHhFODU1OiAweDkzRDgsXG4gICAgMHhFODU2OiAweDkzQzMsXG4gICAgMHhFODU3OiAweDkzREQsXG4gICAgMHhFODU4OiAweDkzRDAsXG4gICAgMHhFODU5OiAweDkzQzgsXG4gICAgMHhFODVBOiAweDkzRTQsXG4gICAgMHhFODVCOiAweDk0MUEsXG4gICAgMHhFODVDOiAweDk0MTQsXG4gICAgMHhFODVEOiAweDk0MTMsXG4gICAgMHhFODVFOiAweDk0MDMsXG4gICAgMHhFODVGOiAweDk0MDcsXG4gICAgMHhFODYwOiAweDk0MTAsXG4gICAgMHhFODYxOiAweDk0MzYsXG4gICAgMHhFODYyOiAweDk0MkIsXG4gICAgMHhFODYzOiAweDk0MzUsXG4gICAgMHhFODY0OiAweDk0MjEsXG4gICAgMHhFODY1OiAweDk0M0EsXG4gICAgMHhFODY2OiAweDk0NDEsXG4gICAgMHhFODY3OiAweDk0NTIsXG4gICAgMHhFODY4OiAweDk0NDQsXG4gICAgMHhFODY5OiAweDk0NUIsXG4gICAgMHhFODZBOiAweDk0NjAsXG4gICAgMHhFODZCOiAweDk0NjIsXG4gICAgMHhFODZDOiAweDk0NUUsXG4gICAgMHhFODZEOiAweDk0NkEsXG4gICAgMHhFODZFOiAweDkyMjksXG4gICAgMHhFODZGOiAweDk0NzAsXG4gICAgMHhFODcwOiAweDk0NzUsXG4gICAgMHhFODcxOiAweDk0NzcsXG4gICAgMHhFODcyOiAweDk0N0QsXG4gICAgMHhFODczOiAweDk0NUEsXG4gICAgMHhFODc0OiAweDk0N0MsXG4gICAgMHhFODc1OiAweDk0N0UsXG4gICAgMHhFODc2OiAweDk0ODEsXG4gICAgMHhFODc3OiAweDk0N0YsXG4gICAgMHhFODc4OiAweDk1ODIsXG4gICAgMHhFODc5OiAweDk1ODcsXG4gICAgMHhFODdBOiAweDk1OEEsXG4gICAgMHhFODdCOiAweDk1OTQsXG4gICAgMHhFODdDOiAweDk1OTYsXG4gICAgMHhFODdEOiAweDk1OTgsXG4gICAgMHhFODdFOiAweDk1OTksXG4gICAgMHhFODgwOiAweDk1QTAsXG4gICAgMHhFODgxOiAweDk1QTgsXG4gICAgMHhFODgyOiAweDk1QTcsXG4gICAgMHhFODgzOiAweDk1QUQsXG4gICAgMHhFODg0OiAweDk1QkMsXG4gICAgMHhFODg1OiAweDk1QkIsXG4gICAgMHhFODg2OiAweDk1QjksXG4gICAgMHhFODg3OiAweDk1QkUsXG4gICAgMHhFODg4OiAweDk1Q0EsXG4gICAgMHhFODg5OiAweDZGRjYsXG4gICAgMHhFODhBOiAweDk1QzMsXG4gICAgMHhFODhCOiAweDk1Q0QsXG4gICAgMHhFODhDOiAweDk1Q0MsXG4gICAgMHhFODhEOiAweDk1RDUsXG4gICAgMHhFODhFOiAweDk1RDQsXG4gICAgMHhFODhGOiAweDk1RDYsXG4gICAgMHhFODkwOiAweDk1REMsXG4gICAgMHhFODkxOiAweDk1RTEsXG4gICAgMHhFODkyOiAweDk1RTUsXG4gICAgMHhFODkzOiAweDk1RTIsXG4gICAgMHhFODk0OiAweDk2MjEsXG4gICAgMHhFODk1OiAweDk2MjgsXG4gICAgMHhFODk2OiAweDk2MkUsXG4gICAgMHhFODk3OiAweDk2MkYsXG4gICAgMHhFODk4OiAweDk2NDIsXG4gICAgMHhFODk5OiAweDk2NEMsXG4gICAgMHhFODlBOiAweDk2NEYsXG4gICAgMHhFODlCOiAweDk2NEIsXG4gICAgMHhFODlDOiAweDk2NzcsXG4gICAgMHhFODlEOiAweDk2NUMsXG4gICAgMHhFODlFOiAweDk2NUUsXG4gICAgMHhFODlGOiAweDk2NUQsXG4gICAgMHhFOEEwOiAweDk2NUYsXG4gICAgMHhFOEExOiAweDk2NjYsXG4gICAgMHhFOEEyOiAweDk2NzIsXG4gICAgMHhFOEEzOiAweDk2NkMsXG4gICAgMHhFOEE0OiAweDk2OEQsXG4gICAgMHhFOEE1OiAweDk2OTgsXG4gICAgMHhFOEE2OiAweDk2OTUsXG4gICAgMHhFOEE3OiAweDk2OTcsXG4gICAgMHhFOEE4OiAweDk2QUEsXG4gICAgMHhFOEE5OiAweDk2QTcsXG4gICAgMHhFOEFBOiAweDk2QjEsXG4gICAgMHhFOEFCOiAweDk2QjIsXG4gICAgMHhFOEFDOiAweDk2QjAsXG4gICAgMHhFOEFEOiAweDk2QjQsXG4gICAgMHhFOEFFOiAweDk2QjYsXG4gICAgMHhFOEFGOiAweDk2QjgsXG4gICAgMHhFOEIwOiAweDk2QjksXG4gICAgMHhFOEIxOiAweDk2Q0UsXG4gICAgMHhFOEIyOiAweDk2Q0IsXG4gICAgMHhFOEIzOiAweDk2QzksXG4gICAgMHhFOEI0OiAweDk2Q0QsXG4gICAgMHhFOEI1OiAweDg5NEQsXG4gICAgMHhFOEI2OiAweDk2REMsXG4gICAgMHhFOEI3OiAweDk3MEQsXG4gICAgMHhFOEI4OiAweDk2RDUsXG4gICAgMHhFOEI5OiAweDk2RjksXG4gICAgMHhFOEJBOiAweDk3MDQsXG4gICAgMHhFOEJCOiAweDk3MDYsXG4gICAgMHhFOEJDOiAweDk3MDgsXG4gICAgMHhFOEJEOiAweDk3MTMsXG4gICAgMHhFOEJFOiAweDk3MEUsXG4gICAgMHhFOEJGOiAweDk3MTEsXG4gICAgMHhFOEMwOiAweDk3MEYsXG4gICAgMHhFOEMxOiAweDk3MTYsXG4gICAgMHhFOEMyOiAweDk3MTksXG4gICAgMHhFOEMzOiAweDk3MjQsXG4gICAgMHhFOEM0OiAweDk3MkEsXG4gICAgMHhFOEM1OiAweDk3MzAsXG4gICAgMHhFOEM2OiAweDk3MzksXG4gICAgMHhFOEM3OiAweDk3M0QsXG4gICAgMHhFOEM4OiAweDk3M0UsXG4gICAgMHhFOEM5OiAweDk3NDQsXG4gICAgMHhFOENBOiAweDk3NDYsXG4gICAgMHhFOENCOiAweDk3NDgsXG4gICAgMHhFOENDOiAweDk3NDIsXG4gICAgMHhFOENEOiAweDk3NDksXG4gICAgMHhFOENFOiAweDk3NUMsXG4gICAgMHhFOENGOiAweDk3NjAsXG4gICAgMHhFOEQwOiAweDk3NjQsXG4gICAgMHhFOEQxOiAweDk3NjYsXG4gICAgMHhFOEQyOiAweDk3NjgsXG4gICAgMHhFOEQzOiAweDUyRDIsXG4gICAgMHhFOEQ0OiAweDk3NkIsXG4gICAgMHhFOEQ1OiAweDk3NzEsXG4gICAgMHhFOEQ2OiAweDk3NzksXG4gICAgMHhFOEQ3OiAweDk3ODUsXG4gICAgMHhFOEQ4OiAweDk3N0MsXG4gICAgMHhFOEQ5OiAweDk3ODEsXG4gICAgMHhFOERBOiAweDk3N0EsXG4gICAgMHhFOERCOiAweDk3ODYsXG4gICAgMHhFOERDOiAweDk3OEIsXG4gICAgMHhFOEREOiAweDk3OEYsXG4gICAgMHhFOERFOiAweDk3OTAsXG4gICAgMHhFOERGOiAweDk3OUMsXG4gICAgMHhFOEUwOiAweDk3QTgsXG4gICAgMHhFOEUxOiAweDk3QTYsXG4gICAgMHhFOEUyOiAweDk3QTMsXG4gICAgMHhFOEUzOiAweDk3QjMsXG4gICAgMHhFOEU0OiAweDk3QjQsXG4gICAgMHhFOEU1OiAweDk3QzMsXG4gICAgMHhFOEU2OiAweDk3QzYsXG4gICAgMHhFOEU3OiAweDk3QzgsXG4gICAgMHhFOEU4OiAweDk3Q0IsXG4gICAgMHhFOEU5OiAweDk3REMsXG4gICAgMHhFOEVBOiAweDk3RUQsXG4gICAgMHhFOEVCOiAweDlGNEYsXG4gICAgMHhFOEVDOiAweDk3RjIsXG4gICAgMHhFOEVEOiAweDdBREYsXG4gICAgMHhFOEVFOiAweDk3RjYsXG4gICAgMHhFOEVGOiAweDk3RjUsXG4gICAgMHhFOEYwOiAweDk4MEYsXG4gICAgMHhFOEYxOiAweDk4MEMsXG4gICAgMHhFOEYyOiAweDk4MzgsXG4gICAgMHhFOEYzOiAweDk4MjQsXG4gICAgMHhFOEY0OiAweDk4MjEsXG4gICAgMHhFOEY1OiAweDk4MzcsXG4gICAgMHhFOEY2OiAweDk4M0QsXG4gICAgMHhFOEY3OiAweDk4NDYsXG4gICAgMHhFOEY4OiAweDk4NEYsXG4gICAgMHhFOEY5OiAweDk4NEIsXG4gICAgMHhFOEZBOiAweDk4NkIsXG4gICAgMHhFOEZCOiAweDk4NkYsXG4gICAgMHhFOEZDOiAweDk4NzAsXG4gICAgMHhFOTQwOiAweDk4NzEsXG4gICAgMHhFOTQxOiAweDk4NzQsXG4gICAgMHhFOTQyOiAweDk4NzMsXG4gICAgMHhFOTQzOiAweDk4QUEsXG4gICAgMHhFOTQ0OiAweDk4QUYsXG4gICAgMHhFOTQ1OiAweDk4QjEsXG4gICAgMHhFOTQ2OiAweDk4QjYsXG4gICAgMHhFOTQ3OiAweDk4QzQsXG4gICAgMHhFOTQ4OiAweDk4QzMsXG4gICAgMHhFOTQ5OiAweDk4QzYsXG4gICAgMHhFOTRBOiAweDk4RTksXG4gICAgMHhFOTRCOiAweDk4RUIsXG4gICAgMHhFOTRDOiAweDk5MDMsXG4gICAgMHhFOTREOiAweDk5MDksXG4gICAgMHhFOTRFOiAweDk5MTIsXG4gICAgMHhFOTRGOiAweDk5MTQsXG4gICAgMHhFOTUwOiAweDk5MTgsXG4gICAgMHhFOTUxOiAweDk5MjEsXG4gICAgMHhFOTUyOiAweDk5MUQsXG4gICAgMHhFOTUzOiAweDk5MUUsXG4gICAgMHhFOTU0OiAweDk5MjQsXG4gICAgMHhFOTU1OiAweDk5MjAsXG4gICAgMHhFOTU2OiAweDk5MkMsXG4gICAgMHhFOTU3OiAweDk5MkUsXG4gICAgMHhFOTU4OiAweDk5M0QsXG4gICAgMHhFOTU5OiAweDk5M0UsXG4gICAgMHhFOTVBOiAweDk5NDIsXG4gICAgMHhFOTVCOiAweDk5NDksXG4gICAgMHhFOTVDOiAweDk5NDUsXG4gICAgMHhFOTVEOiAweDk5NTAsXG4gICAgMHhFOTVFOiAweDk5NEIsXG4gICAgMHhFOTVGOiAweDk5NTEsXG4gICAgMHhFOTYwOiAweDk5NTIsXG4gICAgMHhFOTYxOiAweDk5NEMsXG4gICAgMHhFOTYyOiAweDk5NTUsXG4gICAgMHhFOTYzOiAweDk5OTcsXG4gICAgMHhFOTY0OiAweDk5OTgsXG4gICAgMHhFOTY1OiAweDk5QTUsXG4gICAgMHhFOTY2OiAweDk5QUQsXG4gICAgMHhFOTY3OiAweDk5QUUsXG4gICAgMHhFOTY4OiAweDk5QkMsXG4gICAgMHhFOTY5OiAweDk5REYsXG4gICAgMHhFOTZBOiAweDk5REIsXG4gICAgMHhFOTZCOiAweDk5REQsXG4gICAgMHhFOTZDOiAweDk5RDgsXG4gICAgMHhFOTZEOiAweDk5RDEsXG4gICAgMHhFOTZFOiAweDk5RUQsXG4gICAgMHhFOTZGOiAweDk5RUUsXG4gICAgMHhFOTcwOiAweDk5RjEsXG4gICAgMHhFOTcxOiAweDk5RjIsXG4gICAgMHhFOTcyOiAweDk5RkIsXG4gICAgMHhFOTczOiAweDk5RjgsXG4gICAgMHhFOTc0OiAweDlBMDEsXG4gICAgMHhFOTc1OiAweDlBMEYsXG4gICAgMHhFOTc2OiAweDlBMDUsXG4gICAgMHhFOTc3OiAweDk5RTIsXG4gICAgMHhFOTc4OiAweDlBMTksXG4gICAgMHhFOTc5OiAweDlBMkIsXG4gICAgMHhFOTdBOiAweDlBMzcsXG4gICAgMHhFOTdCOiAweDlBNDUsXG4gICAgMHhFOTdDOiAweDlBNDIsXG4gICAgMHhFOTdEOiAweDlBNDAsXG4gICAgMHhFOTdFOiAweDlBNDMsXG4gICAgMHhFOTgwOiAweDlBM0UsXG4gICAgMHhFOTgxOiAweDlBNTUsXG4gICAgMHhFOTgyOiAweDlBNEQsXG4gICAgMHhFOTgzOiAweDlBNUIsXG4gICAgMHhFOTg0OiAweDlBNTcsXG4gICAgMHhFOTg1OiAweDlBNUYsXG4gICAgMHhFOTg2OiAweDlBNjIsXG4gICAgMHhFOTg3OiAweDlBNjUsXG4gICAgMHhFOTg4OiAweDlBNjQsXG4gICAgMHhFOTg5OiAweDlBNjksXG4gICAgMHhFOThBOiAweDlBNkIsXG4gICAgMHhFOThCOiAweDlBNkEsXG4gICAgMHhFOThDOiAweDlBQUQsXG4gICAgMHhFOThEOiAweDlBQjAsXG4gICAgMHhFOThFOiAweDlBQkMsXG4gICAgMHhFOThGOiAweDlBQzAsXG4gICAgMHhFOTkwOiAweDlBQ0YsXG4gICAgMHhFOTkxOiAweDlBRDEsXG4gICAgMHhFOTkyOiAweDlBRDMsXG4gICAgMHhFOTkzOiAweDlBRDQsXG4gICAgMHhFOTk0OiAweDlBREUsXG4gICAgMHhFOTk1OiAweDlBREYsXG4gICAgMHhFOTk2OiAweDlBRTIsXG4gICAgMHhFOTk3OiAweDlBRTMsXG4gICAgMHhFOTk4OiAweDlBRTYsXG4gICAgMHhFOTk5OiAweDlBRUYsXG4gICAgMHhFOTlBOiAweDlBRUIsXG4gICAgMHhFOTlCOiAweDlBRUUsXG4gICAgMHhFOTlDOiAweDlBRjQsXG4gICAgMHhFOTlEOiAweDlBRjEsXG4gICAgMHhFOTlFOiAweDlBRjcsXG4gICAgMHhFOTlGOiAweDlBRkIsXG4gICAgMHhFOUEwOiAweDlCMDYsXG4gICAgMHhFOUExOiAweDlCMTgsXG4gICAgMHhFOUEyOiAweDlCMUEsXG4gICAgMHhFOUEzOiAweDlCMUYsXG4gICAgMHhFOUE0OiAweDlCMjIsXG4gICAgMHhFOUE1OiAweDlCMjMsXG4gICAgMHhFOUE2OiAweDlCMjUsXG4gICAgMHhFOUE3OiAweDlCMjcsXG4gICAgMHhFOUE4OiAweDlCMjgsXG4gICAgMHhFOUE5OiAweDlCMjksXG4gICAgMHhFOUFBOiAweDlCMkEsXG4gICAgMHhFOUFCOiAweDlCMkUsXG4gICAgMHhFOUFDOiAweDlCMkYsXG4gICAgMHhFOUFEOiAweDlCMzIsXG4gICAgMHhFOUFFOiAweDlCNDQsXG4gICAgMHhFOUFGOiAweDlCNDMsXG4gICAgMHhFOUIwOiAweDlCNEYsXG4gICAgMHhFOUIxOiAweDlCNEQsXG4gICAgMHhFOUIyOiAweDlCNEUsXG4gICAgMHhFOUIzOiAweDlCNTEsXG4gICAgMHhFOUI0OiAweDlCNTgsXG4gICAgMHhFOUI1OiAweDlCNzQsXG4gICAgMHhFOUI2OiAweDlCOTMsXG4gICAgMHhFOUI3OiAweDlCODMsXG4gICAgMHhFOUI4OiAweDlCOTEsXG4gICAgMHhFOUI5OiAweDlCOTYsXG4gICAgMHhFOUJBOiAweDlCOTcsXG4gICAgMHhFOUJCOiAweDlCOUYsXG4gICAgMHhFOUJDOiAweDlCQTAsXG4gICAgMHhFOUJEOiAweDlCQTgsXG4gICAgMHhFOUJFOiAweDlCQjQsXG4gICAgMHhFOUJGOiAweDlCQzAsXG4gICAgMHhFOUMwOiAweDlCQ0EsXG4gICAgMHhFOUMxOiAweDlCQjksXG4gICAgMHhFOUMyOiAweDlCQzYsXG4gICAgMHhFOUMzOiAweDlCQ0YsXG4gICAgMHhFOUM0OiAweDlCRDEsXG4gICAgMHhFOUM1OiAweDlCRDIsXG4gICAgMHhFOUM2OiAweDlCRTMsXG4gICAgMHhFOUM3OiAweDlCRTIsXG4gICAgMHhFOUM4OiAweDlCRTQsXG4gICAgMHhFOUM5OiAweDlCRDQsXG4gICAgMHhFOUNBOiAweDlCRTEsXG4gICAgMHhFOUNCOiAweDlDM0EsXG4gICAgMHhFOUNDOiAweDlCRjIsXG4gICAgMHhFOUNEOiAweDlCRjEsXG4gICAgMHhFOUNFOiAweDlCRjAsXG4gICAgMHhFOUNGOiAweDlDMTUsXG4gICAgMHhFOUQwOiAweDlDMTQsXG4gICAgMHhFOUQxOiAweDlDMDksXG4gICAgMHhFOUQyOiAweDlDMTMsXG4gICAgMHhFOUQzOiAweDlDMEMsXG4gICAgMHhFOUQ0OiAweDlDMDYsXG4gICAgMHhFOUQ1OiAweDlDMDgsXG4gICAgMHhFOUQ2OiAweDlDMTIsXG4gICAgMHhFOUQ3OiAweDlDMEEsXG4gICAgMHhFOUQ4OiAweDlDMDQsXG4gICAgMHhFOUQ5OiAweDlDMkUsXG4gICAgMHhFOURBOiAweDlDMUIsXG4gICAgMHhFOURCOiAweDlDMjUsXG4gICAgMHhFOURDOiAweDlDMjQsXG4gICAgMHhFOUREOiAweDlDMjEsXG4gICAgMHhFOURFOiAweDlDMzAsXG4gICAgMHhFOURGOiAweDlDNDcsXG4gICAgMHhFOUUwOiAweDlDMzIsXG4gICAgMHhFOUUxOiAweDlDNDYsXG4gICAgMHhFOUUyOiAweDlDM0UsXG4gICAgMHhFOUUzOiAweDlDNUEsXG4gICAgMHhFOUU0OiAweDlDNjAsXG4gICAgMHhFOUU1OiAweDlDNjcsXG4gICAgMHhFOUU2OiAweDlDNzYsXG4gICAgMHhFOUU3OiAweDlDNzgsXG4gICAgMHhFOUU4OiAweDlDRTcsXG4gICAgMHhFOUU5OiAweDlDRUMsXG4gICAgMHhFOUVBOiAweDlDRjAsXG4gICAgMHhFOUVCOiAweDlEMDksXG4gICAgMHhFOUVDOiAweDlEMDgsXG4gICAgMHhFOUVEOiAweDlDRUIsXG4gICAgMHhFOUVFOiAweDlEMDMsXG4gICAgMHhFOUVGOiAweDlEMDYsXG4gICAgMHhFOUYwOiAweDlEMkEsXG4gICAgMHhFOUYxOiAweDlEMjYsXG4gICAgMHhFOUYyOiAweDlEQUYsXG4gICAgMHhFOUYzOiAweDlEMjMsXG4gICAgMHhFOUY0OiAweDlEMUYsXG4gICAgMHhFOUY1OiAweDlENDQsXG4gICAgMHhFOUY2OiAweDlEMTUsXG4gICAgMHhFOUY3OiAweDlEMTIsXG4gICAgMHhFOUY4OiAweDlENDEsXG4gICAgMHhFOUY5OiAweDlEM0YsXG4gICAgMHhFOUZBOiAweDlEM0UsXG4gICAgMHhFOUZCOiAweDlENDYsXG4gICAgMHhFOUZDOiAweDlENDgsXG4gICAgMHhFQTQwOiAweDlENUQsXG4gICAgMHhFQTQxOiAweDlENUUsXG4gICAgMHhFQTQyOiAweDlENjQsXG4gICAgMHhFQTQzOiAweDlENTEsXG4gICAgMHhFQTQ0OiAweDlENTAsXG4gICAgMHhFQTQ1OiAweDlENTksXG4gICAgMHhFQTQ2OiAweDlENzIsXG4gICAgMHhFQTQ3OiAweDlEODksXG4gICAgMHhFQTQ4OiAweDlEODcsXG4gICAgMHhFQTQ5OiAweDlEQUIsXG4gICAgMHhFQTRBOiAweDlENkYsXG4gICAgMHhFQTRCOiAweDlEN0EsXG4gICAgMHhFQTRDOiAweDlEOUEsXG4gICAgMHhFQTREOiAweDlEQTQsXG4gICAgMHhFQTRFOiAweDlEQTksXG4gICAgMHhFQTRGOiAweDlEQjIsXG4gICAgMHhFQTUwOiAweDlEQzQsXG4gICAgMHhFQTUxOiAweDlEQzEsXG4gICAgMHhFQTUyOiAweDlEQkIsXG4gICAgMHhFQTUzOiAweDlEQjgsXG4gICAgMHhFQTU0OiAweDlEQkEsXG4gICAgMHhFQTU1OiAweDlEQzYsXG4gICAgMHhFQTU2OiAweDlEQ0YsXG4gICAgMHhFQTU3OiAweDlEQzIsXG4gICAgMHhFQTU4OiAweDlERDksXG4gICAgMHhFQTU5OiAweDlERDMsXG4gICAgMHhFQTVBOiAweDlERjgsXG4gICAgMHhFQTVCOiAweDlERTYsXG4gICAgMHhFQTVDOiAweDlERUQsXG4gICAgMHhFQTVEOiAweDlERUYsXG4gICAgMHhFQTVFOiAweDlERkQsXG4gICAgMHhFQTVGOiAweDlFMUEsXG4gICAgMHhFQTYwOiAweDlFMUIsXG4gICAgMHhFQTYxOiAweDlFMUUsXG4gICAgMHhFQTYyOiAweDlFNzUsXG4gICAgMHhFQTYzOiAweDlFNzksXG4gICAgMHhFQTY0OiAweDlFN0QsXG4gICAgMHhFQTY1OiAweDlFODEsXG4gICAgMHhFQTY2OiAweDlFODgsXG4gICAgMHhFQTY3OiAweDlFOEIsXG4gICAgMHhFQTY4OiAweDlFOEMsXG4gICAgMHhFQTY5OiAweDlFOTIsXG4gICAgMHhFQTZBOiAweDlFOTUsXG4gICAgMHhFQTZCOiAweDlFOTEsXG4gICAgMHhFQTZDOiAweDlFOUQsXG4gICAgMHhFQTZEOiAweDlFQTUsXG4gICAgMHhFQTZFOiAweDlFQTksXG4gICAgMHhFQTZGOiAweDlFQjgsXG4gICAgMHhFQTcwOiAweDlFQUEsXG4gICAgMHhFQTcxOiAweDlFQUQsXG4gICAgMHhFQTcyOiAweDk3NjEsXG4gICAgMHhFQTczOiAweDlFQ0MsXG4gICAgMHhFQTc0OiAweDlFQ0UsXG4gICAgMHhFQTc1OiAweDlFQ0YsXG4gICAgMHhFQTc2OiAweDlFRDAsXG4gICAgMHhFQTc3OiAweDlFRDQsXG4gICAgMHhFQTc4OiAweDlFREMsXG4gICAgMHhFQTc5OiAweDlFREUsXG4gICAgMHhFQTdBOiAweDlFREQsXG4gICAgMHhFQTdCOiAweDlFRTAsXG4gICAgMHhFQTdDOiAweDlFRTUsXG4gICAgMHhFQTdEOiAweDlFRTgsXG4gICAgMHhFQTdFOiAweDlFRUYsXG4gICAgMHhFQTgwOiAweDlFRjQsXG4gICAgMHhFQTgxOiAweDlFRjYsXG4gICAgMHhFQTgyOiAweDlFRjcsXG4gICAgMHhFQTgzOiAweDlFRjksXG4gICAgMHhFQTg0OiAweDlFRkIsXG4gICAgMHhFQTg1OiAweDlFRkMsXG4gICAgMHhFQTg2OiAweDlFRkQsXG4gICAgMHhFQTg3OiAweDlGMDcsXG4gICAgMHhFQTg4OiAweDlGMDgsXG4gICAgMHhFQTg5OiAweDc2QjcsXG4gICAgMHhFQThBOiAweDlGMTUsXG4gICAgMHhFQThCOiAweDlGMjEsXG4gICAgMHhFQThDOiAweDlGMkMsXG4gICAgMHhFQThEOiAweDlGM0UsXG4gICAgMHhFQThFOiAweDlGNEEsXG4gICAgMHhFQThGOiAweDlGNTIsXG4gICAgMHhFQTkwOiAweDlGNTQsXG4gICAgMHhFQTkxOiAweDlGNjMsXG4gICAgMHhFQTkyOiAweDlGNUYsXG4gICAgMHhFQTkzOiAweDlGNjAsXG4gICAgMHhFQTk0OiAweDlGNjEsXG4gICAgMHhFQTk1OiAweDlGNjYsXG4gICAgMHhFQTk2OiAweDlGNjcsXG4gICAgMHhFQTk3OiAweDlGNkMsXG4gICAgMHhFQTk4OiAweDlGNkEsXG4gICAgMHhFQTk5OiAweDlGNzcsXG4gICAgMHhFQTlBOiAweDlGNzIsXG4gICAgMHhFQTlCOiAweDlGNzYsXG4gICAgMHhFQTlDOiAweDlGOTUsXG4gICAgMHhFQTlEOiAweDlGOUMsXG4gICAgMHhFQTlFOiAweDlGQTAsXG4gICAgMHhFQTlGOiAweDU4MkYsXG4gICAgMHhFQUEwOiAweDY5QzcsXG4gICAgMHhFQUExOiAweDkwNTksXG4gICAgMHhFQUEyOiAweDc0NjQsXG4gICAgMHhFQUEzOiAweDUxREMsXG4gICAgMHhFQUE0OiAweDcxOTksXG59O1xuXG5cbi8qKiovIH0pLFxuLyogOSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIEdlbmVyaWNHRl8xID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKTtcbnZhciBHZW5lcmljR0ZQb2x5XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpO1xuZnVuY3Rpb24gcnVuRXVjbGlkZWFuQWxnb3JpdGhtKGZpZWxkLCBhLCBiLCBSKSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIEFzc3VtZSBhJ3MgZGVncmVlIGlzID49IGInc1xuICAgIGlmIChhLmRlZ3JlZSgpIDwgYi5kZWdyZWUoKSkge1xuICAgICAgICBfYSA9IFtiLCBhXSwgYSA9IF9hWzBdLCBiID0gX2FbMV07XG4gICAgfVxuICAgIHZhciByTGFzdCA9IGE7XG4gICAgdmFyIHIgPSBiO1xuICAgIHZhciB0TGFzdCA9IGZpZWxkLnplcm87XG4gICAgdmFyIHQgPSBmaWVsZC5vbmU7XG4gICAgLy8gUnVuIEV1Y2xpZGVhbiBhbGdvcml0aG0gdW50aWwgcidzIGRlZ3JlZSBpcyBsZXNzIHRoYW4gUi8yXG4gICAgd2hpbGUgKHIuZGVncmVlKCkgPj0gUiAvIDIpIHtcbiAgICAgICAgdmFyIHJMYXN0TGFzdCA9IHJMYXN0O1xuICAgICAgICB2YXIgdExhc3RMYXN0ID0gdExhc3Q7XG4gICAgICAgIHJMYXN0ID0gcjtcbiAgICAgICAgdExhc3QgPSB0O1xuICAgICAgICAvLyBEaXZpZGUgckxhc3RMYXN0IGJ5IHJMYXN0LCB3aXRoIHF1b3RpZW50IGluIHEgYW5kIHJlbWFpbmRlciBpbiByXG4gICAgICAgIGlmIChyTGFzdC5pc1plcm8oKSkge1xuICAgICAgICAgICAgLy8gRXVjbGlkZWFuIGFsZ29yaXRobSBhbHJlYWR5IHRlcm1pbmF0ZWQ/XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByID0gckxhc3RMYXN0O1xuICAgICAgICB2YXIgcSA9IGZpZWxkLnplcm87XG4gICAgICAgIHZhciBkZW5vbWluYXRvckxlYWRpbmdUZXJtID0gckxhc3QuZ2V0Q29lZmZpY2llbnQockxhc3QuZGVncmVlKCkpO1xuICAgICAgICB2YXIgZGx0SW52ZXJzZSA9IGZpZWxkLmludmVyc2UoZGVub21pbmF0b3JMZWFkaW5nVGVybSk7XG4gICAgICAgIHdoaWxlIChyLmRlZ3JlZSgpID49IHJMYXN0LmRlZ3JlZSgpICYmICFyLmlzWmVybygpKSB7XG4gICAgICAgICAgICB2YXIgZGVncmVlRGlmZiA9IHIuZGVncmVlKCkgLSByTGFzdC5kZWdyZWUoKTtcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IGZpZWxkLm11bHRpcGx5KHIuZ2V0Q29lZmZpY2llbnQoci5kZWdyZWUoKSksIGRsdEludmVyc2UpO1xuICAgICAgICAgICAgcSA9IHEuYWRkT3JTdWJ0cmFjdChmaWVsZC5idWlsZE1vbm9taWFsKGRlZ3JlZURpZmYsIHNjYWxlKSk7XG4gICAgICAgICAgICByID0gci5hZGRPclN1YnRyYWN0KHJMYXN0Lm11bHRpcGx5QnlNb25vbWlhbChkZWdyZWVEaWZmLCBzY2FsZSkpO1xuICAgICAgICB9XG4gICAgICAgIHQgPSBxLm11bHRpcGx5UG9seSh0TGFzdCkuYWRkT3JTdWJ0cmFjdCh0TGFzdExhc3QpO1xuICAgICAgICBpZiAoci5kZWdyZWUoKSA+PSByTGFzdC5kZWdyZWUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNpZ21hVGlsZGVBdFplcm8gPSB0LmdldENvZWZmaWNpZW50KDApO1xuICAgIGlmIChzaWdtYVRpbGRlQXRaZXJvID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgaW52ZXJzZSA9IGZpZWxkLmludmVyc2Uoc2lnbWFUaWxkZUF0WmVybyk7XG4gICAgcmV0dXJuIFt0Lm11bHRpcGx5KGludmVyc2UpLCByLm11bHRpcGx5KGludmVyc2UpXTtcbn1cbmZ1bmN0aW9uIGZpbmRFcnJvckxvY2F0aW9ucyhmaWVsZCwgZXJyb3JMb2NhdG9yKSB7XG4gICAgLy8gVGhpcyBpcyBhIGRpcmVjdCBhcHBsaWNhdGlvbiBvZiBDaGllbidzIHNlYXJjaFxuICAgIHZhciBudW1FcnJvcnMgPSBlcnJvckxvY2F0b3IuZGVncmVlKCk7XG4gICAgaWYgKG51bUVycm9ycyA9PT0gMSkge1xuICAgICAgICByZXR1cm4gW2Vycm9yTG9jYXRvci5nZXRDb2VmZmljaWVudCgxKV07XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobnVtRXJyb3JzKTtcbiAgICB2YXIgZXJyb3JDb3VudCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBmaWVsZC5zaXplICYmIGVycm9yQ291bnQgPCBudW1FcnJvcnM7IGkrKykge1xuICAgICAgICBpZiAoZXJyb3JMb2NhdG9yLmV2YWx1YXRlQXQoaSkgPT09IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFtlcnJvckNvdW50XSA9IGZpZWxkLmludmVyc2UoaSk7XG4gICAgICAgICAgICBlcnJvckNvdW50Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVycm9yQ291bnQgIT09IG51bUVycm9ycykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGZpbmRFcnJvck1hZ25pdHVkZXMoZmllbGQsIGVycm9yRXZhbHVhdG9yLCBlcnJvckxvY2F0aW9ucykge1xuICAgIC8vIFRoaXMgaXMgZGlyZWN0bHkgYXBwbHlpbmcgRm9ybmV5J3MgRm9ybXVsYVxuICAgIHZhciBzID0gZXJyb3JMb2NhdGlvbnMubGVuZ3RoO1xuICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkocyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyBpKyspIHtcbiAgICAgICAgdmFyIHhpSW52ZXJzZSA9IGZpZWxkLmludmVyc2UoZXJyb3JMb2NhdGlvbnNbaV0pO1xuICAgICAgICB2YXIgZGVub21pbmF0b3IgPSAxO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHM7IGorKykge1xuICAgICAgICAgICAgaWYgKGkgIT09IGopIHtcbiAgICAgICAgICAgICAgICBkZW5vbWluYXRvciA9IGZpZWxkLm11bHRpcGx5KGRlbm9taW5hdG9yLCBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0YoMSwgZmllbGQubXVsdGlwbHkoZXJyb3JMb2NhdGlvbnNbal0sIHhpSW52ZXJzZSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbaV0gPSBmaWVsZC5tdWx0aXBseShlcnJvckV2YWx1YXRvci5ldmFsdWF0ZUF0KHhpSW52ZXJzZSksIGZpZWxkLmludmVyc2UoZGVub21pbmF0b3IpKTtcbiAgICAgICAgaWYgKGZpZWxkLmdlbmVyYXRvckJhc2UgIT09IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IGZpZWxkLm11bHRpcGx5KHJlc3VsdFtpXSwgeGlJbnZlcnNlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZGVjb2RlKGJ5dGVzLCB0d29TKSB7XG4gICAgdmFyIG91dHB1dEJ5dGVzID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGJ5dGVzLmxlbmd0aCk7XG4gICAgb3V0cHV0Qnl0ZXMuc2V0KGJ5dGVzKTtcbiAgICB2YXIgZmllbGQgPSBuZXcgR2VuZXJpY0dGXzEuZGVmYXVsdCgweDAxMUQsIDI1NiwgMCk7IC8vIHheOCArIHheNCArIHheMyArIHheMiArIDFcbiAgICB2YXIgcG9seSA9IG5ldyBHZW5lcmljR0ZQb2x5XzEuZGVmYXVsdChmaWVsZCwgb3V0cHV0Qnl0ZXMpO1xuICAgIHZhciBzeW5kcm9tZUNvZWZmaWNpZW50cyA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0d29TKTtcbiAgICB2YXIgZXJyb3IgPSBmYWxzZTtcbiAgICBmb3IgKHZhciBzID0gMDsgcyA8IHR3b1M7IHMrKykge1xuICAgICAgICB2YXIgZXZhbHVhdGlvbiA9IHBvbHkuZXZhbHVhdGVBdChmaWVsZC5leHAocyArIGZpZWxkLmdlbmVyYXRvckJhc2UpKTtcbiAgICAgICAgc3luZHJvbWVDb2VmZmljaWVudHNbc3luZHJvbWVDb2VmZmljaWVudHMubGVuZ3RoIC0gMSAtIHNdID0gZXZhbHVhdGlvbjtcbiAgICAgICAgaWYgKGV2YWx1YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIGVycm9yID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgIHJldHVybiBvdXRwdXRCeXRlcztcbiAgICB9XG4gICAgdmFyIHN5bmRyb21lID0gbmV3IEdlbmVyaWNHRlBvbHlfMS5kZWZhdWx0KGZpZWxkLCBzeW5kcm9tZUNvZWZmaWNpZW50cyk7XG4gICAgdmFyIHNpZ21hT21lZ2EgPSBydW5FdWNsaWRlYW5BbGdvcml0aG0oZmllbGQsIGZpZWxkLmJ1aWxkTW9ub21pYWwodHdvUywgMSksIHN5bmRyb21lLCB0d29TKTtcbiAgICBpZiAoc2lnbWFPbWVnYSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGVycm9yTG9jYXRpb25zID0gZmluZEVycm9yTG9jYXRpb25zKGZpZWxkLCBzaWdtYU9tZWdhWzBdKTtcbiAgICBpZiAoZXJyb3JMb2NhdGlvbnMgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIGVycm9yTWFnbml0dWRlcyA9IGZpbmRFcnJvck1hZ25pdHVkZXMoZmllbGQsIHNpZ21hT21lZ2FbMV0sIGVycm9yTG9jYXRpb25zKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yTG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IG91dHB1dEJ5dGVzLmxlbmd0aCAtIDEgLSBmaWVsZC5sb2coZXJyb3JMb2NhdGlvbnNbaV0pO1xuICAgICAgICBpZiAocG9zaXRpb24gPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRCeXRlc1twb3NpdGlvbl0gPSBHZW5lcmljR0ZfMS5hZGRPclN1YnRyYWN0R0Yob3V0cHV0Qnl0ZXNbcG9zaXRpb25dLCBlcnJvck1hZ25pdHVkZXNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gb3V0cHV0Qnl0ZXM7XG59XG5leHBvcnRzLmRlY29kZSA9IGRlY29kZTtcblxuXG4vKioqLyB9KSxcbi8qIDEwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlZFUlNJT05TID0gW1xuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IG51bGwsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDEsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogNyxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxMyxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEzIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxNyxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDkgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogbnVsbCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMixcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAxOF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDEwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMzQgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjggfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogbnVsbCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMyxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyMl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE1LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNTUgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDQgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTMgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogbnVsbCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogNCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODAgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMzIgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiBudWxsLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiA1LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMDggfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDMgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDE4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjIsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTEgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IG51bGwsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDYsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzRdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDY4IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAxNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI3IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MDdDOTQsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDcsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjIsIDM4XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA3OCB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMTgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzMSB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMTgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgwODVCQyxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogOCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNCwgNDJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDk3IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyMixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzOCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzOSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE4IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MDlBOTksXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDksXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjYsIDQ2XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFt7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTYgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIyLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDM2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDM3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgwQTREMyxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMTAsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjgsIDUwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMTgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNjggfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNjkgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE5IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIwIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MEJCRjYsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDExLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1NF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDIwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODEgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDUwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDUxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgwQzc2MixcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMTIsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzIsIDU4XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyMixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzNiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzNyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MEQ4NDcsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDEzLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDM0LCA2Ml0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTA3IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyMixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzNyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAzOCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjIsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDBFNjBELFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAxNCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNDYsIDY2XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQwIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEzIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDBGOTI4LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAxNSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNDgsIDcwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjIsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogODggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEzIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDEwQjc4LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAxNixcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNTAsIDc0XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjQsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTggfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogOTkgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI0LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxOSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgxMTQ1RCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMTcsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzAsIDU0LCA3OF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEwNyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMDggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTJBMTcsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDE4LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1NiwgODJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIxIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDMgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDQgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTM1MzIsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDE5LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1OCwgODZdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTMgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE0IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIxIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDIyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjYsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTMgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE0IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDE0OUE2LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyMCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzNCwgNjIsIDkwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTA3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEwOCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQxIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0MiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTU2ODMsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDIxLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI4LCA1MCwgNzIsIDk0XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI2LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDE3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQyIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MTY4QzksXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDIyLFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI2LCA1MCwgNzQsIDk4XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTExIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExMiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbeyBudW1CbG9ja3M6IDE3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ2IH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAzNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMyB9XSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDE3N0VDLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyMyxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTQsIDc0LCAxMDJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjEgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MThFQzQsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDI0LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI4LCA1NCwgODAsIDEwNl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMwLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDE5MUUxLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyNSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMiwgNTgsIDg0LCAxMTBdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyNixcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTA3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDgsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgxQUZBQixcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMjYsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzAsIDU4LCA4NiwgMTE0XSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEwLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjgsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MUIwOEUsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDI3LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDM0LCA2MiwgOTAsIDExOF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyMiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFDQzFBLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyOCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNTAsIDc0LCA5OCwgMTIyXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFEMzNGLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAyOSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNl0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyMyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFFRDc1LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAzMCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAyNiwgNTIsIDc4LCAxMDQsIDEzMF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0OCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjUsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDFGMjUwLFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAzMSxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIzLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyMDlENSxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzIsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW3sgbnVtQmxvY2tzOiAxNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTUgfV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDM1LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzNSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyMTZGMCxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzMsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDJdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDExLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0NiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyMjhCQSxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzQsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMzQsIDYyLCA5MCwgMTE4LCAxNDZdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NiB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDcsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNTksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4MjM3OUYsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDM1LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDMwLCA1NCwgNzgsIDEwMiwgMTI2LCAxNTBdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIxIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyMiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDggfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzksIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjQgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI1IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDIyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyNEIwQixcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzYsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjQsIDUwLCA3NiwgMTAyLCAxMjgsIDE1NF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDEyMSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIyIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDYsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDM0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQ2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE1IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA2NCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNiB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgICBpbmZvQml0czogMHgyNTQyRSxcbiAgICAgICAgdmVyc2lvbk51bWJlcjogMzcsXG4gICAgICAgIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzOiBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXG4gICAgICAgIGVycm9yQ29ycmVjdGlvbkxldmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIzIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMjgsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDI5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ2IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0OSwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQ2LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDI2QTY0LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiAzOCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMiwgNTgsIDg0LCAxMTAsIDEzNiwgMTYyXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTIyIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxOCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMjMgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTMsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDYgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMyLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ3IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDQ4LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAxNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMzIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgaW5mb0JpdHM6IDB4Mjc1NDEsXG4gICAgICAgIHZlcnNpb25OdW1iZXI6IDM5LFxuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyczogWzYsIDI2LCA1NCwgODIsIDExMCwgMTM4LCAxNjZdLFxuICAgICAgICBlcnJvckNvcnJlY3Rpb25MZXZlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTE3IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExOCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDI4LFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0NyB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiA0OCB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiA0MywgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMjIsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMjUgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAzMCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTAsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDY3LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDE2IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICAgIGluZm9CaXRzOiAweDI4QzY5LFxuICAgICAgICB2ZXJzaW9uTnVtYmVyOiA0MCxcbiAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnM6IFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0MiwgMTcwXSxcbiAgICAgICAgZXJyb3JDb3JyZWN0aW9uTGV2ZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDE5LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDExOCB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNiwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxMTkgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBlY0NvZGV3b3Jkc1BlckJsb2NrOiAyOCxcbiAgICAgICAgICAgICAgICBlY0Jsb2NrczogW1xuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogMTgsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogNDcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDMxLCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDQ4IH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWNDb2Rld29yZHNQZXJCbG9jazogMzAsXG4gICAgICAgICAgICAgICAgZWNCbG9ja3M6IFtcbiAgICAgICAgICAgICAgICAgICAgeyBudW1CbG9ja3M6IDM0LCBkYXRhQ29kZXdvcmRzUGVyQmxvY2s6IDI0IH0sXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAzNCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAyNSB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVjQ29kZXdvcmRzUGVyQmxvY2s6IDMwLFxuICAgICAgICAgICAgICAgIGVjQmxvY2tzOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgbnVtQmxvY2tzOiAyMCwgZGF0YUNvZGV3b3Jkc1BlckJsb2NrOiAxNSB9LFxuICAgICAgICAgICAgICAgICAgICB7IG51bUJsb2NrczogNjEsIGRhdGFDb2Rld29yZHNQZXJCbG9jazogMTYgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuXTtcblxuXG4vKioqLyB9KSxcbi8qIDExICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQml0TWF0cml4XzEgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuZnVuY3Rpb24gc3F1YXJlVG9RdWFkcmlsYXRlcmFsKHAxLCBwMiwgcDMsIHA0KSB7XG4gICAgdmFyIGR4MyA9IHAxLnggLSBwMi54ICsgcDMueCAtIHA0Lng7XG4gICAgdmFyIGR5MyA9IHAxLnkgLSBwMi55ICsgcDMueSAtIHA0Lnk7XG4gICAgaWYgKGR4MyA9PT0gMCAmJiBkeTMgPT09IDApIHsgLy8gQWZmaW5lXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhMTE6IHAyLnggLSBwMS54LFxuICAgICAgICAgICAgYTEyOiBwMi55IC0gcDEueSxcbiAgICAgICAgICAgIGExMzogMCxcbiAgICAgICAgICAgIGEyMTogcDMueCAtIHAyLngsXG4gICAgICAgICAgICBhMjI6IHAzLnkgLSBwMi55LFxuICAgICAgICAgICAgYTIzOiAwLFxuICAgICAgICAgICAgYTMxOiBwMS54LFxuICAgICAgICAgICAgYTMyOiBwMS55LFxuICAgICAgICAgICAgYTMzOiAxLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGR4MSA9IHAyLnggLSBwMy54O1xuICAgICAgICB2YXIgZHgyID0gcDQueCAtIHAzLng7XG4gICAgICAgIHZhciBkeTEgPSBwMi55IC0gcDMueTtcbiAgICAgICAgdmFyIGR5MiA9IHA0LnkgLSBwMy55O1xuICAgICAgICB2YXIgZGVub21pbmF0b3IgPSBkeDEgKiBkeTIgLSBkeDIgKiBkeTE7XG4gICAgICAgIHZhciBhMTMgPSAoZHgzICogZHkyIC0gZHgyICogZHkzKSAvIGRlbm9taW5hdG9yO1xuICAgICAgICB2YXIgYTIzID0gKGR4MSAqIGR5MyAtIGR4MyAqIGR5MSkgLyBkZW5vbWluYXRvcjtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGExMTogcDIueCAtIHAxLnggKyBhMTMgKiBwMi54LFxuICAgICAgICAgICAgYTEyOiBwMi55IC0gcDEueSArIGExMyAqIHAyLnksXG4gICAgICAgICAgICBhMTM6IGExMyxcbiAgICAgICAgICAgIGEyMTogcDQueCAtIHAxLnggKyBhMjMgKiBwNC54LFxuICAgICAgICAgICAgYTIyOiBwNC55IC0gcDEueSArIGEyMyAqIHA0LnksXG4gICAgICAgICAgICBhMjM6IGEyMyxcbiAgICAgICAgICAgIGEzMTogcDEueCxcbiAgICAgICAgICAgIGEzMjogcDEueSxcbiAgICAgICAgICAgIGEzMzogMSxcbiAgICAgICAgfTtcbiAgICB9XG59XG5mdW5jdGlvbiBxdWFkcmlsYXRlcmFsVG9TcXVhcmUocDEsIHAyLCBwMywgcDQpIHtcbiAgICAvLyBIZXJlLCB0aGUgYWRqb2ludCBzZXJ2ZXMgYXMgdGhlIGludmVyc2U6XG4gICAgdmFyIHNUb1EgPSBzcXVhcmVUb1F1YWRyaWxhdGVyYWwocDEsIHAyLCBwMywgcDQpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGExMTogc1RvUS5hMjIgKiBzVG9RLmEzMyAtIHNUb1EuYTIzICogc1RvUS5hMzIsXG4gICAgICAgIGExMjogc1RvUS5hMTMgKiBzVG9RLmEzMiAtIHNUb1EuYTEyICogc1RvUS5hMzMsXG4gICAgICAgIGExMzogc1RvUS5hMTIgKiBzVG9RLmEyMyAtIHNUb1EuYTEzICogc1RvUS5hMjIsXG4gICAgICAgIGEyMTogc1RvUS5hMjMgKiBzVG9RLmEzMSAtIHNUb1EuYTIxICogc1RvUS5hMzMsXG4gICAgICAgIGEyMjogc1RvUS5hMTEgKiBzVG9RLmEzMyAtIHNUb1EuYTEzICogc1RvUS5hMzEsXG4gICAgICAgIGEyMzogc1RvUS5hMTMgKiBzVG9RLmEyMSAtIHNUb1EuYTExICogc1RvUS5hMjMsXG4gICAgICAgIGEzMTogc1RvUS5hMjEgKiBzVG9RLmEzMiAtIHNUb1EuYTIyICogc1RvUS5hMzEsXG4gICAgICAgIGEzMjogc1RvUS5hMTIgKiBzVG9RLmEzMSAtIHNUb1EuYTExICogc1RvUS5hMzIsXG4gICAgICAgIGEzMzogc1RvUS5hMTEgKiBzVG9RLmEyMiAtIHNUb1EuYTEyICogc1RvUS5hMjEsXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHRpbWVzKGEsIGIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhMTE6IGEuYTExICogYi5hMTEgKyBhLmEyMSAqIGIuYTEyICsgYS5hMzEgKiBiLmExMyxcbiAgICAgICAgYTEyOiBhLmExMiAqIGIuYTExICsgYS5hMjIgKiBiLmExMiArIGEuYTMyICogYi5hMTMsXG4gICAgICAgIGExMzogYS5hMTMgKiBiLmExMSArIGEuYTIzICogYi5hMTIgKyBhLmEzMyAqIGIuYTEzLFxuICAgICAgICBhMjE6IGEuYTExICogYi5hMjEgKyBhLmEyMSAqIGIuYTIyICsgYS5hMzEgKiBiLmEyMyxcbiAgICAgICAgYTIyOiBhLmExMiAqIGIuYTIxICsgYS5hMjIgKiBiLmEyMiArIGEuYTMyICogYi5hMjMsXG4gICAgICAgIGEyMzogYS5hMTMgKiBiLmEyMSArIGEuYTIzICogYi5hMjIgKyBhLmEzMyAqIGIuYTIzLFxuICAgICAgICBhMzE6IGEuYTExICogYi5hMzEgKyBhLmEyMSAqIGIuYTMyICsgYS5hMzEgKiBiLmEzMyxcbiAgICAgICAgYTMyOiBhLmExMiAqIGIuYTMxICsgYS5hMjIgKiBiLmEzMiArIGEuYTMyICogYi5hMzMsXG4gICAgICAgIGEzMzogYS5hMTMgKiBiLmEzMSArIGEuYTIzICogYi5hMzIgKyBhLmEzMyAqIGIuYTMzLFxuICAgIH07XG59XG5mdW5jdGlvbiBleHRyYWN0KGltYWdlLCBsb2NhdGlvbikge1xuICAgIHZhciBxVG9TID0gcXVhZHJpbGF0ZXJhbFRvU3F1YXJlKHsgeDogMy41LCB5OiAzLjUgfSwgeyB4OiBsb2NhdGlvbi5kaW1lbnNpb24gLSAzLjUsIHk6IDMuNSB9LCB7IHg6IGxvY2F0aW9uLmRpbWVuc2lvbiAtIDYuNSwgeTogbG9jYXRpb24uZGltZW5zaW9uIC0gNi41IH0sIHsgeDogMy41LCB5OiBsb2NhdGlvbi5kaW1lbnNpb24gLSAzLjUgfSk7XG4gICAgdmFyIHNUb1EgPSBzcXVhcmVUb1F1YWRyaWxhdGVyYWwobG9jYXRpb24udG9wTGVmdCwgbG9jYXRpb24udG9wUmlnaHQsIGxvY2F0aW9uLmFsaWdubWVudFBhdHRlcm4sIGxvY2F0aW9uLmJvdHRvbUxlZnQpO1xuICAgIHZhciB0cmFuc2Zvcm0gPSB0aW1lcyhzVG9RLCBxVG9TKTtcbiAgICB2YXIgbWF0cml4ID0gQml0TWF0cml4XzEuQml0TWF0cml4LmNyZWF0ZUVtcHR5KGxvY2F0aW9uLmRpbWVuc2lvbiwgbG9jYXRpb24uZGltZW5zaW9uKTtcbiAgICB2YXIgbWFwcGluZ0Z1bmN0aW9uID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIGRlbm9taW5hdG9yID0gdHJhbnNmb3JtLmExMyAqIHggKyB0cmFuc2Zvcm0uYTIzICogeSArIHRyYW5zZm9ybS5hMzM7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAodHJhbnNmb3JtLmExMSAqIHggKyB0cmFuc2Zvcm0uYTIxICogeSArIHRyYW5zZm9ybS5hMzEpIC8gZGVub21pbmF0b3IsXG4gICAgICAgICAgICB5OiAodHJhbnNmb3JtLmExMiAqIHggKyB0cmFuc2Zvcm0uYTIyICogeSArIHRyYW5zZm9ybS5hMzIpIC8gZGVub21pbmF0b3IsXG4gICAgICAgIH07XG4gICAgfTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGxvY2F0aW9uLmRpbWVuc2lvbjsgeSsrKSB7XG4gICAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgbG9jYXRpb24uZGltZW5zaW9uOyB4KyspIHtcbiAgICAgICAgICAgIHZhciB4VmFsdWUgPSB4ICsgMC41O1xuICAgICAgICAgICAgdmFyIHlWYWx1ZSA9IHkgKyAwLjU7XG4gICAgICAgICAgICB2YXIgc291cmNlUGl4ZWwgPSBtYXBwaW5nRnVuY3Rpb24oeFZhbHVlLCB5VmFsdWUpO1xuICAgICAgICAgICAgbWF0cml4LnNldCh4LCB5LCBpbWFnZS5nZXQoTWF0aC5mbG9vcihzb3VyY2VQaXhlbC54KSwgTWF0aC5mbG9vcihzb3VyY2VQaXhlbC55KSkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG1hdHJpeDogbWF0cml4LFxuICAgICAgICBtYXBwaW5nRnVuY3Rpb246IG1hcHBpbmdGdW5jdGlvbixcbiAgICB9O1xufVxuZXhwb3J0cy5leHRyYWN0ID0gZXh0cmFjdDtcblxuXG4vKioqLyB9KSxcbi8qIDEyICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTUFYX0ZJTkRFUlBBVFRFUk5TX1RPX1NFQVJDSCA9IDQ7XG52YXIgTUlOX1FVQURfUkFUSU8gPSAwLjU7XG52YXIgTUFYX1FVQURfUkFUSU8gPSAxLjU7XG52YXIgZGlzdGFuY2UgPSBmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KChiLnggLSBhLngpLCAyKSArIE1hdGgucG93KChiLnkgLSBhLnkpLCAyKSk7IH07XG5mdW5jdGlvbiBzdW0odmFsdWVzKSB7XG4gICAgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KTtcbn1cbi8vIFRha2VzIHRocmVlIGZpbmRlciBwYXR0ZXJucyBhbmQgb3JnYW5pemVzIHRoZW0gaW50byB0b3BMZWZ0LCB0b3BSaWdodCwgZXRjXG5mdW5jdGlvbiByZW9yZGVyRmluZGVyUGF0dGVybnMocGF0dGVybjEsIHBhdHRlcm4yLCBwYXR0ZXJuMykge1xuICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAvLyBGaW5kIGRpc3RhbmNlcyBiZXR3ZWVuIHBhdHRlcm4gY2VudGVyc1xuICAgIHZhciBvbmVUd29EaXN0YW5jZSA9IGRpc3RhbmNlKHBhdHRlcm4xLCBwYXR0ZXJuMik7XG4gICAgdmFyIHR3b1RocmVlRGlzdGFuY2UgPSBkaXN0YW5jZShwYXR0ZXJuMiwgcGF0dGVybjMpO1xuICAgIHZhciBvbmVUaHJlZURpc3RhbmNlID0gZGlzdGFuY2UocGF0dGVybjEsIHBhdHRlcm4zKTtcbiAgICB2YXIgYm90dG9tTGVmdDtcbiAgICB2YXIgdG9wTGVmdDtcbiAgICB2YXIgdG9wUmlnaHQ7XG4gICAgLy8gQXNzdW1lIG9uZSBjbG9zZXN0IHRvIG90aGVyIHR3byBpcyBCOyBBIGFuZCBDIHdpbGwganVzdCBiZSBndWVzc2VzIGF0IGZpcnN0XG4gICAgaWYgKHR3b1RocmVlRGlzdGFuY2UgPj0gb25lVHdvRGlzdGFuY2UgJiYgdHdvVGhyZWVEaXN0YW5jZSA+PSBvbmVUaHJlZURpc3RhbmNlKSB7XG4gICAgICAgIF9hID0gW3BhdHRlcm4yLCBwYXR0ZXJuMSwgcGF0dGVybjNdLCBib3R0b21MZWZ0ID0gX2FbMF0sIHRvcExlZnQgPSBfYVsxXSwgdG9wUmlnaHQgPSBfYVsyXTtcbiAgICB9XG4gICAgZWxzZSBpZiAob25lVGhyZWVEaXN0YW5jZSA+PSB0d29UaHJlZURpc3RhbmNlICYmIG9uZVRocmVlRGlzdGFuY2UgPj0gb25lVHdvRGlzdGFuY2UpIHtcbiAgICAgICAgX2IgPSBbcGF0dGVybjEsIHBhdHRlcm4yLCBwYXR0ZXJuM10sIGJvdHRvbUxlZnQgPSBfYlswXSwgdG9wTGVmdCA9IF9iWzFdLCB0b3BSaWdodCA9IF9iWzJdO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgX2MgPSBbcGF0dGVybjEsIHBhdHRlcm4zLCBwYXR0ZXJuMl0sIGJvdHRvbUxlZnQgPSBfY1swXSwgdG9wTGVmdCA9IF9jWzFdLCB0b3BSaWdodCA9IF9jWzJdO1xuICAgIH1cbiAgICAvLyBVc2UgY3Jvc3MgcHJvZHVjdCB0byBmaWd1cmUgb3V0IHdoZXRoZXIgYm90dG9tTGVmdCAoQSkgYW5kIHRvcFJpZ2h0IChDKSBhcmUgY29ycmVjdCBvciBmbGlwcGVkIGluIHJlbGF0aW9uIHRvIHRvcExlZnQgKEIpXG4gICAgLy8gVGhpcyBhc2tzIHdoZXRoZXIgQkMgeCBCQSBoYXMgYSBwb3NpdGl2ZSB6IGNvbXBvbmVudCwgd2hpY2ggaXMgdGhlIGFycmFuZ2VtZW50IHdlIHdhbnQuIElmIGl0J3MgbmVnYXRpdmUsIHRoZW5cbiAgICAvLyB3ZSd2ZSBnb3QgaXQgZmxpcHBlZCBhcm91bmQgYW5kIHNob3VsZCBzd2FwIHRvcFJpZ2h0IGFuZCBib3R0b21MZWZ0LlxuICAgIGlmICgoKHRvcFJpZ2h0LnggLSB0b3BMZWZ0LngpICogKGJvdHRvbUxlZnQueSAtIHRvcExlZnQueSkpIC0gKCh0b3BSaWdodC55IC0gdG9wTGVmdC55KSAqIChib3R0b21MZWZ0LnggLSB0b3BMZWZ0LngpKSA8IDApIHtcbiAgICAgICAgX2QgPSBbdG9wUmlnaHQsIGJvdHRvbUxlZnRdLCBib3R0b21MZWZ0ID0gX2RbMF0sIHRvcFJpZ2h0ID0gX2RbMV07XG4gICAgfVxuICAgIHJldHVybiB7IGJvdHRvbUxlZnQ6IGJvdHRvbUxlZnQsIHRvcExlZnQ6IHRvcExlZnQsIHRvcFJpZ2h0OiB0b3BSaWdodCB9O1xufVxuLy8gQ29tcHV0ZXMgdGhlIGRpbWVuc2lvbiAobnVtYmVyIG9mIG1vZHVsZXMgb24gYSBzaWRlKSBvZiB0aGUgUVIgQ29kZSBiYXNlZCBvbiB0aGUgcG9zaXRpb24gb2YgdGhlIGZpbmRlciBwYXR0ZXJuc1xuZnVuY3Rpb24gY29tcHV0ZURpbWVuc2lvbih0b3BMZWZ0LCB0b3BSaWdodCwgYm90dG9tTGVmdCwgbWF0cml4KSB7XG4gICAgdmFyIG1vZHVsZVNpemUgPSAoc3VtKGNvdW50QmxhY2tXaGl0ZVJ1bih0b3BMZWZ0LCBib3R0b21MZWZ0LCBtYXRyaXgsIDUpKSAvIDcgKyAvLyBEaXZpZGUgYnkgNyBzaW5jZSB0aGUgcmF0aW8gaXMgMToxOjM6MToxXG4gICAgICAgIHN1bShjb3VudEJsYWNrV2hpdGVSdW4odG9wTGVmdCwgdG9wUmlnaHQsIG1hdHJpeCwgNSkpIC8gNyArXG4gICAgICAgIHN1bShjb3VudEJsYWNrV2hpdGVSdW4oYm90dG9tTGVmdCwgdG9wTGVmdCwgbWF0cml4LCA1KSkgLyA3ICtcbiAgICAgICAgc3VtKGNvdW50QmxhY2tXaGl0ZVJ1bih0b3BSaWdodCwgdG9wTGVmdCwgbWF0cml4LCA1KSkgLyA3KSAvIDQ7XG4gICAgaWYgKG1vZHVsZVNpemUgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgbW9kdWxlIHNpemVcIik7XG4gICAgfVxuICAgIHZhciB0b3BEaW1lbnNpb24gPSBNYXRoLnJvdW5kKGRpc3RhbmNlKHRvcExlZnQsIHRvcFJpZ2h0KSAvIG1vZHVsZVNpemUpO1xuICAgIHZhciBzaWRlRGltZW5zaW9uID0gTWF0aC5yb3VuZChkaXN0YW5jZSh0b3BMZWZ0LCBib3R0b21MZWZ0KSAvIG1vZHVsZVNpemUpO1xuICAgIHZhciBkaW1lbnNpb24gPSBNYXRoLmZsb29yKCh0b3BEaW1lbnNpb24gKyBzaWRlRGltZW5zaW9uKSAvIDIpICsgNztcbiAgICBzd2l0Y2ggKGRpbWVuc2lvbiAlIDQpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgZGltZW5zaW9uKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgZGltZW5zaW9uLS07XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHsgZGltZW5zaW9uOiBkaW1lbnNpb24sIG1vZHVsZVNpemU6IG1vZHVsZVNpemUgfTtcbn1cbi8vIFRha2VzIGFuIG9yaWdpbiBwb2ludCBhbmQgYW4gZW5kIHBvaW50IGFuZCBjb3VudHMgdGhlIHNpemVzIG9mIHRoZSBibGFjayB3aGl0ZSBydW4gZnJvbSB0aGUgb3JpZ2luIHRvd2FyZHMgdGhlIGVuZCBwb2ludC5cbi8vIFJldHVybnMgYW4gYXJyYXkgb2YgZWxlbWVudHMsIHJlcHJlc2VudGluZyB0aGUgcGl4ZWwgc2l6ZSBvZiB0aGUgYmxhY2sgd2hpdGUgcnVuLlxuLy8gVXNlcyBhIHZhcmlhbnQgb2YgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CcmVzZW5oYW0nc19saW5lX2FsZ29yaXRobVxuZnVuY3Rpb24gY291bnRCbGFja1doaXRlUnVuVG93YXJkc1BvaW50KG9yaWdpbiwgZW5kLCBtYXRyaXgsIGxlbmd0aCkge1xuICAgIHZhciBzd2l0Y2hQb2ludHMgPSBbeyB4OiBNYXRoLmZsb29yKG9yaWdpbi54KSwgeTogTWF0aC5mbG9vcihvcmlnaW4ueSkgfV07XG4gICAgdmFyIHN0ZWVwID0gTWF0aC5hYnMoZW5kLnkgLSBvcmlnaW4ueSkgPiBNYXRoLmFicyhlbmQueCAtIG9yaWdpbi54KTtcbiAgICB2YXIgZnJvbVg7XG4gICAgdmFyIGZyb21ZO1xuICAgIHZhciB0b1g7XG4gICAgdmFyIHRvWTtcbiAgICBpZiAoc3RlZXApIHtcbiAgICAgICAgZnJvbVggPSBNYXRoLmZsb29yKG9yaWdpbi55KTtcbiAgICAgICAgZnJvbVkgPSBNYXRoLmZsb29yKG9yaWdpbi54KTtcbiAgICAgICAgdG9YID0gTWF0aC5mbG9vcihlbmQueSk7XG4gICAgICAgIHRvWSA9IE1hdGguZmxvb3IoZW5kLngpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZnJvbVggPSBNYXRoLmZsb29yKG9yaWdpbi54KTtcbiAgICAgICAgZnJvbVkgPSBNYXRoLmZsb29yKG9yaWdpbi55KTtcbiAgICAgICAgdG9YID0gTWF0aC5mbG9vcihlbmQueCk7XG4gICAgICAgIHRvWSA9IE1hdGguZmxvb3IoZW5kLnkpO1xuICAgIH1cbiAgICB2YXIgZHggPSBNYXRoLmFicyh0b1ggLSBmcm9tWCk7XG4gICAgdmFyIGR5ID0gTWF0aC5hYnModG9ZIC0gZnJvbVkpO1xuICAgIHZhciBlcnJvciA9IE1hdGguZmxvb3IoLWR4IC8gMik7XG4gICAgdmFyIHhTdGVwID0gZnJvbVggPCB0b1ggPyAxIDogLTE7XG4gICAgdmFyIHlTdGVwID0gZnJvbVkgPCB0b1kgPyAxIDogLTE7XG4gICAgdmFyIGN1cnJlbnRQaXhlbCA9IHRydWU7XG4gICAgLy8gTG9vcCB1cCB1bnRpbCB4ID09IHRvWCwgYnV0IG5vdCBiZXlvbmRcbiAgICBmb3IgKHZhciB4ID0gZnJvbVgsIHkgPSBmcm9tWTsgeCAhPT0gdG9YICsgeFN0ZXA7IHggKz0geFN0ZXApIHtcbiAgICAgICAgLy8gRG9lcyBjdXJyZW50IHBpeGVsIG1lYW4gd2UgaGF2ZSBtb3ZlZCB3aGl0ZSB0byBibGFjayBvciB2aWNlIHZlcnNhP1xuICAgICAgICAvLyBTY2FubmluZyBibGFjayBpbiBzdGF0ZSAwLDIgYW5kIHdoaXRlIGluIHN0YXRlIDEsIHNvIGlmIHdlIGZpbmQgdGhlIHdyb25nXG4gICAgICAgIC8vIGNvbG9yLCBhZHZhbmNlIHRvIG5leHQgc3RhdGUgb3IgZW5kIGlmIHdlIGFyZSBpbiBzdGF0ZSAyIGFscmVhZHlcbiAgICAgICAgdmFyIHJlYWxYID0gc3RlZXAgPyB5IDogeDtcbiAgICAgICAgdmFyIHJlYWxZID0gc3RlZXAgPyB4IDogeTtcbiAgICAgICAgaWYgKG1hdHJpeC5nZXQocmVhbFgsIHJlYWxZKSAhPT0gY3VycmVudFBpeGVsKSB7XG4gICAgICAgICAgICBjdXJyZW50UGl4ZWwgPSAhY3VycmVudFBpeGVsO1xuICAgICAgICAgICAgc3dpdGNoUG9pbnRzLnB1c2goeyB4OiByZWFsWCwgeTogcmVhbFkgfSk7XG4gICAgICAgICAgICBpZiAoc3dpdGNoUG9pbnRzLmxlbmd0aCA9PT0gbGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVycm9yICs9IGR5O1xuICAgICAgICBpZiAoZXJyb3IgPiAwKSB7XG4gICAgICAgICAgICBpZiAoeSA9PT0gdG9ZKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5ICs9IHlTdGVwO1xuICAgICAgICAgICAgZXJyb3IgLT0gZHg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGRpc3RhbmNlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHN3aXRjaFBvaW50c1tpXSAmJiBzd2l0Y2hQb2ludHNbaSArIDFdKSB7XG4gICAgICAgICAgICBkaXN0YW5jZXMucHVzaChkaXN0YW5jZShzd2l0Y2hQb2ludHNbaV0sIHN3aXRjaFBvaW50c1tpICsgMV0pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpc3RhbmNlcy5wdXNoKDApO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkaXN0YW5jZXM7XG59XG4vLyBUYWtlcyBhbiBvcmlnaW4gcG9pbnQgYW5kIGFuIGVuZCBwb2ludCBhbmQgY291bnRzIHRoZSBzaXplcyBvZiB0aGUgYmxhY2sgd2hpdGUgcnVuIGluIHRoZSBvcmlnaW4gcG9pbnRcbi8vIGFsb25nIHRoZSBsaW5lIHRoYXQgaW50ZXJzZWN0cyB3aXRoIHRoZSBlbmQgcG9pbnQuIFJldHVybnMgYW4gYXJyYXkgb2YgZWxlbWVudHMsIHJlcHJlc2VudGluZyB0aGUgcGl4ZWwgc2l6ZXNcbi8vIG9mIHRoZSBibGFjayB3aGl0ZSBydW4uIFRha2VzIGEgbGVuZ3RoIHdoaWNoIHJlcHJlc2VudHMgdGhlIG51bWJlciBvZiBzd2l0Y2hlcyBmcm9tIGJsYWNrIHRvIHdoaXRlIHRvIGxvb2sgZm9yLlxuZnVuY3Rpb24gY291bnRCbGFja1doaXRlUnVuKG9yaWdpbiwgZW5kLCBtYXRyaXgsIGxlbmd0aCkge1xuICAgIHZhciBfYTtcbiAgICB2YXIgcmlzZSA9IGVuZC55IC0gb3JpZ2luLnk7XG4gICAgdmFyIHJ1biA9IGVuZC54IC0gb3JpZ2luLng7XG4gICAgdmFyIHRvd2FyZHNFbmQgPSBjb3VudEJsYWNrV2hpdGVSdW5Ub3dhcmRzUG9pbnQob3JpZ2luLCBlbmQsIG1hdHJpeCwgTWF0aC5jZWlsKGxlbmd0aCAvIDIpKTtcbiAgICB2YXIgYXdheUZyb21FbmQgPSBjb3VudEJsYWNrV2hpdGVSdW5Ub3dhcmRzUG9pbnQob3JpZ2luLCB7IHg6IG9yaWdpbi54IC0gcnVuLCB5OiBvcmlnaW4ueSAtIHJpc2UgfSwgbWF0cml4LCBNYXRoLmNlaWwobGVuZ3RoIC8gMikpO1xuICAgIHZhciBtaWRkbGVWYWx1ZSA9IHRvd2FyZHNFbmQuc2hpZnQoKSArIGF3YXlGcm9tRW5kLnNoaWZ0KCkgLSAxOyAvLyBTdWJzdHJhY3Qgb25lIHNvIHdlIGRvbid0IGRvdWJsZSBjb3VudCBhIHBpeGVsXG4gICAgcmV0dXJuIChfYSA9IGF3YXlGcm9tRW5kLmNvbmNhdChtaWRkbGVWYWx1ZSkpLmNvbmNhdC5hcHBseShfYSwgdG93YXJkc0VuZCk7XG59XG4vLyBUYWtlcyBpbiBhIGJsYWNrIHdoaXRlIHJ1biBhbmQgYW4gYXJyYXkgb2YgZXhwZWN0ZWQgcmF0aW9zLiBSZXR1cm5zIHRoZSBhdmVyYWdlIHNpemUgb2YgdGhlIHJ1biBhcyB3ZWxsIGFzIHRoZSBcImVycm9yXCIgLVxuLy8gdGhhdCBpcyB0aGUgYW1vdW50IHRoZSBydW4gZGl2ZXJnZXMgZnJvbSB0aGUgZXhwZWN0ZWQgcmF0aW9cbmZ1bmN0aW9uIHNjb3JlQmxhY2tXaGl0ZVJ1bihzZXF1ZW5jZSwgcmF0aW9zKSB7XG4gICAgdmFyIGF2ZXJhZ2VTaXplID0gc3VtKHNlcXVlbmNlKSAvIHN1bShyYXRpb3MpO1xuICAgIHZhciBlcnJvciA9IDA7XG4gICAgcmF0aW9zLmZvckVhY2goZnVuY3Rpb24gKHJhdGlvLCBpKSB7XG4gICAgICAgIGVycm9yICs9IE1hdGgucG93KChzZXF1ZW5jZVtpXSAtIHJhdGlvICogYXZlcmFnZVNpemUpLCAyKTtcbiAgICB9KTtcbiAgICByZXR1cm4geyBhdmVyYWdlU2l6ZTogYXZlcmFnZVNpemUsIGVycm9yOiBlcnJvciB9O1xufVxuLy8gVGFrZXMgYW4gWCxZIHBvaW50IGFuZCBhbiBhcnJheSBvZiBzaXplcyBhbmQgc2NvcmVzIHRoZSBwb2ludCBhZ2FpbnN0IHRob3NlIHJhdGlvcy5cbi8vIEZvciBleGFtcGxlIGZvciBhIGZpbmRlciBwYXR0ZXJuIHRha2VzIHRoZSByYXRpbyBsaXN0IG9mIDE6MTozOjE6MSBhbmQgY2hlY2tzIGhvcml6b250YWwsIHZlcnRpY2FsIGFuZCBkaWFnb25hbCByYXRpb3Ncbi8vIGFnYWluc3QgdGhhdC5cbmZ1bmN0aW9uIHNjb3JlUGF0dGVybihwb2ludCwgcmF0aW9zLCBtYXRyaXgpIHtcbiAgICB0cnkge1xuICAgICAgICB2YXIgaG9yaXpvbnRhbFJ1biA9IGNvdW50QmxhY2tXaGl0ZVJ1bihwb2ludCwgeyB4OiAtMSwgeTogcG9pbnQueSB9LCBtYXRyaXgsIHJhdGlvcy5sZW5ndGgpO1xuICAgICAgICB2YXIgdmVydGljYWxSdW4gPSBjb3VudEJsYWNrV2hpdGVSdW4ocG9pbnQsIHsgeDogcG9pbnQueCwgeTogLTEgfSwgbWF0cml4LCByYXRpb3MubGVuZ3RoKTtcbiAgICAgICAgdmFyIHRvcExlZnRQb2ludCA9IHtcbiAgICAgICAgICAgIHg6IE1hdGgubWF4KDAsIHBvaW50LnggLSBwb2ludC55KSAtIDEsXG4gICAgICAgICAgICB5OiBNYXRoLm1heCgwLCBwb2ludC55IC0gcG9pbnQueCkgLSAxLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgdG9wTGVmdEJvdHRvbVJpZ2h0UnVuID0gY291bnRCbGFja1doaXRlUnVuKHBvaW50LCB0b3BMZWZ0UG9pbnQsIG1hdHJpeCwgcmF0aW9zLmxlbmd0aCk7XG4gICAgICAgIHZhciBib3R0b21MZWZ0UG9pbnQgPSB7XG4gICAgICAgICAgICB4OiBNYXRoLm1pbihtYXRyaXgud2lkdGgsIHBvaW50LnggKyBwb2ludC55KSArIDEsXG4gICAgICAgICAgICB5OiBNYXRoLm1pbihtYXRyaXguaGVpZ2h0LCBwb2ludC55ICsgcG9pbnQueCkgKyAxLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgYm90dG9tTGVmdFRvcFJpZ2h0UnVuID0gY291bnRCbGFja1doaXRlUnVuKHBvaW50LCBib3R0b21MZWZ0UG9pbnQsIG1hdHJpeCwgcmF0aW9zLmxlbmd0aCk7XG4gICAgICAgIHZhciBob3J6RXJyb3IgPSBzY29yZUJsYWNrV2hpdGVSdW4oaG9yaXpvbnRhbFJ1biwgcmF0aW9zKTtcbiAgICAgICAgdmFyIHZlcnRFcnJvciA9IHNjb3JlQmxhY2tXaGl0ZVJ1bih2ZXJ0aWNhbFJ1biwgcmF0aW9zKTtcbiAgICAgICAgdmFyIGRpYWdEb3duRXJyb3IgPSBzY29yZUJsYWNrV2hpdGVSdW4odG9wTGVmdEJvdHRvbVJpZ2h0UnVuLCByYXRpb3MpO1xuICAgICAgICB2YXIgZGlhZ1VwRXJyb3IgPSBzY29yZUJsYWNrV2hpdGVSdW4oYm90dG9tTGVmdFRvcFJpZ2h0UnVuLCByYXRpb3MpO1xuICAgICAgICB2YXIgcmF0aW9FcnJvciA9IE1hdGguc3FydChob3J6RXJyb3IuZXJyb3IgKiBob3J6RXJyb3IuZXJyb3IgK1xuICAgICAgICAgICAgdmVydEVycm9yLmVycm9yICogdmVydEVycm9yLmVycm9yICtcbiAgICAgICAgICAgIGRpYWdEb3duRXJyb3IuZXJyb3IgKiBkaWFnRG93bkVycm9yLmVycm9yICtcbiAgICAgICAgICAgIGRpYWdVcEVycm9yLmVycm9yICogZGlhZ1VwRXJyb3IuZXJyb3IpO1xuICAgICAgICB2YXIgYXZnU2l6ZSA9IChob3J6RXJyb3IuYXZlcmFnZVNpemUgKyB2ZXJ0RXJyb3IuYXZlcmFnZVNpemUgKyBkaWFnRG93bkVycm9yLmF2ZXJhZ2VTaXplICsgZGlhZ1VwRXJyb3IuYXZlcmFnZVNpemUpIC8gNDtcbiAgICAgICAgdmFyIHNpemVFcnJvciA9IChNYXRoLnBvdygoaG9yekVycm9yLmF2ZXJhZ2VTaXplIC0gYXZnU2l6ZSksIDIpICtcbiAgICAgICAgICAgIE1hdGgucG93KCh2ZXJ0RXJyb3IuYXZlcmFnZVNpemUgLSBhdmdTaXplKSwgMikgK1xuICAgICAgICAgICAgTWF0aC5wb3coKGRpYWdEb3duRXJyb3IuYXZlcmFnZVNpemUgLSBhdmdTaXplKSwgMikgK1xuICAgICAgICAgICAgTWF0aC5wb3coKGRpYWdVcEVycm9yLmF2ZXJhZ2VTaXplIC0gYXZnU2l6ZSksIDIpKSAvIGF2Z1NpemU7XG4gICAgICAgIHJldHVybiByYXRpb0Vycm9yICsgc2l6ZUVycm9yO1xuICAgIH1cbiAgICBjYXRjaCAoX2EpIHtcbiAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlY2VudGVyTG9jYXRpb24obWF0cml4LCBwKSB7XG4gICAgdmFyIGxlZnRYID0gTWF0aC5yb3VuZChwLngpO1xuICAgIHdoaWxlIChtYXRyaXguZ2V0KGxlZnRYLCBNYXRoLnJvdW5kKHAueSkpKSB7XG4gICAgICAgIGxlZnRYLS07XG4gICAgfVxuICAgIHZhciByaWdodFggPSBNYXRoLnJvdW5kKHAueCk7XG4gICAgd2hpbGUgKG1hdHJpeC5nZXQocmlnaHRYLCBNYXRoLnJvdW5kKHAueSkpKSB7XG4gICAgICAgIHJpZ2h0WCsrO1xuICAgIH1cbiAgICB2YXIgeCA9IChsZWZ0WCArIHJpZ2h0WCkgLyAyO1xuICAgIHZhciB0b3BZID0gTWF0aC5yb3VuZChwLnkpO1xuICAgIHdoaWxlIChtYXRyaXguZ2V0KE1hdGgucm91bmQoeCksIHRvcFkpKSB7XG4gICAgICAgIHRvcFktLTtcbiAgICB9XG4gICAgdmFyIGJvdHRvbVkgPSBNYXRoLnJvdW5kKHAueSk7XG4gICAgd2hpbGUgKG1hdHJpeC5nZXQoTWF0aC5yb3VuZCh4KSwgYm90dG9tWSkpIHtcbiAgICAgICAgYm90dG9tWSsrO1xuICAgIH1cbiAgICB2YXIgeSA9ICh0b3BZICsgYm90dG9tWSkgLyAyO1xuICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfTtcbn1cbmZ1bmN0aW9uIGxvY2F0ZShtYXRyaXgpIHtcbiAgICB2YXIgZmluZGVyUGF0dGVyblF1YWRzID0gW107XG4gICAgdmFyIGFjdGl2ZUZpbmRlclBhdHRlcm5RdWFkcyA9IFtdO1xuICAgIHZhciBhbGlnbm1lbnRQYXR0ZXJuUXVhZHMgPSBbXTtcbiAgICB2YXIgYWN0aXZlQWxpZ25tZW50UGF0dGVyblF1YWRzID0gW107XG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoeSkge1xuICAgICAgICB2YXIgbGVuZ3RoXzEgPSAwO1xuICAgICAgICB2YXIgbGFzdEJpdCA9IGZhbHNlO1xuICAgICAgICB2YXIgc2NhbnMgPSBbMCwgMCwgMCwgMCwgMF07XG4gICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHZhciB2ID0gbWF0cml4LmdldCh4LCB5KTtcbiAgICAgICAgICAgIGlmICh2ID09PSBsYXN0Qml0KSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoXzErKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjYW5zID0gW3NjYW5zWzFdLCBzY2Fuc1syXSwgc2NhbnNbM10sIHNjYW5zWzRdLCBsZW5ndGhfMV07XG4gICAgICAgICAgICAgICAgbGVuZ3RoXzEgPSAxO1xuICAgICAgICAgICAgICAgIGxhc3RCaXQgPSB2O1xuICAgICAgICAgICAgICAgIC8vIERvIHRoZSBsYXN0IDUgY29sb3IgY2hhbmdlcyB+IG1hdGNoIHRoZSBleHBlY3RlZCByYXRpbyBmb3IgYSBmaW5kZXIgcGF0dGVybj8gMToxOjM6MToxIG9mIGI6dzpiOnc6YlxuICAgICAgICAgICAgICAgIHZhciBhdmVyYWdlRmluZGVyUGF0dGVybkJsb2Nrc2l6ZSA9IHN1bShzY2FucykgLyA3O1xuICAgICAgICAgICAgICAgIHZhciB2YWxpZEZpbmRlclBhdHRlcm4gPSBNYXRoLmFicyhzY2Fuc1swXSAtIGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplKSA8IGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplICYmXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHNjYW5zWzFdIC0gYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUpIDwgYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUgJiZcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoc2NhbnNbMl0gLSAzICogYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUpIDwgMyAqIGF2ZXJhZ2VGaW5kZXJQYXR0ZXJuQmxvY2tzaXplICYmXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKHNjYW5zWzNdIC0gYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUpIDwgYXZlcmFnZUZpbmRlclBhdHRlcm5CbG9ja3NpemUgJiZcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoc2NhbnNbNF0gLSBhdmVyYWdlRmluZGVyUGF0dGVybkJsb2Nrc2l6ZSkgPCBhdmVyYWdlRmluZGVyUGF0dGVybkJsb2Nrc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgICAhdjsgLy8gQW5kIG1ha2Ugc3VyZSB0aGUgY3VycmVudCBwaXhlbCBpcyB3aGl0ZSBzaW5jZSBmaW5kZXIgcGF0dGVybnMgYXJlIGJvcmRlcmVkIGluIHdoaXRlXG4gICAgICAgICAgICAgICAgLy8gRG8gdGhlIGxhc3QgMyBjb2xvciBjaGFuZ2VzIH4gbWF0Y2ggdGhlIGV4cGVjdGVkIHJhdGlvIGZvciBhbiBhbGlnbm1lbnQgcGF0dGVybj8gMToxOjEgb2YgdzpiOndcbiAgICAgICAgICAgICAgICB2YXIgYXZlcmFnZUFsaWdubWVudFBhdHRlcm5CbG9ja3NpemUgPSBzdW0oc2NhbnMuc2xpY2UoLTMpKSAvIDM7XG4gICAgICAgICAgICAgICAgdmFyIHZhbGlkQWxpZ25tZW50UGF0dGVybiA9IE1hdGguYWJzKHNjYW5zWzJdIC0gYXZlcmFnZUFsaWdubWVudFBhdHRlcm5CbG9ja3NpemUpIDwgYXZlcmFnZUFsaWdubWVudFBhdHRlcm5CbG9ja3NpemUgJiZcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoc2NhbnNbM10gLSBhdmVyYWdlQWxpZ25tZW50UGF0dGVybkJsb2Nrc2l6ZSkgPCBhdmVyYWdlQWxpZ25tZW50UGF0dGVybkJsb2Nrc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhzY2Fuc1s0XSAtIGF2ZXJhZ2VBbGlnbm1lbnRQYXR0ZXJuQmxvY2tzaXplKSA8IGF2ZXJhZ2VBbGlnbm1lbnRQYXR0ZXJuQmxvY2tzaXplICYmXG4gICAgICAgICAgICAgICAgICAgIHY7IC8vIElzIHRoZSBjdXJyZW50IHBpeGVsIGJsYWNrIHNpbmNlIGFsaWdubWVudCBwYXR0ZXJucyBhcmUgYm9yZGVyZWQgaW4gYmxhY2tcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRGaW5kZXJQYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENvbXB1dGUgdGhlIHN0YXJ0IGFuZCBlbmQgeCB2YWx1ZXMgb2YgdGhlIGxhcmdlIGNlbnRlciBibGFjayBzcXVhcmVcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZFhfMSA9IHggLSBzY2Fuc1szXSAtIHNjYW5zWzRdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRYXzEgPSBlbmRYXzEgLSBzY2Fuc1syXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSB7IHN0YXJ0WDogc3RhcnRYXzEsIGVuZFg6IGVuZFhfMSwgeTogeSB9O1xuICAgICAgICAgICAgICAgICAgICAvLyBJcyB0aGVyZSBhIHF1YWQgZGlyZWN0bHkgYWJvdmUgdGhlIGN1cnJlbnQgc3BvdD8gSWYgc28sIGV4dGVuZCBpdCB3aXRoIHRoZSBuZXcgbGluZS4gT3RoZXJ3aXNlLCBjcmVhdGUgYSBuZXcgcXVhZCB3aXRoXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgbGluZSBhcyB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaGluZ1F1YWRzID0gYWN0aXZlRmluZGVyUGF0dGVyblF1YWRzLmZpbHRlcihmdW5jdGlvbiAocSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChzdGFydFhfMSA+PSBxLmJvdHRvbS5zdGFydFggJiYgc3RhcnRYXzEgPD0gcS5ib3R0b20uZW5kWCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZW5kWF8xID49IHEuYm90dG9tLnN0YXJ0WCAmJiBzdGFydFhfMSA8PSBxLmJvdHRvbS5lbmRYKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzdGFydFhfMSA8PSBxLmJvdHRvbS5zdGFydFggJiYgZW5kWF8xID49IHEuYm90dG9tLmVuZFggJiYgKChzY2Fuc1syXSAvIChxLmJvdHRvbS5lbmRYIC0gcS5ib3R0b20uc3RhcnRYKSkgPCBNQVhfUVVBRF9SQVRJTyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2NhbnNbMl0gLyAocS5ib3R0b20uZW5kWCAtIHEuYm90dG9tLnN0YXJ0WCkpID4gTUlOX1FVQURfUkFUSU8pKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGluZ1F1YWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hdGNoaW5nUXVhZHNbMF0uYm90dG9tID0gbGluZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZpbmRlclBhdHRlcm5RdWFkcy5wdXNoKHsgdG9wOiBsaW5lLCBib3R0b206IGxpbmUgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkQWxpZ25tZW50UGF0dGVybikge1xuICAgICAgICAgICAgICAgICAgICAvLyBDb21wdXRlIHRoZSBzdGFydCBhbmQgZW5kIHggdmFsdWVzIG9mIHRoZSBjZW50ZXIgYmxhY2sgc3F1YXJlXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmRYXzIgPSB4IC0gc2NhbnNbNF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydFhfMiA9IGVuZFhfMiAtIHNjYW5zWzNdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHsgc3RhcnRYOiBzdGFydFhfMiwgeTogeSwgZW5kWDogZW5kWF8yIH07XG4gICAgICAgICAgICAgICAgICAgIC8vIElzIHRoZXJlIGEgcXVhZCBkaXJlY3RseSBhYm92ZSB0aGUgY3VycmVudCBzcG90PyBJZiBzbywgZXh0ZW5kIGl0IHdpdGggdGhlIG5ldyBsaW5lLiBPdGhlcndpc2UsIGNyZWF0ZSBhIG5ldyBxdWFkIHdpdGhcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBsaW5lIGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1hdGNoaW5nUXVhZHMgPSBhY3RpdmVBbGlnbm1lbnRQYXR0ZXJuUXVhZHMuZmlsdGVyKGZ1bmN0aW9uIChxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHN0YXJ0WF8yID49IHEuYm90dG9tLnN0YXJ0WCAmJiBzdGFydFhfMiA8PSBxLmJvdHRvbS5lbmRYKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbmRYXzIgPj0gcS5ib3R0b20uc3RhcnRYICYmIHN0YXJ0WF8yIDw9IHEuYm90dG9tLmVuZFgpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN0YXJ0WF8yIDw9IHEuYm90dG9tLnN0YXJ0WCAmJiBlbmRYXzIgPj0gcS5ib3R0b20uZW5kWCAmJiAoKHNjYW5zWzJdIC8gKHEuYm90dG9tLmVuZFggLSBxLmJvdHRvbS5zdGFydFgpKSA8IE1BWF9RVUFEX1JBVElPICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzY2Fuc1syXSAvIChxLmJvdHRvbS5lbmRYIC0gcS5ib3R0b20uc3RhcnRYKSkgPiBNSU5fUVVBRF9SQVRJTykpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoaW5nUXVhZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdRdWFkc1swXS5ib3R0b20gPSBsaW5lO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQWxpZ25tZW50UGF0dGVyblF1YWRzLnB1c2goeyB0b3A6IGxpbmUsIGJvdHRvbTogbGluZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgeCA9IC0xOyB4IDw9IG1hdHJpeC53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICBfbG9vcF8yKHgpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmRlclBhdHRlcm5RdWFkcy5wdXNoLmFwcGx5KGZpbmRlclBhdHRlcm5RdWFkcywgYWN0aXZlRmluZGVyUGF0dGVyblF1YWRzLmZpbHRlcihmdW5jdGlvbiAocSkgeyByZXR1cm4gcS5ib3R0b20ueSAhPT0geSAmJiBxLmJvdHRvbS55IC0gcS50b3AueSA+PSAyOyB9KSk7XG4gICAgICAgIGFjdGl2ZUZpbmRlclBhdHRlcm5RdWFkcyA9IGFjdGl2ZUZpbmRlclBhdHRlcm5RdWFkcy5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuIHEuYm90dG9tLnkgPT09IHk7IH0pO1xuICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuUXVhZHMucHVzaC5hcHBseShhbGlnbm1lbnRQYXR0ZXJuUXVhZHMsIGFjdGl2ZUFsaWdubWVudFBhdHRlcm5RdWFkcy5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuIHEuYm90dG9tLnkgIT09IHk7IH0pKTtcbiAgICAgICAgYWN0aXZlQWxpZ25tZW50UGF0dGVyblF1YWRzID0gYWN0aXZlQWxpZ25tZW50UGF0dGVyblF1YWRzLmZpbHRlcihmdW5jdGlvbiAocSkgeyByZXR1cm4gcS5ib3R0b20ueSA9PT0geTsgfSk7XG4gICAgfTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8PSBtYXRyaXguaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgX2xvb3BfMSh5KTtcbiAgICB9XG4gICAgZmluZGVyUGF0dGVyblF1YWRzLnB1c2guYXBwbHkoZmluZGVyUGF0dGVyblF1YWRzLCBhY3RpdmVGaW5kZXJQYXR0ZXJuUXVhZHMuZmlsdGVyKGZ1bmN0aW9uIChxKSB7IHJldHVybiBxLmJvdHRvbS55IC0gcS50b3AueSA+PSAyOyB9KSk7XG4gICAgYWxpZ25tZW50UGF0dGVyblF1YWRzLnB1c2guYXBwbHkoYWxpZ25tZW50UGF0dGVyblF1YWRzLCBhY3RpdmVBbGlnbm1lbnRQYXR0ZXJuUXVhZHMpO1xuICAgIHZhciBmaW5kZXJQYXR0ZXJuR3JvdXBzID0gZmluZGVyUGF0dGVyblF1YWRzXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuIHEuYm90dG9tLnkgLSBxLnRvcC55ID49IDI7IH0pIC8vIEFsbCBxdWFkcyBtdXN0IGJlIGF0IGxlYXN0IDJweCB0YWxsIHNpbmNlIHRoZSBjZW50ZXIgc3F1YXJlIGlzIGxhcmdlciB0aGFuIGEgYmxvY2tcbiAgICAgICAgLm1hcChmdW5jdGlvbiAocSkge1xuICAgICAgICB2YXIgeCA9IChxLnRvcC5zdGFydFggKyBxLnRvcC5lbmRYICsgcS5ib3R0b20uc3RhcnRYICsgcS5ib3R0b20uZW5kWCkgLyA0O1xuICAgICAgICB2YXIgeSA9IChxLnRvcC55ICsgcS5ib3R0b20ueSArIDEpIC8gMjtcbiAgICAgICAgaWYgKCFtYXRyaXguZ2V0KE1hdGgucm91bmQoeCksIE1hdGgucm91bmQoeSkpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aHMgPSBbcS50b3AuZW5kWCAtIHEudG9wLnN0YXJ0WCwgcS5ib3R0b20uZW5kWCAtIHEuYm90dG9tLnN0YXJ0WCwgcS5ib3R0b20ueSAtIHEudG9wLnkgKyAxXTtcbiAgICAgICAgdmFyIHNpemUgPSBzdW0obGVuZ3RocykgLyBsZW5ndGhzLmxlbmd0aDtcbiAgICAgICAgdmFyIHNjb3JlID0gc2NvcmVQYXR0ZXJuKHsgeDogTWF0aC5yb3VuZCh4KSwgeTogTWF0aC5yb3VuZCh5KSB9LCBbMSwgMSwgMywgMSwgMV0sIG1hdHJpeCk7XG4gICAgICAgIHJldHVybiB7IHNjb3JlOiBzY29yZSwgeDogeCwgeTogeSwgc2l6ZTogc2l6ZSB9O1xuICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHEpIHsgcmV0dXJuICEhcTsgfSkgLy8gRmlsdGVyIG91dCBhbnkgcmVqZWN0ZWQgcXVhZHMgZnJvbSBhYm92ZVxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5zY29yZSAtIGIuc2NvcmU7IH0pXG4gICAgICAgIC8vIE5vdyB0YWtlIHRoZSB0b3AgZmluZGVyIHBhdHRlcm4gb3B0aW9ucyBhbmQgdHJ5IHRvIGZpbmQgMiBvdGhlciBvcHRpb25zIHdpdGggYSBzaW1pbGFyIHNpemUuXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKHBvaW50LCBpLCBmaW5kZXJQYXR0ZXJucykge1xuICAgICAgICBpZiAoaSA+IE1BWF9GSU5ERVJQQVRURVJOU19UT19TRUFSQ0gpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvdGhlclBvaW50cyA9IGZpbmRlclBhdHRlcm5zXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChwLCBpaSkgeyByZXR1cm4gaSAhPT0gaWk7IH0pXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChwKSB7IHJldHVybiAoeyB4OiBwLngsIHk6IHAueSwgc2NvcmU6IHAuc2NvcmUgKyAoTWF0aC5wb3coKHAuc2l6ZSAtIHBvaW50LnNpemUpLCAyKSkgLyBwb2ludC5zaXplLCBzaXplOiBwLnNpemUgfSk7IH0pXG4gICAgICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5zY29yZSAtIGIuc2NvcmU7IH0pO1xuICAgICAgICBpZiAob3RoZXJQb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjb3JlID0gcG9pbnQuc2NvcmUgKyBvdGhlclBvaW50c1swXS5zY29yZSArIG90aGVyUG9pbnRzWzFdLnNjb3JlO1xuICAgICAgICByZXR1cm4geyBwb2ludHM6IFtwb2ludF0uY29uY2F0KG90aGVyUG9pbnRzLnNsaWNlKDAsIDIpKSwgc2NvcmU6IHNjb3JlIH07XG4gICAgfSlcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAocSkgeyByZXR1cm4gISFxOyB9KSAvLyBGaWx0ZXIgb3V0IGFueSByZWplY3RlZCBmaW5kZXIgcGF0dGVybnMgZnJvbSBhYm92ZVxuICAgICAgICAuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5zY29yZSAtIGIuc2NvcmU7IH0pO1xuICAgIGlmIChmaW5kZXJQYXR0ZXJuR3JvdXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIF9hID0gcmVvcmRlckZpbmRlclBhdHRlcm5zKGZpbmRlclBhdHRlcm5Hcm91cHNbMF0ucG9pbnRzWzBdLCBmaW5kZXJQYXR0ZXJuR3JvdXBzWzBdLnBvaW50c1sxXSwgZmluZGVyUGF0dGVybkdyb3Vwc1swXS5wb2ludHNbMl0pLCB0b3BSaWdodCA9IF9hLnRvcFJpZ2h0LCB0b3BMZWZ0ID0gX2EudG9wTGVmdCwgYm90dG9tTGVmdCA9IF9hLmJvdHRvbUxlZnQ7XG4gICAgdmFyIGFsaWdubWVudCA9IGZpbmRBbGlnbm1lbnRQYXR0ZXJuKG1hdHJpeCwgYWxpZ25tZW50UGF0dGVyblF1YWRzLCB0b3BSaWdodCwgdG9wTGVmdCwgYm90dG9tTGVmdCk7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIGlmIChhbGlnbm1lbnQpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgYWxpZ25tZW50UGF0dGVybjogeyB4OiBhbGlnbm1lbnQuYWxpZ25tZW50UGF0dGVybi54LCB5OiBhbGlnbm1lbnQuYWxpZ25tZW50UGF0dGVybi55IH0sXG4gICAgICAgICAgICBib3R0b21MZWZ0OiB7IHg6IGJvdHRvbUxlZnQueCwgeTogYm90dG9tTGVmdC55IH0sXG4gICAgICAgICAgICBkaW1lbnNpb246IGFsaWdubWVudC5kaW1lbnNpb24sXG4gICAgICAgICAgICB0b3BMZWZ0OiB7IHg6IHRvcExlZnQueCwgeTogdG9wTGVmdC55IH0sXG4gICAgICAgICAgICB0b3BSaWdodDogeyB4OiB0b3BSaWdodC54LCB5OiB0b3BSaWdodC55IH0sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBXZSBub3JtYWxseSB1c2UgdGhlIGNlbnRlciBvZiB0aGUgcXVhZHMgYXMgdGhlIGxvY2F0aW9uIG9mIHRoZSB0cmFja2luZyBwb2ludHMsIHdoaWNoIGlzIG9wdGltYWwgZm9yIG1vc3QgY2FzZXMgYW5kIHdpbGwgYWNjb3VudFxuICAgIC8vIGZvciBhIHNrZXcgaW4gdGhlIGltYWdlLiBIb3dldmVyLCBJbiBzb21lIGNhc2VzLCBhIHNsaWdodCBza2V3IG1pZ2h0IG5vdCBiZSByZWFsIGFuZCBpbnN0ZWFkIGJlIGNhdXNlZCBieSBpbWFnZSBjb21wcmVzc2lvblxuICAgIC8vIGVycm9ycyBhbmQvb3IgbG93IHJlc29sdXRpb24uIEZvciB0aG9zZSBjYXNlcywgd2UnZCBiZSBiZXR0ZXIgb2ZmIGNlbnRlcmluZyB0aGUgcG9pbnQgZXhhY3RseSBpbiB0aGUgbWlkZGxlIG9mIHRoZSBibGFjayBhcmVhLiBXZVxuICAgIC8vIGNvbXB1dGUgYW5kIHJldHVybiB0aGUgbG9jYXRpb24gZGF0YSBmb3IgdGhlIG5haXZlbHkgY2VudGVyZWQgcG9pbnRzIGFzIGl0IGlzIGxpdHRsZSBhZGRpdGlvbmFsIHdvcmsgYW5kIGFsbG93cyBmb3IgbXVsdGlwbGVcbiAgICAvLyBhdHRlbXB0cyBhdCBkZWNvZGluZyBoYXJkZXIgaW1hZ2VzLlxuICAgIHZhciBtaWRUb3BSaWdodCA9IHJlY2VudGVyTG9jYXRpb24obWF0cml4LCB0b3BSaWdodCk7XG4gICAgdmFyIG1pZFRvcExlZnQgPSByZWNlbnRlckxvY2F0aW9uKG1hdHJpeCwgdG9wTGVmdCk7XG4gICAgdmFyIG1pZEJvdHRvbUxlZnQgPSByZWNlbnRlckxvY2F0aW9uKG1hdHJpeCwgYm90dG9tTGVmdCk7XG4gICAgdmFyIGNlbnRlcmVkQWxpZ25tZW50ID0gZmluZEFsaWdubWVudFBhdHRlcm4obWF0cml4LCBhbGlnbm1lbnRQYXR0ZXJuUXVhZHMsIG1pZFRvcFJpZ2h0LCBtaWRUb3BMZWZ0LCBtaWRCb3R0b21MZWZ0KTtcbiAgICBpZiAoY2VudGVyZWRBbGlnbm1lbnQpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgYWxpZ25tZW50UGF0dGVybjogeyB4OiBjZW50ZXJlZEFsaWdubWVudC5hbGlnbm1lbnRQYXR0ZXJuLngsIHk6IGNlbnRlcmVkQWxpZ25tZW50LmFsaWdubWVudFBhdHRlcm4ueSB9LFxuICAgICAgICAgICAgYm90dG9tTGVmdDogeyB4OiBtaWRCb3R0b21MZWZ0LngsIHk6IG1pZEJvdHRvbUxlZnQueSB9LFxuICAgICAgICAgICAgdG9wTGVmdDogeyB4OiBtaWRUb3BMZWZ0LngsIHk6IG1pZFRvcExlZnQueSB9LFxuICAgICAgICAgICAgdG9wUmlnaHQ6IHsgeDogbWlkVG9wUmlnaHQueCwgeTogbWlkVG9wUmlnaHQueSB9LFxuICAgICAgICAgICAgZGltZW5zaW9uOiBjZW50ZXJlZEFsaWdubWVudC5kaW1lbnNpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMubG9jYXRlID0gbG9jYXRlO1xuZnVuY3Rpb24gZmluZEFsaWdubWVudFBhdHRlcm4obWF0cml4LCBhbGlnbm1lbnRQYXR0ZXJuUXVhZHMsIHRvcFJpZ2h0LCB0b3BMZWZ0LCBib3R0b21MZWZ0KSB7XG4gICAgdmFyIF9hO1xuICAgIC8vIE5vdyB0aGF0IHdlJ3ZlIGZvdW5kIHRoZSB0aHJlZSBmaW5kZXIgcGF0dGVybnMgd2UgY2FuIGRldGVybWluZSB0aGUgYmxvY2tTaXplIGFuZCB0aGUgc2l6ZSBvZiB0aGUgUVIgY29kZS5cbiAgICAvLyBXZSdsbCB1c2UgdGhlc2UgdG8gaGVscCBmaW5kIHRoZSBhbGlnbm1lbnQgcGF0dGVybiBidXQgYWxzbyBsYXRlciB3aGVuIHdlIGRvIHRoZSBleHRyYWN0aW9uLlxuICAgIHZhciBkaW1lbnNpb247XG4gICAgdmFyIG1vZHVsZVNpemU7XG4gICAgdHJ5IHtcbiAgICAgICAgKF9hID0gY29tcHV0ZURpbWVuc2lvbih0b3BMZWZ0LCB0b3BSaWdodCwgYm90dG9tTGVmdCwgbWF0cml4KSwgZGltZW5zaW9uID0gX2EuZGltZW5zaW9uLCBtb2R1bGVTaXplID0gX2EubW9kdWxlU2l6ZSk7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICAvLyBOb3cgZmluZCB0aGUgYWxpZ25tZW50IHBhdHRlcm5cbiAgICB2YXIgYm90dG9tUmlnaHRGaW5kZXJQYXR0ZXJuID0ge1xuICAgICAgICB4OiB0b3BSaWdodC54IC0gdG9wTGVmdC54ICsgYm90dG9tTGVmdC54LFxuICAgICAgICB5OiB0b3BSaWdodC55IC0gdG9wTGVmdC55ICsgYm90dG9tTGVmdC55LFxuICAgIH07XG4gICAgdmFyIG1vZHVsZXNCZXR3ZWVuRmluZGVyUGF0dGVybnMgPSAoKGRpc3RhbmNlKHRvcExlZnQsIGJvdHRvbUxlZnQpICsgZGlzdGFuY2UodG9wTGVmdCwgdG9wUmlnaHQpKSAvIDIgLyBtb2R1bGVTaXplKTtcbiAgICB2YXIgY29ycmVjdGlvblRvVG9wTGVmdCA9IDEgLSAoMyAvIG1vZHVsZXNCZXR3ZWVuRmluZGVyUGF0dGVybnMpO1xuICAgIHZhciBleHBlY3RlZEFsaWdubWVudFBhdHRlcm4gPSB7XG4gICAgICAgIHg6IHRvcExlZnQueCArIGNvcnJlY3Rpb25Ub1RvcExlZnQgKiAoYm90dG9tUmlnaHRGaW5kZXJQYXR0ZXJuLnggLSB0b3BMZWZ0LngpLFxuICAgICAgICB5OiB0b3BMZWZ0LnkgKyBjb3JyZWN0aW9uVG9Ub3BMZWZ0ICogKGJvdHRvbVJpZ2h0RmluZGVyUGF0dGVybi55IC0gdG9wTGVmdC55KSxcbiAgICB9O1xuICAgIHZhciBhbGlnbm1lbnRQYXR0ZXJucyA9IGFsaWdubWVudFBhdHRlcm5RdWFkc1xuICAgICAgICAubWFwKGZ1bmN0aW9uIChxKSB7XG4gICAgICAgIHZhciB4ID0gKHEudG9wLnN0YXJ0WCArIHEudG9wLmVuZFggKyBxLmJvdHRvbS5zdGFydFggKyBxLmJvdHRvbS5lbmRYKSAvIDQ7XG4gICAgICAgIHZhciB5ID0gKHEudG9wLnkgKyBxLmJvdHRvbS55ICsgMSkgLyAyO1xuICAgICAgICBpZiAoIW1hdHJpeC5nZXQoTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuZ3RocyA9IFtxLnRvcC5lbmRYIC0gcS50b3Auc3RhcnRYLCBxLmJvdHRvbS5lbmRYIC0gcS5ib3R0b20uc3RhcnRYLCAocS5ib3R0b20ueSAtIHEudG9wLnkgKyAxKV07XG4gICAgICAgIHZhciBzaXplID0gc3VtKGxlbmd0aHMpIC8gbGVuZ3Rocy5sZW5ndGg7XG4gICAgICAgIHZhciBzaXplU2NvcmUgPSBzY29yZVBhdHRlcm4oeyB4OiBNYXRoLmZsb29yKHgpLCB5OiBNYXRoLmZsb29yKHkpIH0sIFsxLCAxLCAxXSwgbWF0cml4KTtcbiAgICAgICAgdmFyIHNjb3JlID0gc2l6ZVNjb3JlICsgZGlzdGFuY2UoeyB4OiB4LCB5OiB5IH0sIGV4cGVjdGVkQWxpZ25tZW50UGF0dGVybik7XG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHksIHNjb3JlOiBzY29yZSB9O1xuICAgIH0pXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuICEhdjsgfSlcbiAgICAgICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuc2NvcmUgLSBiLnNjb3JlOyB9KTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgbGVzcyB0aGFuIDE1IG1vZHVsZXMgYmV0d2VlbiBmaW5kZXIgcGF0dGVybnMgaXQncyBhIHZlcnNpb24gMSBRUiBjb2RlIGFuZCBhcyBzdWNoIGhhcyBubyBhbGlnbm1lbW50IHBhdHRlcm5cbiAgICAvLyBzbyB3ZSBjYW4gb25seSB1c2Ugb3VyIGJlc3QgZ3Vlc3MuXG4gICAgdmFyIGFsaWdubWVudFBhdHRlcm4gPSBtb2R1bGVzQmV0d2VlbkZpbmRlclBhdHRlcm5zID49IDE1ICYmIGFsaWdubWVudFBhdHRlcm5zLmxlbmd0aCA/IGFsaWdubWVudFBhdHRlcm5zWzBdIDogZXhwZWN0ZWRBbGlnbm1lbnRQYXR0ZXJuO1xuICAgIHJldHVybiB7IGFsaWdubWVudFBhdHRlcm46IGFsaWdubWVudFBhdHRlcm4sIGRpbWVuc2lvbjogZGltZW5zaW9uIH07XG59XG5cblxuLyoqKi8gfSlcbi8qKioqKiovIF0pW1wiZGVmYXVsdFwiXTtcbn0pOyIsIi8qKlxuICogQ29kZWQgQnkgOiBhaWdlbnNlZXJcbiAqIENvcHlyaWdodCAyMDIxLCBodHRwczovL2dpdGh1Yi5jb20vYWlnZW5zZWVyXG4gKi9cbmltcG9ydCBqc1FSIGZyb20gXCJqc3FyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFFSUmVhZGVyIHtcblxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZEFycmF5QnVmZmVyKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogc3RyaW5nfG51bGxcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRVaW50OENsYW1wZWRBcnJheShuZXcgVWludDhDbGFtcGVkQXJyYXkoYnVmZmVyKSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0YXRpYyByZWFkVWludDhDbGFtcGVkQXJyYXkoYnVmZmVyOiBVaW50OENsYW1wZWRBcnJheSwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBzdHJpbmd8bnVsbFxuICAgIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0ganNRUihidWZmZXIsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgaWYoY29kZSAhPT0gbnVsbCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvZGUuZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIH1jYXRjaCAoZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8vIDxyZWZlcmVuY2UgbGliPVwiV2ViV29ya2VyXCIgLz5cbmltcG9ydCBRUlJlYWRlciBmcm9tIFwiLi4vLi4vcXItc2Nhbm5lci1qcy1zcmMvc3JjL2xpYi9RUlJlYWRlclwiO1xuXG5leHBvcnQgdHlwZSB7fTtcbmRlY2xhcmUgY29uc3Qgc2VsZjogV29ya2VyO1xuXG5zZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZih0eXBlb2YgZS5kYXRhWzBdICE9PSBcIm9iamVjdFwiIHx8IGUuZGF0YVswXS5jb25zdHJ1Y3RvciAhPSBJbWFnZURhdGFcbiAgICApe1xuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKG51bGwpO1xuICAgIH1lbHNle1xuICAgICAgICBsZXQgaW1hZ2VEYXRhID0gKGUuZGF0YVswXSBhcyBJbWFnZURhdGEpO1xuICAgICAgICBsZXQgZGF0YSA9IFFSUmVhZGVyLnJlYWRVaW50OENsYW1wZWRBcnJheShpbWFnZURhdGEuZGF0YSwgaW1hZ2VEYXRhLndpZHRoLCBpbWFnZURhdGEuaGVpZ2h0KTtcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZShkYXRhKTtcbiAgICB9XG59O1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=