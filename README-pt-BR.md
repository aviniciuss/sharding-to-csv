# Sharding to CSV

> Particiona um grande arquivo csv em partes.

# Instalar
```
$ npm install sharding-to-csv
```

# Testes

```
$ npm install
$ npm test
```

# O que é isso?

Um simples módulo para NodeJS, com a função de particionar arquivos ".CSV" muito grandes, permitindo assim sua manipulação em aplicações com restrições de memória.

# API
## Parâmetros:
- `file` - caminho do arquivo.
- options:
    - `encoding` - encoding de read e write stream.
    - `maxFileSize` - tamanho dos arquivos particionados.

## Retorno:
- EventEmitter

# Usando
```javascript
var ShardingToCsv = require('sharding-to-csv').ShardingToCsv;

var sharding = new ShardingToCsv('./path/file.csv',
    { encoding: 'iso-8859-1', maxFileSize: 10485760 }).shard();

sharding.on('completed', () => console.log('completed'));

sharding.on('error', err => console.log(err));
```

## Licença
- MIT
