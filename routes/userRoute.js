const fs = require('fs')
const { join } = require('path')

const filePath = join(__dirname, 'users.json')

const getUsers = () => {
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : []

    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }

}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) =>{
            const users = getUsers()

            res.send({users})
        })
        .post((req,res) => {
            const users = getUsers()
            users.push(req.body)
            saveUser(users)

            res.status(201).send('Usuário Criado com sucesso.')
        })
        .put((req,res) => {
            const users = getUsers()
            let pos = 0
            let i = 0
            users.forEach(user => {
                if (user.id === req.params.id)
                    pos = i
                i++
            })
            users[pos]=req.body;
            saveUser(users)
            res.status(200).send('Usuário atualizado com sucesso.')
        })
        .delete((req,res) => {
            const users = getUsers()

            let users2 = users.filter(user => user.id !== req.params.id)

            saveUser(users2)

            res.status(200).send('Usuário deletado')
        })
}

module.exports = userRoute

