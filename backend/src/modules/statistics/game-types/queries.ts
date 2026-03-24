export const GAME_TYPES_QUERIES = {
  getGameTypeStats: `
    SELECT g.type, COUNT(DISTINCT g.id) as count
    FROM games g
    INNER JOIN game_players gp ON gp.game_id = g.id
    GROUP BY g.type
    ORDER BY count DESC
  `,
}
