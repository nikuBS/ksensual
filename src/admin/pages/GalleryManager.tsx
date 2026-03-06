import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { GalleryContent } from '../types/contentSchema'

export default function GalleryManager() {
  const { data, setData } = useContentManager('gallery')

  return (
    <CollectionManagerPage<GalleryContent>
      title="Gallery"
      description="Manage image URLs, categories, and exposure order."
      itemLabel="Gallery Item"
      data={data}
      onChange={setData}
      searchKeys={['caption', 'category']}
      createEmpty={() => ({
        id: '',
        imageUrl: '',
        thumbnailUrl: '',
        caption: '',
        category: 'party',
        order: data.length + 1,
        isPublished: true,
      })}
      columns={[
        { key: 'caption', header: 'Caption', render: (row) => row.caption },
        { key: 'category', header: 'Category', render: (row) => row.category },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'caption', label: 'Caption' },
        { key: 'category', label: 'Category' },
        { key: 'imageUrl', label: 'Image URL', type: 'url' },
        { key: 'thumbnailUrl', label: 'Thumbnail URL', type: 'url' },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
