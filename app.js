const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const app=express();
//init app
const port=3000;


//set storage engine for multer
const storage=multer.diskStorage({
  destination:'./public/uploads/',
  filename:(req,file,cb)=>{
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  }
});

//Init Upload Variable

const upload = multer({
  storage:storage,
}).single('myImage');


app.set('view engine','ejs');

app.use(express.static('./public'));

app.get('/',(req,res)=>{
  res.render('index');
})
app.post('/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if (err) {
      res.render('index',{
        msg:err
      });
    }

    else{
      console.log(req.file);
      res.send('test',{
        file:`/uploads/${req.file.filename}`,
        msg:'File Uploaded Successfully'
      });
    }
  })
})
app.listen(port,()=>{
  console.log('Server started on port '+port);
})
