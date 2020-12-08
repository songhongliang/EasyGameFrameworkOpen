var egf = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var App = /** @class */ (function () {
        function App() {
            this._state = 0;
            this._moduleMap = {};
        }
        Object.defineProperty(App.prototype, "state", {
            get: function () {
                return this._state;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(App.prototype, "moduleMap", {
            get: function () {
                var moduleMap = this._moduleMap;
                if (!this._proxyModuleMap) {
                    this._proxyModuleMap = new Proxy(moduleMap, {
                        get: function (target, key) {
                            if (typeof key === "string") {
                                return moduleMap[key];
                            }
                            else {
                                return null;
                            }
                        }
                    });
                }
                return this._proxyModuleMap;
            },
            enumerable: true,
            configurable: true
        });
        App.prototype.bootstrap = function (bootLoaders) {
            return __awaiter(this, void 0, void 0, function () {
                var bootPromises, _loop_1, i, e_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.setState(App.BOOTING);
                            if (!bootLoaders || bootLoaders.length <= 0) {
                                this.setState(App.BOOTEND);
                                return [2 /*return*/, true];
                            }
                            if (!(bootLoaders && bootLoaders.length > 0)) return [3 /*break*/, 4];
                            bootPromises = [];
                            _loop_1 = function (i) {
                                var bootLoader = bootLoaders[i];
                                bootPromises.push(new Promise(function (res, rej) {
                                    bootLoader.onBoot(_this, function (isOk) {
                                        if (isOk) {
                                            res();
                                        }
                                        else {
                                            rej();
                                        }
                                    });
                                }));
                            };
                            for (i = 0; i < bootLoaders.length; i++) {
                                _loop_1(i);
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all(bootPromises)];
                        case 2:
                            _a.sent();
                            this.setState(App.BOOTEND);
                            return [2 /*return*/, true];
                        case 3:
                            e_1 = _a.sent();
                            console.error(e_1);
                            this.setState(App.BOOTEND);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        App.prototype.init = function () {
            var moduleMap = this._moduleMap;
            var moduleIns;
            if (this.state === App.RUNING)
                return;
            for (var key in moduleMap) {
                moduleIns = moduleMap[key];
                moduleIns.onInit && moduleIns.onInit(this);
            }
            for (var key in moduleMap) {
                moduleIns = moduleMap[key];
                moduleIns.onAfterInit && moduleIns.onAfterInit(this);
            }
            this.setState(App.RUNING);
        };
        App.prototype.loadModule = function (moduleIns, key) {
            if (this._state === App.STOP)
                return false;
            var res = false;
            if (!key) {
                key = moduleIns.key;
            }
            if (key && typeof key === "string") {
                if (moduleIns) {
                    if (!this._moduleMap[key]) {
                        this._moduleMap[key] = moduleIns;
                        res = true;
                        if (this._state === App.RUNING) {
                            moduleIns.onInit && moduleIns.onInit(this);
                            moduleIns.onAfterInit && moduleIns.onAfterInit();
                        }
                    }
                    else {
                        this._log("\u52A0\u8F7D\u6A21\u5757:\u6A21\u5757:" + key + "\u5DF2\u7ECF\u5B58\u5728,\u4E0D\u91CD\u590D\u52A0\u8F7D");
                    }
                }
                else {
                    this._log("\u52A0\u8F7D\u6A21\u5757:\u6A21\u5757:" + key + "\u5B9E\u4F8B\u4E3A\u7A7A");
                }
            }
            else {
                this._log("\u52A0\u8F7D\u6A21\u5757:\u6A21\u5757key\u4E3A\u7A7A");
            }
            return res;
        };
        App.prototype.hasModule = function (moduleKey) {
            return !!this._moduleMap[moduleKey];
        };
        App.prototype.stop = function () {
            var moduleMap = this._moduleMap;
            var moduleIns;
            this.setState(App.STOP);
            for (var key in moduleMap) {
                moduleIns = moduleMap[key];
                moduleIns.onStop && moduleIns.onStop();
            }
        };
        App.prototype.getModule = function (moduleKey) {
            return this._moduleMap[moduleKey];
        };
        App.prototype.setState = function (state) {
            this._state = state;
        };
        /**
         * 输出
         * @param level 1 warn 2 error
         * @param msg
         */
        App.prototype._log = function (msg, level) {
            switch (level) {
                case 1:
                    console.warn("\u3010\u4E3B\u7A0B\u5E8F\u3011" + msg);
                    break;
                case 2:
                    console.error("\u3010\u4E3B\u7A0B\u5E8F\u3011" + msg);
                    break;
                default:
                    console.warn("\u3010\u4E3B\u7A0B\u5E8F\u3011" + msg);
                    break;
            }
        };
        App.UN_RUN = 0;
        App.BOOTING = 1;
        App.BOOTEND = 2;
        App.RUNING = 3;
        App.STOP = 4;
        return App;
    }());

    exports.App = App;

    return exports;

}({}));
window.egf?Object.assign({},window.egf):(window.egf = egf)
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lZ2YtYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBBcHA8TW9kdWxlTWFwID0gYW55PiBpbXBsZW1lbnRzIGVnZi5JQXBwPE1vZHVsZU1hcD4ge1xyXG4gICAgcHVibGljIHN0YXRpYyByZWFkb25seSBVTl9SVU46IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJPT1RJTkc6IG51bWJlciA9IDE7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEJPT1RFTkQ6IG51bWJlciA9IDI7XHJcbiAgICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFJVTklORzogbnVtYmVyID0gMztcclxuICAgIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgU1RPUDogbnVtYmVyID0gNDtcclxuICAgIHByb3RlY3RlZCBfc3RhdGU6IG51bWJlciA9IDA7XHJcbiAgICBwcm90ZWN0ZWQgX21vZHVsZU1hcDogeyBba2V5OiBzdHJpbmddOiBlZ2YuSU1vZHVsZSB9ID0ge307XHJcbiAgICBwcm90ZWN0ZWQgX3Byb3h5TW9kdWxlTWFwOiB7IFtrZXk6IHN0cmluZ106IGVnZi5JTW9kdWxlIH07XHJcbiAgICBwdWJsaWMgZ2V0IHN0YXRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBtb2R1bGVNYXAoKTogTW9kdWxlTWFwIHtcclxuICAgICAgICBjb25zdCBtb2R1bGVNYXAgPSB0aGlzLl9tb2R1bGVNYXA7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9wcm94eU1vZHVsZU1hcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wcm94eU1vZHVsZU1hcCA9IG5ldyBQcm94eShtb2R1bGVNYXAsIHtcclxuICAgICAgICAgICAgICAgIGdldCh0YXJnZXQsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2R1bGVNYXBba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJveHlNb2R1bGVNYXAgYXMgYW55O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFzeW5jIGJvb3RzdHJhcChib290TG9hZGVycz86IGVnZi5JQm9vdExvYWRlcltdKTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShBcHAuQk9PVElORyk7XHJcbiAgICAgICAgaWYgKCFib290TG9hZGVycyB8fCBib290TG9hZGVycy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKEFwcC5CT09URU5EKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib290TG9hZGVycyAmJiBib290TG9hZGVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJvb3RQcm9taXNlczogUHJvbWlzZTxib29sZWFuPltdID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9vdExvYWRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJvb3RMb2FkZXI6IGVnZi5JQm9vdExvYWRlciA9IGJvb3RMb2FkZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgYm9vdFByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vdExvYWRlci5vbkJvb3QodGhpcyBhcyBhbnksIChpc09rKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc09rKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlaigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKGJvb3RQcm9taXNlcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKEFwcC5CT09URU5EKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShBcHAuQk9PVEVORCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgbW9kdWxlTWFwID0gdGhpcy5fbW9kdWxlTWFwO1xyXG4gICAgICAgIGxldCBtb2R1bGVJbnM6IGVnZi5JTW9kdWxlO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBBcHAuUlVOSU5HKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbW9kdWxlTWFwKSB7XHJcbiAgICAgICAgICAgIG1vZHVsZUlucyA9IG1vZHVsZU1hcFtrZXldO1xyXG4gICAgICAgICAgICBtb2R1bGVJbnMub25Jbml0ICYmIG1vZHVsZUlucy5vbkluaXQodGhpcyBhcyBhbnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBtb2R1bGVNYXApIHtcclxuICAgICAgICAgICAgbW9kdWxlSW5zID0gbW9kdWxlTWFwW2tleV07XHJcbiAgICAgICAgICAgIG1vZHVsZUlucy5vbkFmdGVySW5pdCAmJiBtb2R1bGVJbnMub25BZnRlckluaXQodGhpcyBhcyBhbnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKEFwcC5SVU5JTkcpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRNb2R1bGUobW9kdWxlSW5zOiBhbnkgfCBlZ2YuSU1vZHVsZSwga2V5Pzoga2V5b2YgTW9kdWxlTWFwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBBcHAuU1RPUCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGxldCByZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICBpZiAoIWtleSkge1xyXG4gICAgICAgICAgICBrZXkgPSBtb2R1bGVJbnMua2V5IGFzIG5ldmVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoa2V5ICYmIHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgaWYgKG1vZHVsZUlucykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9tb2R1bGVNYXBba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21vZHVsZU1hcFtrZXldID0gbW9kdWxlSW5zO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRlID09PSBBcHAuUlVOSU5HKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZUlucy5vbkluaXQgJiYgbW9kdWxlSW5zLm9uSW5pdCh0aGlzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlSW5zLm9uQWZ0ZXJJbml0ICYmIG1vZHVsZUlucy5vbkFmdGVySW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nKGDliqDovb3mqKHlnZc65qih5Z2XOiR7a2V5feW3sue7j+WtmOWcqCzkuI3ph43lpI3liqDovb1gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xvZyhg5Yqg6L295qih5Z2XOuaooeWdlzoke2tleX3lrp7kvovkuLrnqbpgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvZyhg5Yqg6L295qih5Z2XOuaooeWdl2tleeS4uuepumApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc01vZHVsZShtb2R1bGVLZXk6IGtleW9mIE1vZHVsZU1hcCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhIXRoaXMuX21vZHVsZU1hcFttb2R1bGVLZXkgYXMgYW55XTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IG1vZHVsZU1hcCA9IHRoaXMuX21vZHVsZU1hcDtcclxuICAgICAgICBsZXQgbW9kdWxlSW5zOiBlZ2YuSU1vZHVsZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKEFwcC5TVE9QKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBtb2R1bGVNYXApIHtcclxuICAgICAgICAgICAgbW9kdWxlSW5zID0gbW9kdWxlTWFwW2tleV07XHJcbiAgICAgICAgICAgIG1vZHVsZUlucy5vblN0b3AgJiYgbW9kdWxlSW5zLm9uU3RvcCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRNb2R1bGU8SyBleHRlbmRzIGtleW9mIE1vZHVsZU1hcD4obW9kdWxlS2V5OiBLKTogTW9kdWxlTWFwW0tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlTWFwW21vZHVsZUtleSBhcyBhbnldIGFzIGFueTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0U3RhdGUoc3RhdGU6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gc3RhdGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOi+k+WHulxyXG4gICAgICogQHBhcmFtIGxldmVsIDEgd2FybiAyIGVycm9yXHJcbiAgICAgKiBAcGFyYW0gbXNnIFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX2xvZyhtc2c6IHN0cmluZywgbGV2ZWw/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBzd2l0Y2ggKGxldmVsKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg44CQ5Li756iL5bqP44CRJHttc2d9YCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihg44CQ5Li756iL5bqP44CRJHttc2d9YCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybihg44CQ5Li756iL5bqP44CRJHttc2d9YCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUFBO1lBTWMsV0FBTSxHQUFXLENB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
