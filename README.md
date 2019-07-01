# mdLinks (Markdown Links)

Markdown es un lenguaje de marcado ligero muy popular entre developers. 
Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), 
y es común encontrar archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen enlaces que
muchas veces están rotos o no son válidos y eso perjudica el valor de
la información que se quiere compartir.

## Proyecto

Crear una librería, usando el entorno de Node.js que permita al usuario leer archivos
markdown y retorne cuántos enlaces hay en el archivo, cuántos son válidos y cuántos no, 
además de la ruta en la que se encuentran.

** Diagrama de flujo **


## mdLinks - API

- Instalación de la librería: `npm install --global frankynztein/LIM009-fe-md-links`

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio.
- `options`: booleano * `validate`, para determinar si se desean validar los enlaces. 
(`false` por default).

### CLI (Command Line Interface - Interfaz de Línea de Comando)

Puedes ejecutar la librería a través de la terminal usando

`md-links <path-to-file> [options]`

Ejemplo:

```sh
$ md-links ./some/example.md
./some/example.md http://algo.com/2/3/ Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html algún doc
./some/example.md http://google.com/ Google
```

#### Options

##### `--validate`

Con la opción `--validate`, el módulo hará una petición HTTP que permite verificar
si el enlace funciona o no.

Ejemplo:

```sh13d99df067c1
$ md-13d99df067c1
./some/example.md http://algo.com/2/3/ ok 200 Link a algo
./some/example.md https://otra-cosa.net/algun-doc.html fail 404 algún doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

Con la opción `--stats` el output del módulo será un texto con estadísticas
básicas sobre los enlaces.

```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Combinando `--validate` y `--stats` el resultado nos arrojará los enlaces rotos.

```sh
$ md-links ./some/example.md --validate --stats
Total: 3
Unique: 3
BrokenLinks: 1
```
