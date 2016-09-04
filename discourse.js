var Discourse = require('discourse-api');
var config = require('./config');
var api = new Discourse(config.discourse.url, config.discourse.api_key, config.discourse.api_username);

var topic_id = '';
var slug = '';
var post_id = '';
var topic_title = '';

function createTopic() {
   var title = '虚幻4技术交流' + ' ' + _getVersionString();
   var content = '生命不息，探索不止，新的一天即将开始...';
   topic_title = title;
   console.log(title);
   console.log(content);
   api.createTopic(title, content, config.discourse.post_category, function (err, body, httpCode) {
      if (httpCode == 200) {
         console.log('create topic ' + title + ' success!');
         var json = JSON.parse(body);
         topic_id = json.topic_id;
         slug = json.topic_slug;
      } else {
         console.log('create topic ' + title + ' fail!');
         console.log(err, body, httpCode);
         if(err && err.code == 'ETIMEDOUT'){
            createTopic();
         }
      }


   });
}
// execute logTime for each successive occurrence of the text schedule
var CronJob = require('cron').CronJob;
var job = new CronJob({
  cronTime: '00 34 4 * * *',
  onTick: function() {
   createTopic();
  },
  start: false
});
job.start();

function createReply(msg) {
   if (msg.length < 5) {
      msg += '@ http:sanwu.org ';
   }
   console.log(msg);
   api.replyToTopic(msg, topic_id, function (err, body, httpCode) {
      if (httpCode == 200) {
         console.log('replay to topic ' + topic_title + ' success!');
      } else {
         console.log('replay to topic ' + topic_title  + ' fail!');
         console.log(err, body, httpCode)
      }

   });
}

function _getVersionString() {
   var time = new Date();
   var year = time.getFullYear() + '';

   year = year.substring(2);

   var mouth = (time.getMonth() + 1);
   if (mouth < 10) {
      mouth = '0' + mouth;
   }
   var date = time.getDate();
   if (date < 10) {
      date = '0' + date
   }
   var hour = time.getHours();
   if (hour < 10) {
      hour = '0' + hour;
   }
   return '' + year + mouth + date + hour;
}

exports.createReply = createReply;
exports.createTopic = createTopic;







