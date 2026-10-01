import { COLLECTIONS } from '../lib/pb';
import { countRecords, getRecords } from '../lib/api';
import { Tournament } from '../lib/types';

interface ServiceResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

interface DashboardStats {
  players: number;
  registrations: number;
  matches: number;
  scheduledMatches: number;
  completedMatches: number;
  tournaments: number;
}

interface DashboardData {
  stats: DashboardStats;
  currentTournament: Tournament | null;
}

/**
 * Geschäftslogik für Dashboard-Statistiken.
 */
export const DashboardService = {
  /**
   * Alle Dashboard-Statistiken laden.
   */
  async getDashboardData(signal?: AbortSignal): Promise<ServiceResult<DashboardData>> {
    try {
      const [
        playersCount,
        registrationsCount,
        matchesCount,
        completedCount,
        tournamentsCount,
        tournaments
      ] = await Promise.all([
        countRecords(COLLECTIONS.players),
        countRecords(COLLECTIONS.registrations),
        countRecords(COLLECTIONS.matches),
        countRecords(COLLECTIONS.matches, 'status = "completed"'),
        countRecords(COLLECTIONS.tournaments),
        getRecords(COLLECTIONS.tournaments, {
          sort: '-created',
          perPage: 1,
          signal
        })
      ]);

      const scheduledMatches = matchesCount - completedCount;
      const currentTournament = tournaments.length > 0 ? tournaments[0] : null;

      const stats: DashboardStats = {
        players: playersCount,
        registrations: registrationsCount,
        matches: matchesCount,
        scheduledMatches,
        completedMatches: completedCount,
        tournaments: tournamentsCount
      };

      return {
        success: true,
        data: {
          stats,
          currentTournament
        }
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Dashboard-Daten konnten nicht geladen werden'
      };
    }
  },

  /**
   * Spieler-Statistiken.
   */
  async getPlayerStats(): Promise<ServiceResult<{ total: number; bySkillLevel: Record<string, number> }>> {
    try {
      const total = await countRecords(COLLECTIONS.players);

      const players = await getRecords(COLLECTIONS.players, { perPage: 10000 });
      const bySkillLevel: Record<string, number> = {
        beginner: 0,
        intermediate: 0,
        advanced: 0,
        professional: 0
      };

      for (const player of players) {
        const skill = player.skill_level || 'unknown';
        if (skill in bySkillLevel) {
          bySkillLevel[skill]++;
        }
      }

      return {
        success: true,
        data: {
          total,
          bySkillLevel
        }
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Spieler-Statistiken konnten nicht geladen werden'
      };
    }
  },

  /**
   * Turnier-Statistiken.
   */
  async getTournamentStats(tournamentId: string): Promise<ServiceResult<any>> {
    try {
      const [
        registrationsCount,
        confirmedCount,
        waitlistCount,
        matchesCount,
        completedMatchesCount,
        roundsCount
      ] = await Promise.all([
        countRecords(COLLECTIONS.registrations, `tournament_id = "${tournamentId}"`),
        countRecords(COLLECTIONS.registrations, `tournament_id = "${tournamentId}" && status = "confirmed"`),
        countRecords(COLLECTIONS.registrations, `tournament_id = "${tournamentId}" && status = "waitlist"`),
        countRecords(COLLECTIONS.matches, `tournament_id = "${tournamentId}"`),
        countRecords(COLLECTIONS.matches, `tournament_id = "${tournamentId}" && status = "completed"`),
        countRecords(COLLECTIONS.rounds, `tournament_id = "${tournamentId}"`)
      ]);

      return {
        success: true,
        data: {
          registrations: registrationsCount,
          confirmed: confirmedCount,
          waitlist: waitlistCount,
          matches: matchesCount,
          completedMatches: completedMatchesCount,
          rounds: roundsCount
        }
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: 'Turnier-Statistiken konnten nicht geladen werden'
      };
    }
  }
};
