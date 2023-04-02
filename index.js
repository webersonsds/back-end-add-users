
const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')


const port =  3001     // configuraçao da porta para rodar projeto

const users = [ ]

const app = express()
app.use(express.json())
app.use(cors())







const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)


    if (index < 0) {

        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index
    request.userId = id
    next()
}


app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})



app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updetedUser = { id , name, age }


    users[index] = updetedUser


    return response.json(updetedUser)

    next()
})




app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex



    users.splice(index, 1)

    return response.status(204).json()
    next()
})





app.listen(3001, () => {

    console.log(`Server started on port 3001 ${port}`)

})