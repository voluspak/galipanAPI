const express = require('express')
const app = express()
const logger = require('./middlewareLogger')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use(logger)

let productos = [
  {
    id: 1,
    img: '../assets/rol1.jpg',
    name: 'Rollos de canela',
    price: 19,
    unid: 'x 4 Rolls',
    stock: 20
  },
  {
    id: 2,
    img: '../assets/rol2.jpg',
    name: 'Rollos de canela',
    price: 22,
    unid: 'x 6 Rolls',
    stock: 20
  },
  {
    id: 3,
    img: '../assets/pan-de-jamón.jpg',
    name: 'Pan de jamon',
    price: 15,
    unid: 'x 1 unid',
    stock: 20
  },
  {
    id: 4,
    img: '../assets/golfeado.jpg',
    name: 'Golfeado',
    price: 20,
    unid: 'x 4 unid',
    stock: 20
  },
  {
    id: 5,
    img: '../assets/cupcake.jpg',
    name: 'Cupcake',
    price: 26,
    unid: 'x 6 unid',
    stock: 20
  },
  {
    id: 6,
    img: '../assets/tortarol.jpg',
    name: 'Torta rol',
    price: 25,
    unid: '1 unid',
    stock: 20
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Bienvenido a GalipanApp!</h1> <p>Utiliza el path /api/productos para acceder a la lista de productos</p>')
})

app.get('/api/productos', (request, response) => {
  response.status(200).json(productos)
})

app.post('api/productos', (request, response) => {
  const producto = request.body
  const ids = productos.map(prod => prod.id)
  const maxId = Math.max(...ids)

  const newProd = {
    id: maxId + 1,
    img: producto.img,
    name: producto.name,
    price: producto.price,
    unid: producto.unid,
    stock: producto.stock !== 'undefined' ? producto.stock : 0
  }

  productos = [...productos, newProd]
  response.status(201).json(newProd)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Path not found'
  })
})

const PORT = process.env.PORT || 3002

app.listen(PORT, () => console.log(`Running server on port ${PORT}!`))
