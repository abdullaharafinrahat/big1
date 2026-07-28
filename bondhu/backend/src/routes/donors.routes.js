const r=require('express').Router(),c=require('../controllers/donors.controller');r.get('/',c.list);r.post('/',c.create);r.get('/nearby',c.nearby);r.get('/:id',c.getById);module.exports=r;
