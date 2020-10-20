var express = require('express');
var app = express();
var cal = require('./module/cal.js');

app.locals.pretty = true;
app.use(express.static('static'))
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


 app.get('/', (req, res) => {
   res.render('index.html');
 })

 app.get('/cal_efficiency', async (req, res) => {
   var killingRate = Number(req.query.killingRate);
   var monsterLv = Number(req.query.monsterLv);
   var potionPrice = Number(req.query.potionPrice);
   var item = Number(req.query.item);
   var ability  = Number(req.query.ability);
   var farm = Number(req.query.farm);
   var phantom = Number(req.query.phantom);
   var unionbuff = Number(req.query.unionbuff);

   var defaultMeso = ( monsterLv * 7.5 ); // 몬스터 1마리 당 메소 기댓 값
   var mesoPerMin = Number(defaultMeso * killingRate / 60); // 1분당 메소 기댓 값
   
   var result =  await cal(potionPrice,item,ability,farm,phantom,unionbuff,mesoPerMin);
   res.send( result+ '분 이상 사냥해야 이득입니다. 다시 계산하려면 뒤로가기 ㄱㄱ')
 })

 app.listen(3000, () => console.log('connected, 3000'));``