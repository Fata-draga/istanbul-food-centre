export const shopRegions = [
  { id: 'romania', name: 'Romania', feature: 'Mălai, zacuscă and sweet snacks' },
  { id: 'bulgaria', name: 'Bulgaria', feature: 'Sirene-style cheese, yoghurt and lyutenitsa' },
  { id: 'turkey', name: 'Turkey', feature: 'Tea, coffee, simit and baklava' },
  { id: 'greece', name: 'Greece', feature: 'Feta, olives and Mediterranean staples' },
  { id: 'balkans', name: 'Balkans', heading: 'Balkan Specialities', feature: 'Flaky burek, ajvar and fruit preserves' },
  { id: 'middle-east', name: 'Middle East', heading: 'Middle Eastern Groceries', feature: 'Tahini, halva and fragrant seasonings' },
  { id: 'international', name: 'Other International' },
]

export const shopRegionNames = new Map(shopRegions.map(({ id, name }) => [id, name]))
export const regionShopPath = (region) => '/shop?country=' + encodeURIComponent(region)
