import type { Component } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
// import html2canvas from 'html2canvas'
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
  '最讨厌的',
  '最令人失望的',
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

const App: Component = () => {
  const [dlg, setDlg] = createSignal(false)
  let cached = getStorage()
  if (cached.length === 0)
    cached = TYPES.map((i, j) => ({ label: i, type: 'label', index: j }))
  const [songs, setSongs] = createStore<MayBeSong[]>(cached)
  const [cur, setCur] = createSignal(-1)
  const [dom, setDom] = createSignal<HTMLDivElement>()
  const [img, setImg] = createSignal('')
  const [showDownload, setDownload] = createSignal(false)
  const [ma, setMa] = createSignal(true)

  function generateCanvas() {
    // html2canvas(dom()).then((canvas) => {
    //   setImg(canvas.toDataURL('image/jpeg', 0.8))
    //   setDownload(true)
    // })
    setMa(false)
    dom2img.toJpeg(dom(), { quality: 0.8 }).then((data) => {
      setImg(data)
      setDownload(true)
      setMa(true)
    })
  }
  return (
    <>
      <div ref={setDom} class="w-1106px bg-white/100 p-8" classList={{ 'mx-a': ma() }}>
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
      <button class="w-full page" onClick={generateCanvas}>生成</button>
      <Show when={showDownload()}>
        <Download data={img()} onClose={() => setDownload(false)} />
      </Show>
      <Show when={dlg()}>
        <SearchDialog
          onSelect={(song) => {
            setSongs(cur(), { ...song, label: songs[cur()].label, index: cur(), type: 'song' })
            setDlg(false)
            setStorage(songs)
          }}
          onClose={() => {
            setDlg(false)
          }}
          onFill={(name) => {
            setSongs(cur(), { name, label: songs[cur()].label, index: cur(), type: 'onlyname' })
            setDlg(false)
            setStorage(songs)
          }}
          onClear={() => {
            setSongs(cur(), { label: songs[cur()].label, index: cur(), type: 'label' })
            setDlg(false)
            setStorage(songs)
          }}
        />
      </Show>
    </>
  )
}

export default App
