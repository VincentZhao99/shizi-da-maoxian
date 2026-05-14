import type { LexiconLevel, MathPhraseItem } from './types'

export const mathLevels: Array<LexiconLevel<MathPhraseItem>> = [
  {
    id: 'm-01',
    title: '基础动作（加减）',
    items: [
      {
        phrase: '一共',
        words: ['一共多少', '一共几个'],
        example: '小明有3个苹果，小红有2个苹果，一共多少个？',
        hint: '看到“一共”，通常把两部分合起来算。',
        tags: ['加法', '合并']
      },
      {
        phrase: '合起来',
        words: ['合起来算', '合在一起'],
        example: '两盒彩笔合起来有多少支？',
        hint: '“合起来”=把两部分加在一起。',
        tags: ['加法', '合并']
      },
      {
        phrase: '总共',
        words: ['总共多少', '总共几'],
        example: '书架上有4本书，桌上有1本书，总共几本？',
        hint: '“总共”=求全部数量。',
        tags: ['加法', '合并']
      },
      {
        phrase: '又',
        words: ['又来了', '又增加'],
        example: '原来有5只小鸡，又来了2只，现在有几只？',
        hint: '“又”表示数量增加，通常用加法。',
        tags: ['加法', '变化']
      },
      {
        phrase: '还剩',
        words: ['还剩多少', '剩下'],
        example: '有8块饼干，吃了3块，还剩几块？',
        hint: '“还剩/剩下”=从总数里拿走一部分。',
        tags: ['减法', '变化']
      },
      {
        phrase: '拿走',
        words: ['拿走几', '拿走一些'],
        example: '篮子里有7个梨，拿走2个，还剩几个？',
        hint: '“拿走”=减少，通常用减法。',
        tags: ['减法', '变化']
      },
      {
        phrase: '去掉',
        words: ['去掉几', '去掉一些'],
        example: '盒子里有9颗糖，去掉4颗，还剩几颗？',
        hint: '“去掉”=减去一部分。',
        tags: ['减法', '变化']
      }
    ]
  },
  {
    id: 'm-02',
    title: '比较逻辑（多/少/比）',
    items: [
      {
        phrase: '比',
        words: ['比一比', '比大小'],
        example: '小红有6支铅笔，小明有4支，小红比小明多几支？',
        hint: '“A比B多/少”=做差：用减法。',
        tags: ['比较', '减法']
      },
      {
        phrase: '多',
        words: ['多几个', '多一些'],
        example: '8比5多几？',
        hint: '“多几”=大数减小数。',
        tags: ['比较', '减法']
      },
      {
        phrase: '少',
        words: ['少几个', '少一些'],
        example: '3比7少几？',
        hint: '“少几”=大数减小数。',
        tags: ['比较', '减法']
      },
      {
        phrase: '一样多',
        words: ['同样多', '一样'],
        example: '两盘苹果一样多吗？',
        hint: '“一样多”=数量相等，可以对比或配对。',
        tags: ['比较']
      },
      {
        phrase: '还差',
        words: ['还差多少', '差几'],
        example: '要凑成10个，还差几个？',
        hint: '“还差/差几”=目标减现在。',
        tags: ['补齐', '减法']
      }
    ]
  },
  {
    id: 'm-03',
    title: '顺序方位（第几/左右/前后）',
    items: [
      {
        phrase: '第几',
        words: ['第几个', '第几位'],
        example: '从左数第3个是谁？',
        hint: '“第几”先确定从哪边数，再按顺序数。',
        tags: ['顺序', '方位']
      },
      {
        phrase: '从左数',
        words: ['从左往右', '左边'],
        example: '从左数第2个是哪个？',
        hint: '先找“从左数/从右数”，再数位置。',
        tags: ['顺序', '方位']
      },
      {
        phrase: '左',
        words: ['左边', '左手'],
        example: '左边有几个？',
        hint: '“左/右”确定方向，再数数量。',
        tags: ['方位']
      },
      {
        phrase: '右',
        words: ['右边', '右手'],
        example: '右边有几个？',
        hint: '“左/右”是方向词，不是加减关键词。',
        tags: ['方位']
      },
      {
        phrase: '前',
        words: ['前面', '前后'],
        example: '队伍前面有几人？',
        hint: '“前/后”与位置有关，先画队伍再数。',
        tags: ['方位']
      },
      {
        phrase: '后',
        words: ['后面', '最后'],
        example: '最后一个是谁？',
        hint: '“最后”=最靠后的位置。',
        tags: ['方位', '顺序']
      }
    ]
  },
  {
    id: 'm-04',
    title: '单位与量词（个/本/只/支…）',
    items: [
      {
        phrase: '个',
        words: ['几个', '多少个'],
        example: '一共有多少个球？',
        hint: '“个”是量词，重点看问的是“多少”。',
        tags: ['量词']
      },
      {
        phrase: '本',
        words: ['几本书', '一本'],
        example: '桌上有几本书？',
        hint: '“本”通常数书本。',
        tags: ['量词']
      },
      {
        phrase: '只',
        words: ['几只鸟', '一只'],
        example: '树上有几只鸟？',
        hint: '“只”常数动物。',
        tags: ['量词']
      },
      {
        phrase: '支',
        words: ['几支笔', '一支'],
        example: '铅笔有几支？',
        hint: '“支”常数笔、箭等细长物。',
        tags: ['量词']
      },
      {
        phrase: '张',
        words: ['几张纸', '一张'],
        example: '有几张纸？',
        hint: '“张”常数纸、桌子等平的物。',
        tags: ['量词']
      }
    ]
  },
  {
    id: 'm-05',
    title: '时间与钱（小时/分钟/元/角）',
    items: [
      {
        phrase: '小时',
        words: ['几小时', '一小时'],
        example: '从8点到9点是1小时。',
        hint: '“小时”是时间单位，先看起点和终点。',
        tags: ['时间']
      },
      {
        phrase: '分钟',
        words: ['几分钟', '一分钟'],
        example: '等10分钟再出发。',
        hint: '“分钟”比小时更小，常和钟表一起出现。',
        tags: ['时间']
      },
      {
        phrase: '元',
        words: ['几元', '一元'],
        example: '一支笔3元，两支多少元？',
        hint: '“元/角”是钱的单位，别把“角”当角度。',
        tags: ['钱币', '单位']
      },
      {
        phrase: '角',
        words: ['几角', '一角'],
        example: '一块钱等于10角。',
        hint: '“角”在钱里是单位；题目会出现“元、角”。',
        tags: ['钱币', '单位']
      }
    ]
  }
]

