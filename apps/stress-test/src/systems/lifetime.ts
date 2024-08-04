import { component_get } from "@playground/ecs/component";
import { entity_delete } from "@playground/ecs/entity";
import { query } from "@playground/ecs/query";
import { System } from "@playground/ecs/system";
import { LIFETIME } from "../components";

export const LIFETIME_DESTROYER: System = {
    interval: 0,
    tick(world, _, now) {
        const entities = query(world, 1 <<LIFETIME);

        for (const entity of entities) {
            const lifetime = component_get(world, entity, LIFETIME);
            
            if (lifetime <= now) {
                entity_delete(world, entity)
            }
        }
    }
}