# Guía de Personalización de Colores

Toda la paleta de colores de la aplicación se controla desde **un solo archivo**:

```
src/styles/tokens.css
```

Solo necesitas cambiar los valores hexadecimales de las variables CSS. No hay que tocar ningún componente.

---

## Regla 60 / 30 / 10

El sistema de colores sigue la regla de diseño 60/30/10:

| Porcentaje | Rol | Variables | Qué afecta |
|:--:|---|---|---|
| **60%** | Superficies base | `--color-bg-page`, `--color-bg-surface`, `--color-bg-elevated`, `--color-bg-sunken` | Fondo de la página, tarjetas, sidebar, inputs, áreas elevadas |
| **30%** | UI / Chrome neutral | `--color-text-*`, `--color-border-*`, `--color-bg-active`, `--color-bg-hover` | Textos, bordes, estados hover/active |
| **10%** | Acento / Marca | `--color-accent`, `--color-accent-soft`, `--color-accent-hover` | Botones primarios, elementos activos del sidebar, links destacados |

---

## Variables y qué controlan

### 60% — Superficies base

```css
--color-bg-page:       #f2f0ed;   /* Fondo general de toda la página */
--color-bg-surface:    #ffffff;   /* Fondo del sidebar, modals, drawers, inputs */
--color-bg-elevated:   #f8f7f5;   /* Tarjetas, filas de tabla hover, badges */
--color-bg-sunken:     #eae8e4;   /* Áreas hundidas: skeleton, progress bar bg, avatares */
```

> **Tip**: `bg-page` es el más visible — es el fondo de todo. `bg-surface` es el segundo — sidebar y paneles. Mantené `bg-page` ligeramente más oscuro que `bg-surface` para crear profundidad.

### 30% — Textos, bordes y estados

```css
/* Textos (de más oscuro a más claro) */
--color-text-primary:     #1a1a1a;   /* Títulos, texto principal */
--color-text-secondary:   #6b6b6b;   /* Descripciones, labels */
--color-text-muted:       #9a9a9a;   /* Texto terciario, counters */
--color-text-placeholder: #b5b5b5;   /* Placeholders de inputs */
--color-text-inverse:     #ffffff;   /* Texto sobre botones primarios oscuros */

/* Bordes */
--color-border:        #e0ddd8;   /* Bordes principales (inputs, cards) */
--color-border-light:  #ebe8e3;   /* Bordes sutiles (dividers, rows) */

/* Estados interactivos */
--color-bg-active:     #ece9e3;   /* Fondo del item activo/seleccionado */
--color-bg-hover:      #f5f3ef;   /* Fondo al hacer hover */
```

### 10% — Acento / Marca

```css
--color-accent:        #1a1a1a;   /* Color principal de marca — botones, indicadores activos */
--color-accent-soft:   #f0eeeb;   /* Versión suave del acento — focus rings, badges */
--color-accent-hover:  #333333;   /* Hover de botones primarios */
```

> **Para cambiar el color de marca**: solo cambiá estas 3 variables. Por ejemplo, para un acento azul:
> ```css
> --color-accent:       #2563eb;
> --color-accent-soft:  #dbeafe;
> --color-accent-hover: #1d4ed8;
> ```

### Semánticos — Feedback

```css
--color-success:       #22c55e;   /* Verde — estados exitosos */
--color-success-soft:  #dcfce7;   /* Verde suave — fondo de alertas/badges */
--color-warning:       #f59e0b;   /* Amarillo — advertencias */
--color-warning-soft:  #fef3c7;
--color-info:          #3b82f6;   /* Azul — información */
--color-info-soft:     #dbeafe;
--color-danger:        #ef4444;   /* Rojo — errores, destructivo */
--color-danger-soft:   #fee2e2;
```

---

## Ejemplos rápidos

### Tema claro neutro (default original)

```css
--color-bg-page:       #f2f0ed;
--color-bg-surface:    #ffffff;
--color-bg-elevated:   #f8f7f5;
--color-bg-sunken:     #eae8e4;
--color-accent:        #1a1a1a;
--color-accent-soft:   #f0eeeb;
--color-accent-hover:  #333333;
```

### Tema con acento azul

```css
--color-bg-page:       #f0f4f8;
--color-bg-surface:    #ffffff;
--color-bg-elevated:   #f5f8fc;
--color-bg-sunken:     #e2e8f0;
--color-accent:        #2563eb;
--color-accent-soft:   #dbeafe;
--color-accent-hover:  #1d4ed8;
--color-text-inverse:  #ffffff;
```

### Tema con acento verde

```css
--color-bg-page:       #f0fdf4;
--color-bg-surface:    #ffffff;
--color-bg-elevated:   #f5fdf8;
--color-bg-sunken:     #dcfce7;
--color-accent:        #16a34a;
--color-accent-soft:   #dcfce7;
--color-accent-hover:  #15803d;
```

### Tema oscuro

```css
--color-bg-page:       #0f0f0f;
--color-bg-surface:    #1a1a1a;
--color-bg-elevated:   #262626;
--color-bg-sunken:     #0a0a0a;

--color-text-primary:     #f5f5f5;
--color-text-secondary:   #a3a3a3;
--color-text-muted:       #737373;
--color-text-placeholder: #525252;
--color-text-inverse:     #0f0f0f;

--color-border:        #2e2e2e;
--color-border-light:  #262626;
--color-bg-active:     #2e2e2e;
--color-bg-hover:      #1f1f1f;

--color-accent:        #3b82f6;
--color-accent-soft:   #1e3a5f;
--color-accent-hover:  #60a5fa;
```

---

## Paso a paso para cambiar colores

1. Abrí `src/styles/tokens.css`
2. Localizá la sección que querés cambiar (superficies, acento, textos, etc.)
3. Reemplazá los valores hexadecimales
4. Guardá el archivo — Vite aplica los cambios en caliente (hot reload)
5. Verificá el contraste: los textos deben ser legibles sobre los fondos

## Consejos

- **No cambies nombres de variables** — solo los valores (`#hex`)
- **Mantené contraste**: text-primary debe contrastar bien con bg-surface y bg-page
- **Accent-soft** debe ser un tono muy claro del accent — se usa para focus rings y badges
- **Text-inverse** debe contrastar con el accent — aparece sobre botones primarios
- Usá herramientas como [Coolors](https://coolors.co) o [Realtime Colors](https://realtimecolors.com) para generar paletas armónicas
- Para verificar accesibilidad: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker)
