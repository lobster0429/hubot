var google = {};
google.key = process.env.GOOGLE_API_KEY;
google.cid = process.env.GOOGLE_OAUTH_ID;
google.cx  = process.env.GOOGLE_CSE_CX;

module.exports = function(robot){
  robot.respond(/help!/, function(res){
    res.send('你可以這樣用：\n唱(空格)關鍵字\n圖(空格)關鍵字');
  });

  robot.respond(/[\u5531] (.*)$/, function(msg){
    var query = msg.match[1];
    robot.http('https://www.googleapis.com/youtube/v3/search')
      .query({
        client_id: google.cid,
        key: google.key,
        order: 'relevance',
        part: 'snippet',
        type: 'video',
        q: query,
      })
      .get()(function (err, res, body) {
        if (err) msg.send(err); 
        if (res.statusCode == 200) {
          var videos = JSON.parse(body);
          videos = videos.items;
          if (videos.length > 0) {
            msg.send ('https://www.youtube.com/watch?v=' + videos[0].id.videoId);
          }else{
            msg.send('No video results for ' + query);
          }
        }
    })
  });

  robot.respond(/[\u5716] (.*)$/, function (msg) {
    var query = msg.match[1];
    robot.http('https://www.googleapis.com/customsearch/v1')
      .query({
        searchType: 'image',
        num: '1',
        q: query,
        key: google.key,
        cx: google.cx,
      }).get()(function (err, res, body) {
        if (err) msg.send(err); 
        if (res.statusCode == 200) {
          var result = JSON.parse(body);
          var items = result.items;
          if (items.length > 0) {
            msg.send(items[0].link);
          }else{
            msg.send('No video results for ' + query);
          }
        }
    })
  });
}
