'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardingToCsv = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _events = require('events');

var _Readline = require('./utils/Readline');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ShardingToCsv = exports.ShardingToCsv = function (_EventEmitter) {
  _inherits(ShardingToCsv, _EventEmitter);

  function ShardingToCsv(file, opts) {
    _classCallCheck(this, ShardingToCsv);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShardingToCsv).call(this));

    if (typeof file !== 'string') {
      throw new Error('Param file invalid!');
    }
    if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) !== 'object') {
      throw new Error('Param opts invalid!');
    }
    _this._file = file;
    _this._opts = opts || {};
    _this._initialize();
    return _this;
  }

  _createClass(ShardingToCsv, [{
    key: 'shard',
    value: function shard() {
      var _this2 = this;

      var rl = new _Readline.Readline(_fs2.default.createReadStream(this._file).pipe(_iconvLite2.default.decodeStream(this._opts.encoding)));

      rl.on('line', function (line, lineCount, byteCount) {
        return _this2._writeLine(line, lineCount, byteCount);
      });

      rl.on('close', function () {
        if (_fs2.default.existsSync(_this2._file)) {
          _fs2.default.unlinkSync(_this2._file);
        }
        _this2.emit('completed');
      });

      rl.on('error', function (err) {
        return _this2.emit('error', err);
      });

      return this;
    }
  }, {
    key: '_initialize',
    value: function _initialize() {
      this._opts.encoding = this._opts.encoding || 'utf-8';
      this._opts.maxFileSize = this._opts.maxFileSize || 536870912;
      this._count = 0;
      this._bytes = 0;
      this._filename = _path2.default.basename(this._file, _path2.default.extname(this._file));
      this._writeStream = _fs2.default.createWriteStream(_path2.default.dirname(this._file) + '/' + this._filename + '-' + this._count + '.csv');
    }
  }, {
    key: '_writeLine',
    value: function _writeLine(line, lineCount, byteCount) {
      var encodingLine = _iconvLite2.default.encode(line + '\n', this._opts.encoding);
      this._bytes += line.length;

      if (lineCount === 0) {
        this._setHeaderFile(encodingLine);
      }

      this._writeStream.write(encodingLine);

      if (this._bytes >= this._opts.maxFileSize) {
        this._bytes = 0;
        this._writeStream.end();
        this._newShard();
      }
    }
  }, {
    key: '_setHeaderFile',
    value: function _setHeaderFile(line) {
      this._header = line;
    }
  }, {
    key: '_newShard',
    value: function _newShard() {
      this._count++;
      this._writeStream = _fs2.default.createWriteStream(_path2.default.dirname(this._file) + '/' + this._filename + '-' + this._count + '.csv');
      this._writeStream.write(this._header);
    }
  }]);

  return ShardingToCsv;
}(_events.EventEmitter);