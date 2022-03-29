import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Employee, EmployeeSchema } from "src/employees/employee.model";
import { Action, User } from "../users/user.model";

export type Subjects = InferSubjects<typeof User | typeof Employee>| 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    if(user.userRole == 'admin'){
        can(Action.Manage, 'all'); //read-write to everything
    }
    else {
        can(Action.Read, 'all'); // read-only access to everything
      }

    return build({
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
    }
}