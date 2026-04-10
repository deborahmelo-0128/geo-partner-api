import { pool } from '../infra/db';

export async function createPartner(data: any) {
  const query = `
    INSERT INTO partners
    (id, trading_name, owner_name, document, coverage_area, address)
    VALUES ($1, $2, $3, $4,
      ST_SetSRID(ST_GeomFromGeoJSON($5), 4326),
      ST_SetSRID(ST_GeomFromGeoJSON($6), 4326)
    )
  `;

  await pool.query(query, [
    data.id,
    data.tradingName,
    data.ownerName,
    data.document,
    JSON.stringify(data.coverageArea),
    JSON.stringify(data.address),
  ]);
}