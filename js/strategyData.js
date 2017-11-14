// 0 - 新手  1 - 式神  2 - 斗技  3 - 玩法  4 - 御魂
var strategyData = [
    {
        type : "1",
        title : "SR青坊主：最强扫地僧，是在下输了！",
        author : "Yeno1996"
    },
    {
        type : "1",
        title : "【18183】阴阳师丑时之女技能机制 实用辅助丑女",
        author : "小k"
    },
    {
        type : "1",
        title : "隐鳞山海！小鹿男秘闻副本通关攻略！",
        author : "清逸喵"
    },
    {
        type : "1",
        title : "【18183】先手彼岸花控制阵容攻略 速战速决不拖沓",
        author : "小k"
    },
    {
        type : "3",
        title : "【爱萌】教你阴阳师如何克制反击流阵容",
        author : "爱萌游戏"
    },
    {
        type : "1",
        title : "SR百目鬼：鬼眸在盯着你呢！",
        author : "Yeno1996"
    },
    {
        type : "1",
        title : "SSR雪童子：胧月雪华斩，化冰雪霜天+雨女十层攻略",
        author : "清逸喵"
    },
    {
        type : "1",
        title : "SSR玉藻前：绝代之妖，灼灼其华",
        author : "Yeno1996"
    },
    {
        type : "3",
        title : "全图鉴时代的村服登顶斗鸡心得(五)~全方位评测",
        author : "【NGA】40817862"
    },
    {
        type : "4",
        title : "阴阳师：极限输出雪童子，御魂怎么穿？",
        author : "燃玉"
    },
    {
        type : "0",
        title : "萌新入坑指南(17.8.22最新版)",
        author : "用我一世换你一眼温存"
    },
    {
        type : "0",
        title : "【伞剑的守护】第十层攻略（仅供参考）",
        author : "小gin"
    },
    {
        type : "0",
        title : "资源的合理利用姿势 道具使用技巧",
        author : "Yeno1996"
    },
    {
        type : "0",
        title : "阴阳师辅助式神排名，快来看你培养对了没",
        author : "手游神回复"
    },
    {
        type : "0",
        title : "秘闻！双奶过河童本十层",
        author : "龙仕少爷"
    },
    {
        type : "0",
        title : "【新手】40级阴阳师的合理式神搭配~",
        author : "垣语刖"
    },
    {
        type : "0",
        title : "【新手】友谊的见证！好友羁绊打开方式",
        author : "吴妍"
    },
    {
        type : "0",
        title : "时间静止，开启魂10之路",
        author : "水之生灵"
    },
    {
        type : "0",
        title : "阴阳师主流四治疗大盘点！",
        author : "秋瓷的好爸爸"
    },
    {
        type : "0",
        title : "全【御魂】详解与欣赏",
        author : "流浪的书生"
    },
    {
        type : "1",
        title : "百目鬼——椒犬的最后一块拼图，玩弄鬼火的魔术师",
        author : "【NGA】36215786"
    },
    {
        type : "1",
        title : "【爱萌】死亡之花永不凋零，阴阳师彼岸花改版后何去何从",
        author : "爱萌游戏"
    },
    {
        type : "1",
        title : "【18183】阴阳师玉藻前和茨木对比 谁才是狗粮王",
        author : "小k"
    },
    {
        type : "2",
        title : "为崽而战课堂：大佬来看看这里有没有你常用的斗技阵容",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "为崽而战小课堂：兵俑雪女凤凰火，那个是神级控？",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "为崽而战小课堂：那些至今活跃在斗技场上的R卡~",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "为崽而战小课堂：关于那些奶妈的故事！",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "安利一波犬神，3000分阿黄分斗花心得",
        author : "草爷"
    },
    {
        type : "2",
        title : "斗技编年史三：被般若强控流统治的时代到来了！",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "斗技编年史二：椒图反击，小僧反伤，曾经属于反手流的时代！",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "斗技编年史一：镜姬白蛋，一拳超人统治的时代！",
        author : "Yeno1996"
    },
    {
        type : "2",
        title : "斗技系统-核心输出培养推荐",
        author : "真白"
    },
    {
        type : "2",
        title : "逆转的胜利！反击流式神阵容推荐！",
        author : "迷い子"
    },
    {
        type : "3",
        title : "【爱萌】当周百鬼弈连胜强力阵容推荐，十二连胜不是梦",
        author : "爱萌游戏"
    },
    {
        type : "3",
        title : "今天我就要打死你个小章鱼——石距车简单科普",
        author : "【NGA】41398941"
    },
    {
        type : "3",
        title : "阴阳师：百鬼弈周报 第七期 欢迎来到雪童子专场",
        author : "燃玉"
    },
    {
        type : "3",
        title : "【爱萌】这个BOSS太暴力！阴阳师胧车BOSS详细攻略",
        author : "Doge"
    },
    {
        type : "3",
        title : "【18183】阴阳师胧车奖励说明 逢魔之时胧车评价表",
        author : "小k"
    },
    {
        type : "3",
        title : "【爱萌】新手也能干翻大佬！百鬼弈玩法新手攻略",
        author : "Doge"
    },
    {
        type : "3",
        title : "天青色等烟雨而我在等你——青花瓷防战后手椒图队冲跨服前十",
        author : "好了啦乖别闹"
    },
    {
        type : "3",
        title : "食茨青坊主魂十的属性要求计算",
        author : "SolarExplode"
    }
];











