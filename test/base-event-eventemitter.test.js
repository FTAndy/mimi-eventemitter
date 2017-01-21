const MimiEventEmitter = require('../mimi-eventemitter');

describe('MimiEventEmitter', function() {
  it('notifies listener when told to emit an event which that listener has registered for', function () {
    const emitter = new MimiEventEmitter();
    const callback = jest.fn();

    emitter.addListener('type1', callback);

    emitter.emit('type1', 'data');

    expect(callback.mock.calls[0][0]).toBe('data');
  });

  it(`notifies multiple listeners when told to emit an event which multiple
     listeners are registered for`, function () {
    const emitter = new MimiEventEmitter();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    emitter.addListener('type1', callback1);
    emitter.addListener('type1', callback2);

    emitter.emit('type1', 'data');

    expect(callback1.mock.calls[0][0]).toBe('data');
    expect(callback2.mock.calls[0][0]).toBe('data');
  });

  it('does not notify events of different types', function() {
    const emitter = new MimiEventEmitter();
    const callback = jest.fn();

    emitter.addListener('type1', callback);

    emitter.emit('type2');

    expect(callback.mock.calls.length).toBe(0);
  });

  it('does not notify of events after all listeners are removed', function() {
    const emitter = new MimiEventEmitter();
    const callback = jest.fn();

    emitter.addListener('type1', callback);
    emitter.removeAllListeners();

    emitter.emit('type1');

    expect(callback.mock.calls.length).toBe(0);
  });


  it(`invokes only the listeners registered at the time the event was
    emitted, even if more were added`, function() {
    const emitter = new MimiEventEmitter();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    callback1.mockImplementation(function() {
      emitter.addListener('type1', callback2);
    });

    emitter.addListener('type1', callback1);

    emitter.emit('type1');

    expect(callback1.mock.calls.length).toBe(1);
    expect(callback2.mock.calls.length).toBe(0);
  });


  it('provides a way to register a listener that is invoked once', function() {
    const emitter = new MimiEventEmitter();
    const callback = jest.fn();

    emitter.once('type1', callback);

    emitter.emit('type1', 'data');
    emitter.emit('type1', 'data');

    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0][0]).toBe('data');
  });

  it('returns an array of listeners for an event', function() {
    const emitter = new MimiEventEmitter();
    const listener1 = function() {};
    const listener2 = function() {};
    emitter.addListener('type1', listener1);
    emitter.addListener('type1', listener2);

    const listeners = emitter.Listeners('type1');
    expect(listeners.length).toBe(2);
    expect(listeners).toContain(listener1);
    expect(listeners).toContain(listener2);
  });

  it('returns an empty array when there are no listeners', function() {
    const emitter = new MimiEventEmitter();
    expect(emitter.Listeners('type1').length).toBe(0);
  });

  it('returns only the listeners for the registered event', function() {
    const emitter = new MimiEventEmitter();
    const listener1 = function() {};
    const listener2 = function() {};
    emitter.addListener('type1', listener1);
    emitter.addListener('type2', listener2);

    const listeners = emitter.Listeners('type1');
    expect(listeners.length).toBe(1);
    expect(listeners).toContain(listener1);
  });
});
