'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Device Schema
 *    •    a UID (number),
 *    •    vendor (string),
 *    •    date created,
 *    •    status - online/offline.
 */

const DeviceSchema = new Schema({
    uid: {type: Number, default: 0, trim: true, maxlength: 500},
    vendor: {type: String, default: '', trim: true, maxlength: 500},
    status: {type: Boolean, default: false, trim: true},
    gateway_id: {type: Schema.Types.ObjectId, ref: 'Gateway'},
    createdAt: {type: Date, default: Date.now}
});

/**
 * Validations
 */

DeviceSchema.path('uid').required(true, 'Device UID cannot be blank');
DeviceSchema.path('vendor').required(true, 'Device Vendor cannot be blank');

module.exports = mongoose.model('Device', DeviceSchema);
