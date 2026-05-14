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
  }
]

