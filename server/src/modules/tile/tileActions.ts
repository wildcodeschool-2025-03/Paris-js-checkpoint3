import type { RequestHandler } from "express";

import tileRepository from "./tileRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const tiles = await tileRepository.readAll();
    res.json(tiles);
  } catch (error) {
    next(error);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const { coord_x, coord_y } = req.body;
    const tile = await tileRepository.readByCoordinates(coord_x, coord_y);

    if (tile) {
      res.sendStatus(422);
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  validate,
};
