import TeamMemberRepository from '@/repositories/TeamMemberRepository'
import AuthRepository from '@/repositories/AuthRepository'

export default (app) => ({
  teamMember: TeamMemberRepository(app),
  auth: AuthRepository(app),
})
