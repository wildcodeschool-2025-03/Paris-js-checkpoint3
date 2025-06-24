import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Boat = {
  id: number;
  name: string;
  coord_x: number;
  coord_y: number;
};

type Where = {
  name?: string;
};

class BoatRepository {
  async readAll(where?: Where) {
    // Execute the SQL SELECT query to retrieve all boats from the "boat" table
    const [rows] = await databaseClient.query<Rows>(
      `select boat.*, tile.has_treasure, tile.type from boat JOIN tile ON boat.coord_x = tile.coord_x AND boat.coord_y = tile.coord_y ${where?.name ? "WHERE name = ?" : ""} order by coord_y, coord_x`,
      [where?.name],
    );

    // Return the array of tiles
    return rows as Boat[];
  }

  async update(boatToUpdate: Partial<Boat>) {
    const [result] = await databaseClient.query<Result>(
      "UPDATE boat SET coord_x = ?, coord_y = ? WHERE id = ?",
      [boatToUpdate.coord_x, boatToUpdate.coord_y, boatToUpdate.id],
    );

    return result.affectedRows;
  }
}

export default new BoatRepository();
