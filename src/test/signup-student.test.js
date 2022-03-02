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

describe('student', () => {

    test('Should save a student', async () => {
        const data = {matricula: crypto.randomInt(999999), nome: generate(), email: `${generate()}@gmail.com`, senha: generate()};
        const response = await request('http://localhost:8080/auth/cadastro', 'post', data);
        expect(response.status).toBe(201);
        const post = response.data;
        //console.log(post.user)
        expect(post.user.email).toBe(data.email)
        expect(post.user.matricula).toBe(data.matricula)
        //console.log(data.matricula)
        await studentController.delete(data.matricula)
    });    
    
    test('Should return 409 if an user already exists', async function() {
        const data = {matricula: crypto.randomInt(999999), nome: generate(), email: `${generate()}@gmail.com`, senha: generate()};
        const response1 = await request('http://localhost:8080/auth/cadastro', 'post', data);
        const response2 = await request('http://localhost:8080/auth/cadastro', 'post', data);
    
        expect(response2.status).toBe(409);
        
        const post = response1.data;
        await studentController.delete(post.user.matricula)
    });
    
    test('Should return 400 (Bad Request) if no name is provided', async function() {
        const data = {matricula: crypto.randomInt(999999), email: `${generate()}@gmail.com`, senha: generate()};
        const response = await request('http://localhost:8080/auth/cadastro', 'post', data);
    
        expect(response.status).toBe(400);
    });
    
    /*test('Should return 400 (Bad Request) if no email is provided', async function() {
        const data = {matricula: crypto.randomInt(999999), nome: generate(), senha: generate()};
        const response = await request('http://localhost:8080/auth/cadastro', 'post', data);
        expect(response.status).toBe(400);
    })*/
    
    test('Should return 400 (Bad Request) if no password is provided', async function() {
        const data = {matricula: crypto.randomInt(999999), nome: generate(), email: `${generate()}@gmail.com`};
        const response = await request('http://localhost:8080/auth/cadastro', 'post', data);
    
        expect(response.status).toBe(400);
    });
    
    test('Should return 400 (Bad Request) if no registration number is provided', async function() {
        const data = {nome: generate(), email: `${generate()}@gmail.com`, senha: generate()};
        const response = await request('http://localhost:8080/auth/cadastro', 'post', data);
        
        expect(response.status).toBe(400);
    });
})
