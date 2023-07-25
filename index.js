
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
// const JWT = require('jsonwebtoken')
// const secretWord = 'Samus#Aran'

const credentials={
    host:'database-stockwise.co8aroe2kkll.us-east-1.rds.amazonaws.com',
    user:'admin',
    password:'azteca123',
    database:'StockWise'
}

app.get('/', (req, res) => {
	res.send('Api Desplegada')
})

app.post('/api/login', (req, res) => {
	const { username, password } = req.body
	const values = [username, password]
	var connection = mysql.createConnection(credentials)
	connection.query("SELECT * FROM Admin WHERE username = ? AND password = ?", values, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			if (result.length > 0) {
				res.status(200).send({
					"id": result[0].id,
					"user": result[0].user,
					"username": result[0].username
				})
			} else {
				res.status(400).send('Usuario no existe')
			}
		}
	})
	connection.end()
})

app.get('/api/producto', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM Server_Productos', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})




app.post('/api/guardar', (req, res) => {
	const { id,Nombre,Precio,Categoria } = req.body
	const params = [[id,Nombre,Precio,Categoria]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO Server_Productos (id,Nombre,Precio,Categoria) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Usuario creado" })
		}
	})
	connection.end()
})
app.post('/api/editar', (req, res) => {
	const {  Nombre,Precio,Categoria,id } = req.body
	const params = [Nombre,Precio,Categoria,id]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE Server_Productos set Nombre= ?, Precio= ?,Categoria=? WHERE id = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "USuario editado" })
		}
	})
	connection.end()
})

app.get('/api/categorias', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM Categoria', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.get('/api/ventasmes', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM Ventas_mes', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.get('/api/user', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM Admin', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.get('/api/productoServer', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM StockWise.Server_Inventario', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.get('/api/userSer', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM Admin', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})

app.get('/api/productoServer2', (req, res) => {
	var connection = mysql.createConnection(credentials)
	connection.query('SELECT * FROM StockWise.Server_Productos', (err, rows) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(rows)
		}
	})
})
app.post('/api/eliminarInven', (req, res) => {
	const { IDProducto } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM StockWise.Server_Inventario WHERE IDProducto = ?', IDProducto, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Eliminado Satisfactoriamente" })
		}
	})
	connection.end()
})

app.post('/api/editarSer', (req, res) => {
	const {Caducidad,Ingreso,Stock,IDProducto} = req.body
	const params = [ Caducidad,Ingreso,Stock,IDProducto]
	var connection = mysql.createConnection(credentials)
	connection.query('UPDATE StockWise.Server_Inventario set Caducidad= ?, Ingreso= ?,Stock= ? WHERE IDProducto = ?', params, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "USuario editado" })
		}
	})
	connection.end()
})

app.post('/api/guardarSer', (req, res) => {
	const { IDProducto ,Caducidad,Ingreso,Stock} = req.body
	const params = [[IDProducto,Caducidad,Ingreso,Stock]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO Server_Inventario (IDProducto,Caducidad,Ingreso,Stock) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "creado" })
		}
	})
	connection.end()
})

app.post('/api/guardarVenta', (req, res) => {
	const {Producto_id,Cantidad_vendida,Stock,Fecha} = req.body
	const params = [[Producto_id,Cantidad_vendida,Stock,Fecha]]
	var connection = mysql.createConnection(credentials)
	connection.query('INSERT INTO Ventas_mes (Producto_id,Cantidad_vendida,Stock,Fecha) VALUES ?', [params], (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "creado" })
		}
	})
	connection.end()
})

app.post('/api/eliminarVenta', (req, res) => {
	const { Producto_id } = req.body
	var connection = mysql.createConnection(credentials)
	connection.query('DELETE FROM Ventas_mes WHERE Producto_id = ?', Producto_id, (err, result) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send({ "status": "success", "message": "Eliminado Satisfactoriamente" })
		}
	})
	connection.end()
})



app.listen(4000, () => console.log('Serrvidor READYYYY'))