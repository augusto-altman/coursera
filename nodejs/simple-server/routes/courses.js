const express = require("express");
const Joi = require("@hapi/joi");

const router = express.Router();
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];
const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
});

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const course = courses.find((c) => c.id === parseInt(id, 10));
  if (!course) {
    res.status(404).send(`Course ${id} not found`);
    return;
  }
  res.send(course);
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const { value, error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: value.name,
  };
  courses.push(course);
  res.send(course);
});

module.exports = router;
