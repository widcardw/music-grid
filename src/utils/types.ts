interface ResponseType {
  result: {
    songCount: number
    songs: SongType[]
  }
  code: number
}

interface Artist {
  id: number
  name: string
}

interface Album {
  id: number
  name: string
  picUrl: string
}

interface SongType {
  name: string
  id: number
  ar: Artist[]
  al: Album
  alia: string[]
}

interface Labeled {
  type: string
  label: string
  index: number
}

interface Label extends Labeled {
  type: 'label'
}

interface SongShownType extends Labeled, SongType {
  type: 'song'
}

interface OnlyName extends Labeled {
  type: 'onlyname'
  name: string
}

type MayBeSong = Label | SongShownType | OnlyName

export type {
  ResponseType,
  SongType,
  SongShownType,
  Label,
  MayBeSong,
  OnlyName,
}
