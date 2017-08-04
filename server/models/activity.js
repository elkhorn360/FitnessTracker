'use strict';

const mongoose = require('mongoose');

const WayPoint = {
    //time: Date,
    point: {
        type: Object,
        index: '2dsphere'
    }
};

const ActivitySchema = new mongoose.Schema({
   uploader: {
        type: String
    },
    date: {
        type: Date
    },
    activityType: {
        type: String
    },
    comments: {
        type: String
    },
    waypoints: [WayPoint]
});

module.exports = mongoose.model('Activity', ActivitySchema);