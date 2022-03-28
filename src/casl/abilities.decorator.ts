import { SetMetadata } from "@nestjs/common";
import { Action } from "src/users/user.model";
import { Subjects } from "./casl-ability.factory";

export interface AbilityRule {
    action: Action;
    subject: Subjects
}

export const CheckPermission = (...abilities: AbilityRule[]) => SetMetadata('abilities', abilities);