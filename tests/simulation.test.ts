import test from 'node:test';
import assert from 'node:assert/strict';
import { simulate } from '../src/lib/simulation.ts';
test('both admission policies conserve demand and capacity across supported controls', () => {
  for (let load=40; load<=400; load+=20) for (let capacity=40; capacity<=200; capacity+=20) for (const policy of ['fair','arrival'] as const) {
    const r=simulate(load,capacity,policy);
    assert.equal(r.total,Math.min(load,capacity));
    assert.equal(r.total+r.deferred,load);
    assert.ok(r.admitted.every((n,i)=>n>=0&&n<=r.demand[i]));
    assert.ok(r.fairness>0&&r.fairness<=1);
  }
});
test('fair share preserves throughput while giving quieter clients access under overload',()=>{
  const arrival=simulate(240,120,'arrival');const fair=simulate(240,120,'fair');
  assert.deepEqual(arrival.admitted,[120,0,0,0]);
  assert.deepEqual(fair.admitted,[48,24,24,24]);
  assert.equal(arrival.total,fair.total);assert.ok(fair.fairness>arrival.fairness);
});
test('under capacity both policies admit every request',()=>{
  assert.deepEqual(simulate(60,120,'fair').admitted,simulate(60,120,'arrival').admitted);
});
test('zero input and invalid bounds are handled explicitly',()=>{
  assert.equal(simulate(0,0,'fair').fairness,0);
  assert.throws(()=>simulate(-1,120,'fair'),RangeError);
  assert.throws(()=>simulate(Infinity,120,'fair'),RangeError);
});
