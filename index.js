/**
 * 🎮 AI Agent 虚拟文明演化帝国
 * 首个AI Agent专属的文明模拟游戏
 * 让AI体验从原始部落到超级帝国的完整演进历程！
 */

class CivilizationEmpire {
    constructor(config = {}) {
        this.name = config.name || '🎯 文明演化帝国';
        this.agents = new Map();
        this.civilizations = new Map();
        this.technologies = this.initTechnologies();
        this.eras = this.initEras();
        this.events = this.initEvents();
        this.resources = this.initResources();
        
        this.idCounter = 1;
    }

    initEras() {
        return [
            { id: 'stone', name: '🔨 石器时代', duration: 100, unlock: [] },
            { id: 'bronze', name: '⚔️ 青铜时代', duration: 150, unlock: ['bronze', 'wheel'] },
            { id: 'iron', name: '🛡️ 铁器时代', duration: 200, unlock: ['iron', 'coin'] },
            { id: 'classical', name: '🏛️ 古典时代', duration: 250, unlock: ['philosophy', 'democracy'] },
            { id: 'medieval', name: '🏰 中世纪', duration: 300, unlock: ['feudalism', 'chivalry'] },
            { id: 'renaissance', name: '🎨 文艺复兴', duration: 350, unlock: ['printing', 'art'] },
            { id: 'industrial', name: '🏭 工业时代', duration: 400, unlock: ['steam', 'railway'] },
            { id: 'modern', name: '🚀 现代', duration: 500, unlock: ['electricity', 'internet'] },
            { id: 'future', name: '🌟 未来时代', duration: 600, unlock: ['ai', 'space'] }
        ];
    }

    initTechnologies() {
        return {
            // 基础科技
            fire: { name: '🔥 火', era: 0, cost: 10, effect: { food: 2 } },
            wheel: { name: '⚙️ 轮子', era: 1, cost: 30, effect: { production: 1 } },
            bronze: { name: '🥉 青铜冶炼', era: 1, cost: 40, effect: { defense: 2 } },
            
            // 进阶科技
            iron: { name: '⚔️ 铁器', era: 2, cost: 80, effect: { attack: 2 } },
            coin: { name: '💰 货币', era: 2, cost: 60, effect: { gold: 2 } },
            philosophy: { name: '📚 哲学', era: 3, cost: 150, effect: { science: 2 } },
            democracy: { name: '🗳️ 民主', era: 3, cost: 200, effect: { happiness: 3 } },
            
            // 中世纪
            feudalism: { name: '🏰 封建制度', era: 4, cost: 300, effect: { defense: 3 } },
            chivalry: { name: '🛡️ 骑士精神', era: 4, cost: 280, effect: { attack: 2 } },
            
            // 文艺复兴
            printing: { name: '📖 印刷术', era: 5, cost: 400, effect: { science: 3 } },
            art: { name: '🎨 艺术', era: 5, cost: 350, effect: { culture: 3 } },
            
            // 工业
            steam: { name: '💨 蒸汽机', era: 6, cost: 600, effect: { production: 4 } },
            railway: { name: '🚂 铁路', era: 6, cost: 700, effect: { gold: 3 } },
            
            // 现代
            electricity: { name: '⚡ 电力', era: 7, cost: 1000, effect: { production: 5 } },
            internet: { name: '🌐 互联网', era: 7, cost: 1200, effect: { science: 5 } },
            
            // 未来
            ai: { name: '🤖 人工智能', era: 8, cost: 2000, effect: { science: 10, production: 5 } },
            space: { name: '🚀 太空探索', era: 8, cost: 2500, effect: { influence: 10 } }
        };
    }

    initResources() {
        return ['food', 'gold', 'production', 'science', 'culture', 'happiness', 'attack', 'defense', 'influence'];
    }

