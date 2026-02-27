import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { contact } from '../data/event'
import { Section } from './Section'
import { Button } from './ui/Button'
import { Input, Textarea } from './ui/Input'
import { Card } from './ui/Card'

/**
 * 문의 폼 섹션
 * 실제 서버 전송은 하지 않고(mock), 기본 유효성 검증 + 성공 메시지 표시까지 구현한다.
 */
export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  /** 아주 기본적인 이메일 형식 검증 정규식 */
  const isEmailValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    /** 필수 조건을 통과하지 못하면 제출을 중단 */
    if (!isEmailValid || !name.trim() || !message.trim()) return

    /** mock 제출 성공 처리 */
    setSubmitted(true)
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <Section title="Contact" subtitle="Questions, partnerships, and accessibility requests.">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="text-sm text-muted">Email: <a href={`mailto:${contact.email}`} className="text-text">{contact.email}</a></p>
          <p className="mt-2 text-sm text-muted">Instagram: <a href={contact.instagramUrl} target="_blank" rel="noreferrer" className="text-text">@k_sensual</a></p>
          <p className="mt-2 text-sm text-muted">{contact.etc}</p>
        </Card>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">{contact.formLabels.name}</span>
              <Input value={name} onChange={(e) => setName(e.target.value)} aria-label={contact.formLabels.name} required />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">{contact.formLabels.email}</span>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label={contact.formLabels.email}
                required
                type="email"
              />
              {email && !isEmailValid ? <span className="mt-1 block text-xs text-red-300">Please enter a valid email format.</span> : null}
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-muted">{contact.formLabels.message}</span>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} aria-label={contact.formLabels.message} rows={4} required />
            </label>
            <Button type="submit" className="w-full sm:w-auto" disabled={!isEmailValid || !name.trim() || !message.trim()}>
              {contact.formLabels.submit}
            </Button>
            {submitted ? <p className="text-sm text-accentSoft">{contact.formLabels.success}</p> : null}
          </form>
        </Card>
      </div>
    </Section>
  )
}
