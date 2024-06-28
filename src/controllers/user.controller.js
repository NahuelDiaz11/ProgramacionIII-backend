import User from '../models/user.model.js'
import Bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    
    const {username, password, email} = req.body

    try {

        const passwordHash = await Bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            password: passwordHash,
            email
        })
        
        const savedUser = await newUser.save()             

        res.cookie('token', token)
        res.json({ 
            msg: 'Usuario Registrado Correctamente',
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            createdAt: savedUser.createdAt,
            updatedAt: savedUser.updatedAt
        })
        

    } catch (error) {

        res.status(500).json({message: error.message})

    }
}

export const login = async (req, res) => {

    const {password, email} = req.body

    try {
        
        const userFound = await User.findOne({email})

        if (!userFound) return res.status(400).json({message: "Usuario No Encontrado."}); 
        const isMatch = await Bcrypt.compare(password, userFound.password) 

        if (!isMatch) return res.status(400).json({message: "Constraseña Invalida."}) 

        const token = await CreateAccessToken({id: userFound._id})


        res.cookie('token', token)
        res.json({ 
            msg: 'Usuario Logueado Exitosamente',
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })

    } catch (error) {

        res.status(500).json({message: error.message})

    }
}

export const logout = async (req, res) => {
    res.cookie('token', "",{expires: new Date(0)})
    return res.send('Usuario Cerrado Exitosamente')    
}