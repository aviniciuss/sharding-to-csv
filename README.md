# Sharding to CSV

> Distribui um grande arquivo csv em partes.

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

Um simples módulo para NodeJS. Com a função de particionar arquivos grandes.

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
ou
import { ShardingToCsv } from 'sharding-to-csv';

new ShardingToCsv('./path/file.csv', { encoding: 'iso-8859-1', maxFileSize: 536870912 }).shard().on('completed', () => {
    console.log('completed');
});
```

## Licença
- MIT
