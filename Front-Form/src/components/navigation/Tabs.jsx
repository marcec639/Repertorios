import './Tabs.css'

export function Tabs({ tabs = [], activeTab, onChange }) {
  return (
    <div className="ui-tabs" role="tablist" aria-label="Sections">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`ui-tabs__tab ${activeTab === tab.id ? 'is-active' : ''}`}
          onClick={() => onChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
