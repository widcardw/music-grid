import type { Component } from 'solid-js'
import { Show, createResource, createSignal } from 'solid-js'
import { searchSong } from '../../utils/request'
import type { SongType } from '../../utils/types'
import { SuspenseGrid } from '../SuspenseGrid'

const SearchDialog: Component<{
  onSelect: (song: SongType) => any
  onClose?: () => any
  onFill: (name: string) => any
}> = ({ onSelect, onClose, onFill }) => {
  const [state, setState] = createSignal({ keyword: '', page: 0 })
  const [data] = createResource(state, searchSong)
  const [el, setEl] = createSignal<HTMLInputElement>()
  function onInputEnter(e: KeyboardEvent) {
    if (e.code !== 'Enter')
      return
    setState({ keyword: (e.target as HTMLInputElement).value, page: 0 })
    // if (state.keyword.trim() !== '')
    //   refetch()
  }
  function onPageChange(v: number) {
    const newPage = state().page + v
    if (newPage < 0 || newPage > 300 || state().keyword.trim() === '')
      return
    setState(p => ({ keyword: p.keyword, page: newPage }))
    // if (state.keyword.trim() !== '')
    //   refetch()
  }
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 px-4 py-8 of-auto bg-black/70">
      <div class="mx-a w-840px space-y-2 bg-white/100 p-4 rounded">
        <input
          ref={setEl}
          value={state().keyword}
          autofocus={true}
          class="cus-input"
          placeholder='输入关键词 查询歌曲'
          onKeyDown={onInputEnter}
        >
        </input>
        <Show when={state().keyword.trim() !== ''}>
          <SuspenseGrid data={data} onSelect={onSelect} />
        </Show>
        <div class="text-center space-x-2">
          <button
            class="page"
            disabled={state().keyword.trim() === '' || data.loading}
            onClick={() => onPageChange(-1)}
          >&lt;
          </button>
          <button class="page" onClick={onClose}>x</button>
          <button
            class="page"
            disabled={state().keyword.trim() === '' || data.loading}
            onClick={() => onPageChange(1)}
          >&gt;
          </button>
        </div>
        <div class="text-center">
          <button class="page" onClick={() => onFill(el().value)}>没有找到想要的？直接填入吧</button>
        </div>
      </div>
    </div>
  )
}

export {
  SearchDialog,
}
