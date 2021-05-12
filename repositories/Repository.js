import TeamMemberRepository from '@/repositories/TeamMemberRepository'
import AuthRepository from '@/repositories/AuthRepository'
import UserRepository from '@/repositories/UserRepository'

export default (app) => ({
  teamMember: TeamMemberRepository(app),
  auth: AuthRepository(app),
  user: UserRepository(app),
})
