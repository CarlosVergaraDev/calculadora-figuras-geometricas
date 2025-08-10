# 🧮 Calculadora Geométrica Interactiva

Una aplicación web interactiva para calcular el **área** y el **perímetro** de diversas figuras geométricas planas, construida con **JavaScript puro (Vanilla JS)**, enfocada en la manipulación segura del DOM y principios de diseño desacoplado y modular.

---

## 📌 Descripción General

Este proyecto ofrece una calculadora dinámica que permite al usuario seleccionar una figura (Triángulo Escaleno, Rectángulo, Cuadrado o Círculo) y calcular su área o perímetro. La interfaz de usuario se genera y controla completamente mediante JavaScript sin depender de frameworks ni librerías externas.

---

## ✨ Características Principales

- **Cálculo de Área y Perímetro**
- **Soporte para múltiples figuras**:
  - Triángulo Escaleno (área con fórmula de Herón)
  - Rectángulo
  - Cuadrado
  - Círculo
- **UI 100% dinámica** generada con JavaScript.
- **Manipulación segura del DOM**:
  - Evita `innerHTML` para prevenir XSS.
  - Usa `createElement`, `textContent`, y `appendChild`.
- **Separación de responsabilidades** en la lógica.
- **Responsivo**: Estilos CSS básicos adaptables a distintos tamaños de pantalla.

---

## 🧠 Arquitectura

### 🔧 Enfoque basado en configuración
Se define un objeto `FIGURAS` que centraliza la lógica de cada figura (nombre, campos requeridos y funciones de cálculo). Esto permite extender fácilmente la aplicación con nuevas figuras sin modificar el flujo base.

### ♻️ Generación dinámica del DOM
Toda la interfaz (inputs, radios, resultados) se genera y destruye dinámicamente en función de las selecciones del usuario, optimizando el uso de memoria y manteniendo un DOM limpio.

### 🔐 Seguridad
Se evita el uso de `innerHTML`. Se construyen elementos HTML de forma segura para proteger contra ataques de tipo Cross-Site Scripting (XSS).

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| **HTML5**  | Estructura del documento y punto de anclaje de la app. |
| **CSS3**   | Estilizado visual, diseño flexible con Flexbox. |
| **JavaScript (ES6+)** | Lógica, renderizado de UI, eventos, cálculos y validaciones. |

---

## 📁 Estructura del Proyecto

```bash

├── README.md
└── docs/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── js/
    │   └── script.js
    ├── favicon.ico
    ├── favicon-32x32.png
    ├── favicon-16x16.png
    ├── apple-touch-icon.png
    ├── site.webmanifest

---

✅ **Nota:** `index.html` debe estar dentro de `/public/` si se despliega en plataformas como **Vercel**.  
Los favicons pueden ir directamente en `public/` para rutas absolutas (`/favicon.ico`).

---

## 🚀 Cómo Ejecutar Localmente

Clona este repositorio:

```bash
git clone https://github.com/tuusuario/tu-repo.git
cd tu-repo

Abre el archivo public/index.html en tu navegador preferido.

⚠️ No se requiere servidor ni bundler: todo corre directamente en navegador.

👨‍💻 Autor
Desarrollado por Carlos Vergara.
Proyecto educativo basado en fundamentos de manipulación del DOM, cálculo matemático y diseño modular.