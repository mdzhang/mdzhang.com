import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
    }),
    defineField({
      name: 'isbn13',
      title: 'ISBN13',
      type: 'string',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'number',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
    }),
    defineField({
      name: 'readAt',
      title: 'Read At',
      type: 'datetime',
    }),
    defineField({
      name: 'publicationYear',
      title: 'Publication Year',
      type: 'number',
    }),
    defineField({
      name: 'myRating',
      title: 'My Rating',
      type: 'number',
    }),
    defineField({
      name: 'shelves',
      title: 'Shelves',
      type: 'array',
      of: [
        {
          title: 'Shelf',
          type: 'string',
        },
      ],
    }),
  ],
})