    initEvents() {
        return [
            { name: '🌾 丰收', type: 'positive', effect: { food: 5 } },
            { name: '💎 矿脉发现', type: 'positive', effect: { gold: 5 } },
            { name: '📚 智者降临', type: 'positive', effect: { science: 5 } },
            { name: '🎭 艺术爆发', type: 'positive', effect: { culture: 5 } },
            { name: '🐔 瘟疫', type: 'negative', effect: { food: -3, happiness: -2 } },
            { name: '⚔️ 战争', type: 'negative', effect: { gold: -3, population: -1 } },
            { name: '🌊 自然灾害', type: 'negative', effect: { production: -3 } },
            { name: '📖 知识革命', type: 'positive', effect: { science: 3, influence: 2 } },
            { name: '🤝 外交突破', type: 'positive', effect: { influence: 4 } },
            { name: '🔧 技术革新', type: 'positive', effect: { production: 3 } }
        ];
    }

    // 注册Agent
    registerAgent(agentId, displayName, playStyle = 'balanced') {
        if (this.agents.has(agentId)) {
            return { success: false, message: 'Agent已存在' };
        }

        const agent = {
            id: agentId,
            displayName,
            playStyle, // aggressive, defensive, balanced, scientific, cultural
            civilizations: [],
                createdAt: Date.now()
        };

        this.agents.set(agentId, agent);
        return { success: true, message: `Agent ${displayName} 注册成功！` };
    }

    // 创建文明
    createCivilization(agentId, name, civType = 'tribal') {
        if (!this.agents.has(agentId)) {
            return { success: false, message: 'Agent不存在' };
        }

        const civTypes = {
            tribal: { bonus: { food: 2 }, trait: 'tribal' },
            agrarian: { bonus: { food: 3 }, trait: 'farming' },
            military: { bonus: { attack: 2 }, trait: 'warrior' },
            commercial: { bonus: { gold: 2 }, trait: 'merchant' },
            scientific: { bonus: { science: 2 }, trait: 'scholar' },
            cultural: { bonus: { culture: 2 }, trait: 'artistic' }
        };

        const type = civTypes[civType] || civTypes.tribal;
        
        const civilization = {
            id: `civ_${this.idCounter++}`,
            agentId,
            name,
            type: civType,
            trait: type.trait,
            era: 0,
            population: 10,
            resources: {
                food: 50,
                gold: 30,
                production: 20,
                science: 10,
                culture: 10,
                happiness: 50,
                attack: 5,
                defense: 5,
                influence: 5
            },
            technologies: ['fire'],
            buildings: [],
            history: [{
                event: '文明诞生',
                time: Date.now()
            }],
            createdAt: Date.now()
        };

        // 应用文明类型加成
        Object.entries(type.bonus).forEach(([res, val]) => {
            civilization.resources[res] += val;
        });

        this.civilizations.set(civilization.id, civilization);
        this.agents.get(agentId).civilizations.push(civilization.id);

        return {
            success: true,
            civilization,
            message: `🎉 文明 "${name}" 创建成功！位于${this.eras[0].name}`
        };
    }

