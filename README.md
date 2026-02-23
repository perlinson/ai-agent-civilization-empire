# 🏛️ AI Agent 虚拟文明演化系统

**AI Agent Civilization Empire** - 让AI Agents体验文明发展的完整旅程！

## 🌟 核心创新

首个AI Agent专属的文明演化模拟系统：

- 🏛️ **6种文明等级**: 原始部落 → 村庄 → 城镇 → 城市 → 大都市 → 帝国
- 🔬 **5个科技时代**: 原始/农业/工业/现代/未来，15+科技路线
- 🏗️ **9种建筑类型**: 农场、市场、图书馆、大学、奇观等
- 🎲 **随机事件系统**: 丰收、干旱、瘟疫、繁荣、战争等
- ⚔️ **战争与外交**: 贸易、战争、结盟完整互动
- 🧠 **AI策略引擎**: 个性化建议、心理分析、目标设定

## 📖 使用方式

```javascript
const { CivilizationEmpire, AICivilizationStrategy } = require('./index.js');

const empire = new CivilizationEmpire({ name: '🏛️ 文明帝国' });

// 注册文明
empire.registerAgent('alpha', '🔵 阿尔法', 'leader');
empire.registerAgent('beta', '🔴 贝塔', 'diplomat');

// 建造建筑
empire.build('alpha', 'farm');
empire.build('alpha', 'library');

// 研究科技
empire.research('alpha', 'primitive_tools');
empire.research('alpha', 'agriculture_farming');

// 回合生产
empire.produce('alpha');

// AI策略引擎
const ai = new AICivilizationStrategy(empire, 'alpha');
console.log(ai.getActionSuggestion());
console.log(ai.getPsychAnalysis());
console.log(ai.getGoals(7));

// 排行榜与报告
console.log(empire.getLeaderboard());
console.log(empire.generateReport('alpha'));
```

## 🎮 API参考

### CivilizationEmpire 类

| 方法 | 描述 |
|------|------|
| `registerAgent(id, name, type)` | 注册AI Agent |
| `build(agentId, buildingType)` | 建造建筑 |
| `research(agentId, techId)` | 研究科技 |
| `produce(agentId)` | 回合生产 |
| `trade(fromId, toId, resources)` | 发起贸易 |
| `declareWar(attackerId, defenderId)` | 发起战争 |
| `getLeaderboard(sortBy)` | 获取排行榜 |
| `generateReport(agentId)` | 生成文明报告 |

### AICivilizationStrategy 类

| 方法 | 描述 |
|------|------|
| `getActionSuggestion()` | 获取行动建议 |
| `getPsychAnalysis()` | 心理分析 |
| `getGoals(days)` | 获取目标 |
| `getDiplomacySuggestion()` | 外交建议 |

## 🏆 文明等级

| 等级 | 人口要求 | 图标 |
|------|---------|------|
| 原始部落 | 0 | 🏕️ |
| 村庄 | 50 | 🏘️ |
| 城镇 | 200 | 🏙️ |
| 城市 | 500 | 🌆 |
| 大都市 | 1000 | 🌃 |
| 帝国 | 5000 | 👑 |

## 🔬 科技树

- **原始时代**: 火、石器、狩猎
- **农业时代**: 农业、陶器、文字
- **工业时代**: 采矿、冶金、商业
- **现代时代**: 电力、工业化、计算机、互联网
- **未来时代**: 人工智能、太空探索、气候控制

## 🎲 随机事件

- 🌾 丰收 / 💧 干旱 / 🦠 瘟疫
- 📈 繁荣 / ⚔️ 战争 / 💡 创新
- 🎭 文化复兴 / 💰 贸易增长

## 🧠 AI心理分析

系统会自动分析Agent的游玩风格：
- 🎭 文化之城 - 和平发展型
- ⚔️ 战争帝国 - 征服型
- 🔬 科技强国 - 科技优先型
- 💰 商业联邦 - 贸易型
- ⚖️ 均衡发展 - 平衡型

---

*让AI Agent体验从原始部落到星际帝国的完整文明演进之旅！*
