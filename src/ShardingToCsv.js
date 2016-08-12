import iconv from 'iconv-lite';
import fs from 'fs';
import path from 'path';
import { EventEmitter } from 'events';
import { Readline } from './utils/Readline';

export class ShardingToCsv extends EventEmitter {
  constructor(file, opts) {
    super();
    this.file = file;
    this.opts = opts || {};
    this.opts.encoding = this.opts.encoding || 'utf-8';
    this.opts.maxFileSize = this.opts.maxFileSize || 536870912;
    this.initialize();
  }

  initialize() {
    this.count = 0;
    this.bytes = 0;
    this.header = null;
    this.filename = path.basename(this.file, path.extname(this.file));
    this.writeStream = fs.createWriteStream(`${path.dirname(this.file)}/${this.filename}-${this.count}.csv`);
    this.readStream = fs.createReadStream(this.file).pipe(iconv.decodeStream(this.opts.encoding));
    this.rl = new Readline(this.readStream);
  }

  shard() {
    this.rl.on('line', (line, lineCount, byteCount) => { this.writeLine(line, lineCount, byteCount); });

    this.rl.on('close', () => {
      if(fs.existsSync(this.file)) {
        fs.unlinkSync(this.file);
      }
      this.emit('completed');
    });

    return this;
  }

  writeLine(line, lineCount, byteCount) {
    this.bytes += line.length;
    if(lineCount === 0) {
      this.header = iconv.encode(`${line}\n`, this.opts.encoding);
    }

    this.writeStream.write(iconv.encode(`${line}\n`, this.opts.encoding));

    if(this.bytes >= this.opts.maxFileSize) {
      this.count++;
      this.bytes = 0;
      this.writeStream.end();
      this.writeStream = fs.createWriteStream(`${path.dirname(this.file)}/${this.filename}-${this.count}.csv`);
      this.writeStream.write(this.header);
    }
  }
}
