var ShardingToCsv = require('./distribution/ShardingToCsv').ShardingToCsv;

var sharding = new ShardingToCsv('./cangooroo_data_cache_destinos.csv', { encoding: 'iso-8859-1', maxFileSize: 10485760 }).shard();

sharding.on('completed', () => console.log('completed'));

sharding.on('error', err => console.log(err));
