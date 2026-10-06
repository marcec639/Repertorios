# TextArea

Campo de entrada de texto multilínea.

## Qué es

Un `<textarea>` estilizado con la clase de controles del design system.

## Props

Acepta todos los props nativos de `<textarea>` HTML: `placeholder`, `value`, `onChange`, `disabled`, `name`, `rows`, etc.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `rows` | `number` | `4` | Número de filas visibles por defecto |

## Cómo funciona

- Renderiza un `<textarea class="ui-control">` con `rows={4}` por defecto
- Comparte los mismos estilos de `Controls.css` que `TextInput`
- Todos los props se pasan directamente al `<textarea>` vía spread

## Uso

```jsx
import { TextArea } from '@/components'

<TextArea placeholder="Escribe una descripción..." />
<TextArea rows={8} value={desc} onChange={(e) => setDesc(e.target.value)} />
```
