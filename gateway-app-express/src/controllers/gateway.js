'use strict';

/**
 * Module dependencies.
 */

const Gateway = require('../models/gateway')

exports.list = async function (req, res) {
    const gateways = await Gateway.find({});
    res.status(200).send({
        statusCode: 200, message: 'Listed Successfully', gateways: gateways,
    })

};

exports.create = function (req, res) {
    const{ip,serial,name} = req.body
    const gateway = new Gateway({
        ip: ip, serial: serial, name: name,
    });
    gateway.save().then((savedData) => {
        const id = savedData._id;
        res.status(200).send({
            statusCode: 200, message: 'Created Successfully', gateway_id: id,
        });
    });
};

exports.update = function (req, res) {
    gateway.save().then((savedData) => {
        const id = savedData._id;
        res.status(200).send({
            statusCode: 200, message: 'Created Successfully', gateway_id: id,
        });
    });
};

exports.delete = function (req, res) {
    const {id} = req.body;
    Gateway.deleteOne({_id:id}).then((deleteRes) => {
        res.status(200).send({
            statusCode: 200, message: 'Deleted Successfully',
        });
    });
};
