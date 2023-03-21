import type { Component } from 'solid-js'
import type { SongType } from '../../utils/types'

const SongView: Component<{
  song: SongType
  onClick?: (id: SongType) => any
}> = (props) => {
  return (
    <div class="cursor-pointer" onClick={() => props.onClick?.({
      al: props.song.al,
      ar: props.song.ar,
      alia: props.song.alia,
      name: props.song.name,
      id: props.song.id,
    })}
    >
      <img src={props.song.al.picUrl} style={{ 'width': '200px', 'height': '200px', 'object-fit': 'cover' }} />
      <div class="text-sm">{props.song.name}</div>
      <div class="text-sm text-gray-400">{props.song.ar.map(i => i.name).join('/')}</div>
      <div class="text-sm text-gray-700">{props.song.al.name}</div>
    </div>
  )
}

export {
  SongView,
}
