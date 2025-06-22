import type { FastifyInstance } from 'fastify';
import * as donationController from './donation.controller';

export default async function donationRoutes(app: FastifyInstance) {
  app.get('/', donationController.getDonations);
  app.post('/', donationController.createDonation);
  app.get('/:id', donationController.getDonationById);
  app.patch('/:id', donationController.updateDonation);
  app.delete('/:id', donationController.deleteDonation);
}
