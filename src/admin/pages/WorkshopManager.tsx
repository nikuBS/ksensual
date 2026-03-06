import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { WorkshopContent } from '../types/contentSchema'

export default function WorkshopManager() {
  const { data, setData } = useContentManager('workshops')

  return (
    <CollectionManagerPage<WorkshopContent>
      title="Workshops"
      description="Manage workshop timetable and visibility."
      itemLabel="Workshop"
      data={data}
      onChange={setData}
      searchKeys={['title', 'instructor', 'level']}
      createEmpty={() => ({
        id: '',
        date: '',
        startTime: '14:00',
        endTime: '15:00',
        title: '',
        instructor: '',
        level: 'Open',
        description: '',
        tags: [],
        order: data.length + 1,
        isPublished: true,
      })}
      columns={[
        { key: 'title', header: 'Title', render: (row) => row.title },
        { key: 'date', header: 'Date', render: (row) => row.date },
        { key: 'time', header: 'Time', render: (row) => `${row.startTime} - ${row.endTime}` },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'instructor', label: 'Instructor' },
        { key: 'level', label: 'Level' },
        { key: 'date', label: 'Date', type: 'date', required: true },
        { key: 'startTime', label: 'Start Time', type: 'time', required: true },
        { key: 'endTime', label: 'End Time', type: 'time', required: true },
        { key: 'description', label: 'Description', type: 'textarea' },
        {
          key: 'tags',
          label: 'Tags (comma separated)',
          getValue: (item) => item.tags.join(', '),
          setValue: (item, value) => ({ ...item, tags: String(value).split(',').map((tag) => tag.trim()).filter(Boolean) }),
        },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
