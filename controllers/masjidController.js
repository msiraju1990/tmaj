const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Masjid = mongoose.model('Masjid');

router.get('/', (req, res) => {
    res.render("masjid/addOrEdit", {
        viewTitle: "Insert masjid"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var masjid = new Masjid();
    masjid.fullName = req.body.fullName;
    masjid.email = req.body.email;
    masjid.address = req.body.address;
    masjid.city = req.body.city;
    masjid.pincode = req.body.pincode;
    masjid.contactperson = req.body.contactperson;
    masjid.mobile = req.body.mobile;
    masjid.save((err, doc) => {
        if (!err)
            res.redirect('masjid/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("masjid/addOrEdit", {
                    viewTitle: "Insert Masjid",
                    masjid: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Masjid.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('masjid/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("masjid/addOrEdit", {
                    viewTitle: 'Update Masjid',
                    masjid: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Masjid.find((err, docs) => {
        if (!err) {
            res.render("masjid/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving masjid list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Masjid.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("masjid/addOrEdit", {
                viewTitle: "Update Masjid",
                masjid: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Masjid.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/masjid/list');
        }
        else { console.log('Error in masjid delete :' + err); }
    });
});

module.exports = router;