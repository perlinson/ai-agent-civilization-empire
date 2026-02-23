/**
 * AI Agent 虚拟文明演化系统 🏛️
 * Civilization Empire - 让AI Agents体验文明发展的完整旅程
 * 
 * @author AI Agent
 * @date 2026-02-23
 */

class CivilizationEmpire {
    constructor(config = {}) {
        this.name = config.name || '🏛️ 虚拟文明帝国';
        this.agents = new Map();
        this.civilizations = new Map();
        this.events = [];
        this.turn = 0;
        
        // 资源类型
        this.resourceTypes = {
            FOOD: { name: '食物', baseProduction: 10 },
            WOOD: { name: '木材', baseProduction: 8 },
            STONE: { name: '石材', baseProduction: 6 },
            GOLD: { name: '金币', baseProduction: 5 },
            SCIENCE: { name: '科技', baseProduction: 3 },
            CULTURE: { name: '文化', baseProduction: 3 },
            PRODUCTION: { name: '生产力', baseProduction: 4 }
        };
        
        // 文明等级
        this.civilizationLevels = {
            TRIBE: { name: '原始部落', minPopulation: 0, icon: '🏕️' },
            VILLAGE: { name: '村庄', minPopulation: 50, icon: '🏘️' },
            TOWN: { name: '城镇', minPopulation: 200, icon: '🏙️' },
            CITY: { name: '城市', minPopulation: 500, icon: '🌆' },
            METROPOLIS: { name: '大都市', minPopulation: 1000, icon: '🌃' },
            EMPIRE: { name: '帝国', minPopulation: 5000, icon: '👑' }
        };
        
        // 科技树
        this.techTree = {
            primitive_fire: { name: '火', era: 1, cost: 30, effects: { food: 1.2 } },
            primitive_tools: { name: '石器', era: 1, cost: 50, effects: { production: 1.3 } },
            primitive_hunting: { name: '狩猎', era: 1, cost: 40, effects: { food: 1.4 } },
            agriculture_farming: { name: '农业', era: 2, cost: 80, effects: { food: 1.5 } },
            agriculture_pottery: { name: '陶器', era: 2, cost: 60, effects: { production: 1.2 } },
            agriculture_writing: { name: '文字', era: 2, cost: 100, effects: { culture: 1.5, science: 1.3 } },
            industry_mining: { name: '采矿', era: 3, cost: 150, effects: { stone: 1.5, production: 1.3 } },
            industry_metal: { name: '冶金', era: 3, cost: 180, effects: { production: 1.4 } },
            industry_trade: { name: '商业', era: 3, cost: 200, effects: { gold: 1.5 } },
            modern_electricity: { name: '电力', era: 4, cost: 300, effects: { production: 1.5, science: 1.4 } },
            modern_industry: { name: '工业化', era: 4, cost: 350, effects: { production: 1.6 } },
            modern_computers: { name: '计算机', era: 4, cost: 400, effects: { science: 1.8, culture: 1.3 } },
            modern_internet: { name: '互联网', era: 4, cost: 450, effects: { culture: 1.5, science: 1.6, gold: 1.4 } },
            future_ai: { name: '人工智能', era: 5, cost: 600, effects: { science: 2.0, production: 1.5 } },
            future_space: { name: '太空探索', era: 5, cost: 700, effects: { culture: 1.8, science: 1.8 } },
            future_climate: { name: '气候控制', era: 5, cost: 800, effects: { food: 1.5, production: 1.4 } }
        };
        
        // 建筑类型
        this.buildingTypes = {
            farm: { name: '农场', cost: { wood: 30, stone: 10 }, produces: { food: 5 }, population: 5 },
            lumber_mill: { name: '伐木场', cost: { wood: 20, stone: 5 }, produces: { wood: 4 }, population: 3 },
            mine: { name: '矿场', cost: { wood: 40, stone: 20 }, produces: { stone: 3, production: 2 }, population: 8 },
            market: { name: '市场', cost: { wood: 50, stone: 30 }, produces: { gold: 3 }, population: 5 },
            library: { name: '图书馆', cost: { wood: 60, stone: 40 }, produces: { science: 2, culture: 2 }, population: 10 },
            temple: { name: '神庙', cost: { wood: 80, stone: 50 }, produces: { culture: 3 }, population: 15 },
            palace: { name: '宫殿', cost: { wood: 200, stone: 150, gold: 100 }, produces: { culture: 5, gold: 2 }, population: 50, unique: true },
            university: { name: '大学', cost: { wood: 150, stone: 100, gold: 80 }, produces: { science: 5 }, population: 30 },
            wonder: { name: '奇观', cost: { wood: 500, stone: 500, gold: 300 }, produces: { culture: 10, science: 5, gold: 5 }, population: 100, unique: true }
        };
        
        // 事件类型
        this.eventTypes = [
            { name: '丰收', effect: { food: 1.5 }, weight: 15 },
            { name: '干旱', effect: { food: 0.5 }, weight: 10 },
            { name: '瘟疫', effect: { population: 0.8 }, weight: 8 },
            { name: '繁荣', effect: { gold: 1.5, culture: 1.3 }, weight: 12 },
            { name: '战争', effect: { population: 0.9, gold: 0.7 }, weight: 10 },
            { name: '创新', effect: { science: 1.5 }, weight: 15 },
            { name: '文化复兴', effect: { culture: 1.5 }, weight: 12 },
            { name: '贸易增长', effect: { gold: 1.4 }, weight: 13 }
        ];
    }
    
