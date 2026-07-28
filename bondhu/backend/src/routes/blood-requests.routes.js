const r=require('express').Router(),c=require('../controllers/blood-requests.controller');r.get('/',c.list);r.post('/',c.create);r.get('/:id',c.getById);r.post('/:id/match',c.match);module.exports=r;
