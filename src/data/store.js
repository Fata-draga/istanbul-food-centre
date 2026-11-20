export const store = {
  name: 'Istanbul Food Centre',
  street: '282–286 Oxford Road',
  town: 'Reading',
  postcode: 'RG30 1AD',
  country: 'United Kingdom',
  phone: null, // Add { label, number } after confirmation by the store.
  email: null,
  openingHours: [], // Add confirmed { days, hours } entries.
}

const mapAddress = [store.name, store.street, store.town, store.postcode, store.country].join(', ')
export const storeDirectionsUrl = 'https://www.google.com/maps/dir/?' + new URLSearchParams({
  api: '1',
  destination: mapAddress,
})
export const storeMapUrl = 'https://www.google.com/maps?' + new URLSearchParams({
  q: mapAddress,
  output: 'embed',
})