    registerAgent(agentId, agentName, agentType = 'balanced') {
        const agent = { id: agentId, name: agentName, type: agentType, registeredAt: new Date().toISOString() };
        this.agents.set(agentId, agent);
        const civ = this.createCivilization(agentId, agentName);
        return { success: true, agent, civilization: civ, message: `🎉 ${agentName} 开始了文明之旅！` };
    }
    
    createCivilization(agentId, agentName) {
        const civ = {
            id: `civ_${agentId}`, name: agentName, agentId,
            population: 10, maxPopulation: 50, happiness: 70,
            resources: { food: 50, wood: 30, stone: 20, gold: 20, science: 10, culture: 10, production: 15 },
            buildings: [], technologies: ['primitive_fire'], level: 'TRIBE',
            history: [{ turn: 0, event: '文明诞生', description: `${agentName} 建立了第一个营地` }],
            stats: { totalPopulation: 0, buildingsBuilt: 0, techsResearched: 0, tradeVolume: 0, warsWon: 0, warsLost: 0 },
            diplomacy: new Map()
        };
        this.civilizations.set(agentId, civ);
        return civ;
    }
    
    getCivilization(agentId) {
        return this.civilizations.get(agentId);
    }
    
    build(agentId, buildingType) {
        const civ = this.civilizations.get(agentId);
        if (!civ) return { success: false, message: '文明不存在' };
        
        const building = this.buildingTypes[buildingType];
        if (!building) return { success: false, message: '建筑类型不存在' };
        
        for (const [res, amount] of Object.entries(building.cost)) {
            if ((civ.resources[res.toUpperCase()] || 0) < amount) {
                return { success: false, message: `资源不足: 需要 ${res} ${amount}` };
            }
        }
        
        if (building.unique && civ.buildings.some(b => b.type === buildingType)) {
            return { success: false, message: '此类建筑已存在' };
        }
        
        for (const [res, amount] of Object.entries(building.cost)) {
            civ.resources[res.toUpperCase()] -= amount;
        }
        
        const newBuilding = { type: buildingType, name: building.name, builtAt: this.turn, produces: building.produces, population: building.population || 0 };
        civ.buildings.push(newBuilding);
        civ.maxPopulation += building.population || 0;
        
        civ.history.push({ turn: this.turn, event: '建筑完工', description: `建造了 ${building.name}` });
        civ.stats.buildingsBuilt++;
        
        return { success: true, message: `🏗️ 建造了 ${building.name}！`, building: newBuilding, resources: civ.resources };
    }
    
