# TextInput

Campo de entrada de texto de una línea.

## Qué es

Un `<input>` estilizado con la clase de controles del design system.

## Props

Acepta todos los props nativos de `<input>` HTML: `type`, `placeholder`, `value`, `onChange`, `disabled`, `name`, etc.

## Cómo funciona

- Renderiza un `<input class="ui-control">` que hereda los estilos base compartidos con `TextArea` y `SelectField`
- Todos los props se pasan directamente al `<input>` vía spread

## Uso

```jsx
import { TextInput } from '@/components'

<TextInput placeholder="Escribe aquí..." />
<TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<TextInput type="password" disabled />
```