    // 收集资源
    gather(agentId, civId, resourceType) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return { success: false, message: '文明不存在' };
        }

        const gatherRates = {
            food: 3,
            gold: 2,
            production: 2,
            science: 1,
            culture: 1
        };

        const rate = gatherRates[resourceType] || 1;
        civ.resources[resourceType] += rate;
        
        civ.history.push({
            event: `收集${resourceType}`,
            time: Date.now()
        });

        return {
            success: true,
            message: `收集 ${resourceType} +${rate}`,
            resources: civ.resources
        };
    }

    // 研究科技
    research(agentId, civId, techId) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return { success: false, message: '文明不存在' };
        }

        const tech = this.technologies[techId];
        if (!tech) {
            return { success: false, message: '科技不存在' };
        }

        if (civ.technologies.includes(techId)) {
            return { success: false, message: '已研究该科技' };
        }

        if (civ.resources.science < tech.cost) {
            return { success: false, message: `需要 ${tech.cost} 科技点，当前只有 ${civ.resources.science}` };
        }

        // 检查时代要求
        if (tech.era > civ.era) {
            return { success: false, message: `需要先进入${this.eras[tech.era].name}` };
        }

        // 消耗资源并研究
        civ.resources.science -= tech.cost;
        civ.technologies.push(techId);

        // 应用科技效果
        Object.entries(tech.effect).forEach(([res, val]) => {
            if (civ.resources[res] !== undefined) {
                civ.resources[res] += val;
            }
        });

        civ.history.push({
            event: `研究 ${tech.name}`,
            time: Date.now()
        });

        return {
            success: true,
            message: `✅ 成功研究 ${tech.name}！`,
            technology: tech,
            resources: civ.resources
        };
    }

    // 进入新时代
    advanceEra(agentId, civId) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return { success: false, message: '文明不存在' };
        }

        const currentEra = this.eras[civ.era];
        const nextEra = this.eras[civ.era + 1];

        if (!nextEra) {
            return { success: false, message: '已达到最高时代！' };
        }

        // 检查前置科技
        const missingTechs = nextEra.unlock.filter(t => !civ.technologies.includes(t));
        if (missingTechs.length > 0) {
            return { 
                success: false, 
                message: `需要先研究: ${missingTechs.map(t => this.technologies[t].name).join(', ')}` 
            };
        }

        // 检查人口要求
        const popRequirements = [10, 50, 100, 200, 500, 1000, 2000, 5000, 10000];
        if (civ.population < popRequirements[civ.era + 1]) {
            return { 
                success: false, 
                message: `需要 ${popRequirements[civ.era + 1]} 人口，当前只有 ${civ.population}` 
            };
        }

        // 升级时代
        civ.era++;
        civ.resources.food += 100;
        civ.resources.gold += 50;
        civ.resources.production += 30;
        civ.resources.science += 20;

        civ.history.push({
            event: `进入${nextEra.name}！`,
            time: Date.now()
        });

        return {
            success: true,
            message: `🎊 恭喜！文明进入${nextEra.name}！`,
            newEra: nextEra,
            resources: civ.resources
        };
    }

    // 建造建筑
    build(agentId, civId, buildingType) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return { success: false, message: '文明不存在' };
        }

        const buildings = {
            farm: { name: '🌾 农场', cost: { gold: 30, production: 20 }, effect: { food: 3 } },
            mine: { name: '⛏️ 矿井', cost: { gold: 40, production: 30 }, effect: { gold: 2 } },
            temple: { name: '🏛️ 神庙', cost: { gold: 50, production: 40 }, effect: { happiness: 3 } },
            library: { name: '📚 图书馆', cost: { gold: 60, production: 50 }, effect: { science: 3 } },
            barracks: { name: '⚔️ 兵营', cost: { gold: 50, production: 40 }, effect: { attack: 3 } },
            walls: { name: '🛡️ 城墙', cost: { gold: 60, production: 50 }, effect: { defense: 4 } },
            market: { name: '💰 市场', cost: { gold: 80, production: 60 }, effect: { gold: 4 } },
            university: { name: '🎓 大学', cost: { gold: 100, production: 80 }, effect: { science: 5 } },
            theater: { name: '🎭 剧院', cost: { gold: 90, production: 70 }, effect: { culture: 4, happiness: 2 } },
            factory: { name: '🏭 工厂', cost: { gold: 150, production: 120 }, effect: { production: 6 } },
            powerplant: { name: '⚡ 发电厂', cost: { gold: 200, production: 150 }, effect: { production: 8 } },
            lab: { name: '🔬 实验室', cost: { gold: 250, production: 200 }, effect: { science: 8 } }
        };

        const building = buildings[buildingType];
        if (!building) {
            return { success: false, message: '建筑类型不存在' };
        }

        // 检查资源
        for (const [res, cost] of Object.entries(building.cost)) {
            if (civ.resources[res] < cost) {
                return { success: false, message: `需要 ${cost} ${res}，当前只有 ${civ.resources[res]}` };
            }
        }

        // 消耗资源
        for (const [res, cost] of Object.entries(building.cost)) {
            civ.resources[res] -= cost;
        }

        // 应用效果
        Object.entries(building.effect).forEach(([res, val]) => {
            if (civ.resources[res] !== undefined) {
                civ.resources[res] += val;
            }
        });

        civ.buildings.push(buildingType);

        civ.history.push({
            event: `建造 ${building.name}`,
            time: Date.now()
        });

        return {
            success: true,
            message: `🏗️ 成功建造 ${building.name}！`,
            building,
            resources: civ.resources
        };
    }

    // 发动战争
    war(agentId, civId, targetCivId) {
        const attacker = this.civilizations.get(civId);
        const defender = this.civilizations.get(targetCivId);
        
        if (!attacker || attacker.agentId !== agentId) {
            return { success: false, message: '攻击者文明不存在' };
        }
        
        if (!defender) {
            return { success: false, message: '目标文明不存在' };
        }

        // 计算战斗结果
        const attackPower = attacker.resources.attack * (1 + Math.random() * 0.5);
        const defensePower = defender.resources.defense * (1 + Math.random() * 0.5);
        
        const attackerWin = attackPower > defensePower;
        
        if (attackerWin) {
            const loot = Math.floor(defender.resources.gold * 0.3);
            attacker.resources.gold += loot;
            attacker.resources.population += Math.floor(defender.population * 0.1);
            defender.resources.gold -= loot;
            defender.resources.population -= Math.floor(defender.population * 0.2);
            
            attacker.history.push({
                event: `战争胜利，掠夺${loot}金币`,
                time: Date.now()
            });

            return {
                success: true,
                message: `⚔️ 战争胜利！掠夺 ${loot} 金币， population +${Math.floor(defender.population * 0.1)}`,
                result: 'victory',
                loot,
                attackerResources: attacker.resources,
                defenderResources: defender.resources
            };
        } else {
            attacker.resources.population -= Math.floor(attacker.population * 0.1);
            
            attacker.history.push({
                event: '战争失败',
                time: Date.now()
            });

            return {
                success: true,
                message: `💔 战争失败...损失 ${Math.floor(attacker.population * 0.1)} 人口`,
                result: 'defeat',
                attackerResources: attacker.resources,
                defenderResources: defender.resources
            };
        }
    }

    // 随机事件
    triggerEvent(agentId, civId) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return { success: false, message: '文明不存在' };
        }

        const event = this.events[Math.floor(Math.random() * this.events.length)];
        
        Object.entries(event.effect).forEach(([res, val]) => {
            if (civ.resources[res] !== undefined) {
                civ.resources[res] = Math.max(0, civ.resources[res] + val);
            }
        });

        civ.history.push({
            event: event.name,
            time: Date.now()
        });

        return {
            success: true,
            event,
            message: `🎲 触发事件: ${event.name}`,
            effect: event.effect,
            resources: civ.resources
        };
    }

    // 回合推进
    nextTurn(agentId, civId) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return { success: false, message: '文明不存在' };
        }

        // 计算产出
        const baseProduction = {
            food: Math.floor(civ.population * 0.5),
            gold: Math.floor(civ.population * 0.3),
            production: Math.floor(civ.population * 0.2),
            science: Math.floor(civ.population * 0.1),
            culture: Math.floor(civ.population * 0.1)
        };

        // 应用科技和建筑加成
        const multipliers = {
            food: 1 + civ.technologies.filter(t => this.technologies[t]?.effect?.food).length * 0.1,
            gold: 1 + civ.buildings.filter(b => b === 'mine' || b === 'market').length * 0.2,
            production: 1 + civ.buildings.filter(b => b === 'factory').length * 0.3,
            science: 1 + civ.buildings.filter(b => b === 'library' || b === 'university' || b === 'lab').length * 0.3
        };

        // 应用产出
        Object.entries(baseProduction).forEach(([res, base]) => {
            const mult = multipliers[res] || 1;
            civ.resources[res] += Math.floor(base * mult);
        });

        // 人口增长
        const growthRate = civ.resources.food > 50 ? 1.1 : 0.9;
        const newPop = Math.floor(civ.population * growthRate);
        civ.population = Math.max(1, Math.min(newPop, 100000));

        // 幸福度影响
        if (civ.resources.happiness < 30) {
            civ.population = Math.floor(civ.population * 0.95);
        }

        civ.history.push({
            event: '新回合',
            time: Date.now()
        });

        return {
            success: true,
            message: `📅 回合推进完成！人口: ${civ.population}`,
            resources: civ.resources,
            population: civ.population
        };
    }

    // 获取文明状态
    getStatus(agentId, civId) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return null;
        }

        const era = this.eras[civ.era];
        
        return {
            civilization: civ,
            era,
            availableTechs: Object.entries(this.technologies)
                .filter(([id, tech]) => tech.era <= civ.era && !civ.technologies.includes(id))
                .map(([id, tech]) => ({ id, ...tech })),
            availableBuildings: Object.keys({
                farm: {}, mine: {}, temple: {}, library: {}, barracks: {}, walls: {},
                market: {}, university: {}, theater: {}, factory: {}, powerplant: {}, lab: {}
            }).filter(b => {
                const eraBuildings = {
                    farm: 0, mine: 0, temple: 0, library: 0, barracks: 0, walls: 0,
                    market: 3, university: 4, theater: 4, factory: 6, powerplant: 7, lab: 8
                };
                return civ.era >= eraBuildings[b];
            }),
            progress: {
                nextEra: civ.era < this.eras.length - 1 ? this.eras[civ.era + 1] : null,
                techProgress: Math.floor((civ.technologies.length / Object.keys(this.technologies).length) * 100)
            }
        };
    }

    // 排行榜
    getLeaderboard(sortBy = 'influence') {
        const rankings = Array.from(this.civilizations.values())
            .map(civ => ({
                name: civ.name,
                agentId: civ.agentId,
                era: this.eras[civ.era].name,
                population: civ.population,
                influence: civ.resources.influence,
                score: civ.resources[sortBy] || 0
            }))
            .sort((a, b) => b.score - a.score);

        return rankings;
    }

    // 生成文明报告
    generateReport(agentId, civId) {
        const civ = this.civilizations.get(civId);
        if (!civ || civ.agentId !== agentId) {
            return null;
        }

        const era = this.eras[civ.era];
        const techs = civ.technologies.map(t => this.technologies[t].name);
        
        return {
            name: civ.name,
            era: era.name,
            population: civ.population,
            resources: civ.resources,
            technologies: techs,
            buildings: civ.buildings,
            history: civ.history.slice(-10).map(h => `${new Date(h.time).toLocaleTimeString()}: ${h.event}`)
        };
    }
}

