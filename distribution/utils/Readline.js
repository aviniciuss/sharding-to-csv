'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Readline = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _readline = require('readline');

var _readline2 = _interopRequireDefault(_readline);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Readline = function (_EventEmitter) {
  _inherits(Readline, _EventEmitter);

  function Readline(input) {
    _classCallCheck(this, Readline);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Readline).call(this));

    _this.input = input;
    _this.initialize();
    return _this;
  }

  _createClass(Readline, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.lineCount = 0;
      this.byteCount = 0;

      var rl = _readline2.default.createInterface({
        input: this.input,
        terminal: false
      });

      rl.on('open', function (fd) {
        _this2.open(fd);
      });
      rl.on('line', function (line) {
        _this2.line(line);
      });
      rl.on('error', function (err) {
        _this2.error(err);
      });
      rl.on('close', function () {
        _this2.close();
      });
    }
  }, {
    key: 'open',
    value: function open(fd) {
      this.emit('open', fd);
    }
  }, {
    key: 'line',
    value: function line(_line) {
      this.byteCount += _line.length;
      this.emit('line', _line, parseInt(this.lineCount, 10), parseInt(this.byteCount, 10));
      this.lineCount++;
    }
  }, {
    key: 'error',
    value: function error(err) {
      this.emit('error', err);
    }
  }, {
    key: 'close',
    value: function close() {
      this.emit('close');
    }
  }]);

  return Readline;
}(_events.EventEmitter);

exports.Readline = Readline;