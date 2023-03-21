import type { Accessor, Component, Resource } from 'solid-js'
import type { ResponseType } from '../../utils/types'
import type { SearchState } from '../SearchDialog'

const Pagination: Component<{
  onChange: (v: number) => any
  onClose: () => void
  data: Resource<ResponseType>
  state: Accessor<SearchState>
}> = (props) => {
  return (
    <div class="text-center space-x-2">
      <button
        class="page"
        disabled={props.state().keyword.trim() === '' || props.data.loading || props.state().page < 1}
        onClick={() => props.onChange(-1)}
      >&lt;
      </button>
      <button class="page" onClick={() => props.onClose()}>x</button>
      <button
        class="page"
        disabled={props.state().keyword.trim() === '' || props.data.loading || props.state().page > 99}
        onClick={() => props.onChange(1)}
      >&gt;
      </button>
    </div>
  )
}

export {
  Pagination,
}
