const r=require('express').Router(),c=require('../controllers/cms.controller');r.get('/notices',c.notices);r.get('/news',c.news);r.post('/news',c.createNews);module.exports=r;
