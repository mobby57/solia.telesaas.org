import type { FastifyReply, FastifyRequest } from 'fastify';
import * as feedbackService from './feedback.service';

export async function getFeedbacks(request: FastifyRequest, reply: FastifyReply) {
  const feedbacks = await feedbackService.getFeedbacks();
  reply.send(feedbacks);
}

export async function createFeedback(request: FastifyRequest, reply: FastifyReply) {
  const newFeedback = await feedbackService.createFeedback(request.body);
  reply.status(201).send(newFeedback);
}

export async function getFeedbackById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const feedback = await feedbackService.getFeedbackById(request.params.id);
  if (!feedback) {
    reply.status(404).send({ message: 'Feedback not found' });
    return;
  }
  reply.send(feedback);
}

export async function updateFeedback(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedFeedback = await feedbackService.updateFeedback(request.params.id, request.body);
  if (!updatedFeedback) {
    reply.status(404).send({ message: 'Feedback not found' });
    return;
  }
  reply.send(updatedFeedback);
}

export async function deleteFeedback(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await feedbackService.deleteFeedback(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'Feedback not found' });
    return;
  }
  reply.send({ message: 'Feedback deleted' });
}
