import 'file?name=solar-charms/archery.json!assets/solar-charms/archery.json';
import 'file?name=solar-charms/athletics.json!assets/solar-charms/athletics.json';
import 'file?name=solar-charms/awareness.json!assets/solar-charms/awareness.json';
import 'file?name=solar-charms/brawl.json!assets/solar-charms/brawl.json';
import 'file?name=solar-charms/bureaucracy.json!assets/solar-charms/bureaucracy.json';
import 'file?name=solar-charms/craft.json!assets/solar-charms/craft.json';
import 'file?name=solar-charms/dodge.json!assets/solar-charms/dodge.json';
import 'file?name=solar-charms/integrity.json!assets/solar-charms/integrity.json';
import 'file?name=solar-charms/investigation.json!assets/solar-charms/investigation.json';
import 'file?name=solar-charms/larceny.json!assets/solar-charms/larceny.json';
import 'file?name=solar-charms/linguistics.json!assets/solar-charms/linguistics.json';
import 'file?name=solar-charms/lore.json!assets/solar-charms/lore.json';
import 'file?name=solar-charms/medicine.json!assets/solar-charms/medicine.json';
import 'file?name=solar-charms/melee.json!assets/solar-charms/melee.json';
import 'file?name=solar-charms/occult.json!assets/solar-charms/occult.json';
import 'file?name=solar-charms/performance.json!assets/solar-charms/performance.json';
import 'file?name=solar-charms/presence.json!assets/solar-charms/presence.json';
import 'file?name=solar-charms/resistance.json!assets/solar-charms/resistance.json';
import 'file?name=solar-charms/ride.json!assets/solar-charms/ride.json';
import 'file?name=solar-charms/sail.json!assets/solar-charms/sail.json';
import 'file?name=solar-charms/socialize.json!assets/solar-charms/socialize.json';
import 'file?name=solar-charms/stealth.json!assets/solar-charms/stealth.json';
import 'file?name=solar-charms/survival.json!assets/solar-charms/survival.json';
import 'file?name=solar-charms/thrown.json!assets/solar-charms/thrown.json';
import 'file?name=solar-charms/war.json!assets/solar-charms/war.json';

export const solarCharmPath = 'solar-charms';

export function solarCharmResourceId(ability) {
    return ability.name.toLowerCase();
}