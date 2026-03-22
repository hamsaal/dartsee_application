export const PLAYER_ANALYSIS_QUERIES = {
  getPlayerThrows: `
    SELECT t.id, t.score, t.modifier, t.x, t.y
    FROM throws t
    WHERE t.game_id = $1 AND t.player_id = $2
    ORDER BY t.id ASC
  `,
  getPlayer: `
    SELECT id, name
    FROM players
    WHERE id = $1
  `,
  getGame: `
    SELECT id, type
    FROM games
    WHERE id = $1
  `,
}
