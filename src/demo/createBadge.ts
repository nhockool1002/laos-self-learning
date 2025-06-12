import { badgeService } from '../services/badgeService';

async function demoCreateBadge() {
  try {
    await badgeService.createSampleUserBadge();
  } catch (error) {
    console.error('Error in demo:', error);
  }
}

// Chạy demo
demoCreateBadge(); 