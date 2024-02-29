'use client'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { use, useEffect, useState } from 'react'
import prettier from 'prettier'

export default function Home() {
  const [code, setCode] = useState(
    typeof window !== 'undefined'
      ? window.localStorage.getItem('code') || ''
      : ''
  )
  const [error, setError] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('code', code)
    }
  }, [code])

  const formate = async () => {
    try {
      const formattedCode = await prettier.format(code, {
        parser: 'html',
        plugins: [require('prettier/parser-html')]
      })
      setCode(formattedCode)
    } catch (e: any) {
      setError(e)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="h-10 bg-black border-b-[0.05rem] border-gray-500 flex items-center text-gray-400 justify-between px-2">
        <p>Html Code</p>
        <button onClick={formate}>Format</button>
      </div>
      <div className="flex">
        <div className='bg-gray-500 text-white w-[50vw] h-[calc(100vh-2.5rem)] '>
        <CodeEditor
          value={code}
          language={'html'}
          className="w-[50vw] h-[calc(100vh-2.5rem)] overflow-auto p-2"
          onChange={async (ev) => {
            try {
              setCode(ev.target.value)
            } catch (e: any) {
              setError(e)
            }
          }}
          style={{
            backgroundColor: '#111111',
            fontSize: '1rem',
            overflow: 'auto',
            color: '#fff',
          }}
        />
        </div>
        <div className="h-[calc(100vh-2.5rem)] bg-white text-black w-[50vw]">
          {error ? (
            <pre>{error}</pre>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: code }} />
          )}
        </div>
      </div>
    </div>
  )
}
