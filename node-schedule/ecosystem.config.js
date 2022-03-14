// pm2 start ecosystem.config.js --env production
// 왜 정상동작하지 않는가?
module.exports = {  
  apps : [{
    
    name   : "pm2_and_schedule",
    script : "./node-schedule.js",
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    },
    instances: 2,  // 0: max
    exec_mode: 'cluster'
  }]
}
