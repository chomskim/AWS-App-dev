import { useEffect, useState } from 'react'
import { fetchInventory } from '../utils/inventoryProvider'
// import DENOMINATION from '../utils/currencyProvider'
import { formatPrice } from '../utils/helpers'
import Image from '../components/Image'
import Link from 'next/link'
import { slugify } from '../utils/helpers'
import { FaTimes } from 'react-icons/fa'

const ViewInventory = (props) => {
  const initialState = {
    inventory: [],
    currentItem: {},
    editingIndex: [],
  }
  const [state, setState] = useState(initialState)
  useEffect(() => {
    const loadInventory = async () => {
      const inventory = await fetchInventory()
      setState({ ...state, inventory })
    }
    loadInventory()
  }, [])

  const editItem = (item, index) => {
    const editingIndex = index
    setState({ ...state, editingIndex, currentItem: item })
  }
  const saveItem = async (index) => {
    const inventory = [...state.inventory]
    inventory[index] = state.currentItem
    // update item in database
    setState({ ...state, editingIndex: null, inventory })
  }
  const deleteItem = async (index) => {
    const inventory = [...state.inventory.slice(0, index), ...state.inventory.slice(index + 1)]
    setState({ ...state, inventory })
  }
  const onChange = (event) => {
    const currentItem = {
      ...state.currentItem,
      [event.target.name]: event.target.value,
    }

    setState({ ...state, currentItem })
  }

  const { inventory, currentItem, editingIndex } = state
  return (
    <div>
      <h2 className='text-3xl'>Inventory</h2>
      {inventory.map((item, index) => {
        const isEditing = editingIndex === index
        if (isEditing) {
          return (
            <div className='border-b py-10' key={item.id}>
              <div className='flex items-center'>
                <Link href={`/product/${slugify(item.name)}`}>
                  <div aria-label={item.name}>
                    <Image className='w-32 m-0' src={item.image} alt={item.name} />
                  </div>
                </Link>
                <input
                  onChange={(e) => onChange(e, index)}
                  className='ml-8 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  value={currentItem.name}
                  placeholder='Item name'
                  name='name'
                />
                <div className='flex flex-1 justify-end items-center'>
                  <p className='m-0 text-sm mr-2'>In stock:</p>
                  <input
                    onChange={onChange}
                    className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    value={currentItem.currentInventory}
                    name='currentInventory'
                    placeholder='Item inventory'
                  />
                  <input
                    onChange={onChange}
                    className='ml-16 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    value={currentItem.price}
                    name='price'
                    placeholder='Item price'
                  />
                </div>
                <div
                  role='button'
                  onClick={() => saveItem(index)}
                  className='m-0 ml-10 text-gray-900 text-s cursor-pointer'
                >
                  <p className='text-sm ml-10 m-0'>Save</p>
                </div>
              </div>
            </div>
          )
        }
        return (
          <div className='border-b py-10' key={item.id}>
            <div className='flex items-center'>
              <Link href={`/product/${slugify(item.name)}`}>
                <Image className='w-32 m-0' src={item.image} alt={item.name} />
              </Link>
              <Link href={`/product/${slugify(item.name)}`}>
                <p className='m-0 pl-10 text-gray-600 text-sm'>{item.name}</p>
              </Link>
              <div className='flex flex-1 justify-end'>
                <p className='m-0 pl-10 text-gray-900 text-sm'>In stock: {item.currentInventory}</p>
                <p className='m-0 pl-20 text-gray-900 font-semibold'>{formatPrice(item.price)}</p>
              </div>
              <div className='flex items-center m-0 ml-10 text-gray-900 text-s cursor-pointer'>
                <FaTimes onClick={() => deleteItem(index)} />
                <p role='button' onClick={() => editItem(item, index)} className='text-sm ml-10 m-0'>
                  Edit
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ViewInventory
