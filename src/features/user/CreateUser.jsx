import { useState } from 'react'
import Button from '../../ui/Button'
import { updateName } from './userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function CreateUser() {
  // username state to create name for the user
  const [username, setUsername] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    if (!username) return
    dispatch(updateName(username))
    navigate('/menu')
  }

  return (
    // we create a form element so that when we click enter it will be submitted and handleSubmit will be called on submit
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base'>
        👋 Welcome! Please start by telling us
        your name:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) =>
          setUsername(e.target.value)
        }
        className=' input mb-8 w-72'
      />

      {username !== '' && (
        <div>
          <Button type='primary'>
            Start ordering
          </Button>
        </div>
      )}
    </form>
  )
}

export default CreateUser
