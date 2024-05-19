const bcrypt = require('bcrypt');

// Función para mostrar el formulario de registro

function destroy(req,res){
    const id =req.body.id;
    req.getConnection((err,con)=>{
       con.query("DELETE FROM tasks WHERE id = ?", [id], (err, rows)=>{
           res.redirect('/task')
       })
    })
   }

function showRegister(req, res) {
    res.render('task/register');
}
// Función para manejar el registro de usuarios
function register(req, res) {
    const username =req.body.username;
    const password =req.body.password;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            return res.render('task/register',{ error: `Error al crear el usuario '${req.body.username}'` });
        }
        req.getConnection((err, con) => {
            if (err) {
                return res.render('task/register', { error: "Database connection error" });
            }
            con.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
                if (err) {
                    return res.render('task/register', { error: `Error al crear el usuario '${username} ${password}'` });
                }
                res.redirect('/');
            });
        });
    });
}

// Función para mostrar el formulario de login
function login(req, res) {
    res.render('task/login');
}

// Función para manejar el login
function authenticate(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    req.getConnection((err, con) => {
        if (err) {
            // Manejo de errores de conexión a la base de datos
            return res.status(500).send("Error de conexión a la base de datos");
        }
    
        con.query("SELECT * FROM users WHERE username = ?", [username], (err, users) => {
            if (err) {
                // Manejo de errores en la consulta SQL
                return res.status(500).send("Error al buscar el usuario");
            }
    
            if (users.length === 0) {
                // Usuario no encontrado
                return res.render('task/login', { error: "Nombre de usuario o contraseña incorrectos" });
            }
    
            const user = users[0];
            // Verificación segura de la contraseña
            if (password === user.password) {
                // Contraseña correcta, establecer sesión y redirigir
                req.user = user;
                return res.redirect('/task');
            } else {
                // Contraseña incorrecta
                return res.render('task/login', { error: "Nombre de usuario o contraseña incorrectos" });
            }
        });
    });
    


}

// Función para manejar el logout
function logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
}

// Función para mostrar la lista de tareas
function index(req, res){
    req.getConnection((err,con)=>{
        con.query("SELECT * FROM tasks", (err, tasks)=>{
            if(err){
                res.json(err);
            }
            // console.log('>:)',tasks);
            res.render('task/index',{tasks}) 
        });
    })
}
function create(req, res){
    res.render('task/create') 
}
function store(req, res){
    const data = req.body;
    req.getConnection((err,con)=>{
        con.query('INSERT INTO tasks SET ?',[data], (err,rows)=>{
            res.redirect('/task');
        })
    })
    // res.render('task/store') 
}
function destroy(req,res){
 const id =req.body.id;
 req.getConnection((err,con)=>{
    con.query("DELETE FROM tasks WHERE id = ?", [id], (err, rows)=>{
        res.redirect('/task')
    })
 })
}

function edit(req, res){
    const id =req.params.id;
    req.getConnection((err,con)=>{
        con.query("SELECT * FROM tasks WHERE id = ? ",[id], (err, tasks)=>{
            if(err){
                res.json(err);
            }
            // console.log('>:)',tasks); 
            res.render("task/edit", {tasks});
        });
    })
}
function update(req, res) {
    const id =req.params.id;
    const data =req.body;
    // console.log('>:)',id+data)
    req.getConnection((err,con)=>{
        con.query('UPDATE tasks SET ? WHERE id = ?', [data, id], (err,rows)=>{
            res.redirect('/task');
        });
    })
    
}

module.exports = {
    login,
    authenticate,
    index,
    create,
    store,
    destroy,
    edit,
    update,
    logout,
    showRegister,
    register
};
