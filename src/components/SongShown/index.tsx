import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'
import type { MayBeSong } from '../../utils/types'
import { SongView } from '../SongView'

const SongShown: Component<{
  song: MayBeSong
  onClick: (id: number) => any
}> = (props) => {
  return (
    <div class="cursor-pointer shadow p-2" onClick={() => props.onClick(props.song.index)}>
      <strong>{props.song.label}</strong>
      <Switch>
        <Match when={props.song.type === 'label'}>
          <div class="w-200px h-200px"></div>
        </Match>
        <Match when={props.song.type === 'song'}>
          {/* @ts-expect-error type error */}
          <SongView song={props.song} />
        </Match>
        <Match when={props.song.type === 'onlyname'}>
          <div class="w-200px h-200px flex justify-center items-center">
            {/* @ts-expect-error type error */}
            {props.song.name}
          </div>
        </Match>
      </Switch>
    </div>
  )
}

export {
  SongShown,
}