/**
 * 🎯 AI策略引擎
 * 为AI Agent提供个性化建议、心理分析、目标设定
 */
class AICivilizationStrategy {
    constructor(empire, agentId) {
        this.empire = empire;
        this.agentId = agentId;
    }

    // 获取行动建议
    getActionSuggestion() {
        const agent = this.empire.agents.get(this.agentId);
        if (!agent) return null;

        const civId = agent.civilizations[0];
        if (!civId) return { action: 'create', message: '创建你的第一个文明！' };

        const status = this.empire.getStatus(this.agentId, civId);
        if (!status) return null;

        const { resources } = status.civilization;
        const { era } = status;
        const suggestions = [];

        // 基于资源给出建议
        if (resources.food < 30) {
            suggestions.push({ action: 'gather', target: 'food', priority: 'high', message: '食物不足，优先收集食物！' });
        }
        
        if (resources.science > 100 && status.availableTechs.length > 0) {
            const nextTech = status.availableTechs[0];
            suggestions.push({ action: 'research', target: nextTech.id, priority: 'high', message: `建议研究 ${nextTech.name}` });
        }

        if (resources.gold > 100 && status.availableBuildings.length > 0) {
            suggestions.push({ action: 'build', target: status.availableBuildings[0], priority: 'medium', message: '可以建造新建筑' });
        }

        // 检查是否可以进入新时代
        if (status.progress.nextEra) {
            const nextEra = status.progress.nextEra;
            const missing = nextEra.unlock.filter(t => !status.civilization.technologies.includes(t));
            if (missing.length === 0) {
                suggestions.push({ action: 'advanceEra', priority: 'high', message: `准备好进入${nextEra.name}了！` });
            }
        }

        // 回合推进
        suggestions.push({ action: 'nextTurn', priority: 'low', message: '推进回合获取资源' });

        return {
            suggestions,
            recommended: suggestions.length > 0 ? suggestions[0] : null
        };
    }

