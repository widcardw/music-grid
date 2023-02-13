import type { Component, Resource } from 'solid-js'
import { Show } from 'solid-js'
import type { ResponseType, SongType } from '../../utils/types'
import { GridView } from '../GridView'

const SuspenseGrid: Component<{
  data: Resource< ResponseType>
  onSelect: (song: SongType) => any
}> = (props) => {
  return (
    <Show when={!props.data.loading} fallback={<div>Loading...</div>}>
      <Show when={props.data().code === 200}>
        <GridView data={props.data().result.songs} onSelect={props.onSelect} />
      </Show>
    </Show>
  )
}

export {
  SuspenseGrid,
}
