/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_sass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.sass */ "./styles/main.sass");
/* harmony import */ var _styles_main_sass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_main_sass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/vectors */ "./scripts/vectors.ts");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// If you want style your pure spaghetti html
 // True typescript file imports


var CellContent;

(function (CellContent) {
  CellContent[CellContent["empty"] = 0] = "empty";
  CellContent[CellContent["border"] = 1] = "border";
  CellContent[CellContent["snake"] = 2] = "snake";
  CellContent[CellContent["food"] = 3] = "food";
  CellContent[CellContent["diamond"] = 4] = "diamond";
})(CellContent || (CellContent = {}));

var Cell = /*#__PURE__*/function () {
  function Cell() {
    _classCallCheck(this, Cell);

    _defineProperty(this, "_content", void 0);

    _defineProperty(this, "_object", void 0);

    this.reset();
  }

  _createClass(Cell, [{
    key: "reset",
    value: function reset() {
      this._content = CellContent.empty;
      this._object = undefined;
    }
  }, {
    key: "notEmpty",
    value: function notEmpty() {
      return this._content !== CellContent.empty;
    }
  }, {
    key: "content",
    get: function get() {
      return this._content;
    }
  }, {
    key: "object",
    set: function set(obj) {
      this._content = obj.content;
      this._object = obj;
      console.log(obj);
    }
  }]);

  return Cell;
}();

function randomIndex(array) {
  if (array) return Math.floor(Math.random() * array.length);else return undefined;
}

function randomArrayItem(array) {
  if (!array) return undefined;
  return array[randomIndex(array)];
}

function randomEnumItem(anEnum) {
  var enumValues = Object.values(anEnum);
  return randomArrayItem(enumValues);
}

