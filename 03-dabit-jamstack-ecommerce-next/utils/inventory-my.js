import in_data from '../public/products/jam-products.json' assert { type: 'json' }

// console.log(in_data)
// const jam_product = JSON.parse(in_data)
function randint(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

const inventory = in_data.map((jprod) => {
  const prod = {
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
