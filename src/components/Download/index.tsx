import type { Component } from 'solid-js'

const Download: Component<{
  data: string
  onClose: () => any
}> = (props) => {
  return (
    <div class="fixed top-0 left-0 right-0 bottom-0 px-4 py-8 of-auto bg-black/70">
      <div class="mx-a w-840px space-y-2 bg-white/100 p-4 rounded text-center">
        <img src={props.data} class="w-full shadow" />
        <div class="space-y-2">
          <a class="block page p-2 text-black decoration-none" href={props.data} download={`music-grid_${Date.now()}.jpeg`}>下载</a>
          <a class="block page p-2 text-black decoration-none" onClick={() => props.onClose()}>关闭</a>
        </div>
      </div>
    </div>
  )
}

export {
  Download,
}
