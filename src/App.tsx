import type { Component } from 'solid-js'
import { ErrorBoundary, Show, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import dom2img from 'dom-to-image'
import { Footer } from './components/Footer'
import { GridShow } from './components/GridShow'
import { SearchDialog } from './components/SearchDialog'
import type { MayBeSong } from './utils/types'
import './index.css'
import { Download } from './components/Download'

const TYPES = [
  '入坑曲',
  '无聊时的耳前一亮',
  '失落时的一缕阳光',
  '百听不厌',
  '一闻钟情',
  '跟着抖腿',
  '泣不成声',
  '江郎才尽',
  '听完毫无印象',
  '最想安利的',
  '最震撼的',
  '消磨时间时候听',
  '最能勾起回忆的',
  '寒毛直竖',
  '最有故事的',
  '最热血的',
  '最怪的',
  '最冷门的',
  '最不希望它火的',
  '最过誉的',
]

function setStorage(obj: MayBeSong[]) {
  if (typeof window === 'undefined')
    return
  window.localStorage.setItem('songs', JSON.stringify(obj))
}

function getStorage(): MayBeSong[] {
  if (typeof window === 'undefined')
    return
  const songStr = window.localStorage.getItem('songs') || '[]'
  return JSON.parse(songStr)
}

function sameArray<T>(s1: Array<T>, s2: Array<T>): boolean {
  const s = new Set([...s1, ...s2])
  return s.size === s1.length && s.size === s2.length
}

const ErrorFallback: Component<{
  err: any
  reset: () => void
// eslint-disable-next-line solid/no-destructure
}> = ({ err, reset }) => {
  return (
    <div class="w-1106px p-8 mx-a">
      <h1>出错啦</h1>
      <p>{String(err)}</p>
      <button class="page" onClick={reset}>重置</button>
    </div>
  )
}

const App: Component = () => {
  const [dlg, setDlg] = createSignal(false)
  let cached = getStorage()
  if (cached.length === 0 || !sameArray(TYPES, cached.map(i => i.label)))
    cached = TYPES.map((i, j) => ({ label: i, type: 'label', index: j }))
  const [songs, setSongs] = createStore<MayBeSong[]>(cached)
  const [cur, setCur] = createSignal(-1)
  const [dom, setDom] = createSignal<HTMLDivElement>()
  const [img, setImg] = createSignal('')
  const [showDownload, setDownload] = createSignal(false)
  const [ma, setMa] = createSignal(true)

  function generateCanvas() {
    setMa(false)
    dom2img.toJpeg(dom(), { quality: 0.8 })
      .then((data) => {
        setImg(data)
        setDownload(true)
        setMa(true)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      })
  }
  return (
    <ErrorBoundary fallback={(err, reset) => <ErrorFallback err={err} reset={reset} />}>
      <div class="w-1170px" classList={{ 'mx-a': ma() }}>
        <div ref={setDom} class="bg-white/100 p-8 pb-4">
          <input class="text-center font-700 text-2rem w-full border-none p-4" value="音乐生涯个人喜好表（可修改标题）" />
          <GridShow
            data={songs}
            onSelect={(id) => {
              setCur(id)
              setDlg(true)
            }}
          />
          <Footer />
        </div>
        <button class="page mt-2 w-full" disabled={!ma()} onClick={generateCanvas}>
          {ma() ? '点击生成' : <>生成中 请稍等 网页突然靠左是<span class="line-through">特性</span></>}
        </button>
        <div class="text-center p-4">
          <a class="link" href="https://github.com/widcardw/music-grid">GitHub</a>
        </div>
      </div>
      <Show when={showDownload()}>
        <Download data={img()} onClose={() => setDownload(false)} />
      </Show>
      <Show when={dlg()}>
        <SearchDialog
          // eslint-disable-next-line solid/reactivity
          onSelect={(song) => {
            setSongs(cur(), { ...song, label: songs[cur()].label, index: cur(), type: 'song' })
            setDlg(false)
            setStorage(songs)
          }}
          onClose={() => {
            setDlg(false)
          }}
          // eslint-disable-next-line solid/reactivity
          onFill={(name) => {
            setSongs(cur(), { name, label: songs[cur()].label, index: cur(), type: 'onlyname' })
            setDlg(false)
            setStorage(songs)
          }}
          // eslint-disable-next-line solid/reactivity
          onClear={() => {
            setSongs(cur(), { label: songs[cur()].label, index: cur(), type: 'label' })
            setDlg(false)
            setStorage(songs)
          }}
        />
      </Show>
    </ErrorBoundary>
  )
}

export default App
