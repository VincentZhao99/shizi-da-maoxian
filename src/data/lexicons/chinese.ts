import type { ChineseHanziItem, LexiconLevel } from './types'

export const chineseLevels: Array<LexiconLevel<ChineseHanziItem>> = [
  {
    id: 'ch-01',
    title: '第一关（自然）',
    items: [
      { hanzi: '天', pinyin: 'tiān', words: ['天空', '今天'], sentence: '今天天气很好。' },
      { hanzi: '地', pinyin: 'dì', words: ['土地', '地上'], sentence: '地上有小花。' },
      { hanzi: '人', pinyin: 'rén', words: ['人们', '大人'], sentence: '我们都是好人。' },
      { hanzi: '你', pinyin: 'nǐ', words: ['你好', '你们'], sentence: '你好吗？' },
      { hanzi: '我', pinyin: 'wǒ', words: ['我们', '我家'], sentence: '我爱我的家。' },
      { hanzi: '他', pinyin: 'tā', words: ['他们', '他人'], sentence: '他在笑。' }
    ]
  },
  {
    id: 'ch-02',
    title: '第二关（数字）',
    items: [
      { hanzi: '一', pinyin: 'yī', words: ['一个', '一起'], sentence: '我有一个苹果。' },
      { hanzi: '二', pinyin: 'èr', words: ['二月', '二十'], sentence: '二月有春天的味道。' },
      { hanzi: '三', pinyin: 'sān', words: ['三天', '三只'], sentence: '我等了三天。' },
      { hanzi: '上', pinyin: 'shàng', words: ['上学', '上面'], sentence: '我去上学。' },
      { hanzi: '下', pinyin: 'xià', words: ['下课', '下面'], sentence: '下课了，我们去玩。' }
    ]
  },
  {
    id: 'ch-03',
    title: '第三关（人体）',
    items: [
      { hanzi: '口', pinyin: 'kǒu', words: ['口水', '口号'], sentence: '他张开口说话。' },
      { hanzi: '耳', pinyin: 'ěr', words: ['耳朵', '木耳'], sentence: '我用耳朵听声音。' },
      { hanzi: '目', pinyin: 'mù', words: ['目光', '目录'], sentence: '他的目光很亮。' },
      { hanzi: '手', pinyin: 'shǒu', words: ['手心', '手套'], sentence: '我用手拿书。' },
      { hanzi: '足', pinyin: 'zú', words: ['足够', '足球'], sentence: '我喜欢踢足球。' }
    ]
  },
  {
    id: 'ch-04',
    title: '第四关（天气）',
    items: [
      { hanzi: '日', pinyin: 'rì', words: ['日出', '日记'], sentence: '太阳从东方日出。' },
      { hanzi: '月', pinyin: 'yuè', words: ['月亮', '月份'], sentence: '月亮挂在天上。' },
      { hanzi: '雨', pinyin: 'yǔ', words: ['下雨', '雨伞'], sentence: '今天下雨了。' },
      { hanzi: '风', pinyin: 'fēng', words: ['大风', '风车'], sentence: '风吹过树叶沙沙响。' },
      { hanzi: '云', pinyin: 'yún', words: ['白云', '乌云'], sentence: '天上有白云。' },
      { hanzi: '水', pinyin: 'shuǐ', words: ['喝水', '水杯'], sentence: '我每天要喝水。' }
    ]
  },
  {
    id: 'ch-05',
    title: '第五关（自然与植物）',
    items: [
      { hanzi: '山', pinyin: 'shān', words: ['高山', '山上'], sentence: '山上有一棵树。' },
      { hanzi: '火', pinyin: 'huǒ', words: ['火苗', '火车'], sentence: '火苗在跳舞。' },
      { hanzi: '花', pinyin: 'huā', words: ['花朵', '花园'], sentence: '花园里有很多花。' },
      { hanzi: '草', pinyin: 'cǎo', words: ['小草', '草地'], sentence: '草地上很软。' },
      { hanzi: '树', pinyin: 'shù', words: ['大树', '树叶'], sentence: '大树下很凉快。' },
      { hanzi: '大', pinyin: 'dà', words: ['大人', '大海'], sentence: '这是一只大猫。' },
      { hanzi: '小', pinyin: 'xiǎo', words: ['小孩', '小手'], sentence: '我有一只小狗。' }
    ]
  },
  {
    id: 'ch-06',
    title: '第六关（动物）',
    items: [
      { hanzi: '鸟', pinyin: 'niǎo', words: ['小鸟', '飞鸟'], sentence: '小鸟在唱歌。' },
      { hanzi: '鱼', pinyin: 'yú', words: ['小鱼', '鱼缸'], sentence: '鱼缸里有小鱼。' },
      { hanzi: '虫', pinyin: 'chóng', words: ['小虫', '虫子'], sentence: '小虫在叶子上爬。' },
      { hanzi: '牛', pinyin: 'niú', words: ['小牛', '牛奶'], sentence: '我喜欢喝牛奶。' },
      { hanzi: '羊', pinyin: 'yáng', words: ['小羊', '山羊'], sentence: '小羊在吃草。' },
      { hanzi: '马', pinyin: 'mǎ', words: ['小马', '马路'], sentence: '小马跑得快。' },
      { hanzi: '猪', pinyin: 'zhū', words: ['小猪', '猪肉'], sentence: '小猪在睡觉。' }
    ]
  },
  {
    id: 'ch-07',
    title: '第七关（家庭与学校）',
    items: [
      { hanzi: '家', pinyin: 'jiā', words: ['家人', '回家'], sentence: '放学后我回家。' },
      { hanzi: '校', pinyin: 'xiào', words: ['学校', '校门'], sentence: '学校里有操场。' },
      { hanzi: '书', pinyin: 'shū', words: ['书本', '读书'], sentence: '我爱读书。' },
      { hanzi: '包', pinyin: 'bāo', words: ['书包', '包里'], sentence: '我的书包很轻。' },
      { hanzi: '来', pinyin: 'lái', words: ['回来', '来吧'], sentence: '你快来这里。' },
      { hanzi: '去', pinyin: 'qù', words: ['出去', '去学'], sentence: '我去学校上课。' },
      { hanzi: '看', pinyin: 'kàn', words: ['看书', '看看'], sentence: '我看见一只鸟。' }
    ]
  },
  {
    id: 'ch-08',
    title: '第八关（动作与伙伴）',
    items: [
      { hanzi: '听', pinyin: 'tīng', words: ['听见', '听话'], sentence: '我听见风声。' },
      { hanzi: '说', pinyin: 'shuō', words: ['说话', '说笑'], sentence: '他说话很清楚。' },
      { hanzi: '吃', pinyin: 'chī', words: ['吃饭', '好吃'], sentence: '我吃了一个苹果。' },
      { hanzi: '喝', pinyin: 'hē', words: ['喝水', '喝奶'], sentence: '我喝牛奶长高。' },
      { hanzi: '走', pinyin: 'zǒu', words: ['走路', '走开'], sentence: '我们一起走路回家。' },
      { hanzi: '狗', pinyin: 'gǒu', words: ['小狗', '跑狗'], sentence: '小狗在跑。' },
      { hanzi: '猫', pinyin: 'māo', words: ['小猫', '猫咪'], sentence: '小猫喜欢晒太阳。' }
    ]
  },
  {
    id: 'ch-09',
    title: '第九关（更多数字）',
    items: [
      { hanzi: '四', pinyin: 'sì', words: ['四个', '四月'], sentence: '一年有四个季节。' },
      { hanzi: '五', pinyin: 'wǔ', words: ['五个', '五月'], sentence: '我有五支彩笔。' },
      { hanzi: '六', pinyin: 'liù', words: ['六个', '六月'], sentence: '六只小鸭在游泳。' },
      { hanzi: '七', pinyin: 'qī', words: ['七个', '七天'], sentence: '一个星期有七天。' },
      { hanzi: '八', pinyin: 'bā', words: ['八个', '八月'], sentence: '八只蚂蚁搬食物。' },
      { hanzi: '九', pinyin: 'jiǔ', words: ['九个', '九月'], sentence: '九朵花开了。' },
      { hanzi: '十', pinyin: 'shí', words: ['十个', '十月'], sentence: '我数到十。' },
      { hanzi: '百', pinyin: 'bǎi', words: ['一百', '几百'], sentence: '池塘里有上百条鱼。' },
      { hanzi: '千', pinyin: 'qiān', words: ['一千', '千万'], sentence: '天上有千万颗星。' },
      { hanzi: '半', pinyin: 'bàn', words: ['一半', '半天'], sentence: '我吃了一半苹果。' },
      { hanzi: '多', pinyin: 'duō', words: ['多少', '很多'], sentence: '树上有多少只鸟？' },
      { hanzi: '少', pinyin: 'shǎo', words: ['多少', '很少'], sentence: '今天作业很少。' }
    ]
  },
  {
    id: 'ch-10',
    title: '第十关（颜色）',
    items: [
      { hanzi: '红', pinyin: 'hóng', words: ['红色', '红花'], sentence: '红色的花真好看。' },
      { hanzi: '黄', pinyin: 'huáng', words: ['黄色', '黄花'], sentence: '秋天叶子变黄了。' },
      { hanzi: '蓝', pinyin: 'lán', words: ['蓝色', '蓝天'], sentence: '蓝蓝的天空真美。' },
      { hanzi: '绿', pinyin: 'lǜ', words: ['绿色', '绿叶'], sentence: '树叶是绿色的。' },
      { hanzi: '白', pinyin: 'bái', words: ['白色', '白天'], sentence: '白色的雪花飘下来。' },
      { hanzi: '黑', pinyin: 'hēi', words: ['黑色', '黑夜'], sentence: '黑色的小猫很可爱。' },
      { hanzi: '金', pinyin: 'jīn', words: ['金色', '金鱼'], sentence: '金色的阳光照大地。' },
      { hanzi: '紫', pinyin: 'zǐ', words: ['紫色', '紫花'], sentence: '紫色的花很漂亮。' },
      { hanzi: '粉', pinyin: 'fěn', words: ['粉色', '花粉'], sentence: '我喜欢粉色的裙子。' },
      { hanzi: '灰', pinyin: 'huī', words: ['灰色', '灰狼'], sentence: '大灰狼来了。' },
      { hanzi: '彩', pinyin: 'cǎi', words: ['彩色', '彩虹'], sentence: '雨后有彩虹。' },
      { hanzi: '色', pinyin: 'sè', words: ['颜色', '色彩'], sentence: '你最喜欢什么颜色？' }
    ]
  },
  {
    id: 'ch-11',
    title: '第十一关（方位与位置）',
    items: [
      { hanzi: '东', pinyin: 'dōng', words: ['东方', '东边'], sentence: '太阳从东方升起。' },
      { hanzi: '西', pinyin: 'xī', words: ['西方', '西边'], sentence: '太阳从西边落下。' },
      { hanzi: '南', pinyin: 'nán', words: ['南方', '南边'], sentence: '小鸟飞往南方。' },
      { hanzi: '北', pinyin: 'běi', words: ['北方', '北边'], sentence: '冬天北方很冷。' },
      { hanzi: '里', pinyin: 'lǐ', words: ['里面', '家里'], sentence: '书包里面有什么？' },
      { hanzi: '外', pinyin: 'wài', words: ['外面', '门外'], sentence: '门外有人在唱歌。' },
      { hanzi: '前', pinyin: 'qián', words: ['前面', '上前'], sentence: '教室前面有黑板。' },
      { hanzi: '后', pinyin: 'hòu', words: ['后面', '后来'], sentence: '学校后面有花园。' },
      { hanzi: '中', pinyin: 'zhōng', words: ['中间', '中心'], sentence: '操场中间有国旗。' },
      { hanzi: '间', pinyin: 'jiān', words: ['中间', '房间'], sentence: '两棵树之间有一朵花。' },
      { hanzi: '旁', pinyin: 'páng', words: ['旁边', '两旁'], sentence: '椅子旁边有一个球。' },
      { hanzi: '边', pinyin: 'biān', words: ['旁边', '河边'], sentence: '小河边上有很多花。' }
    ]
  },
  {
    id: 'ch-12',
    title: '第十二关（时间与季节）',
    items: [
      { hanzi: '早', pinyin: 'zǎo', words: ['早上', '早安'], sentence: '早上起床要刷牙。' },
      { hanzi: '晚', pinyin: 'wǎn', words: ['晚上', '晚安'], sentence: '晚上我要听故事。' },
      { hanzi: '春', pinyin: 'chūn', words: ['春天', '春风'], sentence: '春天花开满园。' },
      { hanzi: '夏', pinyin: 'xià', words: ['夏天', '夏季'], sentence: '夏天可以去游泳。' },
      { hanzi: '秋', pinyin: 'qiū', words: ['秋天', '秋风'], sentence: '秋天树叶掉了。' },
      { hanzi: '冬', pinyin: 'dōng', words: ['冬天', '冬季'], sentence: '冬天下雪了。' },
      { hanzi: '午', pinyin: 'wǔ', words: ['中午', '午饭'], sentence: '中午太阳很大。' },
      { hanzi: '年', pinyin: 'nián', words: ['新年', '今年'], sentence: '新年到了真开心。' },
      { hanzi: '今', pinyin: 'jīn', words: ['今天', '今年'], sentence: '今天是我的生日。' },
      { hanzi: '明', pinyin: 'míng', words: ['明天', '明白'], sentence: '明天要去动物园。' },
      { hanzi: '昨', pinyin: 'zuó', words: ['昨天', '昨日'], sentence: '昨天下了大雨。' },
      { hanzi: '时', pinyin: 'shí', words: ['时间', '小时'], sentence: '你几时回家？' }
    ]
  },
  {
    id: 'ch-13',
    title: '第十三关（更多身体）',
    items: [
      { hanzi: '头', pinyin: 'tóu', words: ['头发', '头上'], sentence: '头上戴着帽子。' },
      { hanzi: '牙', pinyin: 'yá', words: ['牙齿', '牙刷'], sentence: '每天都要刷牙。' },
      { hanzi: '脸', pinyin: 'liǎn', words: ['洗脸', '笑脸'], sentence: '她的笑脸真好看。' },
      { hanzi: '脚', pinyin: 'jiǎo', words: ['双脚', '脚尖'], sentence: '我跑步时双脚飞快。' },
      { hanzi: '身', pinyin: 'shēn', words: ['身体', '身上'], sentence: '我们要爱护身体。' },
      { hanzi: '指', pinyin: 'zhǐ', words: ['手指', '指向'], sentence: '她用手指着天空。' },
      { hanzi: '鼻', pinyin: 'bí', words: ['鼻子', '鼻涕'], sentence: '大象有长长的鼻子。' },
      { hanzi: '舌', pinyin: 'shé', words: ['舌头', '舌尖'], sentence: '舌头能尝出味道。' },
      { hanzi: '眼', pinyin: 'yǎn', words: ['眼睛', '眼泪'], sentence: '眼睛是心灵的窗户。' },
      { hanzi: '心', pinyin: 'xīn', words: ['开心', '心里'], sentence: '我心里真开心。' },
      { hanzi: '眉', pinyin: 'méi', words: ['眉毛', '眉头'], sentence: '她的眉毛弯弯的。' },
      { hanzi: '皮', pinyin: 'pí', words: ['皮肤', '皮球'], sentence: '小皮球跳得高。' },
      { hanzi: '嘴', pinyin: 'zuǐ', words: ['嘴巴', '张嘴'], sentence: '张开嘴说"啊"。' }
    ]
  },
  {
    id: 'ch-14',
    title: '第十四关（亲属与人物）',
    items: [
      { hanzi: '父', pinyin: 'fù', words: ['父亲', '父爱'], sentence: '父亲很爱我。' },
      { hanzi: '母', pinyin: 'mǔ', words: ['母亲', '母爱'], sentence: '母亲的怀抱好温暖。' },
      { hanzi: '儿', pinyin: 'ér', words: ['儿子', '女儿'], sentence: '他是一个好儿子。' },
      { hanzi: '女', pinyin: 'nǚ', words: ['女儿', '女孩'], sentence: '小女孩在跳舞。' },
      { hanzi: '爷', pinyin: 'yé', words: ['爷爷', '老爷'], sentence: '爷爷给我讲故事。' },
      { hanzi: '奶', pinyin: 'nǎi', words: ['奶奶', '牛奶'], sentence: '奶奶做的饭真香。' },
      { hanzi: '哥', pinyin: 'gē', words: ['哥哥', '大哥'], sentence: '哥哥带我去公园。' },
      { hanzi: '姐', pinyin: 'jiě', words: ['姐姐', '姐妹'], sentence: '姐姐教我写作业。' },
      { hanzi: '弟', pinyin: 'dì', words: ['弟弟', '兄弟'], sentence: '弟弟在睡觉。' },
      { hanzi: '妹', pinyin: 'mèi', words: ['妹妹', '姐妹'], sentence: '妹妹喜欢画画。' },
      { hanzi: '叔', pinyin: 'shū', words: ['叔叔', '大叔'], sentence: '叔叔送我上学。' },
      { hanzi: '伯', pinyin: 'bó', words: ['伯伯', '大伯'], sentence: '伯伯种了很多花。' }
    ]
  },
  {
    id: 'ch-15',
    title: '第十五关（自然万象）',
    items: [
      { hanzi: '石', pinyin: 'shí', words: ['石头', '石子'], sentence: '河边有很多小石头。' },
      { hanzi: '土', pinyin: 'tǔ', words: ['泥土', '土地'], sentence: '种子在土里发芽。' },
      { hanzi: '田', pinyin: 'tián', words: ['田野', '田园'], sentence: '田里长满了稻子。' },
      { hanzi: '星', pinyin: 'xīng', words: ['星星', '星光'], sentence: '夜晚天上的星星闪闪亮。' },
      { hanzi: '光', pinyin: 'guāng', words: ['阳光', '光亮'], sentence: '阳光照在身上暖洋洋。' },
      { hanzi: '河', pinyin: 'hé', words: ['小河', '河水'], sentence: '小河流水哗啦啦。' },
      { hanzi: '海', pinyin: 'hǎi', words: ['大海', '海水'], sentence: '大海真大呀。' },
      { hanzi: '雷', pinyin: 'léi', words: ['打雷', '雷声'], sentence: '打雷了，快回家。' },
      { hanzi: '冰', pinyin: 'bīng', words: ['冰块', '冰冷'], sentence: '冬天河面结冰了。' },
      { hanzi: '湖', pinyin: 'hú', words: ['湖水', '湖边'], sentence: '湖面上有小船。' },
      { hanzi: '林', pinyin: 'lín', words: ['树林', '森林'], sentence: '树林里有小鸟唱歌。' },
      { hanzi: '岩', pinyin: 'yán', words: ['岩石', '山岩'], sentence: '山岩上长着小草。' },
      { hanzi: '尘', pinyin: 'chén', words: ['尘土', '灰尘'], sentence: '风吹起了尘土。' }
    ]
  },
  {
    id: 'ch-16',
    title: '第十六关（植物与花果）',
    items: [
      { hanzi: '木', pinyin: 'mù', words: ['木马', '木头'], sentence: '小木马真可爱。' },
      { hanzi: '叶', pinyin: 'yè', words: ['树叶', '叶子'], sentence: '秋天叶子变黄了。' },
      { hanzi: '果', pinyin: 'guǒ', words: ['苹果', '水果'], sentence: '水果很好吃。' },
      { hanzi: '瓜', pinyin: 'guā', words: ['西瓜', '瓜子'], sentence: '夏天吃西瓜很凉快。' },
      { hanzi: '米', pinyin: 'mǐ', words: ['大米', '米饭'], sentence: '白米饭香喷喷。' },
      { hanzi: '竹', pinyin: 'zhú', words: ['竹子', '竹笋'], sentence: '熊猫爱吃竹子。' },
      { hanzi: '豆', pinyin: 'dòu', words: ['豆子', '黄豆'], sentence: '豆子可以发芽。' },
      { hanzi: '苗', pinyin: 'miáo', words: ['幼苗', '树苗'], sentence: '小树苗在长大。' },
      { hanzi: '莲', pinyin: 'lián', words: ['莲花', '莲子'], sentence: '池塘里莲花开了。' },
      { hanzi: '桃', pinyin: 'táo', words: ['桃子', '桃花'], sentence: '甜甜的桃子真好吃。' },
      { hanzi: '李', pinyin: 'lǐ', words: ['李子', '李树'], sentence: '李子树开花了。' },
      { hanzi: '柳', pinyin: 'liǔ', words: ['柳树', '柳枝'], sentence: '柳枝随风飘动。' },
      { hanzi: '荷', pinyin: 'hé', words: ['荷花', '荷叶'], sentence: '荷叶上的露珠圆圆的。' }
    ]
  },
  {
    id: 'ch-17',
    title: '第十七关（更多动作）',
    items: [
      { hanzi: '跑', pinyin: 'pǎo', words: ['跑步', '跑开'], sentence: '小朋友在操场上跑步。' },
      { hanzi: '跳', pinyin: 'tiào', words: ['跳高', '跳远'], sentence: '小兔子跳得高高的。' },
      { hanzi: '飞', pinyin: 'fēi', words: ['飞机', '飞鸟'], sentence: '小鸟在天空中飞。' },
      { hanzi: '坐', pinyin: 'zuò', words: ['坐下', '请坐'], sentence: '请坐在椅子上。' },
      { hanzi: '站', pinyin: 'zhàn', words: ['站立', '车站'], sentence: '大家一起站好。' },
      { hanzi: '笑', pinyin: 'xiào', words: ['笑脸', '好笑'], sentence: '小朋友开心地笑。' },
      { hanzi: '唱', pinyin: 'chàng', words: ['唱歌', '演唱'], sentence: '一起唱歌真快乐。' },
      { hanzi: '画', pinyin: 'huà', words: ['画画', '图画'], sentence: '我喜欢画太阳。' },
      { hanzi: '写', pinyin: 'xiě', words: ['写字', '书写'], sentence: '认真写字很快乐。' },
      { hanzi: '玩', pinyin: 'wán', words: ['玩耍', '好玩'], sentence: '和朋友们一起玩真开心。' },
      { hanzi: '开', pinyin: 'kāi', words: ['开门', '开心'], sentence: '请帮我开门。' },
      { hanzi: '关', pinyin: 'guān', words: ['关门', '关心'], sentence: '出门要关好门。' },
      { hanzi: '问', pinyin: 'wèn', words: ['问好', '问题'], sentence: '见到老师要问好。' }
    ]
  },
  {
    id: 'ch-18',
    title: '第十八关（更多动物）',
    items: [
      { hanzi: '兔', pinyin: 'tù', words: ['兔子', '白兔'], sentence: '小白兔爱吃萝卜。' },
      { hanzi: '猴', pinyin: 'hóu', words: ['猴子', '金猴'], sentence: '猴子在树上跳来跳去。' },
      { hanzi: '象', pinyin: 'xiàng', words: ['大象', '象牙'], sentence: '大象有长长的鼻子。' },
      { hanzi: '虎', pinyin: 'hǔ', words: ['老虎', '虎牙'], sentence: '大老虎很威风。' },
      { hanzi: '龙', pinyin: 'lóng', words: ['龙舟', '龙灯'], sentence: '端午节划龙舟。' },
      { hanzi: '熊', pinyin: 'xióng', words: ['熊猫', '小熊'], sentence: '熊猫爱吃竹子。' },
      { hanzi: '鹿', pinyin: 'lù', words: ['小鹿', '梅花鹿'], sentence: '小鹿在草地上奔跑。' },
      { hanzi: '鸡', pinyin: 'jī', words: ['小鸡', '公鸡'], sentence: '公鸡早上打鸣。' },
      { hanzi: '鸭', pinyin: 'yā', words: ['小鸭', '鸭子'], sentence: '小鸭子在游泳。' },
      { hanzi: '鹅', pinyin: 'é', words: ['白鹅', '天鹅'], sentence: '白鹅在池塘里。' },
      { hanzi: '蛙', pinyin: 'wā', words: ['青蛙', '蛙叫'], sentence: '青蛙在荷叶上叫。' },
      { hanzi: '蜂', pinyin: 'fēng', words: ['蜜蜂', '蜂蜜'], sentence: '蜜蜂在采蜜。' },
      { hanzi: '龟', pinyin: 'guī', words: ['乌龟', '海龟'], sentence: '乌龟爬得很慢。' }
    ]
  },
  {
    id: 'ch-19',
    title: '第十九关（物品与文具）',
    items: [
      { hanzi: '门', pinyin: 'mén', words: ['大门', '门口'], sentence: '门口有一棵大树。' },
      { hanzi: '窗', pinyin: 'chuāng', words: ['窗户', '天窗'], sentence: '窗户外面有小鸟。' },
      { hanzi: '桌', pinyin: 'zhuō', words: ['桌子', '书桌'], sentence: '桌上有一本书。' },
      { hanzi: '椅', pinyin: 'yǐ', words: ['椅子', '摇椅'], sentence: '椅子排得整整齐齐。' },
      { hanzi: '床', pinyin: 'chuáng', words: ['床上', '起床'], sentence: '早上我按时起床。' },
      { hanzi: '灯', pinyin: 'dēng', words: ['灯光', '路灯'], sentence: '晚上路灯亮了。' },
      { hanzi: '钟', pinyin: 'zhōng', words: ['时钟', '闹钟'], sentence: '闹钟叫我起床。' },
      { hanzi: '笔', pinyin: 'bǐ', words: ['铅笔', '画笔'], sentence: '我用铅笔画画。' },
      { hanzi: '纸', pinyin: 'zhǐ', words: ['白纸', '纸张'], sentence: '白纸上写满了字。' },
      { hanzi: '杯', pinyin: 'bēi', words: ['水杯', '杯子'], sentence: '我的杯子是蓝色的。' },
      { hanzi: '盘', pinyin: 'pán', words: ['盘子', '一盘'], sentence: '盘子里有水果。' },
      { hanzi: '碗', pinyin: 'wǎn', words: ['碗筷', '一碗'], sentence: '我吃了一碗饭。' }
    ]
  },
  {
    id: 'ch-20',
    title: '第二十关（品质与反义）',
    items: [
      { hanzi: '好', pinyin: 'hǎo', words: ['好人', '好事'], sentence: '做一个好孩子。' },
      { hanzi: '美', pinyin: 'měi', words: ['美好', '美丽'], sentence: '花园真美丽。' },
      { hanzi: '新', pinyin: 'xīn', words: ['新年', '新衣'], sentence: '新年穿新衣。' },
      { hanzi: '旧', pinyin: 'jiù', words: ['旧书', '旧衣'], sentence: '旧书也可以看。' },
      { hanzi: '对', pinyin: 'duì', words: ['不对', '对了'], sentence: '这道题我做对了。' },
      { hanzi: '错', pinyin: 'cuò', words: ['错了', '出错'], sentence: '错了不怕，再来一次。' },
      { hanzi: '进', pinyin: 'jìn', words: ['进来', '进步'], sentence: '请进，门开着。' },
      { hanzi: '快', pinyin: 'kuài', words: ['快乐', '快点'], sentence: '快乐地唱起歌。' },
      { hanzi: '慢', pinyin: 'màn', words: ['慢慢', '快慢'], sentence: '乌龟爬得很慢。' },
      { hanzi: '高', pinyin: 'gāo', words: ['高兴', '高大'], sentence: '我长高了。' },
      { hanzi: '低', pinyin: 'dī', words: ['低头', '高低'], sentence: '低下头看看小花。' },
      { hanzi: '长', pinyin: 'cháng', words: ['长大', '长高'], sentence: '长长的尾巴真可爱。' },
      { hanzi: '短', pinyin: 'duǎn', words: ['短处', '长短'], sentence: '兔子的尾巴很短。' }
    ]
  }
]

