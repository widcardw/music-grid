import type { Component } from 'solid-js'
import { Show, createResource, createSignal } from 'solid-js'
import { onClickOutside } from 'solidjs-use'
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
}> = (props) => {
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

  const [target, setTarget] = createSignal<HTMLDivElement>()
  // eslint-disable-next-line solid/reactivity
  onClickOutside(target, () => props.onClose())
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 px-4 py-8 of-auto bg-black/70">
      <div ref={setTarget} class="mx-a w-840px space-y-2 bg-white/100 p-4 rounded">
        <form onSubmit={onInputEnter} action="">
          <input
            ref={setEl}
            type="search"
            autofocus={true}
            class="cus-input"
            placeholder='输入关键词 查询歌曲'
          />
        </form>
        <Show when={state().keyword.trim() !== ''}>
          <SuspenseGrid data={data} onSelect={props.onSelect} />
        </Show>
        <Pagination
          data={data}
          state={state}
          onChange={onPageChange}
          onClose={props.onClose}
        />
        <div class="text-center space-x-2">
          <button
            class="page"
            onClick={() => props.onFill(el().value)}
            disabled={state().keyword.trim() === ''}
          >没有找到想要的？直接填入吧
          </button>
          <button class="page" onClick={() => props.onClear()}>清除这个格子</button>
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
