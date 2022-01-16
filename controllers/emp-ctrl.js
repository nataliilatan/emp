const Employee = require('../models/emp-model.js')

createEmployee = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an employee',
        })
    }

    const employee = new Employee(body)

    if (!employee) {
        return res.status(400).json({ success: false, error: err })
    }

    employee
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: employee._id,
                message: 'Employee added!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Employee not added!',
            })
        })
}

updateEmployee = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a profile to update',
        })
    }

    Employee.findOne({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Employee not found!',
            })
        }
        employee.name = body.name
        employee.surname = body.surname
        employee.age = body.age
        employee.position = body.position
        employee.gender = body.gender
        employee.tel = body.tel
        employee.email = body.email
        employee.date = body.date
        employee.url = body.url
        employee.city = body.city
        employee.openKey = body.openKey
        employee.description = body.description
        employee.password = body.password
        employee.color = body.color
        employee.maritialStatus =  body.maritialStatus
        employee
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: employee._id,
                    message: 'Profile updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Profile not updated!',
                })
            })
    })
}

deleteEmployee = async (req, res) => {
    await Employee.findOneAndDelete({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!employee) {
            return res
                .status(404)
                .json({ success: false, error: `Profile not found` })
        }

        return res.status(200).json({ success: true, data: employee })
    }).catch(err => console.log(err))
}

getEmployeeById = async (req, res) => {
    await Employee.findOne({ _id: req.params.id }, (err, employee) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!employee) {
            return res
                .status(404)
                .json({ success: false, error: `Profile not found` })
        }
        return res.status(200).json({ success: true, data: employee })
    }).catch(err => console.log(err))
}

getEmployees = async (req, res) => {
    await Employee.find({}, (err, employees) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!employees.length) {
            return res
                .status(404)
                .json({ success: false, error: `Profile not found` })
        }
        return res.status(200).json({ success: true, data: employees })
    }).catch(err => console.log(err))
}

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeById,
}
