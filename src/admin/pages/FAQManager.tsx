import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { FaqContent } from '../types/contentSchema'

export default function FAQManager() {
  const { data, setData } = useContentManager('faq')

  return (
    <CollectionManagerPage<FaqContent>
      title="FAQ"
      description="Manage frequently asked questions and visibility."
      itemLabel="FAQ"
      data={data}
      onChange={setData}
      searchKeys={['question', 'answer']}
      createEmpty={() => ({
        id: '',
        question: '',
        answer: '',
        order: data.length + 1,
        isPublished: true,
      })}
      columns={[
        { key: 'question', header: 'Question', render: (row) => row.question },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'question', label: 'Question', required: true },
        { key: 'answer', label: 'Answer', type: 'textarea', required: true },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
