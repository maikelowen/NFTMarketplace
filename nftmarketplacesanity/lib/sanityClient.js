import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'ofuj7miz',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token:
    'skDodY1VL1mTAJ2rYBdwhcozRkTobjCOuz2trzLXsZc1MyBQirVpJS5x68rEEEpzWupmQx1Jboo8k1qIurANDF9CDeriIahlIph75iYx9kAUXRqpxMZx3Sfj8LhAJThR1AzTRIYPJ8x7wrkS1ld99L990uM4oFuVIvQQ95EQExqLDbup7UeD',
  useCdn: false,
})