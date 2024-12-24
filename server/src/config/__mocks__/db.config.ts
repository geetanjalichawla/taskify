// src/config/__mocks__/db.config.ts
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';

export const prisma = mockDeep<PrismaClient>();
export type PrismaMockType = DeepMockProxy<PrismaClient>;
