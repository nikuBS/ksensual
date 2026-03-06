import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { PartyContent } from '../types/contentSchema'

export default function PartyManager() {
  const { data, setData } = useContentManager('parties')

  return (
    <CollectionManagerPage<PartyContent>
      title="Parties"
      description="Manage social and party programs."
      itemLabel="Party"
      data={data}
      onChange={setData}
      searchKeys={['name', 'venue', 'dj']}
      createEmpty={() => ({
        id: '',
        name: '',
        date: '',
        startTime: '20:00',
        endTime: '01:00',
        venue: '',
        dj: '',
        description: '',
        dressCode: '',
        posterImage: '',
        order: data.length + 1,
        isPublished: true,
      })}
      columns={[
        { key: 'name', header: 'Party', render: (row) => row.name },
        { key: 'date', header: 'Date', render: (row) => row.date },
        { key: 'venue', header: 'Venue', render: (row) => row.venue },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'name', label: 'Party Name', required: true },
        { key: 'date', label: 'Date', type: 'date', required: true },
        { key: 'startTime', label: 'Start Time', type: 'time' },
        { key: 'endTime', label: 'End Time', type: 'time' },
        { key: 'venue', label: 'Venue' },
        { key: 'dj', label: 'DJ' },
        { key: 'dressCode', label: 'Dress Code' },
        { key: 'posterImage', label: 'Poster URL', type: 'url' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
