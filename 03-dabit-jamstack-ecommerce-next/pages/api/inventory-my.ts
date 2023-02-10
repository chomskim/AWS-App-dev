import { readFileSync } from 'fs'

function randint(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}
interface PRODUCT {
  id: string
  categories: string[]
  name: string
  price: string
  image: string
  description: string
  brand: string
  currentInventory: number
}

let in_data = readFileSync('./jam-products.json')
console.log(in_data.toString('utf8'))
const jam_product: any[] = JSON.parse(in_data.toString('utf8'))

const inventory: PRODUCT[] = jam_product.map((jprod) => {
  const prod: PRODUCT = {
    id: jprod.id,
    categories: [jprod.category],
    name: jprod.name,
    price: jprod.price,
    image: jprod.image,
    description: jprod.description,
    brand: jprod.company,
    currentInventory: randint(1, 50),
  }
  if (jprod.featured) {
    prod.categories = [...prod.categories, 'new arrivals']
  }
  if (jprod.shipping) {
    prod.categories = [...prod.categories, 'on sale']
  }
  return prod
})

export default inventory
