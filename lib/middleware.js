'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiMiddleware = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _validation = require('./validation');

var _errors = require('./errors');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var _this = this;

  var getState = _ref.getState;

  return function (next) {
    return function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(action) {
        var validationErrors, _callAPI, _requestType, callAPI, endpoint, headers, method, body, credentials, bailout, types, _normalizeTypeDescrip, _normalizeTypeDescrip2, requestType, successType, failureType, res;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((0, _validation.isRSAA)(action)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', next(action));

              case 2:

                // Try to dispatch an error request FSA for invalid RSAAs
                validationErrors = (0, _validation.validateRSAA)(action);

                if (!validationErrors.length) {
                  _context.next = 7;
                  break;
                }

                _callAPI = action[_CALL_API2.default];

                if (_callAPI.types && Array.isArray(_callAPI.types)) {
                  _requestType = _callAPI.types[0];

                  if (_requestType && _requestType.type) {
                    _requestType = _requestType.type;
                  }
                  next({
                    type: _requestType,
                    payload: new _errors.InvalidRSAA(validationErrors),
                    error: true
                  });
                }
                return _context.abrupt('return');

              case 7:

                // Parse the validated RSAA action
                callAPI = action[_CALL_API2.default];
                endpoint = callAPI.endpoint, headers = callAPI.headers;
                method = callAPI.method, body = callAPI.body, credentials = callAPI.credentials, bailout = callAPI.bailout, types = callAPI.types;
                _normalizeTypeDescrip = (0, _util.normalizeTypeDescriptors)(types), _normalizeTypeDescrip2 = _slicedToArray(_normalizeTypeDescrip, 3), requestType = _normalizeTypeDescrip2[0], successType = _normalizeTypeDescrip2[1], failureType = _normalizeTypeDescrip2[2];

                // Should we bail out?

                _context.prev = 11;

                if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return');

              case 14:
                _context.next = 23;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](11);
                _context.t1 = next;
                _context.next = 21;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError('[CALL_API].bailout function failed'),
                  error: true
                }), [action, getState()]);

              case 21:
                _context.t2 = _context.sent;
                return _context.abrupt('return', (0, _context.t1)(_context.t2));

              case 23:
                if (!(typeof endpoint === 'function')) {
                  _context.next = 35;
                  break;
                }

                _context.prev = 24;

                endpoint = endpoint(getState());
                _context.next = 35;
                break;

              case 28:
                _context.prev = 28;
                _context.t3 = _context['catch'](24);
                _context.t4 = next;
                _context.next = 33;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError('[CALL_API].endpoint function failed'),
                  error: true
                }), [action, getState()]);

              case 33:
                _context.t5 = _context.sent;
                return _context.abrupt('return', (0, _context.t4)(_context.t5));

              case 35:
                if (!(typeof headers === 'function')) {
                  _context.next = 47;
                  break;
                }

                _context.prev = 36;

                headers = headers(getState());
                _context.next = 47;
                break;

              case 40:
                _context.prev = 40;
                _context.t6 = _context['catch'](36);
                _context.t7 = next;
                _context.next = 45;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError('[CALL_API].headers function failed'),
                  error: true
                }), [action, getState()]);

              case 45:
                _context.t8 = _context.sent;
                return _context.abrupt('return', (0, _context.t7)(_context.t8));

              case 47:
                _context.t9 = next;
                _context.next = 50;
                return (0, _util.actionWith)(requestType, [action, getState()]);

              case 50:
                _context.t10 = _context.sent;
                (0, _context.t9)(_context.t10);
                _context.prev = 52;
                _context.next = 55;
                return fetch(endpoint, { method: method, body: body, credentials: credentials, headers: headers || {} });

              case 55:
                res = _context.sent;
                _context.next = 65;
                break;

              case 58:
                _context.prev = 58;
                _context.t11 = _context['catch'](52);
                _context.t12 = next;
                _context.next = 63;
                return (0, _util.actionWith)(_extends({}, requestType, {
                  payload: new _errors.RequestError(_context.t11.message),
                  error: true
                }), [action, getState()]);

              case 63:
                _context.t13 = _context.sent;
                return _context.abrupt('return', (0, _context.t12)(_context.t13));

              case 65:
                if (!res.ok) {
                  _context.next = 73;
                  break;
                }

                _context.t14 = next;
                _context.next = 69;
                return (0, _util.actionWith)(successType, [action, getState(), res]);

              case 69:
                _context.t15 = _context.sent;
                return _context.abrupt('return', (0, _context.t14)(_context.t15));

              case 73:
                _context.t16 = next;
                _context.next = 76;
                return (0, _util.actionWith)(_extends({}, failureType, {
                  error: true
                }), [action, getState(), res]);

              case 76:
                _context.t17 = _context.sent;
                return _context.abrupt('return', (0, _context.t16)(_context.t17));

              case 78:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this, [[11, 16], [24, 28], [36, 40], [52, 58]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();
  };
}

exports.apiMiddleware = apiMiddleware;