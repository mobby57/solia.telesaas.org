#!/bin/bash
# Script to install Fastify and related dependencies with types

pnpm add fastify @fastify/cors @fastify/cookie @fastify/helmet @fastify/multipart pino-pretty
pnpm add -D @types/cookie @types/node @types/pino-pretty
