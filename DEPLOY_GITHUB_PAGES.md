# 🚀 Guía de Deploy a GitHub Pages

## Requisitos Previos:
- Tener Git instalado
- Tener cuenta en GitHub
- Tener configurado EmailJS (opcional, pero recomendado)

## Opción 1: Subir a GitHub Pages (Recomendado)

### Paso 1: Crear un repositorio en GitHub
1. Ve a https://github.com/new
2. Nombre del repositorio: `portfolio` (o el que prefieras)
3. Haz clic en "Create repository"

### Paso 2: Clonar el repositorio
Abre Git Bash o Terminal en la carpeta de tu portfolio:

```bash
git init
git remote add origin https://github.com/tu_usuario/portfolio.git
```

Reemplaza `tu_usuario` con tu usuario de GitHub.

### Paso 3: Agregar los archivos
```bash
git add .
git commit -m "Portfolio inicial con formulario funcional"
git branch -M main
git push -u origin main
```

### Paso 4: Habilitar GitHub Pages
1. Ve a tu repositorio en GitHub
2. Abre "Settings" (Configuración)
3. En la barra izquierda, haz clic en "Pages"
4. En "Source", selecciona "main" y "/root"
5. Haz clic en "Save"
6. Espera 1-2 minutos

### ¡Listo! Tu portfolio estará en:
`https://tu_usuario.github.io/portfolio/`

---

## Opción 2: Actualizar después de cambios locales

Después de hacer cambios en tus archivos:

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

---

## Guía Rápida de Git

### Ver estado:
```bash
git status
```

### Ver cambios:
```bash
git diff
```

### Deshacer cambios:
```bash
git restore archivo.html
```

### Ver historial:
```bash
git log --oneline
```

---

## Solución de Problemas

### El portfolio no aparece después de push
- Espera 2-3 minutos
- Recarga la página con Ctrl+Shift+R (sin caché)
- Verifica que Settings > Pages esté configurado correctamente

### Los links de EmailJS no funcionan
- Verifica que configuraste EmailJS correctamente (ver INSTRUCCIONES_EMAILJS.md)
- Abre la consola (F12) y busca errores

### Los estilos no se ven correctamente
- Limpia caché del navegador (Ctrl+Shift+R)
- Verifica que los archivos CSS estén en la carpeta correcta

### Los links a los proyectos no funcionan
- Verifica que las URLs sean correctas
- Las URLs deben ser absolutas (completas)

---

## Checklist Antes de Deploy

- [ ] EmailJS configurado (si quieres formulario funcional)
- [ ] Todos los links probados en navegador
- [ ] Responsive testado en mobile y tablet
- [ ] Imágenes (SVG e PNG) están en la carpeta
- [ ] Archivos HTML, CSS están sin errores
- [ ] Meta tags configurados (title, description, viewport)

---

## Recomendaciones de Seguridad

1. **EmailJS Public Key**: Es seguro compartirla (es pública)
2. **Service ID y Template ID**: También son públicos
3. **Nunca compartas**: Credenciales de acceso a tu cuenta de EmailJS

---

## Dominio Personalizado (Opcional)

Si quieres usar un dominio personalizado (ej: tuportfolio.com):

1. Compra un dominio en GoDaddy, Namecheap, etc.
2. En GitHub Settings > Pages
3. En "Custom domain", ingresa tu dominio
4. Sigue las instrucciones de DNS

---

## Mantenimiento

### Actualizar contenido:
```bash
# Edita los archivos localmente
nano index.html

# Guarda cambios
git add .
git commit -m "Actualización de contenido"
git push origin main
```

### Agregar nuevos proyectos:
1. Edita la sección "Proyectos de Desarrollo"
2. Replica la estructura de una tarjeta existente
3. Agrega los nuevos links
4. Push a GitHub

---

## URLs de Referencia

- GitHub Pages Docs: https://pages.github.com/
- Git Documentation: https://git-scm.com/doc
- Portfolio Tuyo: https://github.com/tu_usuario/portfolio

---

## Próximos Pasos (Opcional)

1. **Agregar más proyectos**: Replica las tarjetas existentes
2. **Mejorar SEO**: Agrega meta tags y Open Graph
3. **Analytics**: Agrega Google Analytics
4. **PWA**: Convierte en Progressive Web App
5. **Dark Mode**: Agrega selector de tema

---

¡Tu portfolio está listo para el mundo! 🌍
