# Portfolio — Juan Moreno Trezza

Portfolio personal de desarrollador frontend, con estética editorial suiza: proyectos destacados, archivo completo filtrable, formación, stack, certificaciones y contacto.

**Demo en vivo → [juantrezza.github.io/porfolio](https://juantrezza.github.io/porfolio/)**

## Stack

React 19 + TypeScript · Vite · Tailwind CSS 3 · GitHub Actions → GitHub Pages

## Correrlo localmente

```bash
git clone https://github.com/JuanTrezza/porfolio.git
cd porfolio
npm install
npm run dev   # http://localhost:3000/porfolio/
```

## Estructura

```
src/
├── components/   # secciones, navbar, footer y modal de proyecto
├── data/         # portfolioData.ts: todo el contenido (proyectos, formación, stack, certificaciones)
└── assets/       # capturas de los proyectos destacados
public/           # foto.png y CV_Juan_Moreno_Trezza.pdf
```

Para editar contenido, todo está en `src/data/portfolioData.ts`. Los proyectos con `featured: true` se muestran como destacados, en el orden del archivo.

La versión anterior del portfolio está en la rama [`v1-backup`](https://github.com/JuanTrezza/porfolio/tree/v1-backup).

## Autor

**Juan Moreno Trezza** — [LinkedIn](https://www.linkedin.com/in/juanmorenotrezza/) · [GitHub](https://github.com/JuanTrezza) · [Behance](https://www.behance.net/juanmorenotrezza)
