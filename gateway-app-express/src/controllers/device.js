'use strict';

/**
 * Module dependencies.
 */

const Device = require('../models/device')

exports.list = async function (req, res) {
    console.log(req.query.id);
    const gatewayID = req.query.gateway_id;
    const devices = await Device.find({gateway_id: gatewayID});
    res.status(200).send({
        statusCode: 200, message: 'Listed Successfully', devices: devices,
    })

};

exports.create = async function (req, res) {
    const{uid,vendor,gateway_id,status} = req.body
    const gatewayDevicesCount = await Device.countDocuments({ gateway_id: gateway_id });
    if(gatewayDevicesCount<10){
    const device = new Device({
        uid: uid, vendor: vendor, status: status, gateway_id: gateway_id
    });
    device.save().then((savedData) => {
        const id = savedData._id;
        res.status(200).send({
            statusCode: 200, message: 'Created Successfully', device_id: id,
        });
    });
    }
    else{
        res.status(500).send({
            statusCode: 500, message: 'Device limit reached'
        });
    }
};

exports.update = async function (req, res) {
    console.log(req);
    const filter = {_id:req.body.id};
    const update = req.body;
    let device = await Device.findOneAndUpdate(filter, update, {
        new: true
    });
    res.status(200).send({
        statusCode: 200, message: 'Updated Successfully', device_id:device._id,
    });
};

exports.delete = function (req, res) {

    const {id} = req.body;
    Device.deleteOne({_id:id}).then((deleteRes) => {
        // const id = deleteRes._id;
        res.status(200).send({
            statusCode: 200, message: 'Deleted Successfully',
        });
    });
};
