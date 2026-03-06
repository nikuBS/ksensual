import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { NoticeContent } from '../types/contentSchema'

export default function NoticeManager() {
  const { data, setData } = useContentManager('notices')

  return (
    <CollectionManagerPage<NoticeContent>
      title="Notices"
      description="Manage announcements and pinned notices."
      itemLabel="Notice"
      data={data}
      onChange={setData}
      searchKeys={['title', 'content']}
      createEmpty={() => ({
        id: '',
        title: '',
        content: '',
        publishedAt: '',
        isPinned: false,
        order: data.length + 1,
        isPublished: true,
      })}
      columns={[
        { key: 'title', header: 'Title', render: (row) => row.title },
        { key: 'publishedAt', header: 'Date', render: (row) => row.publishedAt },
        { key: 'isPinned', header: 'Pinned', render: (row) => (row.isPinned ? 'Yes' : 'No') },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'title', label: 'Title', required: true },
        { key: 'content', label: 'Content', type: 'textarea', required: true },
        { key: 'publishedAt', label: 'Published Date', type: 'date' },
        { key: 'isPinned', label: 'Pinned', type: 'checkbox' },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
