export function simulate(load: number, capacity: number, mode: 'fair' | 'arrival') {
  if (!Number.isFinite(load) || !Number.isFinite(capacity) || load < 0 || capacity < 0 || load > 10000 || capacity > 10000) throw new RangeError('Model inputs must be finite and between 0 and 10000.');
  const totalDemand = Math.floor(load);
  const noisy = Math.floor(totalDemand * 0.7);
  const quiet = Math.floor((totalDemand - noisy) / 3);
  const demand = [noisy, quiet, quiet, totalDemand - noisy - quiet * 2];
  const admitted = [0, 0, 0, 0];
  let remaining = Math.floor(capacity);
  if (mode === 'arrival') {
    demand.forEach((count, i) => { admitted[i] = Math.min(count, remaining); remaining -= admitted[i]; });
  } else {
    while (remaining > 0 && admitted.some((count, i) => count < demand[i])) {
      for (let i = 0; i < demand.length && remaining > 0; i++) {
        if (admitted[i] < demand[i]) { admitted[i]++; remaining--; }
      }
    }
  }
  const total = admitted.reduce((sum, value) => sum + value, 0);
  const squares = admitted.reduce((sum, value) => sum + value * value, 0);
  return { demand, admitted, total, deferred: totalDemand - total, fairness: squares === 0 ? 0 : total * total / (4 * squares) };
}
