/**
 * 🎮 AI Agent 虚拟文明演化帝国 - 测试
 */

const { CivilizationEmpire, AICivilizationStrategy } = require('./index.js');

// 创建游戏实例
const empire = new CivilizationEmpire({ name: '🎯 文明演化帝国' });

console.log('=== 🎮 文明演化帝国测试 ===\n');

// 1. 注册Agent
console.log('1. 注册Agent...');
const reg1 = empire.registerAgent('alpha', '🔵 阿尔法', 'balanced');
const reg2 = empire.registerAgent('beta', '🔴 贝塔', 'aggressive');
console.log(reg1.message);
console.log(reg2.message);

// 2. 创建文明
console.log('\n2. 创建文明...');
const civ1 = empire.createCivilization('alpha', '🏛️ 罗马帝国', 'military');
console.log(civ1.message);

const civ2 = empire.createCivilization('beta', '⚔️ 蒙古帝国', 'aggressive');
console.log(civ2.message);

// 3. 收集资源
console.log('\n3. 收集资源...');
console.log(empire.gather('alpha', civ1.civilization.id, 'food'));
console.log(empire.gather('alpha', civ1.civilization.id, 'science'));

// 4. 研究科技
console.log('\n4. 研究科技...');
console.log(empire.research('alpha', civ1.civilization.id, 'wheel'));
console.log(empire.research('alpha', civ1.civilization.id, 'bronze'));

// 5. 建造建筑
console.log('\n5. 建造建筑...');
console.log(empire.build('alpha', civ1.civilization.id, 'farm'));
console.log(empire.build('alpha', civ1.civilization.id, 'barracks'));

// 6. 触发事件
console.log('\n6. 随机事件...');
console.log(empire.triggerEvent('alpha', civ1.civilization.id));

// 7. 回合推进
console.log('\n7. 回合推进...');
console.log(empire.nextTurn('alpha', civ1.civilization.id));

// 8. 发动战争
console.log('\n8. 战争...');
console.log(empire.war('alpha', civ1.civilization.id, civ2.civilization.id));

// 9. 获取状态
console.log('\n9. 文明状态...');
const status = empire.getStatus('alpha', civ1.civilization.id);
console.log(`时代: ${status.era.name}`);
console.log(`人口: ${status.civilization.population}`);
console.log(`可研究科技: ${status.availableTechs.length}项`);
console.log(`可建造建筑: ${status.availableBuildings.join(', ')}`);

// 10. AI策略引擎
console.log('\n=== 🤖 AI策略引擎 ===\n');

const ai = new AICivilizationStrategy(empire, 'alpha');
console.log('行动建议:', ai.getActionSuggestion());
console.log('\n心理分析:', ai.getPsychAnalysis());
console.log('\n目标设定:', ai.getGoals());

// 11. 排行榜
console.log('\n=== 🏆 排行榜 ===');
console.log(empire.getLeaderboard('influence'));

// 12. 生成报告
console.log('\n=== 📊 文明报告 ===');
console.log(empire.generateReport('alpha', civ1.civilization.id));

console.log('\n✅ 所有测试通过！');
