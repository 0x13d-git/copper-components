import { StateMachine, Event, EventObject, DefaultContext, StateSchema, StateValue, InterpreterOptions, SingleOrArray, DoneEvent, MachineOptions, SCXML, EventData, Observer, Spawnable, Typestate } from './types';
import { State } from './State';
import { Actor } from './Actor';
import { ActorRefFrom, SpawnedActorRef, Subscription } from '.';
export declare type StateListener<TContext, TEvent extends EventObject, TStateSchema extends StateSchema<TContext> = any, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}> = (state: State<TContext, TEvent, TStateSchema, TTypestate>, event: TEvent) => void;
export declare type ContextListener<TContext = DefaultContext> = (context: TContext, prevContext: TContext | undefined) => void;
export declare type EventListener<TEvent extends EventObject = EventObject> = (event: TEvent) => void;
export declare type Listener = () => void;
export interface Clock {
    setTimeout(fn: (...args: any[]) => void, timeout: number): any;
    clearTimeout(id: any): void;
}
interface SpawnOptions {
    name?: string;
    autoForward?: boolean;
    sync?: boolean;
}
export declare enum InterpreterStatus {
    NotStarted = 0,
    Running = 1,
    Stopped = 2
}
export declare class Interpreter<TContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}> implements Actor<State<TContext, TEvent, TStateSchema, TTypestate>, TEvent> {
    machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * The default interpreter options:
     *
     * - `clock` uses the global `setTimeout` and `clearTimeout` functions
     * - `logger` uses the global `console.log()` method
     */
    static defaultOptions: InterpreterOptions;
    /**
     * The current state of the interpreted machine.
     */
    private _state?;
    private _initialState?;
    /**
     * The clock that is responsible for setting and clearing timeouts, such as delayed events and transitions.
     */
    clock: Clock;
    options: Readonly<InterpreterOptions>;
    private scheduler;
    private delayedEventsMap;
    private listeners;
    private contextListeners;
    private stopListeners;
    private doneListeners;
    private eventListeners;
    private sendListeners;
    private logger;
    /**
     * Whether the service is started.
     */
    initialized: boolean;
    status: InterpreterStatus;
    parent?: Interpreter<any>;
    id: string;
    /**
     * The globally unique process ID for this invocation.
     */
    sessionId: string;
    children: Map<string | number, SpawnedActorRef<any>>;
    private forwardTo;
    private devTools?;
    /**
     * Creates a new Interpreter instance (i.e., service) for the given machine with the provided options, if any.
     *
     * @param machine The machine to be interpreted
     * @param options Interpreter options
     */
    constructor(machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>, options?: Partial<InterpreterOptions>);
    get initialState(): State<TContext, TEvent, TStateSchema, TTypestate>;
    get state(): State<TContext, TEvent, TStateSchema, TTypestate>;
    static interpret: typeof interpret;
    /**
     * Executes the actions of the given state, with that state's `context` and `event`.
     *
     * @param state The state whose actions will be executed
     * @param actionsConfig The action implementations to use
     */
    execute(state: State<TContext, TEvent, TStateSchema, TTypestate>, actionsConfig?: MachineOptions<TContext, TEvent>['actions']): void;
    private update;
    onTransition(listener: StateListener<TContext, TEvent, TStateSchema, TTypestate>): this;
    subscribe(observer: Observer<State<TContext, TEvent, any, TTypestate>>): Subscription;
    subscribe(nextListener?: (state: State<TContext, TEvent, any, TTypestate>) => void, errorListener?: (error: any) => void, completeListener?: () => void): Subscription;
    /**
     * Adds an event listener that is notified whenever an event is sent to the running interpreter.
     * @param listener The event listener
     */
    onEvent(listener: EventListener): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Adds an event listener that is notified whenever a `send` event occurs.
     * @param listener The event listener
     */
    onSend(listener: EventListener): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Adds a context listener that is notified whenever the state context changes.
     * @param listener The context listener
     */
    onChange(listener: ContextListener<TContext>): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Adds a listener that is notified when the machine is stopped.
     * @param listener The listener
     */
    onStop(listener: Listener): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Adds a state listener that is notified when the statechart has reached its final state.
     * @param listener The state listener
     */
    onDone(listener: EventListener<DoneEvent>): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Removes a listener.
     * @param listener The listener to remove
     */
    off(listener: (...args: any[]) => void): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Alias for Interpreter.prototype.start
     */
    init: (initialState?: string | import("./types").StateValueMap | State<TContext, TEvent, TStateSchema, TTypestate> | undefined) => Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Starts the interpreter from the given state, or the initial state.
     * @param initialState The state to start the statechart from
     */
    start(initialState?: State<TContext, TEvent, TStateSchema, TTypestate> | StateValue): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Stops the interpreter and unsubscribe all listeners.
     *
     * This will also notify the `onStop` listeners.
     */
    stop(): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
    /**
     * Sends an event to the running interpreter to trigger a transition.
     *
     * An array of events (batched) can be sent as well, which will send all
     * batched events to the running interpreter. The listeners will be
     * notified only **once** when all events are processed.
     *
     * @param event The event(s) to send
     */
    send: (event: SingleOrArray<Event<TEvent>> | SCXML.Event<TEvent>, payload?: EventData | undefined) => State<TContext, TEvent, TStateSchema, TTypestate>;
    private batch;
    /**
     * Returns a send function bound to this interpreter instance.
     *
     * @param event The event to be sent by the sender.
     */
    sender(event: Event<TEvent>): () => State<TContext, TEvent, TStateSchema, TTypestate>;
    private sendTo;
    /**
     * Returns the next state given the interpreter's current state and the event.
     *
     * This is a pure method that does _not_ update the interpreter's state.
     *
     * @param event The event to determine the next state
     */
    nextState(event: Event<TEvent> | SCXML.Event<TEvent>): State<TContext, TEvent, TStateSchema, TTypestate>;
    private forward;
    private defer;
    private cancel;
    private exec;
    private removeChild;
    private stopChild;
    spawn(entity: Spawnable, name: string, options?: SpawnOptions): SpawnedActorRef<any>;
    spawnMachine<TChildContext, TChildStateSchema, TChildEvent extends EventObject>(machine: StateMachine<TChildContext, TChildStateSchema, TChildEvent>, options?: {
        id?: string;
        autoForward?: boolean;
        sync?: boolean;
    }): SpawnedActorRef<TChildEvent, State<TChildContext, TChildEvent>>;
    private spawnPromise;
    private spawnCallback;
    private spawnObservable;
    private spawnActor;
    private spawnActivity;
    private spawnEffect;
    private attachDev;
    toJSON(): {
        id: string;
    };
}
export declare function spawn<TC, TE extends EventObject>(entity: StateMachine<TC, any, TE>, nameOrOptions?: string | SpawnOptions): ActorRefFrom<StateMachine<TC, any, TE>>;
export declare function spawn(entity: Spawnable, nameOrOptions?: string | SpawnOptions): SpawnedActorRef<any>;
/**
 * Creates a new Interpreter instance for the given machine with the provided options, if any.
 *
 * @param machine The machine to interpret
 * @param options Interpreter options
 */
export declare function interpret<TContext = DefaultContext, TStateSchema extends StateSchema = any, TEvent extends EventObject = EventObject, TTypestate extends Typestate<TContext> = {
    value: any;
    context: TContext;
}>(machine: StateMachine<TContext, TStateSchema, TEvent, TTypestate>, options?: Partial<InterpreterOptions>): Interpreter<TContext, TStateSchema, TEvent, TTypestate>;
export {};
//# sourceMappingURL=interpreter.d.ts.map