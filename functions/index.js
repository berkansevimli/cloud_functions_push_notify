const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp(functions.config().functions);

var newData;


exports.messageNotification = functions.firestore.document("MessageNotify/{notifyId}").onCreate( async (snapshot, context) => {

    if(snapshot.empty){
        console.log('NO DEVICES');
        return;
    }


    newData=snapshot.data();
    var tokens = [];
    tokens = newData.receivers;
    
    // admin.firestore.collection("Users").document()
    var payload ={

        notification: {
            title: newData.sessionTitle,
            body: newData.senderName +': '+newData.message,
            sound: 'default',
        },

        data:{message: newData.message},
      
    }

    try {
        for(t of tokens){
            const response = await admin.messaging().sendToDevice(t, payload,   {
                // Required for background/quit data-only messages on iOS
                contentAvailable: true,
                // Required for background/quit data-only messages on Android
                priority: "high",
              });
            console.log('notification sended! ' + 'to : '+ t);
        }
       
        
    } catch (error) {

        console.log('Error: '+error.message);
        
    }

})

exports.sessionNotify = functions.firestore.document("SessionNotify/{notifyId}").onCreate( async (snapshot, context) => {

    if(snapshot.empty){
        console.log('NO DEVICES');
        return;
    }


    newData=snapshot.data();
    var tokens = [];
    tokens = newData.receivers;
    
    // admin.firestore.collection("Users").document()
    var payload ={

        notification: {
            title: newData.sessionTitle,
            body: newData.senderName +' ' +newData.message,
            sound: 'default',
        },

        data:{message: newData.message},
      
    }

    try {
        for(t of tokens){
            const response = await admin.messaging().sendToDevice(t, payload,   {
                // Required for background/quit data-only messages on iOS
                contentAvailable: true,
                // Required for background/quit data-only messages on Android
                priority: "high",
              });
            console.log('notification sended! ' + 'to : '+ t);
        }
       
        
    } catch (error) {

        console.log('Error: '+error.message);
        
    }

})
