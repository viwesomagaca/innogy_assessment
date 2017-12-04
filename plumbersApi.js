module.exports = function(plumbers) {

  var plumbersApiModel = plumbers.schedule;

  const registerPlumber = function(req, res, done) {
    var plum = req.body
    var weekdays = req.body.weekdays;
    var dailySlots = req.body.dailySlots;
    plumbersApiModel.findOneAndUpdate({
      name: plum.Name,
      cellNo: plum.cellNo,
      days: plum.days
    }, {
      slots: plum.slots
    }, function(err, createdOne) {
      if (err) {
        return done(err)
      } else
      if (!createdOne) {
        plumbersApiModel.create({
          name: plum.name,
          cellNo: plum.cellNo,
          days: plum.days,
          slots: plum.slots
        }, function(err, createdOne) {
          console.log("im creating a new plumber" + plum.name);
          if (err) {
            return done(err)
          }
        })
      }
      res.send(createdOne)
    })
  }

  const index = function(req, res, done) {
    plumbersApiModel.find({}, function(err, result) {
      if (err) {
        return done(err)
      }
      res.send(result)
    })
  }

  const plumberBookings = function(req, res, done) {
    var Days = req.params.day;
    var Slots = req.params.slots;

    plumbersApiModel.find({
      days: Days,
      slots: Slots
    }, function(err, result) {
      if (err) {
        return done(err)
      }
      console.log(result);
      res.send(result)
    })
  }

  const bookedPlumbers = function(req, res, done) {
    var id = req.params.id;

    plumbersApiModel.findOneAndUpdate({
      _id: id
    }, function(err, result) {
      if (err) {
        return done(err)
      }
      res.send("Booking sucessfull")
    })
  }

  return {
    index,
    registerPlumber,
    plumberBookings,
    bookedPlumbers
  }
}
