import { defineConfig } from '@unocss/vite'
import { presetUno } from '@unocss/preset-uno'

export default defineConfig({
  presets: [presetUno()],
  shortcuts: [
    ['cus-input', 'text-1.25rem p-2 rounded border-zinc-300 w-full box-border'],
  ],
})
