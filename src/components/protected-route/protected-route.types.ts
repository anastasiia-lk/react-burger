export interface IProtectedRoutProps {
  anonymous?: boolean;
}

export type TLocationState = {
  state: {
    from?: {
      pathname: string;
    };
  };
};