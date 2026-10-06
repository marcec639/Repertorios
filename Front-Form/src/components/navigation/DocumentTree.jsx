import './DocumentTree.css'

function TreeNode({ node, depth = 0 }) {
  return (
    <>
      <div className="ui-doc-tree__node" style={{ paddingLeft: `${depth * 20}px` }}>
        <span className="ui-doc-tree__icon">📁</span>
        <span className="ui-doc-tree__label">{node.label}</span>
        {node.count != null ? <span className="ui-doc-tree__count">{node.count}</span> : null}
      </div>
      {node.children?.map((child) => (
        <TreeNode key={child.label} node={child} depth={depth + 1} />
      ))}
    </>
  )
}

export function DocumentTree({ nodes = [] }) {
  return (
    <div className="ui-doc-tree">
      {nodes.map((node) => (
        <TreeNode key={node.label} node={node} />
      ))}
    </div>
  )
}
