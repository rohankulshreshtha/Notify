//This file contains the script of all the socket emits and listning for response on socket on frontend

    //getting field variables
    var name = document.getElementById("name").value,
        email = document.getElementById("email").value,
        address = document.getElementById("address").value,
        phone = document.getElementById("phone").value,
        notifications = document.getElementById("messages");
        try{
            var socket = io.connect('http://127.0.0.1:8080');//connecting to socket on different port
        }catch(e)
        {
            console.log("unable to connect");
        }
        
        if(socket !== undefined)
        {
            //Lisen for output after login and assigning fields with response
            socket.on('info', function(data){
                document.getElementById("name").value = data.name;
                document.getElementById("email").value = data.email;
                document.getElementById("address").value = data.address;
                document.getElementById("phone").value = data.phone;
            });
 
            //Lisen for output form other user on update notification
            socket.on('notify', function(data){
                var notification = document.createElement('div');
                    notification.setAttribute('class','message');
                    notification.textContent = data.name + ' : has changed its ' + data.value ;
                    notifications.appendChild(notification);
                    notifications.insertBefore(notification, notifications.firstChild);
            });
        }

        
        //submitting the info on login to the socket
        function submit(id) {
          var e = document.getElementById(id),
              f = document.getElementById("form_initial"),
              g = document.getElementById("add_button"),
              name_initial = document.getElementById("name_initial").value; //sending the data to socket
              socket.emit('input',{name: name_initial});        //hiding other fields on success
                if(e.style.display == 'block')
                  e.style.display = 'none';
                else
                  e.style.display = 'block';
              f.style.display = 'none';
              g.style.display = 'none';
        } 
        
        //submitting the updated info to the socket
        function update(){
            var data = {};
            data.name = document.getElementById("name").value,
                data.email = document.getElementById("email").value,
                data.address = document.getElementById("address").value,
                data.phone = document.getElementById("phone").value;        //sending the data to socket
                socket.emit('update_info',data);
                document.getElementById('updated').innerHTML = "User Updated"
        }

        //adding the user and data to socket
        function add(id){
            var data = {};
                data.name = document.getElementById("name_add").value,
                data.email = document.getElementById("email_add").value,
                data.address = document.getElementById("address_add").value,
                data.phone = document.getElementById("phone_add").value,
                data.sub_to = document.getElementById("sub_to").value,
                data.sub_field = document.getElementById("sub_field").value;
                socket.emit('add_info',data);           //sending the data to socket
            var e = document.getElementById(id);        //hiding other fields on success
                f = document.getElementById("add_form");
                if(e.style.display == 'block')
                    e.style.display = 'none';
                else
                    e.style.display = 'block';
                f.style.display = 'none';
                document.getElementById('added').innerHTML = "User Added"
        }

        //hiding other fields on success using javascript
        function showadd(id){
            var e = document.getElementById(id),
                f = document.getElementById("add_button"),
                g= document.getElementById("form_initial");
            if(e.style.display == 'block')
                e.style.display = 'none';
            else{
                e.style.display = 'block';
                f.style.display = 'none';
                g.style.display = 'none';
            }
        }