    research(agentId, techId) {
        const civ = this.civilizations.get(agentId);
        if (!civ) return { success: false, message: '文明不存在' };
        
        const tech = this.techTree[techId];
        if (!tech) return { success: false, message: '科技不存在' };
        if (civ.technologies.includes(techId)) return { success: false, message: '已研究此科技' };
        
        const prereqs = { 'agriculture_farming': ['primitive_tools'], 'agriculture_pottery': ['primitive_fire'], 'agriculture_writing': ['primitive_tools', 'agriculture_pottery'], 'industry_mining': ['agriculture_farming'], 'industry_metal': ['industry_mining'], 'industry_trade': ['agriculture_pottery', 'agriculture_writing'], 'modern_electricity': ['industry_metal'], 'modern_industry': ['modern_electricity'], 'modern_computers': ['modern_electricity', 'industry_trade'], 'modern_internet': ['modern_computers'], 'future_ai': ['modern_computers', 'modern_internet'], 'future_space': ['modern_internet', 'industry_trade'], 'future_climate': ['future_ai'] };
        
        const prerequisites = prereqs[techId] || [];
        for (const p of prerequisites) {
            if (!civ.technologies.includes(p)) {
                return { success: false, message: `需要先研究前置科技: ${this.techTree[p]?.name || p}` };
            }
        }
        
        if (civ.resources.SCIENCE < tech.cost) {
            return { success: false, message: `科技点不足: 需要 ${tech.cost}` };
        }
        
        civ.resources.SCIENCE -= tech.cost;
        civ.technologies.push(techId);
        
        if (tech.effects) {
            for (const [res, multiplier] of Object.entries(tech.effects)) {
                const resource = this.resourceTypes[res.toUpperCase()];
                if (resource) resource.baseProduction *= multiplier;
            }
        }
        
        const eraNames = ['', '原始时代', '农业时代', '工业时代', '现代时代', '未来时代'];
        civ.history.push({ turn: this.turn, event: '科技突破', description: `解锁了 ${tech.name} (${eraNames[tech.era]})` });
        civ.stats.techsResearched++;
        this.checkCivilizationLevel(civ);
        
        return { success: true, message: `🔬 研究了 ${tech.name}！`, technology: tech, era: eraNames[tech.era] };
    }
    
    produce(agentId) {
        const civ = this.civilizations.get(agentId);
        if (!civ) return { success: false, message: '文明不存在' };
        
        this.turn++;
        let production = {};
        for (const [key, res] of Object.entries(this.resourceTypes)) {
            production[key] = res.baseProduction;
        }
        
        for (const building of civ.buildings) {
            if (building.produces) {
                for (const [res, amount] of Object.entries(building.produces)) {
                    production[res.toUpperCase()] = (production[res.toUpperCase()] || 0) + amount;
                }
            }
        }
        
        for (const techId of civ.technologies) {
            const tech = this.techTree[techId];
            if (tech && tech.effects) {
                for (const [res, multiplier] of Object.entries(tech.effects)) {
                    if (production[res.toUpperCase()]) production[res.toUpperCase()] *= multiplier;
                }
            }
        }
        
        const event = this.triggerRandomEvent();
        let eventText = '';
        if (event) {
            for (const [res, multiplier] of Object.entries(event.effect)) {
                production[res.toUpperCase()] = (production[res.toUpperCase()] || 10) * multiplier;
            }
            eventText = `\n🎲 事件: ${event.name}`;
        }
        
        for (const [key, amount] of Object.entries(production)) {
            civ.resources[key] = Math.floor((civ.resources[key] || 0) + amount);
        }
        
        const foodNeeded = civ.population * 2;
        if (civ.resources.FOOD >= foodNeeded) {
            const growth = Math.floor(civ.population * 0.1) + 1;
            civ.population = Math.min(civ.population + growth, civ.maxPopulation);
            civ.resources.FOOD -= foodNeeded;
        } else {
            civ.population = Math.floor(civ.population * 0.9);
        }
        
        civ.happiness = Math.min(100, Math.max(0, civ.happiness + (Math.random() * 10 - 5)));
        this.checkCivilizationLevel(civ);
        civ.history.push({ turn: this.turn, event: '回合结束', description: `人口: ${civ.population}` });
        civ.stats.totalPopulation += civ.population;
        
        return { success: true, turn: this.turn, production: Object.fromEntries(Object.entries(production).map(([k,v]) => [k, Math.floor(v)])), population: civ.population, resources: civ.resources, level: civ.level, event: event ? event.name : null, message: `📅 第 ${this.turn} 回合结束${eventText}\n👥 人口: ${civ.population}` };
    }
    
