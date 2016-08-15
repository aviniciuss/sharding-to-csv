# Sharding to CSV

> Break a large csv file into small parts.

# Install
```
$ npm install sharding-to-csv
```

# Tests

```
$ npm install
$ npm test
```

# What is it?

A simple NodeJS module that breaks large csv files into small files to allow manipulation on applications with memory restrictions.

# API
## Parameters:
- `file` - The file path.
- options:
    - `encoding` - encoding to use with read and write streams.
    - `maxFileSize` - determines the size of partitioned files.

## Return:
- EventEmitter

# Using
```javascript
var ShardingToCsv = require('sharding-to-csv').ShardingToCsv;

var sharding = new ShardingToCsv('./path/file.csv',
    { encoding: 'iso-8859-1', maxFileSize: 10485760 }).shard();

sharding.on('completed', () => console.log('completed'));

sharding.on('error', err => console.log(err));
```

## License
- MIT