var Game = /*#__PURE__*/function () {
  function Game(opts) {
    var _this = this;

    _classCallCheck(this, Game);

    _defineProperty(this, "currentMousePosition", void 0);

    _defineProperty(this, "previousMouseCell", void 0);

    _defineProperty(this, "currentMouseCell", void 0);

    _defineProperty(this, "speed", void 0);

    _defineProperty(this, "canvas", void 0);

    _defineProperty(this, "ctx", void 0);

    _defineProperty(this, "cellsCount", void 0);

    _defineProperty(this, "gridSize", void 0);

    _defineProperty(this, "cellSize", void 0);

    _defineProperty(this, "grid", void 0);

    _defineProperty(this, "snakes", void 0);

    _defineProperty(this, "interval", void 0);

    _defineProperty(this, "food", void 0);

    _defineProperty(this, "maxFoodCount", void 0);

    _defineProperty(this, "foodSpawnChance", void 0);

    _defineProperty(this, "currentFoodCount", void 0);

    _defineProperty(this, "diamond", void 0);

    _defineProperty(this, "maxDiamondsCount", void 0);

    _defineProperty(this, "diamondSpawnChance", void 0);

    _defineProperty(this, "currentDiamondCount", void 0);

    this.canvas = document.getElementById(opts['canvasId']);
    this.ctx = this.canvas.getContext('2d');
    this.gridSize = opts['gridSize'];
    this.cellsCount = this.gridSize.x * this.gridSize.y;
    this.snakes = [];
    this.grid = [];

    for (var y = 0; y < this.gridSize.y; y++) {
      this.grid[y] = [];

      for (var x = 0; x < this.gridSize.x; x++) {
        this.grid[y][x] = new Cell();
      }
    }

    this.resizeCanvas(500, 500);
    this.speed = 1;
    this.maxFoodCount = opts['maxFoodCount'];
    this.foodSpawnChance = opts['foodSpawnChance'];
    this.food = opts['food'];
    if (!this.food) console.error('Food not defined!');
    this.currentFoodCount = 0;
    this.maxDiamondsCount = opts['maxDiamondsCount'];
    this.diamondSpawnChance = opts['diamondSpawnChance'];
    this.diamond = opts['diamond'];
    if (!this.diamond) console.error('Diamond not defined!');
    this.currentDiamondCount = 0;

    window.onmousemove = function (e) {
      var eventFunc = function eventFunc(canvas) {
        var r = canvas.getBoundingClientRect();
        _this.currentMousePosition = new _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"]((e.clientX - r.left) / (r.right - r.left) * canvas.width, (e.clientY - r.top) / (r.bottom - r.top) * canvas.height);
        var currentCell = new _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](Math.floor(_this.currentMousePosition.x / _this.cellSize), Math.floor(_this.currentMousePosition.y / _this.cellSize));
        if (!_this.isInsideBounds(currentCell)) return;
        _this.currentMouseCell = currentCell;

        if (_this.previousMouseCell == undefined || _this.currentMouseCell.equals(_this.previousMouseCell)) {
          _this.previousMouseCell = _this.currentMouseCell;

          _this.onCellHover();
        }
      };

      eventFunc(_this.canvas);
    };
  }

  _createClass(Game, [{
    key: "play",
    value: function play() {
      var _this2 = this;

      console.log('Game started.');
      this.interval = setInterval(function () {
        var _iterator = _createForOfIteratorHelper(_this2.snakes),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _snake = _step.value;

            _snake.onStep();

            if (_this2.currentFoodCount < _this2.maxFoodCount) {
              var randomFood = randomArrayItem(_this2.food);

              if (_this2.currentFoodCount == 0 || randomFood.spawnRate > Math.random()) {
                _this2.spawn(randomFood);

                _this2.currentFoodCount++;
              }
            } else console.log('currentFoodCount < maxFoodCount: ', _this2.currentFoodCount, _this2.maxFoodCount);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }, 1000 / this.speed);
    }
  }, {
    key: "pause",
    value: function pause() {
      console.log('Game paused.');
      clearInterval(this.interval);
    }
  }, {
    key: "spawn",
    value: function spawn(obj) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (obj.content === CellContent.snake) {
        console.error('Do not use "spawn" method to spawn snakes.' + ' You should use special "spawnSnake" method.');
        return;
      }

      if (pos == null) pos = this.randomEmptyCell();
      if (pos == null) console.error('Cannot find empty cell :(');
      this.setCell(pos, obj);
    }
  }, {
    key: "spawnSnake",
    value: function spawnSnake(snake) {
      var _iterator2 = _createForOfIteratorHelper(snake.segments),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var segment = _step2.value;

          if (this.getCell(segment.position).notEmpty()) {
            return false;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.snakes.push(snake);

      var _iterator3 = _createForOfIteratorHelper(snake.segments),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var _segment = _step3.value;
          this.setCell(_segment.position, _segment);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return true;
    }
  }, {
    key: "randomEmptyCell",
    value: function randomEmptyCell() {
      var i = 0;
      var cell = null;

      do {
        var y = randomIndex(this.grid);
        cell = new _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](y, randomIndex(this.grid[y]));
      } while (i++ < this.cellsCount * 0.2 && this.getCell(cell).notEmpty());

      if (this.getCell(cell).notEmpty()) return null;
      return cell;
    }
  }, {
    key: "getCell",
    value: function getCell(pos) {
      if (this.isInsideBounds(pos)) return this.grid[pos.y][pos.x];
    }
  }, {
    key: "setCell",
    value: function setCell(pos, obj) {
      if (obj.image) this.drawImage(pos, obj.image);else this.fill(pos);
      if (this.isInsideBounds(pos)) this.grid[pos.y][pos.x].object = obj;
    }
  }, {
    key: "setFillStyle",
    value: function setFillStyle(color) {
      this.ctx.fillStyle = color;
    }
  }, {
    key: "fill",
    value: function fill(pos) {
      var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (color !== null) this.setFillStyle(color);
      this.ctx.fillRect(this.cellSize * pos.x, this.cellSize * pos.y, this.cellSize, this.cellSize);
    }
  }, {
    key: "drawImage",
    value: function drawImage(pos, image) {
      if (image == null) console.warn('Image source not defined.');
      console.log(pos, ' image: ', image);
      this.ctx.drawImage(image, this.cellSize * pos.x, this.cellSize * pos.y, this.cellSize, this.cellSize);
    }
  }, {
    key: "clear",
    value: function clear() {
      var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (pos == null) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);else {
        this.ctx.clearRect(this.cellSize * pos.x, this.cellSize * pos.y, this.cellSize, this.cellSize);
        this.grid[pos.y][pos.x].reset();
      }
    }
  }, {
    key: "isInsideBounds",
    value: function isInsideBounds(pos) {
      if (pos == undefined) return false;
      return pos.x >= 0 && pos.x < this.gridSize.x && pos.y >= 0 && pos.y < this.gridSize.y;
    }
  }, {
    key: "returnInsideBounds",
    value: function returnInsideBounds(pos) {
      var x, y;
      if (pos.x < 0) x = this.gridSize.x - 1;else if (pos.x >= this.gridSize.x) x = 0;else x = pos.x;
      if (pos.y < 0) y = this.gridSize.y - 1;else if (pos.y >= this.gridSize.y) y = 0;else y = pos.y;
      return new _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](x, y);
    }
  }, {
    key: "onCellHover",
    value: function onCellHover() {}
  }, {
    key: "resizeCanvas",
    value: function resizeCanvas(w, h) {
      var ratio = function (ctx) {
        var dpr = window.devicePixelRatio || 1;
        var bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
        return dpr / bsr;
      }(this.ctx);

      this.canvas.width = w * ratio;
      this.canvas.height = h * ratio;
      this.canvas.style.width = w + "px";
      this.canvas.style.height = h + "px";
      this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      this.cellSize = Math.min(this.canvas.width / this.gridSize.x, this.canvas.height / this.gridSize.y);
    }
  }]);

  return Game;
}();

