import { App, ref, Ref, computed, ComputedRef, inject } from "vue";

type IState = Record<string, any>;
type IPayload = any;

type IOptions = {
  state: () => IState;
  getters?: Record<string, (state: IState) => any>;
  mutations: Record<string, (state: IState, payload?: any) => void>;
  actions?: Record<string, (state: IState, payload?: any) => void>;
};

const STORE_KEY = "__store__";

class Vuex {
  _options!: IOptions;
  _state!: Ref<IState>;
  _mutations!: IOptions["mutations"];
  _actions!: IOptions["actions"];
  getters!: Record<string, ComputedRef<any>>;

  constructor(options: IOptions) {
    this._options = options;
    this._state = ref(options.state());

    this._mutations = options.mutations;
    this._actions = options.actions;

    this.getters = {};
    Object.keys(options.getters ?? {}).forEach((name) => {
      const fn = (options.getters ?? {})[name];
      this.getters[name] = computed(() => fn(this.state));
    });
  }

  get state() {
    return this._state.value;
  }

  commit = (type: string, payload?: IPayload) => {
    const fn = this._mutations[type];
    fn && fn(this.state, payload);
  };

  dispatch = (type: string, payload?: IPayload) => {
    const fn = (this._actions ?? {})[type];
    fn && fn(this.state, payload);
  };

  install(app: App) {
    app.provide(STORE_KEY, this);
  }
}

export function createStore(options: IOptions) {
  return new Vuex(options);
}

export function useStore() {
  return inject(STORE_KEY);
}
