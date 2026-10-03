# Paleta pintor
Aplicación educativa estática, en español, para móvil, tableta y ordenador.
URL: https://ricardoyf.github.io/Roma/paleta-pintor/

- Aprendizaje guiado con cinco niveles y mapa de colores.
- Laboratorio de gotas con cantidades variables.
- Cuatro tipos de juegos, reconocimiento de primarios y reto mixto.
- Paleta del pintor: ocho barras (primarios, secundarios, blanco y negro), resultado en directo, recetas de 16 colores y porcentajes que suman 100%.
- Progreso y paleta guardados únicamente en este navegador.
- Sin anuncios, cuentas, servidor ni dependencias externas.
- Service worker limitado a esta carpeta para uso sin conexión después de una primera visita completa.

Las mezclas son una simulación educativa RYB. Los secundarios se descomponen en cantidades iguales de sus primarios y blanco/negro aclaran/oscurecen el resultado. Una receta mostrada es una composición posible, no la única.

Comprobaciones: `node paleta-pintor/tests/core.cjs` desde la raíz del repositorio.
Para publicar, mantener esta carpeta en la rama que ya usa GitHub Pages. No requiere compilación.
