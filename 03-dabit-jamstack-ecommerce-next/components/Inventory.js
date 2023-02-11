import { useState } from 'react'
import AddInventory from '../components/formComponents/AddInventory'
import ViewInventory from '../components/ViewInventory'

const Inventory = (props) => {
  const [viewState, setViewState] = useState('view')

  return (
    <div>
      <div className='flex my-6'>
        <p role='button' className='mr-4 cursor-pointer hover:text-primary' onClick={() => setViewState('view')}>
          View Inventory
        </p>
        <p role='button' className='cursor-pointer hover:text-primary' onClick={() => setViewState('add')}>
          Add Item
        </p>
      </div>
      {viewState === 'view' ? <ViewInventory /> : <AddInventory />}
      <button
        onClick={props.signOut}
        className='mt-4 bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        type='button'
      >
        Sign Out
      </button>
    </div>
  )
}

export default Inventory
