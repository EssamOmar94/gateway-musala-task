'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Gateway Schema
 */

const GatewaySchema = new Schema({
    serial: {type: String, default: '', trim: true, maxlength: 500},
    name: {type: String, default: '', trim: true, maxlength: 500},
    ip: {type: String, default: '', trim: true, maxlength: 16},
    createdAt: {type: Date, default: Date.now}
});

/**
 * Validations
 */

GatewaySchema.path('serial').required(true, 'Gateway serial cannot be blank');
GatewaySchema.path('name').required(true, 'Gateway name cannot be blank');
GatewaySchema.path('ip').required(true, 'Gateway IP cannot be blank');

module.exports = mongoose.model('Gateway', GatewaySchema);
