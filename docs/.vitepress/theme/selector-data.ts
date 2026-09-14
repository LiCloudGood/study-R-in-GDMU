/**
 * 统计方法选择器题库 —— 由 scripts/generate-selector.mjs 从规则表生成，请勿手改。
 * 改规则请改生成脚本，然后重跑它。
 */
export interface SelectorOption { text: string; detail?: string; next: number }
export interface SelectorResult {
  method: string
  why: string
  cond?: string[]
  note?: string
  criteria?: string[][]
  code?: string
  read?: string[]
  pit?: string[]
  c: { text: string; link: string }
}
export interface SelectorNode {
  id: number
  question?: string
  hint?: string
  options?: SelectorOption[]
  result?: SelectorResult
}
export const selectorTree: { nodes: SelectorNode[] } = {
  "nodes": [
    {
      "id": 1,
      "question": "你手上的数据是怎么来的？",
      "hint": "选最贴近的一项。拿不准就先选「只是想描述一下」—— 描述性分析不会出错。",
      "options": [
        {
          "text": "只是想看看这批数据长什么样",
          "detail": "还没打算做检验，先做描述性统计",
          "next": 100
        },
        {
          "text": "一组对象，要和某个已知标准比",
          "detail": "比如 120 名男生的平均身高 vs 全国平均水平",
          "next": 104
        },
        {
          "text": "同一批对象测了两次",
          "detail": "用药前后、左右眼、同一份标本两种方法测",
          "next": 110
        },
        {
          "text": "两组不同的对象",
          "detail": "试验组 vs 对照组，两组互不相干",
          "next": 116
        },
        {
          "text": "三组及以上不同的对象",
          "detail": "三种剂量组比较",
          "next": 122
        },
        {
          "text": "同一批对象测了三次及以上",
          "detail": "术后 1 个月、3 个月、6 个月各测一次",
          "next": 128
        },
        {
          "text": "随访资料",
          "detail": "有「随访多久」和「有没有发生结局」两列",
          "next": 132
        },
        {
          "text": "想看两个变量之间的关系",
          "detail": "不分组，就看两个指标之间有没有关系",
          "next": 136
        }
      ]
    },
    {
      "id": 100,
      "question": "要分析的那个指标长什么样？",
      "hint": "说的是你要比较/描述的那一个指标，不是全部变量",
      "options": [
        {
          "text": "具体数值",
          "detail": "身高、血压、白细胞计数、量表总分……",
          "next": 101
        },
        {
          "text": "只有两类",
          "detail": "男/女、存活/死亡、阳性/阴性……",
          "next": 102
        },
        {
          "text": "三类以上",
          "detail": "A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级",
          "next": 103
        }
      ]
    },
    {
      "id": 104,
      "question": "要分析的那个指标长什么样？",
      "hint": "说的是你要比较/描述的那一个指标，不是全部变量",
      "options": [
        {
          "text": "具体数值",
          "detail": "身高、血压、白细胞计数、量表总分……",
          "next": 105
        },
        {
          "text": "只有两类",
          "detail": "男/女、存活/死亡、阳性/阴性……",
          "next": 108
        },
        {
          "text": "三类以上",
          "detail": "A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级",
          "next": 109
        }
      ]
    },
    {
      "id": 105,
      "question": "这批数据的样本量和外形大概是什么样？",
      "hint": "拿不准就选第一项 —— 会给你不依赖分布假设的稳妥方法",
      "options": [
        {
          "text": "不确定 / 每组不到 40 例 / 图上有明显偏态或极端值",
          "detail": "选这一项最安全 —— 会推荐不依赖分布假设的方法",
          "next": 106
        },
        {
          "text": "每组 40 例以上，直方图基本对称、没有离群点",
          "detail": "",
          "next": 107
        },
        {
          "text": "每组 40 例以上，但分布明显偏态",
          "detail": "",
          "next": 106
        }
      ]
    },
    {
      "id": 110,
      "question": "要分析的那个指标长什么样？",
      "hint": "说的是你要比较/描述的那一个指标，不是全部变量",
      "options": [
        {
          "text": "具体数值",
          "detail": "身高、血压、白细胞计数、量表总分……",
          "next": 111
        },
        {
          "text": "只有两类",
          "detail": "男/女、存活/死亡、阳性/阴性……",
          "next": 114
        },
        {
          "text": "三类以上",
          "detail": "A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级",
          "next": 115
        }
      ]
    },
    {
      "id": 111,
      "question": "这批数据的样本量和外形大概是什么样？",
      "hint": "拿不准就选第一项 —— 会给你不依赖分布假设的稳妥方法",
      "options": [
        {
          "text": "不确定 / 每组不到 40 例 / 图上有明显偏态或极端值",
          "detail": "选这一项最安全 —— 会推荐不依赖分布假设的方法",
          "next": 112
        },
        {
          "text": "每组 40 例以上，直方图基本对称、没有离群点",
          "detail": "",
          "next": 113
        },
        {
          "text": "每组 40 例以上，但分布明显偏态",
          "detail": "",
          "next": 112
        }
      ]
    },
    {
      "id": 116,
      "question": "要分析的那个指标长什么样？",
      "hint": "说的是你要比较/描述的那一个指标，不是全部变量",
      "options": [
        {
          "text": "具体数值",
          "detail": "身高、血压、白细胞计数、量表总分……",
          "next": 117
        },
        {
          "text": "只有两类",
          "detail": "男/女、存活/死亡、阳性/阴性……",
          "next": 120
        },
        {
          "text": "三类以上",
          "detail": "A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级",
          "next": 121
        }
      ]
    },
    {
      "id": 117,
      "question": "这批数据的样本量和外形大概是什么样？",
      "hint": "拿不准就选第一项 —— 会给你不依赖分布假设的稳妥方法",
      "options": [
        {
          "text": "不确定 / 每组不到 40 例 / 图上有明显偏态或极端值",
          "detail": "选这一项最安全 —— 会推荐不依赖分布假设的方法",
          "next": 118
        },
        {
          "text": "每组 40 例以上，直方图基本对称、没有离群点",
          "detail": "",
          "next": 119
        },
        {
          "text": "每组 40 例以上，但分布明显偏态",
          "detail": "",
          "next": 118
        }
      ]
    },
    {
      "id": 122,
      "question": "要分析的那个指标长什么样？",
      "hint": "说的是你要比较/描述的那一个指标，不是全部变量",
      "options": [
        {
          "text": "具体数值",
          "detail": "身高、血压、白细胞计数、量表总分……",
          "next": 123
        },
        {
          "text": "只有两类",
          "detail": "男/女、存活/死亡、阳性/阴性……",
          "next": 126
        },
        {
          "text": "三类以上",
          "detail": "A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级",
          "next": 127
        }
      ]
    },
    {
      "id": 123,
      "question": "这批数据的样本量和外形大概是什么样？",
      "hint": "拿不准就选第一项 —— 会给你不依赖分布假设的稳妥方法",
      "options": [
        {
          "text": "不确定 / 每组不到 40 例 / 图上有明显偏态或极端值",
          "detail": "选这一项最安全 —— 会推荐不依赖分布假设的方法",
          "next": 124
        },
        {
          "text": "每组 40 例以上，直方图基本对称、没有离群点",
          "detail": "",
          "next": 125
        },
        {
          "text": "每组 40 例以上，但分布明显偏态",
          "detail": "",
          "next": 124
        }
      ]
    },
    {
      "id": 128,
      "question": "要分析的那个指标长什么样？",
      "hint": "说的是你要比较/描述的那一个指标，不是全部变量",
      "options": [
        {
          "text": "具体数值",
          "detail": "身高、血压、白细胞计数、量表总分……",
          "next": 129
        },
        {
          "text": "只有两类",
          "detail": "男/女、存活/死亡、阳性/阴性……",
          "next": 130
        },
        {
          "text": "三类以上",
          "detail": "A/B/O/AB 血型、科室、或「轻/中/重」这类有顺序的等级",
          "next": 131
        }
      ]
    },
    {
      "id": 132,
      "question": "生存分析想解决哪个问题？",
      "hint": "",
      "options": [
        {
          "text": "估计生存率、看生存曲线",
          "detail": "画出随时间变化的生存曲线，求中位生存时间",
          "next": 133
        },
        {
          "text": "比较两组的生存曲线",
          "detail": "比如两种治疗方案谁的生存率更高",
          "next": 134
        },
        {
          "text": "看多个因素对生存的影响",
          "detail": "年龄、分期、治疗方式一起分析",
          "next": 135
        }
      ]
    },
    {
      "id": 136,
      "question": "这两个变量分别是什么类型？",
      "hint": "",
      "options": [
        {
          "text": "都是具体数值",
          "detail": "比如身高与体重、年龄与血压",
          "next": 137
        },
        {
          "text": "至少一个是分类变量",
          "detail": "比如血型与疾病、性别与疗效",
          "next": 141
        }
      ]
    },
    {
      "id": 137,
      "question": "这两个数值变量之间是什么关系？",
      "hint": "",
      "options": [
        {
          "text": "看起来大致是直线",
          "detail": "散点图上的点沿着一条直线走",
          "next": 138
        },
        {
          "text": "只是一起增大或减小，不是直线",
          "detail": "",
          "next": 139
        },
        {
          "text": "想用一个去预测另一个",
          "detail": "比如用身高预测肺活量",
          "next": 140
        }
      ]
    },
    {
      "id": 101,
      "result": {
        "method": "均数 ± 标准差，或 中位数（四分位数间距）",
        "why": "描述一批定量数据的**平均水平**和**离散程度**。",
        "cond": [
          "指标是定量变量",
          "没有分组比较的打算，只是描述"
        ],
        "note": "**选哪个看分布**：大致对称、没有极端值 → 均数 ± 标准差；明显偏态或有极端值 → 中位数（四分位数间距）。两个都报也可以。",
        "code": "mean(x); sd(x)                  # 均数 ± 标准差\nmedian(x); IQR(x)               # 中位数（四分位数间距）\nquantile(x, c(0.25, 0.5, 0.75)) # 三个四分位数",
        "read": [
          "均数与中位数差得远 → 分布偏态，优先报中位数",
          "标准差比均数还大 → 数据很散，或存在极端值"
        ],
        "pit": [
          "用均数 ± 标准差描述明显偏态的资料 —— 会掩盖真实分布",
          "只报平均数不报离散程度"
        ],
        "c": {
          "text": "第 4 章 定量资料的统计描述",
          "link": "/Health-statistics/04-describing-quantitative-data"
        }
      }
    },
    {
      "id": 102,
      "result": {
        "method": "频数 + 率（构成比）",
        "why": "描述一个二分类指标的**发生频率**。",
        "cond": [
          "指标只有两类",
          "分母是「有可能发生」的观察单位总数"
        ],
        "note": "分子是发生例数，分母是**全部**观察单位 —— 不是\"没发生的例数\"。",
        "code": "table(d$outcome)\nprop.table(table(d$outcome)) * 100   # 百分比",
        "read": [
          "检查分母对不对 —— 率的分母必须是可能发生该事件的人数"
        ],
        "pit": [
          "把构成比当率用 —— 见第 5 章那张「率与构成比」对照表"
        ],
        "c": {
          "text": "第 5 章 定性资料的统计描述",
          "link": "/Health-statistics/05-describing-qualitative-data"
        }
      }
    },
    {
      "id": 103,
      "result": {
        "method": "频数 + 构成比",
        "why": "描述一个多分类指标的**各部分占比**。",
        "cond": [
          "指标是分类变量（无序或有序）"
        ],
        "note": "**构成比之和必定是 100%**，各部分是此消彼长的关系，不能拿它当\"发生率\"用。",
        "code": "table(d$type)\nprop.table(table(d$type)) * 100",
        "read": [
          "各部分加起来应是 100%，对不上说明分母搞错了"
        ],
        "pit": [
          "有序分类还应该**按顺序**排列水平，不然看不出轻重趋势"
        ],
        "c": {
          "text": "第 5 章 定性资料的统计描述",
          "link": "/Health-statistics/05-describing-qualitative-data"
        }
      }
    },
    {
      "id": 106,
      "result": {
        "method": "Wilcoxon 符号秩检验（单样本）",
        "why": "一组定量数据与已知标准值比较，但数据**偏离正态、或有极端值、或样本量很小**。",
        "cond": [
          "只有一组对象",
          "指标是定量变量，但正态性不成立"
        ],
        "note": "不要求正态分布，代价是**检验效能略低**（同样的差别，需要更多样本才能发现）。",
        "code": "wilcox.test(x, mu = 170)   # 170 换成你要比较的标准值",
        "read": [
          "`V` 是正差值的秩和",
          "`p-value`：与 α 比",
          "看 `median(x)` 而不是均数，和非参数方法更配套"
        ],
        "pit": [
          "数据其实接近正态时也用它 —— 白白损失效能",
          "有大量相同数值（结）时 R 会提示，不要当报错"
        ],
        "c": {
          "text": "第 11 章 非参数检验与秩和检验",
          "link": "/Health-statistics/11-nonparametric"
        }
      }
    },
    {
      "id": 107,
      "result": {
        "method": "单样本 t 检验",
        "why": "一组定量数据，和**一个已知的标准值**比平均水平。",
        "cond": [
          "只有一组对象",
          "指标是定量变量",
          "数据近似正态；样本量小（n < 40）时必须较严格地满足"
        ],
        "code": "t.test(x, mu = 170)      # 170 换成你要比较的标准值",
        "read": [
          "`t` 与 `df`（自由度 = n − 1）",
          "`p-value`：与检验水准 α 比",
          "`conf.int`：均数与标准值之差的 95% 可信区间"
        ],
        "pit": [
          "把「不拒绝 H₀」说成「证明两组相等」—— 只能说没找到差别",
          "大样本时 p 值很小可能只是样本量大，要看均数差的实际大小"
        ],
        "c": {
          "text": "第 8 章 t 检验",
          "link": "/Health-statistics/08-t-test"
        }
      }
    },
    {
      "id": 108,
      "result": {
        "method": "二项检验",
        "why": "一个二分类指标，和**一个已知的发生率**比。",
        "cond": [
          "指标只有两类",
          "要检验的是「发生率是否等于某个值」"
        ],
        "code": "binom.test(45, 200, p = 0.30)   # 45/200 换成你的例数，0.30 换成已知率",
        "read": [
          "`p-value` 是精确法的结果，比正态近似的更可靠",
          "`conf.int` 是率的可信区间 —— 样本量小的时候区间会很宽，这正是重点"
        ],
        "pit": [
          "样本量小时用正态近似算率的可信区间，可能算出负数下限 —— 应该用精确法"
        ],
        "c": {
          "text": "第 6 章 总体均数与总体率的估计",
          "link": "/Health-statistics/06-estimation"
        }
      }
    },
    {
      "id": 109,
      "result": {
        "method": "拟合优度卡方检验",
        "why": "一个多分类指标，看各类的**实际频数**是否偏离某个理论分布。",
        "cond": [
          "指标是多分类变量",
          "每一类的理论频数 T ≥ 5（否则要合并类别）"
        ],
        "code": "chisq.test(table(d$type), p = c(0.5, 0.3, 0.2))   # 换成你假设的构成比，个数要等于类别数",
        "read": [
          "`X-squared` 与 `df`（自由度 = 类别数 − 1）",
          "`p-value`：与 α 比"
        ],
        "pit": [
          "理论频数太小还硬算 —— R 会警告，这时要合并类别"
        ],
        "c": {
          "text": "第 10 章 卡方检验",
          "link": "/Health-statistics/10-chi-square"
        }
      }
    },
    {
      "id": 112,
      "result": {
        "method": "Wilcoxon 符号秩检验（配对）",
        "why": "配对数据，但**差值的分布明显不正态**。",
        "cond": [
          "两组数据一一配对",
          "差值不满足正态性"
        ],
        "code": "wilcox.test(x, y, paired = TRUE)",
        "read": [
          "`V` 是正差值的秩和（不是效应量，别当大小用）",
          "`p-value` 与 α 比"
        ],
        "pit": [
          "和配对 t 检验比，报告时要说明用的是哪一种，别混着写"
        ],
        "c": {
          "text": "第 11 章 非参数检验与秩和检验",
          "link": "/Health-statistics/11-nonparametric"
        }
      }
    },
    {
      "id": 113,
      "result": {
        "method": "配对样本 t 检验",
        "why": "同一批对象测了两次（或配对的两个部位），比较两次的**差值**是否为 0。",
        "cond": [
          "两组数据一一配对",
          "**差值**近似正态（不是两次测量各自正态）"
        ],
        "note": "本质是「把差值当成一组数据做单样本 t 检验」，所以自由度是**对子数 − 1**，不是总测量次数 − 2。",
        "code": "t.test(x, y, paired = TRUE)      # 两个等长向量\n# 注意：t.test(y ~ g, data = d, paired = TRUE) 会直接报错\n#      公式写法只按两独立样本解释，配对必须传两个向量",
        "read": [
          "`df` = 对子数 − 1",
          "`mean of the differences` 是平均差值 —— 比 p 值更该看",
          "`conf.int` 是平均差值的 95% 可信区间"
        ],
        "pit": [
          "**把配对设计当成组检验** —— 最常见也最伤，p 值会偏大、结论可能反转",
          "用配对 t 检验却没有配对关系"
        ],
        "c": {
          "text": "第 8 章 t 检验",
          "link": "/Health-statistics/08-t-test"
        }
      }
    },
    {
      "id": 114,
      "result": {
        "method": "McNemar 检验（配对四格表）",
        "why": "同一批对象测两次，**每次的结果都是「是/否」两类**，比较两次的阳性率有没有变化。",
        "cond": [
          "配对设计",
          "指标是二分类",
          "**只比较不一致的两格**（b 与 c）"
        ],
        "note": "这与「两组人比较阳性率」是**两个不同的问题** —— 那种用普通四格表卡方，不能混用。",
        "code": "m <- table(before, after)   # before / after 是同一批人两次的「是/否」结果\nmcnemar.test(m)",
        "read": [
          "只看对角之外的 b、c 两格",
          "b + c ≥ 40 用不校正公式，< 40 用校正公式（R 会自动选）"
        ],
        "pit": [
          "配对资料用普通卡方检验 —— 忽略了配对关系，结论可能完全反掉"
        ],
        "c": {
          "text": "第 10 章 卡方检验",
          "link": "/Health-statistics/10-chi-square"
        }
      }
    },
    {
      "id": 115,
      "result": {
        "method": "本课程没有覆盖到这种情况",
        "why": "你选的组合超出了本站 17 章的范围。",
        "cond": [],
        "note": "不是没有方法，而是这几种情况在本课程里没展开。**建议先回去把前面的设计类型重新确认一遍**（很多时候是第一步选错了），仍然对不上的话，请咨询任课老师或统计专业人士。",
        "read": [],
        "pit": [
          "硬套一个自己熟悉的方法 —— 这是数据分析里最危险的错误"
        ],
        "c": {
          "text": "第 3 章 实验设计与调查设计",
          "link": "/Health-statistics/03-study-design"
        }
      }
    },
    {
      "id": 118,
      "result": {
        "method": "Mann-Whitney U 检验（Wilcoxon 秩和检验）",
        "why": "两组独立对象，比较某定量或**有序分类**指标，但数据不正态、有极端值、或样本量很小。",
        "cond": [
          "两组对象相互独立",
          "定量变量（不正态）或**有序分类变量**"
        ],
        "note": "比较的是「一组的数值是否倾向于比另一组大」，而不是均数之差。",
        "code": "wilcox.test(value ~ group, data = d)",
        "read": [
          "`W` 是秩和统计量，**不是效应量**",
          "`p-value` 与 α 比",
          "配合两组的中位数一起报告"
        ],
        "pit": [
          "把 `W` 当成\"差别有多大\"来报",
          "数据其实接近正态还用它 —— 效能白丢"
        ],
        "c": {
          "text": "第 11 章 非参数检验与秩和检验",
          "link": "/Health-statistics/11-nonparametric"
        }
      }
    },
    {
      "id": 119,
      "result": {
        "method": "两独立样本 t 检验（Welch）",
        "why": "两组**互不相干**的对象，比较某定量指标的平均水平。",
        "cond": [
          "两组对象相互独立（不是同一批人）",
          "指标是定量变量",
          "数据近似正态，**或**每组样本量较大（n ≥ 40 左右，中心极限定理）"
        ],
        "note": "**建议直接用 R 的默认写法（Welch）**：它不要求两组方差相等，结果更稳。只有当方差齐性检验明确支持、且两组样本量相近时，合并方差的写法才略有优势。",
        "code": "t.test(value ~ group, data = d)                 # Welch，推荐\nt.test(value ~ group, data = d, var.equal = TRUE) # 合并方差，需方差齐",
        "read": [
          "`df` 不是整数是**正常的** —— Welch 的自由度是算出来的",
          "`p-value` 与 α 比",
          "`estimate` 是两组均数，报告时连它一起给"
        ],
        "pit": [
          "**把配对设计误做成组检验**",
          "先做方差齐性检验、不齐就放弃 t 检验 —— 直接用 Welch 更简单也更稳"
        ],
        "c": {
          "text": "第 8 章 t 检验",
          "link": "/Health-statistics/08-t-test"
        }
      }
    },
    {
      "id": 120,
      "result": {
        "method": "四格表卡方检验（按条件选写法）",
        "why": "两组独立对象，比较一个**二分类**指标的发生率。",
        "cond": [
          "两组对象相互独立",
          "指标是二分类",
          "总例数 n 与最小理论频数 T_min 决定用哪种写法"
        ],
        "note": "三种写法怎么选 —— 这是最容易出错的地方：",
        "criteria": [
          [
            "n ≥ 40，且每个格子的理论频数 T ≥ 5",
            "用专用公式，不做校正"
          ],
          [
            "n ≥ 40，但存在 1 ≤ T < 5 的格子",
            "用连续性校正"
          ],
          [
            "n < 40，或存在 T < 1 的格子",
            "改用 Fisher 确切概率法"
          ]
        ],
        "code": "tab <- table(d$group, d$outcome)\nchisq.test(tab)                  # R 默认带连续性校正\nchisq.test(tab, correct = FALSE) # 不校正\nfisher.test(tab)                 # 确切概率法",
        "read": [
          "`X-squared` 与 `df`（四格表恒为 1）",
          "`p-value`：与 α 比",
          "R 提示 `Chi-squared approximation may be incorrect` 时，**要改用 Fisher**"
        ],
        "pit": [
          "看到 R 的近似警告还照用卡方",
          "把率（横向）和构成比（纵向）的百分比算反"
        ],
        "c": {
          "text": "第 10 章 卡方检验",
          "link": "/Health-statistics/10-chi-square"
        }
      }
    },
    {
      "id": 121,
      "result": {
        "method": "行 × 列表卡方检验",
        "why": "两组或多组独立对象，比较一个**无序多分类**指标，或行/列超过 2 的列联表。",
        "cond": [
          "各组相互独立",
          "指标是无序分类",
          "**理论频数 < 5 的格子不超过 1/5**，且不能有 T < 1"
        ],
        "note": "H₁ 只能写「**各组的构成不全相同**」，不能写「各组都不同」。理论频数太小就合并类别，或改用确切概率法。",
        "code": "chisq.test(table(d$group, d$type))",
        "read": [
          "`df` = （行数 − 1）×（列数 − 1）",
          "`p-value`：与 α 比"
        ],
        "pit": [
          "显著之后说「各组都不同」—— 只能说不全相同，要具体比较需做两两比较并校正 α"
        ],
        "c": {
          "text": "第 10 章 卡方检验",
          "link": "/Health-statistics/10-chi-square"
        }
      }
    },
    {
      "id": 124,
      "result": {
        "method": "Kruskal-Wallis H 检验",
        "why": "三组及以上独立对象，比较某定量（不正态）或**有序分类**指标。",
        "cond": [
          "各组相互独立",
          "定量但正态性不成立，或本身是**有序分类**变量"
        ],
        "code": "kruskal.test(value ~ group, data = d)",
        "read": [
          "`Kruskal-Wallis chi-squared` 与 `df`（组数 − 1）",
          "`p-value`：与 α 比"
        ],
        "pit": [
          "显著之后直接下结论说哪两组不同 —— 还要做两两比较并校正水准"
        ],
        "c": {
          "text": "第 11 章 非参数检验与秩和检验",
          "link": "/Health-statistics/11-nonparametric"
        }
      }
    },
    {
      "id": 125,
      "result": {
        "method": "单因素方差分析 + 两两比较",
        "why": "三组及以上**互不相干**的对象，比较某定量指标的平均水平。",
        "cond": [
          "各组相互独立",
          "指标是定量变量",
          "各组近似正态",
          "**各组方差齐**"
        ],
        "note": "**三组以上不能反复用 t 检验** —— 比 3 次会让 I 类错误从 5% 涨到约 14%。方差分析显著之后，再做两两比较（Tukey / SNK / Bonferroni）。",
        "code": "fit <- aov(value ~ group, data = d)\nsummary(fit)        # 先看整体有没有差别\nTukeyHSD(fit)       # 再看具体哪两组之间",
        "read": [
          "`Pr(>F)` 是整个模型的 p 值 —— 它显著只说明「不全相同」",
          "`TukeyHSD` 的 `p adj` 才是两两比较的结果"
        ],
        "pit": [
          "整体不显著还去做两两比较",
          "把「不全相同」说成「各组都不同」"
        ],
        "c": {
          "text": "第 9 章 方差分析",
          "link": "/Health-statistics/09-anova"
        }
      }
    },
    {
      "id": 126,
      "result": {
        "method": "行 × 列表卡方检验",
        "why": "两组或多组独立对象，比较一个**无序多分类**指标，或行/列超过 2 的列联表。",
        "cond": [
          "各组相互独立",
          "指标是无序分类",
          "**理论频数 < 5 的格子不超过 1/5**，且不能有 T < 1"
        ],
        "note": "H₁ 只能写「**各组的构成不全相同**」，不能写「各组都不同」。理论频数太小就合并类别，或改用确切概率法。",
        "code": "chisq.test(table(d$group, d$type))",
        "read": [
          "`df` = （行数 − 1）×（列数 − 1）",
          "`p-value`：与 α 比"
        ],
        "pit": [
          "显著之后说「各组都不同」—— 只能说不全相同，要具体比较需做两两比较并校正 α"
        ],
        "c": {
          "text": "第 10 章 卡方检验",
          "link": "/Health-statistics/10-chi-square"
        }
      }
    },
    {
      "id": 127,
      "result": {
        "method": "行 × 列表卡方检验",
        "why": "两组或多组独立对象，比较一个**无序多分类**指标，或行/列超过 2 的列联表。",
        "cond": [
          "各组相互独立",
          "指标是无序分类",
          "**理论频数 < 5 的格子不超过 1/5**，且不能有 T < 1"
        ],
        "note": "H₁ 只能写「**各组的构成不全相同**」，不能写「各组都不同」。理论频数太小就合并类别，或改用确切概率法。",
        "code": "chisq.test(table(d$group, d$type))",
        "read": [
          "`df` = （行数 − 1）×（列数 − 1）",
          "`p-value`：与 α 比"
        ],
        "pit": [
          "显著之后说「各组都不同」—— 只能说不全相同，要具体比较需做两两比较并校正 α"
        ],
        "c": {
          "text": "第 10 章 卡方检验",
          "link": "/Health-statistics/10-chi-square"
        }
      }
    },
    {
      "id": 129,
      "result": {
        "method": "重复测量方差分析",
        "why": "**同一批对象**在不同时间点（或不同条件下）测了三次及以上，比较各次的定量指标。",
        "cond": [
          "同一批对象的多次测量",
          "指标是定量变量",
          "满足**球形性**（各次测量之间的相关性结构）"
        ],
        "note": "和随机区组设计形似但不同：重复测量是**同一个体**被反复测，要考虑个体内的相关性；不满足球形性时要做 Greenhouse-Geisser 校正。",
        "code": "fit <- aov(value ~ factor(time) + Error(id/time), data = d)\nsummary(fit)",
        "read": [
          "看 `Error: id:time` 那一层的 p 值 —— 那才是时间效应的检验"
        ],
        "pit": [
          "把重复测量数据当独立组分析 —— 忽略了相关性，p 值严重偏小"
        ],
        "c": {
          "text": "第 9 章 方差分析",
          "link": "/Health-statistics/09-anova"
        }
      }
    },
    {
      "id": 130,
      "result": {
        "method": "本课程没有覆盖到这种情况",
        "why": "你选的组合超出了本站 17 章的范围。",
        "cond": [],
        "note": "不是没有方法，而是这几种情况在本课程里没展开。**建议先回去把前面的设计类型重新确认一遍**（很多时候是第一步选错了），仍然对不上的话，请咨询任课老师或统计专业人士。",
        "read": [],
        "pit": [
          "硬套一个自己熟悉的方法 —— 这是数据分析里最危险的错误"
        ],
        "c": {
          "text": "第 3 章 实验设计与调查设计",
          "link": "/Health-statistics/03-study-design"
        }
      }
    },
    {
      "id": 131,
      "result": {
        "method": "Friedman 检验（随机区组秩检验）",
        "why": "同一批对象测了三次及以上，但指标是**有序分类**，或定量数据明显不正态。",
        "cond": [
          "同一批对象的多次测量",
          "有序分类变量，或正态性不成立"
        ],
        "code": "friedman.test(y ~ time | id, data = d)",
        "read": [
          "`Friedman chi-squared` 与 `df`",
          "`p-value`：与 α 比"
        ],
        "pit": [
          "区组（个体）因素没写对 —— 区组变量必须正确标识同一个体"
        ],
        "c": {
          "text": "第 11 章 非参数检验与秩和检验",
          "link": "/Health-statistics/11-nonparametric"
        }
      }
    },
    {
      "id": 133,
      "result": {
        "method": "Kaplan-Meier 法估计生存曲线",
        "why": "随访资料，要**估计**生存率随时间的变化（并给出中位生存时间）。",
        "cond": [
          "有「随访时间」和「是否发生结局」两列",
          "存在**删失**（失访、研究结束时仍存活）"
        ],
        "note": "**删失不等于缺失**：删失者在那之前是确确实实活着的，这些信息必须用上，不能当缺失值丢掉。",
        "code": "library(survival)\nfit <- survfit(Surv(time, status) ~ group, data = d)\nplot(fit, col = 1:2)\nsummary(fit)",
        "read": [
          "曲线上的**阶梯下跳**对应有事件发生的时点",
          "中位生存时间 = 曲线降到 0.5 的那个时间",
          "删失处会打「+」号"
        ],
        "pit": [
          "把删失当缺失丢掉 —— 会高估死亡率",
          "两组的随访时间范围差很多时直接比曲线"
        ],
        "c": {
          "text": "第 14 章 生存分析",
          "link": "/Health-statistics/14-survival-analysis"
        }
      }
    },
    {
      "id": 134,
      "result": {
        "method": "Log-rank 检验",
        "why": "随访资料，比较**两组（或多组）的生存曲线**有没有差别。",
        "cond": [
          "两组或多组随访资料",
          "各组生存曲线**大致成比例**（不成比例时 Log-rank 效能低）"
        ],
        "code": "survdiff(Surv(time, status) ~ group, data = d)",
        "read": [
          "`Chisq` 与 `df`",
          "`p`：与 α 比"
        ],
        "pit": [
          "曲线明显交叉时用 Log-rank —— 这时它可能查不出差别，要考虑分段或用其它检验"
        ],
        "c": {
          "text": "第 14 章 生存分析",
          "link": "/Health-statistics/14-survival-analysis"
        }
      }
    },
    {
      "id": 135,
      "result": {
        "method": "Cox 比例风险回归",
        "why": "随访资料，要看**多个因素一起**对生存时间的影响。",
        "cond": [
          "有随访时间与结局",
          "满足**比例风险假定**（各因素的效应不随时间变）"
        ],
        "code": "fit <- coxph(Surv(time, status) ~ age + sex, data = d)\nsummary(fit)      # exp(coef) 就是 HR\ncox.zph(fit)      # 检验比例风险假定",
        "read": [
          "`exp(coef)` 就是 **HR（风险比）**",
          "HR = 1.5 表示风险是参照组的 1.5 倍",
          "`cox.zph` 的 p < 0.05 → 比例风险假定不成立，要改模型"
        ],
        "pit": [
          "把 HR 当成「生存率之比」—— 它是**风险率**之比",
          "不做比例风险假定检验就直接下结论"
        ],
        "c": {
          "text": "第 14 章 生存分析",
          "link": "/Health-statistics/14-survival-analysis"
        }
      }
    },
    {
      "id": 138,
      "result": {
        "method": "Pearson 相关分析",
        "why": "两个定量变量，看它们之间有没有**线性**关系、有多强。",
        "cond": [
          "两个变量都是定量",
          "**双变量正态**（两个变量的联合分布近似正态）",
          "关系大致是直线"
        ],
        "code": "cor(x, y)\ncor.test(x, y)          # 带检验与可信区间\nplot(x, y)              # 一定要先画散点图",
        "read": [
          "`r` 在 −1 到 1 之间，符号看方向、绝对值看强度",
          "`p-value` 只说明\"不等于 0\"，不代表关系强",
          "**一定要先画散点图** —— r 可能被个别点带偏"
        ],
        "pit": [
          "不画散点图只看 r —— 安斯库姆四重奏就是反例：四组完全不同的数据 r 都是 0.816",
          "把 r 的绝对值大小直接当\"相关性很强\"的依据"
        ],
        "c": {
          "text": "第 12 章 双变量关联性分析",
          "link": "/Health-statistics/12-bivariate-association"
        }
      }
    },
    {
      "id": 139,
      "result": {
        "method": "Spearman 秩相关",
        "why": "两个**至少一个是定量且不正态**、或**有序分类**的变量，看它们有没有**单调**关系。",
        "cond": [
          "两个变量是定量（不正态）或有序分类",
          "关系是单调的（一个增大另一个也增大/减小，不必是直线）"
        ],
        "code": "cor(x, y, method = \"spearman\")\ncor.test(x, y, method = \"spearman\")",
        "read": [
          "`rho` 就是 r_s，同样在 −1 到 1 之间",
          "对极端值不敏感 —— 这是它的优点"
        ],
        "pit": [
          "把 r_s 和 Pearson r 混着报告 —— 两者度量的东西不同（一个单调、一个线性）"
        ],
        "c": {
          "text": "第 12 章 双变量关联性分析",
          "link": "/Health-statistics/12-bivariate-association"
        }
      }
    },
    {
      "id": 140,
      "result": {
        "method": "直线回归",
        "why": "一个定量变量要**用另一个定量变量去预测或解释**。",
        "cond": [
          "因变量是定量变量",
          "自变量与因变量的关系大致线性",
          "残差大致正态、方差齐（要靠残差图检查）"
        ],
        "note": "**相关和回归问的是两件事**：相关看\"有没有关系、多强\"（两个变量不分主次）；回归看\"能不能用 x 预测 y\"（要分清谁是自变量）。",
        "code": "fit <- lm(y ~ x, data = d)\nsummary(fit)     # 系数、t 检验、R²\nplot(fit)        # 四张诊断图 —— 必须看",
        "read": [
          "`Estimate` 里 `(Intercept)` 是截距、`x` 是斜率",
          "`R²` 是模型解释了多少变异",
          "`plot(fit)` 第 1、3 张图看线性和方差齐，第 2 张看正态性"
        ],
        "pit": [
          "不画诊断图就报结果",
          "把 R² 大当成\"预测一定准\"",
          "超出数据范围外推"
        ],
        "c": {
          "text": "第 13 章 直线回归",
          "link": "/Health-statistics/13-linear-regression"
        }
      }
    },
    {
      "id": 141,
      "result": {
        "method": "卡方独立性检验 + 优势比 OR / 相对危险度 RR",
        "why": "两个分类变量，判断它们**有没有关联**，以及关联**有多强**。",
        "cond": [
          "两个变量都是分类变量",
          "卡方检验的理论频数条件（同四格表判据）"
        ],
        "note": "**卡方给 P 值（有没有关联），OR/RR 给强度（关联多强）** —— 两个都要报。队列研究可以算 RR；病例对照研究只能算 OR。",
        "code": "tab <- table(d$exposure, d$outcome)   # 两个分类变量\nchisq.test(tab)\n# 四格表按 (a*d)/(b*c) 手算 OR，或用 epitools::oddsratio()",
        "read": [
          "`p-value`：与 α 比，判断有没有关联",
          "OR = 1 表示没有关联；> 1 正相关，< 1 负相关",
          "OR 总是比 RR 离 1 更远 —— 发生率不低时两者差别很明显"
        ],
        "pit": [
          "把 OR 当 RR 解释",
          "只看 P 值不看 OR —— 样本量大时很小的 OR 也能\"显著\""
        ],
        "c": {
          "text": "第 12 章 双变量关联性分析",
          "link": "/Health-statistics/12-bivariate-association"
        }
      }
    }
  ]
}
