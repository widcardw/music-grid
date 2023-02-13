import type { Component } from 'solid-js'

const Download: Component<{
  data: string
  onClose: () => any
}> = ({ data, onClose }) => {
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 px-4 py-8 of-auto bg-black/70">
      <div class="mx-a w-840px space-y-2 bg-white/100 p-4 rounded text-center">
        <img src={data} class="w-full" />
        <a class="page p-2 text-black decoration-none" href={data} download={`music-grid_${Date.now()}.jpeg`}>下载</a>&nbsp;
        <a class="page p-2 text-black decoration-none" onClick={onClose}>关闭</a>
      </div>
    </div>
  )
}

export {
  Download,
}
