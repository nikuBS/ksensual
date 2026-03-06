import { CollectionManagerPage } from './CollectionManagerPage'
import { useContentManager } from '../hooks/useContentManager'
import type { ArtistContent } from '../types/contentSchema'

export default function ArtistManager() {
  const { data, setData } = useContentManager('artists')

  return (
    <CollectionManagerPage<ArtistContent>
      title="Artists / DJs"
      description="Manage lineup cards and publish order."
      itemLabel="Artist"
      data={data}
      onChange={setData}
      searchKeys={['name', 'role', 'region']}
      createEmpty={() => ({
        id: '',
        name: '',
        role: 'ARTIST',
        profileImage: '',
        region: '',
        shortBio: '',
        fullBio: '',
        socialLinks: {},
        order: data.length + 1,
        isPublished: true,
      })}
      columns={[
        { key: 'name', header: 'Name', render: (row) => row.name },
        { key: 'role', header: 'Role', render: (row) => row.role },
        { key: 'order', header: 'Order', render: (row) => row.order },
      ]}
      fields={[
        { key: 'name', label: 'Name', required: true },
        {
          key: 'role',
          label: 'Role',
          type: 'select',
          options: [
            { label: 'Artist', value: 'ARTIST' },
            { label: 'DJ', value: 'DJ' },
            { label: 'Instructor', value: 'INSTRUCTOR' },
            { label: 'Performer', value: 'PERFORMER' },
            { label: 'Media', value: 'MEDIA' },
          ],
        },
        { key: 'profileImage', label: 'Profile Image URL', type: 'url' },
        { key: 'region', label: 'Region' },
        { key: 'shortBio', label: 'Short Bio', type: 'textarea' },
        { key: 'fullBio', label: 'Full Bio', type: 'textarea' },
        {
          key: 'instagram',
          label: 'Instagram URL',
          type: 'url',
          getValue: (item) => item.socialLinks.instagram ?? '',
          setValue: (item, value) => ({ ...item, socialLinks: { ...item.socialLinks, instagram: String(value) } }),
        },
        {
          key: 'youtube',
          label: 'YouTube URL',
          type: 'url',
          getValue: (item) => item.socialLinks.youtube ?? '',
          setValue: (item, value) => ({ ...item, socialLinks: { ...item.socialLinks, youtube: String(value) } }),
        },
        {
          key: 'website',
          label: 'Website URL',
          type: 'url',
          getValue: (item) => item.socialLinks.website ?? '',
          setValue: (item, value) => ({ ...item, socialLinks: { ...item.socialLinks, website: String(value) } }),
        },
        { key: 'order', label: 'Order', type: 'number' },
        { key: 'isPublished', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}
