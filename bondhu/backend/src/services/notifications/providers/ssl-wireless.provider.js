exports.sendSms=async(to,message)=>{console.log('[ssl-wireless]',to,message);return{provider:'ssl-wireless',to,status:'queued'}};
