module.exports = function(robot){
  robot.respond(/help!/, function(res){
    res.send('你可以這樣用：\n唱(空格)關鍵字\n圖(空格)關鍵字');
  });

  robot.respond(/[\u5531] (.*)$/, function(msg){
    var query = msg.match[1];
    robot.http('https://www.googleapis.com/youtube/v3/search')
      .query({
        client_id: '215413558064-ud4i1smbudtmdhdeg7e702eds0m8bpk2.apps.googleusercontent.com',
        key: 'AIzaSyCkvdq2zixT2QKDIulSm9hz5KrR7ygzhAo',
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
        key: 'AIzaSyCkvdq2zixT2QKDIulSm9hz5KrR7ygzhAo',
        cx: '003483038444650529406:mms4nu8lmj0',
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
