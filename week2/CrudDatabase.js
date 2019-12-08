const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const port = 3000


app.use(cors())
app.use(bodyParser())

const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "PASSWORD",
    database : "todo_app"
})

connection.connect((error)=>{
    if(!error) console.log("Database successfully connected")
    else console.log("Connection error")
})

//Get All To Do Items

app.get("/todos/load", (req,res,next)=>{
    connection.query("select * from todo_items", (err, rows, fields)=>{
        if(!err) res.send(rows)
        else console.log("Connection error")
    })

})

//Get Specific Todo Item

app.get("/todos/load/:id", (req,res,next)=>{
    connection.query("select * from todo_items where id = ? ", req.params.id, (err, row, fields)=>{
        if(!err) res.send(row)
        else res.send(err)
    })
})

//Create Todo item

app.post("/todos/create", (req, res, next)=>{
    connection.query("insert into todo_items set ?", req.body, (err, row, fields)=>{
        if(!err) res.send(result)
        else res.send(err)
    })
})

//Delete Todo item

app.delete("/todos/delete/:id", (req, res, next)=>{
    connection.query("delete from todo_items where id = ? ", req.params.id, (err,row, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} successfully deleted`)
        else res.send(err)
    })
})

//Update Todo Item

app.put("/todos/update/:id ", (req,res,next)=>{
    connection.query("update todo_items set text = ? where id: ?", [req.body.text, req.params.id], (err, result, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} successfully updated`)
        else res.send(err)
    })
})

//Tag Todo Item

app.post("/todos/tagTodoItem", (req, res, next)=>{
    connection.query("insert into todo_item_tag set ?", req.body, (err, result, fields)=>{
        if(!err) res.send('Todo item successfully tagged')
        else res.send(err)
    })
})

//Untag Todo Item
app.delete("/todos/untagTodoItem/:id",(req, res, next)=>{
    connection.query("delete from todo_item_tag where todo_item_id = ?",[req.params.id], (err, result, fields)=>{
    if(!err) res.send(`Todo item successfully tagged`)
    else res.send(err)
    })
})

//Mark Todo Item As Completed

app.put("/todos/markCompleted/:id", (req,res,next)=>{
    connection.query("update todo_items set is_completed = true where id = ?", req.params.id, (err, result, fields)=>{
        if(!err) res.send(`Todo item with id: ${req.params.id} successfully marked as completed`)
        else res.send(err)
    })
})

app.listen(port, ()=>{
    console.log(`Our server is running on port: ${port}`)
})