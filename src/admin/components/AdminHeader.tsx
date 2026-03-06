import { useRef, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useEventContent } from '../../content/ContentContext'

export function AdminHeader() {
  const { exportJson, importJson, resetToBase } = useEventContent()
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleImportClick = () => {
    inputRef.current?.click()
  }

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      await importJson(file)
      setMessage('Imported JSON successfully.')
    } catch {
      setMessage('Invalid JSON file.')
    }
    event.target.value = ''
  }

  return (
    <header className="border-b border-black/10 bg-white/80 px-4 py-3 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-text">Admin CMS</h1>
          <p className="text-xs text-muted">Static JSON workflow for GitHub Pages deployment</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" variant="outline" onClick={exportJson}>Export JSON</Button>
          <Button size="sm" variant="outline" onClick={handleImportClick}>Import JSON</Button>
          <Button size="sm" variant="ghost" onClick={resetToBase}>Reset Draft</Button>
          <Link to="/" className="inline-flex">
            <Button size="sm">Public Site</Button>
          </Link>
          <input ref={inputRef} type="file" accept="application/json" className="hidden" onChange={handleFileChange} />
        </div>
      </div>
      {message ? <p className="mt-2 text-xs text-accentSoft">{message}</p> : null}
    </header>
  )
}
