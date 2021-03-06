var express = require("express"),
    app     = express()
var _ = require("underscore");
//var mongoose = require('mongoose');

var posts = [{
        id: 1,
        title: 'Post 1',
        text:  'Texto del Post 1.'
},
    {
        id: 2,
        title: 'Post 2',
        text:  'Texto del Post 2.'
    }
];


// configuration _______________________________________________________________________________________ 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.errorHandler());
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/app'));
    app.use(express.errorHandler());
    app.use(app.router);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

app.get("/", function(req, res) {
    res.redirect("/index.html");
});

// _____________________________________________________________________________________________________ 

// mongo db ____________________________________________________________________________________________ 

//var db = mongoose.connection;
//
//db.on('error', console.error);
//
//db.once('open', function() {
//    // Schema
//    var postSchema = new mongoose.Schema({
//        id: Number,
//        title: { type: String },
//        text:  { type: String }
//    });
//    // Mongoose also creates a MongoDB collection called 'Posts' for these documents.
//    var singlePost = mongoose.model('singlePost', postSchema);
//
//    // examples ____________________________________________________________________________________________
//
//    var post_example1 = new singlePost({
//        id: 1,
//        title: 'Recruiting Advice No One Tells You',
//        text:  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consectetur venenatis blandit. Praesent vehicula, libero non pretium vulputate, lacus arcu facilisis                lectus, sed feugiat tellus nulla eu dolor. Nulla porta bibendum lectus quis euismod. Aliquam volutpat ultricies porttitor. Cras risus nisi, accumsan vel cursus ut,                    sollicitudin vitae dolor. Fusce scelerisque eleifend lectus in bibendum. Suspendisse lacinia egestas felis a volutpat.'
//    });
//
//    var post_example2 = new singlePost({
//        id: 2,
//        title: 'How to start writing and get closer to your goals',
//        text:  'You have been thinking about starting a blog or writing a novel for a long time. You want to write but you just never do it. The best time was 5 years ago; the second                 best time is now. So, what keeps you away from your goals?'
//    });
//
//    var contID = 2;
//
//    post_example1.save();
//    post_example2.save();
//
    // _____________________________________________________________________________________________________ 

var contID = posts.length;

    // get all posts
    app.get('/api/myPosts', function(req, res){
//        singlePost.find(function(err, myPosts) {
//            if (err) return console.error(err);
//            res.send (myPosts);
//        });
        res.send (posts) ;
    });
        
    //get a particular post by ID
    app.get('/api/myPosts/:id', function(req, res){
        selPost = _.find(posts, function(itemPost){return itemPost.id == req.params.id});
        res.send(selPost);
//        var taskIndex = singlePost.indexOf(selPost);
//        myTasks[taskIndex].hecho = !myTasks[taskIndex].hecho;
//        singlePost.findOne({ id: req.params.id }, function(err, selPost) {
//            if (err) return console.error(err);
//            res.send (selPost);
//            });

    });
    
    // create a new post
    app.put('/newPost', function(req, res) { 
        var newPost = {
            id: ++contID,
            title: req.body.title,
            text: req.body.text
        };

        posts.push(newPost);
        res.json(true);
    });
    
    // update a created post
    app.post('/editPost', function(req, res) {
        selPost = _.find(posts, function(itemPost){return itemPost.id == req.body.id});
        var postIndex = posts.indexOf(selPost);
        posts[postIndex].title  = req.body.title;
        posts[postIndex].text  = req.body.text;


//        singlePost.findOne({ id: req.body.id }, function (err, selPost){
//            selPost.title = req.body.title;
//            selPost.text = req.body.text;

//        });
        res.json(true);
    }); 

    // delete a particular post
    app.delete('/delete/:id', function(req, res) {
        selPost = _.find(posts, function(itemPost){return itemPost.id == req.params.id});
        var postIndex = posts.indexOf(selPost);
        posts.splice(postIndex, 1);
//        singlePost.remove({ id: req.params.id }, function (err) {
//            if (err) return handleError(err);
            // removed!
            res.json(true);   
//        });
    });
//});

// _____________________________________________________________________________________________________ 

//mongoose.connect('mongodb://localhost/test');