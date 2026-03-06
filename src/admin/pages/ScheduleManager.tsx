import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { ScheduleContent } from '../types/contentSchema'

export default function ScheduleManager() {
  const { data, setData } = useContentManager('schedule')

  return (
    <CollectionManagerPage<ScheduleContent>
      title="Schedule Overview"
      description="Manage day summaries and card list in JSON text format."
      itemLabel="Schedule Day"
      data={data}
      onChange={setData}
      searchKeys={['dayLabel', 'date']}
      createEmpty={() => ({
        id: '',
        dayLabel: 'Day',
        date: '',
        isHighlighted: false,
        order: data.length + 1,
        isPublished: true,
        cards: [],
      })}
      columns={[
        { key: 'dayLabel', header: 'Day', render: (row) => row.dayLabel },
        { key: 'date', header: 'Date', render: (row) => row.date },
        { key: 'cards', header: 'Cards', render: (row) => row.cards.length },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'dayLabel', label: 'Day Label' },
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'isHighlighted', label: 'Highlighted Day', type: 'checkbox' },
        {
          key: 'cards',
          label: 'Cards JSON',
          type: 'textarea',
          getValue: (item) => JSON.stringify(item.cards, null, 2),
          setValue: (item, value) => {
            try {
              const parsed = JSON.parse(String(value))
              return { ...item, cards: Array.isArray(parsed) ? parsed : item.cards }
            } catch {
              return item
            }
          },
        },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
