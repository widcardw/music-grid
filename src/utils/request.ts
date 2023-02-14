import type { ResponseType } from './types'

const API = 'https://neapi.widcard.win/'
const LIMIT = 12

function objectToParams(obj: any): string {
  return Object.entries(obj).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join('&')
}

async function searchSong(props: {
  keyword: string
  page: number
}): Promise<ResponseType> {
  const { keyword, page } = props
  if (keyword.trim() === '')
    return { code: 400, result: null }
  const params = {
    keywords: keyword,
    limit: LIMIT,
    offset: page * LIMIT,
  }
  const url = `${API}cloudsearch?${objectToParams(params)}`
  const response = await fetch(url)
  // eslint-disable-next-line no-console
  console.log('sent request', keyword)
  return response.json()
}

export {
  searchSong,
}
