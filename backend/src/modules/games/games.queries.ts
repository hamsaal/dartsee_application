export const GAMES_QUERIES = {
  getAllGames: `
    SELECT id, type 
    FROM games 
    ORDER BY id DESC 
    LIMIT $1 OFFSET $2
  `,
  countGames: `
    SELECT COUNT(*) as count 
    FROM games
  `,
  getGameById: `
    SELECT id, type 
    FROM games 
    WHERE id = $1
  `,
  getPlayersByGameId: `
    SELECT
      p.id,
      p.name,
      t.score,
      t.modifier
    FROM game_players gp
    JOIN players p ON p.id = gp.player_id
    LEFT JOIN throws t ON t.player_id = p.id AND t.game_id = $1
    WHERE gp.game_id = $1
    ORDER BY p.id, t.id ASC
  `,
}
