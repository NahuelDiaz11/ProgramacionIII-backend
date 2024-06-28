
import app from './src/app.js'
import { conexion } from './src/db.js'

const port = app.get("port")

conexion()
app.listen(port)

app.get("/", (req, res) => {
    res.send('Hola Sergio. Deploy Funcionando :D')
})

console.log('Servidor escuchando en el puerto: ', port)