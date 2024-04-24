import { GlowFilter } from "@pixi/filter-glow";

export const glowFilter = new GlowFilter({
  innerStrength: 0,
  outerStrength: 0,
  quality: 0.1,
  alpha: 0.6,
  color: "#c061cb",
});
