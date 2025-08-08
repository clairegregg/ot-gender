import { Router, Request, Response } from 'express';
import { Db, ObjectId } from 'mongodb';
import Surgery from './models/Surgery';
import Welcome from './models/Welcome';

export const createRoutes = (db: Db): Router => {
  const router = Router();

  // === COMBINED FETCH ===
  router.get('/content', async (_req: Request, res: Response) => {
    try {
      const surgeriesPromise = db.collection('surgeries').find().toArray();
      const welcomesPromise = db.collection('welcomes').find().toArray();

      const [surgeries, welcomes] = await Promise.all([surgeriesPromise, welcomesPromise]);

      res.json({ surgeries, welcomes });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch content' });
    }
  });


  // === SURGERY ROUTES ===

  router.post('/surgery', async (req: Request, res: Response) => {
    try {
      const surgery = new Surgery(
        req.body.name,
        req.body.primary_association,
        req.body.type,
        req.body.summary,
        req.body.ot_considerations
      );
      const result = await db.collection('surgeries').insertOne(surgery);
      res.status(201).json({ _id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save surgery' });
    }
  });

  router.get('/surgery', async (_req: Request, res: Response) => {
    try {
      const surgeries = await db.collection('surgeries').find().toArray();
      res.json(surgeries);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch surgeries' });
    }
  });

  router.get('/surgery/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const surgery = await db.collection('surgeries').findOne({
        _id: new ObjectId(id),
      });
      res.json(surgery);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to fetch specific surgery' });
    }
  });

  router.put('/surgery/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateResult = await db.collection('surgeries').updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );
      res.json({ modifiedCount: updateResult.modifiedCount });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update surgery' });
    }
  });

  router.delete('/surgery/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteResult = await db.collection('surgeries').deleteOne({
        _id: new ObjectId(id),
      });
      res.json({ deletedCount: deleteResult.deletedCount });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete surgery' });
    }
  });

  // === WELCOME ROUTES ===

  router.post('/welcome', async (req: Request, res: Response) => {
    try {
      const welcome = new Welcome(
        req.body.title,
        req.body.text,
        req.body.icons
      );
      const result = await db.collection('welcomes').insertOne(welcome);
      res.status(201).json({ _id: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save welcome' });
    }
  });

  router.get('/welcome', async (_req: Request, res: Response) => {
    try {
      const welcomes = await db.collection('welcomes').find().toArray();
      res.json(welcomes);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch welcomes' });
    }
  });

  router.get('/welcome/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const welcome = await db.collection('welcomes').findOne({
        _id: new ObjectId(id),
      });
      res.json(welcome);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: 'Failed to fetch specific welcome' });
    }
  });

  router.put('/welcome/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateResult = await db.collection('welcomes').updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );
      res.json({ modifiedCount: updateResult.modifiedCount });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update welcome' });
    }
  });

  router.delete('/welcome/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleteResult = await db.collection('welcomes').deleteOne({
        _id: new ObjectId(id),
      });
      res.json({ deletedCount: deleteResult.deletedCount });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete welcome' });
    }
  });

  return router;
};
