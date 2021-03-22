import { createMachine, assign } from 'xstate';

/* xState Machine for auth */

export const machine = createMachine(
{
    id: 'auth',
    initial: 'unknown',
    context: {
        isAuth: false
        },
    states: {
        unknown: {
        on: {
            isLoggedIn: [
            {
                target: 'authd',
                cond: (context, event) => context.isAuth
                },
                { target: 'notAuthd' }
            ]
        }
        },     

        authd: {
        on: {
            logOut: [
            {
                target: 'notAuthd',
                cond: (context, event) => !context.isAuth
            },
            { target: 'failure' }
            ] 
        }
        },

        notAuthd: {
        on: {
            logIn: [
            {
                target: 'authd',
                cond: (context, event) => context.isAuth
            },
            { target: 'failure' }
            ] 
        }
        },        
        failure: {}
    }});