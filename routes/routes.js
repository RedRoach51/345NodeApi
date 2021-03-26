const pool = require('../data/config');

const users = [{
	id:1,
	name:"Insturctor",
	email:"instructor_345@stevens.edu",
},
{
	id:2,
	name:"TA",
	email:"ta_345@stevens.edu",
},
];

const router = app => {
	app.get('/', (request, response) => {
		response.send({
			message:'Node.js and Express REST API'
		});
	});
	app.get('/users', (request, response) => {
		response.send(users);
	});
	app.get('/handles',(request,response) => {
		pool.query('SELECT * FROM Handle', (error,result) => {
			if (error) throw error;

			response.send(result);
		});
	});
    app.post('/handles', (request, response) => {
        pool.query('INSERT INTO Handle SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`Developer added`);
        });
    });
	app.get('/handles/:handle',(request,response) => {
		const handle = request.params.handle;
		pool.query('SELECT * FROM Handle WHERE handle = ?', handle, (error,result) => {
			if (error) throw error;

			response.send(result);
		})
	})

}

module.exports = router;