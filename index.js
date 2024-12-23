const express = require('express')
const app = express()
const port = 3000
const data = require('./coursedata.json')
const fs = require('fs')

app.use(express.json())
app.get('/', (req, res) => {
    res.send('hello working api')
})
app.get('/getdata', (req, res) => {
    // res.send(data)
    res.json({ success: true, message: data })
})
app.post('/create', (req, res) => {
    const body = req.body
    console.log(body)
    data.push({ ...body, id: data.length + 1 })
    console.log(data)
    fs.writeFile('./coursedata.json', JSON.stringify(data), (err, d) => {
    })
    res.send('post req')
})

//dynamic routing
app.get('/read/:id', (req, res) => {
    const identitynumber = Number(req.params.id)
    const u = data.find((u) => u.id === identitynumber)
    console.log(u)
    res.send(u)
})
//Update
app.patch('/update/:id', (req, res) => {
    const identitynumber = Number(req.params.id)
    const u = data.find((u) => u.id === identitynumber)
    u.first_name = 'dhanalakshmi d/o retired'
    fs.writeFile('./coursedata.json', JSON.stringify(data), (err, data) => {
    })
    res.send('data')
})
//delete
app.delete('/del/:id', (req, res) => {
    const identityNumber = Number(req.params.id);
    const u = data.find((u) => u.id === identityNumber);
    const var1 = delete data[identityNumber - 1]
    if (var1 === true) {
        fs.writeFile('./coursedata.json', JSON.stringify(data), (err, data) => {
            res.json({ status: 'successfully deleted', data: data });
        });
    } else {
        res.send('error in delelting that object')
    }
});

app.listen(port, () => {
    console.log('server started')
})