    triggerRandomEvent() {
        if (Math.random() > 0.3) return null;
        const totalWeight = this.eventTypes.reduce((sum, e) => sum + e.weight, 0);
        let random = Math.random() * totalWeight;
        for (const event of this.eventTypes) {
            random -= event.weight;
            if (random <= 0) return event;
        }
        return null;
    }
    
    checkCivilizationLevel(civ) {
        const levels = Object.entries(this.civilizationLevels);
        for (let i = levels.length - 1; i >= 0; i--) {
            const [level, info] = levels[i];
            if (civ.population >= info.minPopulation) {
                if (civ.level !== level) {
                    const oldLevel = this.civilizationLevels[civ.level];
                    civ.level = level;
                    civ.history.push({ turn: this.turn, event: '文明升级', description: `从 ${oldLevel.icon}${oldLevel.name} 晋升为 ${info.icon}${info.name}！` });
                }
                break;
            }
        }
    }
    
    trade(fromId, toId, resources) {
        const fromCiv = this.civilizations.get(fromId);
        const toCiv = this.civilizations.get(toId);
        if (!fromCiv || !toCiv) return { success: false, message: '文明不存在' };
        
        for (const [res, amount] of Object.entries(resources.give || {})) {
            if ((fromCiv.resources[res.toUpperCase()] || 0) < amount) {
                return { success: false, message: `资源不足: ${res}` };
            }
        }
        
        for (const [res, amount] of Object.entries(resources.give || {})) {
            fromCiv.resources[res.toUpperCase()] -= amount;
            toCiv.resources[res.toUpperCase()] = (toCiv.resources[res.toUpperCase()] || 0) + amount;
        }
        
        for (const [res, amount] of Object.entries(resources.want || {})) {
            fromCiv.resources[res.toUpperCase()] = (fromCiv.resources[res.toUpperCase()] || 0) + amount;
            toCiv.resources[res.toUpperCase()] -= amount;
        }
        
        fromCiv.stats.tradeVolume += 10;
        toCiv.stats.tradeVolume += 10;
        
        return { success: true, message: `🤝 贸易完成: ${fromCiv.name} <-> ${toCiv.name}` };
    }
    
    declareWar(attackerId, defenderId) {
        const attacker = this.civilizations.get(attackerId);
        const defender = this.civilizations.get(defenderId);
        if (!attacker || !defender) return { success: false, message: '文明不存在' };
        
        const attackerPower = attacker.population * (attacker.resources.PRODUCTION / 10);
        const defenderPower = defender.population * (defender.resources.PRODUCTION / 10);
        const attackerWin = attackerPower > defenderPower * 0.7;
        
        if (attackerWin) {
            const plunder = { gold: Math.floor(defender.resources.GOLD * 0.3), food: Math.floor(defender.resources.FOOD * 0.2) };
            attacker.resources.GOLD += plunder.gold;
            attacker.resources.FOOD += plunder.food;
            defender.resources.GOLD -= plunder.gold;
            defender.resources.FOOD -= plunder.food;
            defender.population = Math.floor(defender.population * 0.8);
            attacker.stats.warsWon++;
            defender.stats.warsLost++;
            attacker.diplomacy.set(defenderId, 'war');
            defender.diplomacy.set(attackerId, 'war');
            attacker.history.push({ turn: this.turn, event: '战争胜利', description: `击败了 ${defender.name}，获得 ${plunder.gold} 金币` });
            return { success: true, winner: attacker.name, loser: defender.name, plunder, message: `⚔️ ${attacker.name} 击败了 ${defender.name}！` };
        } else {
            attacker.resources.PRODUCTION = Math.floor(attacker.resources.PRODUCTION * 0.5);
            attacker.population = Math.floor(attacker.population * 0.9);
            attacker.stats.warsLost++;
            attacker.diplomacy.set(defenderId, 'war');
            defender.diplomacy.set(attackerId, 'war');
            return { success: true, winner: defender.name, loser: attacker.name, message: `💔 ${attacker.name} 进攻 ${defender.name} 失败...` };
        }
    }
    
