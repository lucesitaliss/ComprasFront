import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { getApiUrl } from '../../../../api'
import { setLocalStorageToken } from '../../../../features/localStoreToken/localStoreTokenSlice'
import { getToken } from '../../../../utils/localStorage'
import './adminTabUser.css'

export default function AdminTabUser() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	useEffect(() => {
		getUsers()
	}, [])

	const { token } = useSelector((state) => state.localStorageToken)

	const [dataCreateUser, setDataCreateUser] = useState({
		name: '',
		password: '',
	})

	const [users, setUsers] = useState([])

	const handlechange = (event) => {
		const { name, value } = event.target
		setDataCreateUser({ ...dataCreateUser, [name]: value })
	}

	const handleSumit = async (event) => {
		event.preventDefault()
    try{
      const urlNewUser = getApiUrl('newuser')
      const getNewUser = await fetch(urlNewUser, {
        method: 'POST',
        body: JSON.stringify(dataCreateUser),
        headers: {
          'content-type': 'application/json',
          'x-acces-token': token,
        },
      })
      if (getNewUser.ok) {
        getUsers()
      }
      event.target.reset()
    }catch(error){
			Swal.fire({
				Title:'Error',
				text:`${error}`,
				icon: 'error'
			 })
		}

    }

	const getUsers = async () => {
		const urlGetUsers = getApiUrl('users')
		try {
			const usersRequest = await fetch(urlGetUsers, {
				headers: { 'x-acces-token': token },
			})
			if (usersRequest.ok) {
				const usersResponse = await usersRequest.json()
				setUsers(usersResponse)
			}
		} catch (error) {}
	}

	const handleOnClickEditUser = async (currentUser, id) => {
		const { value: editUser } = await Swal.fire({
			title: 'Edit User',
			input: 'text',
			inputLable: 'Insert User',
			inputValue: currentUser,
			showCancelButton: true,
		})
		if (editUser) {
			const bodyupdateUser = {
				user: editUser,
				id: id,
			}
			updatedUser(bodyupdateUser)
			await Swal.fire({
				text: 'The user has been successfully modified',
				icon: 'sucess',
				showConfirmButton: false,
				timer: 1000,
			})
		}
	}
	const updatedUser = async (bodyupdateUser) => {
		const urlUpdateUser = getApiUrl('updateuser')
		try {
			const getUpdateUser = await fetch(urlUpdateUser, {
				method: 'PUT',
				body: JSON.stringify(bodyupdateUser),
				headers: {
					'content-type': 'application/json',
					'x-acces-token': token,
				},
			})
			if (getUpdateUser.ok) {
				getUsers()
			}
		} catch (error) {
			console.error(error)
		}
	}
	const handleOnClickDeleteUser = async (id, user) => {
		try {
			const SwalDelete = await Swal.fire({
				title: 'DeleteUser',
				text: `Are you sure you want to delete the user ${user}`,
				icon: 'info',
				showCancelButton: true,
			})
			if (SwalDelete.isConfirmed) {
        const statusDeleteUser= await deleteUser(id)

        if(statusDeletedProduct.status === 200){
          Swal.fire({
            text: 'The user has been deleted successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          })
        }else{
          Swal.fire({
            text: `${statusDeleteUser.message}`,
            icon:'error',
          })
        }
			}
		} catch (error) {
			console.error(error)
		}
	}

	const deleteUser = async (id) => {
		try {
			const urlDeleteUser = getApiUrl(`deleteuser/${id}`)
			const getDeleteUser = await fetch(urlDeleteUser, {
				method: 'DELETE',
				headers: {
					'x-acces-token': token,
				},
			})

			if (getDeleteUser.status === 200) {
				getUsers()
        return ({status: getDeleteUser.status, message:getDeleteUser.message})
			}else{
        return ({status: getDeleteUser.status, message:getDeleteUser.message})
      }
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<form onSubmit={handleSumit} className="admin-actions">
				<input
					name="name"
					className="insert-input"
					placeholder="Username"
					onChange={handlechange}
				/>
				<input
					name="password"
					placeholder="Password"
					className="insert-input"
					onChange={handlechange}
				/>
				<button>Create user</button>
			</form>
			{users.map((user) => (
				<div className="admin-row" key={user.user_id}>
					<span>{user.user_name}</span>
					<div className="admin-row-actions">
						<BiEditAlt
							onClick={() => {
								handleOnClickEditUser(user.user_name, user.user_id)
							}}
						/>
						<RiDeleteBin6Line
							onClick={() => {
								handleOnClickDeleteUser(user.user_id, user.user_name)
							}}
						/>
					</div>
				</div>
			))}
		</>
	)
}
