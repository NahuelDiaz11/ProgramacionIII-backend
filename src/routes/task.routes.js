import {Router} from 'express'
import {getTask,getTasks,createTask, updateTask, deleteTask} from '../controllers/task.controller.js'

const router =  Router()

router.get('/getTasks', getTasks)

router.get('/getTask/:id', getTask)

router.post('/createTask', createTask)

router.put('/updateTask/:id', updateTask)

router.delete('/deleteTask/:id', deleteTask)

export default router