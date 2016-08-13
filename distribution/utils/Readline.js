'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Readline = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Readline = exports.Readline = function (_EventEmitter) {
  _inherits(Readline, _EventEmitter);

  function Readline(stream) {
    _classCallCheck(this, Readline);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Readline).call(this));

    if ((typeof stream === 'undefined' ? 'undefined' : _typeof(stream)) !== 'object') {
      throw new Error('Param stream invalid!');
    }
    _this._input = stream;
    _this._initialize();
    return _this;
  }

  _createClass(Readline, [{
    key: '_initialize',
    value: function _initialize() {
      var _this2 = this;

      this._lineCount = 0;
      this._byteCount = 0;

      var rl = this._createReadline();

      rl.on('open', function (fd) {
        return _this2._open(fd);
      });
      rl.on('line', function (line) {
        return _this2._line(line);
      });
      rl.on('error', function (err) {
        return _this2._error(err);
      });
      rl.on('close', function () {
        return _this2._close();
      });
    }
  }, {
    key: '_createReadline',
    value: function _createReadline() {
      return _readline2.default.createInterface({
        input: this._input,
        terminal: false
      });
    }
  }, {
    key: '_open',
    value: function _open(fd) {
      this.emit('open', fd);
    }
  }, {
    key: '_line',
    value: function _line(line) {
      this._byteCount += line.length;
      this.emit('line', line, this._lineCount, this._byteCount);
      this._lineCount++;
    }
  }, {
    key: '_error',
    value: function _error(err) {
      this.emit('error', err);
    }
  }, {
    key: '_close',
    value: function _close() {
      this.emit('close');
    }
  }]);

  return Readline;
}(_events.EventEmitter);