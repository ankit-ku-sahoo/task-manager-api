// CRUD operations - Create, Read, Update, Delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    // db.collection('users').findOne({name: 'Ankit'}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch user')
    //     }

    //     console.log(user)
    // })
    // db.collection('tasks').findOne({_id: new ObjectID("61a49400898cef4490e02ca0")}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch user')
    //     }
    //     console.log(user)
    // })

    // db.collection('tasks').find({}).toArray((error,users) => {
    //     console.log(users)
    // })

    db.collection('tasks').deleteOne({
        description: '2nd string'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})