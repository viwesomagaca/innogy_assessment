const mongoose = require('mongoose');
module.exports = function(mongoUrl) {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoUrl);

    const schedule = mongoose.model('schedule', {
        name: String,
        cellNo: Number,
        days: Array,
        slots: Array
    })

    return {
    schedule
    };
}
