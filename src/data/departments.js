import freshProduce from '../assets/departments/fresh-produce.webp'
import halalButcher from '../assets/departments/halal-butcher.webp'
import bakery from '../assets/departments/bakery.webp'
import dairy from '../assets/departments/dairy.webp'
import international from '../assets/departments/international.webp'
import pantry from '../assets/departments/pantry.webp'

// Photo sources use the Pexels licence: https://www.pexels.com/license/
export const departments = [
  {
    name: 'Fresh Fruit & Vegetables',
    id: 'fresh-produce',
    path: '/fresh-produce',
    image: freshProduce,
    photoSource: 'https://www.pexels.com/photo/14776486/',
  },
  {
    name: 'Halal Meat & Poultry',
    id: 'halal-butcher',
    path: '/halal-butcher',
    image: halalButcher,
    photoSource: 'https://www.pexels.com/photo/6107725/',
  },
  {
    name: 'Bakery & Patisserie',
    id: 'bakery-and-patisserie',
    path: '/bakery-and-patisserie',
    image: bakery,
    photoSource: 'https://www.pexels.com/photo/37020184/',
  },
  {
    name: 'Dairy & Chilled',
    id: 'dairy-and-chilled',
    path: '/shop/dairy-and-chilled',
    image: dairy,
    photoSource: 'https://www.pexels.com/photo/37907507/',
  },
  {
    name: 'International Groceries',
    id: 'international-groceries',
    path: '/world-foods',
    image: international,
    photoSource: 'https://www.pexels.com/photo/32281630/',
  },
  {
    name: 'Pantry Essentials',
    id: 'pantry-essentials',
    path: '/shop/pantry-essentials',
    image: pantry,
    photoSource: 'https://www.pexels.com/photo/8108102/',
  },
]

export const departmentShopPath = (id) => '/shop?category=' + encodeURIComponent(id)
