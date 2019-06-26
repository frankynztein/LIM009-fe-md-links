import { mdLinksCli } from '../src/cli.js';
import { path } from "path";

// const arguments = process.argv.slice(2);

let result1 = 'https://twiter.com/frankynztein/lists/b - C:/Users/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md - Broken Twitter'
let result2 = 'https://twiter.com/frankynztein/lists/b - C:/Users/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md - Fail - Fail - Broken Twitter'
let result3 = 'Total: 7 \nUnique: 7'
let result4 = 'Total: 7 \nUnique: 7 \nBrokenLinks: 5'

describe('mdLinksCli', () => {
  it('Debería retornar una línea de texto con href, path y text de cada enlace cuando sólo paso una ruta como argumento', () => {
    return mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md', undefined, undefined).then(result => {
      expect(result).toEqual(result1)
    });
  });

  it('Debería retornar una línea de texto con href, path, text, status y statusText cuando paso ruta y --validate como argumentos', () => {
    return (mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode/prueba-mdlinks.md', '--validate', undefined).then(result => {
      expect(result).toEqual(result2)
    }));
  });

  it('Debería retornar una línea de texto con el total de enlaces encontrados y cuántos son únicos cuando paso la ruta y --stats como argumentos', () => {
    return(mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode', '--stats', undefined)).then(result => {
      expect(result).toEqual(result3)
    });
  });

  it('Debería retornar una línea de texto con el total de enlaces encontrados, cuántos son únicos y cuántos están rotos cuando paso la ruta, --validate y --stats como argumentos', () =>{
    return(mdLinksCli('C:/Users/Estefanía Telis/Documents/ProyectoNode', '--validate', '--stats').then(result => {
      expect(result).toEqual(result4)
    }));
  });

  // it('Probando otra cosa', () => {
  //   mdLinksCli(path.join(process.cwd(), 'ProyectoNode', 'prueba-mdlinks.md'), {validate: false}).then(result => {
  //     expect(result).toBe(`href: , path: ${join(`${process.cwd()}/folder/readmeTuto.md`)} , text : LABORATORIA\n`)
  //   })
  // })
});