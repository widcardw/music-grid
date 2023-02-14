import type { Accessor, Component, Resource } from 'solid-js'
import type { ResponseType } from '../../utils/types'
import type { SearchState } from '../SearchDialog'

const Pagination: Component<{
  onChange: (v: number) => any
  onClose: () => void
  data: Resource<ResponseType>
  state: Accessor<SearchState>
}> = ({ onChange, onClose, data, state }) => {
  return (
    <div class="text-center space-x-2">
      <button
        class="page"
        disabled={state().keyword.trim() === '' || data.loading}
        onClick={() => onChange(-1)}
      >&lt;
      </button>
      <button class="page" onClick={onClose}>x</button>
      <button
        class="page"
        disabled={state().keyword.trim() === '' || data.loading}
        onClick={() => onChange(1)}
      >&gt;
      </button>
    </div>
  )
}

export {
  Pagination,
}
