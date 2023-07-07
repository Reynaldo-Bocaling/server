import Student from "../models/StudentModel.js";

class StudentCotroller {
    static async register (req, res) {
        const {name, username, password} = req.body;
        try {
            await Student.createStudentAccount(name, username, password);
            return res.status(200).json({message: 'success'})
        } catch (error) {
            return res.status(200).json({message: error.message})
        }
    }

    static async list (req, res) {
        try {
            const response = await Student.findStudentTime();
            return res.status(200).json(response)
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }
}



export default StudentCotroller