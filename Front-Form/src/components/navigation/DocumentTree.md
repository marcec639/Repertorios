# DocumentTree

Árbol de documentos recursivo.

## Qué es

Un componente que renderiza una estructura jerárquica tipo explorador de archivos, con indentación visual por profundidad y contadores opcionales.

## Props

### DocumentTree

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `nodes` | `Array<TreeNode>` | `[]` | Nodos del árbol |

### TreeNode (estructura de datos)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `label` | `string` | Texto del nodo |
| `count` | `number` | Contador opcional (se muestra a la derecha) |
| `children` | `Array<TreeNode>` | Nodos hijos (recursivo) |

## Cómo funciona

- Renderiza `<div class="ui-doc-tree">` con un componente interno `TreeNode` recursivo
- Cada nodo se indenta con `paddingLeft: depth * 20px`
- Cada nodo muestra un ícono 📁, el label, y opcionalmente un contador
- Los hijos se renderizan recursivamente incrementando `depth`

## Uso

```jsx
import { DocumentTree } from '@/components'

<DocumentTree nodes={[
  {
    label: 'Proyectos',
    count: 12,
    children: [
      { label: 'Activos', count: 8 },
      { label: 'Archivados', count: 4 },
    ],
  },
  {
    label: 'Reportes',
    count: 5,
  },
]} />
```
