function index(req, res){
    req.getConnection((err,con)=>{
        con.query("SELECT * FROM tasks", (err, tasks)=>{
            if(err){
                res.json(err);
            }
            // console.log('>:)',tasks);
            res.render('task/index') 
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

module.exports={
    index:index,
    create:create,
    store:store
}