const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tmaj:tmaj@cluster0-mosyk.gcp.mongodb.net/MasjidDB', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});

require('./masjid.model');