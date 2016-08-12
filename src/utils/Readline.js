import readline from 'readline';
import { EventEmitter } from 'events';

export class Readline extends EventEmitter {
  constructor(input) {
    super();
    this.input = input;
    this.initialize();
  }

  initialize() {
    this.lineCount = 0;
    this.byteCount = 0;

    let rl = readline.createInterface({
        input: this.input,
        terminal: false
    });

    rl.on('open', (fd) => { this.open(fd); });
    rl.on('line', (line) => { this.line(line); });
    rl.on('error', (err) => { this.error(err); });
    rl.on('close', () => { this.close(); });
  }

  open(fd) {
    this.emit('open', fd);
  }

  line(line) {
    this.byteCount += line.length;
    this.emit('line', line, parseInt(this.lineCount, 10), parseInt(this.byteCount, 10));
    this.lineCount++;
  }

  error(err) {
    this.emit('error', err);
  }

  close() {
    this.emit('close');
  }
}
