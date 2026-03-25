import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { schedule as defaultSchedule } from '../data/event'
import type { ScheduleDay } from '../data/event'
import { Section } from '../components/Section'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input, Textarea } from '../components/ui/Input'

const STORAGE_KEY = 'schedule-page-data'
const EDIT_PASSWORD = '329329'

type FieldErrors = Record<string, string>

function cloneSchedule(days: ScheduleDay[]): ScheduleDay[] {
  return days.map((day) => ({
    ...day,
    sessions: day.sessions.map((session) => ({
      ...session,
      hosts: session.hosts ? [...session.hosts] : [],
    })),
  }))
}

function getInitialSchedule(): ScheduleDay[] {
  if (typeof window === 'undefined') {
    return cloneSchedule(defaultSchedule)
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return cloneSchedule(defaultSchedule)
  }

  try {
    const parsed = JSON.parse(stored) as ScheduleDay[]
    return cloneSchedule(parsed)
  } catch {
    return cloneSchedule(defaultSchedule)
  }
}

function getFieldKey(dayId: string, sessionIndex: number, field: string) {
  return `${dayId}:${sessionIndex}:${field}`
}

function validateSchedule(days: ScheduleDay[]) {
  const errors: FieldErrors = {}

  days.forEach((day) => {
    if (!day.label.trim()) {
      errors[`${day.dayId}:label`] = '일차명은 필수입니다.'
    }

    day.sessions.forEach((session, sessionIndex) => {
      if (!session.time.trim()) {
        errors[getFieldKey(day.dayId, sessionIndex, 'time')] = '시간은 필수입니다.'
      }
      if (!session.title.trim()) {
        errors[getFieldKey(day.dayId, sessionIndex, 'title')] = '세션명은 필수입니다.'
      }
      if (!session.type.trim()) {
        errors[getFieldKey(day.dayId, sessionIndex, 'type')] = '유형은 필수입니다.'
      }
    })
  })

  return errors
}

