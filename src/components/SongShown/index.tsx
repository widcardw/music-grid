import type { Component } from 'solid-js'
import { Match, Switch } from 'solid-js'
import type { MayBeSong, OnlyName, SongShownType } from '../../utils/types'
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
          <div class="w-200px h-200px" />
        </Match>
        <Match when={props.song.type === 'song'}>
          <SongView song={props.song as SongShownType} />
        </Match>
        <Match when={props.song.type === 'onlyname'}>
          <div class="w-200px h-200px flex justify-center items-center">
            {(props.song as OnlyName).name}
          </div>
        </Match>
      </Switch>
    </div>
  )
}

export {
  SongShown,
}
