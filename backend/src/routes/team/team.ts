import { Request, Response } from "express";
import teamModel, { Team } from "../../models/team";

export async function createTeamHandler(req: Request, res: Response) {
  const team: Team = req.body;

  try {
    const newTeam = await new teamModel(team);
    if (!newTeam) {
      res.status(500).json({
        status: false,
        message: "Unable to create team",
      });
      return;
    }

    const savedTeam = await newTeam.save();
    if (!savedTeam) {
      res.status(500).json({
        status: false,
        message: "Unable to save team",
      });
      return;
    }

    res.status(201).json({
      status: true,
      message: "Team created successfully",
      data: savedTeam,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable to create team",
    });
  }
}

export async function addMemberHandler(req: Request, res: Response) {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedTeam = await teamModel.findOneAndUpdate(
      {
        name,
      },
      {
        $push: {
          members: id,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedTeam) {
      res.status(500).json({
        status: false,
        message: "Unable to add member",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "Member added successfully",
      data: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable to add member",
    });
  }
}

export async function getTeamsHandler(req: Request, res: Response) {
  try {
    const teams = await teamModel.find({});
    if (!teams) {
      res.status(500).json({
        status: false,
        message: "Unable to get teams",
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Teams retrieved successfully",
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable to get teams",
    });
  }
}

export async function getTeamHandler(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const team = await teamModel.findById(id);

    if (!team) {
      res.status(500).json({
        status: false,
        message: "Unable to get team",
      });
      return;
    }
    res.status(200).json({
      status: true,
      message: "Team retrieved successfully",
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable to get team",
    });
  }
}
