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

            signUp: {
                on: {
                    valid: [
                        {
                            target: 'confirmCode',
                            cond: (context, event) => context.isAuth
                        },
                        { target: 'failure' }
                    ]
                }
            },

            confirmCode: {
                on: {
                    valid: [
                        {
                            target: 'notAuthd',
                            cond: (context, event) => context.isAuth
                        },
                        { target: 'failure' }
                    ],
                    resend: [
                        {
                            target: 'confirmCode',
                            cond: (context, event) => context.isAuth
                        },
                        { target: 'failure' }
                    ]
                }
            },            

            failure: {}
        }
    });