export default function SchedulePage() {
  const [savedSchedule, setSavedSchedule] = useState<ScheduleDay[]>(() => getInitialSchedule())
  const [draftSchedule, setDraftSchedule] = useState<ScheduleDay[]>(() => getInitialSchedule())
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [saveMessage, setSaveMessage] = useState('')

  const handleDayLabelChange = (dayId: string, value: string) => {
    setDraftSchedule((current) =>
      current.map((day) => (day.dayId === dayId ? { ...day, label: value } : day)),
    )
    setFieldErrors((current) => {
      const next = { ...current }
      delete next[`${dayId}:label`]
      return next
    })
  }

  const handleSessionChange = (
    dayId: string,
    sessionIndex: number,
    field: 'time' | 'title' | 'type' | 'location' | 'hosts',
    value: string,
  ) => {
    setDraftSchedule((current) =>
      current.map((day) => {
        if (day.dayId !== dayId) {
          return day
        }

        const sessions = day.sessions.map((session, index) => {
          if (index !== sessionIndex) {
            return session
          }

          if (field === 'hosts') {
            return {
              ...session,
              hosts: value
                .split(',')
                .map((host) => host.trim())
                .filter(Boolean),
            }
          }

          return {
            ...session,
            [field]: value,
          }
        })

        return { ...day, sessions }
      }),
    )

    setFieldErrors((current) => {
      const next = { ...current }
      delete next[getFieldKey(dayId, sessionIndex, field)]
      return next
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaveMessage('')
    setPasswordError('')

    const errors = validateSchedule(draftSchedule)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    if (!password.trim()) {
      setPasswordError('비밀번호를 입력해주세요.')
      return
    }

    if (password !== EDIT_PASSWORD) {
      setPasswordError('비밀번호가 올바르지 않습니다.')
      return
    }

    const nextSavedSchedule = cloneSchedule(draftSchedule)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSavedSchedule))
    setSavedSchedule(nextSavedSchedule)
    setDraftSchedule(cloneSchedule(nextSavedSchedule))
    setPassword('')
    setFieldErrors({})
    setSaveMessage('스케줄이 저장되었습니다.')
  }

  const handleResetDraft = () => {
    setDraftSchedule(cloneSchedule(savedSchedule))
    setPassword('')
    setPasswordError('')
    setFieldErrors({})
    setSaveMessage('')
  }

  return (
    <Section
      title="Schedule Manager"
      subtitle="스케줄 조회와 수정이 가능한 전용 페이지입니다. 저장 시 비밀번호 인증이 필요합니다."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1.4fr]">
        <Card className="h-fit space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accentSoft">Read Only Preview</p>
            <h3 className="font-heading text-2xl text-text">현재 스케줄</h3>
            <p className="text-sm text-muted">저장된 내용을 기준으로 일자별 세션을 한눈에 확인할 수 있습니다.</p>
          </div>

          <div className="space-y-4">
            {savedSchedule.map((day) => (
              <div key={day.dayId} className="rounded-2xl border border-black/10 bg-base/60 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted">{day.dateISO}</p>
                    <h4 className="font-semibold text-text">{day.label}</h4>
                  </div>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {day.sessions.length} sessions
                  </span>
                </div>

                <div className="space-y-3">
                  {day.sessions.map((session, sessionIndex) => (
                    <div key={`${day.dayId}-${sessionIndex}`} className="rounded-xl border border-black/10 bg-white/40 p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-accentSoft">{session.time}</p>
                        <p className="text-xs text-muted">{session.type}</p>
                      </div>
                      <p className="mt-1 font-medium text-text">{session.title}</p>
                      <p className="mt-1 text-sm text-muted">{session.location || '장소 미입력'}</p>
                      <p className="mt-1 text-xs text-muted">
                        {(session.hosts && session.hosts.length > 0) ? session.hosts.join(', ') : '호스트 미입력'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <form onSubmit={handleSubmit}>
          <Card className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accentSoft">Edit Schedule</p>
              <h3 className="font-heading text-2xl text-text">스케줄 입력 및 수정</h3>
              <p className="text-sm text-muted">필수값을 입력하고 비밀번호 인증 후 저장하면 수정 내용이 반영됩니다.</p>
            </div>

            <div className="space-y-6">
              {draftSchedule.map((day) => (
                <div key={day.dayId} className="space-y-4 rounded-2xl border border-black/10 bg-base/50 p-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-text">일차명</label>
                    <Input
                      value={day.label}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => handleDayLabelChange(day.dayId, event.target.value)}
                      placeholder="예: Day 1"
                    />
                    {fieldErrors[`${day.dayId}:label`] ? (
                      <p className="mt-2 text-sm text-red-600">{fieldErrors[`${day.dayId}:label`]}</p>
                    ) : null}
                  </div>

                  <div className="space-y-4">
                    {day.sessions.map((session, sessionIndex) => (
                      <div key={`${day.dayId}-${sessionIndex}-editor`} className="grid gap-3 rounded-2xl border border-black/10 bg-white/50 p-4 md:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-semibold text-text">시간</label>
                          <Input
                            value={session.time}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSessionChange(day.dayId, sessionIndex, 'time', event.target.value)
                            }
                            placeholder="18:00"
                          />
                          {fieldErrors[getFieldKey(day.dayId, sessionIndex, 'time')] ? (
                            <p className="mt-2 text-sm text-red-600">{fieldErrors[getFieldKey(day.dayId, sessionIndex, 'time')]}</p>
                          ) : null}
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-text">유형</label>
                          <Input
                            value={session.type}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSessionChange(day.dayId, sessionIndex, 'type', event.target.value)
                            }
                            placeholder="예: Workshop"
                          />
                          {fieldErrors[getFieldKey(day.dayId, sessionIndex, 'type')] ? (
                            <p className="mt-2 text-sm text-red-600">{fieldErrors[getFieldKey(day.dayId, sessionIndex, 'type')]}</p>
                          ) : null}
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 block text-sm font-semibold text-text">세션명</label>
                          <Input
                            value={session.title}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSessionChange(day.dayId, sessionIndex, 'title', event.target.value)
                            }
                            placeholder="세션명을 입력해주세요."
                          />
                          {fieldErrors[getFieldKey(day.dayId, sessionIndex, 'title')] ? (
                            <p className="mt-2 text-sm text-red-600">{fieldErrors[getFieldKey(day.dayId, sessionIndex, 'title')]}</p>
                          ) : null}
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-text">장소</label>
                          <Input
                            value={session.location ?? ''}
                            onChange={(event: ChangeEvent<HTMLInputElement>) =>
                              handleSessionChange(day.dayId, sessionIndex, 'location', event.target.value)
                            }
                            placeholder="예: Harbor Stage"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-semibold text-text">호스트</label>
                          <Textarea
                            rows={1}
                            value={session.hosts?.join(', ') ?? ''}
                            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                              handleSessionChange(day.dayId, sessionIndex, 'hosts', event.target.value)
                            }
                            placeholder="쉼표(,)로 구분해 입력"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/60 p-4">
              <label htmlFor="schedule-password" className="mb-2 block text-sm font-semibold text-text">
                비밀번호
              </label>
              <Input
                id="schedule-password"
                type="password"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value)
                  setPasswordError('')
                }}
                placeholder="비밀번호를 입력해주세요."
              />
              {passwordError ? <p className="mt-2 text-sm text-red-600">{passwordError}</p> : null}
              {saveMessage ? <p className="mt-2 text-sm text-emerald-700">{saveMessage}</p> : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="sm:min-w-32">저장</Button>
              <Button type="button" variant="outline" className="sm:min-w-32" onClick={handleResetDraft}>
                편집 내용 초기화
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </Section>
  )
}
