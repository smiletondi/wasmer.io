import sanityClient from '@sanity/client'

export default sanityClient({
  apiVersion: '2021-08-31',
  projectId: 'kj8f3jct', // you can find this in sanity.json
  dataset: 'production', // or the name you chose in step 1
  useCdn: true // `false` if you want to ensure fresh data
})