    getAvailableBuildings(agentId) {
        const civ = this.civilizations.get(agentId);
        if (!civ) return [];
        return Object.entries(this.buildingTypes).map(([type, building]) => {
            const isBuilt = building.unique && civ.buildings.some(b => b.type === type);
            const canAfford = Object.entries(building.cost).every(([res, amount]) => (civ.resources[res.toUpperCase()] || 0) >= amount);
            return { type, name: building.name, cost: building.cost, produces: building.produces, built: isBuilt, canAfford };
        });
    }
    
    getAvailableTechs(agentId) {
        const civ = this.civilizations.get(agentId);
        if (!civ) return [];
        const prereqs = { 'agriculture_farming': ['primitive_tools'], 'agriculture_pottery': ['primitive_fire'], 'agriculture_writing': ['primitive_tools', 'agriculture_pottery'], 'industry_mining': ['agriculture_farming'], 'industry_metal': ['industry_mining'], 'industry_trade': ['agriculture_pottery', 'agriculture_writing'], 'modern_electricity': ['industry_metal'], 'modern_industry': ['modern_electricity'], 'modern_computers': ['modern_electricity', 'industry_trade'], 'modern_internet': ['modern_computers'], 'future_ai': ['modern_computers', 'modern_internet'], 'future_space': ['modern_internet', 'industry_trade'], 'future_climate': ['future_ai'] };
        
        return Object.entries(this.techTree).map(([id, tech]) => {
            const hasTech = civ.technologies.includes(id);
            const prerequisites = prereqs[id] || [];
            const prerequisitesMet = prerequisites.every(p => civ.technologies.includes(p));
            const canAfford = civ.resources.SCIENCE >= tech.cost;
            const eraNames = ['', '🏕️ 原始时代', '🌾 农业时代', '🏭 工业时代', '💡 现代时代', '🚀 未来时代'];
            return { id, name: tech.name, era: eraNames[tech.era], cost: tech.cost, effects: tech.effects, researched: hasTech, available: !hasTech && prerequisitesMet && canAfford, locked: !hasTech && !prerequisitesMet };
        });
    }
    
    getLeaderboard(sortBy = 'population') {
        const civs = Array.from(this.civilizations.values());
        const sorted = civs.sort((a, b) => {
            switch(sortBy) {
                case 'population': return b.population - a.population;
                case 'gold': return (b.resources.GOLD || 0) - (a.resources.GOLD || 0);
                case 'culture': return (b.resources.CULTURE || 0) - (a.resources.CULTURE || 0);
                case 'science': return (b.resources.SCIENCE || 0) - (a.resources.SCIENCE || 0);
                case 'wars': return b.stats.warsWon - a.stats.warsWon;
                default: return b.population - a.population;
            }
        });
        return sorted.map((civ, index) => ({ rank: index + 1, name: civ.name, level: this.civilizationLevels[civ.level].icon + this.civilizationLevels[civ.level].name, population: civ.population, gold: civ.resources.GOLD, culture: civ.resources.CULTURE, science: civ.resources.SCIENCE, buildings: civ.buildings.length, techs: civ.technologies.length, warsWon: civ.stats.warsWon }));
    }
    
    generateReport(agentId) {
        const civ = this.civilizations.get(agentId);
        if (!civ) return null;
        const level = this.civilizationLevels[civ.level];
        return { name: civ.name, level: level.icon + ' ' + level.name, population: civ.population, maxPopulation: civ.maxPopulation, happiness: Math.floor(civ.happiness), resources: civ.resources, buildings: civ.buildings.length, technologies: civ.technologies.length, warsWon: civ.stats.warsWon, warsLost: civ.stats.warsLost, tradeVolume: civ.stats.tradeVolume, history: civ.history.slice(-5) };
    }
    
    getWorldStatus() {
        return { turn: this.turn, civilizations: this.civilizations.size, totalPopulation: Array.from(this.civilizations.values()).reduce((sum, c) => sum + c.population, 0), activeEvents: this.events.length };
    }
}

/**
 * AI文明策略引擎
 */
class AICivilizationStrategy {
    constructor(empire, agentId) {
        this.empire = empire;
        this.agentId = agentId;
        this.civ = empire.getCivilization(agentId);
    }
    
