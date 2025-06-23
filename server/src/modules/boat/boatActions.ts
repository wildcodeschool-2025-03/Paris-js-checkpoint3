import type { RequestHandler } from "express";

import { parse } from "dotenv";
import boatRepository from "./boatRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all boats from the database
    const boats = await boatRepository.readAll();

    // Respond with the boats in JSON format
    res.json(boats);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const boatToUpdate = {
      id: parseId,
      coord_x: req.body.coord_x,
      coord_y: req.body.coord_y,
    };
    const result = await boatRepository.update(boatToUpdate);

    if (result > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export default {
  browse,
  edit,
};
