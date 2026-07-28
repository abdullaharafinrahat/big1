const{env}=require('./env');module.exports={url:env.RABBITMQ_URL,queues:['blood-request.created','donors.notify']};
