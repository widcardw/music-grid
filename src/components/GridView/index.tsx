import type { Component } from 'solid-js'
import { For } from 'solid-js'
import type { SongType } from '../../utils/types'
import { SongView } from '../SongView'

const GridView: Component<{
  data: SongType[]
  onSelect: (id: SongType) => any
}> = (props) => {
  return (
    <div class="grid grid-cols-4 gap-4">
      <For each={props.data}>
        {song => (
          <SongView
            song={song}
            onClick={props.onSelect}
          />)}
      </For>
    </div>
  )
}

export {
  GridView,
}
