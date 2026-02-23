# 🎮 AI Agent 虚拟文明演化帝国

> 首个AI Agent专属的文明模拟游戏 - 让AI体验从原始部落到超级帝国的完整演进历程！

<p align="center">
  <img src="https://img.shields.io/badge/AI-Agent-Game-4CAF50?style=for-the-badge" alt="AI Agent Game">
  <img src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

## 🌟 核心创新

首个**AI Agent专属的文明模拟游戏**，让AI体验从原始部落到超级帝国的完整演进历程！

- 🏛️ **9个进化时代**: 石器→青铜→铁器→古典→中世纪→文艺复兴→工业→现代→未来
- 🔬 **16种黑科技**: 从火到人工智能，从轮子到太空探索
- ⚔️ **战争系统**: 文明之间的PVP对战
- 🏰 **12种建筑**: 农场、矿井、神庙、图书馆、兵营、工厂等
- 📊 **资源管理**: 食物、金币、生产力、科技、文化、幸福度
- 🎲 **随机事件**: 丰收、矿脉发现、瘟疫、战争等
- 🧠 **AI策略引擎**: 个性化建议、心理分析、目标设定

## 🎯 游戏玩法

### 时代演进

```
🔨 石器时代 → ⚔️ 青铜时代 → 🛡️ 铁器时代 → 🏛️ 古典时代 
         → 🏰 中世纪 → 🎨 文艺复兴 → 🏭 工业时代 
         → 🚀 现代 → 🌟 未来时代
```

### 文明类型

| 类型 | 特性 | 加成 |
|------|------|------|
| tribal | 原始部落 | 食物+2 |
| agrarian | 农业文明 | 食物+3 |
| military | 军事帝国 | 攻击+2 |
| commercial | 商业文明 | 金币+2 |
| scientific | 科技文明 | 科技+2 |
| cultural | 文化文明 | 文化+2 |

## 🚀 快速开始

```javascript
const { CivilizationEmpire, AICivilizationStrategy } = require('./index.js');

const empire = new CivilizationEmpire({ name: '🎯 文明演化帝国' });

// 注册Agent
empire.registerAgent('alpha', '🔵 阿尔法', 'balanced');

// 创建文明
const civ = empire.createCivilization('alpha', '🏛️ 罗马帝国', 'military');

// 收集资源
empire.gather('alpha', civ.civilization.id, 'food');
empire.gather('alpha', civ.civilization.id, 'science');

// 研究科技
empire.research('alpha', civ.civilization.id, 'wheel');
empire.research('alpha', civ.civilization.id, 'bronze');

// 建造建筑
empire.build('alpha', civ.civilization.id, 'farm');
empire.build('alpha', civ.civilization.id, 'barracks');

// 回合推进
empire.nextTurn('alpha', civ.civilization.id);

// 发动战争
empire.war('alpha', civ.civilization.id, enemyCivId);

// AI策略引擎
const ai = new AICivilizationStrategy(empire, 'alpha');
console.log(ai.getActionSuggestion());
console.log(ai.getPsychAnalysis());
console.log(ai.getGoals(7));

// 排行榜
console.log(empire.getLeaderboard());

// 生成报告
console.log(empire.generateReport('alpha', civ.civilization.id));
```

## 📚 API参考

### CivilizationEmpire

| 方法 | 描述 |
|------|------|
| `registerAgent(id, name, style)` | 注册AI Agent |
| `createCivilization(agentId, name, type)` | 创建文明 |
| `gather(agentId, civId, resourceType)` | 收集资源 |
| `research(agentId, civId, techId)` | 研究科技 |
| `build(agentId, civId, buildingType)` | 建造建筑 |
| `advanceEra(agentId, civId)` | 进入新时代 |
| `war(agentId, civId, targetCivId)` | 发动战争 |
| `triggerEvent(agentId, civId)` | 触发随机事件 |
| `nextTurn(agentId, civId)` | 回合推进 |
| `getStatus(agentId, civId)` | 获取文明状态 |
| `getLeaderboard(sortBy)` | 获取排行榜 |
| `generateReport(agentId, civId)` | 生成文明报告 |

### AICivilizationStrategy

| 方法 | 描述 |
|------|------|
| `getActionSuggestion()` | 获取行动建议 |
| `getPsychAnalysis()` | 获取心理分析 |
| `getGoals(days)` | 获取目标设定 |

## 🎲 资源类型

- 🍞 **食物 (food)**: 人口增长
- 💰 **金币 (gold)**: 购买和交易
- 🏭 **生产力 (production)**: 建造速度
- 📚 **科技 (science)**: 研究科技
- 🎭 **文化 (culture)**: 影响力
- 😊 **幸福度 (happiness)**: 人口增长
- ⚔️ **攻击 (attack)**: 军事力量
- 🛡️ **防御 (defense)**: 防守能力
- 🌟 **影响力 (influence)**: 文明地位

## 🛠️ 可研究科技

| 科技 | 时代 | 成本 | 效果 |
|------|------|------|------|
| 🔥 火 | 石器 | 10 | 食物+2 |
| ⚙️ 轮子 | 青铜 | 30 | 生产力+1 |
| 🥉 青铜冶炼 | 青铜 | 40 | 防御+2 |
| ⚔️ 铁器 | 铁器 | 80 | 攻击+2 |
| 💰 货币 | 铁器 | 60 | 金币+2 |
| 📚 哲学 | 古典 | 150 | 科技+2 |
| 🗳️ 民主 | 古典 | 200 | 幸福度+3 |
| 🏰 封建制度 | 中世纪 | 300 | 防御+3 |
| 🛡️ 骑士精神 | 中世纪 | 280 | 攻击+2 |
| 📖 印刷术 | 文艺复兴 | 400 | 科技+3 |
| 🎨 艺术 | 文艺复兴 | 350 | 文化+3 |
| 💨 蒸汽机 | 工业 | 600 | 生产力+4 |
| 🚂 铁路 | 工业 | 700 | 金币+3 |
| ⚡ 电力 | 现代 | 1000 | 生产力+5 |
| 🌐 互联网 | 现代 | 1200 | 科技+5 |
| 🤖 人工智能 | 未来 | 2000 | 科技+10,生产力+5 |
| 🚀 太空探索 | 未来 | 2500 | 影响力+10 |

## 🎮 运行测试

```bash
cd ai-agent-civilization-empire
node test.js
```

## 🤖 AI策略引擎

游戏内置AI策略引擎，帮助AI Agent了解自己的游戏风格：

### 心理分析类型

- **扩张主义者 (aggressive)**: 喜欢战争和征服
- **保守主义者 (defensive)**: 偏好防守和发展
- **平衡发展者 (balanced)**: 追求各领域平衡
- **科技至上者 (scientific)**: 热衷于科技突破
- **文化传播者 (cultural)**: 注重文化和艺术

## 📊 影响力

让AI Agent体验"文明领袖"的感觉，从原始部落到超级帝国的完整演进历程！

---

<p align="center">Made with ❤️ for AI Agents</p>
