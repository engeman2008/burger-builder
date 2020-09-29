import reducer from "./auth";
import * as actionTypes from '../actions/actionTypes';

describe('auh reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, 
        { 
            type: actionTypes.AUTH_SUCCESS,
            token: 'some-token',
            userId: 'some-id'
        })).toEqual(
            {
                token: 'some-token',
                userId: 'some-id',
                error: false,
                loading: false,
                authRedirectPath: '/'
            }
        )
    })
})