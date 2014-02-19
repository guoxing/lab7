var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback
  models.Project.findById(projectID, afterQuery);

  function afterQuery(err, project) {
    if(err) console.log(err);
    res.json(project);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);
  var project = new models.Project({
    title: form_data.project_title,
    date: form_data.date,
    summary: form_data.summary,
    image: form_data.image_url
  });
  project.save(function (err) {
    if (err) {
      console.log(err);
      res.send(400);
      return;
    }
    res.send(200);
  });
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
  models.Project.findByIdAndRemove(projectID, function(err) {
    if (err) {
      console.log(err);
      res.send(400);
      return;
    }
    res.send(200);
  });
}
