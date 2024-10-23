import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const { page = 1, limit = 3 } = req.query; 

    try {
        const options = {
            page: parseInt(page), 
            limit: parseInt(limit), 
            populate: 'user' 
        };

        const tasks = await Task.paginate({}, options);

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTask = async (req, res) => {

    try {

        const task = await Task.findById(req.params.id).populate('user')
        if (!task) return res.status(404).json; res.json(task)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}

export const createTask = async (req, res) => {

    try {
        
        const { title, description, date } = req.body
      
        const newTask = new Task({
            title,
            description,
            date,
            user: req.user.id
        })

        const savedTask = await newTask.save()
        res.json(savedTask)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })

    }
}

export const updateTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!task) return res.status(404).json({ message: 'Tarea no Encontrada' }); res.json(task)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}

export const deleteTask = async (req, res) => {

    try {

        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: 'Tarea no Encontrada' }); return res.sendStatus(204)

    } catch (error) {

        res.status(500).json({ message: error.message })

    }
}