var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var TestUtils = require('react-addons-test-utils');
var $ = require('jQuery');

var Timer= require('Timer');

describe('Timer', () => {
  it('should exist', () => {
    expect('Timer').toExist()
  });

  describe('handleSetTimer', () => {
    it('should start timer on started status', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);
      timer.handleSetTimer(10);

      expect(timer.state.count).toBe(10);
      expect(timer.state.timerStatus).toBe('started');

      setTimeout(() => {
        expect(timer.state.count).toBe(11);
        done();
      }, 1001)
    });

    it('should pause timer on paused status', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);

      timer.handleSetTimer(3);
      timer.handleStatusChange('paused');

      setTimeout(() => {
        expect(timer.state.count).toBe(3);
        expect(timer.state.timerStatus).toBe('paused');
        done();
      }, 1001);
    });

    it('should clear count on stopped status', (done) => {
      var timer = TestUtils.renderIntoDocument(<Timer/>);

      timer.setState({count: 10})
      timer.handleStatusChange('started');
      timer.handleStatusChange('stopped');

      setTimeout(() => {
        expect(timer.state.count).toBe(10);
        expect(timer.state.timerStatus).toBe('stopped');
        done();
      }, 1001);
    });

  });
});
