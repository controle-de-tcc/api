const crypto = require('crypto');
const axios = require('axios');
const { StudentController } = require("../controllers/student")
const studentController = new StudentController();

const generate = () => {
    return crypto.randomBytes(8).toString('hex');
};

const request = (url, method, data) => {
    return axios({url, method, data, validateStatus: false})
}

test('Should return 401 if no token is provided to delete a student', async () => {
    const student = await studentController.create({matricula: crypto.randomInt(999999), nome: generate(), email: `${generate()}@gmail.com`, senha: generate()});
    const response = await request(`http://localhost:8080/aluno/${student.matricula}`)
    expect(response.status).toBe(400)
})