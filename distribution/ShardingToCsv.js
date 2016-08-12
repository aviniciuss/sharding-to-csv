'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardingToCsv = undefined;

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

    _this.file = file;
    _this.opts = opts || {};
    _this.opts.encoding = _this.opts.encoding || 'utf-8';
    _this.opts.maxFileSize = _this.opts.maxFileSize || 536870912;
    _this.initialize();
    return _this;
  }

  _createClass(ShardingToCsv, [{
    key: 'initialize',
    value: function initialize() {
      this.count = 0;
      this.bytes = 0;
      this.header = null;
      this.filename = _path2.default.basename(this.file, _path2.default.extname(this.file));
      this.writeStream = _fs2.default.createWriteStream(_path2.default.dirname(this.file) + '/' + this.filename + '-' + this.count + '.csv');
      this.readStream = _fs2.default.createReadStream(this.file).pipe(_iconvLite2.default.decodeStream(this.opts.encoding));
      this.rl = new _Readline.Readline(this.readStream);
    }
  }, {
    key: 'shard',
    value: function shard() {
      var _this2 = this;

      this.rl.on('line', function (line, lineCount, byteCount) {
        _this2.writeLine(line, lineCount, byteCount);
      });

      this.rl.on('close', function () {
        if (_fs2.default.existsSync(_this2.file)) {
          _fs2.default.unlinkSync(_this2.file);
        }
        _this2.emit('completed');
      });

      return this;
    }
  }, {
    key: 'writeLine',
    value: function writeLine(line, lineCount, byteCount) {
      this.bytes += line.length;
      if (lineCount === 0) {
        this.header = _iconvLite2.default.encode(line + '\n', this.opts.encoding);
      }

      this.writeStream.write(_iconvLite2.default.encode(line + '\n', this.opts.encoding));

      if (this.bytes >= this.opts.maxFileSize) {
        this.count++;
        this.bytes = 0;
        this.writeStream.end();
        this.writeStream = _fs2.default.createWriteStream(_path2.default.dirname(this.file) + '/' + this.filename + '-' + this.count + '.csv');
        this.writeStream.write(this.header);
      }
    }
  }]);

  return ShardingToCsv;
}(_events.EventEmitter);