import { FormPayload } from "./form";

export type SkillType = {
  name: string;
  level: LevelEnum;
};

export type SkillsPayload = FormPayload;

export enum LevelEnum {
  EXPERT = "expert",
  ADVANCED = "advanced",
  INTERMEDIATE = "intermediate",
  BEGINNER = "beginner",
  NOVICE = "novice",
}

export enum LevelInNumberEnum {
  EXPERT = 5,
  ADVANCED = 4,
  INTERMEDIATE = 3,
  BEGINNER = 2,
  NOVICE = 1,
}