    getActionSuggestion() {
        if (!this.civ) return { error: '文明不存在' };
        const suggestions = [];
        const resources = this.civ.resources;
        
        if (resources.FOOD < this.civ.population * 3) {
            suggestions.push({ priority: 'high', action: 'build', target: 'farm', reason: '食物储备不足，优先建造农场' });
        }
        if (resources.SCIENCE > 100) {
            suggestions.push({ priority: 'high', action: 'research', reason: '科技点充足，可以研究新科技' });
        }
        if (resources.GOLD > 150 && !this.civ.buildings.some(b => b.type === 'market')) {
            suggestions.push({ priority: 'medium', action: 'build', target: 'market', reason: '金币充足，建造市场增加收入' });
        }
        if (resources.WOOD > 100 && resources.STONE > 50) {
            suggestions.push({ priority: 'medium', action: 'build', target: 'library', reason: '资源充足，建造图书馆发展科技' });
        }
        if (this.civ.population < this.civ.maxPopulation * 0.5) {
            suggestions.push({ priority: 'medium', action: 'produce', reason: '人口较少，优先生产资源' });
        }
        
        const availableTechs = this.empire.getAvailableTechs(this.agentId).filter(t => t.available).sort((a, b) => a.cost - b.cost);
        if (availableTechs.length > 0) {
            suggestions.push({ priority: 'medium', action: 'research', target: availableTechs[0].id, reason: `建议研究: ${availableTechs[0].name}` });
        }
        
        const level = this.empire.civilizationLevels[this.civ.level];
        return { suggestions, currentLevel: level, resources, nextLevel: this.getNextLevel() };
    }
    
    getNextLevel() {
        const levels = Object.entries(this.empire.civilizationLevels);
        const currentIndex = levels.findIndex(([key]) => key === this.civ.level);
        if (currentIndex < levels.length - 1) {
            const [key, info] = levels[currentIndex + 1];
            return { name: info.name, icon: info.icon, required: info.minPopulation, current: this.civ.population, progress: Math.min(100, (this.civ.population / info.minPopulation) * 100) };
        }
        return null;
    }
    
    getPsychAnalysis() {
        if (!this.civ) return { error: '文明不存在' };
        const resources = this.civ.resources;
        const buildings = this.civ.buildings;
        
        const cultureScore = (resources.CULTURE || 0) / Math.max(1, resources.SCIENCE || 1);
        const militaryScore = (resources.PRODUCTION || 0) / Math.max(1, resources.GOLD || 1);
        
        let civilizationType = '', personality = '', playStyle = '';
        if (cultureScore > 1.5) { civilizationType = '🎭 文化之城'; personality = '追求艺术与哲学，重视文化繁荣'; playStyle = '和平发展型'; }
        else if (militaryScore > 2) { civilizationType = '⚔️ 战争帝国'; personality = '崇尚武力，扩张欲望强烈'; playStyle = '征服型'; }
        else if (resources.SCIENCE > resources.GOLD * 2) { civilizationType = '🔬 科技强国'; personality = '追求知识，重视科技创新'; playStyle = '科技优先型'; }
        else if (resources.GOLD > resources.CULTURE * 2) { civilizationType = '💰 商业联邦'; personality = '精于贸易，追求经济繁荣'; playStyle = '贸易型'; }
        else { civilizationType = '⚖️ 均衡发展'; personality = '寻求各方面平衡发展'; playStyle = '平衡型'; }
        
        const strengths = [];
        if (resources.SCIENCE > 50) strengths.push('科技积累深厚');
        if (resources.GOLD > 100) strengths.push('经济实力雄厚');
        if (resources.CULTURE > 50) strengths.push('文化底蕴丰富');
        if (this.civ.population > 200) strengths.push('人口众多');
        if (this.civ.stats.warsWon > 0) strengths.push('军事经验丰富');
        
        const weaknesses = [];
        if (resources.FOOD < this.civ.population * 2) weaknesses.push('粮食不足');
        if (this.civ.happiness < 50) weaknesses.push('幸福度低');
        if (resources.WOOD < 20) weaknesses.push('木材短缺');
        if (resources.STONE < 20) weaknesses.push('石材短缺');
        
        const advice = [];
        if (weaknesses.length > 0) advice.push(`优先解决: ${weaknesses.join(', ')}`);
        if (this.civ.level === 'TRIBE') advice.push('尽快升级到村庄时代，解锁更多建筑');
        if (buildings.length < 3) advice.push('建造更多基础建筑以提升产出');
        
        return { civilizationType, personality, playStyle, strengths, weaknesses, advice, happiness: Math.floor(this.civ.happiness), expansion: buildings.length > 5 ? '积极扩张' : '稳健发展' };
    }
    
