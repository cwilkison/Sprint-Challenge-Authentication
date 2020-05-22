const supertest = require("supertest");
const server = require("./api/server.js");
const db = require("./database/dbConfig.js");

// beforeEach(async () => {
//     await db('users').truncate();
// })

   
    describe('/register POST', () => {

        it('register valid, returns 200', () => {
            return supertest(server)
                .post('/api/auth/register')
                .send({ username: 'real123', password: 'real123' })
                .then(response => {
                expect(response.status).toBe(200)
            })
        })

        
        it("register invalid, return 500", () => {
            return supertest(server)
                .post("/api/auth/register")
                .send({ username: 'real', password: 29})
                .then(response => {
                expect(response.status).toBe(500);
            });
        });

        it("returns JSON", () => {
            return supertest(server)
            .post('/api/auth/register')
            .send({ username: 'meow', password: 'meow'})
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
        } )

    })

    describe('/login POST', () => {


        it("returns JSON", () => {
            return supertest(server)
            .post('/api/auth/login')
            .send({ username: 'meow', password: 'meow'})
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
        } )
        
        it('login valid, returns 200', () => {
            return supertest(server)
                .post('/api/auth/login')
                .send({ username: 'livetest', password: 'livetest'})
                .then(response => {
                    expect(response.status).toBe(200)
                })
        })

        it('login invalid, returns 400', () => {
            return supertest(server)
            .post('/api/auth/login')
            .send({username: "wrong", password: "wrong"})
            .then(response => {
                expect(response.status).toBe(400)
            })
        })

    })

    describe("server", () => {
        
        it("/ GET", () => {
            return supertest(server)
            .get("/")
            .then(response => {
                expect(response.status).toBe(200);
            })
        })

        it("returns JSON", () => {
            return supertest(server)
            .get('/')
            .then(response => {
                expect(response.type).toMatch(/json/i);
            })
        } )
    })