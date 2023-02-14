import type { Component } from 'solid-js'
import { Show, createResource, createSignal } from 'solid-js'
import { searchSong } from '../../utils/request'
import type { SongType } from '../../utils/types'
import { Pagination } from '../Pagination'
import { SuspenseGrid } from '../SuspenseGrid'

type FormSubmitEvent = Event & {
  submitter: HTMLElement
} & {
  currentTarget: HTMLFormElement
  target: Element
}

interface SearchState {
  keyword: string
  page: number
}

const SearchDialog: Component<{
  onSelect: (song: SongType) => any
  onClose?: () => any
  onFill: (name: string) => any
  onClear: () => any
}> = ({ onSelect, onClose, onFill, onClear }) => {
  const [state, setState] = createSignal<SearchState>({ keyword: '', page: 0 }, {
    equals: (prev, next) => prev.keyword.trim() === next.keyword.trim() && prev.page === next.page,
  })
  const [data] = createResource(state, searchSong)
  const [el, setEl] = createSignal<HTMLInputElement>()
  function onInputEnter(e: FormSubmitEvent) {
    e.preventDefault()
    setState({
      keyword: el().value,
      page: 0,
    })
  }
  function onPageChange(v: number) {
    const newPage = state().page + v
    if (newPage < 0 || newPage > 100 || state().keyword.trim() === '')
      return
    setState(p => ({ keyword: p.keyword, page: newPage }))
  }
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 px-4 py-8 of-auto bg-black/70">
      <div class="mx-a w-840px space-y-2 bg-white/100 p-4 rounded">
        <form onSubmit={onInputEnter} action="">
          <input
            ref={setEl}
            type="search"
            value={state().keyword}
            autofocus={true}
            class="cus-input"
            placeholder='输入关键词 查询歌曲'
          >
          </input>
        </form>
        <Show when={state().keyword.trim() !== ''}>
          <SuspenseGrid data={data} onSelect={onSelect} />
        </Show>
        <Pagination
          data={data}
          state={state}
          onChange={i => onPageChange(i)}
          onClose={onClose}
        />
        <div class="text-center space-x-2">
          <button class="page" onClick={() => onFill(el().value)}>没有找到想要的？直接填入吧</button>
          <button class="page" onClick={onClear}>清除这个格子</button>
        </div>
      </div>
    </div>
  )
}

export {
  SearchDialog,
}

export type {
  SearchState,
}