var Food = function Food(image, cost) {
  var _this3 = this;

  _classCallCheck(this, Food);

  _defineProperty(this, "content", void 0);

  _defineProperty(this, "spawnRate", void 0);

  _defineProperty(this, "cost", void 0);

  _defineProperty(this, "image", void 0);

  if (typeof image == 'string') {
    var img = new Image();
    img.src = image;

    img.onload = function () {
      _this3.image = img;
    };
  }

  this.cost = cost;
  this.content = CellContent.food;
};

var Diamond = function Diamond(image, cost) {
  var _this4 = this;

  _classCallCheck(this, Diamond);

  _defineProperty(this, "content", void 0);

  _defineProperty(this, "spawnRate", void 0);

  _defineProperty(this, "cost", void 0);

  _defineProperty(this, "image", void 0);

  if (typeof image == 'string') {
    var img = new Image();
    img.src = image;

    img.onload = function () {
      _this4.image = img;
    };
  }

  this.cost = cost;
  this.content = CellContent.diamond;
};

var SnakeSegment = function SnakeSegment(snake, pos) {
  _classCallCheck(this, SnakeSegment);

  _defineProperty(this, "content", void 0);

  _defineProperty(this, "image", void 0);

  _defineProperty(this, "position", void 0);

  _defineProperty(this, "snake", void 0);

  _defineProperty(this, "cost", void 0);

  _defineProperty(this, "spawnRate", void 0);

  this.content = CellContent.snake;
  this.position = pos;
  this.snake = snake;
};

var Snake = /*#__PURE__*/function () {
  function Snake(game) {
    var _this5 = this;

    var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var headPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var direction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, Snake);

    _defineProperty(this, "segments", void 0);

    _defineProperty(this, "game", void 0);

    _defineProperty(this, "direction", void 0);

    _defineProperty(this, "inputDirection", void 0);

    _defineProperty(this, "score", void 0);

    if (headPos == undefined) headPos = game.randomEmptyCell();
    if (length <= 0) length = 1;
    this.game = game;
    this.score = 0;
    this.direction = direction || randomEnumItem(_scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"]);
    this.segments = new Array(length);

    for (var i = 0; i < length; i++) {
      var pos = headPos.moveByDirection(this.direction);
      if (!this.game.isInsideBounds(pos)) pos = this.game.returnInsideBounds(pos);
      this.game.fill(pos);
      this.segments[i] = new SnakeSegment(this, pos);
    }

    game.spawnSnake(this);

    window.onkeydown = function (e) {
      if (e.repeat) return; // console.log(e.key);

      switch (e.key) {
        case "w":
        case "ArrowUp":
        case "Up":
          _this5.inputDirection = _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].top;
          break;

        case "a":
        case "ArrowLeft":
        case "Left":
          _this5.inputDirection = _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].left;
          break;

        case "s":
        case "ArrowDown":
        case "Down":
          _this5.inputDirection = _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].bottom;
          break;

        case "d":
        case "ArrowRight":
        case "Right":
          _this5.inputDirection = _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].right;
          break;
      }
    };
  }

  _createClass(Snake, [{
    key: "onStep",
    value: function onStep() {
      if (this.inputDirection == undefined || this.inputDirection === this.reverseDirection()) return;
      var newHead = this.segments[0].position.moveByDirection(this.inputDirection);
      if (!this.game.isInsideBounds(newHead)) newHead = this.game.returnInsideBounds(newHead);
      this.moveTo(newHead);
      this.direction = this.inputDirection;
    }
  }, {
    key: "moveTo",
    value: function moveTo(newHead) {
      var last = this.cutFromTail()[0];
      last.position = newHead;
      this.segments.unshift(last);
      var cell = this.game.getCell(newHead);

      switch (cell.content) {
        case CellContent.snake:
        case CellContent.border:
          this.game.pause();
          break;

        case CellContent.food:
        case CellContent.diamond:
          this.score += cell.object.cost;
          displaySore(this.score);
          break;

        default:
          this.game.setCell(newHead, last);
          break;
      }
    }
  }, {
    key: "cutFromTail",
    value: function cutFromTail() {
      var tailLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var tail = [];

      for (var i = 0; i < tailLength && i < this.segments.length; i++) {
        var tailEnd = this.segments.pop();
        this.game.clear(tailEnd.position);
        tail.push(tailEnd);
      }

      return tail;
    }
  }, {
    key: "reverseDirection",
    value: function reverseDirection() {
      switch (+this.direction) {
        case _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].top:
          return _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].bottom;

        case _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].bottom:
          return _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].top;

        case _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].left:
          return _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].right;

        case _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].right:
          return _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].left;

        default:
          console.error("Unknown direction \"".concat(this.direction, "\" -> ").concat(+this.direction)); // throw new Error('Unknown direction: ' + this.direction);

          return _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Direction"].bottom;
      }
    }
  }]);

  return Snake;
}();

