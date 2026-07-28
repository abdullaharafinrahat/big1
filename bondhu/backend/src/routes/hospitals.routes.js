const r=require('express').Router(),c=require('../controllers/hospitals.controller');r.get('/',c.list);r.post('/',c.create);r.get('/:id',c.getById);module.exports=r;
