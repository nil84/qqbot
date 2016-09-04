var discourse = require('../discourse');

(function () {


   /*
    @param content 消息内容
    @param send(content)  回复消息
    @param robot qqbot instance
    @param message 原消息对象
    */

   module.exports = function (content, send, robot, message) {
      if (message.from_group.name == "Sanwu.org/虚幻4交流群") {
         var fromUser = message.from_user.nick;
         var msg = fromUser + ': ' + content;
         discourse.createReply(msg);
      }
   };

}).call(this);


