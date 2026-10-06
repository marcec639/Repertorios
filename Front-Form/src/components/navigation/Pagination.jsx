import './Pagination.css'

export function Pagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="ui-pagination">
      <button type="button" onClick={onPrevious} disabled={page <= 1}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button type="button" onClick={onNext} disabled={page >= totalPages}>
        Next
      </button>
    </div>
  )
}
