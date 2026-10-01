import { pb } from './pb';

// Tournament management
export async function getTournament(id: string) {
  return pb.collection('tournaments').getOne(id);
}

export async function getTournaments() {
  return pb.collection('tournaments').getFullList({
    sort: '-created'
  });
}

export async function createTournament(data: any) {
  return pb.collection('tournaments').create(data);
}

export async function updateTournament(id: string, data: any) {
  return pb.collection('tournaments').update(id, data);
}

// Location management
export async function getLocationsByTournament(tournamentId: string) {
  return pb.collection('locations').getFullList({
    filter: `tournament_id = "${tournamentId}"`
  });
}

export async function createLocation(data: any) {
  return pb.collection('locations').create(data);
}

// Players management
export async function getPlayers() {
  return pb.collection('players').getFullList({
    sort: 'lastname,firstname'
  });
}

export async function searchPlayers(query: string) {
  return pb.collection('players').getFullList({
    filter: `firstname ~ "${query}" || lastname ~ "${query}"`,
    sort: 'lastname,firstname'
  });
}

export async function createPlayer(data: any) {
  return pb.collection('players').create(data);
}

export async function updatePlayer(id: string, data: any) {
  return pb.collection('players').update(id, data);
}

export async function deletePlayer(id: string) {
  return pb.collection('players').delete(id);
}

// Registration management
export async function registerPlayer(tournamentId: string, playerId: string) {
  return pb.collection('registrations').create({
    tournament_id: tournamentId,
    player_id: playerId,
    confirmed: false,
    checked_in: false
  });
}

export async function getRegistrationsByTournament(tournamentId: string) {
  return pb.collection('registrations').getFullList({
    filter: `tournament_id = "${tournamentId}"`
  });
}

// Matches management
export async function getMatchesByRound(roundId: string) {
  return pb.collection('matches').getFullList({
    filter: `round_id = "${roundId}"`,
    sort: 'start_time'
  });
}

export async function getMatchesByTournament(tournamentId: string) {
  return pb.collection('matches').getFullList({
    filter: `tournament_id = "${tournamentId}"`,
    sort: 'start_time'
  });
}

export async function createMatch(data: any) {
  return pb.collection('matches').create(data);
}

export async function updateMatch(id: string, data: any) {
  return pb.collection('matches').update(id, data);
}

export async function deleteMatch(id: string) {
  return pb.collection('matches').delete(id);
}

// Match Players
export async function addPlayerToMatch(matchId: string, playerId: string, side: 'A' | 'B') {
  return pb.collection('match_players').create({
    match_id: matchId,
    player_id: playerId,
    side
  });
}

export async function getMatchPlayers(matchId: string) {
  return pb.collection('match_players').getFullList({
    filter: `match_id = "${matchId}"`
  });
}

export async function removePlayerFromMatch(matchPlayerIdId: string) {
  return pb.collection('match_players').delete(matchPlayerIdId);
}

// Results management
export async function setMatchResult(matchId: string, winnerPlayerId: string, score: string) {
  try {
    const existing = await pb.collection('results').getFirstListItem(`match_id = "${matchId}"`);
    return pb.collection('results').update(existing.id, {
      match_id: matchId,
      winner_player_id: winnerPlayerId,
      score
    });
  } catch {
    return pb.collection('results').create({
      match_id: matchId,
      winner_player_id: winnerPlayerId,
      score
    });
  }
}

export async function getResult(matchId: string) {
  try {
    return pb.collection('results').getFirstListItem(`match_id = "${matchId}"`);
  } catch {
    return null;
  }
}

// Rounds management
export async function getRoundsByTournament(tournamentId: string) {
  return pb.collection('rounds').getFullList({
    filter: `tournament_id = "${tournamentId}"`,
    sort: 'sort_order,round_number'
  });
}

export async function createRound(data: any) {
  return pb.collection('rounds').create(data);
}

// Courts management
export async function getCourtsByTournament(tournamentId: string) {
  return pb.collection('courts').getFullList({
    filter: `tournament_id = "${tournamentId}"`,
    sort: 'number'
  });
}

export async function createCourt(data: any) {
  return pb.collection('courts').create(data);
}

// Info Sections
export async function getInfoSectionsByTournament(tournamentId: string) {
  return pb.collection('info_sections').getFullList({
    filter: `tournament_id = "${tournamentId}"`,
    sort: 'sort_order'
  });
}

export async function createInfoSection(data: any) {
  return pb.collection('info_sections').create(data);
}

export async function updateInfoSection(id: string, data: any) {
  return pb.collection('info_sections').update(id, data);
}

// Contacts
export async function getContactsByTournament(tournamentId: string) {
  return pb.collection('contacts').getFullList({
    filter: `tournament_id = "${tournamentId}"`
  });
}

export async function createContact(data: any) {
  return pb.collection('contacts').create(data);
}

// AI Schedule Runs
export async function saveScheduleRun(data: any) {
  return pb.collection('ai_schedule_runs').create(data);
}

export async function getScheduleRuns(tournamentId: string) {
  return pb.collection('ai_schedule_runs').getFullList({
    filter: `tournament_id = "${tournamentId}"`,
    sort: '-created'
  });
}