var scoreField = document.getElementById('score-field');

function displaySore(score) {
  scoreField.innerText = score;
}

var food = [];
food.push(new Food('assets/images/029-apple.png', 1));
food.push(new Food('assets/images/024-grapes.png', 3));
food.push(new Food('assets/images/026-mushroom-1.png', 7));
var game = new Game({
  canvasId: 'game-surface',
  gridSize: new _scripts_vectors__WEBPACK_IMPORTED_MODULE_1__["Vector2"](25, 25),
  food: food,
  maxFoodCount: 10,
  foodSpawnChance: 0.1,
  diamond: new Diamond('assets/images/070-star.png', 10),
  maxDiamondsCount: 0,
  diamondSpawnChance: 0.025
});
var snake = new Snake(game, 15);
game.speed = 10;
game.play();

/***/ }),

/***/ "./scripts/vectors.ts":
/*!****************************!*\
  !*** ./scripts/vectors.ts ***!
  \****************************/
/*! exports provided: Direction, Vector2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Direction", function() { return Direction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector2", function() { return Vector2; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Direction;

(function (Direction) {
  Direction[Direction["top"] = 0] = "top";
  Direction[Direction["right"] = 1] = "right";
  Direction[Direction["bottom"] = 2] = "bottom";
  Direction[Direction["left"] = 3] = "left";
})(Direction || (Direction = {}));

var Vector2 = /*#__PURE__*/function () {
  function Vector2(x, y) {
    _classCallCheck(this, Vector2);

    _defineProperty(this, "x", void 0);

    _defineProperty(this, "y", void 0);

    this.x = x;
    this.y = y;
  } //      _____________________________
  // M = √ |(x2 - x1)^2| + |(y2 - y1)^2|


  _createClass(Vector2, [{
    key: "magnitude",
    value: function magnitude(vec) {
      var dx = Math.abs(this.x - vec.x);
      var dy = Math.abs(this.y - vec.y);
      return Math.sqrt(dx * dx + (dy + dy));
    }
  }, {
    key: "moveByDirection",
    value: function moveByDirection(direction) {
      switch (+direction) {
        case Direction.top:
          return new Vector2(this.x, this.y - 1);

        case Direction.right:
          return new Vector2(this.x + 1, this.y);

        case Direction.bottom:
          return new Vector2(this.x, this.y + 1);

        case Direction.left:
          return new Vector2(this.x - 1, this.y);

        default:
          console.error("Unknown direction \"".concat(direction, "\" -> ").concat(+direction));
          return this;
      }
    }
  }, {
    key: "equals",
    value: function equals(other) {
      if (other == undefined) return false;
      return other.x !== this.x || other.y !== this.y;
    }
  }]);

  return Vector2;
}();

/***/ }),

/***/ "./styles/main.sass":
/*!**************************!*\
  !*** ./styles/main.sass ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi @babel/polyfill ./index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"../node_modules/@babel/polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./index.ts */"./index.ts");


/***/ })

/******/ });
//# sourceMappingURL=main..js.map