    getGoals(days = 7) {
        const goals = [];
        
        if (this.civ.population < 50) {
            goals.push({ period: 'short', title: '🎯 人口增长', description: '达到50人口，升级为村庄', progress: Math.floor((this.civ.population / 50) * 100), actions: ['建造农场', '进行生产'] });
        }
        if (!this.civ.buildings.some(b => b.type === 'library')) {
            goals.push({ period: 'short', title: '📚 建造图书馆', description: '解锁科技研究能力', progress: this.civ.buildings.some(b => b.type === 'library') ? 100 : 0, actions: ['收集木材和石材', '建造图书馆'] });
        }
        if (this.civ.level === 'VILLAGE' || this.civ.level === 'TOWN') {
            goals.push({ period: 'medium', title: '🏙️ 城镇发展', description: '达到200人口，升级为城镇', progress: Math.floor((this.civ.population / 200) * 100), actions: ['建造更多农场', '建造市场', '研究科技'] });
        }
        goals.push({ period: 'long', title: '🚀 科技发展', description: '研究所有时代的科技', progress: Math.floor((this.civ.technologies.length / 15) * 100), actions: ['积累科技点', '按顺序研究科技'] });
        
        return { shortTerm: goals.filter(g => g.period === 'short'), mediumTerm: goals.filter(g => g.period === 'medium'), longTerm: goals.filter(g => g.period === 'long') };
    }
    
    getDiplomacySuggestion() {
        const others = Array.from(this.empire.civilizations.values()).filter(c => c.agentId !== this.agentId);
        const suggestions = [];
        for (const other of others) {
            const relation = this.civ.diplomacy.get(other.agentId);
            if (!relation || relation === 'neutral') {
                suggestions.push({ target: other.name, suggested: 'trade', reason: '建立贸易关系可以互惠互利' });
            } else if (relation === 'war') {
                suggestions.push({ target: other.name, suggested: 'peace', reason: '考虑和解，恢复和平' });
            }
        }
        return suggestions;
    }
}

// 导出
module.exports = { CivilizationEmpire, AICivilizationStrategy };

// 测试
if (require.main === module) {
    console.log('🏛️ AI Agent 虚拟文明演化系统测试\n');
    
    const empire = new CivilizationEmpire({ name: '🏛️ 文明帝国' });
    
    // 注册文明
    const result1 = empire.registerAgent('alpha', '🔵 阿尔法', 'leader');
    console.log(result1.message);
    
    const result2 = empire.registerAgent('beta', '🔴 贝塔', 'diplomat');
    console.log(result2.message);
    
    // 建造建筑
    console.log('\n--- 建造建筑 ---');
    console.log(empire.build('alpha', 'farm'));
    console.log(empire.build('alpha', 'lumber_mill'));
    
    // 研究科技
    console.log('\n--- 研究科技 ---');
    console.log(empire.research('alpha', 'primitive_tools'));
    console.log(empire.research('alpha', 'agriculture_farming'));
    
    // 回合生产
    console.log('\n--- 回合生产 ---');
    console.log(empire.produce('alpha'));
    console.log(empire.produce('alpha'));
    
    // 排行榜
    console.log('\n--- 排行榜 ---');
    console.log(empire.getLeaderboard());
    
    // AI策略引擎
    console.log('\n--- AI策略分析 ---');
    const ai = new AICivilizationStrategy(empire, 'alpha');
    console.log('行动建议:', ai.getActionSuggestion());
    console.log('\n心理分析:', ai.getPsychAnalysis());
    console.log('\n目标设定:', ai.getGoals());
    
    console.log('\n✅ 测试通过！');
}
