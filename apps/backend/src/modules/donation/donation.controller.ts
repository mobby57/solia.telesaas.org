import type { FastifyReply, FastifyRequest } from 'fastify';
import * as donationService from './donation.service';

export async function getDonations(_request: FastifyRequest, reply: FastifyReply) {
  const donations = await donationService.getDonations();
  reply.send(donations);
}

export async function createDonation(request: FastifyRequest, reply: FastifyReply) {
  const newDonation = await donationService.createDonation(request.body);
  reply.status(201).send(newDonation);
}

export async function getDonationById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const donation = await donationService.getDonationById(request.params.id);
  if (!donation) {
    reply.status(404).send({ message: 'Donation not found' });
    return;
  }
  reply.send(donation);
}

export async function updateDonation(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedDonation = await donationService.updateDonation(request.params.id, request.body);
  if (!updatedDonation) {
    reply.status(404).send({ message: 'Donation not found' });
    return;
  }
  reply.send(updatedDonation);
}

export async function deleteDonation(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await donationService.deleteDonation(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Donation not found' });
    return;
  }
  reply.status(204).send();
}
