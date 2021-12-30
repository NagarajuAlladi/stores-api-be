import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/interface/user.interface';
import { Cat } from 'src/cats/interface/cats.interface';
import { Human } from 'src/humans/interface/room.interface';
import { Action } from './action.enum';

type Subjects = InferSubjects<typeof Cat | typeof Human> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.isAdmin) {
      // can(Action.Get, 'all');
      // can(Action.Create, 'all');
      // can(Action.Delete, 'all');
      can(Action.Manage, 'all');
      // can(Action.Get, Cat);
    } else {
      can(Action.Get, 'all');
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
