import mongoose from 'mongoose';
import os from 'os';

const CHECK_INTERVAL_MS = 5000;

export const countConnections = (): void => {
  const count = mongoose.connections.length;
  console.log(`🔌 Number of active MongoDB connections: ${count}`);
};

export const checkOverload = (): void => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsageMB = process.memoryUsage().rss / 1024 / 1024;
    const maxConnections = numCores * 4;

    console.log(`📊 Active connections: ${numConnections}`);
    console.log(`💾 Memory usage: ${memoryUsageMB.toFixed(2)} MB`);

    if (numConnections > maxConnections) {
      console.warn('⚠️ MongoDB connection overload detected!');
      // 🔔 Optionally notify admin/dev here
    }
  }, CHECK_INTERVAL_MS);
};
