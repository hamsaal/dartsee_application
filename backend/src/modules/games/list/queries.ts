export const LIST_QUERIES = {
  getAllGames: `
    SELECT id, type 
    FROM games 
    ORDER BY id ASC
    LIMIT $1 OFFSET $2
  `,
  countGames: `
    SELECT COUNT(*) as count 
    FROM games
  `,
}
