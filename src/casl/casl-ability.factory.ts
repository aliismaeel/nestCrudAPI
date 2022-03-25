import { Ability, AbilityBuilder, AbilityClass, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Employee } from "src/employees/employee.model";
import { Action, User } from "src/users/user.model";

type Subjects = InferSubjects<User | Employee>| 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    if(user.userRole == 'admin'){
        can(Action.Manage, 'all');
    }
    else {
        can(Action.Read, 'all'); // read-only access to everything
      }
    

    can(Action.Update, User, { authorId: user.id });
    cannot(Action.Delete, Article, { isPublished: true });

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
    }
}
