const express = require('express');
const { update } = require('../models/Drone.model');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here

router.get('/drones', async (req, res, next) => {
 const drones = await Drone.find();
 console.log(drones);

 res.render("drones/list", {drones});
});

//http://localhost:3000/drones/123456

// router.get("/drones/:droneId", async (req, res) => { //..shows that its a parameter from the url
//  const drone = await Drone.findById(req.params.droneId);
//  res.render("drones/drone-detail", drone);
//  });

router.get('/drones/create', (req, res) => {
 res.render("./drones/create-form");
});

router.post("/drones/create", async (req, res) => {
const { name, propellers, maxSpeed } = req.body;

const newDrone = await Drone.create({ name, propellers, maxSpeed });

console.log(newDrone);

res.redirect("/drones");
});


router.get('/drones/:id/edit', async (req, res, next) => {
 const drone = await Drone.findById(req.params.id);
 res.render("drones/update-form", drone);
});


router.post('/drones/:id/edit', async (req, res, next) => {
const { name, propellers, maxSpeed } = req.body;
await Drone.findByIdAndUpdate(req.params.id, {
  name,
  propellers,
  maxSpeed,
});
res.redirect("/drones");
});


router.post('/drones/:id/delete', async (req, res) => {
await Drone.findByIdAndRemove(req.params.id);
res.redirect("/drones");
});

module.exports = router;