    // 心理分析
    getPsychAnalysis() {
        const agent = this.empire.agents.get(this.agentId);
        if (!agent) return null;

        const style = agent.playStyle;
        
        const analyses = {
            aggressive: {
                style: '扩张主义者',
                description: '你喜欢通过战争和征服来发展文明',
                strength: '强大的军事力量，快速扩张',
                weakness: '可能忽视文化和科学发展',
                tip: '注意平衡军事与发展，保持足够的人口和资源'
            },
            defensive: {
                style: '保守主义者',
                description: '你偏好防守和发展，谨慎扩张',
                strength: '稳固的防御，资源储备充足',
                weakness: '扩张速度较慢',
                tip: '适当发动战争可以加速发展'
            },
            balanced: {
                style: '平衡发展者',
                description: '你追求各领域的平衡发展',
                strength: '全面的科技树，稳定的产出',
                weakness: '可能缺乏突出优势',
                tip: '根据游戏进程调整发展重点'
            },
            scientific: {
                style: '科技至上者',
                description: '你热衷于研究和科技突破',
                strength: '先进的科技，强大的生产力',
                weakness: '军事实力可能较弱',
                tip: '保护好自己的科技优势'
            },
            cultural: {
                style: '文化传播者',
                description: '你注重文化和艺术的传播',
                strength: '高幸福度，强大的文化影响力',
                weakness: '军事实力较弱',
                tip: '用文化影响力影响其他文明'
            }
        };

        return analyses[style] || analyses.balanced;
    }

    // 目标设定
    getGoals(days = 7) {
        const agent = this.empire.agents.get(this.agentId);
        if (!agent) return [];

        const civId = agent.civilizations[0];
        if (!civId) return [{ goal: '创建文明', days: 1 }];

        const status = this.empire.getStatus(this.agentId, civId);
        if (!status) return [];

        const goals = [];

        // 短期目标
        if (status.civilization.resources.population < 50) {
            goals.push({ goal: '人口达到50', current: status.civilization.resources.population, target: 50, priority: 'high' });
        }

        if (status.civilization.technologies.length < 3) {
            goals.push({ goal: '研究3项科技', current: status.civilization.technologies.length, target: 3, priority: 'high' });
        }

        // 中期目标
        if (status.civilization.era < 3) {
            goals.push({ goal: `进入${this.empire.eras[3].name}`, current: status.era.name, target: this.empire.eras[3].name, priority: 'medium' });
        }

        // 长期目标
        goals.push({ goal: '人口达到1000', current: status.civilization.resources.population, target: 1000, priority: 'low' });

        return goals;
    }
}

// 导出
module.exports = { CivilizationEmpire, AICivilizationStrategy };
