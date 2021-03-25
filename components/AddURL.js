import {Input} from 'ui'
import {useRef} from 'react'
import qs from 'qs'
import {useState} from 'react'
import {mutate} from 'swr'

import {add} from 'resources'

export default function AddURL({onSubmit, ...props}) {
  const [url, setUrl] = useState('')

  const onKeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(async function (items) {
        const videoId = qs.parse(new URL(url).search, {ignoreQueryPrefix: true})['v']
        setUrl('')
        const data = [
          ...items,
          {
            name: '',
            type: 'video',
            duration: 0,
            day: [],
            src: `//www.youtube-nocookie.com/embed/${videoId}`,
          }
        ]
        localStorage.setItem('items', JSON.stringify(data))
        return data
      }, false)
    }
  }

  return (
    <Input type="text" placeholder="Add a YouTube Video URL" className="w-full my-3" value={url} onChange={(evt) => setUrl(evt.target.value)} onKeyDown={onKeyDown} />
  )
}
