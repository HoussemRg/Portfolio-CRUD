const express=require("express");
const app=express();
const port = process.env.PORT || 3001
const mongoose = require('mongoose');
app.use(express.urlencoded({extended:true}));
const User=require('./models/userSchema');
app.set('view engine', 'ejs');
app.use(express.static('public'))
let moment = require('moment');
let methodOverride = require('method-override')
app.use(methodOverride('_method'))
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
require('dotenv').config();


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.post('/',(req,res) => {
  
  let userData=new User(req.body);
  userData.save().then(() => {
    res.redirect('/');
  }
  ).catch((err) => {
    console.log(err);
  }
  )
}
)

app.get("/",(req,res) => {
    res.render("index");
}
)
app.get("/contacts",(req,res) => {
    User.find().then((result) => {
        res.render("user/contacts",{arr:result,moment:moment});
    }
    ).catch((err) => {
      console.log(err);
    }
    ) 
}
)

app.delete('/contacts/:id',(req,res) => {
  User.deleteOne({_id:req.params.id}).then(() => {
    res.redirect('/contacts')
  }
  ).catch((err) => {
    console.log(err);
  })
}
)
app.get("/view/:id",(req,res) => {
    User.findById(req.params.id).then((result) => {
        res.render("user/view",{res:result,moment:moment});
    }
    ).catch((err) => {
      console.log(err);
    }
    ) 
}
)

app.get("/edit/:id",(req,res) => {
  User.findById(req.params.id).then((result) => {
    res.render("user/edit",{res:result});
}
).catch((err) => {
  console.log(err)
})
})

app.put('/edit/:id',(req,res) => {
  User.findByIdAndUpdate(req.params.id,req.body)
  .then(() => {
    res.redirect('/contacts')
  }
  ).catch((err) => {
    console.log(err);
  }
  )
}
)


mongoose.connect(process.env.DB_URI)
.then(() => {
  app.listen(port,() => {
    
    console.log(`http://localhost:${port}`);
    console.log("connected to database");
  }
  )
}
).catch((err) => {
  console.log(err);
}
)