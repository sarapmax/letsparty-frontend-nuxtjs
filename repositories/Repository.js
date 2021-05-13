import AuthRepository from '@/repositories/AuthRepository'
import UserRepository from '@/repositories/UserRepository'
import PartyRepository from '@/repositories/PartyRepository'
import UserPartyRepository from '@/repositories/UserPartyRepository'

export default (app) => ({
  auth: AuthRepository(app),
  user: UserRepository(app),
  party: PartyRepository(app),
  userParty: UserPartyRepository(app),
})
