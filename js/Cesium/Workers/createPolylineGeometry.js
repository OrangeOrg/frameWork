/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
/**
@license
mersenne-twister.js - https://gist.github.com/banksean/300494

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

! function() {
	define("Core/defined", [], function() {
		"use strict";

		function e(e) {
			return void 0 !== e && null !== e
		}
		return e
	}), define("Core/DeveloperError", ["./defined"], function(e) {
		"use strict";

		function t(e) {
			this.name = "DeveloperError", this.message = e;
			var t;
			try {
				throw new Error
			} catch(r) {
				t = r.stack
			}
			this.stack = t
		}
		return e(Object.create) && (t.prototype = Object.create(Error.prototype), t.prototype.constructor = t), t.prototype.toString = function() {
			var t = this.name + ": " + this.message;
			return e(this.stack) && (t += "\n" + this.stack.toString()), t
		}, t.throwInstantiationError = function() {
			throw new t("This function defines an interface and should not be called directly.")
		}, t
	}), define("Core/Check", ["./defined", "./DeveloperError"], function(e, t) {
		"use strict";

		function r(e) {
			return e + " is required, actual value was undefined"
		}

		function n(e, t, r) {
			return "Expected " + r + " to be typeof " + t + ", actual typeof was " + e
		}
		var i = {};
		return i.typeOf = {}, i.defined = function(n, i) {
			if(!e(i)) throw new t(r(n))
		}, i.typeOf.func = function(e, r) {
			if("function" != typeof r) throw new t(n(typeof r, "function", e))
		}, i.typeOf.string = function(e, r) {
			if("string" != typeof r) throw new t(n(typeof r, "string", e))
		}, i.typeOf.number = function(e, r) {
			if("number" != typeof r) throw new t(n(typeof r, "number", e))
		}, i.typeOf.number.lessThan = function(e, r, n) {
			if(i.typeOf.number(e, r), r >= n) throw new t("Expected " + e + " to be less than " + n + ", actual value was " + r)
		}, i.typeOf.number.lessThanOrEquals = function(e, r, n) {
			if(i.typeOf.number(e, r), r > n) throw new t("Expected " + e + " to be less than or equal to " + n + ", actual value was " + r)
		}, i.typeOf.number.greaterThan = function(e, r, n) {
			if(i.typeOf.number(e, r), n >= r) throw new t("Expected " + e + " to be greater than " + n + ", actual value was " + r)
		}, i.typeOf.number.greaterThanOrEquals = function(e, r, n) {
			if(i.typeOf.number(e, r), n > r) throw new t("Expected " + e + " to be greater than or equal to" + n + ", actual value was " + r)
		}, i.typeOf.object = function(e, r) {
			if("object" != typeof r) throw new t(n(typeof r, "object", e))
		}, i.typeOf.bool = function(e, r) {
			if("boolean" != typeof r) throw new t(n(typeof r, "boolean", e))
		}, i.typeOf.number.equals = function(e, r, n, o) {
			if(i.typeOf.number(e, n), i.typeOf.number(r, o), n !== o) throw new t(e + " must be equal to " + r + ", the actual values are " + n + " and " + o)
		}, i
	}), define("Core/freezeObject", ["./defined"], function(e) {
		"use strict";
		var t = Object.freeze;
		return e(t) || (t = function(e) {
			return e
		}), t
	}), define("Core/defaultValue", ["./freezeObject"], function(e) {
		"use strict";

		function t(e, t) {
			return void 0 !== e && null !== e ? e : t
		}
		return t.EMPTY_OBJECT = e({}), t
	}), define("ThirdParty/mersenne-twister", [], function() {
		var e = function(e) {
			void 0 == e && (e = (new Date).getTime()), this.N = 624, this.M = 397, this.MATRIX_A = 2567483615, this.UPPER_MASK = 2147483648, this.LOWER_MASK = 2147483647, this.mt = new Array(this.N), this.mti = this.N + 1, this.init_genrand(e)
		};
		return e.prototype.init_genrand = function(e) {
			for(this.mt[0] = e >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
				var e = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
				this.mt[this.mti] = (1812433253 * ((4294901760 & e) >>> 16) << 16) + 1812433253 * (65535 & e) + this.mti, this.mt[this.mti] >>>= 0
			}
		}, e.prototype.genrand_int32 = function() {
			var e, t = new Array(0, this.MATRIX_A);
			if(this.mti >= this.N) {
				var r;
				for(this.mti == this.N + 1 && this.init_genrand(5489), r = 0; r < this.N - this.M; r++) e = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + this.M] ^ e >>> 1 ^ t[1 & e];
				for(; r < this.N - 1; r++) e = this.mt[r] & this.UPPER_MASK | this.mt[r + 1] & this.LOWER_MASK, this.mt[r] = this.mt[r + (this.M - this.N)] ^ e >>> 1 ^ t[1 & e];
				e = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK, this.mt[this.N - 1] = this.mt[this.M - 1] ^ e >>> 1 ^ t[1 & e], this.mti = 0
			}
			return e = this.mt[this.mti++], e ^= e >>> 11, e ^= e << 7 & 2636928640, e ^= e << 15 & 4022730752, e ^= e >>> 18, e >>> 0
		}, e.prototype.random = function() {
			return this.genrand_int32() * (1 / 4294967296)
		}, e
	}), define("Core/Math", ["../ThirdParty/mersenne-twister", "./defaultValue", "./defined", "./DeveloperError"], function(e, t, r, n) {
		"use strict";
		var i = {};
		i.Radious = 6378137, i.EPSILON1 = .1, i.EPSILON2 = .01, i.EPSILON3 = .001, i.EPSILON4 = 1e-4, i.EPSILON5 = 1e-5, i.EPSILON6 = 1e-6, i.EPSILON7 = 1e-7, i.EPSILON8 = 1e-8, i.EPSILON9 = 1e-9, i.EPSILON10 = 1e-10, i.EPSILON11 = 1e-11, i.EPSILON12 = 1e-12, i.EPSILON13 = 1e-13, i.EPSILON14 = 1e-14, i.EPSILON15 = 1e-15, i.EPSILON16 = 1e-16, i.EPSILON17 = 1e-17, i.EPSILON18 = 1e-18, i.EPSILON19 = 1e-19, i.EPSILON20 = 1e-20, i.GRAVITATIONALPARAMETER = 3986004418e5, i.SOLAR_RADIUS = 6955e5, i.LUNAR_RADIUS = 1737400, i.SIXTY_FOUR_KILOBYTES = 65536, i.sign = function(e) {
			return e > 0 ? 1 : 0 > e ? -1 : 0
		}, i.signNotZero = function(e) {
			return 0 > e ? -1 : 1
		}, i.toSNorm = function(e, r) {
			return r = t(r, 255), Math.round((.5 * i.clamp(e, -1, 1) + .5) * r)
		}, i.fromSNorm = function(e, r) {
			return r = t(r, 255), i.clamp(e, 0, r) / r * 2 - 1
		}, i.sinh = function(e) {
			var t = Math.pow(Math.E, e),
				r = Math.pow(Math.E, -1 * e);
			return .5 * (t - r)
		}, i.cosh = function(e) {
			var t = Math.pow(Math.E, e),
				r = Math.pow(Math.E, -1 * e);
			return .5 * (t + r)
		}, i.lerp = function(e, t, r) {
			return(1 - r) * e + r * t
		}, i.PI = Math.PI, i.ONE_OVER_PI = 1 / Math.PI, i.PI_OVER_TWO = .5 * Math.PI, i.PI_OVER_THREE = Math.PI / 3, i.PI_OVER_FOUR = Math.PI / 4, i.PI_OVER_SIX = Math.PI / 6, i.THREE_PI_OVER_TWO = 3 * Math.PI * .5, i.TWO_PI = 2 * Math.PI, i.ONE_OVER_TWO_PI = 1 / (2 * Math.PI), i.RADIANS_PER_DEGREE = Math.PI / 180, i.DEGREES_PER_RADIAN = 180 / Math.PI, i.RADIANS_PER_ARCSECOND = i.RADIANS_PER_DEGREE / 3600, i.toRadians = function(e) {
			if(!r(e)) throw new n("degrees is required.");
			return e * i.RADIANS_PER_DEGREE
		}, i.toDegrees = function(e) {
			if(!r(e)) throw new n("radians is required.");
			return e * i.DEGREES_PER_RADIAN
		}, i.convertLongitudeRange = function(e) {
			if(!r(e)) throw new n("angle is required.");
			var t = i.TWO_PI,
				o = e - Math.floor(e / t) * t;
			return o < -Math.PI ? o + t : o >= Math.PI ? o - t : o
		}, i.clampToLatitudeRange = function(e) {
			if(!r(e)) throw new n("angle is required.");
			return i.clamp(e, -1 * i.PI_OVER_TWO, i.PI_OVER_TWO)
		}, i.negativePiToPi = function(e) {
			if(!r(e)) throw new n("angle is required.");
			return i.zeroToTwoPi(e + i.PI) - i.PI
		}, i.zeroToTwoPi = function(e) {
			if(!r(e)) throw new n("angle is required.");
			var t = i.mod(e, i.TWO_PI);
			return Math.abs(t) < i.EPSILON14 && Math.abs(e) > i.EPSILON14 ? i.TWO_PI : t
		}, i.mod = function(e, t) {
			if(!r(e)) throw new n("m is required.");
			if(!r(t)) throw new n("n is required.");
			return(e % t + t) % t
		}, i.equalsEpsilon = function(e, i, o, a) {
			if(!r(e)) throw new n("left is required.");
			if(!r(i)) throw new n("right is required.");
			if(!r(o)) throw new n("relativeEpsilon is required.");
			a = t(a, o);
			var u = Math.abs(e - i);
			return a >= u || u <= o * Math.max(Math.abs(e), Math.abs(i))
		};
		var o = [1];
		i.factorial = function(e) {
			if("number" != typeof e || 0 > e) throw new n("A number greater than or equal to 0 is required.");
			var t = o.length;
			if(e >= t)
				for(var r = o[t - 1], i = t; e >= i; i++) o.push(r * i);
			return o[e]
		}, i.incrementWrap = function(e, i, o) {
			if(o = t(o, 0), !r(e)) throw new n("n is required.");
			if(o >= i) throw new n("maximumValue must be greater than minimumValue.");
			return ++e, e > i && (e = o), e
		}, i.isPowerOfTwo = function(e) {
			if("number" != typeof e || 0 > e) throw new n("A number greater than or equal to 0 is required.");
			return 0 !== e && 0 === (e & e - 1)
		}, i.nextPowerOfTwo = function(e) {
			if("number" != typeof e || 0 > e) throw new n("A number greater than or equal to 0 is required.");
			return --e, e |= e >> 1, e |= e >> 2, e |= e >> 4, e |= e >> 8, e |= e >> 16, ++e, e
		}, i.clamp = function(e, t, i) {
			if(!r(e)) throw new n("value is required");
			if(!r(t)) throw new n("min is required.");
			if(!r(i)) throw new n("max is required.");
			return t > e ? t : e > i ? i : e
		};
		var a = new e;
		return i.setRandomNumberSeed = function(t) {
			if(!r(t)) throw new n("seed is required.");
			a = new e(t)
		}, i.nextRandomNumber = function() {
			return a.random()
		}, i.randomBetween = function(e, t) {
			return i.nextRandomNumber() * (t - e) + e
		}, i.acosClamped = function(e) {
			if(!r(e)) throw new n("value is required.");
			return Math.acos(i.clamp(e, -1, 1))
		}, i.asinClamped = function(e) {
			if(!r(e)) throw new n("value is required.");
			return Math.asin(i.clamp(e, -1, 1))
		}, i.chordLength = function(e, t) {
			if(!r(e)) throw new n("angle is required.");
			if(!r(t)) throw new n("radius is required.");
			return 2 * t * Math.sin(.5 * e)
		}, i.logBase = function(e, t) {
			if(!r(e)) throw new n("number is required.");
			if(!r(t)) throw new n("base is required.");
			return Math.log(e) / Math.log(t)
		}, i.fog = function(e, t) {
			var r = e * t;
			return 1 - Math.exp(-(r * r))
		}, i
	}), define("Core/Cartesian3", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function(e, t, r, n, i, o) {
		"use strict";

		function a(e, r, n) {
			this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0)
		}
		a.fromSpherical = function(n, i) {
			e.typeOf.object("spherical", n), r(i) || (i = new a);
			var o = n.clock,
				u = n.cone,
				s = t(n.magnitude, 1),
				c = s * Math.sin(u);
			return i.x = c * Math.cos(o), i.y = c * Math.sin(o), i.z = s * Math.cos(u), i
		}, a.fromElements = function(e, t, n, i) {
			return r(i) ? (i.x = e, i.y = t, i.z = n, i) : new a(e, t, n)
		}, a.clone = function(e, t) {
			return r(e) ? r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t) : new a(e.x, e.y, e.z) : void 0
		}, a.fromCartesian4 = a.clone, a.packedLength = 3, a.pack = function(r, n, i) {
			return e.typeOf.object("value", r), e.defined("array", n), i = t(i, 0), n[i++] = r.x, n[i++] = r.y, n[i] = r.z, n
		}, a.unpack = function(n, i, o) {
			return e.defined("array", n), i = t(i, 0), r(o) || (o = new a), o.x = n[i++], o.y = n[i++], o.z = n[i], o
		}, a.packArray = function(t, n) {
			e.defined("array", t);
			var i = t.length;
			r(n) ? n.length = 3 * i : n = new Array(3 * i);
			for(var o = 0; i > o; ++o) a.pack(t[o], n, 3 * o);
			return n
		}, a.unpackArray = function(t, i) {
			if(e.defined("array", t), e.typeOf.number.greaterThanOrEquals("array.length", t.length, 3), t.length % 3 !== 0) throw new n("array length must be a multiple of 3.");
			var o = t.length;
			r(i) ? i.length = o / 3 : i = new Array(o / 3);
			for(var u = 0; o > u; u += 3) {
				var s = u / 3;
				i[s] = a.unpack(t, u, i[s])
			}
			return i
		}, a.fromArray = a.unpack, a.maximumComponent = function(t) {
			return e.typeOf.object("cartesian", t), Math.max(t.x, t.y, t.z)
		}, a.minimumComponent = function(t) {
			return e.typeOf.object("cartesian", t), Math.min(t.x, t.y, t.z)
		}, a.minimumByComponent = function(t, r, n) {
			return e.typeOf.object("first", t), e.typeOf.object("second", r), e.typeOf.object("result", n), n.x = Math.min(t.x, r.x), n.y = Math.min(t.y, r.y), n.z = Math.min(t.z, r.z), n
		}, a.maximumByComponent = function(t, r, n) {
			return e.typeOf.object("first", t), e.typeOf.object("second", r), e.typeOf.object("result", n), n.x = Math.max(t.x, r.x), n.y = Math.max(t.y, r.y), n.z = Math.max(t.z, r.z), n
		}, a.magnitudeSquared = function(t) {
			return e.typeOf.object("cartesian", t), t.x * t.x + t.y * t.y + t.z * t.z
		}, a.magnitude = function(e) {
			return Math.sqrt(a.magnitudeSquared(e))
		};
		var u = new a;
		a.distance = function(t, r) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), a.subtract(t, r, u), a.magnitude(u)
		}, a.distanceSquared = function(t, r) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), a.subtract(t, r, u), a.magnitudeSquared(u)
		}, a.normalize = function(t, r) {
			e.typeOf.object("cartesian", t), e.typeOf.object("result", r);
			var i = a.magnitude(t);
			if(r.x = t.x / i, r.y = t.y / i, r.z = t.z / i, isNaN(r.x) || isNaN(r.y) || isNaN(r.z)) throw new n("normalized result is not a number");
			return r
		}, a.dot = function(t, r) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), t.x * r.x + t.y * r.y + t.z * r.z
		}, a.multiplyComponents = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x * r.x, n.y = t.y * r.y, n.z = t.z * r.z, n
		}, a.divideComponents = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x / r.x, n.y = t.y / r.y, n.z = t.z / r.z, n
		}, a.add = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x + r.x, n.y = t.y + r.y, n.z = t.z + r.z, n
		}, a.subtract = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x - r.x, n.y = t.y - r.y, n.z = t.z - r.z, n
		}, a.multiplyByScalar = function(t, r, n) {
			return e.typeOf.object("cartesian", t), e.typeOf.number("scalar", r), e.typeOf.object("result", n), n.x = t.x * r, n.y = t.y * r, n.z = t.z * r, n
		}, a.divideByScalar = function(t, r, n) {
			return e.typeOf.object("cartesian", t), e.typeOf.number("scalar", r), e.typeOf.object("result", n), n.x = t.x / r, n.y = t.y / r, n.z = t.z / r, n
		}, a.negate = function(t, r) {
			return e.typeOf.object("cartesian", t), e.typeOf.object("result", r), r.x = -t.x, r.y = -t.y, r.z = -t.z, r
		}, a.abs = function(t, r) {
			return e.typeOf.object("cartesian", t), e.typeOf.object("result", r), r.x = Math.abs(t.x), r.y = Math.abs(t.y), r.z = Math.abs(t.z), r
		};
		var s = new a;
		a.lerp = function(t, r, n, i) {
			return e.typeOf.object("start", t), e.typeOf.object("end", r), e.typeOf.number("t", n), e.typeOf.object("result", i), a.multiplyByScalar(r, n, s), i = a.multiplyByScalar(t, 1 - n, i), a.add(s, i, i)
		};
		var c = new a,
			l = new a;
		a.angleBetween = function(t, r) {
			e.typeOf.object("left", t), e.typeOf.object("right", r), a.normalize(t, c), a.normalize(r, l);
			var n = a.dot(c, l),
				i = a.magnitude(a.cross(c, l, c));
			return Math.atan2(i, n)
		};
		var f = new a;
		a.mostOrthogonalAxis = function(t, r) {
			e.typeOf.object("cartesian", t), e.typeOf.object("result", r);
			var n = a.normalize(t, f);
			return a.abs(n, n), r = n.x <= n.y ? n.x <= n.z ? a.clone(a.UNIT_X, r) : a.clone(a.UNIT_Z, r) : n.y <= n.z ? a.clone(a.UNIT_Y, r) : a.clone(a.UNIT_Z, r)
		}, a.equals = function(e, t) {
			return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z
		}, a.equalsArray = function(e, t, r) {
			return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2]
		}, a.equalsEpsilon = function(e, t, n, i) {
			return e === t || r(e) && r(t) && o.equalsEpsilon(e.x, t.x, n, i) && o.equalsEpsilon(e.y, t.y, n, i) && o.equalsEpsilon(e.z, t.z, n, i)
		}, a.cross = function(t, r, n) {
			e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n);
			var i = t.x,
				o = t.y,
				a = t.z,
				u = r.x,
				s = r.y,
				c = r.z,
				l = o * c - a * s,
				f = a * u - i * c,
				E = i * s - o * u;
			return n.x = l, n.y = f, n.z = E, n
		}, a.fromDegrees = function(t, r, n, i, u) {
			return e.typeOf.number("longitude", t), e.typeOf.number("latitude", r), t = o.toRadians(t), r = o.toRadians(r), a.fromRadians(t, r, n, i, u)
		};
		var E = new a,
			h = new a,
			d = new a(40680631590769, 40680631590769, 40408299984661.445),
			p = new a(40680631590769, 40680631590769, 40680631590769);
		return a.fromRadians = function(n, i, u, s, c) {
			e.typeOf.number("longitude", n), e.typeOf.number("latitude", i), u = t(u, 0);
			var l = r(s) ? s.radiiSquared : d;
			o.Radious > 6356753 && (l = r(s) ? s.radiiSquared : p);
			var f = Math.cos(i);
			E.x = f * Math.cos(n), E.y = f * Math.sin(n), E.z = Math.sin(i), E = a.normalize(E, E), a.multiplyComponents(l, E, h);
			var _ = Math.sqrt(a.dot(E, h));
			return h = a.divideByScalar(h, _, h), E = a.multiplyByScalar(E, u, E), r(c) || (c = new a), a.add(h, E, c)
		}, a.fromDegreesArray = function(t, i, o) {
			if(e.defined("coordinates", t), t.length < 2 || t.length % 2 !== 0) throw new n("the number of coordinates must be a multiple of 2 and at least 2");
			var u = t.length;
			r(o) ? o.length = u / 2 : o = new Array(u / 2);
			for(var s = 0; u > s; s += 2) {
				var c = t[s],
					l = t[s + 1],
					f = s / 2;
				o[f] = a.fromDegrees(c, l, 0, i, o[f])
			}
			return o
		}, a.fromRadiansArray = function(t, i, o) {
			if(e.defined("coordinates", t), t.length < 2 || t.length % 2 !== 0) throw new n("the number of coordinates must be a multiple of 2 and at least 2");
			var u = t.length;
			r(o) ? o.length = u / 2 : o = new Array(u / 2);
			for(var s = 0; u > s; s += 2) {
				var c = t[s],
					l = t[s + 1],
					f = s / 2;
				o[f] = a.fromRadians(c, l, 0, i, o[f])
			}
			return o
		}, a.fromDegreesArrayHeights = function(t, i, o) {
			if(e.defined("coordinates", t), t.length < 3 || t.length % 3 !== 0) throw new n("the number of coordinates must be a multiple of 3 and at least 3");
			var u = t.length;
			r(o) ? o.length = u / 3 : o = new Array(u / 3);
			for(var s = 0; u > s; s += 3) {
				var c = t[s],
					l = t[s + 1],
					f = t[s + 2],
					E = s / 3;
				o[E] = a.fromDegrees(c, l, f, i, o[E])
			}
			return o
		}, a.fromRadiansArrayHeights = function(t, i, o) {
			if(e.defined("coordinates", t), t.length < 3 || t.length % 3 !== 0) throw new n("the number of coordinates must be a multiple of 3 and at least 3");
			var u = t.length;
			r(o) ? o.length = u / 3 : o = new Array(u / 3);
			for(var s = 0; u > s; s += 3) {
				var c = t[s],
					l = t[s + 1],
					f = t[s + 2],
					E = s / 3;
				o[E] = a.fromRadians(c, l, f, i, o[E])
			}
			return o
		}, a.ZERO = i(new a(0, 0, 0)), a.UNIT_X = i(new a(1, 0, 0)), a.UNIT_Y = i(new a(0, 1, 0)), a.UNIT_Z = i(new a(0, 0, 1)), a.prototype.clone = function(e) {
			return a.clone(this, e)
		}, a.prototype.equals = function(e) {
			return a.equals(this, e)
		}, a.prototype.equalsEpsilon = function(e, t, r) {
			return a.equalsEpsilon(this, e, t, r)
		}, a.prototype.toString = function() {
			return "(" + this.x + ", " + this.y + ", " + this.z + ")"
		}, a
	}), define("Core/scaleToGeodeticSurface", ["./Cartesian3", "./defined", "./DeveloperError", "./Math"], function(e, t, r, n) {
		"use strict";

		function i(i, u, s, c, l) {
			if(!t(i)) throw new r("cartesian is required.");
			if(!t(u)) throw new r("oneOverRadii is required.");
			if(!t(s)) throw new r("oneOverRadiiSquared is required.");
			if(!t(c)) throw new r("centerToleranceSquared is required.");
			var f = i.x,
				E = i.y,
				h = i.z,
				d = u.x,
				p = u.y,
				_ = u.z,
				O = f * f * d * d,
				m = E * E * p * p,
				R = h * h * _ * _,
				T = O + m + R,
				y = Math.sqrt(1 / T),
				A = e.multiplyByScalar(i, y, o);
			if(c > T) return isFinite(y) ? e.clone(A, l) : void 0;
			var S = s.x,
				N = s.y,
				C = s.z,
				g = a;
			g.x = A.x * S * 2, g.y = A.y * N * 2, g.z = A.z * C * 2;
			var I, b, M, w, v, F, L, P, D, U, B, x = (1 - y) * e.magnitude(i) / (.5 * e.magnitude(g)),
				G = 0;
			do {
				x -= G, M = 1 / (1 + x * S), w = 1 / (1 + x * N), v = 1 / (1 + x * C), F = M * M, L = w * w, P = v * v, D = F * M, U = L * w, B = P * v, I = O * F + m * L + R * P - 1, b = O * D * S + m * U * N + R * B * C;
				var q = -2 * b;
				G = I / q
			} while (Math.abs(I) > n.EPSILON12);
			return t(l) ? (l.x = f * M, l.y = E * w, l.z = h * v, l) : new e(f * M, E * w, h * v)
		}
		var o = new e,
			a = new e;
		return i
	}), define("Core/Cartographic", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function(e, t, r, n, i, o, a) {
		"use strict";

		function u(e, t, n) {
			this.longitude = r(e, 0), this.latitude = r(t, 0), this.height = r(n, 0)
		}
		u.fromRadians = function(e, i, o, a) {
			return t.typeOf.number("longitude", e), t.typeOf.number("latitude", i), o = r(o, 0), n(a) ? (a.longitude = e, a.latitude = i, a.height = o, a) : new u(e, i, o)
		}, u.fromDegrees = function(e, r, n, i) {
			return t.typeOf.number("longitude", e), t.typeOf.number("latitude", r), e = o.toRadians(e), r = o.toRadians(r), u.fromRadians(e, r, n, i)
		};
		var s = new e,
			c = new e,
			l = new e,
			f = new e(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
			E = new e(1 / 6378137, 1 / 6378137, 1 / 6378137),
			h = new e(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
			d = new e(1 / 40680631590769, 1 / 40680631590769, 1 / 40680631590769),
			p = o.EPSILON1;
		return u.fromCartesian = function(t, r, i) {
			var _ = n(r) ? r.oneOverRadii : f,
				O = n(r) ? r.oneOverRadiiSquared : h,
				m = n(r) ? r._centerToleranceSquared : p;
			o.Radious > 6356753 && (_ = n(r) ? r.oneOverRadii : E, O = n(r) ? r.oneOverRadiiSquared : d);
			var R = a(t, _, O, m, c);
			if(n(R)) {
				var T = e.multiplyComponents(R, O, s);
				T = e.normalize(T, T);
				var y = e.subtract(t, R, l),
					A = Math.atan2(T.y, T.x),
					S = Math.asin(T.z),
					N = o.sign(e.dot(y, t)) * e.magnitude(y);
				return n(i) ? (i.longitude = A, i.latitude = S, i.height = N, i) : new u(A, S, N)
			}
		}, u.clone = function(e, t) {
			return n(e) ? n(t) ? (t.longitude = e.longitude, t.latitude = e.latitude, t.height = e.height, t) : new u(e.longitude, e.latitude, e.height) : void 0
		}, u.equals = function(e, t) {
			return e === t || n(e) && n(t) && e.longitude === t.longitude && e.latitude === t.latitude && e.height === t.height
		}, u.equalsEpsilon = function(e, r, i) {
			return t.typeOf.number("epsilon", i), e === r || n(e) && n(r) && Math.abs(e.longitude - r.longitude) <= i && Math.abs(e.latitude - r.latitude) <= i && Math.abs(e.height - r.height) <= i
		}, u.ZERO = i(new u(0, 0, 0)), u.prototype.clone = function(e) {
			return u.clone(this, e)
		}, u.prototype.equals = function(e) {
			return u.equals(this, e)
		}, u.prototype.equalsEpsilon = function(e, t) {
			return u.equalsEpsilon(this, e, t)
		}, u.prototype.toString = function() {
			return "(" + this.longitude + ", " + this.latitude + ", " + this.height + ")"
		}, u.sphericalDistance = function(e, t, r, i) {
			if(!n(e) || !n(r)) throw new DeveloperError("longitude is required.");
			if(!n(t) || !n(i)) throw new DeveloperError("latitude is required.");
			if(e === r && t === i) return 0;
			var a = o.toRadians(t),
				u = o.toRadians(i),
				s = o.toRadians(e),
				c = o.toRadians(r),
				l = s * s + a * a,
				f = c * c + u * u,
				E = (s - c) * (s - c) + (a - u) * (a - u),
				h = (l + f - E) / (2 * Math.sqrt(l) * Math.sqrt(f));
			return h = o.clamp(h, -1, 1), Math.acos(h) * o.Radious
		}, u
	}), define("Core/defineProperties", ["./defined"], function(e) {
		"use strict";
		var t = function() {
				try {
					return "x" in Object.defineProperty({}, "x", {})
				} catch(e) {
					return !1
				}
			}(),
			r = Object.defineProperties;
		return t && e(r) || (r = function(e) {
			return e
		}), r
	}), define("Core/Ellipsoid", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math", "./scaleToGeodeticSurface"], function(e, t, r, n, i, o, a, u, s, c) {
		"use strict";

		function l(t, i, o, a) {
			i = n(i, 0), o = n(o, 0), a = n(a, 0), s.equalsEpsilon(a, 6378137, s.EPSILON10) && (s.Radious = a), r.typeOf.number.greaterThanOrEquals("x", i, 0), r.typeOf.number.greaterThanOrEquals("y", o, 0), r.typeOf.number.greaterThanOrEquals("z", a, 0), t._radii = new e(i, o, a), t._radiiSquared = new e(i * i, o * o, a * a), t._radiiToTheFourth = new e(i * i * i * i, o * o * o * o, a * a * a * a), t._oneOverRadii = new e(0 === i ? 0 : 1 / i, 0 === o ? 0 : 1 / o, 0 === a ? 0 : 1 / a), t._oneOverRadiiSquared = new e(0 === i ? 0 : 1 / (i * i), 0 === o ? 0 : 1 / (o * o), 0 === a ? 0 : 1 / (a * a)), t._minimumRadius = Math.min(i, o, a), t._maximumRadius = Math.max(i, o, a), t._centerToleranceSquared = s.EPSILON1, 0 !== t._radiiSquared.z && (t._squaredXOverSquaredZ = t._radiiSquared.x / t._radiiSquared.z)
		}

		function f(e, t, r) {
			this._radii = void 0, this._radiiSquared = void 0, this._radiiToTheFourth = void 0, this._oneOverRadii = void 0, this._oneOverRadiiSquared = void 0, this._minimumRadius = void 0, this._maximumRadius = void 0, this._centerToleranceSquared = void 0, this._squaredXOverSquaredZ = void 0, l(this, e, t, r)
		}
		o(f.prototype, {
			radii: {
				get: function() {
					return this._radii
				}
			},
			radiiSquared: {
				get: function() {
					return this._radiiSquared
				}
			},
			radiiToTheFourth: {
				get: function() {
					return this._radiiToTheFourth
				}
			},
			oneOverRadii: {
				get: function() {
					return this._oneOverRadii
				}
			},
			oneOverRadiiSquared: {
				get: function() {
					return this._oneOverRadiiSquared
				}
			},
			minimumRadius: {
				get: function() {
					return this._minimumRadius
				}
			},
			maximumRadius: {
				get: function() {
					return this._maximumRadius
				}
			}
		}), f.clone = function(t, r) {
			if(i(t)) {
				var n = t._radii;
				return i(r) ? (e.clone(n, r._radii), e.clone(t._radiiSquared, r._radiiSquared), e.clone(t._radiiToTheFourth, r._radiiToTheFourth), e.clone(t._oneOverRadii, r._oneOverRadii), e.clone(t._oneOverRadiiSquared, r._oneOverRadiiSquared), r._minimumRadius = t._minimumRadius, r._maximumRadius = t._maximumRadius, r._centerToleranceSquared = t._centerToleranceSquared, r) : new f(n.x, n.y, n.z)
			}
		}, f.fromCartesian3 = function(e, t) {
			return i(t) || (t = new f), i(e) ? (l(t, e.x, e.y, e.z), t) : t
		}, f.WGS84 = u(new f(6378137, 6378137, s.Radious)), f.UNIT_SPHERE = u(new f(1, 1, 1)), f.MOON = u(new f(s.LUNAR_RADIUS, s.LUNAR_RADIUS, s.LUNAR_RADIUS)), f.prototype.clone = function(e) {
			return f.clone(this, e)
		}, f.packedLength = e.packedLength, f.pack = function(t, i, o) {
			return r.typeOf.object("value", t), r.defined("array", i), o = n(o, 0), e.pack(t._radii, i, o), i
		}, f.unpack = function(t, i, o) {
			r.defined("array", t), i = n(i, 0);
			var a = e.unpack(t, i);
			return f.fromCartesian3(a, o)
		}, f.prototype.geocentricSurfaceNormal = e.normalize, f.prototype.geodeticSurfaceNormalCartographic = function(t, n) {
			r.typeOf.object("cartographic", t);
			var o = t.longitude,
				a = t.latitude,
				u = Math.cos(a),
				s = u * Math.cos(o),
				c = u * Math.sin(o),
				l = Math.sin(a);
			return i(n) || (n = new e), n.x = s, n.y = c, n.z = l, e.normalize(n, n)
		}, f.prototype.geodeticSurfaceNormal = function(t, r) {
			return i(r) || (r = new e), r = e.multiplyComponents(t, this._oneOverRadiiSquared, r), e.normalize(r, r)
		};
		var E = new e,
			h = new e;
		f.prototype.cartographicToCartesian = function(t, r) {
			var n = E,
				o = h;
			this.geodeticSurfaceNormalCartographic(t, n), e.multiplyComponents(this._radiiSquared, n, o);
			var a = Math.sqrt(e.dot(n, o));
			return e.divideByScalar(o, a, o), e.multiplyByScalar(n, t.height, n), i(r) || (r = new e), e.add(o, n, r)
		}, f.prototype.cartographicArrayToCartesianArray = function(e, t) {
			r.defined("cartographics", e);
			var n = e.length;
			i(t) ? t.length = n : t = new Array(n);
			for(var o = 0; n > o; o++) t[o] = this.cartographicToCartesian(e[o], t[o]);
			return t
		};
		var d = new e,
			p = new e,
			_ = new e;
		return f.prototype.cartesianToCartographic = function(r, n) {
			var o = this.scaleToGeodeticSurface(r, p);
			if(i(o)) {
				var a = this.geodeticSurfaceNormal(o, d),
					u = e.subtract(r, o, _),
					c = Math.atan2(a.y, a.x),
					l = Math.asin(a.z),
					f = s.sign(e.dot(u, r)) * e.magnitude(u);
				return i(n) ? (n.longitude = c, n.latitude = l, n.height = f, n) : new t(c, l, f)
			}
		}, f.prototype.cartesianArrayToCartographicArray = function(e, t) {
			r.defined("cartesians", e);
			var n = e.length;
			i(t) ? t.length = n : t = new Array(n);
			for(var o = 0; n > o; ++o) t[o] = this.cartesianToCartographic(e[o], t[o]);
			return t
		}, f.prototype.scaleToGeodeticSurface = function(e, t) {
			return c(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t)
		}, f.prototype.scaleToGeocentricSurface = function(t, n) {
			r.typeOf.object("cartesian", t), i(n) || (n = new e);
			var o = t.x,
				a = t.y,
				u = t.z,
				s = this._oneOverRadiiSquared,
				c = 1 / Math.sqrt(o * o * s.x + a * a * s.y + u * u * s.z);
			return e.multiplyByScalar(t, c, n)
		}, f.prototype.transformPositionToScaledSpace = function(t, r) {
			return i(r) || (r = new e), e.multiplyComponents(t, this._oneOverRadii, r)
		}, f.prototype.transformPositionFromScaledSpace = function(t, r) {
			return i(r) || (r = new e), e.multiplyComponents(t, this._radii, r)
		}, f.prototype.equals = function(t) {
			return this === t || i(t) && e.equals(this._radii, t._radii)
		}, f.prototype.toString = function() {
			return this._radii.toString()
		}, f.prototype.getSurfaceNormalIntersectionWithZAxis = function(t, o, u) {
			if(r.typeOf.object("position", t), !s.equalsEpsilon(this._radii.x, this._radii.y, s.EPSILON15)) throw new a("Ellipsoid must be an ellipsoid of revolution (radii.x == radii.y)");
			r.typeOf.number.greaterThan("Ellipsoid.radii.z", this._radii.z, 0), o = n(o, 0);
			var c = this._squaredXOverSquaredZ;
			return i(u) || (u = new e), u.x = 0, u.y = 0, u.z = t.z * (1 - c), Math.abs(u.z) >= this._radii.z - o ? void 0 : u
		}, f
	}), define("Core/arrayRemoveDuplicates", ["./Check", "./defaultValue", "./defined", "./Math"], function(e, t, r, n) {
		"use strict";

		function i(n, i, a) {
			if(e.defined("equalsEpsilon", i), r(n)) {
				a = t(a, !1);
				var u = n.length;
				if(2 > u) return n;
				var s, c, l;
				for(s = 1; u > s && (c = n[s - 1], l = n[s], !i(c, l, o)); ++s);
				if(s === u) return a && i(n[0], n[n.length - 1], o) ? n.slice(1) : n;
				for(var f = n.slice(0, s); u > s; ++s) l = n[s], i(c, l, o) || (f.push(l), c = l);
				return a && f.length > 1 && i(f[0], f[f.length - 1], o) && f.shift(), f
			}
		}
		var o = n.EPSILON10;
		return i
	}), define("Core/GeographicProjection", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./Ellipsoid"], function(e, t, r, n, i, o, a) {
		"use strict";

		function u(e) {
			this._ellipsoid = r(e, a.WGS84), this._semimajorAxis = this._ellipsoid.maximumRadius, this._oneOverSemimajorAxis = 1 / this._semimajorAxis
		}
		return i(u.prototype, {
			ellipsoid: {
				get: function() {
					return this._ellipsoid
				}
			}
		}), u.prototype.project = function(t, r) {
			var i = this._semimajorAxis,
				o = t.longitude * i,
				a = t.latitude * i,
				u = t.height;
			return n(r) ? (r.x = o, r.y = a, r.z = u, r) : new e(o, a, u)
		}, u.prototype.unproject = function(e, r) {
			if(!n(e)) throw new o("cartesian is required");
			var i = this._oneOverSemimajorAxis,
				a = e.x * i,
				u = e.y * i,
				s = e.z;
			return n(r) ? (r.longitude = a, r.latitude = u, r.height = s, r) : new t(a, u, s)
		}, u
	}), define("Core/Intersect", ["./freezeObject"], function(e) {
		"use strict";
		var t = {
			OUTSIDE: -1,
			INTERSECTING: 0,
			INSIDE: 1
		};
		return e(t)
	}), define("Core/Interval", ["./defaultValue"], function(e) {
		"use strict";

		function t(t, r) {
			this.start = e(t, 0), this.stop = e(r, 0)
		}
		return t
	}), define("Core/Matrix3", ["./Cartesian3", "./Check", "./defaultValue", "./defined", "./defineProperties", "./DeveloperError", "./freezeObject", "./Math"], function(e, t, r, n, i, o, a, u) {
		"use strict";

		function s(e, t, n, i, o, a, u, s, c) {
			this[0] = r(e, 0), this[1] = r(i, 0), this[2] = r(u, 0), this[3] = r(t, 0), this[4] = r(o, 0), this[5] = r(s, 0), this[6] = r(n, 0), this[7] = r(a, 0), this[8] = r(c, 0)
		}

		function c(e) {
			for(var t = 0, r = 0; 9 > r; ++r) {
				var n = e[r];
				t += n * n
			}
			return Math.sqrt(t)
		}

		function l(e) {
			for(var t = 0, r = 0; 3 > r; ++r) {
				var n = e[s.getElementIndex(p[r], d[r])];
				t += 2 * n * n
			}
			return Math.sqrt(t)
		}

		function f(e, t) {
			for(var r = u.EPSILON15, n = 0, i = 1, o = 0; 3 > o; ++o) {
				var a = Math.abs(e[s.getElementIndex(p[o], d[o])]);
				a > n && (i = o, n = a)
			}
			var c = 1,
				l = 0,
				f = d[i],
				E = p[i];
			if(Math.abs(e[s.getElementIndex(E, f)]) > r) {
				var h, _ = e[s.getElementIndex(E, E)],
					O = e[s.getElementIndex(f, f)],
					m = e[s.getElementIndex(E, f)],
					R = (_ - O) / 2 / m;
				h = 0 > R ? -1 / (-R + Math.sqrt(1 + R * R)) : 1 / (R + Math.sqrt(1 + R * R)), c = 1 / Math.sqrt(1 + h * h), l = h * c
			}
			return t = s.clone(s.IDENTITY, t), t[s.getElementIndex(f, f)] = t[s.getElementIndex(E, E)] = c, t[s.getElementIndex(E, f)] = l, t[s.getElementIndex(f, E)] = -l, t
		}
		s.packedLength = 9, s.pack = function(e, n, i) {
			return t.typeOf.object("value", e), t.defined("array", n), i = r(i, 0), n[i++] = e[0], n[i++] = e[1], n[i++] = e[2], n[i++] = e[3], n[i++] = e[4], n[i++] = e[5], n[i++] = e[6], n[i++] = e[7], n[i++] = e[8], n
		}, s.unpack = function(e, i, o) {
			return t.defined("array", e), i = r(i, 0), n(o) || (o = new s), o[0] = e[i++], o[1] = e[i++], o[2] = e[i++], o[3] = e[i++], o[4] = e[i++], o[5] = e[i++], o[6] = e[i++], o[7] = e[i++], o[8] = e[i++], o
		}, s.clone = function(e, t) {
			return n(e) ? n(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t) : new s(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]) : void 0
		}, s.fromArray = function(e, i, o) {
			return t.defined("array", e), i = r(i, 0), n(o) || (o = new s), o[0] = e[i], o[1] = e[i + 1], o[2] = e[i + 2], o[3] = e[i + 3], o[4] = e[i + 4], o[5] = e[i + 5], o[6] = e[i + 6], o[7] = e[i + 7], o[8] = e[i + 8], o
		}, s.fromColumnMajorArray = function(e, r) {
			return t.defined("values", e), s.clone(e, r)
		}, s.fromRowMajorArray = function(e, r) {
			return t.defined("values", e), n(r) ? (r[0] = e[0], r[1] = e[3], r[2] = e[6], r[3] = e[1], r[4] = e[4], r[5] = e[7], r[6] = e[2], r[7] = e[5], r[8] = e[8], r) : new s(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
		}, s.fromQuaternion = function(e, r) {
			t.typeOf.object("quaternion", e);
			var i = e.x * e.x,
				o = e.x * e.y,
				a = e.x * e.z,
				u = e.x * e.w,
				c = e.y * e.y,
				l = e.y * e.z,
				f = e.y * e.w,
				E = e.z * e.z,
				h = e.z * e.w,
				d = e.w * e.w,
				p = i - c - E + d,
				_ = 2 * (o - h),
				O = 2 * (a + f),
				m = 2 * (o + h),
				R = -i + c - E + d,
				T = 2 * (l - u),
				y = 2 * (a - f),
				A = 2 * (l + u),
				S = -i - c + E + d;
			return n(r) ? (r[0] = p, r[1] = m, r[2] = y, r[3] = _, r[4] = R, r[5] = A, r[6] = O, r[7] = T, r[8] = S, r) : new s(p, _, O, m, R, T, y, A, S)
		}, s.fromHeadingPitchRoll = function(e, r) {
			t.typeOf.object("headingPitchRoll", e);
			var i = Math.cos(-e.pitch),
				o = Math.cos(-e.heading),
				a = Math.cos(e.roll),
				u = Math.sin(-e.pitch),
				c = Math.sin(-e.heading),
				l = Math.sin(e.roll),
				f = i * o,
				E = -a * c + l * u * o,
				h = l * c + a * u * o,
				d = i * c,
				p = a * o + l * u * c,
				_ = -l * o + a * u * c,
				O = -u,
				m = l * i,
				R = a * i;
			return n(r) ? (r[0] = f, r[1] = d, r[2] = O, r[3] = E, r[4] = p, r[5] = m, r[6] = h, r[7] = _, r[8] = R, r) : new s(f, E, h, d, p, _, O, m, R)
		}, s.fromScale = function(e, r) {
			return t.typeOf.object("scale", e), n(r) ? (r[0] = e.x, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = e.y, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = e.z, r) : new s(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z)
		}, s.fromUniformScale = function(e, r) {
			return t.typeOf.number("scale", e), n(r) ? (r[0] = e, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = e, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = e, r) : new s(e, 0, 0, 0, e, 0, 0, 0, e)
		}, s.fromCrossProduct = function(e, r) {
			return t.typeOf.object("vector", e), n(r) ? (r[0] = 0, r[1] = e.z, r[2] = -e.y, r[3] = -e.z, r[4] = 0, r[5] = e.x, r[6] = e.y, r[7] = -e.x, r[8] = 0, r) : new s(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0)
		}, s.fromRotationX = function(e, r) {
			t.typeOf.number("angle", e);
			var i = Math.cos(e),
				o = Math.sin(e);
			return n(r) ? (r[0] = 1, r[1] = 0, r[2] = 0, r[3] = 0, r[4] = i, r[5] = o, r[6] = 0, r[7] = -o, r[8] = i, r) : new s(1, 0, 0, 0, i, -o, 0, o, i)
		}, s.fromRotationY = function(e, r) {
			t.typeOf.number("angle", e);
			var i = Math.cos(e),
				o = Math.sin(e);
			return n(r) ? (r[0] = i, r[1] = 0, r[2] = -o, r[3] = 0, r[4] = 1, r[5] = 0, r[6] = o, r[7] = 0, r[8] = i, r) : new s(i, 0, o, 0, 1, 0, -o, 0, i)
		}, s.fromRotationZ = function(e, r) {
			t.typeOf.number("angle", e);
			var i = Math.cos(e),
				o = Math.sin(e);
			return n(r) ? (r[0] = i, r[1] = o, r[2] = 0, r[3] = -o, r[4] = i, r[5] = 0, r[6] = 0, r[7] = 0, r[8] = 1, r) : new s(i, -o, 0, o, i, 0, 0, 0, 1)
		}, s.toArray = function(e, r) {
			return t.typeOf.object("matrix", e), n(r) ? (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3], r[4] = e[4], r[5] = e[5], r[6] = e[6], r[7] = e[7], r[8] = e[8], r) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
		}, s.getElementIndex = function(e, r) {
			return t.typeOf.number.greaterThanOrEquals("row", r, 0), t.typeOf.number.lessThanOrEquals("row", r, 2), t.typeOf.number.greaterThanOrEquals("column", e, 0), t.typeOf.number.lessThanOrEquals("column", e, 2), 3 * e + r
		}, s.getColumn = function(e, r, n) {
			t.typeOf.object("matrix", e), t.typeOf.number.greaterThanOrEquals("index", r, 0), t.typeOf.number.lessThanOrEquals("index", r, 2), t.typeOf.object("result", n);
			var i = 3 * r,
				o = e[i],
				a = e[i + 1],
				u = e[i + 2];
			return n.x = o, n.y = a, n.z = u, n
		}, s.setColumn = function(e, r, n, i) {
			t.typeOf.object("matrix", e), t.typeOf.number.greaterThanOrEquals("index", r, 0), t.typeOf.number.lessThanOrEquals("index", r, 2), t.typeOf.object("cartesian", n), t.typeOf.object("result", i), i = s.clone(e, i);
			var o = 3 * r;
			return i[o] = n.x, i[o + 1] = n.y, i[o + 2] = n.z, i
		}, s.getRow = function(e, r, n) {
			t.typeOf.object("matrix", e), t.typeOf.number.greaterThanOrEquals("index", r, 0), t.typeOf.number.lessThanOrEquals("index", r, 2), t.typeOf.object("result", n);
			var i = e[r],
				o = e[r + 3],
				a = e[r + 6];
			return n.x = i, n.y = o, n.z = a, n
		}, s.setRow = function(e, r, n, i) {
			return t.typeOf.object("matrix", e), t.typeOf.number.greaterThanOrEquals("index", r, 0), t.typeOf.number.lessThanOrEquals("index", r, 2), t.typeOf.object("cartesian", n), t.typeOf.object("result", i), i = s.clone(e, i), i[r] = n.x, i[r + 3] = n.y, i[r + 6] = n.z, i
		};
		var E = new e;
		s.getScale = function(r, n) {
			return t.typeOf.object("matrix", r), t.typeOf.object("result", n), n.x = e.magnitude(e.fromElements(r[0], r[1], r[2], E)), n.y = e.magnitude(e.fromElements(r[3], r[4], r[5], E)), n.z = e.magnitude(e.fromElements(r[6], r[7], r[8], E)), n
		};
		var h = new e;
		s.getMaximumScale = function(t) {
			return s.getScale(t, h), e.maximumComponent(h)
		}, s.multiply = function(e, r, n) {
			t.typeOf.object("left", e), t.typeOf.object("right", r), t.typeOf.object("result", n);
			var i = e[0] * r[0] + e[3] * r[1] + e[6] * r[2],
				o = e[1] * r[0] + e[4] * r[1] + e[7] * r[2],
				a = e[2] * r[0] + e[5] * r[1] + e[8] * r[2],
				u = e[0] * r[3] + e[3] * r[4] + e[6] * r[5],
				s = e[1] * r[3] + e[4] * r[4] + e[7] * r[5],
				c = e[2] * r[3] + e[5] * r[4] + e[8] * r[5],
				l = e[0] * r[6] + e[3] * r[7] + e[6] * r[8],
				f = e[1] * r[6] + e[4] * r[7] + e[7] * r[8],
				E = e[2] * r[6] + e[5] * r[7] + e[8] * r[8];
			return n[0] = i, n[1] = o, n[2] = a, n[3] = u, n[4] = s, n[5] = c, n[6] = l, n[7] = f, n[8] = E, n
		}, s.add = function(e, r, n) {
			return t.typeOf.object("left", e), t.typeOf.object("right", r), t.typeOf.object("result", n),
				n[0] = e[0] + r[0], n[1] = e[1] + r[1], n[2] = e[2] + r[2], n[3] = e[3] + r[3], n[4] = e[4] + r[4], n[5] = e[5] + r[5], n[6] = e[6] + r[6], n[7] = e[7] + r[7], n[8] = e[8] + r[8], n
		}, s.subtract = function(e, r, n) {
			return t.typeOf.object("left", e), t.typeOf.object("right", r), t.typeOf.object("result", n), n[0] = e[0] - r[0], n[1] = e[1] - r[1], n[2] = e[2] - r[2], n[3] = e[3] - r[3], n[4] = e[4] - r[4], n[5] = e[5] - r[5], n[6] = e[6] - r[6], n[7] = e[7] - r[7], n[8] = e[8] - r[8], n
		}, s.multiplyByVector = function(e, r, n) {
			t.typeOf.object("matrix", e), t.typeOf.object("cartesian", r), t.typeOf.object("result", n);
			var i = r.x,
				o = r.y,
				a = r.z,
				u = e[0] * i + e[3] * o + e[6] * a,
				s = e[1] * i + e[4] * o + e[7] * a,
				c = e[2] * i + e[5] * o + e[8] * a;
			return n.x = u, n.y = s, n.z = c, n
		}, s.multiplyByScalar = function(e, r, n) {
			return t.typeOf.object("matrix", e), t.typeOf.number("scalar", r), t.typeOf.object("result", n), n[0] = e[0] * r, n[1] = e[1] * r, n[2] = e[2] * r, n[3] = e[3] * r, n[4] = e[4] * r, n[5] = e[5] * r, n[6] = e[6] * r, n[7] = e[7] * r, n[8] = e[8] * r, n
		}, s.multiplyByScale = function(e, r, n) {
			return t.typeOf.object("matrix", e), t.typeOf.object("scale", r), t.typeOf.object("result", n), n[0] = e[0] * r.x, n[1] = e[1] * r.x, n[2] = e[2] * r.x, n[3] = e[3] * r.y, n[4] = e[4] * r.y, n[5] = e[5] * r.y, n[6] = e[6] * r.z, n[7] = e[7] * r.z, n[8] = e[8] * r.z, n
		}, s.negate = function(e, r) {
			return t.typeOf.object("matrix", e), t.typeOf.object("result", r), r[0] = -e[0], r[1] = -e[1], r[2] = -e[2], r[3] = -e[3], r[4] = -e[4], r[5] = -e[5], r[6] = -e[6], r[7] = -e[7], r[8] = -e[8], r
		}, s.transpose = function(e, r) {
			t.typeOf.object("matrix", e), t.typeOf.object("result", r);
			var n = e[0],
				i = e[3],
				o = e[6],
				a = e[1],
				u = e[4],
				s = e[7],
				c = e[2],
				l = e[5],
				f = e[8];
			return r[0] = n, r[1] = i, r[2] = o, r[3] = a, r[4] = u, r[5] = s, r[6] = c, r[7] = l, r[8] = f, r
		};
		var d = [1, 0, 0],
			p = [2, 2, 1],
			_ = new s,
			O = new s;
		return s.computeEigenDecomposition = function(e, r) {
			t.typeOf.object("matrix", e);
			var i = u.EPSILON20,
				o = 10,
				a = 0,
				E = 0;
			n(r) || (r = {});
			for(var h = r.unitary = s.clone(s.IDENTITY, r.unitary), d = r.diagonal = s.clone(e, r.diagonal), p = i * c(d); o > E && l(d) > p;) f(d, _), s.transpose(_, O), s.multiply(d, _, d), s.multiply(O, d, d), s.multiply(h, _, h), ++a > 2 && (++E, a = 0);
			return r
		}, s.abs = function(e, r) {
			return t.typeOf.object("matrix", e), t.typeOf.object("result", r), r[0] = Math.abs(e[0]), r[1] = Math.abs(e[1]), r[2] = Math.abs(e[2]), r[3] = Math.abs(e[3]), r[4] = Math.abs(e[4]), r[5] = Math.abs(e[5]), r[6] = Math.abs(e[6]), r[7] = Math.abs(e[7]), r[8] = Math.abs(e[8]), r
		}, s.determinant = function(e) {
			t.typeOf.object("matrix", e);
			var r = e[0],
				n = e[3],
				i = e[6],
				o = e[1],
				a = e[4],
				u = e[7],
				s = e[2],
				c = e[5],
				l = e[8];
			return r * (a * l - c * u) + o * (c * i - n * l) + s * (n * u - a * i)
		}, s.inverse = function(e, r) {
			t.typeOf.object("matrix", e), t.typeOf.object("result", r);
			var n = e[0],
				i = e[1],
				a = e[2],
				c = e[3],
				l = e[4],
				f = e[5],
				E = e[6],
				h = e[7],
				d = e[8],
				p = s.determinant(e);
			if(Math.abs(p) <= u.EPSILON15) throw new o("matrix is not invertible");
			r[0] = l * d - h * f, r[1] = h * a - i * d, r[2] = i * f - l * a, r[3] = E * f - c * d, r[4] = n * d - E * a, r[5] = c * a - n * f, r[6] = c * h - E * l, r[7] = E * i - n * h, r[8] = n * l - c * i;
			var _ = 1 / p;
			return s.multiplyByScalar(r, _, r)
		}, s.equals = function(e, t) {
			return e === t || n(e) && n(t) && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8]
		}, s.equalsEpsilon = function(e, r, i) {
			return t.typeOf.number("epsilon", i), e === r || n(e) && n(r) && Math.abs(e[0] - r[0]) <= i && Math.abs(e[1] - r[1]) <= i && Math.abs(e[2] - r[2]) <= i && Math.abs(e[3] - r[3]) <= i && Math.abs(e[4] - r[4]) <= i && Math.abs(e[5] - r[5]) <= i && Math.abs(e[6] - r[6]) <= i && Math.abs(e[7] - r[7]) <= i && Math.abs(e[8] - r[8]) <= i
		}, s.IDENTITY = a(new s(1, 0, 0, 0, 1, 0, 0, 0, 1)), s.ZERO = a(new s(0, 0, 0, 0, 0, 0, 0, 0, 0)), s.COLUMN0ROW0 = 0, s.COLUMN0ROW1 = 1, s.COLUMN0ROW2 = 2, s.COLUMN1ROW0 = 3, s.COLUMN1ROW1 = 4, s.COLUMN1ROW2 = 5, s.COLUMN2ROW0 = 6, s.COLUMN2ROW1 = 7, s.COLUMN2ROW2 = 8, i(s.prototype, {
			length: {
				get: function() {
					return s.packedLength
				}
			}
		}), s.prototype.clone = function(e) {
			return s.clone(this, e)
		}, s.prototype.equals = function(e) {
			return s.equals(this, e)
		}, s.equalsArray = function(e, t, r) {
			return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8]
		}, s.prototype.equalsEpsilon = function(e, t) {
			return s.equalsEpsilon(this, e, t)
		}, s.prototype.toString = function() {
			return "(" + this[0] + ", " + this[3] + ", " + this[6] + ")\n(" + this[1] + ", " + this[4] + ", " + this[7] + ")\n(" + this[2] + ", " + this[5] + ", " + this[8] + ")"
		}, s
	}), define("Core/Cartesian4", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function(e, t, r, n, i, o) {
		"use strict";

		function a(e, r, n, i) {
			this.x = t(e, 0), this.y = t(r, 0), this.z = t(n, 0), this.w = t(i, 0)
		}
		a.fromElements = function(e, t, n, i, o) {
			return r(o) ? (o.x = e, o.y = t, o.z = n, o.w = i, o) : new a(e, t, n, i)
		}, a.fromColor = function(t, n) {
			return e.typeOf.object("color", t), r(n) ? (n.x = t.red, n.y = t.green, n.z = t.blue, n.w = t.alpha, n) : new a(t.red, t.green, t.blue, t.alpha)
		}, a.clone = function(e, t) {
			return r(e) ? r(t) ? (t.x = e.x, t.y = e.y, t.z = e.z, t.w = e.w, t) : new a(e.x, e.y, e.z, e.w) : void 0
		}, a.packedLength = 4, a.pack = function(r, n, i) {
			return e.typeOf.object("value", r), e.defined("array", n), i = t(i, 0), n[i++] = r.x, n[i++] = r.y, n[i++] = r.z, n[i] = r.w, n
		}, a.unpack = function(n, i, o) {
			return e.defined("array", n), i = t(i, 0), r(o) || (o = new a), o.x = n[i++], o.y = n[i++], o.z = n[i++], o.w = n[i], o
		}, a.packArray = function(t, n) {
			e.defined("array", t);
			var i = t.length;
			r(n) ? n.length = 4 * i : n = new Array(4 * i);
			for(var o = 0; i > o; ++o) a.pack(t[o], n, 4 * o);
			return n
		}, a.unpackArray = function(t, n) {
			e.defined("array", t);
			var i = t.length;
			r(n) ? n.length = i / 4 : n = new Array(i / 4);
			for(var o = 0; i > o; o += 4) {
				var u = o / 4;
				n[u] = a.unpack(t, o, n[u])
			}
			return n
		}, a.fromArray = a.unpack, a.maximumComponent = function(t) {
			return e.typeOf.object("cartesian", t), Math.max(t.x, t.y, t.z, t.w)
		}, a.minimumComponent = function(t) {
			return e.typeOf.object("cartesian", t), Math.min(t.x, t.y, t.z, t.w)
		}, a.minimumByComponent = function(t, r, n) {
			return e.typeOf.object("first", t), e.typeOf.object("second", r), e.typeOf.object("result", n), n.x = Math.min(t.x, r.x), n.y = Math.min(t.y, r.y), n.z = Math.min(t.z, r.z), n.w = Math.min(t.w, r.w), n
		}, a.maximumByComponent = function(t, r, n) {
			return e.typeOf.object("first", t), e.typeOf.object("second", r), e.typeOf.object("result", n), n.x = Math.max(t.x, r.x), n.y = Math.max(t.y, r.y), n.z = Math.max(t.z, r.z), n.w = Math.max(t.w, r.w), n
		}, a.magnitudeSquared = function(t) {
			return e.typeOf.object("cartesian", t), t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w
		}, a.magnitude = function(e) {
			return Math.sqrt(a.magnitudeSquared(e))
		};
		var u = new a;
		a.distance = function(t, r) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), a.subtract(t, r, u), a.magnitude(u)
		}, a.distanceSquared = function(t, r) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), a.subtract(t, r, u), a.magnitudeSquared(u)
		}, a.normalize = function(t, r) {
			e.typeOf.object("cartesian", t), e.typeOf.object("result", r);
			var i = a.magnitude(t);
			if(r.x = t.x / i, r.y = t.y / i, r.z = t.z / i, r.w = t.w / i, isNaN(r.x) || isNaN(r.y) || isNaN(r.z) || isNaN(r.w)) throw new n("normalized result is not a number");
			return r
		}, a.dot = function(t, r) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), t.x * r.x + t.y * r.y + t.z * r.z + t.w * r.w
		}, a.multiplyComponents = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x * r.x, n.y = t.y * r.y, n.z = t.z * r.z, n.w = t.w * r.w, n
		}, a.divideComponents = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x / r.x, n.y = t.y / r.y, n.z = t.z / r.z, n.w = t.w / r.w, n
		}, a.add = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x + r.x, n.y = t.y + r.y, n.z = t.z + r.z, n.w = t.w + r.w, n
		}, a.subtract = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.x = t.x - r.x, n.y = t.y - r.y, n.z = t.z - r.z, n.w = t.w - r.w, n
		}, a.multiplyByScalar = function(t, r, n) {
			return e.typeOf.object("cartesian", t), e.typeOf.number("scalar", r), e.typeOf.object("result", n), n.x = t.x * r, n.y = t.y * r, n.z = t.z * r, n.w = t.w * r, n
		}, a.divideByScalar = function(t, r, n) {
			return e.typeOf.object("cartesian", t), e.typeOf.number("scalar", r), e.typeOf.object("result", n), n.x = t.x / r, n.y = t.y / r, n.z = t.z / r, n.w = t.w / r, n
		}, a.negate = function(t, r) {
			return e.typeOf.object("cartesian", t), e.typeOf.object("result", r), r.x = -t.x, r.y = -t.y, r.z = -t.z, r.w = -t.w, r
		}, a.abs = function(t, r) {
			return e.typeOf.object("cartesian", t), e.typeOf.object("result", r), r.x = Math.abs(t.x), r.y = Math.abs(t.y), r.z = Math.abs(t.z), r.w = Math.abs(t.w), r
		};
		var s = new a;
		a.lerp = function(t, r, n, i) {
			return e.typeOf.object("start", t), e.typeOf.object("end", r), e.typeOf.number("t", n), e.typeOf.object("result", i), a.multiplyByScalar(r, n, s), i = a.multiplyByScalar(t, 1 - n, i), a.add(s, i, i)
		};
		var c = new a;
		return a.mostOrthogonalAxis = function(t, r) {
			e.typeOf.object("cartesian", t), e.typeOf.object("result", r);
			var n = a.normalize(t, c);
			return a.abs(n, n), r = n.x <= n.y ? n.x <= n.z ? n.x <= n.w ? a.clone(a.UNIT_X, r) : a.clone(a.UNIT_W, r) : n.z <= n.w ? a.clone(a.UNIT_Z, r) : a.clone(a.UNIT_W, r) : n.y <= n.z ? n.y <= n.w ? a.clone(a.UNIT_Y, r) : a.clone(a.UNIT_W, r) : n.z <= n.w ? a.clone(a.UNIT_Z, r) : a.clone(a.UNIT_W, r)
		}, a.equals = function(e, t) {
			return e === t || r(e) && r(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w
		}, a.equalsArray = function(e, t, r) {
			return e.x === t[r] && e.y === t[r + 1] && e.z === t[r + 2] && e.w === t[r + 3]
		}, a.equalsEpsilon = function(e, t, n, i) {
			return e === t || r(e) && r(t) && o.equalsEpsilon(e.x, t.x, n, i) && o.equalsEpsilon(e.y, t.y, n, i) && o.equalsEpsilon(e.z, t.z, n, i) && o.equalsEpsilon(e.w, t.w, n, i)
		}, a.ZERO = i(new a(0, 0, 0, 0)), a.UNIT_X = i(new a(1, 0, 0, 0)), a.UNIT_Y = i(new a(0, 1, 0, 0)), a.UNIT_Z = i(new a(0, 0, 1, 0)), a.UNIT_W = i(new a(0, 0, 0, 1)), a.prototype.clone = function(e) {
			return a.clone(this, e)
		}, a.prototype.equals = function(e) {
			return a.equals(this, e)
		}, a.prototype.equalsEpsilon = function(e, t, r) {
			return a.equalsEpsilon(this, e, t, r)
		}, a.prototype.toString = function() {
			return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.w + ")"
		}, a
	}), define("Core/RuntimeError", ["./defined"], function(e) {
		"use strict";

		function t(e) {
			this.name = "RuntimeError", this.message = e;
			var t;
			try {
				throw new Error
			} catch(r) {
				t = r.stack
			}
			this.stack = t
		}
		return e(Object.create) && (t.prototype = Object.create(Error.prototype), t.prototype.constructor = t), t.prototype.toString = function() {
			var t = this.name + ": " + this.message;
			return e(this.stack) && (t += "\n" + this.stack.toString()), t
		}, t
	}), define("Core/Matrix4", ["./Cartesian3", "./Cartesian4", "./Check", "./defaultValue", "./defined", "./defineProperties", "./freezeObject", "./Math", "./Matrix3", "./RuntimeError"], function(e, t, r, n, i, o, a, u, s, c) {
		"use strict";

		function l(e, t, r, i, o, a, u, s, c, l, f, E, h, d, p, _) {
			this[0] = n(e, 0), this[1] = n(o, 0), this[2] = n(c, 0), this[3] = n(h, 0), this[4] = n(t, 0), this[5] = n(a, 0), this[6] = n(l, 0), this[7] = n(d, 0), this[8] = n(r, 0), this[9] = n(u, 0), this[10] = n(f, 0), this[11] = n(p, 0), this[12] = n(i, 0), this[13] = n(s, 0), this[14] = n(E, 0), this[15] = n(_, 0)
		}
		l.packedLength = 16, l.pack = function(e, t, i) {
			return r.typeOf.object("value", e), r.defined("array", t), i = n(i, 0), t[i++] = e[0], t[i++] = e[1], t[i++] = e[2], t[i++] = e[3], t[i++] = e[4], t[i++] = e[5], t[i++] = e[6], t[i++] = e[7], t[i++] = e[8], t[i++] = e[9], t[i++] = e[10], t[i++] = e[11], t[i++] = e[12], t[i++] = e[13], t[i++] = e[14], t[i] = e[15], t
		}, l.unpack = function(e, t, o) {
			return r.defined("array", e), t = n(t, 0), i(o) || (o = new l), o[0] = e[t++], o[1] = e[t++], o[2] = e[t++], o[3] = e[t++], o[4] = e[t++], o[5] = e[t++], o[6] = e[t++], o[7] = e[t++], o[8] = e[t++], o[9] = e[t++], o[10] = e[t++], o[11] = e[t++], o[12] = e[t++], o[13] = e[t++], o[14] = e[t++], o[15] = e[t], o
		}, l.clone = function(e, t) {
			return i(e) ? i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : new l(e[0], e[4], e[8], e[12], e[1], e[5], e[9], e[13], e[2], e[6], e[10], e[14], e[3], e[7], e[11], e[15]) : void 0
		}, l.fromArray = l.unpack, l.fromColumnMajorArray = function(e, t) {
			return r.defined("values", e), l.clone(e, t)
		}, l.fromRowMajorArray = function(e, t) {
			return r.defined("values", e), i(t) ? (t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15], t) : new l(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
		}, l.fromRotationTranslation = function(t, o, a) {
			return r.typeOf.object("rotation", t), o = n(o, e.ZERO), i(a) ? (a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = 0, a[4] = t[3], a[5] = t[4], a[6] = t[5], a[7] = 0, a[8] = t[6], a[9] = t[7], a[10] = t[8], a[11] = 0, a[12] = o.x, a[13] = o.y, a[14] = o.z, a[15] = 1, a) : new l(t[0], t[3], t[6], o.x, t[1], t[4], t[7], o.y, t[2], t[5], t[8], o.z, 0, 0, 0, 1)
		}, l.fromTranslationQuaternionRotationScale = function(e, t, n, o) {
			r.typeOf.object("translation", e), r.typeOf.object("rotation", t), r.typeOf.object("scale", n), i(o) || (o = new l);
			var a = n.x,
				u = n.y,
				s = n.z,
				c = t.x * t.x,
				f = t.x * t.y,
				E = t.x * t.z,
				h = t.x * t.w,
				d = t.y * t.y,
				p = t.y * t.z,
				_ = t.y * t.w,
				O = t.z * t.z,
				m = t.z * t.w,
				R = t.w * t.w,
				T = c - d - O + R,
				y = 2 * (f - m),
				A = 2 * (E + _),
				S = 2 * (f + m),
				N = -c + d - O + R,
				C = 2 * (p - h),
				g = 2 * (E - _),
				I = 2 * (p + h),
				b = -c - d + O + R;
			return o[0] = T * a, o[1] = S * a, o[2] = g * a, o[3] = 0, o[4] = y * u, o[5] = N * u, o[6] = I * u, o[7] = 0, o[8] = A * s, o[9] = C * s, o[10] = b * s, o[11] = 0, o[12] = e.x, o[13] = e.y, o[14] = e.z, o[15] = 1, o
		}, l.fromTranslationRotationScale = function(e, t) {
			return r.typeOf.object("translationRotationScale", e), l.fromTranslationQuaternionRotationScale(e.translation, e.rotation, e.scale, t)
		}, l.fromTranslation = function(e, t) {
			return r.typeOf.object("translation", e), l.fromRotationTranslation(s.IDENTITY, e, t)
		}, l.fromScale = function(e, t) {
			return r.typeOf.object("scale", e), i(t) ? (t[0] = e.x, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e.y, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e.z, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e.x, 0, 0, 0, 0, e.y, 0, 0, 0, 0, e.z, 0, 0, 0, 0, 1)
		}, l.fromUniformScale = function(e, t) {
			return r.typeOf.number("scale", e), i(t) ? (t[0] = e, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t) : new l(e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, 1)
		};
		var f = new e,
			E = new e,
			h = new e;
		l.fromCamera = function(t, n) {
			r.typeOf.object("camera", t);
			var o = t.position,
				a = t.direction,
				u = t.up;
			r.typeOf.object("camera.position", o), r.typeOf.object("camera.direction", a), r.typeOf.object("camera.up", u), e.normalize(a, f), e.normalize(e.cross(f, u, E), E), e.normalize(e.cross(E, f, h), h);
			var s = E.x,
				c = E.y,
				d = E.z,
				p = f.x,
				_ = f.y,
				O = f.z,
				m = h.x,
				R = h.y,
				T = h.z,
				y = o.x,
				A = o.y,
				S = o.z,
				N = s * -y + c * -A + d * -S,
				C = m * -y + R * -A + T * -S,
				g = p * y + _ * A + O * S;
			return i(n) ? (n[0] = s, n[1] = m, n[2] = -p, n[3] = 0, n[4] = c, n[5] = R, n[6] = -_, n[7] = 0, n[8] = d, n[9] = T, n[10] = -O, n[11] = 0, n[12] = N, n[13] = C, n[14] = g, n[15] = 1, n) : new l(s, c, d, N, m, R, T, C, -p, -_, -O, g, 0, 0, 0, 1)
		}, l.computePerspectiveFieldOfView = function(e, t, n, i, o) {
			r.typeOf.number.greaterThan("fovY", e, 0), r.typeOf.number.lessThan("fovY", e, Math.PI), r.typeOf.number.greaterThan("near", n, 0), r.typeOf.number.greaterThan("far", i, 0), r.typeOf.object("result", o);
			var a = Math.tan(.5 * e),
				u = 1 / a,
				s = u / t,
				c = (i + n) / (n - i),
				l = 2 * i * n / (n - i);
			return o[0] = s, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = u, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = c, o[11] = -1, o[12] = 0, o[13] = 0, o[14] = l, o[15] = 0, o
		}, l.computeOrthographicOffCenter = function(e, t, n, i, o, a, u) {
			r.typeOf.number("left", e), r.typeOf.number("right", t), r.typeOf.number("bottom", n), r.typeOf.number("top", i), r.typeOf.number("near", o), r.typeOf.number("far", a), r.typeOf.object("result", u);
			var s = 1 / (t - e),
				c = 1 / (i - n),
				l = 1 / (a - o),
				f = -(t + e) * s,
				E = -(i + n) * c,
				h = -(a + o) * l;
			return s *= 2, c *= 2, l *= -2, u[0] = s, u[1] = 0, u[2] = 0, u[3] = 0, u[4] = 0, u[5] = c, u[6] = 0, u[7] = 0, u[8] = 0, u[9] = 0, u[10] = l, u[11] = 0, u[12] = f, u[13] = E, u[14] = h, u[15] = 1, u
		}, l.computePerspectiveOffCenter = function(e, t, n, i, o, a, u) {
			r.typeOf.number("left", e), r.typeOf.number("right", t), r.typeOf.number("bottom", n), r.typeOf.number("top", i), r.typeOf.number("near", o), r.typeOf.number("far", a), r.typeOf.object("result", u);
			var s = 2 * o / (t - e),
				c = 2 * o / (i - n),
				l = (t + e) / (t - e),
				f = (i + n) / (i - n),
				E = -(a + o) / (a - o),
				h = -1,
				d = -2 * a * o / (a - o);
			return u[0] = s, u[1] = 0, u[2] = 0, u[3] = 0, u[4] = 0, u[5] = c, u[6] = 0, u[7] = 0, u[8] = l, u[9] = f, u[10] = E, u[11] = h, u[12] = 0, u[13] = 0, u[14] = d, u[15] = 0, u
		}, l.computeInfinitePerspectiveOffCenter = function(e, t, n, i, o, a) {
			r.typeOf.number("left", e), r.typeOf.number("right", t), r.typeOf.number("bottom", n), r.typeOf.number("top", i), r.typeOf.number("near", o), r.typeOf.object("result", a);
			var u = 2 * o / (t - e),
				s = 2 * o / (i - n),
				c = (t + e) / (t - e),
				l = (i + n) / (i - n),
				f = -1,
				E = -1,
				h = -2 * o;
			return a[0] = u, a[1] = 0, a[2] = 0, a[3] = 0, a[4] = 0, a[5] = s, a[6] = 0, a[7] = 0, a[8] = c, a[9] = l, a[10] = f, a[11] = E, a[12] = 0, a[13] = 0, a[14] = h, a[15] = 0, a
		}, l.computeViewportTransformation = function(e, t, i, o) {
			r.typeOf.object("result", o), e = n(e, n.EMPTY_OBJECT);
			var a = n(e.x, 0),
				u = n(e.y, 0),
				s = n(e.width, 0),
				c = n(e.height, 0);
			t = n(t, 0), i = n(i, 1);
			var l = .5 * s,
				f = .5 * c,
				E = .5 * (i - t),
				h = l,
				d = f,
				p = E,
				_ = a + l,
				O = u + f,
				m = t + E,
				R = 1;
			return o[0] = h, o[1] = 0, o[2] = 0, o[3] = 0, o[4] = 0, o[5] = d, o[6] = 0, o[7] = 0, o[8] = 0, o[9] = 0, o[10] = p, o[11] = 0, o[12] = _, o[13] = O, o[14] = m, o[15] = R, o
		}, l.computeView = function(t, n, i, o, a) {
			return r.typeOf.object("position", t), r.typeOf.object("direction", n), r.typeOf.object("up", i), r.typeOf.object("right", o), r.typeOf.object("result", a), a[0] = o.x, a[1] = i.x, a[2] = -n.x, a[3] = 0, a[4] = o.y, a[5] = i.y, a[6] = -n.y, a[7] = 0, a[8] = o.z, a[9] = i.z, a[10] = -n.z, a[11] = 0, a[12] = -e.dot(o, t), a[13] = -e.dot(i, t), a[14] = e.dot(n, t), a[15] = 1, a
		}, l.toArray = function(e, t) {
			return r.typeOf.object("matrix", e), i(t) ? (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t) : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]]
		}, l.getElementIndex = function(e, t) {
			return r.typeOf.number.greaterThanOrEquals("row", t, 0), r.typeOf.number.lessThanOrEquals("row", t, 3), r.typeOf.number.greaterThanOrEquals("column", e, 0), r.typeOf.number.lessThanOrEquals("column", e, 3), 4 * e + t
		}, l.getColumn = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.number.greaterThanOrEquals("index", t, 0), r.typeOf.number.lessThanOrEquals("index", t, 3), r.typeOf.object("result", n);
			var i = 4 * t,
				o = e[i],
				a = e[i + 1],
				u = e[i + 2],
				s = e[i + 3];
			return n.x = o, n.y = a, n.z = u, n.w = s, n
		}, l.setColumn = function(e, t, n, i) {
			r.typeOf.object("matrix", e), r.typeOf.number.greaterThanOrEquals("index", t, 0), r.typeOf.number.lessThanOrEquals("index", t, 3), r.typeOf.object("cartesian", n), r.typeOf.object("result", i), i = l.clone(e, i);
			var o = 4 * t;
			return i[o] = n.x, i[o + 1] = n.y, i[o + 2] = n.z, i[o + 3] = n.w, i
		}, l.setTranslation = function(e, t, n) {
			return r.typeOf.object("matrix", e), r.typeOf.object("translation", t), r.typeOf.object("result", n), n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = t.x, n[13] = t.y, n[14] = t.z, n[15] = e[15], n
		}, l.getRow = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.number.greaterThanOrEquals("index", t, 0), r.typeOf.number.lessThanOrEquals("index", t, 3), r.typeOf.object("result", n);
			var i = e[t],
				o = e[t + 4],
				a = e[t + 8],
				u = e[t + 12];
			return n.x = i, n.y = o, n.z = a, n.w = u, n
		}, l.setRow = function(e, t, n, i) {
			return r.typeOf.object("matrix", e), r.typeOf.number.greaterThanOrEquals("index", t, 0), r.typeOf.number.lessThanOrEquals("index", t, 3), r.typeOf.object("cartesian", n), r.typeOf.object("result", i), i = l.clone(e, i), i[t] = n.x, i[t + 4] = n.y, i[t + 8] = n.z, i[t + 12] = n.w, i
		};
		var d = new e;
		l.getScale = function(t, n) {
			return r.typeOf.object("matrix", t), r.typeOf.object("result", n), n.x = e.magnitude(e.fromElements(t[0], t[1], t[2], d)), n.y = e.magnitude(e.fromElements(t[4], t[5], t[6], d)), n.z = e.magnitude(e.fromElements(t[8], t[9], t[10], d)), n
		};
		var p = new e;
		l.getMaximumScale = function(t) {
			return l.getScale(t, p), e.maximumComponent(p)
		}, l.multiply = function(e, t, n) {
			r.typeOf.object("left", e), r.typeOf.object("right", t), r.typeOf.object("result", n);
			var i = e[0],
				o = e[1],
				a = e[2],
				u = e[3],
				s = e[4],
				c = e[5],
				l = e[6],
				f = e[7],
				E = e[8],
				h = e[9],
				d = e[10],
				p = e[11],
				_ = e[12],
				O = e[13],
				m = e[14],
				R = e[15],
				T = t[0],
				y = t[1],
				A = t[2],
				S = t[3],
				N = t[4],
				C = t[5],
				g = t[6],
				I = t[7],
				b = t[8],
				M = t[9],
				w = t[10],
				v = t[11],
				F = t[12],
				L = t[13],
				P = t[14],
				D = t[15],
				U = i * T + s * y + E * A + _ * S,
				B = o * T + c * y + h * A + O * S,
				x = a * T + l * y + d * A + m * S,
				G = u * T + f * y + p * A + R * S,
				q = i * N + s * C + E * g + _ * I,
				j = o * N + c * C + h * g + O * I,
				z = a * N + l * C + d * g + m * I,
				V = u * N + f * C + p * g + R * I,
				H = i * b + s * M + E * w + _ * v,
				X = o * b + c * M + h * w + O * v,
				W = a * b + l * M + d * w + m * v,
				Y = u * b + f * M + p * w + R * v,
				K = i * F + s * L + E * P + _ * D,
				k = o * F + c * L + h * P + O * D,
				Z = a * F + l * L + d * P + m * D,
				Q = u * F + f * L + p * P + R * D;
			return n[0] = U, n[1] = B, n[2] = x, n[3] = G, n[4] = q, n[5] = j, n[6] = z, n[7] = V, n[8] = H, n[9] = X, n[10] = W, n[11] = Y, n[12] = K, n[13] = k, n[14] = Z, n[15] = Q, n
		}, l.add = function(e, t, n) {
			return r.typeOf.object("left", e), r.typeOf.object("right", t), r.typeOf.object("result", n), n[0] = e[0] + t[0], n[1] = e[1] + t[1], n[2] = e[2] + t[2], n[3] = e[3] + t[3], n[4] = e[4] + t[4], n[5] = e[5] + t[5], n[6] = e[6] + t[6], n[7] = e[7] + t[7], n[8] = e[8] + t[8], n[9] = e[9] + t[9], n[10] = e[10] + t[10], n[11] = e[11] + t[11], n[12] = e[12] + t[12], n[13] = e[13] + t[13], n[14] = e[14] + t[14], n[15] = e[15] + t[15], n
		}, l.subtract = function(e, t, n) {
			return r.typeOf.object("left", e), r.typeOf.object("right", t), r.typeOf.object("result", n), n[0] = e[0] - t[0], n[1] = e[1] - t[1], n[2] = e[2] - t[2], n[3] = e[3] - t[3], n[4] = e[4] - t[4], n[5] = e[5] - t[5], n[6] = e[6] - t[6], n[7] = e[7] - t[7], n[8] = e[8] - t[8], n[9] = e[9] - t[9], n[10] = e[10] - t[10], n[11] = e[11] - t[11], n[12] = e[12] - t[12], n[13] = e[13] - t[13], n[14] = e[14] - t[14], n[15] = e[15] - t[15], n
		}, l.multiplyTransformation = function(e, t, n) {
			r.typeOf.object("left", e), r.typeOf.object("right", t), r.typeOf.object("result", n);
			var i = e[0],
				o = e[1],
				a = e[2],
				u = e[4],
				s = e[5],
				c = e[6],
				l = e[8],
				f = e[9],
				E = e[10],
				h = e[12],
				d = e[13],
				p = e[14],
				_ = t[0],
				O = t[1],
				m = t[2],
				R = t[4],
				T = t[5],
				y = t[6],
				A = t[8],
				S = t[9],
				N = t[10],
				C = t[12],
				g = t[13],
				I = t[14],
				b = i * _ + u * O + l * m,
				M = o * _ + s * O + f * m,
				w = a * _ + c * O + E * m,
				v = i * R + u * T + l * y,
				F = o * R + s * T + f * y,
				L = a * R + c * T + E * y,
				P = i * A + u * S + l * N,
				D = o * A + s * S + f * N,
				U = a * A + c * S + E * N,
				B = i * C + u * g + l * I + h,
				x = o * C + s * g + f * I + d,
				G = a * C + c * g + E * I + p;
			return n[0] = b, n[1] = M, n[2] = w, n[3] = 0, n[4] = v, n[5] = F, n[6] = L, n[7] = 0, n[8] = P, n[9] = D, n[10] = U, n[11] = 0, n[12] = B, n[13] = x, n[14] = G, n[15] = 1, n
		}, l.multiplyByMatrix3 = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.object("rotation", t), r.typeOf.object("result", n);
			var i = e[0],
				o = e[1],
				a = e[2],
				u = e[4],
				s = e[5],
				c = e[6],
				l = e[8],
				f = e[9],
				E = e[10],
				h = t[0],
				d = t[1],
				p = t[2],
				_ = t[3],
				O = t[4],
				m = t[5],
				R = t[6],
				T = t[7],
				y = t[8],
				A = i * h + u * d + l * p,
				S = o * h + s * d + f * p,
				N = a * h + c * d + E * p,
				C = i * _ + u * O + l * m,
				g = o * _ + s * O + f * m,
				I = a * _ + c * O + E * m,
				b = i * R + u * T + l * y,
				M = o * R + s * T + f * y,
				w = a * R + c * T + E * y;
			return n[0] = A, n[1] = S, n[2] = N, n[3] = 0, n[4] = C, n[5] = g, n[6] = I, n[7] = 0, n[8] = b, n[9] = M, n[10] = w, n[11] = 0, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15], n
		}, l.multiplyByTranslation = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.object("translation", t), r.typeOf.object("result", n);
			var i = t.x,
				o = t.y,
				a = t.z,
				u = i * e[0] + o * e[4] + a * e[8] + e[12],
				s = i * e[1] + o * e[5] + a * e[9] + e[13],
				c = i * e[2] + o * e[6] + a * e[10] + e[14];
			return n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = u, n[13] = s, n[14] = c, n[15] = e[15], n
		};
		var _ = new e;
		l.multiplyByUniformScale = function(e, t, n) {
			return r.typeOf.object("matrix", e), r.typeOf.number("scale", t), r.typeOf.object("result", n), _.x = t, _.y = t, _.z = t, l.multiplyByScale(e, _, n)
		}, l.multiplyByScale = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.object("scale", t), r.typeOf.object("result", n);
			var i = t.x,
				o = t.y,
				a = t.z;
			return 1 === i && 1 === o && 1 === a ? l.clone(e, n) : (n[0] = i * e[0], n[1] = i * e[1], n[2] = i * e[2], n[3] = 0, n[4] = o * e[4], n[5] = o * e[5], n[6] = o * e[6], n[7] = 0, n[8] = a * e[8], n[9] = a * e[9], n[10] = a * e[10], n[11] = 0, n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = 1, n)
		}, l.multiplyByVector = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.object("cartesian", t), r.typeOf.object("result", n);
			var i = t.x,
				o = t.y,
				a = t.z,
				u = t.w,
				s = e[0] * i + e[4] * o + e[8] * a + e[12] * u,
				c = e[1] * i + e[5] * o + e[9] * a + e[13] * u,
				l = e[2] * i + e[6] * o + e[10] * a + e[14] * u,
				f = e[3] * i + e[7] * o + e[11] * a + e[15] * u;
			return n.x = s, n.y = c, n.z = l, n.w = f, n
		}, l.multiplyByPointAsVector = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.object("cartesian", t), r.typeOf.object("result", n);
			var i = t.x,
				o = t.y,
				a = t.z,
				u = e[0] * i + e[4] * o + e[8] * a,
				s = e[1] * i + e[5] * o + e[9] * a,
				c = e[2] * i + e[6] * o + e[10] * a;
			return n.x = u, n.y = s, n.z = c, n
		}, l.multiplyByPoint = function(e, t, n) {
			r.typeOf.object("matrix", e), r.typeOf.object("cartesian", t), r.typeOf.object("result", n);
			var i = t.x,
				o = t.y,
				a = t.z,
				u = e[0] * i + e[4] * o + e[8] * a + e[12],
				s = e[1] * i + e[5] * o + e[9] * a + e[13],
				c = e[2] * i + e[6] * o + e[10] * a + e[14];
			return n.x = u, n.y = s, n.z = c, n
		}, l.multiplyByScalar = function(e, t, n) {
			return r.typeOf.object("matrix", e), r.typeOf.number("scalar", t), r.typeOf.object("result", n), n[0] = e[0] * t, n[1] = e[1] * t, n[2] = e[2] * t, n[3] = e[3] * t, n[4] = e[4] * t, n[5] = e[5] * t, n[6] = e[6] * t, n[7] = e[7] * t, n[8] = e[8] * t, n[9] = e[9] * t, n[10] = e[10] * t, n[11] = e[11] * t, n[12] = e[12] * t, n[13] = e[13] * t, n[14] = e[14] * t, n[15] = e[15] * t, n
		}, l.negate = function(e, t) {
			return r.typeOf.object("matrix", e), r.typeOf.object("result", t), t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t[4] = -e[4], t[5] = -e[5], t[6] = -e[6], t[7] = -e[7], t[8] = -e[8], t[9] = -e[9], t[10] = -e[10], t[11] = -e[11], t[12] = -e[12], t[13] = -e[13], t[14] = -e[14], t[15] = -e[15], t
		}, l.transpose = function(e, t) {
			r.typeOf.object("matrix", e), r.typeOf.object("result", t);
			var n = e[1],
				i = e[2],
				o = e[3],
				a = e[6],
				u = e[7],
				s = e[11];
			return t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = n, t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = i, t[9] = a, t[10] = e[10], t[11] = e[14], t[12] = o, t[13] = u, t[14] = s, t[15] = e[15], t
		}, l.abs = function(e, t) {
			return r.typeOf.object("matrix", e), r.typeOf.object("result", t), t[0] = Math.abs(e[0]), t[1] = Math.abs(e[1]), t[2] = Math.abs(e[2]), t[3] = Math.abs(e[3]), t[4] = Math.abs(e[4]), t[5] = Math.abs(e[5]), t[6] = Math.abs(e[6]), t[7] = Math.abs(e[7]), t[8] = Math.abs(e[8]), t[9] = Math.abs(e[9]), t[10] = Math.abs(e[10]), t[11] = Math.abs(e[11]), t[12] = Math.abs(e[12]), t[13] = Math.abs(e[13]), t[14] = Math.abs(e[14]), t[15] = Math.abs(e[15]), t
		}, l.equals = function(e, t) {
			return e === t || i(e) && i(t) && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[3] === t[3] && e[7] === t[7] && e[11] === t[11] && e[15] === t[15]
		}, l.equalsEpsilon = function(e, t, n) {
			return r.typeOf.number("epsilon", n), e === t || i(e) && i(t) && Math.abs(e[0] - t[0]) <= n && Math.abs(e[1] - t[1]) <= n && Math.abs(e[2] - t[2]) <= n && Math.abs(e[3] - t[3]) <= n && Math.abs(e[4] - t[4]) <= n && Math.abs(e[5] - t[5]) <= n && Math.abs(e[6] - t[6]) <= n && Math.abs(e[7] - t[7]) <= n && Math.abs(e[8] - t[8]) <= n && Math.abs(e[9] - t[9]) <= n && Math.abs(e[10] - t[10]) <= n && Math.abs(e[11] - t[11]) <= n && Math.abs(e[12] - t[12]) <= n && Math.abs(e[13] - t[13]) <= n && Math.abs(e[14] - t[14]) <= n && Math.abs(e[15] - t[15]) <= n
		}, l.getTranslation = function(e, t) {
			return r.typeOf.object("matrix", e), r.typeOf.object("result", t), t.x = e[12], t.y = e[13], t.z = e[14], t
		}, l.getRotation = function(e, t) {
			return r.typeOf.object("matrix", e), r.typeOf.object("result", t), t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t
		};
		var O = new s,
			m = new s,
			R = new t,
			T = new t(0, 0, 0, 1);
		return l.inverse = function(e, n) {
			if(r.typeOf.object("matrix", e), r.typeOf.object("result", n), s.equalsEpsilon(l.getRotation(e, O), m, u.EPSILON7) && t.equals(l.getRow(e, 3, R), T)) return n[0] = 0, n[1] = 0, n[2] = 0, n[3] = 0, n[4] = 0, n[5] = 0, n[6] = 0, n[7] = 0, n[8] = 0, n[9] = 0, n[10] = 0, n[11] = 0, n[12] = -e[12], n[13] = -e[13], n[14] = -e[14], n[15] = 1, n;
			var i = e[0],
				o = e[4],
				a = e[8],
				f = e[12],
				E = e[1],
				h = e[5],
				d = e[9],
				p = e[13],
				_ = e[2],
				y = e[6],
				A = e[10],
				S = e[14],
				N = e[3],
				C = e[7],
				g = e[11],
				I = e[15],
				b = A * I,
				M = S * g,
				w = y * I,
				v = S * C,
				F = y * g,
				L = A * C,
				P = _ * I,
				D = S * N,
				U = _ * g,
				B = A * N,
				x = _ * C,
				G = y * N,
				q = b * h + v * d + F * p - (M * h + w * d + L * p),
				j = M * E + P * d + B * p - (b * E + D * d + U * p),
				z = w * E + D * h + x * p - (v * E + P * h + G * p),
				V = L * E + U * h + G * d - (F * E + B * h + x * d),
				H = M * o + w * a + L * f - (b * o + v * a + F * f),
				X = b * i + D * a + U * f - (M * i + P * a + B * f),
				W = v * i + P * o + G * f - (w * i + D * o + x * f),
				Y = F * i + B * o + x * a - (L * i + U * o + G * a);
			b = a * p, M = f * d, w = o * p, v = f * h, F = o * d, L = a * h, P = i * p, D = f * E, U = i * d, B = a * E, x = i * h, G = o * E;
			var K = b * C + v * g + F * I - (M * C + w * g + L * I),
				k = M * N + P * g + B * I - (b * N + D * g + U * I),
				Z = w * N + D * C + x * I - (v * N + P * C + G * I),
				Q = L * N + U * C + G * g - (F * N + B * C + x * g),
				J = w * A + L * S + M * y - (F * S + b * y + v * A),
				$ = U * S + b * _ + D * A - (P * A + B * S + M * _),
				ee = P * y + G * S + v * _ - (x * S + w * _ + D * y),
				te = x * A + F * _ + B * y - (U * y + G * A + L * _),
				re = i * q + o * j + a * z + f * V;
			if(Math.abs(re) < u.EPSILON20) throw new c("matrix is not invertible because its determinate is zero.");
			return re = 1 / re, n[0] = q * re, n[1] = j * re, n[2] = z * re, n[3] = V * re, n[4] = H * re, n[5] = X * re, n[6] = W * re, n[7] = Y * re, n[8] = K * re, n[9] = k * re, n[10] = Z * re, n[11] = Q * re, n[12] = J * re, n[13] = $ * re, n[14] = ee * re, n[15] = te * re, n
		}, l.inverseTransformation = function(e, t) {
			r.typeOf.object("matrix", e), r.typeOf.object("result", t);
			var n = e[0],
				i = e[1],
				o = e[2],
				a = e[4],
				u = e[5],
				s = e[6],
				c = e[8],
				l = e[9],
				f = e[10],
				E = e[12],
				h = e[13],
				d = e[14],
				p = -n * E - i * h - o * d,
				_ = -a * E - u * h - s * d,
				O = -c * E - l * h - f * d;
			return t[0] = n, t[1] = a, t[2] = c, t[3] = 0, t[4] = i, t[5] = u, t[6] = l, t[7] = 0, t[8] = o, t[9] = s, t[10] = f, t[11] = 0, t[12] = p, t[13] = _, t[14] = O, t[15] = 1, t
		}, l.IDENTITY = a(new l(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)), l.ZERO = a(new l(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)), l.COLUMN0ROW0 = 0, l.COLUMN0ROW1 = 1, l.COLUMN0ROW2 = 2, l.COLUMN0ROW3 = 3, l.COLUMN1ROW0 = 4, l.COLUMN1ROW1 = 5, l.COLUMN1ROW2 = 6, l.COLUMN1ROW3 = 7, l.COLUMN2ROW0 = 8, l.COLUMN2ROW1 = 9, l.COLUMN2ROW2 = 10, l.COLUMN2ROW3 = 11, l.COLUMN3ROW0 = 12, l.COLUMN3ROW1 = 13, l.COLUMN3ROW2 = 14, l.COLUMN3ROW3 = 15, o(l.prototype, {
			length: {
				get: function() {
					return l.packedLength
				}
			}
		}), l.prototype.clone = function(e) {
			return l.clone(this, e)
		}, l.prototype.equals = function(e) {
			return l.equals(this, e)
		}, l.equalsArray = function(e, t, r) {
			return e[0] === t[r] && e[1] === t[r + 1] && e[2] === t[r + 2] && e[3] === t[r + 3] && e[4] === t[r + 4] && e[5] === t[r + 5] && e[6] === t[r + 6] && e[7] === t[r + 7] && e[8] === t[r + 8] && e[9] === t[r + 9] && e[10] === t[r + 10] && e[11] === t[r + 11] && e[12] === t[r + 12] && e[13] === t[r + 13] && e[14] === t[r + 14] && e[15] === t[r + 15]
		}, l.prototype.equalsEpsilon = function(e, t) {
			return l.equalsEpsilon(this, e, t)
		}, l.prototype.toString = function() {
			return "(" + this[0] + ", " + this[4] + ", " + this[8] + ", " + this[12] + ")\n(" + this[1] + ", " + this[5] + ", " + this[9] + ", " + this[13] + ")\n(" + this[2] + ", " + this[6] + ", " + this[10] + ", " + this[14] + ")\n(" + this[3] + ", " + this[7] + ", " + this[11] + ", " + this[15] + ")"
		}, l
	}), define("Core/Rectangle", ["./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./freezeObject", "./Math"], function(e, t, r, n, i, o, a, u) {
		"use strict";

		function s(e, t, n, i) {
			this.west = r(e, 0), this.south = r(t, 0), this.east = r(n, 0), this.north = r(i, 0)
		}
		i(s.prototype, {
			width: {
				get: function() {
					return s.computeWidth(this)
				}
			},
			height: {
				get: function() {
					return s.computeHeight(this)
				}
			}
		}), s.packedLength = 4, s.pack = function(e, n, i) {
			return t.typeOf.object("value", e), t.defined("array", n), i = r(i, 0), n[i++] = e.west, n[i++] = e.south, n[i++] = e.east, n[i] = e.north, n
		}, s.unpack = function(e, i, o) {
			return t.defined("array", e), i = r(i, 0), n(o) || (o = new s), o.west = e[i++], o.south = e[i++], o.east = e[i++], o.north = e[i], o
		}, s.computeWidth = function(e) {
			t.typeOf.object("rectangle", e);
			var r = e.east,
				n = e.west;
			return n > r && (r += u.TWO_PI), r - n
		}, s.computeHeight = function(e) {
			return t.typeOf.object("rectangle", e), e.north - e.south
		}, s.fromDegrees = function(e, t, i, o, a) {
			return e = u.toRadians(r(e, 0)), t = u.toRadians(r(t, 0)), i = u.toRadians(r(i, 0)), o = u.toRadians(r(o, 0)), n(a) ? (a.west = e, a.south = t, a.east = i, a.north = o, a) : new s(e, t, i, o)
		}, s.fromRadians = function(e, t, i, o, a) {
			return n(a) ? (a.west = r(e, 0), a.south = r(t, 0), a.east = r(i, 0), a.north = r(o, 0), a) : new s(e, t, i, o)
		}, s.fromCartographicArray = function(e, r) {
			t.defined("cartographics", e);
			for(var i = Number.MAX_VALUE, o = -Number.MAX_VALUE, a = Number.MAX_VALUE, c = -Number.MAX_VALUE, l = Number.MAX_VALUE, f = -Number.MAX_VALUE, E = 0, h = e.length; h > E; E++) {
				var d = e[E];
				i = Math.min(i, d.longitude), o = Math.max(o, d.longitude), l = Math.min(l, d.latitude), f = Math.max(f, d.latitude);
				var p = d.longitude >= 0 ? d.longitude : d.longitude + u.TWO_PI;
				a = Math.min(a, p), c = Math.max(c, p)
			}
			return o - i > c - a && (i = a, o = c, o > u.PI && (o -= u.TWO_PI), i > u.PI && (i -= u.TWO_PI)), n(r) ? (r.west = i, r.south = l, r.east = o, r.north = f, r) : new s(i, l, o, f)
		}, s.fromCartesianArray = function(e, i, a) {
			t.defined("cartesians", e), i = r(i, o.WGS84);
			for(var c = Number.MAX_VALUE, l = -Number.MAX_VALUE, f = Number.MAX_VALUE, E = -Number.MAX_VALUE, h = Number.MAX_VALUE, d = -Number.MAX_VALUE, p = 0, _ = e.length; _ > p; p++) {
				var O = i.cartesianToCartographic(e[p]);
				c = Math.min(c, O.longitude), l = Math.max(l, O.longitude), h = Math.min(h, O.latitude), d = Math.max(d, O.latitude);
				var m = O.longitude >= 0 ? O.longitude : O.longitude + u.TWO_PI;
				f = Math.min(f, m), E = Math.max(E, m)
			}
			return l - c > E - f && (c = f, l = E, l > u.PI && (l -= u.TWO_PI), c > u.PI && (c -= u.TWO_PI)), n(a) ? (a.west = c, a.south = h, a.east = l, a.north = d, a) : new s(c, h, l, d)
		}, s.clone = function(e, t) {
			return n(e) ? n(t) ? (t.west = e.west, t.south = e.south, t.east = e.east, t.north = e.north, t) : new s(e.west, e.south, e.east, e.north) : void 0
		}, s.prototype.clone = function(e) {
			return s.clone(this, e)
		}, s.prototype.equals = function(e) {
			return s.equals(this, e)
		}, s.equals = function(e, t) {
			return e === t || n(e) && n(t) && e.west === t.west && e.south === t.south && e.east === t.east && e.north === t.north
		}, s.prototype.equalsEpsilon = function(e, r) {
			return t.typeOf.number("epsilon", r), n(e) && Math.abs(this.west - e.west) <= r && Math.abs(this.south - e.south) <= r && Math.abs(this.east - e.east) <= r && Math.abs(this.north - e.north) <= r
		}, s.validate = function(e) {
			t.typeOf.object("rectangle", e);
			var r = e.north;
			t.typeOf.number.greaterThanOrEquals("north", r, -u.PI_OVER_TWO), t.typeOf.number.lessThanOrEquals("north", r, u.PI_OVER_TWO);
			var n = e.south;
			t.typeOf.number.greaterThanOrEquals("south", n, -u.PI_OVER_TWO), t.typeOf.number.lessThanOrEquals("south", n, u.PI_OVER_TWO);
			var i = e.west;
			t.typeOf.number.greaterThanOrEquals("west", i, -Math.PI), t.typeOf.number.lessThanOrEquals("west", i, Math.PI);
			var o = e.east;
			t.typeOf.number.greaterThanOrEquals("east", o, -Math.PI), t.typeOf.number.lessThanOrEquals("east", o, Math.PI)
		}, s.southwest = function(r, i) {
			return t.typeOf.object("rectangle", r), n(i) ? (i.longitude = r.west, i.latitude = r.south, i.height = 0, i) : new e(r.west, r.south)
		}, s.northwest = function(r, i) {
			return t.typeOf.object("rectangle", r), n(i) ? (i.longitude = r.west, i.latitude = r.north, i.height = 0, i) : new e(r.west, r.north)
		}, s.northeast = function(r, i) {
			return t.typeOf.object("rectangle", r), n(i) ? (i.longitude = r.east, i.latitude = r.north, i.height = 0, i) : new e(r.east, r.north)
		}, s.southeast = function(r, i) {
			return t.typeOf.object("rectangle", r), n(i) ? (i.longitude = r.east, i.latitude = r.south, i.height = 0, i) : new e(r.east, r.south)
		}, s.center = function(r, i) {
			t.typeOf.object("rectangle", r);
			var o = r.east,
				a = r.west;
			a > o && (o += u.TWO_PI);
			var s = u.negativePiToPi(.5 * (a + o)),
				c = .5 * (r.south + r.north);
			return n(i) ? (i.longitude = s, i.latitude = c, i.height = 0, i) : new e(s, c)
		}, s.intersection = function(e, r, i) {
			t.typeOf.object("rectangle", e), t.typeOf.object("otherRectangle", r);
			var o = e.east,
				a = e.west,
				c = r.east,
				l = r.west;
			a > o && c > 0 ? o += u.TWO_PI : l > c && o > 0 && (c += u.TWO_PI), a > o && 0 > l ? l += u.TWO_PI : l > c && 0 > a && (a += u.TWO_PI);
			var f = u.negativePiToPi(Math.max(a, l)),
				E = u.negativePiToPi(Math.min(o, c));
			if(!((e.west < e.east || r.west < r.east) && f >= E)) {
				var h = Math.max(e.south, r.south),
					d = Math.min(e.north, r.north);
				if(!(h >= d)) return n(i) ? (i.west = f, i.south = h, i.east = E, i.north = d, i) : new s(f, h, E, d)
			}
		}, s.simpleIntersection = function(e, r, i) {
			t.typeOf.object("rectangle", e), t.typeOf.object("otherRectangle", r);
			var o = Math.max(e.west, r.west),
				a = Math.max(e.south, r.south),
				u = Math.min(e.east, r.east),
				c = Math.min(e.north, r.north);
			return a >= c || o >= u ? void 0 : n(i) ? (i.west = o, i.south = a, i.east = u, i.north = c, i) : new s(o, a, u, c)
		}, s.union = function(e, r, i) {
			t.typeOf.object("rectangle", e), t.typeOf.object("otherRectangle", r), n(i) || (i = new s);
			var o = e.east,
				a = e.west,
				c = r.east,
				l = r.west;
			a > o && c > 0 ? o += u.TWO_PI : l > c && o > 0 && (c += u.TWO_PI), a > o && 0 > l ? l += u.TWO_PI : l > c && 0 > a && (a += u.TWO_PI);
			var f = u.convertLongitudeRange(Math.min(a, l)),
				E = u.convertLongitudeRange(Math.max(o, c));
			return i.west = f, i.south = Math.min(e.south, r.south), i.east = E, i.north = Math.max(e.north, r.north), i
		}, s.expand = function(e, r, i) {
			return t.typeOf.object("rectangle", e), t.typeOf.object("cartographic", r), n(i) || (i = new s), i.west = Math.min(e.west, r.longitude), i.south = Math.min(e.south, r.latitude), i.east = Math.max(e.east, r.longitude), i.north = Math.max(e.north, r.latitude), i
		}, s.contains = function(e, r) {
			t.typeOf.object("rectangle", e), t.typeOf.object("cartographic", r);
			var n = r.longitude,
				i = r.latitude,
				o = e.west,
				a = e.east;
			return o > a && (a += u.TWO_PI, 0 > n && (n += u.TWO_PI)), (n > o || u.equalsEpsilon(n, o, u.EPSILON14)) && (a > n || u.equalsEpsilon(n, a, u.EPSILON14)) && i >= e.south && i <= e.north
		};
		var c = new e;
		return s.subsample = function(e, i, a, l) {
			t.typeOf.object("rectangle", e), i = r(i, o.WGS84), a = r(a, 0), n(l) || (l = []);
			var f = 0,
				E = e.north,
				h = e.south,
				d = e.east,
				p = e.west,
				_ = c;
			_.height = a, _.longitude = p, _.latitude = E, l[f] = i.cartographicToCartesian(_, l[f]), f++, _.longitude = d, l[f] = i.cartographicToCartesian(_, l[f]), f++, _.latitude = h, l[f] = i.cartographicToCartesian(_, l[f]), f++, _.longitude = p, l[f] = i.cartographicToCartesian(_, l[f]), f++, 0 > E ? _.latitude = E : h > 0 ? _.latitude = h : _.latitude = 0;
			for(var O = 1; 8 > O; ++O) _.longitude = -Math.PI + O * u.PI_OVER_TWO, s.contains(e, _) && (l[f] = i.cartographicToCartesian(_, l[f]), f++);
			return 0 === _.latitude && (_.longitude = p, l[f] = i.cartographicToCartesian(_, l[f]), f++, _.longitude = d, l[f] = i.cartographicToCartesian(_, l[f]), f++), l.length = f, l
		}, s.MAX_VALUE = a(new s(-Math.PI, -u.PI_OVER_TWO, Math.PI, u.PI_OVER_TWO)), s
	}), define("Core/BoundingSphere", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./Ellipsoid", "./GeographicProjection", "./Intersect", "./Interval", "./Matrix3", "./Matrix4", "./Rectangle"], function(e, t, r, n, i, o, a, u, s, c, l, f) {
		"use strict";

		function E(t, r) {
			this.center = e.clone(n(t, e.ZERO)), this.radius = n(r, 0)
		}
		var h = new e,
			d = new e,
			p = new e,
			_ = new e,
			O = new e,
			m = new e,
			R = new e,
			T = new e,
			y = new e,
			A = new e,
			S = new e,
			N = new e;
		E.fromPoints = function(t, r) {
			if(i(r) || (r = new E), !i(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
			var n, o = e.clone(t[0], R),
				a = e.clone(o, h),
				u = e.clone(o, d),
				s = e.clone(o, p),
				c = e.clone(o, _),
				l = e.clone(o, O),
				f = e.clone(o, m),
				C = t.length;
			for(n = 1; C > n; n++) {
				e.clone(t[n], o);
				var g = o.x,
					I = o.y,
					b = o.z;
				g < a.x && e.clone(o, a), g > c.x && e.clone(o, c), I < u.y && e.clone(o, u), I > l.y && e.clone(o, l), b < s.z && e.clone(o, s), b > f.z && e.clone(o, f)
			}
			var M = e.magnitudeSquared(e.subtract(c, a, T)),
				w = e.magnitudeSquared(e.subtract(l, u, T)),
				v = e.magnitudeSquared(e.subtract(f, s, T)),
				F = a,
				L = c,
				P = M;
			w > P && (P = w, F = u, L = l), v > P && (P = v, F = s, L = f);
			var D = y;
			D.x = .5 * (F.x + L.x), D.y = .5 * (F.y + L.y), D.z = .5 * (F.z + L.z);
			var U = e.magnitudeSquared(e.subtract(L, D, T)),
				B = Math.sqrt(U),
				x = A;
			x.x = a.x, x.y = u.y, x.z = s.z;
			var G = S;
			G.x = c.x, G.y = l.y, G.z = f.z;
			var q = e.multiplyByScalar(e.add(x, G, T), .5, N),
				j = 0;
			for(n = 0; C > n; n++) {
				e.clone(t[n], o);
				var z = e.magnitude(e.subtract(o, q, T));
				z > j && (j = z);
				var V = e.magnitudeSquared(e.subtract(o, D, T));
				if(V > U) {
					var H = Math.sqrt(V);
					B = .5 * (B + H), U = B * B;
					var X = H - B;
					D.x = (B * D.x + X * o.x) / H, D.y = (B * D.y + X * o.y) / H, D.z = (B * D.z + X * o.z) / H
				}
			}
			return j > B ? (e.clone(D, r.center), r.radius = B) : (e.clone(q, r.center), r.radius = j), r
		};
		var C = new a,
			g = new e,
			I = new e,
			b = new t,
			M = new t;
		E.fromRectangle2D = function(e, t, r) {
			return E.fromRectangleWithHeights2D(e, t, 0, 0, r)
		}, E.fromRectangleWithHeights2D = function(t, r, o, a, u) {
			if(i(u) || (u = new E), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
			r = n(r, C), f.southwest(t, b), b.height = o, f.northeast(t, M), M.height = a;
			var s = r.project(b, g),
				c = r.project(M, I),
				l = c.x - s.x,
				h = c.y - s.y,
				d = c.z - s.z;
			u.radius = .5 * Math.sqrt(l * l + h * h + d * d);
			var p = u.center;
			return p.x = s.x + .5 * l, p.y = s.y + .5 * h, p.z = s.z + .5 * d, u
		};
		var w = [];
		E.fromRectangle3D = function(t, r, a, u) {
			if(r = n(r, o.WGS84), a = n(a, 0), i(u) || (u = new E), !i(t)) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
			var s = f.subsample(t, r, a, w);
			return E.fromPoints(s, u)
		}, E.fromVertices = function(t, o, a, u) {
			if(i(u) || (u = new E), !i(t) || 0 === t.length) return u.center = e.clone(e.ZERO, u.center), u.radius = 0, u;
			o = n(o, e.ZERO), a = n(a, 3), r.typeOf.number.greaterThanOrEquals("stride", a, 3);
			var s = R;
			s.x = t[0] + o.x, s.y = t[1] + o.y, s.z = t[2] + o.z;
			var c, l = e.clone(s, h),
				f = e.clone(s, d),
				C = e.clone(s, p),
				g = e.clone(s, _),
				I = e.clone(s, O),
				b = e.clone(s, m),
				M = t.length;
			for(c = 0; M > c; c += a) {
				var w = t[c] + o.x,
					v = t[c + 1] + o.y,
					F = t[c + 2] + o.z;
				s.x = w, s.y = v, s.z = F, w < l.x && e.clone(s, l), w > g.x && e.clone(s, g), v < f.y && e.clone(s, f), v > I.y && e.clone(s, I), F < C.z && e.clone(s, C), F > b.z && e.clone(s, b)
			}
			var L = e.magnitudeSquared(e.subtract(g, l, T)),
				P = e.magnitudeSquared(e.subtract(I, f, T)),
				D = e.magnitudeSquared(e.subtract(b, C, T)),
				U = l,
				B = g,
				x = L;
			P > x && (x = P, U = f, B = I), D > x && (x = D, U = C, B = b);
			var G = y;
			G.x = .5 * (U.x + B.x), G.y = .5 * (U.y + B.y), G.z = .5 * (U.z + B.z);
			var q = e.magnitudeSquared(e.subtract(B, G, T)),
				j = Math.sqrt(q),
				z = A;
			z.x = l.x, z.y = f.y, z.z = C.z;
			var V = S;
			V.x = g.x, V.y = I.y, V.z = b.z;
			var H = e.multiplyByScalar(e.add(z, V, T), .5, N),
				X = 0;
			for(c = 0; M > c; c += a) {
				s.x = t[c] + o.x, s.y = t[c + 1] + o.y, s.z = t[c + 2] + o.z;
				var W = e.magnitude(e.subtract(s, H, T));
				W > X && (X = W);
				var Y = e.magnitudeSquared(e.subtract(s, G, T));
				if(Y > q) {
					var K = Math.sqrt(Y);
					j = .5 * (j + K), q = j * j;
					var k = K - j;
					G.x = (j * G.x + k * s.x) / K, G.y = (j * G.y + k * s.y) / K, G.z = (j * G.z + k * s.z) / K
				}
			}
			return X > j ? (e.clone(G, u.center), u.radius = j) : (e.clone(H, u.center), u.radius = X), u
		}, E.fromEncodedCartesianVertices = function(t, r, n) {
			if(i(n) || (n = new E), !i(t) || !i(r) || t.length !== r.length || 0 === t.length) return n.center = e.clone(e.ZERO, n.center), n.radius = 0, n;
			var o = R;
			o.x = t[0] + r[0], o.y = t[1] + r[1], o.z = t[2] + r[2];
			var a, u = e.clone(o, h),
				s = e.clone(o, d),
				c = e.clone(o, p),
				l = e.clone(o, _),
				f = e.clone(o, O),
				C = e.clone(o, m),
				g = t.length;
			for(a = 0; g > a; a += 3) {
				var I = t[a] + r[a],
					b = t[a + 1] + r[a + 1],
					M = t[a + 2] + r[a + 2];
				o.x = I, o.y = b, o.z = M, I < u.x && e.clone(o, u), I > l.x && e.clone(o, l), b < s.y && e.clone(o, s), b > f.y && e.clone(o, f), M < c.z && e.clone(o, c), M > C.z && e.clone(o, C)
			}
			var w = e.magnitudeSquared(e.subtract(l, u, T)),
				v = e.magnitudeSquared(e.subtract(f, s, T)),
				F = e.magnitudeSquared(e.subtract(C, c, T)),
				L = u,
				P = l,
				D = w;
			v > D && (D = v, L = s, P = f), F > D && (D = F, L = c, P = C);
			var U = y;
			U.x = .5 * (L.x + P.x), U.y = .5 * (L.y + P.y), U.z = .5 * (L.z + P.z);
			var B = e.magnitudeSquared(e.subtract(P, U, T)),
				x = Math.sqrt(B),
				G = A;
			G.x = u.x, G.y = s.y, G.z = c.z;
			var q = S;
			q.x = l.x, q.y = f.y, q.z = C.z;
			var j = e.multiplyByScalar(e.add(G, q, T), .5, N),
				z = 0;
			for(a = 0; g > a; a += 3) {
				o.x = t[a] + r[a], o.y = t[a + 1] + r[a + 1], o.z = t[a + 2] + r[a + 2];
				var V = e.magnitude(e.subtract(o, j, T));
				V > z && (z = V);
				var H = e.magnitudeSquared(e.subtract(o, U, T));
				if(H > B) {
					var X = Math.sqrt(H);
					x = .5 * (x + X), B = x * x;
					var W = X - x;
					U.x = (x * U.x + W * o.x) / X, U.y = (x * U.y + W * o.y) / X, U.z = (x * U.z + W * o.z) / X
				}
			}
			return z > x ? (e.clone(U, n.center), n.radius = x) : (e.clone(j, n.center), n.radius = z), n
		}, E.fromCornerPoints = function(t, n, o) {
			r.typeOf.object("corner", t), r.typeOf.object("oppositeCorner", n), i(o) || (o = new E);
			var a = o.center;
			return e.add(t, n, a), e.multiplyByScalar(a, .5, a), o.radius = e.distance(a, n), o
		}, E.fromEllipsoid = function(t, n) {
			return r.typeOf.object("ellipsoid", t), i(n) || (n = new E), e.clone(e.ZERO, n.center), n.radius = t.maximumRadius, n
		};
		var v = new e;
		E.fromBoundingSpheres = function(t, r) {
			if(i(r) || (r = new E), !i(t) || 0 === t.length) return r.center = e.clone(e.ZERO, r.center), r.radius = 0, r;
			var n = t.length;
			if(1 === n) return E.clone(t[0], r);
			if(2 === n) return E.union(t[0], t[1], r);
			var o, a = [];
			for(o = 0; n > o; o++) a.push(t[o].center);
			r = E.fromPoints(a, r);
			var u = r.center,
				s = r.radius;
			for(o = 0; n > o; o++) {
				var c = t[o];
				s = Math.max(s, e.distance(u, c.center, v) + c.radius)
			}
			return r.radius = s, r
		};
		var F = new e,
			L = new e,
			P = new e;
		E.fromOrientedBoundingBox = function(t, n) {
			r.defined("orientedBoundingBox", t), i(n) || (n = new E);
			var o = t.halfAxes,
				a = c.getColumn(o, 0, F),
				u = c.getColumn(o, 1, L),
				s = c.getColumn(o, 2, P);
			return e.add(a, u, a), e.add(a, s, a), n.center = e.clone(t.center, n.center), n.radius = e.magnitude(a), n
		}, E.clone = function(t, r) {
			return i(t) ? i(r) ? (r.center = e.clone(t.center, r.center), r.radius = t.radius, r) : new E(t.center, t.radius) : void 0
		}, E.packedLength = 4, E.pack = function(e, t, i) {
			r.typeOf.object("value", e), r.defined("array", t), i = n(i, 0);
			var o = e.center;
			return t[i++] = o.x, t[i++] = o.y, t[i++] = o.z, t[i] = e.radius, t
		}, E.unpack = function(e, t, o) {
			r.defined("array", e), t = n(t, 0), i(o) || (o = new E);
			var a = o.center;
			return a.x = e[t++], a.y = e[t++], a.z = e[t++], o.radius = e[t], o
		};
		var D = new e,
			U = new e;
		E.union = function(t, n, o) {
			r.typeOf.object("left", t), r.typeOf.object("right", n), i(o) || (o = new E);
			var a = t.center,
				u = t.radius,
				s = n.center,
				c = n.radius,
				l = e.subtract(s, a, D),
				f = e.magnitude(l);
			if(u >= f + c) return t.clone(o), o;
			if(c >= f + u) return n.clone(o), o;
			var h = .5 * (u + f + c),
				d = e.multiplyByScalar(l, (-u + h) / f, U);
			return e.add(d, a, d), e.clone(d, o.center), o.radius = h, o
		};
		var B = new e;
		E.expand = function(t, n, i) {
			r.typeOf.object("sphere", t), r.typeOf.object("point", n), i = E.clone(t, i);
			var o = e.magnitude(e.subtract(n, i.center, B));
			return o > i.radius && (i.radius = o), i
		}, E.intersectPlane = function(t, n) {
			r.typeOf.object("sphere", t), r.typeOf.object("plane", n);
			var i = t.center,
				o = t.radius,
				a = n.normal,
				s = e.dot(a, i) + n.distance;
			return -o > s ? u.OUTSIDE : o > s ? u.INTERSECTING : u.INSIDE
		}, E.transform = function(e, t, n) {
			return r.typeOf.object("sphere", e), r.typeOf.object("transform", t), i(n) || (n = new E), n.center = l.multiplyByPoint(t, e.center, n.center), n.radius = l.getMaximumScale(t) * e.radius, n
		};
		var x = new e;
		E.distanceSquaredTo = function(t, n) {
			r.typeOf.object("sphere", t), r.typeOf.object("cartesian", n);
			var i = e.subtract(t.center, n, x);
			return e.magnitudeSquared(i) - t.radius * t.radius
		}, E.transformWithoutScale = function(e, t, n) {
			return r.typeOf.object("sphere", e), r.typeOf.object("transform", t), i(n) || (n = new E), n.center = l.multiplyByPoint(t, e.center, n.center), n.radius = e.radius, n
		};
		var G = new e;
		E.computePlaneDistances = function(t, n, o, a) {
			r.typeOf.object("sphere", t), r.typeOf.object("position", n), r.typeOf.object("direction", o), i(a) || (a = new s);
			var u = e.subtract(t.center, n, G),
				c = e.dot(o, u);
			return a.start = c - t.radius, a.stop = c + t.radius, a
		};
		for(var q = new e, j = new e, z = new e, V = new e, H = new e, X = new t, W = new Array(8), Y = 0; 8 > Y; ++Y) W[Y] = new e;
		var K = new a;
		return E.projectTo2D = function(t, i, o) {
			r.typeOf.object("sphere", t), i = n(i, K);
			var a = i.ellipsoid,
				u = t.center,
				s = t.radius,
				c = a.geodeticSurfaceNormal(u, q),
				l = e.cross(e.UNIT_Z, c, j);
			e.normalize(l, l);
			var f = e.cross(c, l, z);
			e.normalize(f, f), e.multiplyByScalar(c, s, c), e.multiplyByScalar(f, s, f), e.multiplyByScalar(l, s, l);
			var h = e.negate(f, H),
				d = e.negate(l, V),
				p = W,
				_ = p[0];
			e.add(c, f, _), e.add(_, l, _), _ = p[1], e.add(c, f, _), e.add(_, d, _), _ = p[2], e.add(c, h, _), e.add(_, d, _), _ = p[3], e.add(c, h, _), e.add(_, l, _), e.negate(c, c), _ = p[4], e.add(c, f, _), e.add(_, l, _), _ = p[5], e.add(c, f, _), e.add(_, d, _), _ = p[6], e.add(c, h, _), e.add(_, d, _), _ = p[7], e.add(c, h, _), e.add(_, l, _);
			for(var O = p.length, m = 0; O > m; ++m) {
				var R = p[m];
				e.add(u, R, R);
				var T = a.cartesianToCartographic(R, X);
				i.project(T, R)
			}
			o = E.fromPoints(p, o), u = o.center;
			var y = u.x,
				A = u.y,
				S = u.z;
			return u.x = S, u.y = y, u.z = A, o
		}, E.isOccluded = function(e, t) {
			return r.typeOf.object("sphere", e), r.typeOf.object("occluder", t), !t.isBoundingSphereVisible(e)
		}, E.equals = function(t, r) {
			return t === r || i(t) && i(r) && e.equals(t.center, r.center) && t.radius === r.radius
		}, E.prototype.intersectPlane = function(e) {
			return E.intersectPlane(this, e)
		}, E.prototype.distanceSquaredTo = function(e) {
			return E.distanceSquaredTo(this, e)
		}, E.prototype.computePlaneDistances = function(e, t, r) {
			return E.computePlaneDistances(this, e, t, r)
		}, E.prototype.isOccluded = function(e) {
			return E.isOccluded(this, e)
		}, E.prototype.equals = function(e) {
			return E.equals(this, e)
		}, E.prototype.clone = function(e) {
			return E.clone(this, e)
		}, E
	}), define("Core/Fullscreen", ["./defined", "./defineProperties"], function(e, t) {
		"use strict";
		var r, n = {
				requestFullscreen: void 0,
				exitFullscreen: void 0,
				fullscreenEnabled: void 0,
				fullscreenElement: void 0,
				fullscreenchange: void 0,
				fullscreenerror: void 0
			},
			i = {};
		return t(i, {
			element: {
				get: function() {
					return i.supportsFullscreen() ? document[n.fullscreenElement] : void 0
				}
			},
			changeEventName: {
				get: function() {
					return i.supportsFullscreen() ? n.fullscreenchange : void 0
				}
			},
			errorEventName: {
				get: function() {
					return i.supportsFullscreen() ? n.fullscreenerror : void 0
				}
			},
			enabled: {
				get: function() {
					return i.supportsFullscreen() ? document[n.fullscreenEnabled] : void 0
				}
			},
			fullscreen: {
				get: function() {
					return i.supportsFullscreen() ? null !== i.element : void 0
				}
			}
		}), i.supportsFullscreen = function() {
			if(e(r)) return r;
			r = !1;
			var t = document.body;
			if("function" == typeof t.requestFullscreen) return n.requestFullscreen = "requestFullscreen", n.exitFullscreen = "exitFullscreen", n.fullscreenEnabled = "fullscreenEnabled", n.fullscreenElement = "fullscreenElement", n.fullscreenchange = "fullscreenchange", n.fullscreenerror = "fullscreenerror", r = !0;
			for(var i, o = ["webkit", "moz", "o", "ms", "khtml"], a = 0, u = o.length; u > a; ++a) {
				var s = o[a];
				i = s + "RequestFullscreen", "function" == typeof t[i] ? (n.requestFullscreen = i, r = !0) : (i = s + "RequestFullScreen", "function" == typeof t[i] && (n.requestFullscreen = i, r = !0)), i = s + "ExitFullscreen", "function" == typeof document[i] ? n.exitFullscreen = i : (i = s + "CancelFullScreen", "function" == typeof document[i] && (n.exitFullscreen = i)), i = s + "FullscreenEnabled", void 0 !== document[i] ? n.fullscreenEnabled = i : (i = s + "FullScreenEnabled", void 0 !== document[i] && (n.fullscreenEnabled = i)), i = s + "FullscreenElement", void 0 !== document[i] ? n.fullscreenElement = i : (i = s + "FullScreenElement", void 0 !== document[i] && (n.fullscreenElement = i)), i = s + "fullscreenchange", void 0 !== document["on" + i] && ("ms" === s && (i = "MSFullscreenChange"), n.fullscreenchange = i), i = s + "fullscreenerror", void 0 !== document["on" + i] && ("ms" === s && (i = "MSFullscreenError"), n.fullscreenerror = i)
			}
			return r
		}, i.requestFullscreen = function(e, t) {
			i.supportsFullscreen() && e[n.requestFullscreen]({
				vrDisplay: t
			})
		}, i.exitFullscreen = function() {
			i.supportsFullscreen() && document[n.exitFullscreen]()
		}, i
	}), define("Core/FeatureDetection", ["./defaultValue", "./defined", "./Fullscreen"], function(e, t, r) {
		"use strict";

		function n(e) {
			for(var t = e.split("."), r = 0, n = t.length; n > r; ++r) t[r] = parseInt(t[r], 10);
			return t
		}

		function i() {
			if(!t(A) && (A = !1, !E())) {
				var e = / Chrome\/([\.0-9]+)/.exec(y.userAgent);
				null !== e && (A = !0, S = n(e[1]))
			}
			return A
		}

		function o() {
			return i() && S
		}

		function a() {
			if(!t(N) && (N = !1, !i() && !E() && / Safari\/[\.0-9]+/.test(y.userAgent))) {
				var e = / Version\/([\.0-9]+)/.exec(y.userAgent);
				null !== e && (N = !0, C = n(e[1]))
			}
			return N
		}

		function u() {
			return a() && C
		}

		function s() {
			if(!t(g)) {
				g = !1;
				var e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(y.userAgent);
				null !== e && (g = !0, I = n(e[1]), I.isNightly = !!e[2])
			}
			return g
		}

		function c() {
			return s() && I
		}

		function l() {
			if(!t(b)) {
				b = !1;
				var e;
				"Microsoft Internet Explorer" === y.appName ? (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(y.userAgent), null !== e && (b = !0, M = n(e[1]))) : "Netscape" === y.appName && (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(y.userAgent), null !== e && (b = !0, M = n(e[1])))
			}
			return b
		}

		function f() {
			return l() && M
		}

		function E() {
			if(!t(w)) {
				w = !1;
				var e = / Edge\/([\.0-9]+)/.exec(y.userAgent);
				null !== e && (w = !0, v = n(e[1]))
			}
			return w
		}

		function h() {
			return E() && v
		}

		function d() {
			if(!t(F)) {
				F = !1;
				var e = /Firefox\/([\.0-9]+)/.exec(y.userAgent);
				null !== e && (F = !0, L = n(e[1]))
			}
			return F
		}

		function p() {
			return t(P) || (P = /Windows/i.test(y.appVersion)), P
		}

		function _() {
			return d() && L
		}

		function O() {
			return t(D) || (D = "undefined" != typeof PointerEvent && (!t(y.pointerEnabled) || y.pointerEnabled)), D
		}

		function m() {
			if(!t(B)) {
				var e = document.createElement("canvas");
				e.setAttribute("style", "image-rendering: -moz-crisp-edges;image-rendering: pixelated;");
				var r = e.style.imageRendering;
				B = t(r) && "" !== r, B && (U = r)
			}
			return B
		}

		function R() {
			return m() ? U : void 0
		}

		function T() {
			var e = window.navigator.userAgent.toLowerCase(),
				t = "ipad" == e.match(/ipad/i),
				r = "iphone os" == e.match(/iphone os/i),
				n = "midp" == e.match(/midp/i),
				i = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i),
				o = "ucweb" == e.match(/ucweb/i),
				a = "android" == e.match(/android/i),
				u = "windows ce" == e.match(/windows ce/i),
				s = "windows mobile" == e.match(/windows mobile/i);
			return t || r || n || i || o || a || u || s ? !1 : !0
		}
		var y;
		y = "undefined" != typeof navigator ? navigator : {};
		var A, S, N, C, g, I, b, M, w, v, F, L, P, D, U, B, x = {
			isChrome: i,
			chromeVersion: o,
			isSafari: a,
			safariVersion: u,
			isWebkit: s,
			webkitVersion: c,
			isInternetExplorer: l,
			internetExplorerVersion: f,
			isEdge: E,
			edgeVersion: h,
			isFirefox: d,
			firefoxVersion: _,
			isWindows: p,
			hardwareConcurrency: e(y.hardwareConcurrency, 3),
			supportsPointerEvents: O,
			supportsImageRenderingPixelated: m,
			imageRenderingValue: R,
			isPCBroswer: T
		};
		return x.supportsFullscreen = function() {
			return r.supportsFullscreen()
		}, x.supportsTypedArrays = function() {
			return "undefined" != typeof ArrayBuffer
		}, x.supportsWebWorkers = function() {
			return "undefined" != typeof Worker
		}, x
	}), define("Core/Color", ["./Check", "./defaultValue", "./defined", "./FeatureDetection", "./freezeObject", "./Math"], function(e, t, r, n, i, o) {
		"use strict";

		function a(e, t, r) {
			return 0 > r && (r += 1), r > 1 && (r -= 1), 1 > 6 * r ? e + 6 * (t - e) * r : 1 > 2 * r ? t : 2 > 3 * r ? e + (t - e) * (2 / 3 - r) * 6 : e
		}

		function u(e, r, n, i) {
			this.red = t(e, 1), this.green = t(r, 1), this.blue = t(n, 1), this.alpha = t(i, 1)
		}
		u.fromCartesian4 = function(t, n) {
			return e.typeOf.object("cartesian", t), r(n) ? (n.red = t.x, n.green = t.y, n.blue = t.z, n.alpha = t.w, n) : new u(t.x, t.y, t.z, t.w)
		}, u.fromBytes = function(e, n, i, o, a) {
			return e = u.byteToFloat(t(e, 255)), n = u.byteToFloat(t(n, 255)), i = u.byteToFloat(t(i, 255)), o = u.byteToFloat(t(o, 255)), r(a) ? (a.red = e, a.green = n, a.blue = i, a.alpha = o, a) : new u(e, n, i, o)
		}, u.fromAlpha = function(t, n, i) {
			return e.typeOf.object("color", t), e.typeOf.number("alpha", n), r(i) ? (i.red = t.red, i.green = t.green, i.blue = t.blue, i.alpha = n, i) : new u(t.red, t.green, t.blue, n)
		};
		var s, c, l;
		n.supportsTypedArrays() && (s = new ArrayBuffer(4), c = new Uint32Array(s), l = new Uint8Array(s)), u.fromRgba = function(e, t) {
			return c[0] = e, u.fromBytes(l[0], l[1], l[2], l[3], t)
		}, u.fromHsl = function(e, n, i, o, s) {
			e = t(e, 0) % 1, n = t(n, 0), i = t(i, 0), o = t(o, 1);
			var c = i,
				l = i,
				f = i;
			if(0 !== n) {
				var E;
				E = .5 > i ? i * (1 + n) : i + n - i * n;
				var h = 2 * i - E;
				c = a(h, E, e + 1 / 3), l = a(h, E, e), f = a(h, E, e - 1 / 3)
			}
			return r(s) ? (s.red = c, s.green = l, s.blue = f, s.alpha = o, s) : new u(c, l, f, o)
		}, u.fromRandom = function(n, i) {
			n = t(n, t.EMPTY_OBJECT);
			var a = n.red;
			if(!r(a)) {
				var s = t(n.minimumRed, 0),
					c = t(n.maximumRed, 1);
				e.typeOf.number.lessThanOrEquals("minimumRed", s, c), a = s + o.nextRandomNumber() * (c - s)
			}
			var l = n.green;
			if(!r(l)) {
				var f = t(n.minimumGreen, 0),
					E = t(n.maximumGreen, 1);
				e.typeOf.number.lessThanOrEquals("minimumGreen", f, E), l = f + o.nextRandomNumber() * (E - f)
			}
			var h = n.blue;
			if(!r(h)) {
				var d = t(n.minimumBlue, 0),
					p = t(n.maximumBlue, 1);
				e.typeOf.number.lessThanOrEquals("minimumBlue", d, p), h = d + o.nextRandomNumber() * (p - d)
			}
			var _ = n.alpha;
			if(!r(_)) {
				var O = t(n.minimumAlpha, 0),
					m = t(n.maximumAlpha, 1);
				e.typeOf.number.lessThanOrEquals("minumumAlpha", O, m), _ = O + o.nextRandomNumber() * (m - O)
			}
			return r(i) ? (i.red = a, i.green = l, i.blue = h, i.alpha = _, i) : new u(a, l, h, _)
		};
		var f = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i,
			E = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i,
			h = /^rgba?\(\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)\s*,\s*([0-9.]+%?)(?:\s*,\s*([0-9.]+))?\s*\)$/i,
			d = /^hsla?\(\s*([0-9.]+)\s*,\s*([0-9.]+%)\s*,\s*([0-9.]+%)(?:\s*,\s*([0-9.]+))?\s*\)$/i;
		return u.fromCssColorString = function(n, i) {
			e.typeOf.string("color", n), r(i) || (i = new u);
			var o = u[n.toUpperCase()];
			if(r(o)) return u.clone(o, i), i;
			var a = f.exec(n);
			return null !== a ? (i.red = parseInt(a[1], 16) / 15, i.green = parseInt(a[2], 16) / 15, i.blue = parseInt(a[3], 16) / 15, i.alpha = 1, i) : (a = E.exec(n), null !== a ? (i.red = parseInt(a[1], 16) / 255, i.green = parseInt(a[2], 16) / 255, i.blue = parseInt(a[3], 16) / 255, i.alpha = 1, i) : (a = h.exec(n), null !== a ? (i.red = parseFloat(a[1]) / ("%" === a[1].substr(-1) ? 100 : 255), i.green = parseFloat(a[2]) / ("%" === a[2].substr(-1) ? 100 : 255), i.blue = parseFloat(a[3]) / ("%" === a[3].substr(-1) ? 100 : 255), i.alpha = parseFloat(t(a[4], "1.0")), i) : (a = d.exec(n), null !== a ? u.fromHsl(parseFloat(a[1]) / 360, parseFloat(a[2]) / 100, parseFloat(a[3]) / 100, parseFloat(t(a[4], "1.0")), i) : i = void 0)))
		}, u.packedLength = 4, u.pack = function(r, n, i) {
			return e.typeOf.object("value", r), e.defined("array", n), i = t(i, 0), n[i++] = r.red, n[i++] = r.green, n[i++] = r.blue, n[i] = r.alpha, n
		}, u.unpack = function(n, i, o) {
			return e.defined("array", n), i = t(i, 0), r(o) || (o = new u), o.red = n[i++], o.green = n[i++], o.blue = n[i++], o.alpha = n[i], o
		}, u.byteToFloat = function(e) {
			return e / 255
		}, u.floatToByte = function(e) {
			return 1 === e ? 255 : 256 * e | 0
		}, u.clone = function(e, t) {
			return r(e) ? r(t) ? (t.red = e.red, t.green = e.green, t.blue = e.blue, t.alpha = e.alpha, t) : new u(e.red, e.green, e.blue, e.alpha) : void 0
		}, u.equals = function(e, t) {
			return e === t || r(e) && r(t) && e.red === t.red && e.green === t.green && e.blue === t.blue && e.alpha === t.alpha
		}, u.equalsArray = function(e, t, r) {
			return e.red === t[r] && e.green === t[r + 1] && e.blue === t[r + 2] && e.alpha === t[r + 3]
		}, u.prototype.clone = function(e) {
			return u.clone(this, e)
		}, u.prototype.equals = function(e) {
			return u.equals(this, e)
		}, u.prototype.equalsEpsilon = function(e, t) {
			return this === e || r(e) && Math.abs(this.red - e.red) <= t && Math.abs(this.green - e.green) <= t && Math.abs(this.blue - e.blue) <= t && Math.abs(this.alpha - e.alpha) <= t
		}, u.prototype.toString = function() {
			return "(" + this.red + ", " + this.green + ", " + this.blue + ", " + this.alpha + ")"
		}, u.prototype.toCssColorString = function() {
			var e = u.floatToByte(this.red),
				t = u.floatToByte(this.green),
				r = u.floatToByte(this.blue);
			return 1 === this.alpha ? "rgb(" + e + "," + t + "," + r + ")" : "rgba(" + e + "," + t + "," + r + "," + this.alpha + ")"
		}, u.prototype.toBytes = function(e) {
			var t = u.floatToByte(this.red),
				n = u.floatToByte(this.green),
				i = u.floatToByte(this.blue),
				o = u.floatToByte(this.alpha);
			return r(e) ? (e[0] = t, e[1] = n, e[2] = i, e[3] = o, e) : [t, n, i, o]
		}, u.prototype.toRgba = function() {
			return l[0] = u.floatToByte(this.red), l[1] = u.floatToByte(this.green), l[2] = u.floatToByte(this.blue), l[3] = u.floatToByte(this.alpha), c[0]
		}, u.prototype.brighten = function(t, r) {
			return e.typeOf.number("magnitude", t), e.typeOf.number.greaterThanOrEquals("magnitude", t, 0), e.typeOf.object("result", r), t = 1 - t, r.red = 1 - (1 - this.red) * t, r.green = 1 - (1 - this.green) * t, r.blue = 1 - (1 - this.blue) * t, r.alpha = this.alpha, r
		}, u.prototype.darken = function(t, r) {
			return e.typeOf.number("magnitude", t), e.typeOf.number.greaterThanOrEquals("magnitude", t, 0), e.typeOf.object("result", r), t = 1 - t, r.red = this.red * t, r.green = this.green * t, r.blue = this.blue * t, r.alpha = this.alpha, r
		}, u.prototype.withAlpha = function(e, t) {
			return u.fromAlpha(this, e, t)
		}, u.add = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.red = t.red + r.red, n.green = t.green + r.green, n.blue = t.blue + r.blue, n.alpha = t.alpha + r.alpha, n
		}, u.subtract = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.red = t.red - r.red, n.green = t.green - r.green, n.blue = t.blue - r.blue, n.alpha = t.alpha - r.alpha, n
		}, u.multiply = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.red = t.red * r.red, n.green = t.green * r.green, n.blue = t.blue * r.blue, n.alpha = t.alpha * r.alpha, n
		}, u.divide = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.red = t.red / r.red, n.green = t.green / r.green, n.blue = t.blue / r.blue, n.alpha = t.alpha / r.alpha, n
		}, u.mod = function(t, r, n) {
			return e.typeOf.object("left", t), e.typeOf.object("right", r), e.typeOf.object("result", n), n.red = t.red % r.red, n.green = t.green % r.green, n.blue = t.blue % r.blue, n.alpha = t.alpha % r.alpha, n
		}, u.multiplyByScalar = function(t, r, n) {
			return e.typeOf.object("color", t), e.typeOf.number("scalar", r), e.typeOf.object("result", n), n.red = t.red * r, n.green = t.green * r, n.blue = t.blue * r, n.alpha = t.alpha * r, n
		}, u.divideByScalar = function(t, r, n) {
			return e.typeOf.object("color", t), e.typeOf.number("scalar", r), e.typeOf.object("result", n), n.red = t.red / r, n.green = t.green / r, n.blue = t.blue / r, n.alpha = t.alpha / r, n
		}, u.ALICEBLUE = i(u.fromCssColorString("#F0F8FF")), u.ANTIQUEWHITE = i(u.fromCssColorString("#FAEBD7")), u.AQUA = i(u.fromCssColorString("#00FFFF")), u.AQUAMARINE = i(u.fromCssColorString("#7FFFD4")), u.AZURE = i(u.fromCssColorString("#F0FFFF")), u.BEIGE = i(u.fromCssColorString("#F5F5DC")), u.BISQUE = i(u.fromCssColorString("#FFE4C4")), u.BLACK = i(u.fromCssColorString("#000000")), u.BLANCHEDALMOND = i(u.fromCssColorString("#FFEBCD")), u.BLUE = i(u.fromCssColorString("#0000FF")), u.BLUEVIOLET = i(u.fromCssColorString("#8A2BE2")), u.BROWN = i(u.fromCssColorString("#A52A2A")), u.BURLYWOOD = i(u.fromCssColorString("#DEB887")), u.CADETBLUE = i(u.fromCssColorString("#5F9EA0")), u.CHARTREUSE = i(u.fromCssColorString("#7FFF00")), u.CHOCOLATE = i(u.fromCssColorString("#D2691E")), u.CORAL = i(u.fromCssColorString("#FF7F50")), u.CORNFLOWERBLUE = i(u.fromCssColorString("#6495ED")), u.CORNSILK = i(u.fromCssColorString("#FFF8DC")), u.CRIMSON = i(u.fromCssColorString("#DC143C")), u.CYAN = i(u.fromCssColorString("#00FFFF")), u.DARKBLUE = i(u.fromCssColorString("#00008B")), u.DARKCYAN = i(u.fromCssColorString("#008B8B")), u.DARKGOLDENROD = i(u.fromCssColorString("#B8860B")), u.DARKGRAY = i(u.fromCssColorString("#A9A9A9")), u.DARKGREEN = i(u.fromCssColorString("#006400")), u.DARKGREY = u.DARKGRAY, u.DARKKHAKI = i(u.fromCssColorString("#BDB76B")), u.DARKMAGENTA = i(u.fromCssColorString("#8B008B")), u.DARKOLIVEGREEN = i(u.fromCssColorString("#556B2F")), u.DARKORANGE = i(u.fromCssColorString("#FF8C00")), u.DARKORCHID = i(u.fromCssColorString("#9932CC")), u.DARKRED = i(u.fromCssColorString("#8B0000")), u.DARKSALMON = i(u.fromCssColorString("#E9967A")), u.DARKSEAGREEN = i(u.fromCssColorString("#8FBC8F")), u.DARKSLATEBLUE = i(u.fromCssColorString("#483D8B")), u.DARKSLATEGRAY = i(u.fromCssColorString("#2F4F4F")), u.DARKSLATEGREY = u.DARKSLATEGRAY, u.DARKTURQUOISE = i(u.fromCssColorString("#00CED1")), u.DARKVIOLET = i(u.fromCssColorString("#9400D3")), u.DEEPPINK = i(u.fromCssColorString("#FF1493")), u.DEEPSKYBLUE = i(u.fromCssColorString("#00BFFF")), u.DIMGRAY = i(u.fromCssColorString("#696969")), u.DIMGREY = u.DIMGRAY, u.DODGERBLUE = i(u.fromCssColorString("#1E90FF")), u.FIREBRICK = i(u.fromCssColorString("#B22222")), u.FLORALWHITE = i(u.fromCssColorString("#FFFAF0")), u.FORESTGREEN = i(u.fromCssColorString("#228B22")), u.FUCHSIA = i(u.fromCssColorString("#FF00FF")), u.GAINSBORO = i(u.fromCssColorString("#DCDCDC")), u.GHOSTWHITE = i(u.fromCssColorString("#F8F8FF")), u.GOLD = i(u.fromCssColorString("#FFD700")), u.GOLDENROD = i(u.fromCssColorString("#DAA520")), u.GRAY = i(u.fromCssColorString("#808080")), u.GREEN = i(u.fromCssColorString("#008000")), u.GREENYELLOW = i(u.fromCssColorString("#ADFF2F")), u.GREY = u.GRAY, u.HONEYDEW = i(u.fromCssColorString("#F0FFF0")), u.HOTPINK = i(u.fromCssColorString("#FF69B4")), u.INDIANRED = i(u.fromCssColorString("#CD5C5C")), u.INDIGO = i(u.fromCssColorString("#4B0082")), u.IVORY = i(u.fromCssColorString("#FFFFF0")), u.KHAKI = i(u.fromCssColorString("#F0E68C")), u.LAVENDER = i(u.fromCssColorString("#E6E6FA")), u.LAVENDAR_BLUSH = i(u.fromCssColorString("#FFF0F5")), u.LAWNGREEN = i(u.fromCssColorString("#7CFC00")), u.LEMONCHIFFON = i(u.fromCssColorString("#FFFACD")), u.LIGHTBLUE = i(u.fromCssColorString("#ADD8E6")), u.LIGHTCORAL = i(u.fromCssColorString("#F08080")), u.LIGHTCYAN = i(u.fromCssColorString("#E0FFFF")), u.LIGHTGOLDENRODYELLOW = i(u.fromCssColorString("#FAFAD2")), u.LIGHTGRAY = i(u.fromCssColorString("#D3D3D3")), u.LIGHTGREEN = i(u.fromCssColorString("#90EE90")), u.LIGHTGREY = u.LIGHTGRAY, u.LIGHTPINK = i(u.fromCssColorString("#FFB6C1")), u.LIGHTSEAGREEN = i(u.fromCssColorString("#20B2AA")), u.LIGHTSKYBLUE = i(u.fromCssColorString("#87CEFA")), u.LIGHTSLATEGRAY = i(u.fromCssColorString("#778899")), u.LIGHTSLATEGREY = u.LIGHTSLATEGRAY, u.LIGHTSTEELBLUE = i(u.fromCssColorString("#B0C4DE")), u.LIGHTYELLOW = i(u.fromCssColorString("#FFFFE0")), u.LIME = i(u.fromCssColorString("#00FF00")), u.LIMEGREEN = i(u.fromCssColorString("#32CD32")), u.LINEN = i(u.fromCssColorString("#FAF0E6")), u.MAGENTA = i(u.fromCssColorString("#FF00FF")), u.MAROON = i(u.fromCssColorString("#800000")), u.MEDIUMAQUAMARINE = i(u.fromCssColorString("#66CDAA")), u.MEDIUMBLUE = i(u.fromCssColorString("#0000CD")), u.MEDIUMORCHID = i(u.fromCssColorString("#BA55D3")), u.MEDIUMPURPLE = i(u.fromCssColorString("#9370DB")), u.MEDIUMSEAGREEN = i(u.fromCssColorString("#3CB371")), u.MEDIUMSLATEBLUE = i(u.fromCssColorString("#7B68EE")), u.MEDIUMSPRINGGREEN = i(u.fromCssColorString("#00FA9A")), u.MEDIUMTURQUOISE = i(u.fromCssColorString("#48D1CC")), u.MEDIUMVIOLETRED = i(u.fromCssColorString("#C71585")), u.MIDNIGHTBLUE = i(u.fromCssColorString("#191970")), u.MINTCREAM = i(u.fromCssColorString("#F5FFFA")), u.MISTYROSE = i(u.fromCssColorString("#FFE4E1")), u.MOCCASIN = i(u.fromCssColorString("#FFE4B5")), u.NAVAJOWHITE = i(u.fromCssColorString("#FFDEAD")), u.NAVY = i(u.fromCssColorString("#000080")), u.OLDLACE = i(u.fromCssColorString("#FDF5E6")), u.OLIVE = i(u.fromCssColorString("#808000")), u.OLIVEDRAB = i(u.fromCssColorString("#6B8E23")), u.ORANGE = i(u.fromCssColorString("#FFA500")), u.ORANGERED = i(u.fromCssColorString("#FF4500")), u.ORCHID = i(u.fromCssColorString("#DA70D6")), u.PALEGOLDENROD = i(u.fromCssColorString("#EEE8AA")), u.PALEGREEN = i(u.fromCssColorString("#98FB98")), u.PALETURQUOISE = i(u.fromCssColorString("#AFEEEE")), u.PALEVIOLETRED = i(u.fromCssColorString("#DB7093")), u.PAPAYAWHIP = i(u.fromCssColorString("#FFEFD5")), u.PEACHPUFF = i(u.fromCssColorString("#FFDAB9")), u.PERU = i(u.fromCssColorString("#CD853F")), u.PINK = i(u.fromCssColorString("#FFC0CB")), u.PLUM = i(u.fromCssColorString("#DDA0DD")), u.POWDERBLUE = i(u.fromCssColorString("#B0E0E6")), u.PURPLE = i(u.fromCssColorString("#800080")), u.RED = i(u.fromCssColorString("#FF0000")), u.ROSYBROWN = i(u.fromCssColorString("#BC8F8F")), u.ROYALBLUE = i(u.fromCssColorString("#4169E1")), u.SADDLEBROWN = i(u.fromCssColorString("#8B4513")), u.SALMON = i(u.fromCssColorString("#FA8072")), u.SANDYBROWN = i(u.fromCssColorString("#F4A460")), u.SEAGREEN = i(u.fromCssColorString("#2E8B57")), u.SEASHELL = i(u.fromCssColorString("#FFF5EE")), u.SIENNA = i(u.fromCssColorString("#A0522D")), u.SILVER = i(u.fromCssColorString("#C0C0C0")), u.SKYBLUE = i(u.fromCssColorString("#87CEEB")), u.SLATEBLUE = i(u.fromCssColorString("#6A5ACD")), u.SLATEGRAY = i(u.fromCssColorString("#708090")), u.SLATEGREY = u.SLATEGRAY, u.SNOW = i(u.fromCssColorString("#FFFAFA")), u.SPRINGGREEN = i(u.fromCssColorString("#00FF7F")), u.STEELBLUE = i(u.fromCssColorString("#4682B4")), u.TAN = i(u.fromCssColorString("#D2B48C")), u.TEAL = i(u.fromCssColorString("#008080")), u.THISTLE = i(u.fromCssColorString("#D8BFD8")), u.TOMATO = i(u.fromCssColorString("#FF6347")), u.TURQUOISE = i(u.fromCssColorString("#40E0D0")), u.VIOLET = i(u.fromCssColorString("#EE82EE")), u.WHEAT = i(u.fromCssColorString("#F5DEB3")), u.WHITE = i(u.fromCssColorString("#FFFFFF")), u.WHITESMOKE = i(u.fromCssColorString("#F5F5F5")), u.YELLOW = i(u.fromCssColorString("#FFFF00")), u.YELLOWGREEN = i(u.fromCssColorString("#9ACD32")), u.TRANSPARENT = i(new u(0, 0, 0, 0)), u
	}), define("Core/WebGLConstants", ["./freezeObject"], function(e) {
		"use strict";
		var t = {
			DEPTH_BUFFER_BIT: 256,
			STENCIL_BUFFER_BIT: 1024,
			COLOR_BUFFER_BIT: 16384,
			POINTS: 0,
			LINES: 1,
			LINE_LOOP: 2,
			LINE_STRIP: 3,
			TRIANGLES: 4,
			TRIANGLE_STRIP: 5,
			TRIANGLE_FAN: 6,
			ZERO: 0,
			ONE: 1,
			SRC_COLOR: 768,
			ONE_MINUS_SRC_COLOR: 769,
			SRC_ALPHA: 770,
			ONE_MINUS_SRC_ALPHA: 771,
			DST_ALPHA: 772,
			ONE_MINUS_DST_ALPHA: 773,
			DST_COLOR: 774,
			ONE_MINUS_DST_COLOR: 775,
			SRC_ALPHA_SATURATE: 776,
			FUNC_ADD: 32774,
			BLEND_EQUATION: 32777,
			BLEND_EQUATION_RGB: 32777,
			BLEND_EQUATION_ALPHA: 34877,
			FUNC_SUBTRACT: 32778,
			FUNC_REVERSE_SUBTRACT: 32779,
			BLEND_DST_RGB: 32968,
			BLEND_SRC_RGB: 32969,
			BLEND_DST_ALPHA: 32970,
			BLEND_SRC_ALPHA: 32971,
			CONSTANT_COLOR: 32769,
			ONE_MINUS_CONSTANT_COLOR: 32770,
			CONSTANT_ALPHA: 32771,
			ONE_MINUS_CONSTANT_ALPHA: 32772,
			BLEND_COLOR: 32773,
			ARRAY_BUFFER: 34962,
			ELEMENT_ARRAY_BUFFER: 34963,
			ARRAY_BUFFER_BINDING: 34964,
			ELEMENT_ARRAY_BUFFER_BINDING: 34965,
			STREAM_DRAW: 35040,
			STATIC_DRAW: 35044,
			DYNAMIC_DRAW: 35048,
			BUFFER_SIZE: 34660,
			BUFFER_USAGE: 34661,
			CURRENT_VERTEX_ATTRIB: 34342,
			FRONT: 1028,
			BACK: 1029,
			FRONT_AND_BACK: 1032,
			CULL_FACE: 2884,
			BLEND: 3042,
			DITHER: 3024,
			STENCIL_TEST: 2960,
			DEPTH_TEST: 2929,
			SCISSOR_TEST: 3089,
			POLYGON_OFFSET_FILL: 32823,
			SAMPLE_ALPHA_TO_COVERAGE: 32926,
			SAMPLE_COVERAGE: 32928,
			NO_ERROR: 0,
			INVALID_ENUM: 1280,
			INVALID_VALUE: 1281,
			INVALID_OPERATION: 1282,
			OUT_OF_MEMORY: 1285,
			CW: 2304,
			CCW: 2305,
			LINE_WIDTH: 2849,
			ALIASED_POINT_SIZE_RANGE: 33901,
			ALIASED_LINE_WIDTH_RANGE: 33902,
			CULL_FACE_MODE: 2885,
			FRONT_FACE: 2886,
			DEPTH_RANGE: 2928,
			DEPTH_WRITEMASK: 2930,
			DEPTH_CLEAR_VALUE: 2931,
			DEPTH_FUNC: 2932,
			STENCIL_CLEAR_VALUE: 2961,
			STENCIL_FUNC: 2962,
			STENCIL_FAIL: 2964,
			STENCIL_PASS_DEPTH_FAIL: 2965,
			STENCIL_PASS_DEPTH_PASS: 2966,
			STENCIL_REF: 2967,
			STENCIL_VALUE_MASK: 2963,
			STENCIL_WRITEMASK: 2968,
			STENCIL_BACK_FUNC: 34816,
			STENCIL_BACK_FAIL: 34817,
			STENCIL_BACK_PASS_DEPTH_FAIL: 34818,
			STENCIL_BACK_PASS_DEPTH_PASS: 34819,
			STENCIL_BACK_REF: 36003,
			STENCIL_BACK_VALUE_MASK: 36004,
			STENCIL_BACK_WRITEMASK: 36005,
			VIEWPORT: 2978,
			SCISSOR_BOX: 3088,
			COLOR_CLEAR_VALUE: 3106,
			COLOR_WRITEMASK: 3107,
			UNPACK_ALIGNMENT: 3317,
			PACK_ALIGNMENT: 3333,
			MAX_TEXTURE_SIZE: 3379,
			MAX_VIEWPORT_DIMS: 3386,
			SUBPIXEL_BITS: 3408,
			RED_BITS: 3410,
			GREEN_BITS: 3411,
			BLUE_BITS: 3412,
			ALPHA_BITS: 3413,
			DEPTH_BITS: 3414,
			STENCIL_BITS: 3415,
			POLYGON_OFFSET_UNITS: 10752,
			POLYGON_OFFSET_FACTOR: 32824,
			TEXTURE_BINDING_2D: 32873,
			SAMPLE_BUFFERS: 32936,
			SAMPLES: 32937,
			SAMPLE_COVERAGE_VALUE: 32938,
			SAMPLE_COVERAGE_INVERT: 32939,
			COMPRESSED_TEXTURE_FORMATS: 34467,
			DONT_CARE: 4352,
			FASTEST: 4353,
			NICEST: 4354,
			GENERATE_MIPMAP_HINT: 33170,
			BYTE: 5120,
			UNSIGNED_BYTE: 5121,
			SHORT: 5122,
			UNSIGNED_SHORT: 5123,
			INT: 5124,
			UNSIGNED_INT: 5125,
			FLOAT: 5126,
			DEPTH_COMPONENT: 6402,
			ALPHA: 6406,
			RGB: 6407,
			RGBA: 6408,
			LUMINANCE: 6409,
			LUMINANCE_ALPHA: 6410,
			UNSIGNED_SHORT_4_4_4_4: 32819,
			UNSIGNED_SHORT_5_5_5_1: 32820,
			UNSIGNED_SHORT_5_6_5: 33635,
			FRAGMENT_SHADER: 35632,
			VERTEX_SHADER: 35633,
			MAX_VERTEX_ATTRIBS: 34921,
			MAX_VERTEX_UNIFORM_VECTORS: 36347,
			MAX_VARYING_VECTORS: 36348,
			MAX_COMBINED_TEXTURE_IMAGE_UNITS: 35661,
			MAX_VERTEX_TEXTURE_IMAGE_UNITS: 35660,
			MAX_TEXTURE_IMAGE_UNITS: 34930,
			MAX_FRAGMENT_UNIFORM_VECTORS: 36349,
			SHADER_TYPE: 35663,
			DELETE_STATUS: 35712,
			LINK_STATUS: 35714,
			VALIDATE_STATUS: 35715,
			ATTACHED_SHADERS: 35717,
			ACTIVE_UNIFORMS: 35718,
			ACTIVE_ATTRIBUTES: 35721,
			SHADING_LANGUAGE_VERSION: 35724,
			CURRENT_PROGRAM: 35725,
			NEVER: 512,
			LESS: 513,
			EQUAL: 514,
			LEQUAL: 515,
			GREATER: 516,
			NOTEQUAL: 517,
			GEQUAL: 518,
			ALWAYS: 519,
			KEEP: 7680,
			REPLACE: 7681,
			INCR: 7682,
			DECR: 7683,
			INVERT: 5386,
			INCR_WRAP: 34055,
			DECR_WRAP: 34056,
			VENDOR: 7936,
			RENDERER: 7937,
			VERSION: 7938,
			NEAREST: 9728,
			LINEAR: 9729,
			NEAREST_MIPMAP_NEAREST: 9984,
			LINEAR_MIPMAP_NEAREST: 9985,
			NEAREST_MIPMAP_LINEAR: 9986,
			LINEAR_MIPMAP_LINEAR: 9987,
			TEXTURE_MAG_FILTER: 10240,
			TEXTURE_MIN_FILTER: 10241,
			TEXTURE_WRAP_S: 10242,
			TEXTURE_WRAP_T: 10243,
			TEXTURE_2D: 3553,
			TEXTURE: 5890,
			TEXTURE_CUBE_MAP: 34067,
			TEXTURE_BINDING_CUBE_MAP: 34068,
			TEXTURE_CUBE_MAP_POSITIVE_X: 34069,
			TEXTURE_CUBE_MAP_NEGATIVE_X: 34070,
			TEXTURE_CUBE_MAP_POSITIVE_Y: 34071,
			TEXTURE_CUBE_MAP_NEGATIVE_Y: 34072,
			TEXTURE_CUBE_MAP_POSITIVE_Z: 34073,
			TEXTURE_CUBE_MAP_NEGATIVE_Z: 34074,
			MAX_CUBE_MAP_TEXTURE_SIZE: 34076,
			TEXTURE0: 33984,
			TEXTURE1: 33985,
			TEXTURE2: 33986,
			TEXTURE3: 33987,
			TEXTURE4: 33988,
			TEXTURE5: 33989,
			TEXTURE6: 33990,
			TEXTURE7: 33991,
			TEXTURE8: 33992,
			TEXTURE9: 33993,
			TEXTURE10: 33994,
			TEXTURE11: 33995,
			TEXTURE12: 33996,
			TEXTURE13: 33997,
			TEXTURE14: 33998,
			TEXTURE15: 33999,
			TEXTURE16: 34e3,
			TEXTURE17: 34001,
			TEXTURE18: 34002,
			TEXTURE19: 34003,
			TEXTURE20: 34004,
			TEXTURE21: 34005,
			TEXTURE22: 34006,
			TEXTURE23: 34007,
			TEXTURE24: 34008,
			TEXTURE25: 34009,
			TEXTURE26: 34010,
			TEXTURE27: 34011,
			TEXTURE28: 34012,
			TEXTURE29: 34013,
			TEXTURE30: 34014,
			TEXTURE31: 34015,
			ACTIVE_TEXTURE: 34016,
			REPEAT: 10497,
			CLAMP_TO_EDGE: 33071,
			MIRRORED_REPEAT: 33648,
			FLOAT_VEC2: 35664,
			FLOAT_VEC3: 35665,
			FLOAT_VEC4: 35666,
			INT_VEC2: 35667,
			INT_VEC3: 35668,
			INT_VEC4: 35669,
			BOOL: 35670,
			BOOL_VEC2: 35671,
			BOOL_VEC3: 35672,
			BOOL_VEC4: 35673,
			FLOAT_MAT2: 35674,
			FLOAT_MAT3: 35675,
			FLOAT_MAT4: 35676,
			SAMPLER_2D: 35678,
			SAMPLER_CUBE: 35680,
			VERTEX_ATTRIB_ARRAY_ENABLED: 34338,
			VERTEX_ATTRIB_ARRAY_SIZE: 34339,
			VERTEX_ATTRIB_ARRAY_STRIDE: 34340,
			VERTEX_ATTRIB_ARRAY_TYPE: 34341,
			VERTEX_ATTRIB_ARRAY_NORMALIZED: 34922,
			VERTEX_ATTRIB_ARRAY_POINTER: 34373,
			VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 34975,
			IMPLEMENTATION_COLOR_READ_TYPE: 35738,
			IMPLEMENTATION_COLOR_READ_FORMAT: 35739,
			COMPILE_STATUS: 35713,
			LOW_FLOAT: 36336,
			MEDIUM_FLOAT: 36337,
			HIGH_FLOAT: 36338,
			LOW_INT: 36339,
			MEDIUM_INT: 36340,
			HIGH_INT: 36341,
			FRAMEBUFFER: 36160,
			RENDERBUFFER: 36161,
			RGBA4: 32854,
			RGB5_A1: 32855,
			RGB565: 36194,
			DEPTH_COMPONENT16: 33189,
			STENCIL_INDEX: 6401,
			STENCIL_INDEX8: 36168,
			DEPTH_STENCIL: 34041,
			RENDERBUFFER_WIDTH: 36162,
			RENDERBUFFER_HEIGHT: 36163,
			RENDERBUFFER_INTERNAL_FORMAT: 36164,
			RENDERBUFFER_RED_SIZE: 36176,
			RENDERBUFFER_GREEN_SIZE: 36177,
			RENDERBUFFER_BLUE_SIZE: 36178,
			RENDERBUFFER_ALPHA_SIZE: 36179,
			RENDERBUFFER_DEPTH_SIZE: 36180,
			RENDERBUFFER_STENCIL_SIZE: 36181,
			FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 36048,
			FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 36049,
			FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 36050,
			FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 36051,
			COLOR_ATTACHMENT0: 36064,
			DEPTH_ATTACHMENT: 36096,
			STENCIL_ATTACHMENT: 36128,
			DEPTH_STENCIL_ATTACHMENT: 33306,
			NONE: 0,
			FRAMEBUFFER_COMPLETE: 36053,
			FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 36054,
			FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 36055,
			FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 36057,
			FRAMEBUFFER_UNSUPPORTED: 36061,
			FRAMEBUFFER_BINDING: 36006,
			RENDERBUFFER_BINDING: 36007,
			MAX_RENDERBUFFER_SIZE: 34024,
			INVALID_FRAMEBUFFER_OPERATION: 1286,
			UNPACK_FLIP_Y_WEBGL: 37440,
			UNPACK_PREMULTIPLY_ALPHA_WEBGL: 37441,
			CONTEXT_LOST_WEBGL: 37442,
			UNPACK_COLORSPACE_CONVERSION_WEBGL: 37443,
			BROWSER_DEFAULT_WEBGL: 37444,
			COMPRESSED_RGB_S3TC_DXT1_EXT: 33776,
			COMPRESSED_RGBA_S3TC_DXT1_EXT: 33777,
			COMPRESSED_RGBA_S3TC_DXT3_EXT: 33778,
			COMPRESSED_RGBA_S3TC_DXT5_EXT: 33779,
			COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 35840,
			COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 35841,
			COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 35842,
			COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 35843,
			COMPRESSED_RGB_ETC1_WEBGL: 36196,
			DOUBLE: 5130,
			READ_BUFFER: 3074,
			UNPACK_ROW_LENGTH: 3314,
			UNPACK_SKIP_ROWS: 3315,
			UNPACK_SKIP_PIXELS: 3316,
			PACK_ROW_LENGTH: 3330,
			PACK_SKIP_ROWS: 3331,
			PACK_SKIP_PIXELS: 3332,
			COLOR: 6144,
			DEPTH: 6145,
			STENCIL: 6146,
			RED: 6403,
			RGB8: 32849,
			RGBA8: 32856,
			RGB10_A2: 32857,
			TEXTURE_BINDING_3D: 32874,
			UNPACK_SKIP_IMAGES: 32877,
			UNPACK_IMAGE_HEIGHT: 32878,
			TEXTURE_3D: 32879,
			TEXTURE_WRAP_R: 32882,
			MAX_3D_TEXTURE_SIZE: 32883,
			UNSIGNED_INT_2_10_10_10_REV: 33640,
			MAX_ELEMENTS_VERTICES: 33e3,
			MAX_ELEMENTS_INDICES: 33001,
			TEXTURE_MIN_LOD: 33082,
			TEXTURE_MAX_LOD: 33083,
			TEXTURE_BASE_LEVEL: 33084,
			TEXTURE_MAX_LEVEL: 33085,
			MIN: 32775,
			MAX: 32776,
			DEPTH_COMPONENT24: 33190,
			MAX_TEXTURE_LOD_BIAS: 34045,
			TEXTURE_COMPARE_MODE: 34892,
			TEXTURE_COMPARE_FUNC: 34893,
			CURRENT_QUERY: 34917,
			QUERY_RESULT: 34918,
			QUERY_RESULT_AVAILABLE: 34919,
			STREAM_READ: 35041,
			STREAM_COPY: 35042,
			STATIC_READ: 35045,
			STATIC_COPY: 35046,
			DYNAMIC_READ: 35049,
			DYNAMIC_COPY: 35050,
			MAX_DRAW_BUFFERS: 34852,
			DRAW_BUFFER0: 34853,
			DRAW_BUFFER1: 34854,
			DRAW_BUFFER2: 34855,
			DRAW_BUFFER3: 34856,
			DRAW_BUFFER4: 34857,
			DRAW_BUFFER5: 34858,
			DRAW_BUFFER6: 34859,
			DRAW_BUFFER7: 34860,
			DRAW_BUFFER8: 34861,
			DRAW_BUFFER9: 34862,
			DRAW_BUFFER10: 34863,
			DRAW_BUFFER11: 34864,
			DRAW_BUFFER12: 34865,
			DRAW_BUFFER13: 34866,
			DRAW_BUFFER14: 34867,
			DRAW_BUFFER15: 34868,
			MAX_FRAGMENT_UNIFORM_COMPONENTS: 35657,
			MAX_VERTEX_UNIFORM_COMPONENTS: 35658,
			SAMPLER_3D: 35679,
			SAMPLER_2D_SHADOW: 35682,
			FRAGMENT_SHADER_DERIVATIVE_HINT: 35723,
			PIXEL_PACK_BUFFER: 35051,
			PIXEL_UNPACK_BUFFER: 35052,
			PIXEL_PACK_BUFFER_BINDING: 35053,
			PIXEL_UNPACK_BUFFER_BINDING: 35055,
			FLOAT_MAT2x3: 35685,
			FLOAT_MAT2x4: 35686,
			FLOAT_MAT3x2: 35687,
			FLOAT_MAT3x4: 35688,
			FLOAT_MAT4x2: 35689,
			FLOAT_MAT4x3: 35690,
			SRGB: 35904,
			SRGB8: 35905,
			SRGB8_ALPHA8: 35907,
			COMPARE_REF_TO_TEXTURE: 34894,
			RGBA32F: 34836,
			RGB32F: 34837,
			RGBA16F: 34842,
			RGB16F: 34843,
			VERTEX_ATTRIB_ARRAY_INTEGER: 35069,
			MAX_ARRAY_TEXTURE_LAYERS: 35071,
			MIN_PROGRAM_TEXEL_OFFSET: 35076,
			MAX_PROGRAM_TEXEL_OFFSET: 35077,
			MAX_VARYING_COMPONENTS: 35659,
			TEXTURE_2D_ARRAY: 35866,
			TEXTURE_BINDING_2D_ARRAY: 35869,
			R11F_G11F_B10F: 35898,
			UNSIGNED_INT_10F_11F_11F_REV: 35899,
			RGB9_E5: 35901,
			UNSIGNED_INT_5_9_9_9_REV: 35902,
			TRANSFORM_FEEDBACK_BUFFER_MODE: 35967,
			MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 35968,
			TRANSFORM_FEEDBACK_VARYINGS: 35971,
			TRANSFORM_FEEDBACK_BUFFER_START: 35972,
			TRANSFORM_FEEDBACK_BUFFER_SIZE: 35973,
			TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 35976,
			RASTERIZER_DISCARD: 35977,
			MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 35978,
			MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 35979,
			INTERLEAVED_ATTRIBS: 35980,
			SEPARATE_ATTRIBS: 35981,
			TRANSFORM_FEEDBACK_BUFFER: 35982,
			TRANSFORM_FEEDBACK_BUFFER_BINDING: 35983,
			RGBA32UI: 36208,
			RGB32UI: 36209,
			RGBA16UI: 36214,
			RGB16UI: 36215,
			RGBA8UI: 36220,
			RGB8UI: 36221,
			RGBA32I: 36226,
			RGB32I: 36227,
			RGBA16I: 36232,
			RGB16I: 36233,
			RGBA8I: 36238,
			RGB8I: 36239,
			RED_INTEGER: 36244,
			RGB_INTEGER: 36248,
			RGBA_INTEGER: 36249,
			SAMPLER_2D_ARRAY: 36289,
			SAMPLER_2D_ARRAY_SHADOW: 36292,
			SAMPLER_CUBE_SHADOW: 36293,
			UNSIGNED_INT_VEC2: 36294,
			UNSIGNED_INT_VEC3: 36295,
			UNSIGNED_INT_VEC4: 36296,
			INT_SAMPLER_2D: 36298,
			INT_SAMPLER_3D: 36299,
			INT_SAMPLER_CUBE: 36300,
			INT_SAMPLER_2D_ARRAY: 36303,
			UNSIGNED_INT_SAMPLER_2D: 36306,
			UNSIGNED_INT_SAMPLER_3D: 36307,
			UNSIGNED_INT_SAMPLER_CUBE: 36308,
			UNSIGNED_INT_SAMPLER_2D_ARRAY: 36311,
			DEPTH_COMPONENT32F: 36012,
			DEPTH32F_STENCIL8: 36013,
			FLOAT_32_UNSIGNED_INT_24_8_REV: 36269,
			FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 33296,
			FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 33297,
			FRAMEBUFFER_ATTACHMENT_RED_SIZE: 33298,
			FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 33299,
			FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 33300,
			FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 33301,
			FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 33302,
			FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 33303,
			FRAMEBUFFER_DEFAULT: 33304,
			UNSIGNED_INT_24_8: 34042,
			DEPTH24_STENCIL8: 35056,
			UNSIGNED_NORMALIZED: 35863,
			DRAW_FRAMEBUFFER_BINDING: 36006,
			READ_FRAMEBUFFER: 36008,
			DRAW_FRAMEBUFFER: 36009,
			READ_FRAMEBUFFER_BINDING: 36010,
			RENDERBUFFER_SAMPLES: 36011,
			FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 36052,
			MAX_COLOR_ATTACHMENTS: 36063,
			COLOR_ATTACHMENT1: 36065,
			COLOR_ATTACHMENT2: 36066,
			COLOR_ATTACHMENT3: 36067,
			COLOR_ATTACHMENT4: 36068,
			COLOR_ATTACHMENT5: 36069,
			COLOR_ATTACHMENT6: 36070,
			COLOR_ATTACHMENT7: 36071,
			COLOR_ATTACHMENT8: 36072,
			COLOR_ATTACHMENT9: 36073,
			COLOR_ATTACHMENT10: 36074,
			COLOR_ATTACHMENT11: 36075,
			COLOR_ATTACHMENT12: 36076,
			COLOR_ATTACHMENT13: 36077,
			COLOR_ATTACHMENT14: 36078,
			COLOR_ATTACHMENT15: 36079,
			FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 36182,
			MAX_SAMPLES: 36183,
			HALF_FLOAT: 5131,
			RG: 33319,
			RG_INTEGER: 33320,
			R8: 33321,
			RG8: 33323,
			R16F: 33325,
			R32F: 33326,
			RG16F: 33327,
			RG32F: 33328,
			R8I: 33329,
			R8UI: 33330,
			R16I: 33331,
			R16UI: 33332,
			R32I: 33333,
			R32UI: 33334,
			RG8I: 33335,
			RG8UI: 33336,
			RG16I: 33337,
			RG16UI: 33338,
			RG32I: 33339,
			RG32UI: 33340,
			VERTEX_ARRAY_BINDING: 34229,
			R8_SNORM: 36756,
			RG8_SNORM: 36757,
			RGB8_SNORM: 36758,
			RGBA8_SNORM: 36759,
			SIGNED_NORMALIZED: 36764,
			COPY_READ_BUFFER: 36662,
			COPY_WRITE_BUFFER: 36663,
			COPY_READ_BUFFER_BINDING: 36662,
			COPY_WRITE_BUFFER_BINDING: 36663,
			UNIFORM_BUFFER: 35345,
			UNIFORM_BUFFER_BINDING: 35368,
			UNIFORM_BUFFER_START: 35369,
			UNIFORM_BUFFER_SIZE: 35370,
			MAX_VERTEX_UNIFORM_BLOCKS: 35371,
			MAX_FRAGMENT_UNIFORM_BLOCKS: 35373,
			MAX_COMBINED_UNIFORM_BLOCKS: 35374,
			MAX_UNIFORM_BUFFER_BINDINGS: 35375,
			MAX_UNIFORM_BLOCK_SIZE: 35376,
			MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 35377,
			MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 35379,
			UNIFORM_BUFFER_OFFSET_ALIGNMENT: 35380,
			ACTIVE_UNIFORM_BLOCKS: 35382,
			UNIFORM_TYPE: 35383,
			UNIFORM_SIZE: 35384,
			UNIFORM_BLOCK_INDEX: 35386,
			UNIFORM_OFFSET: 35387,
			UNIFORM_ARRAY_STRIDE: 35388,
			UNIFORM_MATRIX_STRIDE: 35389,
			UNIFORM_IS_ROW_MAJOR: 35390,
			UNIFORM_BLOCK_BINDING: 35391,
			UNIFORM_BLOCK_DATA_SIZE: 35392,
			UNIFORM_BLOCK_ACTIVE_UNIFORMS: 35394,
			UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 35395,
			UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 35396,
			UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 35398,
			INVALID_INDEX: 4294967295,
			MAX_VERTEX_OUTPUT_COMPONENTS: 37154,
			MAX_FRAGMENT_INPUT_COMPONENTS: 37157,
			MAX_SERVER_WAIT_TIMEOUT: 37137,
			OBJECT_TYPE: 37138,
			SYNC_CONDITION: 37139,
			SYNC_STATUS: 37140,
			SYNC_FLAGS: 37141,
			SYNC_FENCE: 37142,
			SYNC_GPU_COMMANDS_COMPLETE: 37143,
			UNSIGNALED: 37144,
			SIGNALED: 37145,
			ALREADY_SIGNALED: 37146,
			TIMEOUT_EXPIRED: 37147,
			CONDITION_SATISFIED: 37148,
			WAIT_FAILED: 37149,
			SYNC_FLUSH_COMMANDS_BIT: 1,
			VERTEX_ATTRIB_ARRAY_DIVISOR: 35070,
			ANY_SAMPLES_PASSED: 35887,
			ANY_SAMPLES_PASSED_CONSERVATIVE: 36202,
			SAMPLER_BINDING: 35097,
			RGB10_A2UI: 36975,
			INT_2_10_10_10_REV: 36255,
			TRANSFORM_FEEDBACK: 36386,
			TRANSFORM_FEEDBACK_PAUSED: 36387,
			TRANSFORM_FEEDBACK_ACTIVE: 36388,
			TRANSFORM_FEEDBACK_BINDING: 36389,
			COMPRESSED_R11_EAC: 37488,
			COMPRESSED_SIGNED_R11_EAC: 37489,
			COMPRESSED_RG11_EAC: 37490,
			COMPRESSED_SIGNED_RG11_EAC: 37491,
			COMPRESSED_RGB8_ETC2: 37492,
			COMPRESSED_SRGB8_ETC2: 37493,
			COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37494,
			COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 37495,
			COMPRESSED_RGBA8_ETC2_EAC: 37496,
			COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 37497,
			TEXTURE_IMMUTABLE_FORMAT: 37167,
			MAX_ELEMENT_INDEX: 36203,
			TEXTURE_IMMUTABLE_LEVELS: 33503,
			MAX_TEXTURE_MAX_ANISOTROPY_EXT: 34047
		};
		return e(t)
	}), define("Core/ComponentDatatype", ["./defaultValue", "./defined", "./DeveloperError", "./FeatureDetection", "./freezeObject", "./WebGLConstants"], function(e, t, r, n, i, o) {
		"use strict";
		if(!n.supportsTypedArrays()) return {};
		var a = {
			BYTE: o.BYTE,
			UNSIGNED_BYTE: o.UNSIGNED_BYTE,
			SHORT: o.SHORT,
			UNSIGNED_SHORT: o.UNSIGNED_SHORT,
			INT: o.INT,
			UNSIGNED_INT: o.UNSIGNED_INT,
			FLOAT: o.FLOAT,
			DOUBLE: o.DOUBLE
		};
		return a.getSizeInBytes = function(e) {
			if(!t(e)) throw new r("value is required.");
			switch(e) {
				case a.BYTE:
					return Int8Array.BYTES_PER_ELEMENT;
				case a.UNSIGNED_BYTE:
					return Uint8Array.BYTES_PER_ELEMENT;
				case a.SHORT:
					return Int16Array.BYTES_PER_ELEMENT;
				case a.UNSIGNED_SHORT:
					return Uint16Array.BYTES_PER_ELEMENT;
				case a.INT:
					return Int32Array.BYTES_PER_ELEMENT;
				case a.UNSIGNED_INT:
					return Uint32Array.BYTES_PER_ELEMENT;
				case a.FLOAT:
					return Float32Array.BYTES_PER_ELEMENT;
				case a.DOUBLE:
					return Float64Array.BYTES_PER_ELEMENT;
				default:
					throw new r("componentDatatype is not a valid value.")
			}
		}, a.fromTypedArray = function(e) {
			return e instanceof Int8Array ? a.BYTE : e instanceof Uint8Array ? a.UNSIGNED_BYTE : e instanceof Int16Array ? a.SHORT : e instanceof Uint16Array ? a.UNSIGNED_SHORT : e instanceof Int32Array ? a.INT : e instanceof Uint32Array ? a.UNSIGNED_INT : e instanceof Float32Array ? a.FLOAT : e instanceof Float64Array ? a.DOUBLE : void 0
		}, a.validate = function(e) {
			return t(e) && (e === a.BYTE || e === a.UNSIGNED_BYTE || e === a.SHORT || e === a.UNSIGNED_SHORT || e === a.INT || e === a.UNSIGNED_INT || e === a.FLOAT || e === a.DOUBLE)
		}, a.createTypedArray = function(e, n) {
			if(!t(e)) throw new r("componentDatatype is required.");
			if(!t(n)) throw new r("valuesOrLength is required.");
			switch(e) {
				case a.BYTE:
					return new Int8Array(n);
				case a.UNSIGNED_BYTE:
					return new Uint8Array(n);
				case a.SHORT:
					return new Int16Array(n);
				case a.UNSIGNED_SHORT:
					return new Uint16Array(n);
				case a.INT:
					return new Int32Array(n);
				case a.UNSIGNED_INT:
					return new Uint32Array(n);
				case a.FLOAT:
					return new Float32Array(n);
				case a.DOUBLE:
					return new Float64Array(n);
				default:
					throw new r("componentDatatype is not a valid value.")
			}
		}, a.createArrayBufferView = function(n, i, o, u) {
			if(!t(n)) throw new r("componentDatatype is required.");
			if(!t(i)) throw new r("buffer is required.");
			switch(o = e(o, 0), u = e(u, (i.byteLength - o) / a.getSizeInBytes(n)), n) {
				case a.BYTE:
					return new Int8Array(i, o, u);
				case a.UNSIGNED_BYTE:
					return new Uint8Array(i, o, u);
				case a.SHORT:
					return new Int16Array(i, o, u);
				case a.UNSIGNED_SHORT:
					return new Uint16Array(i, o, u);
				case a.INT:
					return new Int32Array(i, o, u);
				case a.UNSIGNED_INT:
					return new Uint32Array(i, o, u);
				case a.FLOAT:
					return new Float32Array(i, o, u);
				case a.DOUBLE:
					return new Float64Array(i, o, u);
				default:
					throw new r("componentDatatype is not a valid value.")
			}
		}, a.fromName = function(e) {
			switch(e) {
				case "BYTE":
					return a.BYTE;
				case "UNSIGNED_BYTE":
					return a.UNSIGNED_BYTE;
				case "SHORT":
					return a.SHORT;
				case "UNSIGNED_SHORT":
					return a.UNSIGNED_SHORT;
				case "INT":
					return a.INT;
				case "UNSIGNED_INT":
					return a.UNSIGNED_INT;
				case "FLOAT":
					return a.FLOAT;
				case "DOUBLE":
					return a.DOUBLE;
				default:
					throw new r("name is not a valid value.")
			}
		}, i(a)
	}), define("Core/GeometryType", ["./freezeObject"], function(e) {
		"use strict";
		var t = {
			NONE: 0,
			TRIANGLES: 1,
			LINES: 2,
			POLYLINES: 3
		};
		return e(t)
	}), define("Core/PrimitiveType", ["./freezeObject", "./WebGLConstants"], function(e, t) {
		"use strict";
		var r = {
			POINTS: t.POINTS,
			LINES: t.LINES,
			LINE_LOOP: t.LINE_LOOP,
			LINE_STRIP: t.LINE_STRIP,
			TRIANGLES: t.TRIANGLES,
			TRIANGLE_STRIP: t.TRIANGLE_STRIP,
			TRIANGLE_FAN: t.TRIANGLE_FAN,
			validate: function(e) {
				return e === r.POINTS || e === r.LINES || e === r.LINE_LOOP || e === r.LINE_STRIP || e === r.TRIANGLES || e === r.TRIANGLE_STRIP || e === r.TRIANGLE_FAN
			}
		};
		return e(r)
	}), define("Core/Geometry", ["./Check", "./defaultValue", "./defined", "./DeveloperError", "./GeometryType", "./PrimitiveType"], function(e, t, r, n, i, o) {
		"use strict";

		function a(r) {
			r = t(r, t.EMPTY_OBJECT), e.typeOf.object("options.attributes", r.attributes), this.attributes = r.attributes, this.indices = r.indices, this.primitiveType = t(r.primitiveType, o.TRIANGLES), this.boundingSphere = r.boundingSphere, this.geometryType = t(r.geometryType, i.NONE), this.boundingSphereCV = r.boundingSphereCV
		}
		return a.computeNumberOfVertices = function(t) {
			e.typeOf.object("geometry", t);
			var i = -1;
			for(var o in t.attributes)
				if(t.attributes.hasOwnProperty(o) && r(t.attributes[o]) && r(t.attributes[o].values)) {
					var a = t.attributes[o],
						u = a.values.length / a.componentsPerAttribute;
					if(i !== u && -1 !== i) throw new n("All attribute lists must have the same number of attributes.");
					i = u
				}
			return i
		}, a
	}), define("Core/GeometryAttribute", ["./defaultValue", "./defined", "./DeveloperError"], function(e, t, r) {
		"use strict";

		function n(n) {
			if(n = e(n, e.EMPTY_OBJECT), !t(n.componentDatatype)) throw new r("options.componentDatatype is required.");
			if(!t(n.componentsPerAttribute)) throw new r("options.componentsPerAttribute is required.");
			if(n.componentsPerAttribute < 1 || n.componentsPerAttribute > 4) throw new r("options.componentsPerAttribute must be between 1 and 4.");
			if(!t(n.values)) throw new r("options.values is required.");
			this.componentDatatype = n.componentDatatype, this.componentsPerAttribute = n.componentsPerAttribute, this.normalize = e(n.normalize, !1), this.values = n.values
		}
		return n
	}), define("Core/GeometryAttributes", ["./defaultValue"], function(e) {
		"use strict";

		function t(t) {
			t = e(t, e.EMPTY_OBJECT), this.position = t.position, this.normal = t.normal, this.st = t.st, this.bitangent = t.bitangent, this.tangent = t.tangent, this.color = t.color
		}
		return t
	}), define("Core/IndexDatatype", ["./defined", "./DeveloperError", "./freezeObject", "./Math", "./WebGLConstants"], function(e, t, r, n, i) {
		"use strict";
		var o = {
			UNSIGNED_BYTE: i.UNSIGNED_BYTE,
			UNSIGNED_SHORT: i.UNSIGNED_SHORT,
			UNSIGNED_INT: i.UNSIGNED_INT
		};
		return o.getSizeInBytes = function(e) {
			switch(e) {
				case o.UNSIGNED_BYTE:
					return Uint8Array.BYTES_PER_ELEMENT;
				case o.UNSIGNED_SHORT:
					return Uint16Array.BYTES_PER_ELEMENT;
				case o.UNSIGNED_INT:
					return Uint32Array.BYTES_PER_ELEMENT
			}
			throw new t("indexDatatype is required and must be a valid IndexDatatype constant.")
		}, o.validate = function(t) {
			return e(t) && (t === o.UNSIGNED_BYTE || t === o.UNSIGNED_SHORT || t === o.UNSIGNED_INT)
		}, o.createTypedArray = function(r, i) {
			if(!e(r)) throw new t("numberOfVertices is required.");
			return r >= n.SIXTY_FOUR_KILOBYTES ? new Uint32Array(i) : new Uint16Array(i)
		}, o.createTypedArrayFromArrayBuffer = function(r, i, o, a) {
			if(!e(r)) throw new t("numberOfVertices is required.");
			if(!e(i)) throw new t("sourceArray is required.");
			if(!e(o)) throw new t("byteOffset is required.");
			return r >= n.SIXTY_FOUR_KILOBYTES ? new Uint32Array(i, o, a) : new Uint16Array(i, o, a)
		}, r(o)
	}), define("Core/EllipsoidGeodesic", ["./Cartesian3", "./Cartographic", "./Check", "./defaultValue", "./defined", "./defineProperties", "./Ellipsoid", "./Math"], function(e, t, r, n, i, o, a, u) {
		"use strict";

		function s(e) {
			var t = e._uSquared,
				r = e._ellipsoid.maximumRadius,
				n = e._ellipsoid.minimumRadius,
				i = (r - n) / r,
				o = Math.cos(e._startHeading),
				a = Math.sin(e._startHeading),
				u = (1 - i) * Math.tan(e._start.latitude),
				s = 1 / Math.sqrt(1 + u * u),
				c = s * u,
				l = Math.atan2(u, o),
				f = s * a,
				E = f * f,
				h = 1 - E,
				d = Math.sqrt(h),
				p = t / 4,
				_ = p * p,
				O = _ * p,
				m = _ * _,
				R = 1 + p - 3 * _ / 4 + 5 * O / 4 - 175 * m / 64,
				T = 1 - p + 15 * _ / 8 - 35 * O / 8,
				y = 1 - 3 * p + 35 * _ / 4,
				A = 1 - 5 * p,
				S = R * l - T * Math.sin(2 * l) * p / 2 - y * Math.sin(4 * l) * _ / 16 - A * Math.sin(6 * l) * O / 48 - 5 * Math.sin(8 * l) * m / 512,
				N = e._constants;
			N.a = r, N.b = n, N.f = i, N.cosineHeading = o, N.sineHeading = a, N.tanU = u, N.cosineU = s, N.sineU = c, N.sigma = l, N.sineAlpha = f, N.sineSquaredAlpha = E, N.cosineSquaredAlpha = h, N.cosineAlpha = d, N.u2Over4 = p, N.u4Over16 = _, N.u6Over64 = O, N.u8Over256 = m, N.a0 = R, N.a1 = T, N.a2 = y, N.a3 = A, N.distanceRatio = S
		}

		function c(e, t) {
			return e * t * (4 + e * (4 - 3 * t)) / 16
		}

		function l(e, t, r, n, i, o, a) {
			var u = c(e, r);
			return(1 - u) * e * t * (n + u * i * (a + u * o * (2 * a * a - 1)))
		}

		function f(e, t, r, n, i, o, a) {
			var s, c, f, E, h, d = (t - r) / t,
				p = o - n,
				_ = Math.atan((1 - d) * Math.tan(i)),
				O = Math.atan((1 - d) * Math.tan(a)),
				m = Math.cos(_),
				R = Math.sin(_),
				T = Math.cos(O),
				y = Math.sin(O),
				A = m * T,
				S = m * y,
				N = R * y,
				C = R * T,
				g = p,
				I = u.TWO_PI,
				b = Math.cos(g),
				M = Math.sin(g);
			do {
				b = Math.cos(g), M = Math.sin(g);
				var w = S - C * b;
				f = Math.sqrt(T * T * M * M + w * w), c = N + A * b, s = Math.atan2(f, c);
				var v;
				0 === f ? (v = 0, E = 1) : (v = A * M / f, E = 1 - v * v), I = g, h = c - 2 * N / E, isNaN(h) && (h = 0), g = p + l(d, v, E, s, f, c, h)
			} while (Math.abs(g - I) > u.EPSILON12);
			var F = E * (t * t - r * r) / (r * r),
				L = 1 + F * (4096 + F * (F * (320 - 175 * F) - 768)) / 16384,
				P = F * (256 + F * (F * (74 - 47 * F) - 128)) / 1024,
				D = h * h,
				U = P * f * (h + P * (c * (2 * D - 1) - P * h * (4 * f * f - 3) * (4 * D - 3) / 6) / 4),
				B = r * L * (s - U),
				x = Math.atan2(T * M, S - C * b),
				G = Math.atan2(m * M, S * b - C);
			e._distance = B, e._startHeading = x, e._endHeading = G, e._uSquared = F
		}

		function E(n, i, o, a) {
			var u = e.normalize(a.cartographicToCartesian(i, p), d),
				c = e.normalize(a.cartographicToCartesian(o, p), p);
			r.typeOf.number.greaterThanOrEquals("value", Math.abs(Math.abs(e.angleBetween(u, c)) - Math.PI), .0125), f(n, a.maximumRadius, a.minimumRadius, i.longitude, i.latitude, o.longitude, o.latitude), n._start = t.clone(i, n._start), n._end = t.clone(o, n._end), n._start.height = 0, n._end.height = 0, s(n)
		}

		function h(e, r, o) {
			var u = n(o, a.WGS84);
			this._ellipsoid = u, this._start = new t, this._end = new t, this._constants = {}, this._startHeading = void 0, this._endHeading = void 0, this._distance = void 0, this._uSquared = void 0, i(e) && i(r) && E(this, e, r, u)
		}
		var d = new e,
			p = new e;
		return o(h.prototype, {
			ellipsoid: {
				get: function() {
					return this._ellipsoid
				}
			},
			surfaceDistance: {
				get: function() {
					return r.defined("distance", this._distance), this._distance
				}
			},
			start: {
				get: function() {
					return this._start
				}
			},
			end: {
				get: function() {
					return this._end
				}
			},
			startHeading: {
				get: function() {
					return r.defined("distance", this._distance), this._startHeading
				}
			},
			endHeading: {
				get: function() {
					return r.defined("distance", this._distance), this._endHeading
				}
			}
		}), h.prototype.setEndPoints = function(e, t) {
			r.defined("start", e), r.defined("end", t), E(this, e, t, this._ellipsoid)
		}, h.prototype.interpolateUsingFraction = function(e, t) {
			return this.interpolateUsingSurfaceDistance(this._distance * e, t)
		}, h.prototype.interpolateUsingSurfaceDistance = function(e, n) {
			r.defined("distance", this._distance);
			var o = this._constants,
				a = o.distanceRatio + e / o.b,
				u = Math.cos(2 * a),
				s = Math.cos(4 * a),
				c = Math.cos(6 * a),
				f = Math.sin(2 * a),
				E = Math.sin(4 * a),
				h = Math.sin(6 * a),
				d = Math.sin(8 * a),
				p = a * a,
				_ = a * p,
				O = o.u8Over256,
				m = o.u2Over4,
				R = o.u6Over64,
				T = o.u4Over16,
				y = 2 * _ * O * u / 3 + a * (1 - m + 7 * T / 4 - 15 * R / 4 + 579 * O / 64 - (T - 15 * R / 4 + 187 * O / 16) * u - (5 * R / 4 - 115 * O / 16) * s - 29 * O * c / 16) + (m / 2 - T + 71 * R / 32 - 85 * O / 16) * f + (5 * T / 16 - 5 * R / 4 + 383 * O / 96) * E - p * ((R - 11 * O / 2) * f + 5 * O * E / 2) + (29 * R / 96 - 29 * O / 16) * h + 539 * O * d / 1536,
				A = Math.asin(Math.sin(y) * o.cosineAlpha),
				S = Math.atan(o.a / o.b * Math.tan(A));
			y -= o.sigma;
			var N = Math.cos(2 * o.sigma + y),
				C = Math.sin(y),
				g = Math.cos(y),
				I = o.cosineU * g,
				b = o.sineU * C,
				M = Math.atan2(C * o.sineHeading, I - b * o.cosineHeading),
				w = M - l(o.f, o.sineAlpha, o.cosineSquaredAlpha, y, C, g, N);
			return i(n) ? (n.longitude = this._start.longitude + w, n.latitude = S, n.height = 0, n) : new t(this._start.longitude + w, S, 0)
		}, h
	}), define("Core/QuadraticRealPolynomial", ["./DeveloperError", "./Math"], function(e, t) {
		"use strict";

		function r(e, r, n) {
			var i = e + r;
			return t.sign(e) !== t.sign(r) && Math.abs(i / Math.max(Math.abs(e), Math.abs(r))) < n ? 0 : i
		}
		var n = {};
		return n.computeDiscriminant = function(t, r, n) {
			if("number" != typeof t) throw new e("a is a required number.");
			if("number" != typeof r) throw new e("b is a required number.");
			if("number" != typeof n) throw new e("c is a required number.");
			var i = r * r - 4 * t * n;
			return i
		}, n.computeRealRoots = function(n, i, o) {
			if("number" != typeof n) throw new e("a is a required number.");
			if("number" != typeof i) throw new e("b is a required number.");
			if("number" != typeof o) throw new e("c is a required number.");
			var a;
			if(0 === n) return 0 === i ? [] : [-o / i];
			if(0 === i) {
				if(0 === o) return [0, 0];
				var u = Math.abs(o),
					s = Math.abs(n);
				if(s > u && u / s < t.EPSILON14) return [0, 0];
				if(u > s && s / u < t.EPSILON14) return [];
				if(a = -o / n, 0 > a) return [];
				var c = Math.sqrt(a);
				return [-c, c]
			}
			if(0 === o) return a = -i / n, 0 > a ? [a, 0] : [0, a];
			var l = i * i,
				f = 4 * n * o,
				E = r(l, -f, t.EPSILON14);
			if(0 > E) return [];
			var h = -.5 * r(i, t.sign(i) * Math.sqrt(E), t.EPSILON14);
			return i > 0 ? [h / n, o / h] : [o / h, h / n]
		}, n
	}), define("Core/CubicRealPolynomial", ["./DeveloperError", "./QuadraticRealPolynomial"], function(e, t) {
		"use strict";

		function r(e, t, r, n) {
			var i, o, a = e,
				u = t / 3,
				s = r / 3,
				c = n,
				l = a * s,
				f = u * c,
				E = u * u,
				h = s * s,
				d = a * s - E,
				p = a * c - u * s,
				_ = u * c - h,
				O = 4 * d * _ - p * p;
			if(0 > O) {
				var m, R, T;
				E * f >= l * h ? (m = a, R = d, T = -2 * u * d + a * p) : (m = c, R = _, T = -c * p + 2 * s * _);
				var y = 0 > T ? -1 : 1,
					A = -y * Math.abs(m) * Math.sqrt(-O);
				o = -T + A;
				var S = o / 2,
					N = 0 > S ? -Math.pow(-S, 1 / 3) : Math.pow(S, 1 / 3),
					C = o === A ? -N : -R / N;
				return i = 0 >= R ? N + C : -T / (N * N + C * C + R), E * f >= l * h ? [(i - u) / a] : [-c / (i + s)]
			}
			var g = d,
				I = -2 * u * d + a * p,
				b = _,
				M = -c * p + 2 * s * _,
				w = Math.sqrt(O),
				v = Math.sqrt(3) / 2,
				F = Math.abs(Math.atan2(a * w, -I) / 3);
			i = 2 * Math.sqrt(-g);
			var L = Math.cos(F);
			o = i * L;
			var P = i * (-L / 2 - v * Math.sin(F)),
				D = o + P > 2 * u ? o - u : P - u,
				U = a,
				B = D / U;
			F = Math.abs(Math.atan2(c * w, -M) / 3), i = 2 * Math.sqrt(-b), L = Math.cos(F), o = i * L, P = i * (-L / 2 - v * Math.sin(F));
			var x = -c,
				G = 2 * s > o + P ? o + s : P + s,
				q = x / G,
				j = U * G,
				z = -D * G - U * x,
				V = D * x,
				H = (s * z - u * V) / (-u * z + s * j);
			return H >= B ? q >= B ? q >= H ? [B, H, q] : [B, q, H] : [q, B, H] : q >= B ? [H, B, q] : q >= H ? [H, q, B] : [q, H, B]
		}
		var n = {};
		return n.computeDiscriminant = function(t, r, n, i) {
			if("number" != typeof t) throw new e("a is a required number.");
			if("number" != typeof r) throw new e("b is a required number.");
			if("number" != typeof n) throw new e("c is a required number.");
			if("number" != typeof i) throw new e("d is a required number.");
			var o = t * t,
				a = r * r,
				u = n * n,
				s = i * i,
				c = 18 * t * r * n * i + a * u - 27 * o * s - 4 * (t * u * n + a * r * i);
			return c
		}, n.computeRealRoots = function(n, i, o, a) {
			if("number" != typeof n) throw new e("a is a required number.");
			if("number" != typeof i) throw new e("b is a required number.");
			if("number" != typeof o) throw new e("c is a required number.");
			if("number" != typeof a) throw new e("d is a required number.");
			var u, s;
			if(0 === n) return t.computeRealRoots(i, o, a);
			if(0 === i) {
				if(0 === o) {
					if(0 === a) return [0, 0, 0];
					s = -a / n;
					var c = 0 > s ? -Math.pow(-s, 1 / 3) : Math.pow(s, 1 / 3);
					return [c, c, c]
				}
				return 0 === a ? (u = t.computeRealRoots(n, 0, o), 0 === u.Length ? [0] : [u[0], 0, u[1]]) : r(n, 0, o, a)
			}
			return 0 === o ? 0 === a ? (s = -i / n, 0 > s ? [s, 0, 0] : [0, 0, s]) : r(n, i, 0, a) : 0 === a ? (u = t.computeRealRoots(n, i, o), 0 === u.length ? [0] : u[1] <= 0 ? [u[0], u[1], 0] : u[0] >= 0 ? [0, u[0], u[1]] : [u[0], 0, u[1]]) : r(n, i, o, a)
		}, n
	}), define("Core/QuarticRealPolynomial", ["./CubicRealPolynomial", "./DeveloperError", "./Math", "./QuadraticRealPolynomial"], function(e, t, r, n) {
		"use strict";

		function i(t, i, o, a) {
			var u = t * t,
				s = i - 3 * u / 8,
				c = o - i * t / 2 + u * t / 8,
				l = a - o * t / 4 + i * u / 16 - 3 * u * u / 256,
				f = e.computeRealRoots(1, 2 * s, s * s - 4 * l, -c * c);
			if(f.length > 0) {
				var E = -t / 4,
					h = f[f.length - 1];
				if(Math.abs(h) < r.EPSILON14) {
					var d = n.computeRealRoots(1, s, l);
					if(2 === d.length) {
						var p, _ = d[0],
							O = d[1];
						if(_ >= 0 && O >= 0) {
							var m = Math.sqrt(_),
								R = Math.sqrt(O);
							return [E - R, E - m, E + m, E + R]
						}
						if(_ >= 0 && 0 > O) return p = Math.sqrt(_), [E - p, E + p];
						if(0 > _ && O >= 0) return p = Math.sqrt(O), [E - p, E + p]
					}
					return []
				}
				if(h > 0) {
					var T = Math.sqrt(h),
						y = (s + h - c / T) / 2,
						A = (s + h + c / T) / 2,
						S = n.computeRealRoots(1, T, y),
						N = n.computeRealRoots(1, -T, A);
					return 0 !== S.length ? (S[0] += E, S[1] += E, 0 !== N.length ? (N[0] += E, N[1] += E, S[1] <= N[0] ? [S[0], S[1], N[0], N[1]] : N[1] <= S[0] ? [N[0], N[1], S[0], S[1]] : S[0] >= N[0] && S[1] <= N[1] ? [N[0], S[0], S[1], N[1]] : N[0] >= S[0] && N[1] <= S[1] ? [S[0], N[0], N[1], S[1]] : S[0] > N[0] && S[0] < N[1] ? [N[0], S[0], N[1], S[1]] : [S[0], N[0], S[1], N[1]]) : S) : 0 !== N.length ? (N[0] += E, N[1] += E, N) : []
				}
			}
			return []
		}

		function o(t, i, o, a) {
			var u = o * o,
				s = i * i,
				c = t * t,
				l = -2 * i,
				f = o * t + s - 4 * a,
				E = c * a - o * i * t + u,
				h = e.computeRealRoots(1, l, f, E);
			if(h.length > 0) {
				var d, p, _ = h[0],
					O = i - _,
					m = O * O,
					R = t / 2,
					T = O / 2,
					y = m - 4 * a,
					A = m + 4 * Math.abs(a),
					S = c - 4 * _,
					N = c + 4 * Math.abs(_);
				if(0 > _ || S * A > y * N) {
					var C = Math.sqrt(S);
					d = C / 2, p = 0 === C ? 0 : (t * T - o) / C
				} else {
					var g = Math.sqrt(y);
					d = 0 === g ? 0 : (t * T - o) / g, p = g / 2
				}
				var I, b;
				0 === R && 0 === d ? (I = 0, b = 0) : r.sign(R) === r.sign(d) ? (I = R + d, b = _ / I) : (b = R - d, I = _ / b);
				var M, w;
				0 === T && 0 === p ? (M = 0, w = 0) : r.sign(T) === r.sign(p) ? (M = T + p, w = a / M) : (w = T - p, M = a / w);
				var v = n.computeRealRoots(1, I, M),
					F = n.computeRealRoots(1, b, w);
				if(0 !== v.length) return 0 !== F.length ? v[1] <= F[0] ? [v[0], v[1], F[0], F[1]] : F[1] <= v[0] ? [F[0], F[1], v[0], v[1]] : v[0] >= F[0] && v[1] <= F[1] ? [F[0], v[0], v[1], F[1]] : F[0] >= v[0] && F[1] <= v[1] ? [v[0], F[0], F[1], v[1]] : v[0] > F[0] && v[0] < F[1] ? [F[0], v[0], F[1], v[1]] : [v[0], F[0], v[1], F[1]] : v;
				if(0 !== F.length) return F
			}
			return []
		}
		var a = {};
		return a.computeDiscriminant = function(e, r, n, i, o) {
			if("number" != typeof e) throw new t("a is a required number.");
			if("number" != typeof r) throw new t("b is a required number.");
			if("number" != typeof n) throw new t("c is a required number.");
			if("number" != typeof i) throw new t("d is a required number.");
			if("number" != typeof o) throw new t("e is a required number.");
			var a = e * e,
				u = a * e,
				s = r * r,
				c = s * r,
				l = n * n,
				f = l * n,
				E = i * i,
				h = E * i,
				d = o * o,
				p = d * o,
				_ = s * l * E - 4 * c * h - 4 * e * f * E + 18 * e * r * n * h - 27 * a * E * E + 256 * u * p + o * (18 * c * n * i - 4 * s * f + 16 * e * l * l - 80 * e * r * l * i - 6 * e * s * E + 144 * a * n * E) + d * (144 * e * s * n - 27 * s * s - 128 * a * l - 192 * a * r * i);
			return _
		}, a.computeRealRoots = function(n, a, u, s, c) {
			if("number" != typeof n) throw new t("a is a required number.");
			if("number" != typeof a) throw new t("b is a required number.");
			if("number" != typeof u) throw new t("c is a required number.");
			if("number" != typeof s) throw new t("d is a required number.");
			if("number" != typeof c) throw new t("e is a required number.");
			if(Math.abs(n) < r.EPSILON15) return e.computeRealRoots(a, u, s, c);
			var l = a / n,
				f = u / n,
				E = s / n,
				h = c / n,
				d = 0 > l ? 1 : 0;
			switch(d += 0 > f ? d + 1 : d, d += 0 > E ? d + 1 : d, d += 0 > h ? d + 1 : d) {
				case 0:
					return i(l, f, E, h);
				case 1:
					return o(l, f, E, h);
				case 2:
					return o(l, f, E, h);
				case 3:
					return i(l, f, E, h);
				case 4:
					return i(l, f, E, h);
				case 5:
					return o(l, f, E, h);
				case 6:
					return i(l, f, E, h);
				case 7:
					return i(l, f, E, h);
				case 8:
					return o(l, f, E, h);
				case 9:
					return i(l, f, E, h);
				case 10:
					return i(l, f, E, h);
				case 11:
					return o(l, f, E, h);
				case 12:
					return i(l, f, E, h);
				case 13:
					return i(l, f, E, h);
				case 14:
					return i(l, f, E, h);
				case 15:
					return i(l, f, E, h);
				default:
					return
			}
		}, a
	}), define("Core/Ray", ["./Cartesian3", "./defaultValue", "./defined", "./DeveloperError"], function(e, t, r, n) {
		"use strict";

		function i(r, n) {
			n = e.clone(t(n, e.ZERO)), e.equals(n, e.ZERO) || e.normalize(n, n), this.origin = e.clone(t(r, e.ZERO)), this.direction = n
		}
		return i.getPoint = function(t, i, o) {
			if(!r(t)) throw new n("ray is requred");
			if("number" != typeof i) throw new n("t is a required number");
			return r(o) || (o = new e), o = e.multiplyByScalar(t.direction, i, o), e.add(t.origin, o, o)
		}, i
	}), define("Core/IntersectionTests", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Interval", "./Math", "./Matrix3", "./QuadraticRealPolynomial", "./QuarticRealPolynomial", "./Ray"], function(e, t, r, n, i, o, a, u, s, c, l) {
		"use strict";

		function f(e, t, r, n) {
			var i = t * t - 4 * e * r;
			if(!(0 > i)) {
				if(i > 0) {
					var o = 1 / (2 * e),
						a = Math.sqrt(i),
						u = (-t + a) * o,
						s = (-t - a) * o;
					return s > u ? (n.root0 = u, n.root1 = s) : (n.root0 = s, n.root1 = u), n
				}
				var c = -t / (2 * e);
				if(0 !== c) return n.root0 = n.root1 = c, n
			}
		}

		function E(t, r, i) {
			n(i) || (i = new o);
			var a = t.origin,
				u = t.direction,
				s = r.center,
				c = r.radius * r.radius,
				l = e.subtract(a, s, m),
				E = e.dot(u, u),
				h = 2 * e.dot(u, l),
				d = e.magnitudeSquared(l) - c,
				p = f(E, h, d, A);
			return n(p) ? (i.start = p.root0, i.stop = p.root1, i) : void 0
		}

		function h(e, t, r) {
			var n = e + t;
			return a.sign(e) !== a.sign(t) && Math.abs(n / Math.max(Math.abs(e), Math.abs(t))) < r ? 0 : n
		}

		function d(t, r, n, i, o) {
			var l, f = i * i,
				E = o * o,
				d = (t[u.COLUMN1ROW1] - t[u.COLUMN2ROW2]) * E,
				p = o * (i * h(t[u.COLUMN1ROW0], t[u.COLUMN0ROW1], a.EPSILON15) + r.y),
				_ = t[u.COLUMN0ROW0] * f + t[u.COLUMN2ROW2] * E + i * r.x + n,
				O = E * h(t[u.COLUMN2ROW1], t[u.COLUMN1ROW2], a.EPSILON15),
				m = o * (i * h(t[u.COLUMN2ROW0], t[u.COLUMN0ROW2]) + r.z),
				R = [];
			if(0 === m && 0 === O) {
				if(l = s.computeRealRoots(d, p, _), 0 === l.length) return R;
				var T = l[0],
					y = Math.sqrt(Math.max(1 - T * T, 0));
				if(R.push(new e(i, o * T, o * -y)), R.push(new e(i, o * T, o * y)), 2 === l.length) {
					var A = l[1],
						S = Math.sqrt(Math.max(1 - A * A, 0));
					R.push(new e(i, o * A, o * -S)), R.push(new e(i, o * A, o * S))
				}
				return R
			}
			var N = m * m,
				C = O * O,
				g = d * d,
				I = m * O,
				b = g + C,
				M = 2 * (p * d + I),
				w = 2 * _ * d + p * p - C + N,
				v = 2 * (_ * p - I),
				F = _ * _ - N;
			if(0 === b && 0 === M && 0 === w && 0 === v) return R;
			l = c.computeRealRoots(b, M, w, v, F);
			var L = l.length;
			if(0 === L) return R;
			for(var P = 0; L > P; ++P) {
				var D, U = l[P],
					B = U * U,
					x = Math.max(1 - B, 0),
					G = Math.sqrt(x);
				D = a.sign(d) === a.sign(_) ? h(d * B + _, p * U, a.EPSILON12) : a.sign(_) === a.sign(p * U) ? h(d * B, p * U + _, a.EPSILON12) : h(d * B + p * U, _, a.EPSILON12);
				var q = h(O * U, m, a.EPSILON15),
					j = D * q;
				0 > j ? R.push(new e(i, o * U, o * G)) : j > 0 ? R.push(new e(i, o * U, o * -G)) : 0 !== G ? (R.push(new e(i, o * U, o * -G)), R.push(new e(i, o * U, o * G)), ++P) : R.push(new e(i, o * U, o * G))
			}
			return R
		}
		var p = {};
		p.rayPlane = function(t, r, o) {
			if(!n(t)) throw new i("ray is required.");
			if(!n(r)) throw new i("plane is required.");
			n(o) || (o = new e);
			var u = t.origin,
				s = t.direction,
				c = r.normal,
				l = e.dot(c, s);
			if(!(Math.abs(l) < a.EPSILON15)) {
				var f = (-r.distance - e.dot(c, u)) / l;
				if(!(0 > f)) return o = e.multiplyByScalar(s, f, o), e.add(u, o, o)
			}
		};
		var _ = new e,
			O = new e,
			m = new e,
			R = new e,
			T = new e;
		p.rayTriangleParametric = function(t, o, u, s, c) {
			if(!n(t)) throw new i("ray is required.");
			if(!n(o)) throw new i("p0 is required.");
			if(!n(u)) throw new i("p1 is required.");
			if(!n(s)) throw new i("p2 is required.");
			c = r(c, !1);
			var l, f, E, h, d, p = t.origin,
				y = t.direction,
				A = e.subtract(u, o, _),
				S = e.subtract(s, o, O),
				N = e.cross(y, S, m),
				C = e.dot(A, N);
			if(c) {
				if(C < a.EPSILON6) return;
				if(l = e.subtract(p, o, R), E = e.dot(l, N), 0 > E || E > C) return;
				if(f = e.cross(l, A, T), h = e.dot(y, f), 0 > h || E + h > C) return;
				d = e.dot(S, f) / C
			} else {
				if(Math.abs(C) < a.EPSILON6) return;
				var g = 1 / C;
				if(l = e.subtract(p, o, R), E = e.dot(l, N) * g, 0 > E || E > 1) return;
				if(f = e.cross(l, A, T), h = e.dot(y, f) * g, 0 > h || E + h > 1) return;
				d = e.dot(S, f) * g
			}
			return d
		}, p.rayTriangle = function(t, r, i, o, a, u) {
			var s = p.rayTriangleParametric(t, r, i, o, a);
			if(n(s) && !(0 > s)) return n(u) || (u = new e), e.multiplyByScalar(t.direction, s, u), e.add(t.origin, u, u)
		};
		var y = new l;
		p.lineSegmentTriangle = function(t, r, o, a, u, s, c) {
			if(!n(t)) throw new i("v0 is required.");
			if(!n(r)) throw new i("v1 is required.");
			if(!n(o)) throw new i("p0 is required.");
			if(!n(a)) throw new i("p1 is required.");
			if(!n(u)) throw new i("p2 is required.");
			var l = y;
			e.clone(t, l.origin), e.subtract(r, t, l.direction), e.normalize(l.direction, l.direction);
			var f = p.rayTriangleParametric(l, o, a, u, s);
			return !n(f) || 0 > f || f > e.distance(t, r) ? void 0 : (n(c) || (c = new e), e.multiplyByScalar(l.direction, f, c), e.add(l.origin, c, c))
		};
		var A = {
			root0: 0,
			root1: 0
		};
		p.raySphere = function(e, t, r) {
			if(!n(e)) throw new i("ray is required.");
			if(!n(t)) throw new i("sphere is required.");
			return r = E(e, t, r), !n(r) || r.stop < 0 ? void 0 : (r.start = Math.max(r.start, 0), r)
		};
		var S = new l;
		p.lineSegmentSphere = function(t, r, o, a) {
			if(!n(t)) throw new i("p0 is required.");
			if(!n(r)) throw new i("p1 is required.");
			if(!n(o)) throw new i("sphere is required.");
			var u = S;
			e.clone(t, u.origin);
			var s = e.subtract(r, t, u.direction),
				c = e.magnitude(s);
			return e.normalize(s, s), a = E(u, o, a), !n(a) || a.stop < 0 || a.start > c ? void 0 : (a.start = Math.max(a.start, 0), a.stop = Math.min(a.stop, c), a)
		};
		var N = new e,
			C = new e;
		p.rayEllipsoid = function(t, r) {
			if(!n(t)) throw new i("ray is required.");
			if(!n(r)) throw new i("ellipsoid is required.");
			var a, u, s, c, l, f = r.oneOverRadii,
				E = e.multiplyComponents(f, t.origin, N),
				h = e.multiplyComponents(f, t.direction, C),
				d = e.magnitudeSquared(E),
				p = e.dot(E, h);
			if(d > 1) {
				if(p >= 0) return;
				var _ = p * p;
				if(a = d - 1, u = e.magnitudeSquared(h), s = u * a, s > _) return;
				if(_ > s) {
					c = p * p - s, l = -p + Math.sqrt(c);
					var O = l / u,
						m = a / l;
					return m > O ? new o(O, m) : {
						start: m,
						stop: O
					}
				}
				var R = Math.sqrt(a / u);
				return new o(R, R)
			}
			return 1 > d ? (a = d - 1, u = e.magnitudeSquared(h), s = u * a, c = p * p - s, l = -p + Math.sqrt(c), new o(0, l / u)) : 0 > p ? (u = e.magnitudeSquared(h), new o(0, -p / u)) : void 0
		};
		var g = new e,
			I = new e,
			b = new e,
			M = new e,
			w = new e,
			v = new u,
			F = new u,
			L = new u,
			P = new u,
			D = new u,
			U = new u,
			B = new u,
			x = new e,
			G = new e,
			q = new t;
		p.grazingAltitudeLocation = function(t, r) {
			if(!n(t)) throw new i("ray is required.");
			if(!n(r)) throw new i("ellipsoid is required.");
			var o = t.origin,
				s = t.direction;
			if(!e.equals(o, e.ZERO)) {
				var c = r.geodeticSurfaceNormal(o, g);
				if(e.dot(s, c) >= 0) return o
			}
			var l = n(this.rayEllipsoid(t, r)),
				f = r.transformPositionToScaledSpace(s, g),
				E = e.normalize(f, f),
				h = e.mostOrthogonalAxis(f, M),
				p = e.normalize(e.cross(h, E, I), I),
				_ = e.normalize(e.cross(E, p, b), b),
				O = v;
			O[0] = E.x, O[1] = E.y, O[2] = E.z, O[3] = p.x, O[4] = p.y, O[5] = p.z, O[6] = _.x, O[7] = _.y, O[8] = _.z;
			var m = u.transpose(O, F),
				R = u.fromScale(r.radii, L),
				T = u.fromScale(r.oneOverRadii, P),
				y = D;
			y[0] = 0, y[1] = -s.z, y[2] = s.y, y[3] = s.z, y[4] = 0, y[5] = -s.x, y[6] = -s.y, y[7] = s.x, y[8] = 0;
			var A, S, N = u.multiply(u.multiply(m, T, U), y, U),
				C = u.multiply(u.multiply(N, R, B), O, B),
				j = u.multiplyByVector(N, o, w),
				z = d(C, e.negate(j, g), 0, 0, 1),
				V = z.length;
			if(V > 0) {
				for(var H = e.clone(e.ZERO, G), X = Number.NEGATIVE_INFINITY, W = 0; V > W; ++W) {
					A = u.multiplyByVector(R, u.multiplyByVector(O, z[W], x), x);
					var Y = e.normalize(e.subtract(A, o, M), M),
						K = e.dot(Y, s);
					K > X && (X = K, H = e.clone(A, H))
				}
				var k = r.cartesianToCartographic(H, q);
				return X = a.clamp(X, 0, 1), S = e.magnitude(e.subtract(H, o, M)) * Math.sqrt(1 - X * X), S = l ? -S : S, k.height = S, r.cartographicToCartesian(k, new e)
			}
		};
		var j = new e;
		return p.lineSegmentPlane = function(t, r, o, u) {
			if(!n(t)) throw new i("endPoint0 is required.");
			if(!n(r)) throw new i("endPoint1 is required.");
			if(!n(o)) throw new i("plane is required.");
			n(u) || (u = new e);
			var s = e.subtract(r, t, j),
				c = o.normal,
				l = e.dot(c, s);
			if(!(Math.abs(l) < a.EPSILON6)) {
				var f = e.dot(c, t),
					E = -(o.distance + f) / l;
				if(!(0 > E || E > 1)) return e.multiplyByScalar(s, E, u), e.add(t, u, u), u
			}
		}, p.trianglePlaneIntersection = function(t, r, o, a) {
			if(!(n(t) && n(r) && n(o) && n(a))) throw new i("p0, p1, p2, and plane are required.");
			var u = a.normal,
				s = a.distance,
				c = e.dot(u, t) + s < 0,
				l = e.dot(u, r) + s < 0,
				f = e.dot(u, o) + s < 0,
				E = 0;
			E += c ? 1 : 0, E += l ? 1 : 0, E += f ? 1 : 0;
			var h, d;
			if((1 === E || 2 === E) && (h = new e, d = new e), 1 === E) {
				if(c) return p.lineSegmentPlane(t, r, a, h), p.lineSegmentPlane(t, o, a, d), {
					positions: [t, r, o, h, d],
					indices: [0, 3, 4, 1, 2, 4, 1, 4, 3]
				};
				if(l) return p.lineSegmentPlane(r, o, a, h), p.lineSegmentPlane(r, t, a, d), {
					positions: [t, r, o, h, d],
					indices: [1, 3, 4, 2, 0, 4, 2, 4, 3]
				};
				if(f) return p.lineSegmentPlane(o, t, a, h), p.lineSegmentPlane(o, r, a, d), {
					positions: [t, r, o, h, d],
					indices: [2, 3, 4, 0, 1, 4, 0, 4, 3]
				}
			} else if(2 === E) {
				if(!c) return p.lineSegmentPlane(r, t, a, h), p.lineSegmentPlane(o, t, a, d), {
					positions: [t, r, o, h, d],
					indices: [1, 2, 4, 1, 4, 3, 0, 3, 4]
				};
				if(!l) return p.lineSegmentPlane(o, r, a, h), p.lineSegmentPlane(t, r, a, d), {
					positions: [t, r, o, h, d],
					indices: [2, 0, 4, 2, 4, 3, 1, 3, 4]
				};
				if(!f) return p.lineSegmentPlane(t, o, a, h), p.lineSegmentPlane(r, o, a, d), {
					positions: [t, r, o, h, d],
					indices: [0, 1, 4, 0, 4, 3, 2, 3, 4]
				}
			}
		}, p
	}), define("Core/isArray", ["./defined"], function(e) {
		"use strict";
		var t = Array.isArray;
		return e(t) || (t = function(e) {
			return "[object Array]" === Object.prototype.toString.call(e)
		}), t
	}), define("Core/Plane", ["./Cartesian3", "./defined", "./DeveloperError", "./freezeObject", "./Math"], function(e, t, r, n, i) {
		"use strict";

		function o(n, o) {
			if(!t(n)) throw new r("normal is required.");
			if(!i.equalsEpsilon(e.magnitude(n), 1, i.EPSILON6)) throw new r("normal must be normalized.");
			if(!t(o)) throw new r("distance is required.");
			this.normal = e.clone(n), this.distance = o
		}
		o.fromPointNormal = function(n, a, u) {
			if(!t(n)) throw new r("point is required.");
			if(!t(a)) throw new r("normal is required.");
			if(!i.equalsEpsilon(e.magnitude(a), 1, i.EPSILON6)) throw new r("normal must be normalized.");
			var s = -e.dot(a, n);
			return t(u) ? (e.clone(a, u.normal), u.distance = s, u) : new o(a, s)
		};
		var a = new e;
		return o.fromCartesian4 = function(n, u) {
			if(!t(n)) throw new r("coefficients is required.");
			var s = e.fromCartesian4(n, a),
				c = n.w;
			if(!i.equalsEpsilon(e.magnitude(s), 1, i.EPSILON6)) throw new r("normal must be normalized.");
			return t(u) ? (e.clone(s, u.normal), u.distance = c, u) : new o(s, c)
		}, o.getPointDistance = function(n, i) {
			if(!t(n)) throw new r("plane is required.");
			if(!t(i)) throw new r("point is required.");
			return e.dot(n.normal, i) + n.distance
		}, o.ORIGIN_XY_PLANE = n(new o(e.UNIT_Z, 0)), o.ORIGIN_YZ_PLANE = n(new o(e.UNIT_X, 0)), o.ORIGIN_ZX_PLANE = n(new o(e.UNIT_Y, 0)), o
	}), define("Core/PolylinePipeline", ["./Cartesian3", "./Cartographic", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./EllipsoidGeodesic", "./IntersectionTests", "./isArray", "./Math", "./Matrix4", "./Plane"], function(e, t, r, n, i, o, a, u, s, c, l, f) {
		"use strict";

		function E(e, t, r) {
			var n = C;
			n.length = e;
			var i;
			if(t === r) {
				for(i = 0; e > i; i++) n[i] = t;
				return n
			}
			var o = r - t,
				a = o / e;
			for(i = 0; e > i; i++) {
				var u = t + i * a;
				n[i] = u
			}
			return n
		}

		function h(e, t) {
			var r = C;
			r.length = e;
			for(var n = 0; e > n; n++) r[n] = t * Math.sin(Math.PI * n / e);
			return r
		}

		function d(t, r, n, i, o, a, u, s, c) {
			var l = i.scaleToGeodeticSurface(t, M),
				f = i.scaleToGeodeticSurface(r, w),
				d = p.numberOfPoints(t, r, n),
				_ = i.cartesianToCartographic(l, g),
				O = i.cartesianToCartographic(f, I),
				m = void 0;
			m = c > 0 ? h(d, c) : E(d, o, a), v.setEndPoints(_, O);
			var R = v.surfaceDistance / d,
				T = s;
			_.height = o;
			var y = i.cartographicToCartesian(_, b);
			e.pack(y, u, T), T += 3;
			for(var A = 1; d > A; A++) {
				var S = v.interpolateUsingSurfaceDistance(A * R, I);
				S.height = m[A], y = i.cartographicToCartesian(S, b), e.pack(y, u, T), T += 3
			}
			return T
		}
		var p = {};
		p.numberOfPoints = function(t, r, n) {
			var i = e.distance(t, r);
			return Math.ceil(i / n)
		};
		var _ = new t;
		p.extractHeights = function(e, t) {
			for(var r = e.length, n = new Array(r), i = 0; r > i; i++) {
				var o = e[i];
				n[i] = t.cartesianToCartographic(o, _).height
			}
			return n
		};
		var O = new l,
			m = new e,
			R = new e,
			T = new f(e.UNIT_X, 0),
			y = new e,
			A = new f(e.UNIT_X, 0),
			S = new e,
			N = new e,
			C = [],
			g = new t,
			I = new t,
			b = new e,
			M = new e,
			w = new e,
			v = new a;
		return p.wrapLongitude = function(t, i) {
			var o = [],
				a = [];
			if(n(t) && t.length > 0) {
				i = r(i, l.IDENTITY);
				var s = l.inverseTransformation(i, O),
					c = l.multiplyByPoint(s, e.ZERO, m),
					E = e.normalize(l.multiplyByPointAsVector(s, e.UNIT_Y, R), R),
					h = f.fromPointNormal(c, E, T),
					d = e.normalize(l.multiplyByPointAsVector(s, e.UNIT_X, y), y),
					p = f.fromPointNormal(c, d, A),
					_ = 1;
				o.push(e.clone(t[0]));
				for(var C = o[0], g = t.length, I = 1; g > I; ++I) {
					var b = t[I];
					if(f.getPointDistance(p, C) < 0 || f.getPointDistance(p, b) < 0) {
						var M = u.lineSegmentPlane(C, b, h, S);
						if(n(M)) {
							var w = e.multiplyByScalar(E, 5e-9, N);
							f.getPointDistance(h, C) < 0 && e.negate(w, w), o.push(e.add(M, w, new e)), a.push(_ + 1), e.negate(w, w), o.push(e.add(M, w, new e)), _ = 1
						}
					}
					o.push(e.clone(t[I])), _++, C = b
				}
				a.push(_)
			}
			return {
				positions: o,
				lengths: a
			}
		}, p.generateArc = function(t) {
			n(t) || (t = {});
			var a = t.positions;
			if(!n(a)) throw new i("options.positions is required.");
			var u = a.length,
				l = r(t.ellipsoid, o.WGS84),
				f = r(t.height, 0),
				E = s(f);
			if(1 > u) return [];
			if(1 === u) {
				var h = l.scaleToGeodeticSurface(a[0], M);
				if(f = E ? f[0] : f, 0 !== f) {
					var _ = l.geodeticSurfaceNormal(h, b);
					e.multiplyByScalar(_, f, _), e.add(h, _, h)
				}
				return [h.x, h.y, h.z]
			}
			var O = t.minDistance;
			if(!n(O)) {
				var m = r(t.granularity, c.RADIANS_PER_DEGREE);
				O = c.chordLength(m, l.maximumRadius)
			}
			var R, T = 0;
			for(R = 0; u - 1 > R; R++) T += p.numberOfPoints(a[R], a[R + 1], O);
			var y = t.hMax,
				A = 3 * (T + 1),
				S = new Array(A),
				N = 0;
			for(R = 0; u - 1 > R; R++) {
				var I = a[R],
					w = a[R + 1],
					v = E ? f[R] : f,
					F = E ? f[R + 1] : f;
				N = d(I, w, O, l, v, F, S, N, y)
			}
			C.length = 0;
			var L = a[u - 1],
				P = l.cartesianToCartographic(L, g);
			P.height = E ? f[u - 1] : f;
			var D = l.cartographicToCartesian(P, b);
			return e.pack(D, S, A - 3), S
		}, p.generateCartesianArc = function(t) {
			for(var r = p.generateArc(t), n = r.length / 3, i = new Array(n), o = 0; n > o; o++) i[o] = e.unpack(r, 3 * o);
			return i
		}, p
	}), define("Core/VertexFormat", ["./defaultValue", "./defined", "./DeveloperError", "./freezeObject"], function(e, t, r, n) {
		"use strict";

		function i(t) {
			t = e(t, e.EMPTY_OBJECT), this.position = e(t.position, !1), this.normal = e(t.normal, !1), this.st = e(t.st, !1), this.bitangent = e(t.bitangent, !1), this.tangent = e(t.tangent, !1), this.color = e(t.color, !1)
		}
		return i.POSITION_ONLY = n(new i({
			position: !0
		})), i.POSITION_AND_NORMAL = n(new i({
			position: !0,
			normal: !0
		})), i.POSITION_NORMAL_AND_ST = n(new i({
			position: !0,
			normal: !0,
			st: !0
		})), i.POSITION_AND_ST = n(new i({
			position: !0,
			st: !0
		})), i.POSITION_AND_COLOR = n(new i({
			position: !0,
			color: !0
		})), i.ALL = n(new i({
			position: !0,
			normal: !0,
			st: !0,
			tangent: !0,
			bitangent: !0
		})), i.DEFAULT = i.POSITION_NORMAL_AND_ST, i.packedLength = 6, i.pack = function(n, i, o) {
			if(!t(n)) throw new r("value is required");
			if(!t(i)) throw new r("array is required");
			return o = e(o, 0), i[o++] = n.position ? 1 : 0, i[o++] = n.normal ? 1 : 0, i[o++] = n.st ? 1 : 0, i[o++] = n.tangent ? 1 : 0, i[o++] = n.bitangent ? 1 : 0, i[o] = n.color ? 1 : 0, i
		}, i.unpack = function(n, o, a) {
			if(!t(n)) throw new r("array is required");
			return o = e(o, 0), t(a) || (a = new i), a.position = 1 === n[o++], a.normal = 1 === n[o++], a.st = 1 === n[o++], a.tangent = 1 === n[o++], a.bitangent = 1 === n[o++], a.color = 1 === n[o], a
		}, i.clone = function(e, r) {
			return t(e) ? (t(r) || (r = new i), r.position = e.position, r.normal = e.normal, r.st = e.st, r.tangent = e.tangent, r.bitangent = e.bitangent, r.color = e.color, r) : void 0
		}, i
	}), define("Core/PolylineGeometry", ["./arrayRemoveDuplicates", "./BoundingSphere", "./Cartesian3", "./Color", "./ComponentDatatype", "./defaultValue", "./defined", "./DeveloperError", "./Ellipsoid", "./Geometry", "./GeometryAttribute", "./GeometryAttributes", "./GeometryType", "./IndexDatatype", "./Math", "./PolylinePipeline", "./PrimitiveType", "./VertexFormat"], function(e, t, r, n, i, o, a, u, s, c, l, f, E, h, d, p, _, O) {
		"use strict";

		function m(e, t, r, i, o) {
			var a = T;
			a.length = o;
			var u, s = r.red,
				c = r.green,
				l = r.blue,
				f = r.alpha,
				E = i.red,
				h = i.green,
				d = i.blue,
				p = i.alpha;
			if(n.equals(r, i)) {
				for(u = 0; o > u; u++) a[u] = n.clone(r);
				return a
			}
			var _ = (E - s) / o,
				O = (h - c) / o,
				m = (d - l) / o,
				R = (p - f) / o;
			for(u = 0; o > u; u++) a[u] = new n(s + u * _, c + u * O, l + u * m, f + u * R);
			return a
		}

		function R(e) {
			e = o(e, o.EMPTY_OBJECT);
			var t = e.positions,
				i = e.colors,
				c = o(e.width, 1),
				l = o(e.hMax, -1),
				f = o(e.colorsPerVertex, !1);
			if(!a(t) || t.length < 2) throw new u("At least two positions are required.");
			if("number" != typeof c) throw new u("width must be a number");
			if(a(i) && (f && i.length < t.length || !f && i.length < t.length - 1)) throw new u("colors has an invalid length.");
			this._positions = t, this._colors = i, this._width = c, this._hMax = l, this._colorsPerVertex = f, this._dist = e.dist, this._vertexFormat = O.clone(o(e.vertexFormat, O.DEFAULT)), this._followSurface = o(e.followSurface, !0), this._granularity = o(e.granularity, d.RADIANS_PER_DEGREE), this._ellipsoid = s.clone(o(e.ellipsoid, s.WGS84)), this._workerName = "createPolylineGeometry";
			var E = 1 + t.length * r.packedLength;
			E += a(i) ? 1 + i.length * n.packedLength : 1, this.packedLength = E + s.packedLength + O.packedLength + 4 + 1 + 1
		}
		var T = [];
		R.pack = function(e, t, i) {
			if(!a(e)) throw new u("value is required");
			if(!a(t)) throw new u("array is required");
			i = o(i, 0);
			var c, l = e._positions,
				f = l.length;
			for(t[i++] = f, c = 0; f > c; ++c, i += r.packedLength) r.pack(l[c], t, i);
			var E = e._colors;
			for(f = a(E) ? E.length : 0, t[i++] = f, c = 0; f > c; ++c, i += n.packedLength) n.pack(E[c], t, i);
			return s.pack(e._ellipsoid, t, i), i += s.packedLength, O.pack(e._vertexFormat, t, i), i += O.packedLength, t[i++] = e._width, t[i++] = e._colorsPerVertex ? 1 : 0, t[i++] = e._followSurface ? 1 : 0, t[i++] = e._granularity, t[i++] = e._hMax, t[i] = e._dist, t
		};
		var y = s.clone(s.UNIT_SPHERE),
			A = new O,
			S = {
				positions: void 0,
				colors: void 0,
				ellipsoid: y,
				vertexFormat: A,
				width: void 0,
				colorsPerVertex: void 0,
				followSurface: void 0,
				granularity: void 0
			};
		R.unpack = function(e, t, i) {
			if(!a(e)) throw new u("array is required");
			t = o(t, 0);
			var c, l = e[t++],
				f = new Array(l);
			for(c = 0; l > c; ++c, t += r.packedLength) f[c] = r.unpack(e, t);
			l = e[t++];
			var E = l > 0 ? new Array(l) : void 0;
			for(c = 0; l > c; ++c, t += n.packedLength) E[c] = n.unpack(e, t);
			var h = s.unpack(e, t, y);
			t += s.packedLength;
			var d = O.unpack(e, t, A);
			t += O.packedLength;
			var p = e[t++],
				_ = 1 === e[t++],
				m = 1 === e[t++],
				T = e[t++],
				N = e[t++],
				C = 1 == e[t];
			return a(i) ? (i._positions = f, i._colors = E, i._ellipsoid = s.clone(h, i._ellipsoid), i._vertexFormat = O.clone(d, i._vertexFormat), i._width = p, i._colorsPerVertex = _, i._followSurface = m, i._granularity = T, i._hMax = N, i._dist = C, i) : (S.positions = f, S.colors = E, S.width = p, S.colorsPerVertex = _, S.followSurface = m, S.granularity = T, S.hMax = N, S.dist = C, new R(S))
		};
		var N = new r,
			C = new r,
			g = new r,
			I = new r;
		return R.createGeometry = function(o) {
			var u, s, O, R = o._width,
				y = o._hMax,
				A = o._vertexFormat,
				S = o._colors,
				b = o._colorsPerVertex,
				M = o._followSurface,
				w = o._granularity,
				v = o._ellipsoid,
				F = o._dist,
				L = e(o._positions, r.equalsEpsilon),
				P = L.length;
			if(!(2 > P || 0 >= R)) {
				if(M) {
					var D = p.extractHeights(L, v),
						U = d.chordLength(w, v.maximumRadius);
					if(a(S)) {
						var B = 1;
						for(u = 0; P - 1 > u; ++u) B += p.numberOfPoints(L[u], L[u + 1], U);
						var x = new Array(B),
							G = 0;
						for(u = 0; P - 1 > u; ++u) {
							var q = L[u],
								j = L[u + 1],
								z = S[u],
								V = p.numberOfPoints(q, j, U);
							if(b && B > u) {
								var H = S[u + 1],
									X = m(q, j, z, H, V),
									W = X.length;
								for(s = 0; W > s; ++s) x[G++] = X[s]
							} else
								for(s = 0; V > s; ++s) x[G++] = n.clone(z)
						}
						x[G] = n.clone(S[S.length - 1]), S = x, T.length = 0
					}
					L = p.generateCartesianArc({
						positions: L,
						minDistance: U,
						ellipsoid: v,
						height: D,
						hMax: y
					})
				}
				P = L.length;
				var Y, K = 4 * P - 4,
					k = new Float64Array(3 * K),
					Z = new Float64Array(3 * K),
					Q = new Float64Array(3 * K),
					J = new Float32Array(2 * K),
					$ = A.st ? new Float32Array(2 * K) : void 0,
					ee = a(S) ? new Uint8Array(4 * K) : void 0,
					te = F ? new Float32Array(3 * K) : void 0,
					re = 0,
					ne = 0,
					ie = 0,
					oe = 0,
					ae = 0,
					ue = 0;
				for(s = 0; P > s; ++s) {
					0 === s ? (Y = N, r.subtract(L[0], L[1], Y), r.add(L[0], Y, Y)) : Y = L[s - 1], r.clone(Y, g), r.clone(L[s], C), s === P - 1 ? (Y = N, r.subtract(L[P - 1], L[P - 2], Y), r.add(L[P - 1], Y, Y)) : Y = L[s + 1], r.clone(Y, I);
					var se, ce;
					a(ee) && (se = 0 === s || b ? S[s] : S[s - 1], s !== P - 1 && (ce = S[s]));
					var le = 0 === s ? 2 : 0,
						fe = s === P - 1 ? 2 : 4;
					for(O = le; fe > O; ++O) {
						r.pack(C, k, re), r.pack(g, Z, re), r.pack(I, Q, re), re += 3;
						var Ee = 0 > O - 2 ? -1 : 1,
							he = 2 * (O % 2) - 1,
							de = he * s / P;
						if(y > 0 ? J[ne++] = de : J[ne++] = he, J[ne++] = Ee * R, A.st && ($[ie++] = s / (P - 1), $[ie++] = Math.max(J[ne - 2], 0)), a(ee)) {
							var pe = 2 > O ? se : ce;
							ee[oe++] = n.floatToByte(pe.red), ee[oe++] = n.floatToByte(pe.green), ee[oe++] = n.floatToByte(pe.blue), ee[oe++] = n.floatToByte(pe.alpha)
						}
						F && (te[3 * ae] = ue, ae++)
					}
					var _e = r.distance(Y, L[s]);
					ue += _e
				}
				var Oe = ue,
					me = Math.random() * Oe;
				for(s = 0; K > s; s++) te[3 * s] /= Oe, te[3 * s + 1] = 1, te[3 * s + 2] = me / Oe;
				var Re = new f;
				Re.position = new l({
					componentDatatype: i.DOUBLE,
					componentsPerAttribute: 3,
					values: k
				}), Re.prevPosition = new l({
					componentDatatype: i.DOUBLE,
					componentsPerAttribute: 3,
					values: Z
				}), Re.nextPosition = new l({
					componentDatatype: i.DOUBLE,
					componentsPerAttribute: 3,
					values: Q
				}), Re.expandAndWidth = new l({
					componentDatatype: i.FLOAT,
					componentsPerAttribute: 2,
					values: J
				}), A.st && (Re.st = new l({
					componentDatatype: i.FLOAT,
					componentsPerAttribute: 2,
					values: $
				})), a(ee) && (Re.color = new l({
					componentDatatype: i.UNSIGNED_BYTE,
					componentsPerAttribute: 4,
					values: ee,
					normalize: !0
				})), F && (Re.dist = new l({
					componentDatatype: i.FLOAT,
					componentsPerAttribute: 3,
					values: te
				}));
				var Te = h.createTypedArray(K, 6 * P - 6),
					ye = 0,
					Ae = 0,
					Se = P - 1;
				for(s = 0; Se > s; ++s) Te[Ae++] = ye, Te[Ae++] = ye + 2, Te[Ae++] = ye + 1, Te[Ae++] = ye + 1, Te[Ae++] = ye + 2, Te[Ae++] = ye + 3, ye += 4;
				return new c({
					attributes: Re,
					indices: Te,
					primitiveType: _.TRIANGLES,
					boundingSphere: t.fromPoints(L),
					geometryType: E.POLYLINES
				})
			}
		}, R
	}), define("Workers/createPolylineGeometry", ["../Core/defined", "../Core/Ellipsoid", "../Core/PolylineGeometry"], function(e, t, r) {
		"use strict";

		function n(n, i) {
			return e(i) && (n = r.unpack(n, i)), n._ellipsoid = t.clone(n._ellipsoid), r.createGeometry(n)
		}
		return n
	})
}();