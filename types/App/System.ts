export enum OSState {
  BOOTLOADER = 'BOOTLOADER',
//   SYSTEM_INIT = 'SYSTEM_INIT',
  SYSTEM_LOADING = 'SYSTEM_LOADING',
  LOGON = 'LOGON',
  DESKTOP = 'DESKTOP',
  // ERROR = 'ERROR',
}

export type Transition = {
  from: OSState;
  to: OSState;
  guard?: () => boolean | Promise<boolean>;
};
