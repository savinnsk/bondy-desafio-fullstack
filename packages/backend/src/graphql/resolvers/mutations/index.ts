import { GraphQLResolveInfo } from 'graphql'
import { mutationTest } from './mutationTest'
import { UserUseCases } from 'src/usecase/user'

export default {
  mutationTest: (
    parent: any,
    args: any,
    context: any,
    info: GraphQLResolveInfo
  ) => mutationTest(parent, args, context, info),
  login: UserUseCases.login,
}
