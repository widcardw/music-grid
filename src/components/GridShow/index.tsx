import type { Component } from 'solid-js'
import { For } from 'solid-js'
import type { MayBeSong } from '../../utils/types'
import { SongShown } from '../SongShown'

const GridShow: Component<{
  data: MayBeSong[]
  onSelect: (id: number) => any
}> = (props) => {
  return (
    <div class="grid grid-cols-5 gap-2">
      <For each={props.data}>
        {song => <SongShown song={song} onClick={props.onSelect} />}
      </For>
    </div>

  )
}

export {
  GridShow,
}
