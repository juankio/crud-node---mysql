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

module.exports={
    index:index,
    create:create,
    store:store,
    destroy:destroy,
    edit:edit,
    update:update,
}