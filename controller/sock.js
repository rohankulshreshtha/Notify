//buisness logic
//buisness logic
//this gets triggered as soon as user opens the page
    client.on('connection',function(socket){             
            //wait for login info 
            socket.on('input', function(data){
                connections.push(socket);
                socket.username = data.name;
                users.push(data.name);
                var name = data.name;
                var col = db.collection('users').find({"name":name});   //find the user
                    col.each(function(err, data) {  
                        if(err) console.log("cannot parse the cursor");
                        if (data != null) {
                            connections[connections.indexOf(socket)].emit('info',data);     //send the info back to socket
                        } 
                    });
                });

            //adding a new user
            socket.on('add_info', function(data){
                //if user wants to a specific users specific field
                if(data.sub_to != "all"){
                    db.collection('users').insertOne( {     //insert user
                    "name" : data.name,"email": data.email,"phone": data.phone,"address": data.address,"sub" : []}
                    ,function(err, result) {
                        var json = {"name": data.name, "value":data.sub_field};
                        db.collection('users').update({"name": data.sub_to}, { $push: { "sub": json} }, function(err, added) {  //update the subscribedd user
                            if( err || !added ) 
                                console.log("not added.");
                            else 
                                console.log("added ");
                        });
                    });
                }
                //if user wants to all users
                else{
                     db.collection('users').insertOne( {
                    "name" : data.name,"email": data.email,"phone": data.phone,"address": data.address,"sub" : []}  //insert user
                    ,function(err, result) {
                            var json = {"name": data.name, "value":data.sub_field};
                            var col = db.collection('users').find();
                            col.each(function(err, result) {  
                                if(err) console.log("cannot parse the cursor");
                                if (result != null) {
                                    db.collection('users').update({"name": result.name}, { $push: { "sub": json} }, function(err, added) {  //update subscribed users
                                    if( err || !added ) 
                                        console.log("not added.");
                                    else 
                                        console.log("added ");
                                    });
                                } 
                             });
                            
                    });
                }
            });

            //updating the user and notifying the subscribed user
            socket.on('update_info', function(data){
                var col = db.collection('users').find({"name":data.name});
                col.each(function(err, user) {  //finding the user
                    if(err) console.log("cannot parse the cursor");
                    if (user != null) {
                    var email = (user.email == data.email),
                        phone = (user.phone == data.phone),
                        address = (user.address == data.address),
                        updated_fields = [];
                        db.collection('users').update(      //updating the user
                            { "name" : user.name},
                            {"name": user.name,"email": data.email,"phone": data.phone,"address": data.address,"sub": user.sub}
                            ,function(err, results) {
                                if(err) console.log("there was an error updating the user");
                            });
                        if(email == false)  updated_fields.push("email"); 
                        if(phone == false)  updated_fields.push("phone");
                        if(address == false)  updated_fields.push("address"); 
                        //sending notification to subscribed users of the updated info
                        for (var i in user.sub) {
                            if(users.indexOf(user.sub[i].name) !=-1){
                                if(updated_fields.indexOf(user.sub[i].value)!=-1)
                                    connections[users.indexOf(user.sub[i].name)].emit('notify',{name : user.name , value : user.sub[i].value});
                                if(user.sub[i].value == "all"){
                                    for(var j in updated_fields)
                                        connections[users.indexOf(user.sub[i].name)].emit('notify',{name : user.name , value : updated_fields[j]});
                                }
                            }
                        }
                    }
                 
                });
            });

            
            socket.on('disconnect', function(socket){
                connections.splice(connections.indexOf(socket),1);
                users.splice(connections.indexOf(socket),1);
            });
         });
